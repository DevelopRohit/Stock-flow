export default function PositionCard() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5 flex items-center justify-between">

                <div>
                    <h3 className="text-lg font-bold">
                        Current Position
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        RELIANCE • NSE
                    </p>
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                    PROFIT
                </span>

            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                <Stat
                    label="Quantity"
                    value="120"
                />

                <Stat
                    label="Avg. Price"
                    value="₹2,280.50"
                />

                <Stat
                    label="Invested"
                    value="₹2,73,660"
                />

                <Stat
                    label="Current Value"
                    value="₹2,94,810"
                />

            </div>

            <div className="mt-4 rounded-xl bg-green-500/5 p-4">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                    <div>
                        <p className="text-xs text-gray-500">
                            Unrealized P&L
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-400">
                            +₹21,150
                        </p>
                    </div>

                    <div className="text-left sm:text-right">

                        <p className="text-xs text-gray-500">
                            Return
                        </p>

                        <p className="mt-1 font-bold text-green-400">
                            +7.72%
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="rounded-xl bg-white/5 p-4">

            <p className="text-xs text-gray-500">
                {label}
            </p>

            <p className="mt-2 font-semibold text-white">
                {value}
            </p>

        </div>
    );
}