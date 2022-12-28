import React from "react";
import { getColumnLabel, getRowLabel, range } from "../../utils/utils";
import { Cell } from "../Cell";
import { ColumnIndicator } from "../ColumnIndicator";
import { RowIndicator } from "../RowIndicator";
import { ITableProps } from "./table.types";
import styles from "./table.module.scss";
import { useAppContext } from "../../contexts/app-context/app-context";
import { Parser } from "../../utils/parser";
import { mapValues } from "lodash";
import { MemoizedCell } from "../Cell/cell";

export const Table = ({ size }: ITableProps) => {
  const columns = range(size.columns);
  const rows = range(size.rows);
  const {
    state: { data },
    dispatch,
  } = useAppContext();

  const parser = new Parser(mapValues(data, (key) => key.value));
  const getCellValue = (row: number, col: number) => {
    const cellLabel = `${getColumnLabel(col)}${getRowLabel(row)}`;
    const cellData = data[cellLabel];
    if (cellData) {
      return cellData.formula
        ? parser.evaluate(cellData.formula).toString()
        : cellData.value;
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <Cell dispatch={dispatch} row={-1} col={-1} />
          {columns.map((colNumber) => (
            <ColumnIndicator key={colNumber} col={colNumber} selected={false} />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((rowNumber) => (
          <tr key={rowNumber}>
            <RowIndicator row={rowNumber} selected={false} />
            {columns.map((colNumber) => (
              <MemoizedCell
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
  );
};
