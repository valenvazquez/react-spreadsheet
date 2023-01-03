import { CELL_REGEX } from "../constants";

export const FORMULA_VALUE_PREFIX = "=";
export const isFormula = (
  expression: string | undefined
): expression is string => {
  return expression !== undefined
    ? expression.startsWith(FORMULA_VALUE_PREFIX)
    : false;
};

export const extractFormula = (expression: string) => {
  return expression.slice(1).replaceAll(" ", "");
};

export const shouldReplaceReference = (formula: string) => {
  return new RegExp(`${CELL_REGEX}$`).test(formula.trimEnd());
};

export const extractFormulaReferences = (formula: string) => {
  return formula.match(new RegExp(CELL_REGEX, "g")) ?? [];
};

export const isValidCellLabel = (label: string) => {
  const validLabelRegex = new RegExp(CELL_REGEX);
  return validLabelRegex.test(label);
};
