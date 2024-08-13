import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import '@testing-library/jest-dom'
import UserReview from "../UserReview/UserReview";
import useReviewStore from "../../useReviewStore";

vi.mock("../../useReviewStore", () => ({
    default: vi.fn(),
}))

describe("UserReview Component", () => {
    it("should render empty review - initial state", () => {
        useReviewStore.mockReturnValue({
            review: "",
            reviewState: "empty",
            setReview: vi.fn(),
            setReviewState: vi.fn(),
        })

        render(<UserReview maxChars={500} enabledButton={true} />);

        const addReviewButton = screen.getByText("Dodaj opinię");

        expect(addReviewButton).toBeInTheDocument()
      
    });

    it("should render review and should render Edit button", () => {
        useReviewStore.mockReturnValue({
            review: "was ok",
            reviewState: "added",
            setReview: vi.fn(),
            setReviewState: vi.fn(),
        })

        render(<UserReview maxChars={500} enabledButton={true} />);

        const reviewAdded = screen.getByText("was ok");
        const editButton = screen.getByRole("button")

        expect(reviewAdded).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();
    
    })

})

