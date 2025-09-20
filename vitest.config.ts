/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "resources/js/components"),
            "@features": path.resolve(__dirname, "resources/js/features"),
            "@utils": path.resolve(__dirname, "resources/js/utils"),
            "@images": path.resolve(__dirname, "resources/assets/images"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        include: ["**/*.{test,spec}.{ts,tsx}"],
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/vite.config.ts",
            "**/*.js",
        ],
        setupFiles: ["./vitest.setup.ts"],
        coverage: {
            include: ["resources/js/**/*.{ts,tsx}"],
            exclude: [
                "node_modules/",
                "vendor/",
                "**/*.{test,spec}.{ts,tsx}",
                "**/*.config.{js,ts}",
                "**/*.js",
                "dist/",
                "coverage/",
                "**/js/app.tsx",
            ],
        },
    },
});
