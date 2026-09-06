export default function TechnicalSignals({ stock }) {
    if (!stock) {
        return null;
    }

    const positive = stock.change >= 0;

    const signals = [
        {
            name: "Price Trend",
            value: positive ? "Bullish" : "Bearish",
            positive,
        },
        {
            name: "Daily Change",
            value: `${stock.changePercent.toFixed(2)}%`,
            positive,
        },
        {
            name: "Market Momentum",
            value: positive ? "Positive" : "Negative",
            positive,
        },
        {
            name: "Volume",
            value: stock.volume.toLocaleString(),
            positive: undefined,
        },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5">
                <h2 className="text-lg font-semibold">
                    Technical Signals
                </h2>

                <p className="text-sm text-gray-400">
                    {stock.symbol}
                </p>
            </div>

            <div className="space-y-3">

                {signals.map((signal) => (
                    <div
                        key={signal.name}
                        className="flex items-center justify-between rounded-xl bg-[#0b1120] px-4 py-3"
                    >

                        <span className="text-sm text-gray-400">
                            {signal.name}
                        </span>

                        <span
                            className={`text-sm font-semibold ${
                                signal.positive === undefined
                                    ? "text-white"
                                    : signal.positive
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {signal.value}
                        </span>

                    </div>
                ))}

            </div>

            <p className="mt-4 text-xs text-gray-500">
                Advanced indicators such as RSI, MACD and moving averages
                will be added later.
            </p>

        </div>
    );
}
