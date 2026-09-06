<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StockController;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/stock/{symbol}', [StockController::class, 'show']);
Route::get('/stock-view/{symbol}', [StockController::class, 'showPage']);
Route::get('/stock-search', [StockController::class, 'search']);