import { useEffect, useMemo, useState } from "react";
import { extractFormulaReferences, isFormula } from "../utils/formula";
import { Parser } from "../utils/parser";

export const useCellValue = (name: string, expression?: string) => {
  const formulaParser = Parser.getInstance();
  const [value, setValue] = useState<string>();

  const cellReferences = useMemo(
    () => (isFormula(expression) ? extractFormulaReferences(expression) : []),
    [expression]
  );

  useEffect(() => {
    const unsuscribers = cellReferences.map((ref) =>
      formulaParser.on(`${ref}:changed`, () => {
        setValue(formulaParser.evaluate(expression as string).toString());
        formulaParser.fire(`${name}:changed`);
      })
    );
    setValue(
      isFormula(expression)
        ? formulaParser.evaluate(expression).toString()
        : expression
    );

    return () => unsuscribers.forEach((unsuscribe) => unsuscribe());
  }, [expression]);

  return value;
};
