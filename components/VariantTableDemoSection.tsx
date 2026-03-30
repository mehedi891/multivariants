"use client";

import { useMemo, useState } from "react";
import AnimateIn from "./AnimateIn";

const unitPrice = 29.99;
const sizes  = ["S", "M", "L", "XL", "XXL"] as const;
const colors = ["Black", "White", "Navy", "Gray"] as const;

type Size  = (typeof sizes)[number];
type Color = (typeof colors)[number];
type QuantityMap = Record<Size, Record<Color, number>>;

const initialQuantities: QuantityMap = {
  S:   { Black: 0, White: 0, Navy: 0, Gray: 0 },
  M:   { Black: 0, White: 0, Navy: 0, Gray: 0 },
  L:   { Black: 0, White: 0, Navy: 0, Gray: 0 },
  XL:  { Black: 0, White: 0, Navy: 0, Gray: 0 },
  XXL: { Black: 0, White: 0, Navy: 0, Gray: 0 },
};

function formatCurrency(v: number) {
  return v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function VariantTableDemoSection() {
  const [quantities, setQuantities] = useState<QuantityMap>(initialQuantities);

  const totalItems = useMemo(
    () => sizes.reduce((s, sz) => s + colors.reduce((r, c) => r + quantities[sz][c], 0), 0),
    [quantities]
  );
  const totalPrice = useMemo(() => totalItems * unitPrice, [totalItems]);

  const update = (size: Size, color: Color, val: number) => {
    const safe = Number.isFinite(val) ? Math.max(0, Math.min(99, Math.floor(val))) : 0;
    setQuantities((p) => ({ ...p, [size]: { ...p[size], [color]: safe } }));
  };

  return (
    <section
      className="relative overflow-hidden px-[5%] py-16 lg:py-24"
      style={{ background: "linear-gradient(160deg, #1a1040 0%, #0f172a 60%, #0a1628 100%)" }}
      aria-labelledby="variant-demo-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimateIn direction="up">
          <div className="text-center mb-12">
            <span className="inline-flex rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/30">
              Live Demo
            </span>
            <h2 id="variant-demo-heading" className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Try the Variant Table
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 sm:text-lg">
              Experience how your customers will order. Click +/− or type quantities directly.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn direction="up" delay={150}>
          <div className="glass rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.4)] border-white/15 hover:border-white/25 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-white/10 p-5 sm:p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-3xl border border-white/15">
                👕
              </div>
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">Premium Cotton T-Shirt</p>
                <p className="mt-1 text-base font-medium text-white/50">$29.99 per unit</p>
                <div className="mt-1.5 flex items-center gap-3 text-xs font-semibold">
                  <span className="rounded bg-accent/20 px-2 py-0.5 text-accent border border-accent/30">In Stock</span>
                  <span className="text-white/30">SKU: PCT-001</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-sm font-semibold text-white/40">
                    <th className="px-5 py-4">Size</th>
                    {colors.map((c) => (
                      <th key={c} className="px-4 py-4 text-center">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((size) => (
                    <tr key={size} className="border-b border-white/8 last:border-0">
                      <td className="px-5 py-3.5 text-base font-bold text-white/80">{size}</td>
                      {colors.map((color) => (
                        <td key={`${size}-${color}`} className="px-4 py-3.5">
                          <div className="mx-auto flex w-fit items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => update(size, color, quantities[size][color] - 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-white/50 hover:bg-white/15 hover:text-white transition-all border border-white/10"
                              aria-label={`Decrease ${size} ${color}`}
                            >−</button>
                            <input
                              type="number" min={0} max={99}
                              value={quantities[size][color]}
                              onChange={(e) => update(size, color, parseInt(e.target.value, 10) || 0)}
                              className={`h-8 w-11 rounded-lg border text-center text-sm font-bold bg-transparent outline-none transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                                quantities[size][color] > 0
                                  ? "border-accent/50 text-accent"
                                  : "border-white/15 text-white/35"
                              }`}
                              aria-label={`${size} ${color} quantity`}
                            />
                            <button
                              type="button"
                              onClick={() => update(size, color, quantities[size][color] + 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-white/50 hover:bg-white/15 hover:text-white transition-all border border-white/10"
                              aria-label={`Increase ${size} ${color}`}
                            >+</button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-5 border-t border-white/10 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
              <div className="flex flex-wrap items-end gap-8">
                <div>
                  <p className="text-xs font-medium text-white/40 mb-1">Total Items</p>
                  <p className="text-4xl font-black text-white leading-none">{totalItems}</p>
                </div>
                <div className="sm:border-l sm:border-white/10 sm:pl-8">
                  <p className="text-xs font-medium text-white/40 mb-1">Total Price</p>
                  <p className="text-4xl font-black text-accent leading-none">${formatCurrency(totalPrice)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setQuantities(initialQuantities)}
                  className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/8 hover:text-white transition-all"
                >
                  Reset
                </button>
                <button className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent/80 shadow-[0_0_20px_rgba(71,193,191,0.4)] hover:shadow-[0_0_30px_rgba(71,193,191,0.6)] transition-all">
                  Add All to Cart
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn direction="up" delay={200}>
          <p className="mt-5 text-center text-sm text-white/35">
            This is a live demo. Try adding quantities to see the total update in real-time!
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
