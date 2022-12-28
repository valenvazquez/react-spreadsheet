import { Dispatch } from "react";
import { IAppAction } from "../../contexts/app-context/actions/actions.types";

export interface ICellProps {
  row: number;
  col: number;
  value?: string;
  dispatch: Dispatch<IAppAction>;
}
