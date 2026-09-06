export default function Watchlist({ stock }) {
    if (!stock) {
        return null;
    }

    const positive = stock.change >= 0;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Watchlist
                    </h2>

                    <p className="text-sm text-gray-400">
                        Selected stock
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400 hover:text-white"
                >
                    + Add
                </button>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#0b1120] p-4">

                <div className="flex items-center justify-between">

                    <div>
                        <div className="font-semibold">
                            {stock.symbol}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                            {stock.name}
                        </div>
                    </div>

                    <div className="text-right">

                        <div className="font-semibold">
                            ₹{stock.price.toFixed(2)}
                        </div>

                        <div
                            className={`text-xs ${
                                positive
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {positive ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                        </div>

                    </div>

                </div>

            </div>

            <p className="mt-4 text-xs text-gray-500">
                Watchlist database functionality will be added later.
            </p>

        </div>
    );
}
