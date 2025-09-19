import { useState } from "react";
import { DaylightData } from "../../../../utils/types";
import SunlightBar from "../charts/SunlightBar";
import SunlightLine from "../charts/SunlightLine";
import close from "../../../../../assets/images/close.png";
import { CloseButton } from "../../../../components/ui/buttons/CloseButton";
import { Button } from "../../../../components/ui/buttons/Button";

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

            <h1 className="text-center uppercase text-lg sm:text-xl">
                Daylight in minutes
            </h1>
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
