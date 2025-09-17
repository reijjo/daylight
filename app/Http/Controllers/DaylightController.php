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

			$date = strtotime('today');
			$sunInfo = date_sun_info($date, (float) $lat, (float) $lon);

			$sunrise = $sunInfo['sunrise'];
			$sunset = $sunInfo['sunset'];

			$daylength = $sunset - $sunrise;

			$hours = floor($daylength / 3600);
      $minutes = floor(($daylength % 3600) / 60);
      $seconds = $daylength % 60;

			return response()->json([
				'id' => $id,
				'city' => $name,
				'sunrise' => date('H:i:s', $sunrise),
				'sunset' => date('H:i:s', $sunset),
				'daylength' => "{$hours}h {$minutes}m {$seconds}s",
				'message' => "{$name} added!"
			], 200);
		}
}
