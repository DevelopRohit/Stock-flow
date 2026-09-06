import { useEffect, useState } from "react";

export default function Show({ symbol }) {
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/stock/${encodeURIComponent(symbol)}`)
            .then((response) => response.json())
            .then((result) => {
                if (!result.success) {
                    throw new Error(result.message);
                }

                setStock(result);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [symbol]);

    if (loading) {
        return (
            <div className="p-6">
                <p>Loading stock data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const prices = Object.entries(stock.data).map(([date, values]) => ({
        date,
        open: Number(values["1. open"]),
        high: Number(values["2. high"]),
        low: Number(values["3. low"]),
        close: Number(values["4. close"]),
        volume: Number(values["5. volume"]),
    }));

    const latest = prices[0];
    const previous = prices[1];

    const change = latest.close - previous.close;
    const changePercent = (change / previous.close) * 100;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500">
                        NSE / BSE Stock
                    </p>

                    <h1 className="text-3xl font-bold">
                        {stock.symbol}
                    </h1>
                </div>

                {/* Price Card */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow">

                    <div className="flex items-end gap-4">

                        <span className="text-4xl font-bold">
                            ₹{latest.close.toFixed(2)}
                        </span>

                        <span
                            className={
                                change >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(2)}
                            {" "}
                            ({changePercent.toFixed(2)}%)
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                        Latest available closing price
                    </p>
                </div>

                {/* Chart */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow">

                    <h2 className="mb-4 text-xl font-semibold">
                        Price Chart
                    </h2>

                    <div className="h-80 flex items-end gap-1 overflow-hidden">

                        {prices
                            .slice()
                            .reverse()
                            .map((item) => {
                                const max = Math.max(
                                    ...prices.map((p) => p.close)
                                );

                                const min = Math.min(
                                    ...prices.map((p) => p.close)
                                );

                                const height =
                                    ((item.close - min) /
                                        (max - min || 1)) *
                                    100;

                                return (
                                    <div
                                        key={item.date}
                                        className="flex-1"
                                    >
                                        <div
                                            className="w-full rounded-t bg-blue-500"
                                            style={{
                                                height: `${Math.max(
                                                    height,
                                                    2
                                                )}%`,
                                            }}
                                            title={`${item.date}: ₹${item.close}`}
                                        />
                                    </div>
                                );
                            })}

                    </div>
                </div>

                {/* Market Data */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            Open
                        </p>
                        <p className="mt-2 text-xl font-semibold">
                            ₹{latest.open.toFixed(2)}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            High
                        </p>
                        <p className="mt-2 text-xl font-semibold">
                            ₹{latest.high.toFixed(2)}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            Low
                        </p>
                        <p className="mt-2 text-xl font-semibold">
                            ₹{latest.low.toFixed(2)}
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-sm text-gray-500">
                            Volume
                        </p>
                        <p className="mt-2 text-xl font-semibold">
                            {latest.volume.toLocaleString()}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}