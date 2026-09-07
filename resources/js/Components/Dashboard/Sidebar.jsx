import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { url } = usePage();

    const menu = [
        {
            icon: "◉",
            label: "Overview",
            href: "/dashboard",
        },
        {
            icon: "◫",
            label: "Markets",
            href: "/markets",
        },
        {
            icon: "★",
            label: "Watchlist",
            href: "/watchlist",
        },
        {
            icon: "◈",
            label: "Portfolio",
            href: "/portfolio",
        },
        {
            icon: "⇅",
            label: "Orders",
            href: "/orders",
        },
        {
            icon: "◷",
            label: "History",
            href: "/history",
        },
    ];

    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#080d18] lg:block">
            <div className="flex h-full flex-col">

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-white/10 px-6">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl">
                        📈
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-white">
                            StockFlow
                        </h1>

                        <p className="text-[10px] tracking-widest text-gray-500">
                            PRO TERMINAL
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">

                    <p className="mb-3 px-3 text-xs uppercase tracking-wider text-gray-600">
                        Trading
                    </p>

                    {menu.map((item) => {
                        const isActive =
                            url === item.href ||
                            url.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <span className="w-5 text-center">
                                    {item.icon}
                                </span>

                                {item.label}
                            </Link>
                        );
                    })}

                    <p className="mb-3 mt-8 px-3 text-xs uppercase tracking-wider text-gray-600">
                        System
                    </p>

                    <Link
                        href="/settings"
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                            url === "/settings"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <span className="w-5 text-center">
                            ⚙
                        </span>

                        Settings
                    </Link>

                </nav>

                {/* Account */}
                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
                            R
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                                Trader
                            </p>

                            <p className="text-xs text-gray-500">
                                Pro Account
                            </p>
                        </div>

                        <button className="ml-auto text-gray-500 hover:text-white">
                            ⋮
                        </button>

                    </div>
                </div>

            </div>
        </aside>
    );
}