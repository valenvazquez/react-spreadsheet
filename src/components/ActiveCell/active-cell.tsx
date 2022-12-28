import React, { ChangeEvent, useMemo, useState } from "react";
import styles from "./active-cell.module.scss";
import { useAppContext } from "../../contexts/app-context/app-context";
import { updateCellData } from "../../contexts/app-context/actions/actions";
import { getColumnLabel, getRowLabel } from "../../utils/utils";
import { IActiveCellProps } from "./active-cell.types";
import { Parser } from "../../utils/parser";
import { mapValues } from "lodash";

export const ActiveCell = ({ col, row }: IActiveCellProps) => {
  const {
    state: { activeCell, data },
    dispatch,
  } = useAppContext();
  const cellLabel = useMemo(
    () => `${getColumnLabel(col)}${getRowLabel(row)}`,
    [col, row]
  );

  const [inputValue, setInputValue] = useState<string>(
    data[cellLabel]?.formula || data[cellLabel]?.value || ""
  );
  const [isTypingFormula, setIsTypingFormula] = useState<boolean>(
    data[cellLabel]?.formula?.startsWith("=")
  );
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.startsWith("=")) {
      if (!isTypingFormula) {
        setIsTypingFormula(true);
      }
    } else if (isTypingFormula) {
      setIsTypingFormula(false);
    }
    setInputValue(ev.target.value);
  };

  const handleInputBlur = () => {
    if (isTypingFormula) {
      dispatch(
        updateCellData(cellLabel, {
          formula: inputValue,
        })
      );
    } else {
      dispatch(
        updateCellData(cellLabel, {
          value: inputValue,
        })
      );
    }
  };

  return (
    <div
      className={styles["active-cell"]}
      style={{
        left: activeCell?.offsetLeft,
        top: activeCell?.offsetTop,
        width: activeCell?.width,
        height: activeCell?.height,
      }}
    >
      <input
        className={styles.input}
        type="text"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={inputValue}
      />
    </div>
  );
};
