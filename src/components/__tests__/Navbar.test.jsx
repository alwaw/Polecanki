import { describe, expect, test, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

beforeAll(() => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    )
})

describe("Navbar Component", () => {
    test("should render logo", () => {
        const imgElement = screen.getByTestId("imgLogo");
        expect(imgElement.getAttribute("alt")).to.equal("polecanki logo");
    })
});

