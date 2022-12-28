import { SUPPORTED_OPERATORS } from "../constants";

export enum EErrors {
  ERROR = "#ERROR!",
  NAME = "#NAME?",
}

export type TOperator = typeof SUPPORTED_OPERATORS[number];
