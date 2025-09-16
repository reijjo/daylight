import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { getCities } from "../api/daylightApi";
import { FoundCity } from "../../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { CitySuggestions } from "./CitySuggestions";
import { useMutation } from "@tanstack/react-query";
import { Message } from "../../../components/ui/Message";

type FormValues = {
    city: string;
};

export const FindCityForm = () => {
    const [selectedCity, setSelectedCity] = useState<FoundCity | null>(null);

    const searchMutation = useMutation({
        mutationFn: (city: string) => getCities(city),
        onSuccess: (data) => {
            console.log("Search results", data);
        },
        onError: (error: unknown) => {
            console.log("Search error", error);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm<{ city: string }>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        searchMutation.mutate(data.city);
    };

    const handleCitySelection = (cityName: FoundCity) => {
        setSelectedCity(cityName);
        searchMutation.reset();
        setValue("city", "");
    };

    console.log("suggestions", searchMutation.data);
    console.log("selectedCity", selectedCity?.display_name);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm w-8/10 flex flex-col gap-2 sm:flex-row sm:max-w-md"
        >
            <div className="w-full flex flex-col gap-1">
                <Input
                    id="city"
                    placeholder="Find a city"
                    {...register("city", {
                        required: "City is required.",
                        maxLength: {
                            value: 100,
                            message: "Max 100 characters",
                        },
                    })}
                    onChange={() => {
                        clearErrors("city");
                    }}
                />
                {searchMutation.isPending && (
                    <Message message="Loading..." type="info" />
                )}
                {searchMutation.data?.data.length === 0 &&
                    searchMutation.isSuccess && (
                        <Message message="No cities found." type="error" />
                    )}
                {errors.city && (
                    <Message type="error" message={errors.city?.message} />
                )}
                <CitySuggestions
                    suggestions={searchMutation.data?.data || null}
                    handleCitySelection={handleCitySelection}
                />
            </div>
            <button
                type="submit"
                disabled={searchMutation.isPending}
                className="border border-white/20 px-4 py-2 rounded-4xl h-12 cursor-pointer whitespace-nowrap bg-emerald-800/75 hover:bg-emerald-700 active:scale-90 transition-all duration-150 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Search
            </button>
        </form>
    );
};
