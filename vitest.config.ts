/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
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
            ],
        },
    },
});
