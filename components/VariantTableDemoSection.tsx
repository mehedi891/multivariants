"use client";

import { useMemo, useState } from "react";

const unitPrice = 29.99;
const sizes = ["S", "M", "L", "XL", "XXL"] as const;
const colors = ["Black", "White", "Navy", "Gray"] as const;

type Size = (typeof sizes)[number];
type Color = (typeof colors)[number];
type QuantityMap = Record<Size, Record<Color, number>>;

const initialQuantities: QuantityMap = {
  S: { Black: 0, White: 0, Navy: 0, Gray: 0 },
  M: { Black: 0, White: 0, Navy: 0, Gray: 0 },
  L: { Black: 0, White: 0, Navy: 0, Gray: 0 },
  XL: { Black: 0, White: 0, Navy: 0, Gray: 0 },
  XXL: { Black: 0, White: 0, Navy: 0, Gray: 0 },
};

function formatCurrency(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function VariantTableDemoSection() {
  const [quantities, setQuantities] = useState<QuantityMap>(initialQuantities);

  const totalItems = useMemo(
    () =>
      sizes.reduce(
        (sum, size) =>
          sum +
          colors.reduce((rowTotal, color) => rowTotal + quantities[size][color], 0),
        0
      ),
    [quantities]
  );

  const totalPrice = useMemo(() => totalItems * unitPrice, [totalItems]);

  const updateQuantity = (size: Size, color: Color, nextValue: number) => {
    const safeValue = Number.isFinite(nextValue)
      ? Math.max(0, Math.min(99, Math.floor(nextValue)))
      : 0;

    setQuantities((prev) => ({
      ...prev,
      [size]: {
        ...prev[size],
        [color]: safeValue,
      },
    }));
  };

  const resetQuantities = () => setQuantities(initialQuantities);

  return (
    <section className="bg-white px-[5%] py-14 sm:py-16 lg:py-20" aria-labelledby="variant-table-demo">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#e6f5ec] px-4 py-1 text-sm font-semibold text-[#49a874]">
            Live Demo
          </span>
          <h2
            id="variant-table-demo"
            className="mt-4 text-3xl font-black tracking-tight text-[#1f2938] sm:text-4xl"
          >
            Try the Variant Table
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-[#5e6d85] sm:text-lg">
            Experience how your customers will order. Click the +/- buttons or
            type quantities directly.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[18px] border border-[#dce3ea] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8c8dc] hover:shadow-[0_28px_50px_rgba(15,23,42,0.14)]">
          <div className="flex items-center gap-3 border-b border-[#dce3ea] p-4 sm:gap-4 sm:p-5 md:p-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#b4b9c0] text-2xl sm:h-16 sm:w-16">
              👕
            </div>
            <div>
              <p className="text-xl font-bold leading-tight text-[#1f2938] sm:text-[1.9rem]">
                Premium Cotton T-Shirt
              </p>
              <p className="mt-1 text-lg font-medium text-[#607085]">$29.99 per unit</p>
              <div className="mt-1.5 flex items-center gap-3 text-sm font-semibold">
                <span className="rounded bg-[#e6f5ec] px-2 py-0.5 text-[#49a874]">
                  In Stock
                </span>
                <span className="text-[#8a9ab1]">SKU: PCT-001</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse">
              <thead>
                <tr className="border-b border-[#e3e9ef] text-left text-sm font-semibold text-[#6a7990]">
                  <th className="px-4 py-4 sm:px-6">Size</th>
                  {colors.map((color) => (
                    <th key={color} className="px-4 py-4 text-center sm:px-6">
                      {color}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size} className="border-b border-[#e8edf2]">
                    <td className="px-4 py-3.5 text-lg font-semibold text-[#2a3446] sm:px-6">
                      {size}
                    </td>
                    {colors.map((color) => (
                      <td key={`${size}-${color}`} className="px-4 py-3.5 sm:px-6">
                        <div className="mx-auto flex w-fit items-center gap-1.5">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f5f8] text-lg font-semibold text-[#8897ac] hover:bg-[#e6edf4]"
                            onClick={() =>
                              updateQuantity(size, color, quantities[size][color] - 1)
                            }
                            aria-label={`Decrease ${size} ${color}`}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={0}
                            max={99}
                            value={quantities[size][color]}
                            onChange={(event) =>
                              updateQuantity(
                                size,
                                color,
                                Number.parseInt(event.target.value, 10) || 0
                              )
                            }
                            className={`h-8 w-10 rounded-lg border text-center text-base font-semibold outline-none ${
                              quantities[size][color] > 0
                                ? "border-[#6eb68f] text-[#2a8c5f]"
                                : "border-[#dce3ea] text-[#6a7990]"
                            } [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                            aria-label={`${size} ${color} quantity`}
                          />
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f5f8] text-lg font-semibold text-[#8897ac] hover:bg-[#e6edf4]"
                            onClick={() =>
                              updateQuantity(size, color, quantities[size][color] + 1)
                            }
                            aria-label={`Increase ${size} ${color}`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#dce3ea] p-4 sm:p-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-end gap-8">
              <div>
                <p className="text-sm font-medium text-[#7a8aa1]">Total Items</p>
                <p className="text-4xl font-black leading-none text-[#1f2938]">
                  {totalItems}
                </p>
              </div>
              <div className="md:border-l md:border-[#dce3ea] md:pl-6">
                <p className="text-sm font-medium text-[#7a8aa1]">Total Price</p>
                <p className="text-4xl font-black leading-none text-[#49a874]">
                  ${formatCurrency(totalPrice)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={resetQuantities}
                className="inline-flex rounded-xl border border-[#d6dde6] px-5 py-2.5 text-base font-semibold text-[#617089] hover:bg-[#f6f8fb]"
              >
                Reset
              </button>
              <button
                type="button"
                className="inline-flex rounded-xl bg-[#49a874] px-5 py-2.5 text-base font-semibold text-white hover:bg-[#3f9767]"
              >
                Add All to Cart
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-[#7a8aa1] sm:text-base">
          This is a live demo. Try adding quantities to see the total update in
          real-time!
        </p>
      </div>
    </section>
  );
}
