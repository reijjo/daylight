import { Layout } from "../../components/shared/Layout";
import { FindCityForm } from "../../features/homepage/components/FindCityForm";
import { useDaylight } from "../../features/homepage/hooks/useDaylight";
import { FoundCity } from "../../utils/types";
import { Hero } from "./hero/Hero";
import CityList from "../../features/homepage/components/citylist/CityList";
import { useExampleCity } from "../../features/homepage/hooks/useExampleCity";
import { Suspense, useEffect } from "react";

const HomePage = () => {
    const {
        savedCities,
        setSavedCities,
        daylightMutation,
        removeCity,
        removeAllCities,
        isLoading,
        error,
        msg,
    } = useDaylight();

    const handleCitySelect = (city: FoundCity) => {
        daylightMutation.mutate(city);
    };

    return (
        <Layout title="Daylight">
            <div className="h-full w-full flex grow flex-col items-center pt-16 pb-8 gap-4">
                <Hero />
                <FindCityForm
                    handleCitySelect={handleCitySelect}
                    isAddingCity={isLoading}
                    msg={msg}
                />
                <Suspense
                    fallback={
                        <div className="w-full border-amber-200 border-8">
                            Loading cities...
                        </div>
                    }
                >
                    <CityList
                        savedCities={savedCities}
                        setSavedCities={setSavedCities}
                        removeCity={removeCity}
                        removeAllCities={removeAllCities}
                    />
                </Suspense>
            </div>
        </Layout>
    );
};

export default HomePage;
