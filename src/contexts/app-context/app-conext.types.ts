import { Dispatch, ReactNode } from "react";

export interface IActiveCell {
  row: number;
  col: number;
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
}

export type TData = Record<string, string>;

export interface IAppContextState {
  data: TData;
  activeCell: IActiveCell | null;
}

export interface ICreateContextProps<T> {
  state: T;
  dispatch: Dispatch<any>;
}

export interface IAppContextProviderProps {
  children: ReactNode;
}
