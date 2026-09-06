export default function MarketDepth({ stock }) {
    if (!stock) {
        return null;
    }

    const spread = 0.05;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5">
                <h2 className="text-lg font-semibold">
                    Market Depth
                </h2>

                <p className="text-sm text-gray-400">
                    {stock.symbol}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

                {/* Buy */}
                <div>
                    <div className="mb-3 flex justify-between text-xs">
                        <span className="text-green-400">
                            Buyers
                        </span>

                        <span className="text-gray-500">
                            Qty
                        </span>
                    </div>

                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="mb-2 flex justify-between rounded bg-green-500/5 px-2 py-2 text-xs"
                        >
                            <span className="text-green-400">
                                ₹{(stock.price - item * spread).toFixed(2)}
                            </span>

                            <span className="text-gray-400">
                                {item * 100}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Sell */}
                <div>
                    <div className="mb-3 flex justify-between text-xs">
                        <span className="text-red-400">
                            Sellers
                        </span>

                        <span className="text-gray-500">
                            Qty
                        </span>
                    </div>

                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="mb-2 flex justify-between rounded bg-red-500/5 px-2 py-2 text-xs"
                        >
                            <span className="text-red-400">
                                ₹{(stock.price + item * spread).toFixed(2)}
                            </span>

                            <span className="text-gray-400">
                                {item * 100}
                            </span>
                        </div>
                    ))}
                </div>

            </div>

            <div className="mt-4 border-t border-white/10 pt-4 text-center">
                <span className="text-xs text-gray-500">
                    Live order book will be connected later
                </span>
            </div>

        </div>
    );
}
