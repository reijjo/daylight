import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "resources/js/components"),
            "@features": path.resolve(__dirname, "resources/js/features"),
            "@utils": path.resolve(__dirname, "resources/js/utils"),
            "@images": path.resolve(__dirname, "resources/assets/images"),
        },
    },
});
