import localClients from "@/app/clients-showcase/clients.json";

function normalizeEnvUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1).trim()
      : trimmed;
  return unquoted || undefined;
}

const CMS_API_BASE_URL =
  normalizeEnvUrl(process.env.CMS_API_BASE_URL) ?? "https://admin.yourdomain.com";
const CLIENTS_API_PATH =
  normalizeEnvUrl(process.env.CLIENTS_API_PATH) ?? "/api/public/clients";
const CLIENTS_SITE =
  process.env.CLIENTS_SITE ?? process.env.BLOG_SITE ?? "multivariants";
const CLIENTS_API_FALLBACK_ENABLED =
  process.env.CLIENTS_API_FALLBACK_ENABLED !== "false";

type LocalClient = {
  id: string;
  businessName: string;
  description: string;
  readMoreUrl: string;
};

export type PublicClient = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  logoUrl?: string;
  link: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  authorName: string;
  authorAvatarUrl?: string;
  contentHtml?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export type PublicClientsResult = {
  clients: PublicClient[];
  totalPages: number;
  currentPage: number;
  total: number;
  error?: string;
};

function toErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

function parseJsonPayload(rawText: string, contentType: string, scope: string) {
  try {
    return JSON.parse(rawText);
  } catch {
    const preview = rawText.slice(0, 120).replaceAll(/\s+/g, " ");
    throw new Error(
      `${scope} expected JSON but got "${contentType || "unknown"}" (${preview})`
    );
  }
}

function asNumber(value: unknown, fallback: number) {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) return n;
  return fallback;
}

function ensureISODate(value: unknown) {
  if (typeof value === "string" && value.length >= 10) return value;
  return new Date().toISOString();
}

function optionalISODate(value: unknown) {
  if (typeof value === "string" && value.length >= 10) return value;
  return undefined;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-");
}

