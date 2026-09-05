import { useState } from "react";

export default function Topbar({ onSearch }) {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (search.trim()) {
            onSearch(search.trim().toUpperCase());
        }
    };

    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b1120]/90 px-5 py-4 backdrop-blur-xl lg:px-7">

            <div className="flex items-center gap-4">

                {/* Mobile Logo */}
                <div className="flex items-center lg:hidden">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                        📈
                    </div>
                </div>

                {/* Search */}
                <form
                    onSubmit={handleSubmit}
                    className="relative max-w-2xl flex-1"
                >
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                        ⌕
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search stocks, ETFs, indices..."
                        className="w-full rounded-xl border border-white/10 bg-[#111827] py-3 pl-11 pr-14 text-sm text-white placeholder-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-500">
                        /
                    </span>
                </form>

                {/* Right Section */}
                <div className="hidden items-center gap-4 md:flex">

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        NSE LIVE
                    </div>

                    <button className="relative rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 hover:text-white">
                        🔔

                        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                    </button>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
                        R
                    </div>

                </div>

            </div>
        </header>
    );
}