import * as React from "react";

import { act, render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WithProvider, getTestStore } from "../../../mockTestData/data";

import CartItem from "..";

async function renderWrapper(props, mockDispatch) {
  let component;

  act(() => {
    component = render(
      <WithProvider mockDispatch={mockDispatch}>
        <CartItem {...props} />
      </WithProvider>,
      {
        container: document.createElement("tbody"),
      }
    );
  });

  return component;
}

describe("Cart Item", () => {
  test("should match snapshot", async () => {
    const testState = getTestStore();
    const { container } = await renderWrapper({
      product: testState.shoppingCart[0],
      onRemove: () => {},
    });

    expect(container).toMatchSnapshot();
  });

  test("should not decrease on down-button click if quantity is 1", async () => {
    const testState = getTestStore();
    const mockDispatch = jest.fn();
    const { getByTestId } = await renderWrapper(
      {
        product: testState.shoppingCart[0],
        onRemove: () => {},
      },
      mockDispatch
    );

    await waitFor(() => {
      const decreaseButton = getByTestId("decrease-button");

      fireEvent.click(decreaseButton);
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });

  test("should decrease quantity on down-button click", async () => {
    const testState = getTestStore();
    const mockDispatch = jest.fn();
    const { getByTestId } = await renderWrapper(
      {
        product: {
          ...testState.shoppingCart[0],
          quantity: 2,
        },
        onRemove: () => {},
      },
      mockDispatch
    );

    await waitFor(() => {
      const decreaseButton = getByTestId("decrease-button");

      fireEvent.click(decreaseButton);
      expect(mockDispatch).toHaveBeenLastCalledWith({
        type: "decreaseQuantity",
        data: {
          ...testState.shoppingCart[0],
          quantity: 2,
        },
      });
    });
  });

  test("should increase quantity on up-button click", async () => {
    const testState = getTestStore();
    const mockDispatch = jest.fn();
    const { getByTestId } = await renderWrapper(
      {
        product: testState.shoppingCart[0],
        onRemove: () => {},
      },
      mockDispatch
    );

    await waitFor(() => {
      const increaseButton = getByTestId("increase-button");

      fireEvent.click(increaseButton);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "increaseQuantity",
        data: testState.shoppingCart[0],
      });
    });
  });

  test("should remove item on remove-button click", async () => {
    const testState = getTestStore();
    const mockDispatch = jest.fn();
    const mockRemoveCallback = jest.fn();
    const { getByTestId } = await renderWrapper(
      {
        product: testState.shoppingCart[0],
        onRemove: mockRemoveCallback,
      },
      mockDispatch
    );

    await waitFor(() => {
      const removeButton = getByTestId("remove-button");

      fireEvent.click(removeButton);
      expect(mockRemoveCallback).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "removeItem",
        data: testState.shoppingCart[0],
      });
    });
  });
});