function normalizeApiPath(pathValue: string, fallback: string) {
  const trimmed = pathValue.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildApiUrl(pathValue: string) {
  return new URL(
    normalizeApiPath(pathValue, "/api/public/clients"),
    CMS_API_BASE_URL
  );
}

function buildListUrl() {
  return buildApiUrl(CLIENTS_API_PATH);
}

function buildListUrlCandidates() {
  const candidates: URL[] = [];
  const seen = new Set<string>();

  const addCandidate = (url: URL) => {
    const key = url.toString();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(url);
  };

  addCandidate(buildListUrl());
  addCandidate(buildApiUrl("/api/public/clients"));

  return candidates;
}

function buildSingleClientUrl(slug: string) {
  const url = buildApiUrl(CLIENTS_API_PATH);
  const cleanPath = url.pathname.replaceAll(/\/+$/g, "") || "/api/public/clients";
  url.pathname = `${cleanPath}/${encodeURIComponent(slug)}`;
  return url;
}

function buildSingleClientUrlCandidates(slug: string) {
  const candidates: URL[] = [];
  const seen = new Set<string>();

  const addCandidate = (url: URL) => {
    const key = url.toString();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push(url);
  };

  addCandidate(buildSingleClientUrl(slug));
  addCandidate(new URL(`/api/public/clients/${encodeURIComponent(slug)}`, CMS_API_BASE_URL));

  return candidates;
}

function mapApiClient(raw: Record<string, unknown>, fallbackSlug?: string): PublicClient {
  const title = String(raw.title ?? raw.businessName ?? "Client Story");
  const slug = String(raw.slug ?? "").trim() || fallbackSlug || slugify(title) || "client";
  const authorObject =
    typeof raw.author === "object" && raw.author !== null
      ? (raw.author as Record<string, unknown>)
      : null;
  const seoObject =
    typeof raw.seo === "object" && raw.seo !== null
      ? (raw.seo as Record<string, unknown>)
      : null;
  const contentHtml = String(raw.contentHtml ?? raw.content ?? raw.html ?? "").trim();

  return {
    id: String(raw.id ?? slug),
    title,
    slug,
    excerpt: String(raw.excerpt ?? raw.description ?? ""),
    coverImage: String(raw.coverImage ?? raw.image ?? "").trim() || undefined,
    coverImageAlt: String(raw.coverImageAlt ?? raw.imageAlt ?? title).trim() || title,
    logoUrl: String(raw.logoUrl ?? raw.logo ?? "").trim() || undefined,
    link: String(raw.link ?? raw.websiteUrl ?? `#${slug}`),
    publishedAt: ensureISODate(raw.publishedAt ?? raw.createdAt ?? raw.date),
    updatedAt: optionalISODate(raw.updatedAt ?? raw.modifiedAt ?? raw.updated_at),
    readingTimeMinutes: asNumber(raw.readingTimeMinutes ?? raw.readTimeMinutes, 5),
    authorName: String(authorObject?.name ?? raw.authorName ?? "MultiVariants Team"),
    authorAvatarUrl:
      String(authorObject?.avatarUrl ?? raw.authorAvatarUrl ?? "").trim() || undefined,
    contentHtml: contentHtml || undefined,
    metaTitle:
      String(seoObject?.title ?? raw.metaTitle ?? raw.seoTitle ?? "").trim() || undefined,
    metaDescription:
      String(
        seoObject?.description ?? raw.metaDescription ?? raw.seoDescription ?? ""
      ).trim() || undefined,
    ogImage:
      String(seoObject?.image ?? raw.ogImage ?? raw.og_image ?? "").trim() || undefined,
  };
}

function normalizePayload(payload: unknown) {
  if (Array.isArray(payload)) {
    return {
      clients: payload,
      total: payload.length,
      currentPage: 1,
      totalPages: 1,
    };
  }

  const root =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};
  const data =
    typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;
  const meta =
    typeof root.meta === "object" && root.meta !== null
      ? (root.meta as Record<string, unknown>)
      : {};

  const clients =
    (Array.isArray(data.clients) && data.clients) ||
    (Array.isArray(root.clients) && root.clients) ||
    (Array.isArray(data.items) && data.items) ||
    [];

  const total = asNumber(data.total ?? root.total ?? meta.total, clients.length || 1);
  const totalPages = asNumber(
    data.totalPages ?? root.totalPages ?? meta.totalPages ?? meta.pageCount,
    1
  );
  const currentPage = asNumber(data.page ?? root.page ?? meta.page, 1);

  return { clients, total, totalPages, currentPage };
}

function fallbackClients(page: number, limit: number): PublicClientsResult {
  const source = localClients as LocalClient[];
  const all = source.map((item) => {
    const title = item.businessName;
    const slug = slugify(title) || item.id;
    return {
      id: item.id,
      title,
      slug,
      excerpt: item.description,
      link: item.readMoreUrl || "#",
      publishedAt: new Date().toISOString(),
      updatedAt: undefined,
      readingTimeMinutes: 4,
      authorName: "MultiVariants Team",
      contentHtml: undefined,
      metaTitle: undefined,
      metaDescription: undefined,
      ogImage: undefined,
    } as PublicClient;
  });

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * limit;

  return {
    clients: all.slice(start, start + limit),
    total,
    totalPages,
    currentPage,
  };
}

