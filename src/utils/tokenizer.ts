import { Buffer } from "./buffer";
import { EErrors } from "../types/global-types";
import {
  SUPPORTED_OPERATORS,
  CELL_REGEX,
  SUPPORTED_OPERATORS_REGEX,
} from "../constants";

export enum ETokens {
  Literal = "Literal",
  Variable = "Variable",
  Operator = "Operator",
}

enum CharTypes {
  Digit = "digit",
  Letter = "letter",
  Operator = "operator",
}

export class Token {
  constructor(public type: ETokens, public value: string) {
    this.type = type;
    this.value = value;
  }
}

// helper functions
const isDigit = (ch: string) => /\d|\./.test(ch);
const isLetter = (ch: string) => /[a-z]/i.test(ch);
const isOperator = (ch: string) =>
  new RegExp(SUPPORTED_OPERATORS_REGEX).test(ch);

export class Tokenizer {
  private result: Token[];
  private cellBuffer: Buffer;
  private numberBuffer: Buffer;
  private lastCharType: CharTypes | null;
  constructor() {
    this.result = [];
    this.cellBuffer = new Buffer();
    this.numberBuffer = new Buffer();
    this.lastCharType = null;
  }

  private validateVariableToken(tokenValue: string) {
    const isValidVariable = new RegExp(CELL_REGEX).test(tokenValue);
    if (!isValidVariable) {
      throw EErrors.NAME;
    }
  }

  private addResultFromBuffer(buffer: Buffer, type: ETokens) {
    const value = buffer.join();
    if (type === ETokens.Variable) {
      this.validateVariableToken(value);
    }
    this.result.push(new Token(type, value));
    buffer.empty();
  }

  private addDigit(ch: string) {
    // if it's the first char of expression or after operator
    if (!this.lastCharType || this.lastCharType === CharTypes.Operator) {
      if (ch === ".") {
        this.numberBuffer.add("0");
      }
      this.numberBuffer.add(ch);
    } else if (this.cellBuffer.length > 0) {
      this.cellBuffer.add(ch);
    } else if (this.numberBuffer.length > 0) {
      this.numberBuffer.add(ch);
    }
    this.lastCharType = CharTypes.Digit;
  }

  private addLetter(ch: string) {
    if (this.lastCharType === CharTypes.Digit) {
      throw EErrors.NAME;
    }
    this.cellBuffer.add(ch);
    this.lastCharType = CharTypes.Letter;
  }

  private addOperator(ch: string) {
    if (this.cellBuffer.length > 0) {
      this.addResultFromBuffer(this.cellBuffer, ETokens.Variable);
    }
    if (this.numberBuffer.length > 0) {
      this.addResultFromBuffer(this.numberBuffer, ETokens.Literal);
    }
    this.result.push(new Token(ETokens.Operator, ch));
    this.lastCharType = CharTypes.Operator;
  }

  tokenize(expression: string) {
    expression
      .replaceAll(" ", "")
      .split("")
      .forEach((ch) => {
        if (isDigit(ch)) {
          this.addDigit(ch);
        }
        if (isLetter(ch)) {
          this.addLetter(ch);
        }
        if (isOperator(ch)) {
          this.addOperator(ch);
        }
      });
    if (this.cellBuffer.length > 0) {
      this.addResultFromBuffer(this.cellBuffer, ETokens.Variable);
    }
    if (this.numberBuffer.length > 0) {
      this.addResultFromBuffer(this.numberBuffer, ETokens.Literal);
    }
    return this.result;
  }
}
