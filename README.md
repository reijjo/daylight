# What is this?

A web app that visualizes how daylight hours change throughout the year in different Finnish cities.
<img width="800" height="600" alt="Screenshot 2025-09-21 at 15 04 38" src="https://github.com/user-attachments/assets/e27e21a2-fc18-4bb4-93f7-f3b8fb53bbce" />
<img width="800" height="600" alt="Screenshot 2025-09-21 at 15 05 02" src="https://github.com/user-attachments/assets/5367e6d9-994a-4702-997c-3e98b64154a5" />



# How to use?

## Live

You can try the project at <https://daylight-production-0122.up.railway.app/>

-   Deployed with `Railway` at least for a while (as long as the free tier lasts)

## Local
=======

### Important!

Rename the `.env.example` file to `.env`!

Create an account at `https://opencagedata.com/` to obtain an API key.

-   Add the `apikey` in the bottom on the `.env` file:

```.env
VITE_GEOAPI_KEY=YOUR_OPENCAGEDATA_API_KEY_HERE_!
```

<details>
	<summary>Requirements</summary>

#### Make sure you have PHP, Composer and Laravel installed

-   `/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"` to install

#### Also have Node.js installed

-   https://nodejs.org/en/download

</details>

### Setup

Run `npm run setup` first to install all dependencies.

-   If anything fails, open `package.json` and run the commands listed under `scripts.setup` one by one.
-   If prompted about database/SQL during setup, answer “Yes”.

### Production

Run `npm run start` and go `http://localhost:8000/` for your project

-   If that doesn't work run `npm install` -> `npm run build` -> `php artisan serve`
-   Sometimes `npm run clean` helps

### Dev environment

Run frontend and backend in different terminals: `npm run dev` for React stuff and `php artisan serve` for backend

-   Open <http://localhost:8000/> for your project

# Testing

Run frontend unit tests with `npm run test`

-   or to see the test coverage run `npm run test:cover`

# Tech Stack

### With what?

This project is done with `React`, `TypeScript`, `TailwindCSS` and `Laravel`

-   [`TanStack Query`](https://tanstack.com/query/latest) for queries
-   [`OpenCage Geocoding API`](https://opencagedata.com/) for finding cities and latitudes/longitudes

## Task

<details>
	<summary>The task itself</summary>
	<p>Intro:
Finland is a long country, which gets dark in the winter and light during the summer. In Lapland the change is more drastic than in Helsinki.

The task:
Create a web app that shows how the daylight time changes in different parts of the country. Create a form where a user can input a name of any Finnish city and display the change in daylight length in minutes during the year in that location. The user has to be able to add multiple locations to the graph to see the difference between locations easily.

Create a PHP backend that returns the daylight data for the location the user types, and a js app (react or vue) that visualizes the changes. You can make the backend on Laravel or just as a "raw php" application.

You can use an external API to convert the location to lat/lon coordinates (if you want). You can use a chart library of your choice to create the graph. You can decide what style of the visualization and the visual details yourself.

Please focus on good, easily readable code and reusable css classes, preferably Tailwind.

Hints:

-   Above the Arctic Circle, there are periods where daylight length is 0 minutes, and periods where the daylight length is 24 \* 60 minutes.
-   A bar graph might be the simplest way to make the visualization

Extra points:

-   Show hotspots/markers on the days where the daylengths of different locations intersect!
-   Show the daylength value for a certain date if the user hovers over it>
</details>
