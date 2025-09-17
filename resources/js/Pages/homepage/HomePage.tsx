import { useState } from "react";
import { Layout } from "../../components/shared/Layout";
import { Message } from "../../components/ui/Message";
import { FindCityForm } from "../../features/homepage/components/FindCityForm";
import { useDaylight } from "../../features/homepage/hooks/useDaylight";
import { FoundCity } from "../../utils/types";
import { Hero } from "./hero/Hero";
import CityList from "../../features/homepage/components/CityList";

const HomePage = () => {
    const {
        savedCities,
        daylightMutation,
        removeCity,
        removeAllCities,
        isLoading,
        error,
        dataMsg,
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
                    dataMsg={dataMsg}
                />
                <CityList savedCities={savedCities} msg={msg} />
            </div>
        </Layout>
    );
};

export default HomePage;
