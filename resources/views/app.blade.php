<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>Daylight</title>

				<!-- React/Vite/Inertia -->
				 @viteReactRefresh
				 @vite(['resources/js/app.tsx',	'resources/css/app.css'])
				 @inertiaHead

				 <!-- Fonts -->
					<link rel="preconnect" href="https://fonts.googleapis.com">
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
					<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
		</head>
		<body>
				@inertia
    </body>
</html>