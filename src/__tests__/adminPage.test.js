import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminPage } from "../adminPage";

describe("Admin Page tests", () => {
  it("should contain only one row for filtered text", async () => {
    render(<AdminPage />);
    const inputBoxEle = screen.getByTestId("input-box");
    await userEvent.type(inputBoxEle, "aaron", { delay: 200 });
    await waitFor(() => {
      expect(screen.getByTestId("input-box")).toHaveValue("aaron");
    });
    await waitFor(() => {
      expect(screen.getAllByTestId("data-row")).toHaveLength(1);
    });
  });

  it("should contain only one row for upper case search", async () => {
    render(<AdminPage />);
    const inputBoxEle = screen.getByTestId("input-box");
    await userEvent.type(inputBoxEle, "AARON", { delay: 200 });
    await waitFor(() => {
      expect(screen.getByTestId("input-box")).toHaveValue("AARON");
    });
    await waitFor(() => {
      expect(screen.getAllByTestId("data-row")).toHaveLength(1);
    });
  });
});
