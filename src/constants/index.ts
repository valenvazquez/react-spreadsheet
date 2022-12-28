import { TOperator } from "../types/global-types";
import { add, substract } from "../utils/operators";

export const CELL_REGEX = "\\b[A-Z]+[0-9]+\\b";
export const SUPPORTED_OPERATORS = ["+", "-"] as const;
export const SUPPORTED_OPERATORS_REGEX = `[${SUPPORTED_OPERATORS.reduce(
  (result, operator) => result + `\\${operator}`,
  ""
)}]`;

type TOperators<T> = {
  [K in TOperator]: T;
};

export const OPERATORS: TOperators<Function> = {
  "+": add,
  "-": substract,
};

export const ASSOCIATIVITY: TOperators<"left" | "right"> = {
  "+": "left",
  "-": "left",
};

export const PRECEDENCE: TOperators<number> = {
  "+": 2,
  "-": 2,
};

type TError = {
  title: string;
  description?: string;
};
export const ERRORS: Record<string, TError> = {
  ERROR: {
    title: "#ERROR!",
  },
  NAME: {
    title: "#NAME?",
  },
};
