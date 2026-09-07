import React from "react";

const indices = [
    {
        name: "NIFTY 50",
        value: "24,832.20",
        change: "+125.40",
        percent: "+0.51%",
        positive: true,
    },
    {
        name: "SENSEX",
        value: "81,250.30",
        change: "+380.20",
        percent: "+0.47%",
        positive: true,
    },
    {
        name: "BANK NIFTY",
        value: "54,210.15",
        change: "-120.30",
        percent: "-0.22%",
        positive: false,
    },
    {
        name: "NIFTY IT",
        value: "38,450.80",
        change: "+240.10",
        percent: "+0.63%",
        positive: true,
    },
];

const gainers = [
    { symbol: "BEL", name: "Bharat Electronics", price: "₹342.20", change: "+4.91%" },
    { symbol: "INFY", name: "Infosys", price: "₹1,562.40", change: "+3.72%" },
    { symbol: "TCS", name: "Tata Consultancy Services", price: "₹2,270.00", change: "+2.84%" },
    { symbol: "MARUTI", name: "Maruti Suzuki", price: "₹12,450.00", change: "+2.31%" },
    { symbol: "ICICI", name: "ICICI Bank", price: "₹1,432.80", change: "+1.94%" },
];

const losers = [
    { symbol: "ADANI", name: "Adani Enterprises", price: "₹2,845.20", change: "-4.82%" },
    { symbol: "WIPRO", name: "Wipro", price: "₹512.30", change: "-3.91%" },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: "₹1,720.40", change: "-2.74%" },
    { symbol: "TATASTEEL", name: "Tata Steel", price: "₹158.20", change: "-2.15%" },
    { symbol: "ITC", name: "ITC Limited", price: "₹486.70", change: "-1.82%" },
];

const activeStocks = [
    {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        price: "₹2,945.20",
        change: "+1.24%",
        volume: "12.8M",
        marketCap: "₹19.92T",
        positive: true,
    },
    {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: "₹2,270.00",
        change: "+2.84%",
        volume: "9.6M",
        marketCap: "₹8.23T",
        positive: true,
    },
    {
        symbol: "HDFCBANK",
        name: "HDFC Bank",
        price: "₹1,720.40",
        change: "-2.74%",
        volume: "8.9M",
        marketCap: "₹13.11T",
        positive: false,
    },
    {
        symbol: "INFY",
        name: "Infosys",
        price: "₹1,562.40",
        change: "+3.72%",
        volume: "7.4M",
        marketCap: "₹6.47T",
        positive: true,
    },
    {
        symbol: "ICICIBANK",
        name: "ICICI Bank",
        price: "₹1,432.80",
        change: "+1.94%",
        volume: "6.8M",
        marketCap: "₹10.08T",
        positive: true,
    },
    {
        symbol: "WIPRO",
        name: "Wipro Limited",
        price: "₹512.30",
        change: "-3.91%",
        volume: "5.9M",
        marketCap: "₹2.68T",
        positive: false,
    },
];

const sectors = [
    { name: "IT", percent: "+1.42%", width: "88%", positive: true },
    { name: "Banking", percent: "+0.82%", width: "68%", positive: true },
    { name: "Auto", percent: "+0.51%", width: "52%", positive: true },
    { name: "Pharma", percent: "+0.22%", width: "35%", positive: true },
    { name: "FMCG", percent: "-0.31%", width: "42%", positive: false },
    { name: "Metal", percent: "-0.74%", width: "62%", positive: false },
];

function IndexCard({ index }) {
    return (
        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">{index.name}</span>

                <span
                    className={`rounded-md px-2 py-1 text-xs ${
                        index.positive
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                    }`}
                >
                    {index.percent}
                </span>
            </div>

            <div className="text-2xl font-bold text-white">
                {index.value}
            </div>

            <div
                className={`mt-2 text-sm ${
                    index.positive ? "text-green-400" : "text-red-400"
                }`}
            >
                {index.change} ({index.percent})
            </div>

            <div className="mt-4 h-8 overflow-hidden">
                <svg
                    viewBox="0 0 200 40"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                >
                    <polyline
                        points={
                            index.positive
                                ? "0,30 25,27 45,29 70,18 90,21 115,10 140,15 165,6 200,12"
                                : "0,8 25,12 45,10 70,20 90,18 115,28 140,22 165,34 200,30"
                        }
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={
                            index.positive
                                ? "text-green-400"
                                : "text-red-400"
                        }
                    />
                </svg>
            </div>
        </div>
    );
}

