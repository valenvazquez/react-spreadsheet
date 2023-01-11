import { useRef } from "react";
import * as Parser from "../../utils/parser";
import * as Utils from "../../utils/utils";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { AppContext, IAppContextState } from "../../contexts/app-context";
import { ActiveCell } from "./active-cell";

const MAX_COL = 10;
const MAX_ROW = 10;

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

const moveActiveCellSpy = jest.spyOn(Utils, "moveActiveCell");

const setup = () =>
  render(
    <AppContext.Provider value={{ state: stateMock, dispatch: dispatchMock }}>
      <ActiveCell maxCol={MAX_COL} maxRow={MAX_ROW} />
    </AppContext.Provider>
  );

test("should render ActiveCell at cell C2", () => {
  const { getByRole } = setup();
  const cellInputField = getByRole("textbox", { name: "C2 value" });
  expect(cellInputField).toBeInTheDocument();
});

test("should update input value when typing and fire C2:changed event on blur", () => {
  const fireSpy = jest.spyOn(Parser.Parser.getInstance(), "fire");
  const setVariableSpy = jest.spyOn(Parser.Parser.getInstance(), "setVariable");
  const inputValue = "=A1+2";
  const { getByRole } = setup();
  const cellInputField = getByRole("textbox", { name: "C2 value" });
  fireEvent.change(cellInputField, { target: { value: inputValue } });
  fireEvent.blur(cellInputField);
  expect(fireSpy).toHaveBeenCalledWith("C2:changed");
  expect(setVariableSpy).toHaveBeenCalledWith("C2", inputValue);
});

test("should call moveActiveCell function on ArrowRight keydown and input not focused", async () => {
  setup();
  fireEvent.keyDown(window, { key: "ArrowRight" });
  expect(moveActiveCellSpy).toHaveBeenCalledTimes(1);
  moveActiveCellSpy.mockReset();
});
