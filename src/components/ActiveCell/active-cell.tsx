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
import { updateCellValue } from "../../contexts/app-context/actions/actions";
import {
  getColumnLabel,
  getRowLabel,
  moveActiveCell,
  TDirection,
} from "../../utils/utils";
import { IActiveCellProps } from "./active-cell.types";
import { IActiveCell } from "../../contexts/app-context";
import { Parser } from "../../utils/parser";

export const ActiveCell = ({ maxCol, maxRow }: IActiveCellProps) => {
  const {
    state: { activeCell, data },
    dispatch,
  } = useAppContext();
  const { height, offsetLeft, offsetTop, width, col, row } =
    activeCell as IActiveCell;
  const cellLabel = useMemo(
    () => `${getColumnLabel(col)}${getRowLabel(row)}`,
    [col, row]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(data[cellLabel] || "");
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  const handleInputBlur = () => {
    dispatch(updateCellValue(cellLabel, inputValue));
    const formulaParser = Parser.getInstance();
    formulaParser.setVariable(cellLabel, inputValue);
    formulaParser.fire(`${cellLabel}:changed`);
  };

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.key;
      const isInputFocused = document.activeElement === inputRef.current;
      const keyDirection: Record<string, TDirection> = {
        Enter: "down",
        ArrowDown: "down",
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (key in keyDirection) {
        ev.preventDefault();
        if (key === "Enter") {
          if (isInputFocused) {
            inputRef.current?.blur();
            moveActiveCell(dispatch, activeCell as IActiveCell, "down", {
              rows: maxRow,
              columns: maxCol,
            });
          } else {
            inputRef.current?.focus();
          }
          return;
        }
        if (isInputFocused) {
          return;
        }
        moveActiveCell(dispatch, activeCell as IActiveCell, keyDirection[key], {
          rows: maxRow,
          columns: maxCol,
        });
        return;
      }
      if (!isInputFocused) {
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
      <input
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
