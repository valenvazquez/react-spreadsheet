import { Dispatch, ReactNode } from "react";

export interface IActiveCell {
  row: number;
  col: number;
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
}

export interface IAppContextState {
  activeCell: IActiveCell | null;
}

export interface ICreateContextProps<T> {
  state: T;
  dispatch: Dispatch<any>;
}

export interface IAppContextProviderProps {
  children: ReactNode;
}
