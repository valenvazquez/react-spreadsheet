import { CELL_REGEX } from "../constants";

export const FORMULA_VALUE_PREFIX = "=";
export const isFormula = (expression: string | undefined) => {
  return expression !== undefined
    ? expression.startsWith(FORMULA_VALUE_PREFIX)
    : false;
};

export const extractFormula = (expression: string) => {
  return expression.slice(1).replaceAll(" ", "");
};

export const extractFormulaReferences = (formula: string) => {
  const references = formula.match(new RegExp(CELL_REGEX, "gi")) ?? [];
  return references.map((ref) => ref.toUpperCase());
};

export const isValidCellLabel = (label: string) => {
  const validLabelRegex = new RegExp(CELL_REGEX, "i");
  return validLabelRegex.test(label);
};
