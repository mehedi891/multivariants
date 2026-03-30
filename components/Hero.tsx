import Link from "next/link";

export default function Hero() {
  const variantRows = [
    { size: "S", black: 2, white: 0, navy: 1 },
    { size: "M", black: 2, white: 0, navy: 1 },
    { size: "L", black: 2, white: 0, navy: 1 },
    { size: "XL", black: 2, white: 0, navy: 1 },
  ];

  const heroStats = [
    { value: "13,000+", label: "Merchants" },
    { value: "120+", label: "Countries" },
    { value: "4.9", label: "App Rating" },
  ];

  return (
    <section
      className="relative flex min-h-[calc(100vh-68px)] min-h-[calc(100svh-68px)] items-center overflow-hidden bg-[#f3f6fb] px-[5%] py-12 sm:py-14 md:py-20"
      aria-label="Hero"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="max-w-[590px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#59708a] shadow-sm ring-1 ring-[#e7edf4] sm:mb-7 sm:px-4 sm:py-2 sm:text-sm">
            <span className="text-[#f5b301]" aria-hidden="true">
              ★★★★★
            </span>
            Trusted by 13,000+ Shopify merchants
          </div>

          <h1 className="mb-5 text-[2rem] font-black leading-[1.07] tracking-[-0.6px] text-[#1b2434] sm:mb-6 sm:text-[2.7rem] md:text-[3.35rem]">
            Bulk Variant Ordering
            <br />
            for <span className="text-[#1c76bc]">Shopify Stores</span>
          </h1>

          <p className="mb-8 max-w-[560px] text-base leading-relaxed text-[#5e6d85] sm:mb-10 sm:text-lg">
            Let customers order multiple product variants in seconds with a
            simple order form. Perfect for B2B, wholesale, and variant-heavy
            stores.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-2.5 sm:mb-12 sm:gap-3">
            <Link
              href="https://apps.shopify.com/"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#1c76bc] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#165f96] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install App Free
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#features"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#93a7bf] bg-[#f7f9fd] px-5 py-3 text-sm font-semibold text-[#2a3446] transition hover:border-[#1c76bc] hover:bg-white sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#a3b0c2]">
                <svg
                  className="h-2.5 w-2.5 translate-x-[1px] text-[#2a3446]"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 1.5L8 5L2 8.5V1.5Z" />
                </svg>
              </span>
              View Demo
            </Link>
          </div>

          <div className="grid max-w-[560px] grid-cols-3 text-center">
            {heroStats.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col items-center px-3 sm:px-5 ${index > 0 ? "border-l border-[#d8dee8]" : ""}`}
              >
                <p className="text-[1.45rem] font-black leading-none text-[#202a3b] sm:text-[1.8rem] md:text-[2rem]">
                  {item.label === "App Rating" ? (
                    <span className="inline-flex items-center">
                      {item.value}
                      <span className="ml-0.5 text-[0.78em]">★</span>
                    </span>
                  ) : (
                    item.value
                  )}
                </p>
                <p className="mt-1.5 text-[11px] font-medium leading-none text-[#5f6d81] sm:mt-2 sm:text-sm md:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-[760px]" aria-hidden="true">
          <div className="rounded-[20px] border border-[#dde5df] bg-gradient-to-br from-[#fbfefc] to-[#f2f7f3] p-4 shadow-[0_25px_45px_rgba(16,24,40,0.12)] sm:p-6 md:p-7">
            <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#d4dce7] bg-[#edf3f9] sm:h-16 sm:w-16 sm:rounded-2xl">
                <svg
                  className="h-6 w-6 text-[#9ba9bc] sm:h-7 sm:w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                  <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
                  <path d="M6.5 17l4.2-4.3 2.5 2.5 2.2-2.1 2.1 3.9" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold leading-none text-[#1f2938] sm:text-xl md:text-2xl">
                  Premium Cotton T-Shirt
                </p>
                <p className="mt-1.5 text-sm font-medium leading-none text-[#607085] sm:mt-2 sm:text-base">
                  $29.99 per unit
                </p>
              </div>
            </div>

            <div className="space-y-0 border-y border-[#d9e0e8]">
              <div className="grid grid-cols-4 gap-2 py-3 text-xs font-semibold text-[#6b7a8f] sm:gap-3 sm:py-4 sm:text-sm">
                <span>Size</span>
                <span className="text-center">Black</span>
                <span className="text-center">White</span>
                <span className="text-center">Navy</span>
              </div>

              {variantRows.map((row) => (
                <div
                  key={row.size}
                  className="grid grid-cols-4 items-center gap-2 border-t border-[#e2e8ee] py-2.5 text-sm sm:gap-3 sm:py-3 sm:text-base"
                >
                  <span className="font-semibold text-[#263142]">{row.size}</span>
                  <span className="text-center">
                    <span className="inline-flex h-8 w-10 items-center justify-center rounded-md border border-[#4ca879] bg-[#edf8f2] font-semibold text-[#2f9a68] sm:h-9 sm:w-12">
                      {row.black}
                    </span>
                  </span>
                  <span className="text-center">
                    <span className="inline-flex h-8 w-10 items-center justify-center rounded-md border border-[#d4dbe4] bg-[#f3f6fb] font-semibold text-[#76839a] sm:h-9 sm:w-12">
                      {row.white}
                    </span>
                  </span>
                  <span className="text-center">
                    <span className="inline-flex h-8 w-10 items-center justify-center rounded-md border border-[#4ca879] bg-[#edf8f2] font-semibold text-[#2f9a68] sm:h-9 sm:w-12">
                      {row.navy}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-5 sm:flex sm:items-end sm:justify-between">
              <div>
                <p className="text-sm leading-none text-[#5f6d81] sm:text-base">Total: 12 items</p>
                <p className="mt-2 text-lg font-semibold leading-none text-[#1f2938] sm:text-xl">
                  $359.88
                </p>
              </div>
              <button className="mt-4 rounded-xl bg-[#1c76bc] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#165f96] sm:mt-0 sm:px-6 sm:py-3 sm:text-base">
                Add All to Cart
              </button>
            </div>
          </div>

          <div className="mt-4 inline-flex rounded-[14px] bg-white px-3.5 py-2.5 shadow-[0_8px_18px_rgba(15,23,42,0.14)] ring-1 ring-[#e5ebf1] sm:absolute sm:-bottom-8 sm:left-2 sm:mt-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e4f4e9] text-[#f29c38]">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11.7 1.1a1 1 0 00-1.8.3L7.7 8H4.6a1 1 0 00-.8 1.6l3.8 5.3a1 1 0 001.8-.3l2.2-6.6h3.1a1 1 0 00.8-1.6l-3.8-5.3z" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-none text-[#2b3647] sm:text-sm">
                  10x Faster
                </p>
                <p className="mt-1 text-[12px] leading-none text-[#6a7990]">
                  Than default Shopify
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
