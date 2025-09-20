import { useState } from "react";
import { DaylightData } from "@utils/index";
import { CloseButton, Button } from "@components/index";
import { SunlightBar, SunlightLine } from "../charts";

interface ChartsProps {
    savedCities: DaylightData[];
    removeAllCities: () => void;
}

export const Charts = ({ savedCities, removeAllCities }: ChartsProps) => {
    const [step, setStep] = useState(1);
    const [isBarchart, setIsBarchart] = useState(true);

    return (
        <div className="w-full max-w-9/10 backdrop-blur-md p-4 sm:px-8 sm:py-4 rounded-2xl overflow-hidden border border-white/30 bg-black/10 flex flex-col gap-4 shadow-xl shadow-white/10 relative text-sm">
            <CloseButton
                topRight="4"
                onClick={removeAllCities}
                ariaLabel="Remove all cities"
            />

            <h1 className="text-lg">minutes</h1>
            {isBarchart ? (
                <SunlightBar data={savedCities} step={step} />
            ) : (
                <SunlightLine data={savedCities} step={step} />
            )}
            <div className="flex justify-end gap-4 min-h-10 flex-col sm:flex-row">
                <Button
                    aria-pressed={step !== 1}
                    onClick={() => setStep(step === 1 ? 7 : 1)}
                    secondary
                >
                    {step === 1 ? "Show every 7th day" : "Show all days"}
                </Button>
                <Button onClick={() => setIsBarchart(!isBarchart)}>
                    {isBarchart ? "Switch to Linechart" : "Switch to Barchart"}
                </Button>
            </div>
        </div>
    );
};
