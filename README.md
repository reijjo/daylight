# daylight

A web app that visualizes how daylight hours change throughout the year in different Finnish cities.

## What is this?

## How to use?

### Testing

Run frontend unit tests with `npm run test`

-   or to see the test coverage run `npm run test:cover`

## Tech Stack

<details>
	<summary>The task itself</summary>
	<pIntro:
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
