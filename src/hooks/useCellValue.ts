import { useEffect, useState } from "react";
import {
  extractFormula,
  extractFormulaReferences,
  isFormula,
  Parser,
  getCellLabel,
} from "../utils";

export const useCellValue = (row: number, col: number) => {
  const formulaParser = Parser.getInstance();
  const [value, setValue] = useState<string>();

  const cellLabel = getCellLabel(row, col);
  const expression = formulaParser.getVariable(cellLabel);

  const updateValue = () => {
    try {
      const expression = formulaParser.getVariable(cellLabel);
      if (isFormula(expression)) {
        const parsedValue = formulaParser
          .evaluate(extractFormula(expression))
          .toString();
        setValue(parsedValue);
      } else {
        setValue(expression);
      }
    } catch (error: any) {
      setValue(error.title);
    }
  };

  useEffect(() => {
    const unsuscribe = formulaParser.on(`${cellLabel}:changed`, updateValue);
    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const cellReferences = isFormula(expression)
      ? extractFormulaReferences(expression)
      : [];
    if (cellReferences.includes(cellLabel)) {
      return;
    }
    const unsuscribers = cellReferences.map((ref) =>
      formulaParser.on(`${ref}:changed`, () => {
        formulaParser.fire(`${cellLabel}:changed`);
      })
    );

    return () => {
      unsuscribers.forEach((unsuscribe) => unsuscribe());
    };
  }, [value]);

  return value;
};
