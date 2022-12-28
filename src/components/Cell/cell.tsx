import React, { useMemo, useRef } from "react";
import { ICellProps } from "./cell.types";
import styles from "./cell.module.scss";
import { setActiveCell } from "../../contexts/app-context/actions/actions";
import { useAppContext } from "../../contexts/app-context/app-context";
import { getColumnLabel, getRowLabel } from "../../utils/utils";
import { Parser } from "../../utils/parser";
import { mapValues } from "lodash";

export const Cell = ({ row, col, value, dispatch }: ICellProps) => {
  const cellLabel = useMemo(
    () => `${getColumnLabel(col)}${getRowLabel(row)}`,
    []
  );

  const cellRef = useRef<HTMLTableCellElement | null>(null);
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
  return (
    <td className={styles.cell} onClick={handleClick} ref={cellRef}>
      {value}
    </td>
  );
};

export const MemoizedCell = React.memo(Cell);
