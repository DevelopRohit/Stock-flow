<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MarketController extends Controller
{
    public function index()
    {
        $indices = [
            [
                'name' => 'NIFTY 50',
                'value' => '24,832.20',
                'change' => '+125.40',
                'percent' => '+0.51%',
                'positive' => true,
            ],
            [
                'name' => 'SENSEX',
                'value' => '81,250.30',
                'change' => '+380.20',
                'percent' => '+0.47%',
                'positive' => true,
            ],
            [
                'name' => 'BANK NIFTY',
                'value' => '54,210.45',
                'change' => '-120.30',
                'percent' => '-0.22%',
                'positive' => false,
            ],
            [
                'name' => 'NIFTY IT',
                'value' => '38,450.80',
                'change' => '+240.10',
                'percent' => '+0.63%',
                'positive' => true,
            ],
        ];

        $gainers = [
            [
                'symbol' => 'BEL',
                'name' => 'Bharat Electronics',
                'price' => '342.20',
                'change' => '+16.02',
                'percent' => '+4.91%',
            ],
            [
                'symbol' => 'TCS',
                'name' => 'Tata Consultancy Services',
                'price' => '2,270.00',
                'change' => '+62.80',
                'percent' => '+2.84%',
            ],
            [
                'symbol' => 'INFY',
                'name' => 'Infosys',
                'price' => '1,562.40',
                'change' => '+56.10',
                'percent' => '+3.72%',
            ],
            [
                'symbol' => 'RELIANCE',
                'name' => 'Reliance Industries',
                'price' => '1,425.60',
                'change' => '+31.40',
                'percent' => '+2.25%',
            ],
        ];

        $losers = [
            [
                'symbol' => 'ADANIPORTS',
                'name' => 'Adani Ports',
                'price' => '1,245.20',
                'change' => '-62.90',
                'percent' => '-4.82%',
            ],
            [
                'symbol' => 'WIPRO',
                'name' => 'Wipro',
                'price' => '512.30',
                'change' => '-20.80',
                'percent' => '-3.91%',
            ],
            [
                'symbol' => 'HDFCBANK',
                'name' => 'HDFC Bank',
                'price' => '1,720.40',
                'change' => '-48.60',
                'percent' => '-2.74%',
            ],
            [
                'symbol' => 'ICICIBANK',
                'name' => 'ICICI Bank',
                'price' => '1,305.10',
                'change' => '-27.40',
                'percent' => '-2.06%',
            ],
        ];

        $mostActive = [
            [
                'symbol' => 'RELIANCE',
                'name' => 'Reliance Industries',
                'price' => '1,425.60',
                'change' => '+2.25%',
                'volume' => '8.42M',
                'marketCap' => '₹19.25T',
            ],
            [
                'symbol' => 'TCS',
                'name' => 'Tata Consultancy Services',
                'price' => '2,270.00',
                'change' => '+2.84%',
                'volume' => '6.84M',
                'marketCap' => '₹8.21T',
            ],
            [
                'symbol' => 'HDFCBANK',
                'name' => 'HDFC Bank',
                'price' => '1,720.40',
                'change' => '-2.74%',
                'volume' => '5.92M',
                'marketCap' => '₹13.15T',
            ],
            [
                'symbol' => 'INFY',
                'name' => 'Infosys',
                'price' => '1,562.40',
                'change' => '+3.72%',
                'volume' => '4.75M',
                'marketCap' => '₹6.48T',
            ],
            [
                'symbol' => 'ICICIBANK',
                'name' => 'ICICI Bank',
                'price' => '1,305.10',
                'change' => '-2.06%',
                'volume' => '4.21M',
                'marketCap' => '₹9.18T',
            ],
        ];

        $sectors = [
            [
                'name' => 'IT',
                'change' => '+1.42%',
                'positive' => true,
            ],
            [
                'name' => 'Banking',
                'change' => '+0.82%',
                'positive' => true,
            ],
            [
                'name' => 'Auto',
                'change' => '+0.51%',
                'positive' => true,
            ],
            [
                'name' => 'Pharma',
                'change' => '+0.22%',
                'positive' => true,
            ],
            [
                'name' => 'FMCG',
                'change' => '-0.31%',
                'positive' => false,
            ],
            [
                'name' => 'Metal',
                'change' => '-0.74%',
                'positive' => false,
            ],
        ];

        return Inertia::render('Markets', [
            'indices' => $indices,
            'gainers' => $gainers,
            'losers' => $losers,
            'mostActive' => $mostActive,
            'sectors' => $sectors,
            'marketStatus' => 'NSE LIVE',
            'lastUpdated' => '7 Sep 2026, 03:10 PM',
        ]);
    }
}