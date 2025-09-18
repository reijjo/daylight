import { Input } from "../../../../components/ui/Input";
import { FoundCity } from "../../../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Message } from "../../../../components/ui/Message";
import { useCitySearch } from "../../hooks/useCitySearch";
import { CitySuggestions } from "./CitySuggestions";

type FormValues = {
    city: string;
};

interface FindCityFormProps {
    handleCitySelect: (city: FoundCity) => void;
    isAddingCity: boolean;
    msg?: string;
}

export const FindCityForm = ({
    handleCitySelect,
    isAddingCity,
    msg,
}: FindCityFormProps) => {
    const { searchMutation } = useCitySearch();

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
        searchMutation.reset();
        searchMutation.mutate(data.city.trim());
    };

    const onCitySelect = async (city: FoundCity) => {
        handleCitySelect(city);
        setValue("city", "");
        clearErrors("city");
        searchMutation.reset();
    };

    return (
        <div className="max-w-sm w-8/10 sm:max-w-md flex flex-col gap-2 relative">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-2 sm:flex-row"
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
                        onFocus={() => {
                            searchMutation.reset();
                            // clearErrors("city");
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={searchMutation.isPending || isAddingCity}
                    className="border border-white/20 px-4 py-2 rounded-4xl h-12 cursor-pointer whitespace-nowrap bg-emerald-800/75 hover:bg-emerald-700 active:scale-90 transition-all duration-150 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Search
                </button>
            </form>
            {searchMutation.isPending && (
                <Message message="Searching..." type="info" />
            )}
            {isAddingCity && <Message message="Adding city..." type="info" />}
            {searchMutation.data?.length === 0 && searchMutation.isSuccess && (
                <Message message="No cities found." type="error" />
            )}
            {errors.city?.message && (
                <Message type="error" message={errors.city?.message} />
            )}
            {msg && <Message message={msg} type="info" />}

            <CitySuggestions
                suggestions={searchMutation?.data || null}
                onCitySelect={onCitySelect}
            />
        </div>
    );
};
