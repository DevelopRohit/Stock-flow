export default function StockHeader({ stock }) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">

            {/* Stock Information */}
            <div>

                <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-3xl font-bold tracking-tight">
                        {stock.symbol}
                    </h1>

                    <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400">
                        NSE
                    </span>

                    <span className="flex items-center gap-1.5 rounded-md bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        LIVE
                    </span>

                </div>

                <p className="mt-1 text-sm text-gray-500">
                    {stock.name}
                </p>

            </div>

            {/* Price */}
            <div className="md:text-right">

                <div className="text-3xl font-bold tracking-tight">
                    ₹{stock.price.toLocaleString("en-IN")}
                </div>

                <div className="mt-1 flex items-center gap-2 text-sm font-semibold md:justify-end">
                    <span className="text-green-400">
                        +₹{stock.change}
                    </span>

                    <span className="text-green-400">
                        (+{stock.changePercent}%)
                    </span>

                    <span className="text-xs font-normal text-gray-600">
                        Today
                    </span>
                </div>

            </div>

        </div>
    );
}