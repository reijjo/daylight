declare const global: any;

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock ResizeObserver globally
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock IntersectionObserver if needed
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock matchMedia for responsive chart behavior
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

vi.mock("@inertiajs/react", () => ({
    Head: ({ children }: { children?: React.ReactNode }) => {
        children;
    },

    usePage: () => ({
        props: {},
        url: "/",
        component: "HomePage",
        version: null,
    }),
    useForm: () => ({
        data: {},
        setData: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
        reset: vi.fn(),
        clearErrors: vi.fn(),
        errors: {},
        hasErrors: false,
        processing: false,
        progress: null,
        wasSuccessful: false,
        recentlySuccessful: false,
    }),
}));

afterEach(() => {
    vi.clearAllMocks();
    cleanup();
});
