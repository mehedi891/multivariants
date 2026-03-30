const featureCards = [
  {
    icon: "🛒",
    iconBg: "bg-[#eaf0ff]",
    title: "Allow Variants Bulk Add to Cart",
    description:
      "MultiVariants lets customers quickly buy products with variations in bulk. Add multiple colors, sizes, or other options to the cart with just one click — reducing cart abandonment chances dramatically.",
  },
  {
    icon: "📈",
    iconBg: "bg-[#eaf8ef]",
    title: "Increase Sales and Conversion",
    description:
      "Makes the bulk ordering process quick so customers can easily buy multiple product variants without hassle. B2B customers love paying your prices, driving increased wholesale sales and revenue growth.",
  },
  {
    icon: "⚡",
    iconBg: "bg-[#fff3e4]",
    title: "Simple Installation",
    description:
      "A top-notch app with a simple, hassle-free setup. MultiVariants works seamlessly with all the top eCommerce platforms and integrates without a single line of coding.",
  },
  {
    icon: "🌎",
    iconBg: "bg-[#eaf2ff]",
    title: "Multi-Language Support",
    description:
      "MultiVariants makes international expansion easy with its multi-language capabilities. Now you can easily localize your store for customers worldwide and grow beyond borders.",
  },
];

export default function WhyMultivariantsSection() {
  return (
    <section
      className="bg-[#f6f8fc] px-[5%] py-14 sm:py-16 lg:py-20"
      id="why-multivariants"
      aria-labelledby="why-multivariants-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[1.2px] text-[#5c6ac4] sm:text-sm">
            Why MultiVariants?
          </p>
          <h2
            id="why-multivariants-heading"
            className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1f2438] sm:text-4xl lg:text-[2.9rem]"
          >
            Variants Bulk Add to Cart for Shopify
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#626f86] sm:text-base">
            Everything you need to streamline bulk ordering and grow your
            Shopify store&apos;s revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b9c8df] hover:shadow-[0_20px_36px_rgba(15,23,42,0.12)] sm:p-6"
            >
              <span
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${card.iconBg}`}
                aria-hidden="true"
              >
                {card.icon}
              </span>

              <h3 className="text-[1.45rem] font-black leading-tight text-[#1f2438] sm:text-[1.65rem]">
                {card.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#5d6b82] sm:text-[1.03rem]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
