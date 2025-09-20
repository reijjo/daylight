import { SunlightLine } from "@features/homepage/components/charts";
import { render, screen } from "@testing-library/react";
import { mockDaylightData } from "../../../mocks/mocks";
import { describe, it, expect } from "vitest";

describe("SunlightLine.tsx", () => {
    it("renders SunlightLine component", () => {
        const { container } = render(
            <SunlightLine data={[mockDaylightData]} step={1} />
        );

        // Check that the chart container is rendered
        const chartContainer = container.querySelector(
            ".recharts-responsive-container"
        );
        expect(chartContainer).toBeInTheDocument();
    });

    it("renders nothing when data is empty", () => {
        const { container } = render(<SunlightLine data={[]} step={1} />);

        expect(container.firstChild).toBeNull();
    });

    it("applies step sampling when step > 1", () => {
        const { container } = render(
            <SunlightLine data={[mockDaylightData]} step={7} />
        );

        const chartContainer = container.querySelector(
            ".recharts-responsive-container"
        );
        expect(chartContainer).toBeInTheDocument();
    });
});
