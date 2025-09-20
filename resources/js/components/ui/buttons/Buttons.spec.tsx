import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "./Button";
import { CloseButton } from "./CloseButton";

describe("Buttons", () => {
    describe("Normal Button", () => {
        test("shows white border on hover on secondary button", () => {
            render(<Button secondary={true}>Test</Button>);

            const button = screen.getByRole("button");
            expect(button.className).toContain("hover:border-white");
        });
    });

    describe("Close Button", () => {
        test("bigger absolute values", () => {
            render(
                <CloseButton
                    onClick={() => {}}
                    ariaLabel={"test"}
                    topRight="6"
                />
            );

            const button = screen.getByRole("button");
            expect(button).toHaveClass("absolute top-6 right-6");
        });

        test("default absolute values", () => {
            render(<CloseButton onClick={() => {}} ariaLabel={"test"} />);

            const button = screen.getByRole("button");
            expect(button.className).toContain("absolute top-2 right-2");
        });
    });
});
