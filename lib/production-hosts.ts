/**
 * Hostnames that serve the live production site.
 *
 * One list for every "is this the real site?" check: proxy.ts only lets these
 * hosts be indexed, and components/Clarity.tsx only sends data from these
 * hosts. Preview deploys, the project's *.vercel.app alias and local dev are
 * excluded everywhere by this list.
 */
export const PRODUCTION_HOSTS: ReadonlySet<string> = new Set([
  "multivariants.com",
  "www.multivariants.com",
]);

/** `host` is a bare hostname: no port, no scheme. */
export function isProductionHost(host: string): boolean {
  return PRODUCTION_HOSTS.has(host.toLowerCase());
}
