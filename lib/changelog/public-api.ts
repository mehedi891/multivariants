import localChangelogs from "@/lib/changelog/changelog.json";
import { stripHtml } from "@/lib/content-html";

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
const CHANGELOG_API_PATH =
  normalizeEnvUrl(process.env.CHANGELOG_API_PATH) ?? "/api/public/changelogs";
const CHANGELOG_SITE = process.env.SITE_SLUG ?? process.env.CHANGELOG_SITE ?? "multivariants";
const CHANGELOG_API_FALLBACK_ENABLED =
  process.env.CHANGELOG_API_FALLBACK_ENABLED !== "false";

type LocalChangelog = {
  id: string;
  date: string;
  version: string;
  tag: string;
  title: string;
  summary: string;
  highlights: string[];
  imageSrc?: string;
};

export type PublicChangelogEntry = {
  id: string;
  slug: string;
  title: string;
  /** Display version ("2.4.0" → "v2.4.0"); undefined when the CMS sends none. */
  version?: string;
  /** Label text exactly as entered in the CMS (trimmed); undefined → no badge. */
  labelName?: string;
  /** CMS #rgb / #rrggbb badge background; undefined → the site's badge style. */
  labelColor?: string;
  publishedAt: string;
  summary: string;
  contentHtml?: string;
  highlights: string[];
  imageSrc?: string;
};

export type PublicChangelogResult = {
  changelogs: PublicChangelogEntry[];
  totalPages: number;
  currentPage: number;
  total: number;
  error?: string;
};

function toErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

function asNumber(value: unknown, fallback: number) {
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) return n;
  return fallback;
}

function normalizeApiPath(pathValue: string, fallback: string) {
  const trimmed = pathValue.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildApiUrl(pathValue: string) {
  return new URL(
    normalizeApiPath(pathValue, "/api/public/changelogs"),
    CMS_API_BASE_URL
  );
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

  addCandidate(buildApiUrl(CHANGELOG_API_PATH));
  addCandidate(buildApiUrl("/api/public/changelogs"));

  return candidates;
}

function normalizeColor(value: unknown) {
  const raw = String(value ?? "").trim();
  return /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(raw) ? raw : undefined;
}

/** Black or white, whichever contrasts more with a #rgb / #rrggbb background. */
export function readableTextOn(hex: string): "#000000" | "#ffffff" {
  const h = hex.slice(1);
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (lum + 0.05) / 0.05 >= 1.05 / (lum + 0.05) ? "#000000" : "#ffffff";
}

function toVersionLabel(value: unknown) {
  const version = String(value ?? "").trim();
  if (!version) return undefined;
  return /^\d/.test(version) ? `v${version}` : version;
}

function ensureISODate(value: unknown) {
  if (typeof value === "string" && value.length >= 10) return value;
  return new Date().toISOString();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-");
}

function summarizeContent(html: string) {
  const plain = stripHtml(html).replaceAll(/\s+/g, " ").trim();
  if (!plain) return "Latest improvements and fixes shipped in this release.";
  if (plain.length <= 180) return plain;
  return `${plain.slice(0, 177).trimEnd()}...`;
}

function extractHighlights(html: string) {
  const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) ?? [];
  return liMatches
    .slice(0, 3)
    .map((item) => stripHtml(item).replaceAll(/\s+/g, " ").trim())
    .filter(Boolean);
}

function mapApiChangelog(raw: Record<string, unknown>): PublicChangelogEntry {
  const labelObject =
    typeof raw.label === "object" && raw.label !== null
      ? (raw.label as Record<string, unknown>)
      : null;
  const content = String(raw.content ?? raw.contentHtml ?? raw.html ?? "");
  const title = String(raw.title ?? "Untitled update");
  const labelName =
    String(labelObject?.name ?? raw.labelName ?? "").trim() || undefined;

  return {
    id: String(raw.id ?? raw.slug ?? title),
    slug: String(raw.slug ?? slugify(title)),
    title,
    version: toVersionLabel(raw.version),
    labelName,
    labelColor: labelName
      ? normalizeColor(labelObject?.color ?? raw.labelColor)
      : undefined,
    publishedAt: ensureISODate(raw.publishedAt ?? raw.createdAt ?? raw.date),
    summary: String(raw.excerpt ?? "").trim() || summarizeContent(content),
    contentHtml: content.trim() || undefined,
    highlights: extractHighlights(content),
    imageSrc: String(raw.imageSrc ?? raw.coverImage ?? "").trim() || undefined,
  };
}

function normalizePayload(payload: unknown) {
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

  const changelogs =
    (Array.isArray(data.changelogs) && data.changelogs) ||
    (Array.isArray(root.changelogs) && root.changelogs) ||
    (Array.isArray(data.items) && data.items) ||
    [];

  return {
    changelogs,
    total: asNumber(data.total ?? root.total ?? meta.total, changelogs.length || 1),
    currentPage: asNumber(data.page ?? root.page ?? meta.page, 1),
    totalPages: asNumber(
      data.totalPages ?? root.totalPages ?? meta.totalPages ?? meta.pageCount,
      1
    ),
  };
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

function fallbackList(page: number, limit: number): PublicChangelogResult {
  const all = (localChangelogs as LocalChangelog[]).map((item) => ({
    id: item.id,
    slug: slugify(item.title) || item.id,
    title: item.title,
    version: item.version,
    labelName: item.tag,
    publishedAt: new Date(item.date).toISOString(),
    summary: item.summary,
    contentHtml: `<p>${item.summary}</p>${
      item.highlights.length
        ? `<ul>${item.highlights.map((point) => `<li>${point}</li>`).join("")}</ul>`
        : ""
    }`,
    highlights: item.highlights,
    imageSrc: item.imageSrc,
  }));

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * limit;

  return {
    changelogs: all.slice(start, start + limit),
    total,
    totalPages,
    currentPage,
  };
}

export async function getPublicChangelogs({
  page,
  limit,
  locale,
}: {
  page: number;
  limit: number;
  /** CMS locale for translated entries; omit for English. */
  locale?: string;
}): Promise<PublicChangelogResult> {
  try {
    const errors: string[] = [];

    for (const baseUrl of buildListUrlCandidates()) {
      try {
        const url = new URL(baseUrl.toString());
        url.searchParams.set("site", CHANGELOG_SITE);
        url.searchParams.set("page", String(page));
        url.searchParams.set("limit", String(limit));
        if (locale) url.searchParams.set("locale", locale);

        const res = await fetch(url.toString(), {
          next: { revalidate: 60 },
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
        const payload = parseJsonPayload(rawText, contentType, "changelog list request");
        const normalized = normalizePayload(payload);

        const changelogs = normalized.changelogs
          .filter(
            (item): item is Record<string, unknown> =>
              typeof item === "object" && item !== null
          )
          .map(mapApiChangelog)
          .filter((item) => Boolean(item.id && item.title));

        return {
          changelogs,
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
    if (CHANGELOG_API_FALLBACK_ENABLED) {
      const fallback = fallbackList(page, limit);
      return { ...fallback, error: toErrorMessage(error) };
    }

    return {
      changelogs: [],
      total: 0,
      totalPages: 1,
      currentPage: Math.max(1, page),
      error: toErrorMessage(error),
    };
  }
}
