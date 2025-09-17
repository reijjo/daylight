import { Layout } from "../../components/shared/Layout";
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
        msg,
    } = useDaylight();

    const handleCitySelect = (city: FoundCity) => {
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
                    msg={msg}
                />
                <CityList savedCities={savedCities} />
            </div>
        </Layout>
    );
};

export default HomePage;
