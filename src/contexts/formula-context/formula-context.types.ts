import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ICreateContextProps {
  isFormulaActive: boolean;
  setIsFormulaActive: Dispatch<SetStateAction<boolean>>;
  formulaValue: string;
  setFormulaValue: Dispatch<SetStateAction<string>>;
}

export interface IFormulaContextProviderProps {
  children: ReactNode;
}
