export default function StockHeader({ stock }) {
    if (!stock) {
        return null;
    }

    const positive = stock.change >= 0;

    return (
        <div className="mb-5 rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                {/* Stock Information */}
                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/20 text-2xl">
                        📈
                    </div>

                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-white">
                                {stock.symbol}
                            </h1>

                            <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400">
                                BSE
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-400">
                            {stock.name}
                        </p>
                    </div>

                </div>

                {/* Price */}
                <div className="text-left md:text-right">

                    <div className="text-3xl font-bold text-white">
                        ₹{stock.price.toFixed(2)}
                    </div>

                    <div
                        className={`mt-1 text-sm font-medium ${
                            positive
                                ? "text-green-400"
                                : "text-red-400"
                        }`}
                    >
                        {positive ? "+" : ""}
                        ₹{stock.change.toFixed(2)}
                        {" "}
                        ({positive ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%)
                    </div>

                </div>

            </div>

            {/* Market Values */}
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 md:grid-cols-4">

                <Stat
                    label="Open"
                    value={`₹${stock.open.toFixed(2)}`}
                />

                <Stat
                    label="High"
                    value={`₹${stock.high.toFixed(2)}`}
                />

                <Stat
                    label="Low"
                    value={`₹${stock.low.toFixed(2)}`}
                />

                <Stat
                    label="Volume"
                    value={stock.volume.toLocaleString()}
                />

            </div>

        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
                {value}
            </p>
        </div>
    );
}
