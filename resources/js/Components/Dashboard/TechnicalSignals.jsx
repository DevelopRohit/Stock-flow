export default function TechnicalSignals() {
    const indicators = [
        {
            name: "RSI",
            value: "62.4",
            signal: "BUY",
        },
        {
            name: "MACD",
            value: "+18.42",
            signal: "BUY",
        },
        {
            name: "EMA 20",
            value: "2,420.10",
            signal: "BUY",
        },
        {
            name: "EMA 50",
            value: "2,365.80",
            signal: "BUY",
        },
        {
            name: "Bollinger",
            value: "Upper",
            signal: "NEUTRAL",
        },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5 flex items-center justify-between">

                <h3 className="font-bold">
                    Technical Signals
                </h3>

                <span className="rounded-md bg-green-500/10 px-2 py-1 text-[10px] font-bold text-green-400">
                    BULLISH
                </span>

            </div>

            <div className="space-y-3">

                {indicators.map((indicator) => (
                    <div
                        key={indicator.name}
                        className="flex items-center justify-between"
                    >

                        <div>
                            <p className="text-xs font-medium">
                                {indicator.name}
                            </p>

                            <p className="mt-1 text-[10px] text-gray-600">
                                {indicator.value}
                            </p>
                        </div>

                        <span
                            className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                                indicator.signal === "BUY"
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-yellow-500/10 text-yellow-400"
                            }`}
                        >
                            {indicator.signal}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
}