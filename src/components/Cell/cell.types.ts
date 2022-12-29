import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { IAppAction } from "../../contexts/app-context/actions/actions.types";
import { TData } from "../../contexts/app-context/app-conext.types";
import { Parser } from "../../utils/parser";

export interface ICellProps {
  row: number;
  col: number;
  value?: string;
  dispatch: Dispatch<IAppAction>;
  formulaParser: Parser;
  // isFormulaActive: boolean;
  // onMouseDown?: MouseEventHandler<HTMLTableCellElement>;
}
