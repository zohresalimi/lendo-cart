import * as React from "react";

import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";
import * as hooks from "../../../hooks/useAxios";

import HomePage from "..";

jest.mock("../../../components/DataTable", () => () => (
  <div>DataTable Component</div>
));

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
        <HomePage path="/" />
      </WithProvider>
    );
  });

  return component;
}

describe("Home Page", () => {
  test("shows loading if products are not loaded yet", async () => {
    const mockAxios = jest.fn();
    mockAxios.mockReturnValue([
      {
        isLoading: true,
        data: null,
        isError: false,
      },
    ]);

    jest.spyOn(hooks, "default").mockImplementation(mockAxios);

    const mockDispatch = jest.fn();

    const { container } = await renderWrapper({ mockDispatch });
    expect(mockDispatch).toHaveBeenCalledTimes(0);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("shows the product from api call", async () => {
    const mockAxios = jest.fn();
    mockAxios.mockReturnValue([
      {
        isLoading: false,
        data: {
          items: [
            {
              id: 1,
              name: "Philips hue bulb",
              brand: "Philips",
              price: "500",
            },
            {
              id: 2,
              name: "Trådfria Lampor",
              brand: "IKEA",
              price: "300",
            },
          ],
        },
        isError: false,
      },
    ]);

    jest.spyOn(hooks, "default").mockImplementation(mockAxios);

    const mockDispatch = jest.fn();

    const { container } = await renderWrapper({ mockDispatch });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toMatchSnapshot();
  });
});
