import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { renderWithQueryClient } from "../../tests/test-utils";

test("renders HomePage", () => {
    renderWithQueryClient(<HomePage />);
    expect(screen.getByText(/discover daylight/i)).toBeInTheDocument();
});
