import React, { useMemo, useRef } from "react";
import { ICellProps } from "./cell.types";
import styles from "./cell.module.scss";
import { setActiveCell } from "../../contexts/app-context/actions/actions";
import { extractFormula, isFormula } from "../../utils/formula";

export const Cell = React.memo(
  ({ row, col, value, dispatch, formulaParser }: ICellProps) => {
    const cellRef = useRef<HTMLTableCellElement | null>(null);
    const cellValue = useMemo(
      () =>
        isFormula(value)
          ? formulaParser.evaluate(extractFormula(value)).toString()
          : value,
      [value, formulaParser]
    );

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
        {cellValue}
      </td>
    );
  }
);
