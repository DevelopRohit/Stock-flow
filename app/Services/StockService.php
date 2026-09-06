<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class StockService
{
    protected string $searchUrl =
        'https://query1.finance.yahoo.com/v1/finance/search';

    protected string $chartUrl =
        'https://query1.finance.yahoo.com/v8/finance/chart';

    /**
     * Search stocks.
     */
    public function searchSymbols(string $query): array
    {
        $query = trim($query);

        if ($query === '') {
            return [
                'success' => true,
                'data' => [],
            ];
        }

        /*
         * Cache search results for 30 minutes.
         */
        $cacheKey = 'stock_search_' . md5(strtolower($query));

        $cached = Cache::get($cacheKey);

        if ($cached !== null) {
            return $cached;
        }

        try {
            $response = Http::retry(
                2,
                1000,
                throw: false
            )
                ->timeout(10)
                ->withHeaders([
                    'User-Agent' =>
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
                    'Accept' => 'application/json',
                ])
                ->get($this->searchUrl, [
                    'q' => $query,
                    'quotesCount' => 10,
                    'newsCount' => 0,
                ]);

            if ($response->failed()) {
                /*
                 * If Yahoo search fails, return empty results
                 * instead of breaking the dashboard.
                 */
                return [
                    'success' => true,
                    'data' => [],
                ];
            }

            $data = $response->json();

            $quotes = $data['quotes'] ?? [];

            $results = collect($quotes)
                ->filter(function ($stock) {
                    return !empty($stock['symbol']);
                })
                ->map(function ($stock) {
                    return [
                        'symbol' => $stock['symbol'] ?? '',
                        'name' =>
                            $stock['longname']
                            ?? $stock['shortname']
                            ?? $stock['symbol']
                            ?? '',
                        'type' =>
                            $stock['quoteType']
                            ?? 'EQUITY',
                        'region' =>
                            $stock['exchange']
                            ?? $stock['fullExchangeName']
                            ?? '',
                        'currency' =>
                            $stock['currency']
                            ?? 'INR',
                    ];
                })
                ->values()
                ->all();

            $result = [
                'success' => true,
                'data' => $results,
            ];

            /*
             * Save search result for 30 minutes.
             */
            Cache::put(
                $cacheKey,
                $result,
                now()->addMinutes(30)
            );

            return $result;

        } catch (\Throwable $e) {
            return [
                'success' => true,
                'data' => [],
            ];
        }
    }

    /**
     * Get daily stock data.
     */
    public function getDailyData(string $symbol): array
    {
        $symbol = strtoupper(trim($symbol));

        if ($symbol === '') {
            return [
                'success' => false,
                'message' => 'Stock symbol is required.',
            ];
        }

        /*
         * Convert BSE/NSE to Yahoo format.
         */
        $yahooSymbol = $this->convertToYahooSymbol($symbol);

        /*
         * Permanent-ish cache:
         *
         * Keep last successful response for 24 hours.
         */
        $cacheKey = 'stock_last_success_' . $symbol;

        /*
         * First try fresh data.
         */
        $freshResult = $this->fetchYahooStockData(
            $symbol,
            $yahooSymbol
        );

        /*
         * Yahoo worked.
         */
        if ($freshResult['success']) {

            /*
             * Save the successful result for 24 hours.
             */
            Cache::put(
                $cacheKey,
                $freshResult,
                now()->addHours(24)
            );

            return $freshResult;
        }

        /*
         * Yahoo failed.
         *
         * Try the last successful result.
         */
        $lastSuccessful = Cache::get($cacheKey);

        if ($lastSuccessful) {

            /*
             * Tell frontend that cached data is being used,
             * but still return success=true so dashboard works.
             */
            $lastSuccessful['fromCache'] = true;

            return $lastSuccessful;
        }

        /*
         * Nothing in cache yet.
         *
         * Return a clean response.
         */
        return [
            'success' => false,
            'message' =>
                'Stock data is temporarily unavailable. Please try again.',
        ];
    }

    /**
     * Fetch stock data from Yahoo Finance.
     */
    protected function fetchYahooStockData(
        string $symbol,
        string $yahooSymbol
    ): array {

        try {

            $period2 = time();

            /*
             * Last 6 months.
             */
            $period1 = strtotime('-6 months');

            $response = Http::retry(
                3,
                1500,
                throw: false
            )
                ->timeout(20)
                ->withHeaders([
                    'User-Agent' =>
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
                    'Accept' => 'application/json',
                    'Accept-Language' => 'en-US,en;q=0.9',
                ])
                ->get(
                    $this->chartUrl .
                        '/' .
                        rawurlencode($yahooSymbol),
                    [
                        'period1' => $period1,
                        'period2' => $period2,
                        'interval' => '1d',
                        'events' => 'history',
                        'includeAdjustedClose' => 'true',
                    ]
                );

            if ($response->failed()) {
                return [
                    'success' => false,
                    'message' =>
                        'Yahoo Finance request failed.',
                ];
            }

            $data = $response->json();

            /*
             * Yahoo returned an error.
             */
            if (
                isset($data['chart']['error']) &&
                $data['chart']['error'] !== null
            ) {
                return [
                    'success' => false,
                    'message' =>
                        'Historical data is not available for this stock.',
                ];
            }

            $result =
                $data['chart']['result'][0] ?? null;

            if (!$result) {
                return [
                    'success' => false,
                    'message' =>
                        'No stock data was returned.',
                ];
            }

            $timestamps =
                $result['timestamp'] ?? [];

            $quote =
                $result['indicators']['quote'][0]
                ?? [];

            $opens =
                $quote['open'] ?? [];

            $highs =
                $quote['high'] ?? [];

            $lows =
                $quote['low'] ?? [];

            $closes =
                $quote['close'] ?? [];

            $volumes =
                $quote['volume'] ?? [];

            $priceData = [];

            foreach ($timestamps as $index => $timestamp) {

                $close =
                    $closes[$index] ?? null;

                if ($close === null) {
                    continue;
                }

                $date =
                    date('Y-m-d', $timestamp);

                $priceData[$date] = [
                    '1. open' =>
                        $opens[$index] ?? null,

                    '2. high' =>
                        $highs[$index] ?? null,

                    '3. low' =>
                        $lows[$index] ?? null,

                    '4. close' =>
                        $close,

                    '5. volume' =>
                        $volumes[$index] ?? 0,
                ];
            }

            if (empty($priceData)) {
                return [
                    'success' => false,
                    'message' =>
                        'No historical price data was found.',
                ];
            }

            return [
                'success' => true,

                'symbol' => $symbol,

                'yahooSymbol' =>
                    $yahooSymbol,

                'fromCache' => false,

                'data' => $priceData,
            ];

        } catch (\Throwable $e) {

            return [
                'success' => false,
                'message' =>
                    'Unable to connect to Yahoo Finance.',
            ];
        }
    }

    /**
     * Convert our symbols to Yahoo Finance symbols.
     *
     * RELIANCE.BSE -> RELIANCE.BO
     * RELIANCE.NSE -> RELIANCE.NS
     */
    protected function convertToYahooSymbol(
        string $symbol
    ): string {

        if (str_ends_with($symbol, '.BSE')) {

            return substr($symbol, 0, -4) . '.BO';
        }

        if (str_ends_with($symbol, '.NSE')) {

            return substr($symbol, 0, -4) . '.NS';
        }

        return $symbol;
    }
}