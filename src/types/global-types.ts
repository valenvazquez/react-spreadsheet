import { SUPPORTED_OPERATORS } from "../constants";

export type TOperator = typeof SUPPORTED_OPERATORS[number];

export enum EKeys {
  Enter = "Enter",
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}
