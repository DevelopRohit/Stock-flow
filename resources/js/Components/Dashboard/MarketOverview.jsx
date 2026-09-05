export default function MarketOverview() {
    const markets = [
        {
            name: "NIFTY 50",
            value: "24,718.35",
            change: "+0.84%",
        },
        {
            name: "BANK NIFTY",
            value: "54,820.20",
            change: "+1.12%",
        },
        {
            name: "SENSEX",
            value: "81,120.40",
            change: "+0.76%",
        },
        {
            name: "NASDAQ",
            value: "17,832.60",
            change: "+0.43%",
        },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <h3 className="mb-5 font-bold">
                Market Overview
            </h3>

            <div className="space-y-3">

                {markets.map((market) => (
                    <div
                        key={market.name}
                        className="flex items-center justify-between rounded-xl bg-white/5 p-3"
                    >

                        <div>
                            <p className="text-xs text-gray-500">
                                {market.name}
                            </p>

                            <p className="mt-1 font-semibold">
                                {market.value}
                            </p>
                        </div>

                        <span className="text-xs font-semibold text-green-400">
                            {market.change}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
}