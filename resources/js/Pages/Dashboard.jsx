import { Head } from "@inertiajs/react";
import { useState } from "react";

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

    const [stock, setStock] = useState({
        symbol: "RELIANCE",
        name: "Reliance Industries",
        price: 2456.75,
        change: 32.45,
        changePercent: 1.34,
    });

    const handleSearch = (symbol) => {
        setStock({
            symbol: symbol,
            name: `${symbol} Stock`,
            price: 2456.75,
            change: 32.45,
            changePercent: 1.34,
        });
    };

    return (
        <>
            <Head title="StockFlow Pro" />

            <div className="min-h-screen bg-[#0b1120] text-white">

                {/* Sidebar */}
                <Sidebar />

                {/* Main */}
                <main className="lg:ml-64">

                    {/* Topbar */}
                    <Topbar onSearch={handleSearch} />

                    <div className="p-5 lg:p-7">

                        {/* Stock Header */}
                        <StockHeader stock={stock} />

                        {/* Main Trading Area */}
                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

                            {/* Chart */}
                            <div className="xl:col-span-2">
                                <TradingChart />
                            </div>

                            {/* Order */}
                            <OrderPanel stock={stock} />

                        </div>

                        {/* Position */}
                        <div className="mt-5">
                            <PositionCard stock={stock} />
                        </div>

                        {/* Lower Dashboard */}
                        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

                            <MarketDepth />

                            <Watchlist />

                            <TechnicalSignals />

                        </div>

                        {/* Market Overview */}
                        <div className="mt-5">
                            <MarketOverview />
                        </div>

                    </div>

                </main>

            </div>
        </>
    );
}