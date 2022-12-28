export const add = (...numbers: number[]) => {
  const [first, ...rest] = numbers;
  return rest.reduce((prev, current) => prev + current, first);
};

export const substract = (value1: number, value2: number) => {
  return value1 - value2;
};
