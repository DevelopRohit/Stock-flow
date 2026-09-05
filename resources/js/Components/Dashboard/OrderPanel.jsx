import { useState } from "react";

export default function OrderPanel({ stock }) {
    const [side, setSide] = useState("BUY");
    const [quantity, setQuantity] = useState(10);
    const [orderType, setOrderType] = useState("Market");

    const total = quantity * stock.price;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            <div className="mb-5 flex items-center justify-between">

                <div>
                    <h3 className="text-lg font-bold">
                        Place Order
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        {stock.symbol} • NSE
                    </p>
                </div>

                <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400">
                    MIS
                </span>

            </div>

            {/* BUY / SELL */}
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-white/5 p-1">

                <button
                    onClick={() => setSide("BUY")}
                    className={`rounded-lg py-3 text-sm font-bold transition ${
                        side === "BUY"
                            ? "bg-green-500 text-black"
                            : "text-gray-500 hover:text-white"
                    }`}
                >
                    BUY
                </button>

                <button
                    onClick={() => setSide("SELL")}
                    className={`rounded-lg py-3 text-sm font-bold transition ${
                        side === "SELL"
                            ? "bg-red-500 text-white"
                            : "text-gray-500 hover:text-white"
                    }`}
                >
                    SELL
                </button>

            </div>

            {/* Order Type */}
            <label className="text-xs text-gray-500">
                Order Type
            </label>

            <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="mb-4 mt-2 w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            >
                <option>Market</option>
                <option>Limit</option>
                <option>Stop Loss</option>
            </select>

            {/* Quantity */}
            <label className="text-xs text-gray-500">
                Quantity
            </label>

            <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                    setQuantity(Number(e.target.value))
                }
                className="mb-4 mt-2 w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />

            {/* Price */}
            <label className="text-xs text-gray-500">
                Price
            </label>

            <div className="mb-5 mt-2 rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 text-sm font-semibold">
                ₹{stock.price.toLocaleString("en-IN")}
            </div>

            {/* Summary */}
            <div className="mb-5 space-y-3 rounded-xl bg-white/5 p-4">

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Quantity
                    </span>

                    <span>
                        {quantity}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Estimated Value
                    </span>

                    <span className="font-bold">
                        ₹{total.toLocaleString("en-IN")}
                    </span>
                </div>

            </div>

            <button
                className={`w-full rounded-xl py-3.5 font-bold transition ${
                    side === "BUY"
                        ? "bg-green-500 text-black hover:bg-green-400"
                        : "bg-red-500 text-white hover:bg-red-400"
                }`}
            >
                PLACE {side} ORDER
            </button>

            <p className="mt-3 text-center text-[10px] text-gray-600">
                Orders are currently in demo mode
            </p>

        </div>
    );
}