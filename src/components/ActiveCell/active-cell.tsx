import React, { ChangeEvent, useMemo, useState } from "react";
import styles from "./active-cell.module.scss";
import { useAppContext } from "../../contexts/app-context/app-context";
import { updateCellValue } from "../../contexts/app-context/actions/actions";
import { getColumnLabel, getRowLabel } from "../../utils/utils";
import { IActiveCellProps } from "./active-cell.types";

export const ActiveCell = ({ col, row }: IActiveCellProps) => {
  const {
    state: { activeCell, data },
    dispatch,
  } = useAppContext();
  const cellLabel = useMemo(
    () => `${getColumnLabel(col)}${getRowLabel(row)}`,
    [col, row]
  );
  const [inputValue, setInputValue] = useState<string>(data[cellLabel] || "");
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  const handleInputBlur = () => {
    dispatch(updateCellValue(cellLabel, inputValue));
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
