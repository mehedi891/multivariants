import type { NextConfig } from "next";

function toUploadPattern(urlValue: string | undefined) {
  if (!urlValue) return null;

  try {
    const url = new URL(urlValue);
    const origin = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}`;
    return new URL(`${origin}/uploads/**`);
  } catch {
    return null;
  }
}

const envUploadPatterns = [
  toUploadPattern(process.env.CMS_API_BASE_URL),
].filter((value): value is URL => Boolean(value));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:3000/uploads/**"),
      new URL("http://127.0.0.1:3000/uploads/**"),
      ...envUploadPatterns,
    ],
  },
};

export default nextConfig;
