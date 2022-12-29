import { createContext, useContext, useState } from "react";
import {
  ICreateContextProps,
  IFormulaContextProviderProps,
} from "./formula-context.types";

export const FormulaContext = createContext<ICreateContextProps | undefined>(
  undefined
);

export const FormulaContextProvider = ({
  children,
}: IFormulaContextProviderProps) => {
  const [isFormulaActive, setIsFormulaActive] = useState(false);
  const [formulaValue, setFormulaValue] = useState("");
  return (
    <FormulaContext.Provider
      value={{
        isFormulaActive,
        setIsFormulaActive,
        formulaValue,
        setFormulaValue,
      }}
    >
      {children}
    </FormulaContext.Provider>
  );
};

export const useFormulaContext = () => {
  const context = useContext(FormulaContext);
  if (context === undefined) {
    throw new Error("useFormulaContext must be used within FormulaProvider");
  }

  return context;
};
