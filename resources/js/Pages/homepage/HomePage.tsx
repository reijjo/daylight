import { Layout } from "@components/index";
import { FindCityForm } from "@features/homepage/components";
import { useDaylight } from "@features/homepage/hooks";
import { FoundCity } from "@utils/index";
import { Hero } from "./hero/Hero";
import { lazy, Suspense } from "react";

const CityList = lazy(
    () => import("@features/homepage/components/citylist/CityList")
);

const HomePage = () => {
    const {
        savedCities,
        setSavedCities,
        daylightMutation,
        removeCity,
        removeAllCities,
        daylightMessage,
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
                    msg={daylightMessage}
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
