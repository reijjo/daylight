import { useState } from "react";
import { DaylightData } from "../../../../utils/types";
import SunlightBar from "../charts/SunlightBar";

interface ChartsProps {
    savedCities: DaylightData[];
}

export const Charts = ({ savedCities }: ChartsProps) => {
    const [step, setStep] = useState(1);

    return (
        <div className="w-full max-w-9/10 backdrop-blur-md p-4 pt-4 pr-8 rounded-2xl overflow-hidden border border-white/30 bg-black/10 flex flex-col gap-4 shadow-xl shadow-white/10">
            <h1 className="text-center uppercase text-xl">
                Daylight in minutes
            </h1>
            <SunlightBar data={savedCities} step={step} />
            <div className="flex justify-end gap-4">
                <button
                    onClick={() => setStep(step === 1 ? 7 : 1)}
                    className="border border-white/40 px-4 py-2 rounded-4xl h-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm text-center hover:border-white hover:bg-black/50 active:scale-90 transition-all duration-150 ease-in"
                >
                    {step === 1 ? "Show every 7th day" : "Show all days"}
                </button>
                <button
                    type="button"
                    className="border border-white/20 px-4 py-2 rounded-4xl h-10 cursor-pointer whitespace-nowrap bg-emerald-800/75 hover:bg-emerald-700 active:scale-90 transition-all duration-150 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm text-center"
                >
                    Switch to Linechart
                </button>
            </div>
        </div>
    );
};
