import React, { useEffect, useMemo, useRef } from "react";
import { ICellProps } from "./cell.types";
import styles from "./cell.module.scss";
import { setActiveCell } from "../../contexts/app-context/actions/actions";
import { useCellValue } from "../../hooks/useCellValue";
import { getCellLabel } from "../../utils/utils";

export const Cell = React.memo(({ row, col, value, dispatch }: ICellProps) => {
  const cellRef = useRef<HTMLTableCellElement | null>(null);
  const cellValue = useCellValue(getCellLabel(row, col), value);

  const handleClick = () => {
    if (cellRef.current) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
        cellRef.current;
      dispatch(
        setActiveCell({
          offsetLeft,
          offsetTop,
          height: offsetHeight,
          width: offsetWidth,
          row,
          col,
        })
      );
    }
  };

  // Initialize active cell in A1
  useEffect(() => {
    if (col === 0 && row === 0) {
      handleClick();
    }
  }, []);

  return (
    <td
      tabIndex={0}
      className={styles.cell}
      onClick={handleClick}
      ref={cellRef}
    >
      {cellValue}
    </td>
  );
});
