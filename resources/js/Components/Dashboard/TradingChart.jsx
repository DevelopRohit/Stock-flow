import { useEffect, useMemo, useState } from "react";

export default function TradingChart({ stock }) {
    const [range, setRange] = useState("1D");
    const [intradayPrices, setIntradayPrices] = useState([]);
    const [intradayLoading, setIntradayLoading] = useState(false);
    const [intradayError, setIntradayError] = useState("");
    const [hoveredPoint, setHoveredPoint] = useState(null);

    const prices = stock?.prices ?? [];

    // --------------------------------------------------
    // Load today's intraday data
    // --------------------------------------------------
    useEffect(() => {
        if (!stock?.symbol || range !== "1D") {
            return;
        }

        let cancelled = false;

        const loadIntraday = async () => {
            setIntradayLoading(true);
            setIntradayError("");

            try {
                const url = `/stock/${encodeURIComponent(
                    stock.symbol
                )}/intraday`;

                console.log("Loading intraday:", url);

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                    cache: "no-store",
                });

                console.log(
                    "Intraday HTTP status:",
                    response.status
                );

                const result = await response.json();

                console.log("Intraday response:", result);

                if (!response.ok) {
                    throw new Error(
                        result?.message ||
                            `HTTP ${response.status}`
                    );
                }

                if (!result?.success) {
                    throw new Error(
                        result?.message ||
                            "Today's intraday data is not available."
                    );
                }

                const data = Array.isArray(result.data)
                    ? result.data
                    : [];

                if (!data.length) {
                    throw new Error(
                        "Today's intraday data is not available."
                    );
                }

                if (!cancelled) {
                    setIntradayPrices(data);
                }
            } catch (error) {
                console.error(
                    "Intraday data error:",
                    error
                );

                if (!cancelled) {
                    setIntradayError(
                        error?.message ||
                            "Unable to load today's intraday data."
                    );
                }
            } finally {
                if (!cancelled) {
                    setIntradayLoading(false);
                }
            }
        };

        loadIntraday();

        // Refresh every 60 seconds
        const refreshInterval = setInterval(
            loadIntraday,
            60000
        );

        return () => {
            cancelled = true;
            clearInterval(refreshInterval);
        };
    }, [stock?.symbol, range]);

    // --------------------------------------------------
    // Select chart data
    // --------------------------------------------------
    const filteredPrices = useMemo(() => {
        if (range === "1D") {
            return [...intradayPrices]
                .filter(
                    (item) =>
                        item &&
                        item.timestamp &&
                        item.close !== null &&
                        item.close !== undefined
                )
                .sort(
                    (a, b) =>
                        Number(a.timestamp) -
                        Number(b.timestamp)
                );
        }

        if (!prices.length) {
            return [];
        }

        let count = 30;

        if (range === "1W") {
            count = 7;
        }

        if (range === "1M") {
            count = 30;
        }

        if (range === "6M") {
            count = 180;
        }

        if (range === "1Y") {
            count = 365;
        }

        return prices.slice(-count);
    }, [prices, intradayPrices, range]);

    // --------------------------------------------------
    // Loading
    // --------------------------------------------------
    if (
        range === "1D" &&
        intradayLoading &&
        !intradayPrices.length
    ) {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            {stock?.symbol} Price Chart
                        </h2>

                        <p className="text-sm text-gray-400">
                            Today's intraday price
                        </p>
                    </div>

                    <div className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                        LIVE
                    </div>
                </div>

                <div className="flex h-[420px] items-center justify-center text-gray-400">
                    Loading today's market data...
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // No data
    // --------------------------------------------------
    if (!stock || !filteredPrices.length) {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            {stock?.symbol ?? "Stock"} Price Chart
                        </h2>

                        <p className="text-sm text-gray-400">
                            {range === "1D"
                                ? "Today's intraday price"
                                : "Historical closing price"}
                        </p>
                    </div>

                    {range === "1D" && (
                        <div className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                            LIVE
                        </div>
                    )}
                </div>

                <div className="flex h-[420px] flex-col items-center justify-center gap-3 text-gray-400">
                    <p>
                        {intradayError ||
                            (range === "1D"
                                ? "Today's intraday data is not available"
                                : "No chart data available")}
                    </p>

                    {range === "1D" && (
                        <button
                            type="button"
                            onClick={() => {
                                setIntradayPrices([]);
                                setIntradayError("");
                                setRange("");
                                setTimeout(
                                    () => setRange("1D"),
                                    50
                                );
                            }}
                            className="rounded-md bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-gray-200"
                        >
                            Retry
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // 1D INTRADAY LINE CHART
    // --------------------------------------------------
    if (range === "1D") {
        const values = filteredPrices.map((item) =>
            Number(item.close)
        );

        const minPrice = Math.min(...values);
        const maxPrice = Math.max(...values);

        const previousClose =
            Number(stock.previousClose) ||
            Number(stock.price) ||
            values[0];

        // Add small padding so line doesn't touch edges
        const rawRange =
            maxPrice - minPrice || 1;

        const chartMin =
            minPrice - rawRange * 0.08;

        const chartMax =
            maxPrice + rawRange * 0.08;

        const priceRange =
            chartMax - chartMin || 1;

        const width = 1000;
        const height = 360;

        const paddingX = 20;
        const paddingY = 20;

        const chartWidth =
            width - paddingX * 2;

        const chartHeight =
            height - paddingY * 2;

        // --------------------------------------------------
        // Create SVG points
        // --------------------------------------------------
        const points = filteredPrices.map(
            (item, index) => {
                const close = Number(item.close);

                const x =
                    paddingX +
                    (index /
                        Math.max(
                            filteredPrices.length - 1,
                            1
                        )) *
                        chartWidth;

                const y =
                    paddingY +
                    ((chartMax - close) /
                        priceRange) *
                        chartHeight;

                return {
                    x,
                    y,
                    close,
                    item,
                    index,
                };
            }
        );

        const linePoints = points
            .map(
                (point) =>
                    `${point.x},${point.y}`
            )
            .join(" ");

        // --------------------------------------------------
        // Area under line
        // --------------------------------------------------
        const areaPoints =
            points.length > 0
                ? [
                      `${points[0].x},${
                          height - paddingY
                      }`,
                      ...points.map(
                          (point) =>
                              `${point.x},${point.y}`
                      ),
                      `${
                          points[points.length - 1].x
                      },${height - paddingY}`,
                  ].join(" ")
                : "";

        // --------------------------------------------------
        // Day price
        // --------------------------------------------------
        const firstPrice =
            values[0] ?? Number(stock.price);

        const lastPrice =
            values[values.length - 1] ??
            Number(stock.price);

        const dayChange =
            lastPrice - previousClose;

        const dayChangePercent =
            previousClose !== 0
                ? (dayChange / previousClose) * 100
                : 0;

        // --------------------------------------------------
        // Time formatter
        // --------------------------------------------------
        const formatTime = (timestamp) => {
            if (!timestamp) {
                return "";
            }

            return new Intl.DateTimeFormat(
                "en-IN",
                {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }
            ).format(
                new Date(
                    Number(timestamp) * 1000
                )
            );
        };

        // --------------------------------------------------
        // Full date/time formatter
        // --------------------------------------------------
        const formatDateTime = (timestamp) => {
            if (!timestamp) {
                return "";
            }

            return new Intl.DateTimeFormat(
                "en-IN",
                {
                    timeZone: "Asia/Kolkata",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }
            ).format(
                new Date(
                    Number(timestamp) * 1000
                )
            );
        };

        const firstTime = formatTime(
            filteredPrices[0]?.timestamp
        );

        const middleIndex = Math.floor(
            filteredPrices.length / 2
        );

        const middleTime = formatTime(
            filteredPrices[middleIndex]?.timestamp
        );

        const lastTime = formatTime(
            filteredPrices[
                filteredPrices.length - 1
            ]?.timestamp
        );

        // --------------------------------------------------
        // Find nearest point based on mouse position
        // --------------------------------------------------
        const handleChartMouseMove = (event) => {
            const svg = event.currentTarget;

            const rect =
                svg.getBoundingClientRect();

            const mouseX =
                ((event.clientX - rect.left) /
                    rect.width) *
                width;

            let nearestPoint = points[0];
            let nearestDistance = Infinity;

            points.forEach((point) => {
                const distance = Math.abs(
                    point.x - mouseX
                );

                if (
                    distance <
                    nearestDistance
                ) {
                    nearestDistance = distance;
                    nearestPoint = point;
                }
            });

            setHoveredPoint(nearestPoint);
        };

        const handleChartMouseLeave = () => {
            setHoveredPoint(null);
        };

        // --------------------------------------------------
        // Previous close Y position
        // --------------------------------------------------
        const previousCloseY =
            paddingY +
            ((chartMax - previousClose) /
                priceRange) *
                chartHeight;

        // --------------------------------------------------
        // Hover tooltip position
        // --------------------------------------------------
        const tooltipLeft =
            hoveredPoint
                ? Math.min(
                      Math.max(
                          (hoveredPoint.x /
                              width) *
                              100,
                          14
                      ),
                      86
                  )
                : 50;

        return (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

                {/* -------------------------------------- */}
                {/* Header */}
                {/* -------------------------------------- */}

                <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-white">
                                {stock.symbol} Price Chart
                            </h2>

                            <span className="rounded-md bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-400">
                                LIVE
                            </span>
                        </div>

                        <p className="text-sm text-gray-400">
                            Today's intraday price
                        </p>
                    </div>

                    {/* Range buttons */}
                    <div className="flex rounded-lg bg-[#0b1120] p-1">
                        {[
                            "1D",
                            "1W",
                            "1M",
                            "6M",
                            "1Y",
                        ].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => {
                                    setHoveredPoint(null);
                                    setRange(item);
                                }}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                                    range === item
                                        ? "bg-white text-black"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* -------------------------------------- */}
                {/* Price Header */}
                {/* -------------------------------------- */}

                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                    <div>
                        <div className="text-3xl font-bold text-white">
                            ₹
                            {lastPrice.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}
                        </div>

                        <div
                            className={
                                dayChange >= 0
                                    ? "text-sm font-medium text-green-400"
                                    : "text-sm font-medium text-red-400"
                            }
                        >
                            {dayChange >= 0
                                ? "+"
                                : ""}
                            {dayChange.toFixed(2)}{" "}
                            (
                            {dayChangePercent.toFixed(
                                2
                            )}
                            %)
                        </div>
                    </div>

                    <div className="text-right text-xs text-gray-400">
                        <div>
                            {formatDateTime(
                                filteredPrices[
                                    filteredPrices.length -
                                        1
                                ]?.timestamp
                            )}
                        </div>

                        <div className="mt-1">
                            Market data
                        </div>
                    </div>
                </div>

                {/* -------------------------------------- */}
                {/* Chart */}
                {/* -------------------------------------- */}

                <div className="relative h-[360px] w-full overflow-visible rounded-xl">

                    {/* Grid */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-5">
                        {[0, 1, 2, 3, 4].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="border-t border-white/5"
                                />
                            )
                        )}
                    </div>

                    {/* Previous Close Label */}
                    <div
                        className="pointer-events-none absolute left-2 z-10 text-[11px] text-gray-500"
                        style={{
                            top: `${Math.max(
                                Math.min(
                                    ((chartMax -
                                        previousClose) /
                                        priceRange) *
                                        100,
                                    95
                                ),
                                5
                            )}%`,
                        }}
                    >
                        Previous Close ₹
                        {previousClose.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}
                    </div>

                    <svg
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                        onMouseMove={
                            handleChartMouseMove
                        }
                        onMouseLeave={
                            handleChartMouseLeave
                        }
                    >
                        {/* Previous close line */}
                        {previousClose >= chartMin &&
                            previousClose <=
                                chartMax && (
                                <line
                                    x1={paddingX}
                                    x2={
                                        width -
                                        paddingX
                                    }
                                    y1={
                                        previousCloseY
                                    }
                                    y2={
                                        previousCloseY
                                    }
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="5 5"
                                    className="text-white/30"
                                />
                            )}

                        {/* Area */}
                        <polygon
                            points={areaPoints}
                            fill="currentColor"
                            className={
                                dayChange >= 0
                                    ? "text-green-500/10"
                                    : "text-red-500/10"
                            }
                        />

                        {/* Main line */}
                        <polyline
                            points={linePoints}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={
                                dayChange >= 0
                                    ? "text-green-400"
                                    : "text-red-500"
                            }
                        />

                        {/* Hover vertical line */}
                        {hoveredPoint && (
                            <line
                                x1={
                                    hoveredPoint.x
                                }
                                x2={
                                    hoveredPoint.x
                                }
                                y1={paddingY}
                                y2={
                                    height -
                                    paddingY
                                }
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="6 6"
                                className="text-white/50"
                            />
                        )}

                        {/* Hover point */}
                        {hoveredPoint && (
                            <circle
                                cx={
                                    hoveredPoint.x
                                }
                                cy={
                                    hoveredPoint.y
                                }
                                r="7"
                                fill="currentColor"
                                stroke="white"
                                strokeWidth="3"
                                className={
                                    dayChange >= 0
                                        ? "text-green-400"
                                        : "text-red-500"
                                }
                            />
                        )}

                        {/* Last point */}
                        {!hoveredPoint &&
                            points.length > 0 && (
                                <circle
                                    cx={
                                        points[
                                            points.length -
                                                1
                                        ].x
                                    }
                                    cy={
                                        points[
                                            points.length -
                                                1
                                        ].y
                                    }
                                    r="6"
                                    fill="currentColor"
                                    className={
                                        dayChange >=
                                        0
                                            ? "text-green-400"
                                            : "text-red-500"
                                    }
                                />
                            )}
                    </svg>

                    {/* ---------------------------------- */}
                    {/* Hover Tooltip */}
                    {/* ---------------------------------- */}

                    {hoveredPoint && (
                        <div
                            className="pointer-events-none absolute top-4 z-50 w-56 rounded-xl border border-white/10 bg-[#0b1120] p-3 shadow-2xl"
                            style={{
                                left: `${tooltipLeft}%`,
                                transform:
                                    "translateX(-50%)",
                            }}
                        >
                            <div className="mb-2 border-b border-white/10 pb-2 text-xs font-semibold text-white">
                                {formatDateTime(
                                    hoveredPoint.item
                                        .timestamp
                                )}
                            </div>

                            <div className="space-y-1.5 text-xs">

                                {/* Open */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-400">
                                        Open
                                    </span>

                                    <span className="font-medium text-white">
                                        ₹
                                        {Number(
                                            hoveredPoint
                                                .item
                                                .open
                                        ).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>

                                {/* High */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-400">
                                        High
                                    </span>

                                    <span className="font-medium text-white">
                                        ₹
                                        {Number(
                                            hoveredPoint
                                                .item
                                                .high
                                        ).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>

                                {/* Low */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-400">
                                        Low
                                    </span>

                                    <span className="font-medium text-white">
                                        ₹
                                        {Number(
                                            hoveredPoint
                                                .item
                                                .low
                                        ).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>

                                {/* Close */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-400">
                                        Close
                                    </span>

                                    <span
                                        className={
                                            dayChange >=
                                            0
                                                ? "font-semibold text-green-400"
                                                : "font-semibold text-red-400"
                                        }
                                    >
                                        ₹
                                        {Number(
                                            hoveredPoint
                                                .item
                                                .close
                                        ).toLocaleString(
                                            "en-IN",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>

                                {/* Volume */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-gray-400">
                                        Volume
                                    </span>

                                    <span className="font-medium text-white">
                                        {Number(
                                            hoveredPoint
                                                .item
                                                .volume ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* -------------------------------------- */}
                {/* Time Labels */}
                {/* -------------------------------------- */}

                <div className="mt-2 flex justify-between px-2 text-xs text-gray-500">
                    <span>{firstTime}</span>

                    <span>{middleTime}</span>

                    <span>{lastTime}</span>
                </div>

                {/* -------------------------------------- */}
                {/* Details */}
                {/* -------------------------------------- */}

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 md:grid-cols-4">

                    <Stat
                        label="Open"
                        value={`₹${Number(
                            stock.open
                        ).toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}`}
                    />

                    <Stat
                        label="High"
                        value={`₹${Number(
                            stock.high
                        ).toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}`}
                    />

                    <Stat
                        label="Low"
                        value={`₹${Number(
                            stock.low
                        ).toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}`}
                    />

                    <Stat
                        label="Volume"
                        value={Number(
                            stock.volume || 0
                        ).toLocaleString(
                            "en-IN"
                        )}
                    />
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // HISTORICAL DAILY CHART
    // --------------------------------------------------

    const values = filteredPrices.map((item) =>
        Number(
            item.close ??
                item["4. close"] ??
                0
        )
    );

    const minPrice = Math.min(...values);
    const maxPrice = Math.max(...values);

    const priceRange =
        maxPrice - minPrice || 1;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">

            {/* Header */}
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-white">
                            {stock.symbol} Price Chart
                        </h2>
                    </div>

                    <p className="text-sm text-gray-400">
                        Historical closing price
                    </p>
                </div>

                <div className="flex rounded-lg bg-[#0b1120] p-1">
                    {[
                        "1D",
                        "1W",
                        "1M",
                        "6M",
                        "1Y",
                    ].map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => {
                                setHoveredPoint(null);
                                setRange(item);
                            }}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                                range === item
                                    ? "bg-white text-black"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="mb-5">
                <div className="text-3xl font-bold text-white">
                    ₹
                    {Number(
                        stock.price
                    ).toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}
                </div>

                <div
                    className={
                        stock.change >= 0
                            ? "text-sm text-green-400"
                            : "text-sm text-red-400"
                    }
                >
                    {stock.change >= 0
                        ? "+"
                        : ""}
                    {Number(
                        stock.change
                    ).toFixed(2)}{" "}
                    (
                    {Number(
                        stock.changePercent
                    ).toFixed(2)}
                    %)
                </div>
            </div>

            {/* Historical Bars */}
            <div className="relative h-[330px] w-full">

                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map(
                        (item) => (
                            <div
                                key={item}
                                className="border-t border-white/5"
                            />
                        )
                    )}
                </div>

                <div className="absolute inset-0 flex items-end gap-[2px] px-2 py-3">

                    {filteredPrices.map(
                        (item, index) => {
                            const close = Number(
                                item.close ??
                                    item[
                                        "4. close"
                                    ] ??
                                    0
                            );

                            const barHeight =
                                ((close -
                                    minPrice) /
                                    priceRange) *
                                100;

                            const label =
                                item.date ?? "";

                            return (
                                <div
                                    key={
                                        item.timestamp ??
                                        item.date ??
                                        index
                                    }
                                    className="group relative flex h-full flex-1 items-end"
                                >
                                    <div
                                        className="w-full rounded-t-sm bg-blue-500/80 transition-all hover:bg-blue-400"
                                        style={{
                                            height: `${Math.max(
                                                barHeight,
                                                2
                                            )}%`,
                                        }}
                                    />

                                    {/* Historical tooltip */}
                                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-xs shadow-lg group-hover:block">
                                        <div className="font-medium text-white">
                                            {label}
                                        </div>

                                        <div className="text-gray-300">
                                            ₹
                                            {close.toFixed(
                                                2
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 md:grid-cols-4">

                <Stat
                    label="Open"
                    value={`₹${Number(
                        stock.open
                    ).toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}`}
                />

                <Stat
                    label="High"
                    value={`₹${Number(
                        stock.high
                    ).toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}`}
                />

                <Stat
                    label="Low"
                    value={`₹${Number(
                        stock.low
                    ).toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }
                    )}`}
                />

                <Stat
                    label="Volume"
                    value={Number(
                        stock.volume || 0
                    ).toLocaleString(
                        "en-IN"
                    )}
                />
            </div>
        </div>
    );
}

// --------------------------------------------------
// Stat component
// --------------------------------------------------

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