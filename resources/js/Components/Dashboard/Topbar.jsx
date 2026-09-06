import { useEffect, useRef, useState } from "react";

export default function Topbar({ onSearch }) {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchBoxRef = useRef(null);

    /*
    |--------------------------------------------------------------------------
    | Real stock search with debounce
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const query = search.trim();

        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    `/stock-search?q=${encodeURIComponent(query)}`
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Unable to search stocks."
                    );
                }

                setSuggestions(result.data || []);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Stock search error:", error);
                setSuggestions([]);
                setShowSuggestions(true);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    /*
    |--------------------------------------------------------------------------
    | Close suggestions when clicking outside
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Select stock suggestion
    |--------------------------------------------------------------------------
    */
    const handleSelectStock = (stock) => {
        if (!stock?.symbol) {
            return;
        }

        onSearch(stock.symbol);

        setSearch("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Enter search
    |--------------------------------------------------------------------------
    */
    const handleSubmit = (e) => {
        e.preventDefault();

        const symbol = search.trim().toUpperCase();

        if (!symbol) {
            return;
        }

        /*
        | If suggestions exist, select the first real result.
        */
        if (suggestions.length > 0) {
            handleSelectStock(suggestions[0]);
            return;
        }

        onSearch(symbol);

        setSearch("");
        setShowSuggestions(false);
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
                <div
                    ref={searchBoxRef}
                    className="relative max-w-2xl flex-1"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="relative"
                    >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                            ⌕
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => {
                                if (suggestions.length > 0) {
                                    setShowSuggestions(true);
                                }
                            }}
                            placeholder="Search stocks, ETFs, indices..."
                            autoComplete="off"
                            className="w-full rounded-xl border border-white/10 bg-[#111827] py-3 pl-11 pr-20 text-sm text-white placeholder-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-500 transition hover:bg-white/10 hover:text-white"
                        >
                            Enter
                        </button>
                    </form>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && search.trim().length >= 2 && (
                        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl">

                            {/* Loading */}
                            {loading && (
                                <div className="px-4 py-4 text-sm text-gray-400">
                                    Searching stocks...
                                </div>
                            )}

                            {/* Results */}
                            {!loading && suggestions.length > 0 && (
                                <div className="max-h-80 overflow-y-auto py-2">
                                    {suggestions.map((stock, index) => (
                                        <button
                                            key={`${stock.symbol}-${index}`}
                                            type="button"
                                            onClick={() =>
                                                handleSelectStock(stock)
                                            }
                                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-white/5"
                                        >
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold text-white">
                                                    {stock.name}
                                                </div>

                                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="font-medium text-blue-400">
                                                        {stock.symbol}
                                                    </span>

                                                    <span>•</span>

                                                    <span>
                                                        {stock.region}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <div className="text-xs font-medium text-gray-300">
                                                    {stock.currency}
                                                </div>

                                                <div className="mt-1 text-[10px] text-gray-600">
                                                    {stock.type}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* No Results */}
                            {!loading &&
                                search.trim().length >= 2 &&
                                suggestions.length === 0 && (
                                    <div className="px-4 py-5 text-center">
                                        <div className="text-sm text-gray-400">
                                            No stocks found
                                        </div>

                                        <div className="mt-1 text-xs text-gray-600">
                                            Try another company name or symbol
                                        </div>
                                    </div>
                                )}
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="hidden items-center gap-4 md:flex">

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        NSE LIVE
                    </div>

                    <button
                        type="button"
                        className="relative rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 hover:text-white"
                    >
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