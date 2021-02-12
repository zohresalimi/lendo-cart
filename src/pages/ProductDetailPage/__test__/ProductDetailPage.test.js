import * as React from "react";

import { act, render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider } from "../../../mockTestData/data";

import ProductDetailPage from "..";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
}));

jest.mock("@material-ui/core", () => ({
  ...jest.requireActual("@material-ui/core"),
  useMediaQuery: () => true,
  useTheme: () => ({ breakpoints: { down: () => {} } }),
}));

async function renderWrapper(props) {
  let component;

  act(() => {
    component = render(
      <WithProvider {...props}>
        <ProductDetailPage isOpen={true} />
      </WithProvider>
    );
  });

  return component;
}

describe("Product Detail Page", () => {
  test("shows match snapshot", async () => {
    const mockDispatch = jest.fn();
    const { getByTestId } = await renderWrapper({ mockDispatch });

    await waitFor(() => {
      const el = getByTestId("dialog-wrapper");
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(el).toBeInTheDocument();
    });
  });

  test("should add product to cart on button click", async () => {
    const mockDispatch = jest.fn();
    const { getByTestId } = await renderWrapper({ mockDispatch });

    await waitFor(() => {
      const addToCartButton = getByTestId("add-to-cart");

      expect(addToCartButton).toBeInTheDocument();

      fireEvent.click(addToCartButton);
      expect(mockDispatch).toHaveBeenCalledWith({ type: "addProductToCart" });
    });
  });

  test("add to cart button must be disabled if product is not in stock", async () => {
    const { getByTestId } = await renderWrapper();

    await waitFor(() => {
      const addToCartButton = getByTestId("add-to-cart");

      fireEvent.click(addToCartButton);
      fireEvent.click(addToCartButton);
      fireEvent.click(addToCartButton);

      expect(addToCartButton).toBeDisabled();
    });
  });
});
