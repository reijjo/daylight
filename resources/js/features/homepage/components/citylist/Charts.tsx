import { useState } from "react";
import { DaylightData } from "../../../../utils/types";
import SunlightBar from "../charts/SunlightBar";
import SunlightLine from "../charts/SunlightLine";
import close from "../../../../../assets/images/close.png";

interface ChartsProps {
    savedCities: DaylightData[];
    removeAllCities: () => void;
}

export const Charts = ({ savedCities, removeAllCities }: ChartsProps) => {
    const [step, setStep] = useState(1);
    const [isBarchart, setIsBarchart] = useState(true);

    return (
        <div className="w-full max-w-9/10 backdrop-blur-md p-4 pt-4 pr-8 rounded-2xl overflow-hidden border border-white/30 bg-black/10 flex flex-col gap-4 shadow-xl shadow-white/10 relative">
            <button
                type="button"
                aria-label={`Remove all cities`}
                onClick={removeAllCities}
                className="absolute top-4 right-4 cursor-pointer bg-white/50 p-1 grid place-items-center rounded-full hover:scale-110 active:scale-90 transition-all duration-150 ease-in"
            >
                <img
                    src={close}
                    title="close"
                    alt="close"
                    className="h-4 w-4"
                    aria-hidden="true"
                />
            </button>
            <h1 className="text-center uppercase text-xl">
                Daylight in minutes
            </h1>
            {isBarchart ? (
                <SunlightBar data={savedCities} step={step} />
            ) : (
                <SunlightLine data={savedCities} step={step} />
            )}
            <div className="flex justify-end gap-4 h-10">
                <button
                    type="button"
                    aria-pressed={step !== 1}
                    onClick={() => setStep(step === 1 ? 7 : 1)}
                    className="border border-white/40 px-4 py-2 rounded-4xl h-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm text-center hover:border-white hover:bg-black/50 active:scale-90 transition-all duration-150 ease-in"
                >
                    {step === 1 ? "Show every 7th day" : "Show all days"}
                </button>
                <button
                    type="button"
                    onClick={() => setIsBarchart(!isBarchart)}
                    className="border border-white/20 px-4 py-2 rounded-4xl h-full cursor-pointer whitespace-nowrap bg-emerald-800/75 hover:bg-emerald-700 active:scale-90 transition-all duration-150 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm text-center"
                >
                    {isBarchart ? "Switch to Linechart" : "Switch to Barchart"}
                </button>
            </div>
        </div>
    );
};
