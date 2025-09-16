import { useEffect, useState } from "react";
import { Layout } from "../../components/shared/Layout";
import { Message } from "../../components/ui/Message";
import { FindCityForm } from "../../features/homepage/components/FindCityForm";
import { useDaylight } from "../../features/homepage/hooks/useDaylight";
import { FoundCity } from "../../utils/types";
import { Hero } from "./hero/Hero";

const HomePage = () => {
    const {
        savedCities,
        daylightMutation,
        removeCity,
        removeAllCities,
        isLoading,
        error,
    } = useDaylight();
    const [msg, setMsg] = useState<string | null>(null);

    const handleCitySelect = (city: FoundCity) => {
        if (savedCities.length >= 6) {
            setMsg("Max 6 cities");
            setTimeout(() => setMsg(null), 5000);
            return;
        }
        daylightMutation.mutate(city);
    };

    console.log("saved cities", savedCities);

    return (
        <Layout title="Daylight">
            <div className="h-full w-full flex grow flex-col items-center pt-16 gap-4">
                <Hero />
                <FindCityForm
                    handleCitySelect={handleCitySelect}
                    isAddingCity={isLoading}
                />
                <div className="flex flex-col items-center gap-4">
                    {savedCities.map((city) => (
                        <p key={city.id}>{city.city}</p>
                    ))}
                    {savedCities.length >= 6 && msg && (
                        <Message message={msg as string} type="info" />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