function StockRow({ stock, positive = true }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-800 py-4 last:border-0">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172033] text-xs font-bold text-white">
                    {stock.symbol.substring(0, 2)}
                </div>

                <div>
                    <div className="text-sm font-semibold text-white">
                        {stock.symbol}
                    </div>

                    <div className="max-w-[150px] truncate text-xs text-gray-500">
                        {stock.name}
                    </div>
                </div>
            </div>

            <div className="text-right">
                <div className="text-sm font-medium text-white">
                    {stock.price}
                </div>

                <div
                    className={`text-xs ${
                        positive ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {stock.change}
                </div>
            </div>
        </div>
    );
}

export default function Markets() {
    return (
        <div className="min-h-screen bg-[#0b1120] text-white">
            {/* Header */}
            <div className="border-b border-gray-800 bg-[#0b1120] px-6 py-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Markets</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Indian stock market overview
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-[#111827] px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-sm text-gray-300">
                                NSE LIVE
                            </span>
                        </div>

                        <span className="text-xs text-gray-500">
                            Last updated: 03:10 PM
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-6 p-6">
                {/* Market indices */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Market Overview
                            </h2>
                            <p className="text-xs text-gray-500">
                                Major Indian indices
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {indices.map((index) => (
                            <IndexCard key={index.name} index={index} />
                        ))}
                    </div>
                </section>

                {/* Gainers / Losers */}
                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {/* Gainers */}
                    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                        <div className="mb-2 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-white">
                                    Top Gainers
                                </h2>
                                <p className="mt-1 text-xs text-gray-500">
                                    Best performing stocks today
                                </p>
                            </div>

                            <div className="rounded-lg bg-green-500/10 px-3 py-2 text-green-400">
                                ↗
                            </div>
                        </div>

                        {gainers.map((stock) => (
                            <StockRow
                                key={stock.symbol}
                                stock={stock}
                                positive={true}
                            />
                        ))}
                    </div>

                    {/* Losers */}
                    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                        <div className="mb-2 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-white">
                                    Top Losers
                                </h2>
                                <p className="mt-1 text-xs text-gray-500">
                                    Weakest performing stocks today
                                </p>
                            </div>

                            <div className="rounded-lg bg-red-500/10 px-3 py-2 text-red-400">
                                ↘
                            </div>
                        </div>

                        {losers.map((stock) => (
                            <StockRow
                                key={stock.symbol}
                                stock={stock}
                                positive={false}
                            />
                        ))}
                    </div>
                </section>

                {/* Sector Performance */}
                <section className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                    <div className="mb-6">
                        <h2 className="font-semibold text-white">
                            Sector Performance
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Today's sector-wise market movement
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {sectors.map((sector) => (
                            <div key={sector.name}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-gray-300">
                                        {sector.name}
                                    </span>

                                    <span
                                        className={`text-sm font-medium ${
                                            sector.positive
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {sector.percent}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                                    <div
                                        className={`h-full rounded-full ${
                                            sector.positive
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                        style={{
                                            width: sector.width,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Most Active */}
                <section className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                    <div className="mb-5">
                        <h2 className="font-semibold text-white">
                            Most Active Stocks
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Stocks with highest trading volume
                        </p>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800 text-left text-xs uppercase text-gray-500">
                                    <th className="pb-4">Stock</th>
                                    <th className="pb-4">Price</th>
                                    <th className="pb-4">Change</th>
                                    <th className="pb-4">Volume</th>
                                    <th className="pb-4">Market Cap</th>
                                    <th className="pb-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {activeStocks.map((stock) => (
                                    <tr
                                        key={stock.symbol}
                                        className="border-b border-gray-800 last:border-0"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172033] text-xs font-bold">
                                                    {stock.symbol.substring(
                                                        0,
                                                        2
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="text-sm font-semibold">
                                                        {stock.symbol}
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        {stock.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="text-sm">
                                            {stock.price}
                                        </td>

                                        <td
                                            className={`text-sm font-medium ${
                                                stock.positive
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            {stock.change}
                                        </td>

                                        <td className="text-sm text-gray-300">
                                            {stock.volume}
                                        </td>

                                        <td className="text-sm text-gray-300">
                                            {stock.marketCap}
                                        </td>

                                        <td className="text-right">
                                            <button className="rounded-lg border border-gray-700 px-4 py-2 text-xs text-gray-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 md:hidden">
                        {activeStocks.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="rounded-xl border border-gray-800 bg-[#0d1424] p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold">
                                            {stock.symbol}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {stock.name}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div>{stock.price}</div>

                                        <div
                                            className={
                                                stock.positive
                                                    ? "text-xs text-green-400"
                                                    : "text-xs text-red-400"
                                            }
                                        >
                                            {stock.change}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Market summary */}
                <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                        <div className="text-xs text-gray-500">
                            Advancing
                        </div>
                        <div className="mt-2 text-2xl font-bold text-green-400">
                            1,284
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                        <div className="text-xs text-gray-500">
                            Declining
                        </div>
                        <div className="mt-2 text-2xl font-bold text-red-400">
                            842
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                        <div className="text-xs text-gray-500">
                            Unchanged
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            126
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
                        <div className="text-xs text-gray-500">
                            Total Volume
                        </div>
                        <div className="mt-2 text-2xl font-bold text-white">
                            428.6M
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}