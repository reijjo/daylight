<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DaylightController extends Controller
{
    // Get /api/daylight
    public function index(Request $request) {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $name = $request->input('name');
        $id = (int) $request->input('place_id');

        if (!$lat || !$lon) {
            return response()->json([
                'error' => 'Latitude and longitude are required.'
            ], 400);
        }

        if (!$name) {
            return response()->json([
                'error' => 'Name is required.'
            ], 400);
        }

        if (!$id) {
            return response()->json([
                'error' => 'Place ID is required.'
            ], 400);
        }

        date_default_timezone_set('Europe/Helsinki');

        // Today
        $today = strtotime('today');
        $sunInfo = date_sun_info($today, (float) $lat, (float) $lon);

        if ($sunInfo['sunrise'] === false) {
            // Polar night
            $sunrise = 'No sunrise';
            $sunset = 'No sunset';
            $daylength = '0h 0m';
        } elseif ($sunInfo['sunrise'] === true) {
            // Midnight sun
            $sunrise = 'No sunset';
            $sunset = 'No sunrise';
            $daylength = '24h 0m';
        } else {
            // Normal day
            $sunrise = date('H:i', $sunInfo['sunrise']);
            $sunset = date('H:i', $sunInfo['sunset']);
            $daylengthSec = $sunInfo['sunset'] - $sunInfo['sunrise'];
            $hours = floor($daylengthSec / 3600);
            $minutes = floor(($daylengthSec % 3600) / 60);
            $daylength = "{$hours}h {$minutes}m";
        }

        // Year
        $year = date('Y');
        $yearData = [];

        $daysInYear = date('L', strtotime($year . '-01-01')) ? 366 : 365;

        for ($day = 1; $day <= $daysInYear; $day++) {
            $date = strtotime("$year-01-01 +".($day - 1)." days");
            $sunInfo = date_sun_info($date, (float) $lat, (float) $lon);

            if ($sunInfo['sunrise'] === false) {
                $dayMinutes = 0;
            } elseif ($sunInfo['sunrise'] === true) {
                $dayMinutes = 24 * 60;
            } else {
                $dayMinutes = ($sunInfo['sunset'] - $sunInfo['sunrise']) / 60;
            }

            $yearData[] = [
                'day' => $day,
                'date' => date('d/m', $date),
                'daylength_minutes' => $dayMinutes,
            ];
        }

        return response()->json([
            'id' => $id,
            'city' => $name,
            'sunrise' => $sunrise,
            'sunset' => $sunset,
            'daylength' => $daylength,
            'message' => "{$name} added!",
            'lat' => $lat,
            'lon' => $lon,
            'year' => [
                'year' => $year,
                'data' => $yearData
            ],
        ], 200);
    }
}