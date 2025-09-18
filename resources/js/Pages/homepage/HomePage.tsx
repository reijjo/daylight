import { Layout } from "../../components/shared/Layout";
import { FindCityForm } from "../../features/homepage/components/findCityForm/FindCityForm";
import { useDaylight } from "../../features/homepage/hooks/useDaylight";
import { FoundCity } from "../../utils/types";
import { Hero } from "./hero/Hero";
import { lazy, Suspense } from "react";

const CityList = lazy(
    () => import("../../features/homepage/components/citylist/CityList")
);

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
                        <output className="w-max">Loading cities...</output>
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
