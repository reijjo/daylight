import { FormEvent } from "react";
import { Input } from "../../../components/ui/Input";

export const FindCityForm = () => {
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("WOOHOO");
    };

    return (
        <form onSubmit={submit} className="max-w-md w-9/10 flex gap-2">
            <Input id="city" placeholder="Find a city" />
            <button
                type="submit"
                className="border border-white/20 px-4 py-2 rounded-4xl h-12 cursor-pointer whitespace-nowrap bg-emerald-800/75 hover:bg-emerald-700 active:scale-90 transition-all duration-150 ease-in"
            >
                Find City
            </button>
        </form>
    );
};
