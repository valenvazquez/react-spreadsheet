import { Dispatch, ReactNode } from "react";

export interface IActiveCell {
  row: number;
  col: number;
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
}

export interface ICellData {
  value: string;
  formula: string;
}

export interface IAppContextState {
  data: Record<string, ICellData>;
  activeCell: IActiveCell | null;
  isTypingFormula: boolean;
}

export interface ICreateContextProps<T> {
  state: T;
  dispatch: Dispatch<any>;
}

export interface IAppContextProviderProps {
  children: ReactNode;
}
