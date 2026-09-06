export default function OrderPanel({ stock }) {
    if (!stock) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5">
                <h2 className="text-lg font-semibold">
                    Trade
                </h2>

                <p className="text-sm text-gray-400">
                    {stock.symbol}
                </p>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2">

                <button
                    type="button"
                    className="rounded-lg bg-green-500/10 py-2 text-sm font-medium text-green-400"
                >
                    BUY
                </button>

                <button
                    type="button"
                    className="rounded-lg bg-red-500/10 py-2 text-sm font-medium text-red-400"
                >
                    SELL
                </button>

            </div>

            <div className="space-y-4">

                <div>
                    <label className="mb-2 block text-xs text-gray-500">
                        Quantity
                    </label>

                    <input
                        type="number"
                        min="1"
                        placeholder="0"
                        className="w-full rounded-lg border border-white/10 bg-[#0b1120] px-3 py-3 text-sm text-white outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs text-gray-500">
                        Price
                    </label>

                    <div className="rounded-lg border border-white/10 bg-[#0b1120] px-3 py-3 text-sm text-white">
                        ₹{stock.price.toFixed(2)}
                    </div>
                </div>

            </div>

            <button
                type="button"
                className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
                Place Order
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
                Trading functionality will be connected later.
            </p>

        </div>
    );
}
