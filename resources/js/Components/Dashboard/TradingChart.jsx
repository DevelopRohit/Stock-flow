import { useMemo, useState } from "react";

export default function TradingChart({ stock }) {
    const [range, setRange] = useState("1M");

    const prices = stock?.prices ?? [];

    const filteredPrices = useMemo(() => {
        if (!prices.length) {
            return [];
        }

        let count = 30;

        if (range === "1D") {
            count = 1;
        }

        if (range === "1W") {
            count = 7;
        }

        if (range === "1M") {
            count = 30;
        }

        if (range === "6M") {
            count = 180;
        }

        if (range === "1Y") {
            count = 365;
        }

        return prices.slice(-count);
    }, [prices, range]);

    if (!stock || !filteredPrices.length) {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <div className="flex h-[420px] items-center justify-center text-gray-400">
                    No chart data available
                </div>
            </div>
        );
    }

    const values = filteredPrices.map((item) => item.close);

    const minPrice = Math.min(...values);
    const maxPrice = Math.max(...values);

    const priceRange = maxPrice - minPrice || 1;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            {/* Header */}
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {stock.symbol} Price Chart
                    </h2>

                    <p className="text-sm text-gray-400">
                        Historical closing price
                    </p>
                </div>

                {/* Range */}
                <div className="flex rounded-lg bg-[#0b1120] p-1">

                    {["1D", "1W", "1M", "6M", "1Y"].map(
                        (item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setRange(item)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                                    range === item
                                        ? "bg-white text-black"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {item}
                            </button>
                        )
                    )}

                </div>

            </div>

            {/* Price */}
            <div className="mb-5">

                <div className="text-3xl font-bold text-white">
                    ₹{stock.price.toFixed(2)}
                </div>

                <div
                    className={
                        stock.change >= 0
                            ? "text-sm text-green-400"
                            : "text-sm text-red-400"
                    }
                >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                    {" "}
                    ({stock.changePercent.toFixed(2)}%)
                </div>

            </div>

            {/* Chart */}
            <div className="relative h-[330px] w-full">

                {/* Grid */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">

                    {[0, 1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="border-t border-white/5"
                        />
                    ))}

                </div>

                {/* Data */}
                <div className="absolute inset-0 flex items-end gap-[2px] px-2 py-3">

                    {filteredPrices.map((item) => {

                        const height =
                            ((item.close - minPrice) /
                                priceRange) *
                            100;

                        return (
                            <div
                                key={item.date}
                                className="group relative flex h-full flex-1 items-end"
                            >

                                <div
                                    className="w-full rounded-t-sm bg-blue-500/80 transition-all hover:bg-blue-400"
                                    style={{
                                        height: `${Math.max(
                                            height,
                                            2
                                        )}%`,
                                    }}
                                />

                                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-xs shadow-lg group-hover:block">

                                    <div className="font-medium text-white">
                                        {item.date}
                                    </div>

                                    <div className="text-gray-300">
                                        ₹{item.close.toFixed(2)}
                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 md:grid-cols-4">

                <Stat
                    label="Open"
                    value={`₹${stock.open.toFixed(2)}`}
                />

                <Stat
                    label="High"
                    value={`₹${stock.high.toFixed(2)}`}
                />

                <Stat
                    label="Low"
                    value={`₹${stock.low.toFixed(2)}`}
                />

                <Stat
                    label="Volume"
                    value={stock.volume.toLocaleString()}
                />

            </div>

        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
                {value}
            </p>
        </div>
    );
}
