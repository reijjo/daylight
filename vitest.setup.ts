// import "@testing-library/jest-dom";
import { vi } from "vitest";

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
