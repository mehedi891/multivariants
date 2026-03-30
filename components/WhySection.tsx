type Point = {
  icon: "clock" | "cursor" | "cart" | "bolt";
  text: string;
};

const withoutPoints: Point[] = [
  { icon: "clock", text: "Select variant, add to cart, repeat... for each item" },
  { icon: "cursor", text: "20+ clicks to order 5 different sizes" },
  { icon: "cart", text: "Customers abandon bulk orders" },
];

const withPoints: Point[] = [
  { icon: "bolt", text: "Add all variants in one simple table view" },
  { icon: "cursor", text: "3 clicks to order any number of variants" },
  { icon: "cart", text: "Higher conversion, larger orders" },
];

function PointIcon({ icon, tone }: { icon: Point["icon"]; tone: "red" | "green" }) {
  const color = tone === "red" ? "#ef4444" : "#49a874";

  if (icon === "clock") {
    return (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <circle cx="10" cy="10" r="8.2" />
        <path d="M10 5.6V10l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "cursor") {
    return (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <path d="M3.8 3.2L14.7 8.2L9.4 9.7L7.8 15L3.8 3.2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "cart") {
    return (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
        <path d="M2.8 4h1.8L6.1 12h8.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.4 6.2h9l-1.2 4.9H7.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.2" cy="15.5" r="1.2" />
        <circle cx="13.2" cy="15.5" r="1.2" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.9" aria-hidden="true">
      <path d="M11.1 2.8L6.6 10.5H10.2L8.9 17.2L13.4 9.5H9.8L11.1 2.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhySection() {
  return (
    <section
      className="bg-gradient-to-b from-[#f7faff] via-white to-[#f4f9ff] px-[5%] py-12 sm:py-16 lg:py-20"
      id="why"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-9 max-w-4xl text-center sm:mb-12">
          <h2
            id="problem-heading"
            className="text-3xl font-black leading-[1.2] tracking-tight text-[#1f2938] sm:text-4xl lg:text-[2.85rem]"
          >
            The Problem with Default Shopify Ordering
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#5e6d85] sm:mt-5 sm:text-lg">
            Shopify&apos;s default variant selector forces customers to add products
            one at a time. This frustrates bulk buyers and kills wholesale
            conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
          <article className="rounded-3xl border border-[#efc7c5] bg-[#fffdfd] p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e9acab] hover:shadow-[0_18px_30px_rgba(239,68,68,0.12)] sm:p-6 lg:p-7">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#faeceb] text-[#ef4444] sm:h-11 sm:w-11">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 5L15 15M15 5L5 15" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="text-[1.32rem] font-black leading-tight text-[#1f2938] sm:text-[1.55rem]">
                Without MultiVariants
              </h3>
            </div>

            <ul className="space-y-3">
              {withoutPoints.map((point) => (
                <li key={point.text} className="flex items-center gap-3 text-base leading-relaxed text-[#596a84] sm:text-[1.04rem]">
                  <PointIcon icon={point.icon} tone="red" />
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl bg-[#f2f4f7] p-4 sm:mt-6 sm:p-5">
              <p className="text-base font-medium text-[#66758d] sm:text-[1.1rem]">
                Typical customer experience:
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-base sm:text-[1.07rem]">
                <span className="rounded-lg bg-white px-3 py-2 text-[#1f2938] shadow-sm">
                  Select Size ▼
                </span>
                <span className="text-[#7c899d]">→</span>
                <span className="rounded-lg bg-white px-3 py-2 text-[#1f2938] shadow-sm">
                  Select Color ▼
                </span>
                <span className="text-[#7c899d]">→</span>
                <span className="rounded-lg bg-white px-3 py-2 text-[#ef4444] shadow-sm">
                  Add 1 item
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-[#ef4444] sm:text-[0.98rem]">
                Repeat for each variant... 😵
              </p>
            </div>
          </article>

          <article className="rounded-3xl border border-[#bde1cd] bg-[#fbfffc] p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#97cfb2] hover:shadow-[0_18px_30px_rgba(73,168,116,0.12)] sm:p-6 lg:p-7">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f5ec] text-[#49a874] sm:h-11 sm:w-11">
                <svg className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4.8 10.5L8.3 13.8L15.2 6.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="text-[1.32rem] font-black leading-tight text-[#1f2938] sm:text-[1.55rem]">
                With MultiVariants
              </h3>
            </div>

            <ul className="space-y-3">
              {withPoints.map((point) => (
                <li key={point.text} className="flex items-center gap-3 text-base leading-relaxed text-[#596a84] sm:text-[1.04rem]">
                  <PointIcon icon={point.icon} tone="green" />
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl bg-[#f1f7f3] p-4 sm:mt-6 sm:p-5">
              <p className="text-base font-medium text-[#66758d] sm:text-[1.1rem]">
                MultiVariants experience:
              </p>

              <div className="mt-3 overflow-x-auto">
                <div className="min-w-[260px]">
                  <div className="grid grid-cols-4 gap-2 text-center text-sm font-semibold text-[#1f2938]">
                    <span>Size</span>
                    <span>Black</span>
                    <span>White</span>
                    <span>Navy</span>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center text-sm">
                    <span className="font-semibold text-[#1f2938]">S</span>
                    <span className="rounded-md bg-[#cae7d5] py-1 font-semibold text-[#2e9466]">2</span>
                    <span className="rounded-md bg-[#cae7d5] py-1 font-semibold text-[#2e9466]">3</span>
                    <span className="rounded-md bg-[#cae7d5] py-1 font-semibold text-[#2e9466]">1</span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm font-semibold text-[#49a874] sm:text-[0.98rem]">
                Add all 6 items with one click! ✨
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
