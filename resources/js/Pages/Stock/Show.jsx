import { useEffect, useState } from "react";
import TradingChart from "../../Components/Dashboard/TradingChart";

export default function Show({ symbol }) {
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

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
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <p>Loading stock data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (!stock || !stock.data) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <p>No stock data available.</p>
                </div>
            </div>
        );
    }

    const prices = Object.entries(stock.data)
        .map(([date, values]) => ({
            date,
            open: Number(values["1. open"]),
            high: Number(values["2. high"]),
            low: Number(values["3. low"]),
            close: Number(values["4. close"]),
            volume: Number(values["5. volume"]),
        }))
        .filter((item) => !Number.isNaN(item.close))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!prices.length) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <p>No price history available.</p>
                </div>
            </div>
        );
    }

    const latest = prices[0];
    const previous = prices[1] ?? prices[0];

    const change = latest.close - previous.close;

    const changePercent =
        previous.close !== 0
            ? (change / previous.close) * 100
            : 0;

    const chartStock = {
        symbol: stock.symbol,

        price: latest.close,

        change: change,

        changePercent: changePercent,

        open: latest.open,

        high: latest.high,

        low: latest.low,

        volume: latest.volume,

        prices: prices,
    };

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
                            {change.toFixed(2)}{" "}
                            ({changePercent.toFixed(2)}%)
                        </span>

                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                        Latest available closing price
                    </p>

                </div>

                {/* Trading Chart */}
                <div className="mb-6">
                    <TradingChart stock={chartStock} />
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