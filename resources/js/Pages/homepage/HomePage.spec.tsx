import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";

test("renders HomePage", () => {
    render(<HomePage />);
    expect(screen.getByText(/discover daylight/i)).toBeInTheDocument();
});