export async function getPublicClients({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<PublicClientsResult> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildListUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", CLIENTS_SITE);
        url.searchParams.set("page", String(page));
        url.searchParams.set("limit", String(limit));

        const res = await fetch(url.toString(), {
          next: { revalidate: 300 },
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const contentType = res.headers.get("content-type") ?? "";
        const rawText = await res.text();
        const payload = parseJsonPayload(rawText, contentType, "clients list request");

        const normalized = normalizePayload(payload);
        const clients = normalized.clients
          .filter(
            (item): item is Record<string, unknown> =>
              typeof item === "object" && item !== null
          )
          .map((item) => mapApiClient(item))
          .filter((client) => Boolean(client.id && client.title));

        return {
          clients,
          total: normalized.total,
          totalPages: normalized.totalPages,
          currentPage: normalized.currentPage,
        };
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }

    throw new Error(errors.join(" | "));
  } catch (error) {
    if (CLIENTS_API_FALLBACK_ENABLED) {
      const fallback = fallbackClients(page, limit);
      return { ...fallback, error: toErrorMessage(error) };
    }

    return {
      clients: [],
      total: 0,
      totalPages: 1,
      currentPage: Math.max(1, page),
      error: toErrorMessage(error),
    };
  }
}

function fallbackClientBySlug(slug: string): PublicClient | null {
  const source = localClients as LocalClient[];
  const matched = source.find((item) => {
    const candidate = slugify(item.businessName) || item.id;
    return candidate === slug || item.id === slug;
  });

  if (!matched) return null;

  const title = matched.businessName;
  const resolvedSlug = slugify(title) || matched.id;

  return {
    id: matched.id,
    title,
    slug: resolvedSlug,
    excerpt: matched.description,
    coverImage: undefined,
    coverImageAlt: title,
    logoUrl: undefined,
    link: matched.readMoreUrl || "#",
    publishedAt: new Date().toISOString(),
    updatedAt: undefined,
    readingTimeMinutes: 4,
    authorName: "MultiVariants Team",
    authorAvatarUrl: undefined,
    contentHtml: `<p>${matched.description}</p>`,
    metaTitle: `${title} | MultiVariants Client Story`,
    metaDescription: matched.description,
    ogImage: undefined,
  };
}

export async function getPublicClient(slug: string): Promise<PublicClient | null> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildSingleClientUrlCandidates(slug)) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", CLIENTS_SITE);

        const res = await fetch(url.toString(), {
          next: { revalidate: 1800 },
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const contentType = res.headers.get("content-type") ?? "";
        const rawText = await res.text();
        const payload = parseJsonPayload(rawText, contentType, "client details request");
        const root =
          typeof payload === "object" && payload !== null
            ? (payload as Record<string, unknown>)
            : {};
        const data =
          typeof root.data === "object" && root.data !== null
            ? (root.data as Record<string, unknown>)
            : root;
        const details =
          typeof data.client === "object" && data.client !== null
            ? (data.client as Record<string, unknown>)
            : data;
        const mapped = mapApiClient(details, slug);

        return {
          ...mapped,
          contentHtml: mapped.contentHtml || "<p>No content available.</p>",
        };
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }

    throw new Error(errors.join(" | "));
  } catch {
    if (CLIENTS_API_FALLBACK_ENABLED) {
      return fallbackClientBySlug(slug);
    }
    return null;
  }
}

export async function getPublicClientSlugs(limit = 100): Promise<string[]> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildListUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", CLIENTS_SITE);
        url.searchParams.set("limit", String(limit));
        url.searchParams.set("page", "1");

        const res = await fetch(url.toString(), {
          next: { revalidate: 3600 },
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          errors.push(`${url}: ${res.status}`);
          continue;
        }

        const contentType = res.headers.get("content-type") ?? "";
        const rawText = await res.text();
        const payload = parseJsonPayload(rawText, contentType, "client slugs request");
        const normalized = normalizePayload(payload);

        return normalized.clients
          .filter(
            (item): item is Record<string, unknown> =>
              typeof item === "object" && item !== null
          )
          .map((item) => String(item.slug ?? "").trim())
          .filter(Boolean);
      } catch (attemptError) {
        errors.push(toErrorMessage(attemptError));
      }
    }

    throw new Error(errors.join(" | "));
  } catch {
    if (CLIENTS_API_FALLBACK_ENABLED) {
      return (localClients as LocalClient[]).map(
        (item) => slugify(item.businessName) || item.id
      );
    }
    return [];
  }
}
