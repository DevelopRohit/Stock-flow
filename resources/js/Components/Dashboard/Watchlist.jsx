export default function Watchlist() {
    const stocks = [
        {
            symbol: "RELIANCE",
            price: "2,456.75",
            change: "+1.34%",
        },
        {
            symbol: "TCS",
            price: "3,982.40",
            change: "+0.82%",
        },
        {
            symbol: "INFY",
            price: "1,845.20",
            change: "-0.42%",
        },
        {
            symbol: "HDFCBANK",
            price: "1,725.60",
            change: "+1.12%",
        },
        {
            symbol: "ICICIBANK",
            price: "1,348.30",
            change: "+0.67%",
        },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5 flex items-center justify-between">

                <h3 className="font-bold">
                    Watchlist
                </h3>

                <button className="text-lg text-gray-500 hover:text-white">
                    +
                </button>

            </div>

            <div className="space-y-1">

                {stocks.map((stock) => {
                    const positive = stock.change.startsWith("+");

                    return (
                        <div
                            key={stock.symbol}
                            className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-white/5"
                        >

                            <div>
                                <p className="text-sm font-semibold">
                                    {stock.symbol}
                                </p>

                                <p className="text-[10px] text-gray-600">
                                    NSE
                                </p>
                            </div>

                            <div className="text-right">

                                <p className="text-sm font-semibold">
                                    ₹{stock.price}
                                </p>

                                <p
                                    className={`text-xs ${
                                        positive
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {stock.change}
                                </p>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}