import { helpFont } from "@/lib/academy/font";

/**
 * <main> for every Help Center page: the redesign's typeface, the deep navy
 * background and its soft indigo/cyan glows. The site Navbar and Footer sit
 * outside it and keep their own look.
 */
export default function HelpMain({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      className={`${helpFont.className} relative isolate overflow-x-clip bg-hc-bg text-hc-ink antialiased`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(860px 600px at -4% 0%, rgba(87,102,250,0.20), transparent 55%)",
            "radial-gradient(800px 540px at 104% 4%, rgba(31,226,231,0.12), transparent 55%)",
            "radial-gradient(700px 500px at 50% 100%, rgba(87,102,250,0.10), transparent 60%)",
          ].join(","),
        }}
      />
      {children}
    </main>
  );
}
