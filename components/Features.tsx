import Link from "next/link";

function ShopifyBtn() {
  return (
    <Link
      href="https://apps.shopify.com/"
      className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-green text-white hover:bg-green-700 hover:-translate-y-px transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      Get the App on Shopify
    </Link>
  );
}
function DemoBtn() {
  return (
    <Link href="#" className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-[1.5px] border-brand-border text-brand-text hover:border-primary hover:text-primary transition-all">
      Live Demo
    </Link>
  );
}

export default function Features() {
  return (
    <section className="px-[5%] py-20" id="features" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[13px] font-semibold text-primary uppercase tracking-[1px] mb-3">
            Key Features
          </p>
          <h2 id="features-heading" className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Everything You Need to Sell More
          </h2>
          <p className="text-[17px] text-brand-muted max-w-xl mx-auto leading-relaxed">
            MultiVariants enables easy bulk ordering for eCommerce through key
            features that increase conversions, value, and revenues.
          </p>
        </div>

        <ul className="list-none flex flex-col gap-20" role="list">

          {/* ── Feature 1: Mix n Match ── */}
          <li className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex bg-primary-light text-primary rounded-full px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.5px] mb-4">
                Mix n Match
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 leading-snug">
                Let Your Customers Build Their Own Box
              </h3>
              <p className="text-[16px] text-brand-muted leading-[1.75] mb-4">
                Mix and Match allows clients to submit orders that meet minimum
                or maximum order limits. It&apos;s a great way to increase
                sales and boost customer satisfaction by enabling them to create
                a more personalized shopping experience.
              </p>
              <div className="flex gap-3 flex-wrap">
                <ShopifyBtn /><DemoBtn />
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light to-[#e8f8f8] rounded-[20px] p-8 border border-brand-border min-h-[280px] flex flex-col gap-3" aria-hidden="true">
              <p className="text-[13px] font-semibold text-brand-muted uppercase tracking-[0.5px]">Build Your Box</p>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-brand-border">
                <p className="font-bold text-[15px] mb-3">Premium T-Shirt Bundle</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Red ✓",  cls: "border-brand-green bg-[#f0fff4] text-green-700" },
                    { label: "Blue 2", cls: "border-primary bg-primary-light text-primary" },
                    { label: "Green",  cls: "border-brand-border bg-white text-brand-text" },
                    { label: "Black ✓",cls: "border-brand-green bg-[#f0fff4] text-green-700" },
                    { label: "White",  cls: "border-brand-border bg-white text-brand-text" },
                    { label: "Navy 1", cls: "border-primary bg-primary-light text-primary" },
                  ].map((v) => (
                    <span key={v.label} className={`border-[1.5px] rounded-lg py-2 text-center text-[12px] font-semibold ${v.cls}`}>{v.label}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5 mb-3 text-[12px] font-semibold">
                  <span className="flex-1">Total: 4 of 6 required</span>
                  <div className="flex-1 h-1.5 bg-brand-border rounded-full overflow-hidden">
                    <div className="h-full w-[66%] bg-primary rounded-full" />
                  </div>
                </div>
                <button className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold">Add Box to Cart</button>
              </div>
            </div>
          </li>

          {/* ── Feature 2: Restrictions ── */}
          <li className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <span className="inline-flex bg-primary-light text-primary rounded-full px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.5px] mb-4">
                Apply Multiple Restrictions
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 leading-snug">
                Minimum Order Value Restriction
              </h3>
              <p className="text-[16px] text-brand-muted leading-[1.75] mb-4">
                MultiVariants allows you to apply multiple restrictions to a
                single product page, including restrictions per product and per
                variant. Set maximum order quantities, enforce minimums per
                color or size, and prevent overselling effortlessly.
              </p>
              <p className="text-[14px] bg-primary-light px-4 py-3 rounded-lg border-l-[3px] border-primary text-brand-text mb-5">
                <strong>Example:</strong> Max 5 T-shirts total, min 3 red
                T-shirts. Customers must order 3 red + at least 2 of any other color.
              </p>
              <div className="flex gap-3 flex-wrap">
                <ShopifyBtn /><DemoBtn />
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light to-[#e8f8f8] rounded-[20px] p-8 border border-brand-border min-h-[280px] flex flex-col gap-3 lg:order-1" aria-hidden="true">
              <p className="text-[13px] font-semibold text-brand-muted uppercase tracking-[0.5px]">Order Restrictions</p>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-brand-border flex flex-col divide-y divide-brand-border">
                {[
                  { color: "#ef4444", label: "Red T-Shirt",   vals: ["Min 3"] },
                  { color: "#3b82f6", label: "Blue T-Shirt",  vals: ["Min 0"] },
                  { color: "#22c55e", label: "Green T-Shirt", vals: ["Min 0"] },
                  { color: "#5C6AC4", label: "Total Order",   vals: ["Min 5", "Max 20"], red: true },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-2.5 py-2 last:pb-0 first:pt-0 text-[13px]">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                    <span className="flex-1 font-medium">{r.label}</span>
                    {r.vals.map((v, i) => (
                      <span key={v} className={`text-xs font-bold px-2 py-0.5 rounded-md ${i > 0 && r.red ? "bg-[#fee2e2] text-red-600" : "bg-primary-light text-primary"}`}>{v}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </li>

          {/* ── Feature 3: Incremental Qty ── */}
          <li className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex bg-primary-light text-primary rounded-full px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.5px] mb-4">
                Incremental Quantity
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 leading-snug">
                Add Incremental Quantity for Product Variants
              </h3>
              <p className="text-[16px] text-brand-muted leading-[1.75] mb-3">
                Set product quantity increments with the MultiVariants
                Professional plan. For a quantity of 12, specify increments of
                12, 24, 36, 48, and 60. Perfect for companies that sell bulk
                products — prevents overselling of limited-stock items.
              </p>
              <p className="text-[14px] text-brand-muted leading-relaxed mb-5">
                Buyers can manually click plus/minus buttons or type a quantity.
                The value will always snap to the nearest valid increment.
              </p>
              <div className="flex gap-3 flex-wrap">
                <ShopifyBtn /><DemoBtn />
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light to-[#e8f8f8] rounded-[20px] p-8 border border-brand-border min-h-[280px] flex flex-col gap-3" aria-hidden="true">
              <p className="text-[13px] font-semibold text-brand-muted uppercase tracking-[0.5px]">Quantity Increments</p>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-brand-border">
                <p className="text-[13px] font-semibold mb-2.5">Case of Cans (qty)</p>
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {[12, 24, 36, 48, 60].map((n) => (
                    <span key={n} className={`border-[1.5px] rounded-md px-2.5 py-1 text-[12px] font-bold ${n === 24 ? "border-primary bg-primary text-white" : "border-brand-border text-brand-text"}`}>{n}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 justify-center mb-2.5">
                  <button className="w-9 h-9 border-[1.5px] border-brand-border bg-brand-alt rounded-lg text-lg font-semibold text-brand-muted flex items-center justify-center">−</button>
                  <span className="w-16 text-center text-3xl font-black text-primary">24</span>
                  <button className="w-9 h-9 border-[1.5px] border-brand-border bg-brand-alt rounded-lg text-lg font-semibold text-brand-muted flex items-center justify-center">+</button>
                </div>
                <p className="text-[12px] text-brand-muted text-center">Step: 12 · Range: 12 – 60</p>
              </div>
            </div>
          </li>
        </ul>

        {/* Bottom CTA */}
        <div className="text-center mt-14 flex flex-col items-center gap-5">
          <Link href="#" className="inline-flex items-center px-7 py-3.5 rounded-xl text-base font-semibold border-[1.5px] border-brand-border text-brand-text hover:border-primary hover:text-primary transition-all">
            See All Features
          </Link>
          <div className="inline-flex items-center gap-2 bg-white border border-brand-border rounded-full px-4 py-2 text-[13px] font-semibold shadow-sm flex-wrap justify-center">
            <span className="text-amber-400">★★★★★</span>
            <strong>350+ reviews</strong>
            <span className="text-brand-muted">·</span>
            <Link href="https://apps.shopify.com/" target="_blank" rel="noopener noreferrer" className="text-primary">Get on Shopify</Link>
            <span className="text-brand-muted text-[12px]">· Free plan · 7-Day Trial</span>
          </div>
        </div>
      </div>
    </section>
  );
}
