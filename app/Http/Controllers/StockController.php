<?php

namespace App\Http\Controllers;

use App\Services\StockService;

class StockController extends Controller
{
    public function show(
        StockService $stockService,
        string $symbol
    ) {
        return response()->json(
            $stockService->getDailyData($symbol)
        );
    }

    public function search(
        StockService $stockService
    ) {
        $query = request()->query('q', '');

        return response()->json(
            $stockService->searchSymbols($query)
        );
    }
}