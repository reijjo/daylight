import { Layout } from "../../components/shared/Layout";
import { FindCityForm } from "../../features/homepage/components/FindCityForm";
import { Hero } from "./hero/Hero";

const HomePage = () => {
    return (
        <Layout title="Daylight">
            <div className="h-full w-full flex grow flex-col items-center pt-16 gap-4">
                <Hero />
                <FindCityForm />
            </div>
        </Layout>
    );
};

export default HomePage;
