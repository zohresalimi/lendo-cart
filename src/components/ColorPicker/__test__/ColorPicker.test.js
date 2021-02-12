import * as React from "react";

import { act, render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";

import ColorPicker from "..";

async function renderWrapper(props, mockDispatch) {
  let component;

  act(() => {
    component = render(
      <WithProvider mockDispatch={mockDispatch}>
        <ColorPicker {...props} />
      </WithProvider>
    );
  });

  return component;
}

describe("Color Picker", () => {
  test("should match snapshot", async () => {
    const { container } = await renderWrapper({
      items: ["white", "red"],
    });

    expect(container).toMatchSnapshot();
  });

  test("should change color on button click", async () => {
    const mockDispatch = jest.fn();
    const { getAllByTestId } = await renderWrapper(
      { items: ["white", "red"] },
      mockDispatch
    );
    await waitFor(() => {
      const colorButton = getAllByTestId("select-color")[1];

      fireEvent.click(colorButton);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "setFeatures",
        data: { value: "red", name: "color" },
      });
    });
  });
});
