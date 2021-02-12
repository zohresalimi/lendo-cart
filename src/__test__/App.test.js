import { act, render, screen } from "@testing-library/react";
import App from "../App";

import { WithProvider } from "../mockTestData/data";

jest.mock("../components/NavBar", () => () => <div>NavBar Component</div>);
jest.mock("../AppSwitch", () => () => <div>AppSwitch Component</div>);
async function renderWrapper(props) {
  let component;
  act(() => {
    component = render(
      <WithProvider>
        <App />
      </WithProvider>
    );
  });
  return component;
}

describe("App Component Testing", () => {
  test("take snapshot", async () => {
    const { container } = await renderWrapper();
    expect(container.firstChild).toMatchSnapshot();
  });
});
