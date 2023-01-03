import React, { useCallback, useMemo } from "react";
import { getCellLabel, range } from "../../utils/utils";
import { ColumnIndicator } from "../ColumnIndicator";
import { RowIndicator } from "../RowIndicator";
import { ITableProps } from "./table.types";
import styles from "./table.module.scss";
import { useAppContext } from "../../contexts/app-context/app-context";
import { Cell } from "../Cell";
import { ActiveCell } from "../ActiveCell";

export const Table = ({ size }: ITableProps) => {
  const columns = range(size.columns);
  const rows = range(size.rows);
  const {
    state: { data, activeCell },
    dispatch,
  } = useAppContext();

  const getCellValue = useCallback(
    (row: number, col: number) => data[getCellLabel(row, col)],
    [data]
  );
  const { row: activeRow, col: activeCol } = activeCell || {};

  return (
    <>
      {activeCell && (
        <ActiveCell
          maxCol={size.columns}
          maxRow={size.rows}
          key={`${activeCell.col}${activeCell.row}`}
        />
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles["first-cell"]} />
            {columns.map((colNumber) => (
              <ColumnIndicator
                key={colNumber}
                col={colNumber}
                selected={colNumber === activeCol}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rowNumber) => (
            <tr key={rowNumber}>
              <RowIndicator
                row={rowNumber}
                selected={rowNumber === activeRow}
              />
              {columns.map((colNumber) => (
                <Cell
                  key={`${colNumber}${rowNumber}`}
                  col={colNumber}
                  row={rowNumber}
                  value={getCellValue(rowNumber, colNumber)}
                  dispatch={dispatch}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
