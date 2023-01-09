import {
  ASSOCIATIVITY,
  ERRORS,
  OPERATORS,
  PRECEDENCE,
  SUPPORTED_OPERATORS,
} from "../constants";
import { TOperator } from "../types/global-types";
import { extractFormula, extractFormulaReferences, isFormula } from "./formula";
import { Graph } from "./graph";
import { PubSub, TCallback } from "./pubsub";
import { ETokens, Tokenizer } from "./tokenizer";
import { peek } from "./utils";

const precedence = (operator: TOperator) => PRECEDENCE[operator];
const associativity = (operator: TOperator) => ASSOCIATIVITY[operator];

export class Parser {
  private result: string | null;
  private tokenizer: Tokenizer;
  private EventObserver: PubSub;
  private static instance: Parser;
  private variables: Record<string, string>;

  private constructor() {
    this.result = null;
    this.variables = {};
    this.tokenizer = new Tokenizer();
    this.EventObserver = new PubSub();
    Parser.instance = this;
  }

  private evaluateByOperator(
    operator: TOperator,
    param1: number,
    param2: number
  ) {
    const func = OPERATORS[operator];
    return func(param1, param2);
  }

  static getInstance() {
    if (!Parser.instance) {
      Parser.instance = new Parser();
    }
    return Parser.instance;
  }

  getVariable(name: string) {
    return this.variables[name] || "";
  }

  setVariable(name: string, value: string) {
    this.variables[name] = value;
  }

  private getVariableDependencies(name: string) {
    const expression = this.getVariable(name);
    return isFormula(expression) ? extractFormulaReferences(expression) : [];
  }

  private createGraph(name: string, graph: Graph = new Graph()) {
    const edges = this.getVariableDependencies(name);
    if (!graph.adjMatrix[name]) {
      graph.addVertex(name);
      graph.addEdges(name, ...edges);
    }
    edges.forEach((edge) => {
      if (!graph.adjMatrix[edge]) {
        this.createGraph(edge, graph);
      }
    });
    return graph;
  }

  private checkCircularDependencies(name: string) {
    if (this.createGraph(name).detectCycle()) {
      throw ERRORS.REF;
    }
  }

  parse(expression: string) {
    const tokens = this.tokenizer.tokenize(expression);
    this.tokenizer.reset();
    const output: string[] = [];
    const stack: string[] = [];
    tokens.forEach((token) => {
      if (token.type === ETokens.Literal) {
        output.push(token.value);
        return;
      }
      if (token.type === ETokens.Variable) {
        this.checkCircularDependencies(token.value);
        let value = this.getVariable(token.value);
        if (isFormula(value)) {
          const formula = extractFormula(value);
          value = this.evaluate(formula).toString();
        }
        output.push(value);
        return;
      }
      if (token.type === ETokens.Operator) {
        // precedence check should be added here if we add support for more operators
        let topStack = peek(stack) as TOperator | undefined;
        const value = token.value as TOperator;
        while (
          topStack &&
          ((associativity(value) === "left" &&
            precedence(value) <= precedence(topStack)) ||
            associativity(value) === "right")
        ) {
          output.push(topStack);
          stack.pop();
          topStack = peek(stack);
        }
        stack.push(value);
      }
    });
    return output.concat(stack.reverse()).join(" ");
  }

  evaluate(expression: string) {
    const stack: number[] = [];
    const rpn = this.parse(expression.toUpperCase());
    rpn.split(" ").forEach((elem) => {
      const numericValue = Number(elem);
      if (!isNaN(numericValue) && isFinite(numericValue)) {
        stack.push(numericValue);
      } else if (
        (SUPPORTED_OPERATORS as ReadonlyArray<string>).includes(elem)
      ) {
        const a = stack.pop() || 0;
        const b = stack.pop() || 0;
        stack.push(this.evaluateByOperator(elem as TOperator, b, a));
      } else {
        throw ERRORS.VALUE;
      }
    });
    if (stack.length > 1) {
      throw ERRORS.ERROR;
    } else {
      return stack[0];
    }
  }

  on(event: string, callback: TCallback) {
    return this.EventObserver.on(event, callback);
  }

  fire(event: string) {
    this.EventObserver.fire(event);
  }
}
