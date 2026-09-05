import { useState } from "react";

export default function TradingChart() {
    const [chartType, setChartType] = useState("candles");
    const [period, setPeriod] = useState("1D");

    const periods = [
        "1m",
        "5m",
        "15m",
        "1H",
        "1D",
        "1W",
        "1M",
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            {/* Header */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                {/* Chart Type */}
                <div className="flex rounded-lg bg-white/5 p-1">

                    {["candles", "line", "area"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setChartType(type)}
                            className={`rounded-md px-3 py-2 text-xs capitalize transition ${
                                chartType === type
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-500 hover:text-white"
                            }`}
                        >
                            {type}
                        </button>
                    ))}

                </div>

                {/* Time Period */}
                <div className="flex flex-wrap gap-1">

                    {periods.map((item) => (
                        <button
                            key={item}
                            onClick={() => setPeriod(item)}
                            className={`rounded-md px-2.5 py-2 text-xs transition ${
                                period === item
                                    ? "bg-white/10 text-white"
                                    : "text-gray-600 hover:text-white"
                            }`}
                        >
                            {item}
                        </button>
                    ))}

                </div>

            </div>

            {/* Chart */}
            <div className="relative h-[430px] overflow-hidden rounded-xl border border-white/5 bg-[#09111f]">

                {/* Grid */}
                <div className="absolute inset-0 opacity-30">
                    <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:55px_55px]" />
                </div>

                {/* Price labels */}
                <div className="absolute right-2 top-8 space-y-12 text-[10px] text-gray-600">
                    <div>2,500</div>
                    <div>2,475</div>
                    <div>2,450</div>
                    <div>2,425</div>
                    <div>2,400</div>
                </div>

                {/* Chart SVG */}
                <svg
                    viewBox="0 0 1000 400"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full px-2"
                >
                    <defs>
                        <linearGradient
                            id="chartArea"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopOpacity=".25"
                            />

                            <stop
                                offset="100%"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>

                    <path
                        d="M0 310
                        L45 295
                        L90 305
                        L135 260
                        L180 275
                        L225 230
                        L270 240
                        L315 195
                        L360 210
                        L405 165
                        L450 180
                        L495 140
                        L540 155
                        L585 115
                        L630 135
                        L675 100
                        L720 120
                        L765 82
                        L810 105
                        L855 70
                        L900 88
                        L945 55
                        L1000 70
                        L1000 400
                        L0 400 Z"
                        fill="url(#chartArea)"
                    />

                    <path
                        d="M0 310
                        L45 295
                        L90 305
                        L135 260
                        L180 275
                        L225 230
                        L270 240
                        L315 195
                        L360 210
                        L405 165
                        L450 180
                        L495 140
                        L540 155
                        L585 115
                        L630 135
                        L675 100
                        L720 120
                        L765 82
                        L810 105
                        L855 70
                        L900 88
                        L945 55
                        L1000 70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                </svg>

                {/* Current Price */}
                <div className="absolute right-2 top-[16%] flex items-center gap-2">

                    <div className="h-px w-12 border-t border-dashed border-green-500/50" />

                    <span className="rounded bg-green-500 px-2 py-1 text-xs font-bold text-black">
                        2,456.75
                    </span>

                </div>

                {/* Volume */}
                <div className="absolute bottom-3 left-3 right-16 flex h-20 items-end gap-1 opacity-30">

                    {[25, 45, 35, 60, 30, 75, 45, 55, 35, 80, 50, 65, 40, 70, 45, 85, 55, 65, 50, 75].map(
                        (height, index) => (
                            <div
                                key={index}
                                className="flex-1 rounded-t bg-blue-500"
                                style={{ height: `${height}%` }}
                            />
                        )
                    )}

                </div>

            </div>

            {/* OHLC */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">

                <span>
                    O{" "}
                    <b className="text-gray-300">
                        2,425.00
                    </b>
                </span>

                <span>
                    H{" "}
                    <b className="text-green-400">
                        2,478.90
                    </b>
                </span>

                <span>
                    L{" "}
                    <b className="text-red-400">
                        2,412.30
                    </b>
                </span>

                <span>
                    C{" "}
                    <b className="text-gray-300">
                        2,456.75
                    </b>
                </span>

                <span>
                    VOL{" "}
                    <b className="text-gray-300">
                        12.45M
                    </b>
                </span>

            </div>

        </div>
    );
}