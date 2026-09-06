import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import Sidebar from "../Components/Dashboard/Sidebar";
import Topbar from "../Components/Dashboard/Topbar";
import StockHeader from "../Components/Dashboard/StockHeader";
import TradingChart from "../Components/Dashboard/TradingChart";
import OrderPanel from "../Components/Dashboard/OrderPanel";
import PositionCard from "../Components/Dashboard/PositionCard";
import MarketDepth from "../Components/Dashboard/MarketDepth";
import Watchlist from "../Components/Dashboard/Watchlist";
import MarketOverview from "../Components/Dashboard/MarketOverview";
import TechnicalSignals from "../Components/Dashboard/TechnicalSignals";

export default function Dashboard() {
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStock = async (symbol = "RELIANCE.BSE") => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/stock/${encodeURIComponent(symbol)}`
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to fetch stock data."
                );
            }

            const prices = Object.entries(result.data || {})
                .map(([date, values]) => ({
                    date,
                    open: Number(values["1. open"]),
                    high: Number(values["2. high"]),
                    low: Number(values["3. low"]),
                    close: Number(values["4. close"]),
                    volume: Number(values["5. volume"]),
                }))
                .filter((item) => Number.isFinite(item.close))
                .sort(
                    (a, b) =>
                        new Date(a.date) - new Date(b.date)
                );

            if (!prices.length) {
                throw new Error(
                    "No stock price data was returned by the API."
                );
            }

            const latest = prices[prices.length - 1];
            const previous = prices[prices.length - 2];

            const change =
                latest && previous
                    ? latest.close - previous.close
                    : 0;

            const changePercent =
                latest && previous && previous.close !== 0
                    ? (change / previous.close) * 100
                    : 0;

            const cleanSymbol = result.symbol
                .replace(".BSE", "")
                .replace(".NSE", "");

            setStock({
                symbol: cleanSymbol,
                apiSymbol: result.symbol,
                name: `${cleanSymbol} Stock`,
                price: latest?.close ?? 0,
                change,
                changePercent,
                open: latest?.open ?? 0,
                high: latest?.high ?? 0,
                low: latest?.low ?? 0,
                volume: latest?.volume ?? 0,
                prices,
            });
        } catch (err) {
            setStock(null);
            setError(
                err.message || "Something went wrong while loading stock data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStock();
    }, []);

    const handleSearch = (symbol) => {
        if (!symbol) {
            return;
        }

        let apiSymbol = symbol.toUpperCase().trim();

        if (!apiSymbol.includes(".")) {
            apiSymbol = `${apiSymbol}.BSE`;
        }

        fetchStock(apiSymbol);
    };

    return (
        <>
            <Head title="StockFlow Pro" />

            <div className="min-h-screen bg-[#0b1120] text-white">

                <Sidebar />

                <main className="lg:ml-64">

                    <Topbar onSearch={handleSearch} />

                    <div className="p-5 lg:p-7">

                        {loading && (
                            <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-5 text-gray-300">
                                Loading stock data...
                            </div>
                        )}

                        {error && (
                            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
                                <div className="font-semibold">
                                    Unable to load stock
                                </div>

                                <div className="mt-1 text-sm">
                                    {error}
                                </div>
                            </div>
                        )}

                        {stock && !loading && (
                            <>
                                <StockHeader stock={stock} />

                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

                                    <div className="xl:col-span-2">
                                        <TradingChart stock={stock} />
                                    </div>

                                    <OrderPanel stock={stock} />

                                </div>

                                <div className="mt-5">
                                    <PositionCard stock={stock} />
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

                                    <MarketDepth stock={stock} />

                                    <Watchlist stock={stock} />

                                    <TechnicalSignals stock={stock} />

                                </div>

                                <div className="mt-5">
                                    <MarketOverview stock={stock} />
                                </div>
                            </>
                        )}

                    </div>

                </main>

            </div>
        </>
    );
}
