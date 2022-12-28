import React from "react";
import { IRowIndicatorProps } from "./row-indicator.types";
import styles from "./row-indicator.module.scss";
import classNames from "classnames";
import { getRowLabel } from "../../utils/utils";

export const RowIndicator = ({ row, selected }: IRowIndicatorProps) => {
  const classes = classNames(styles.header, selected && styles.selected);
  return <th className={classes}>{getRowLabel(row)}</th>;
};
