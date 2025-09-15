import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createInertiaApp({
    resolve: (name: string) => {
        const pages = import.meta.glob("./Pages/**/!(*.spec).tsx", {
            eager: true,
        });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el as HTMLElement).render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
            </QueryClientProvider>
        );
    },
});
