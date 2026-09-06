export default function MarketOverview({ stock }) {
    if (!stock) {
        return null;
    }

    const positive = stock.change >= 0;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5">
                <h2 className="text-lg font-semibold">
                    Market Overview
                </h2>

                <p className="text-sm text-gray-400">
                    Current market information
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Selected Stock */}
                <div className="rounded-xl bg-[#0b1120] p-4">

                    <p className="text-xs text-gray-500">
                        Selected Stock
                    </p>

                    <div className="mt-2 flex items-center justify-between">

                        <span className="font-semibold">
                            {stock.symbol}
                        </span>

                        <span className="text-sm">
                            ₹{stock.price.toFixed(2)}
                        </span>

                    </div>

                </div>

                {/* Performance */}
                <div className="rounded-xl bg-[#0b1120] p-4">

                    <p className="text-xs text-gray-500">
                        Daily Performance
                    </p>

                    <div
                        className={`mt-2 text-xl font-bold ${
                            positive
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {positive ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                    </div>

                </div>

                {/* Volume */}
                <div className="rounded-xl bg-[#0b1120] p-4">

                    <p className="text-xs text-gray-500">
                        Trading Volume
                    </p>

                    <div className="mt-2 text-xl font-bold">
                        {stock.volume.toLocaleString()}
                    </div>

                </div>

            </div>

            <div className="mt-5 border-t border-white/10 pt-5">

                <div className="flex flex-wrap gap-3 text-xs text-gray-500">

                    <span>
                        Open: ₹{stock.open.toFixed(2)}
                    </span>

                    <span>
                        High: ₹{stock.high.toFixed(2)}
                    </span>

                    <span>
                        Low: ₹{stock.low.toFixed(2)}
                    </span>

                    <span>
                        Data: Alpha Vantage
                    </span>

                </div>

            </div>

        </div>
    );
}
