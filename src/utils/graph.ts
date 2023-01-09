export class Graph {
  adjMatrix: Record<string, string[]>;

  constructor() {
    this.adjMatrix = {};
  }
  addVertex(name: string) {
    this.adjMatrix[name] = [];
  }

  addEdges(vertex: string, ...edges: string[]) {
    edges.forEach((edge) => this.adjMatrix[vertex].push(edge));
  }

  private detectCycleUtil(
    vertex: string,
    visited: Record<string, boolean>,
    recStack: Record<string, boolean>
  ) {
    if (!visited[vertex]) {
      visited[vertex] = true;
      recStack[vertex] = true;
      const nodeNeighbors = this.adjMatrix[vertex];
      for (const node of nodeNeighbors) {
        if (!visited[node] && this.detectCycleUtil(node, visited, recStack)) {
          return true;
        } else if (recStack[node]) {
          return true;
        }
      }
    }
    recStack[vertex] = false;
    return false;
  }

  detectCycle() {
    const graphNodes = Object.keys(this.adjMatrix);
    const visited = {};
    const recStack = {};

    for (const node of graphNodes) {
      if (this.detectCycleUtil(node, visited, recStack)) {
        return true;
      }
    }
    return false;
  }
}
