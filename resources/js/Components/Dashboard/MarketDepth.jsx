export default function MarketDepth() {
    const asks = [
        ["2,462.50", "1,250"],
        ["2,460.20", "890"],
        ["2,458.90", "1,420"],
        ["2,457.80", "720"],
        ["2,457.10", "1,050"],
    ];

    const bids = [
        ["2,456.75", "2,150"],
        ["2,455.90", "1,120"],
        ["2,454.50", "980"],
        ["2,453.20", "1,560"],
        ["2,451.80", "2,010"],
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5 flex items-center justify-between">

                <h3 className="font-bold">
                    Market Depth
                </h3>

                <span className="text-xs text-gray-500">
                    NSE
                </span>

            </div>

            <div className="grid grid-cols-2 gap-5">

                {/* Sell */}
                <div>

                    <div className="mb-3 flex justify-between text-[10px] uppercase text-gray-600">
                        <span>Sell</span>
                        <span>Qty</span>
                    </div>

                    {asks.map(([price, qty]) => (
                        <div
                            key={price}
                            className="flex justify-between border-b border-white/5 py-2 text-xs"
                        >
                            <span className="text-red-400">
                                {price}
                            </span>

                            <span className="text-gray-400">
                                {qty}
                            </span>
                        </div>
                    ))}

                </div>

                {/* Buy */}
                <div>

                    <div className="mb-3 flex justify-between text-[10px] uppercase text-gray-600">
                        <span>Buy</span>
                        <span>Qty</span>
                    </div>

                    {bids.map(([price, qty]) => (
                        <div
                            key={price}
                            className="flex justify-between border-b border-white/5 py-2 text-xs"
                        >
                            <span className="text-green-400">
                                {price}
                            </span>

                            <span className="text-gray-400">
                                {qty}
                            </span>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}