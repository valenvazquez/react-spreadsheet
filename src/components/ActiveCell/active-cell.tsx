import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./active-cell.module.scss";
import { useAppContext } from "../../contexts/app-context/app-context";
import {
  getColumnLabel,
  getRowLabel,
  moveActiveCell,
  TDirection,
  Parser,
} from "../../utils";
import { IActiveCellProps } from "./active-cell.types";
import { IActiveCell } from "../../contexts/app-context";
import { EKeys } from "../../types/global-types";

export const ActiveCell = ({ maxCol, maxRow }: IActiveCellProps) => {
  const {
    state: { activeCell },
    dispatch,
  } = useAppContext();
  const { height, offsetLeft, offsetTop, width, col, row } =
    activeCell as IActiveCell;
  const cellLabel = useMemo(
    () => `${getColumnLabel(col)}${getRowLabel(row)}`,
    [col, row]
  );
  const formulaParser = Parser.getInstance();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(
    formulaParser.getVariable(cellLabel) || ""
  );
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  const handleInputBlur = () => {
    formulaParser.setVariable(cellLabel, inputValue);
    formulaParser.fire(`${cellLabel}:changed`);
  };

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.key;
      const isInputFocused = document.activeElement === inputRef.current;
      const keyDirection: Record<EKeys, TDirection> = {
        Enter: "down",
        ArrowDown: "down",
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (key in EKeys) {
        if (isInputFocused) {
          if (key === EKeys.Enter) {
            inputRef.current?.blur();
            moveActiveCell(dispatch, activeCell as IActiveCell, "down", {
              rows: maxRow,
              columns: maxCol,
            });
          }
          return;
        }
        ev.preventDefault();
        if (key === EKeys.Enter) {
          inputRef.current?.focus();
          return;
        }
        moveActiveCell(
          dispatch,
          activeCell as IActiveCell,
          keyDirection[key as EKeys],
          {
            rows: maxRow,
            columns: maxCol,
          }
        );
      } else if (!isInputFocused) {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    },
    [maxCol, maxRow]
  );

  useEffect(() => {
    inputRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={styles["active-cell"]}
      style={{
        left: offsetLeft,
        top: offsetTop,
        width,
        height,
      }}
    >
      <label className={styles["screen-reader-text"]} htmlFor="cell-input">
        {cellLabel} value
      </label>
      <input
        id="cell-input"
        ref={inputRef}
        className={styles.input}
        type="text"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={inputValue}
      />
    </div>
  );
};
