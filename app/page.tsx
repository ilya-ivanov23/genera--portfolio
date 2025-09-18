import { navItems } from "@/data";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import {FloatingNav} from "@/components/ui/FloatingNav";

// Динамическая загрузка клиентских компонентов
const Hero = dynamic(() => import("@/components/Hero"), {
    ssr: false,
    loading: () => <div className="h-[50vh] bg-black-100">Loading Hero...</div>,
});
const Grid = dynamic(() => import("@/components/Grid"), {
    ssr: false,
    loading: () => <div className="h-[30vh] bg-black-100">Loading Grid...</div>,
});

const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
    ssr: false,
});
const Clients = dynamic(() => import("@/components/Clients"), {
    ssr: false,
});
const Experience = dynamic(() => import("@/components/Experience"), {
    ssr: false,
});
const Approach = dynamic(() => import("@/components/Approach"), {
    ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="relative bg-black-100 flex justify-center overflow-hidden items-center flex-col mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">

                    <FloatingNav navItems={navItems} />

                <Suspense fallback={<div>Loading Hero...</div>}>
                    <Hero />
                </Suspense>
                <Suspense fallback={<div>Loading Grid...</div>}>
                    <Grid />
                </Suspense>
                <Suspense fallback={<div>Loading Projects...</div>}>
                    <RecentProjects />
                </Suspense>
                <Suspense fallback={<div>Loading Clients...</div>}>
                    <Clients />
                </Suspense>
                <Suspense fallback={<div>Loading Experience...</div>}>
                    <Experience />
                </Suspense>
                <Suspense fallback={<div>Loading Approach...</div>}>
                    <Approach />
                </Suspense>
                <Suspense fallback={<div>Loading Footer...</div>}>
                    <Footer />
                </Suspense>
            </div>
        </main>
    );
}