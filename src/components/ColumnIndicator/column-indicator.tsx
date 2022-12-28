import React, { useMemo } from "react";
import { IColumnIndicatorProps } from "./column-indicator.types";
import styles from "./column-indicator.module.scss";
import classNames from "classnames";
import { getColumnLabel } from "../../utils/utils";

export const ColumnIndicator = ({ col, selected }: IColumnIndicatorProps) => {
  const classes = classNames(styles.header, selected && styles.selected);
  const columnLabel = useMemo(() => getColumnLabel(col), [col]);
  return <th className={classes}>{columnLabel}</th>;
};
