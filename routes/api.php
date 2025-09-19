<?php

use App\Http\Controllers\DaylightController;
use Illuminate\Support\Facades\Route;

Route::get('/daylight', [DaylightController::class, 'index']);
