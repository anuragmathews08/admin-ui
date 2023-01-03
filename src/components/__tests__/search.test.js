import { render, screen } from "@testing-library/react";
import { SearchBar } from "../index";

describe("Search input tests", () => {
  it("should render search component", () => {
    render(<SearchBar />);
    const searchBarEle = screen.getByTestId("search-bar");
    expect(searchBarEle).toBeInTheDocument();
    const inputBoxEle = screen.getByTestId("input-box");
    expect(inputBoxEle).toHaveAttribute("type", "text");
  });
});
