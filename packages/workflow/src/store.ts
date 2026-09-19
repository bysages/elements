import type {
  NodeState,
  Position,
  WorkflowEdge,
  WorkflowGraph,
  WorkflowNode,
  WorkflowNodeData,
} from "./types";

/** A record of one graph change. It is both the listener payload and the
 * command protocol: replaying changes is how an executor (or a future
 * undo stack) drives the graph from the outside. */
export type WorkflowChange =
  | { kind: "node:add"; node: WorkflowNode }
  | { kind: "node:remove"; id: string }
  | { kind: "node:move"; id: string; position: Position }
  | { kind: "node:state"; id: string; state: NodeState }
  | { kind: "node:data"; id: string; patch: WorkflowNodeData }
  | { kind: "edge:connect"; edge: WorkflowEdge }
  | { kind: "edge:remove"; id: string };

export interface WorkflowStore {
  getGraph(): WorkflowGraph;
  getNode(id: string): Readonly<WorkflowNode> | undefined;
  getEdge(id: string): Readonly<WorkflowEdge> | undefined;
  addNode(node: WorkflowNode): void;
  /** Removes a node and every edge attached to it, each removal its own
   * change event. Unknown ids are a silent no-op — idempotence is what
   * breaks the canvas event loops. */
  removeNode(id: string): void;
  moveNode(id: string, position: Position): void;
  setNodeState(id: string, state: NodeState): void;
  /** Shallow-merges into the node's data. */
  setNodeData(id: string, patch: WorkflowNodeData): void;
  /** Connects two ports and returns the edge; an already existing
   * source→target pair returns that edge untouched. */
  connect(edge: Omit<WorkflowEdge, "id"> & { id?: string }): WorkflowEdge | undefined;
  disconnect(id: string): void;
  subscribe(listener: (change: WorkflowChange) => void): () => void;
}

/** The single writer of the graph. Every operation is idempotent (unknown
 * ids are silent no-ops, redundant writes don't re-emit) so event loops
 * between the canvas and the store die on their own. */
export function createWorkflowStore(graph?: WorkflowGraph): WorkflowStore {
  const nodes = new Map<string, WorkflowNode>(graph?.nodes.map((n) => [n.id, { ...n }]) ?? []);
  const edges = new Map<string, WorkflowEdge>(graph?.edges.map((e) => [e.id, { ...e }]) ?? []);
  const listeners = new Set<(change: WorkflowChange) => void>();
  let edgeSeq = 0;

  const nextEdgeId = () => {
    let id: string;
    do {
      id = `edge-${++edgeSeq}`;
    } while (edges.has(id));
    return id;
  };

  const commit = (change: WorkflowChange) => {
    // A snapshot: listeners may unsubscribe (or trigger further commits)
    // while the change is still being delivered.
    for (const listener of Array.from(listeners)) listener(change);
  };

  const store: WorkflowStore = {
    getGraph: () => ({ nodes: [...nodes.values()], edges: [...edges.values()] }),
    getNode: (id) => nodes.get(id),
    getEdge: (id) => edges.get(id),

    addNode(node) {
      if (nodes.has(node.id)) return;
      nodes.set(node.id, { ...node });
      commit({ kind: "node:add", node: { ...node } });
    },

    removeNode(id) {
      if (!nodes.delete(id)) return;
      // A snapshot: disconnect() mutates the map mid-loop.
      for (const edge of Array.from(edges.values())) {
        if (edge.source.node === id || edge.target.node === id) store.disconnect(edge.id);
      }
      commit({ kind: "node:remove", id });
    },

    moveNode(id, position) {
      const node = nodes.get(id);
      if (!node) return;
      node.position = { ...position };
      commit({ kind: "node:move", id, position: { ...position } });
    },

    setNodeState(id, state) {
      const node = nodes.get(id);
      if (!node || node.state === state) return;
      node.state = state;
      commit({ kind: "node:state", id, state });
    },

    setNodeData(id, patch) {
      const node = nodes.get(id);
      if (!node) return;
      node.data = { ...node.data, ...patch };
      commit({ kind: "node:data", id, patch: { ...patch } });
    },

    connect(edge) {
      const source = { ...edge.source };
      const target = { ...edge.target };
      for (const existing of edges.values()) {
        if (
          existing.source.node === source.node &&
          existing.source.port === source.port &&
          existing.target.node === target.node &&
          existing.target.port === target.port
        ) {
          return existing;
        }
      }
      const record: WorkflowEdge = { id: edge.id ?? nextEdgeId(), source, target };
      edges.set(record.id, record);
      commit({ kind: "edge:connect", edge: { ...record } });
      return record;
    },

    disconnect(id) {
      if (!edges.delete(id)) return;
      commit({ kind: "edge:remove", id });
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };

  return store;
}
