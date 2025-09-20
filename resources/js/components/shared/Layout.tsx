import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

import bg from "@images/bg-test.webp";
import { Footer } from "./Footer";

interface LayoutProps {
    children: ReactNode;
    title: string;
}

export const Layout = ({ children, title }: LayoutProps) => (
    <div
        className="min-h-screen h-full flex flex-col w-full bg-center bg-cover relative text-white"
        style={{ backgroundImage: `url(${bg})` }}
    >
        <div className="absolute inset-0 bg-black/60"></div>
        <Head title={title} />
        <main className="flex flex-col grow relative z-1">{children}</main>
        <Footer />
    </div>
);
