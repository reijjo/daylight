import { Input, Button, Message } from "../../../../components";
import { FoundCity, MessageProps } from "../../../../utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCitySearch } from "../../hooks";
import { CitySuggestions } from "./CitySuggestions";

type FormValues = {
    city: string;
};

interface FindCityFormProps {
    handleCitySelect: (city: FoundCity) => void;
    msg?: MessageProps;
}

export const FindCityForm = ({ handleCitySelect, msg }: FindCityFormProps) => {
    const { searchMutation, searchMessage } = useCitySearch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm<FormValues>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        searchMutation.reset();
        searchMutation.mutate(data.city.trim());
    };

    const onCitySelect = async (city: FoundCity) => {
        console.log("city", city);
        handleCitySelect(city);
        setValue("city", "");
        clearErrors("city");
        searchMutation.reset();
    };

    return (
        <div className="max-w-sm w-8/10 sm:max-w-md flex flex-col gap-2 mb-2 relative">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-2 sm:flex-row min-h-12"
            >
                <div className="w-full flex flex-col gap-1">
                    <Input
                        id="city"
                        placeholder="Find a city"
                        autoComplete="off"
                        type="text"
                        {...register("city", {
                            required: "City is required.",
                            maxLength: {
                                value: 100,
                                message: "Max 100 characters",
                            },
                        })}
                        onFocus={() => {
                            searchMutation.reset();
                        }}
                    />
                </div>
                <Button type="submit" ariaLabel="Search">
                    Search
                </Button>
            </form>
            {searchMessage && (
                <Message
                    message={searchMessage.message}
                    type={searchMessage.type}
                />
            )}
            {msg && <Message message={msg.message} type={msg.type} />}
            {errors.city?.message && (
                <Message type="error" message={errors.city?.message} />
            )}
            <CitySuggestions
                suggestions={searchMutation?.data || null}
                onCitySelect={onCitySelect}
            />
        </div>
    );
};
