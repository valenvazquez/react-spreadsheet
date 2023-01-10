import { useRef } from "react";
import { render } from "@testing-library/react";
import { AppContext, IAppContextState } from "../../contexts/app-context";
import { ActiveCell } from "./active-cell";

const stateMock: IAppContextState = {
  activeCell: {
    row: 1,
    col: 2,
    height: 20,
    offsetLeft: 0,
    offsetTop: 0,
    width: 50,
  },
};
const dispatchMock = jest.fn();

jest.mock("react", () => {
  const original = jest.requireActual("react");

  return {
    ...original,
    useRef: jest.fn(() => {
      return () => ({
        current: {
          blur: jest.fn(),
          focus: jest.fn(),
          select: jest.fn(),
          scrollIntoView: jest.fn(),
        },
      });
    }),
  };
});

const setup = () =>
  render(
    <AppContext.Provider value={{ state: stateMock, dispatch: dispatchMock }}>
      <ActiveCell maxCol={10} maxRow={10} />
    </AppContext.Provider>
  );

test("should render ActiveCell at cell C2", () => {
  const { getByRole } = setup();
  const cellInputField = getByRole("textbox", { name: "C2 value" });
  expect(cellInputField).toBeInTheDocument();
});
