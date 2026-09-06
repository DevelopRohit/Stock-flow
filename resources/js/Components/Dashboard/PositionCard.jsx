export default function PositionCard({ stock }) {
    if (!stock) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Current Position
                    </h2>

                    <p className="text-sm text-gray-400">
                        {stock.symbol}
                    </p>
                </div>

                <span className="rounded-lg bg-white/5 px-3 py-1 text-xs text-gray-400">
                    Demo
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                <Stat
                    label="Current Price"
                    value={`₹${stock.price.toFixed(2)}`}
                />

                <Stat
                    label="Day Change"
                    value={`${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}`}
                    positive={stock.change >= 0}
                />

                <Stat
                    label="Change %"
                    value={`${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent.toFixed(2)}%`}
                    positive={stock.changePercent >= 0}
                />

                <Stat
                    label="Quantity"
                    value="0"
                />

            </div>

        </div>
    );
}

function Stat({ label, value, positive }) {
    return (
        <div>
            <p className="text-xs text-gray-500">
                {label}
            </p>

            <p
                className={`mt-1 text-sm font-semibold ${
                    positive === undefined
                        ? "text-white"
                        : positive
                        ? "text-green-400"
                        : "text-red-400"
                }`}
            >
                {value}
            </p>
        </div>
    );
}
