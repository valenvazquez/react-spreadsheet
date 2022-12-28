export const getRowLabel = (rowIndex: number) => {
  return rowIndex >= 0 ? `${rowIndex + 1}` : "";
};

export const getRowIndex = (label: string) => {
  const result = parseInt(label, 10);
  return isNaN(result) ? -1 : result;
};

const COLUMN_LABEL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXZ";
const COLUMN_LABEL_LETTERS_LENGTH = COLUMN_LABEL_LETTERS.length;

export const getColumnLabel = (columnIndex: number): string => {
  if (columnIndex < 0) {
    return "";
  }
  if (columnIndex < COLUMN_LABEL_LETTERS_LENGTH) {
    return COLUMN_LABEL_LETTERS[columnIndex];
  }
  const index = Math.floor(columnIndex / COLUMN_LABEL_LETTERS_LENGTH) - 1;
  const remainder = columnIndex % COLUMN_LABEL_LETTERS_LENGTH;
  const nextIndex = COLUMN_LABEL_LETTERS_LENGTH - columnIndex - 1;
  return (
    COLUMN_LABEL_LETTERS[index] +
    COLUMN_LABEL_LETTERS[remainder] +
    getColumnLabel(nextIndex)
  );
};

export const getColumnIndex = (label: string) => {
  let result = 0;
  const colLabel = label.toUpperCase();

  for (
    let i = 0, j = colLabel.length - 1;
    i < colLabel.length;
    i += 1, j -= 1
  ) {
    result +=
      Math.pow(COLUMN_LABEL_LETTERS_LENGTH, j) *
      (COLUMN_LABEL_LETTERS.indexOf(label[i]) + 1);
  }
  --result;
  return result;
};

export const isValidCellLabel = (label: string) => {
  const validLabelRegex = new RegExp("\b[A-Za-z]+[0-9]+\b");
  return validLabelRegex.test(label);
};

/**
 * Create an array with all numbers between start and end, with a step of 1.
 *
 * range(3) >> [0, 1, 2]
 *
 * range(8,2) >> [2, 3, 4, 5, 6, 7]
 *
 * @param end Required. An integer number specifying at which position to stop (not included).
 * @param start Optional. An integer number specifying at which position to start. Default is 0
 * @returns Returns and array with numbers between start and end, with a step of 1
 */
export const range = (end: number, start: number = 0) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

export const peek = (arr: any[]): any => arr.slice(-1)[0];
