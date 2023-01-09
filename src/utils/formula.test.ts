import { extractFormula, extractFormulaReferences, isFormula } from "./formula";

describe("isFormula", () => {
  test("should return false if expression does not start with =", () => {
    const expression = "A1+2";
    expect(isFormula(expression)).toBe(false);
  });
  test("should return false if expression is undefined", () => {
    const expression = "A1+2";
    expect(isFormula(expression)).toBe(false);
  });
  test("should return true if expression starts with =", () => {
    const expression = "=A1+2";
    expect(isFormula(expression)).toBe(true);
  });
  test("should return false if expression starts with blank spaces before =", () => {
    const expression = "  = A1 + 2";
    expect(isFormula(expression)).toBe(false);
  });
});

describe("extractFormula", () => {
  test("should return A1+2 if expression is '= A1  +  2'", () => {
    const expression = "= A1  +  2";
    expect(extractFormula(expression)).toBe("A1+2");
  });
  test("should return empty string if expression is an empty string", () => {
    const expression = "";
    expect(extractFormula(expression)).toBe("");
  });
});

describe("extractFormulaReferences", () => {
  test("should return empty array if formula don't references any cell", () => {
    const expression = "2 - B + 20 + A - 2";
    expect(extractFormulaReferences(expression)).toEqual([]);
  });
  test("should return [A1, B12] when expression is =A1+34+B12-2", () => {
    const expression = "=A1+34+B12-2";
    expect(extractFormulaReferences(expression)).toEqual(["A1", "B12"]);
  });
});
