/** The engine-independent facts of a workflow graph. The canvas adapter
 * reads them; the execution backend writes states back through the
 * store. Nothing here knows about SVG, DOM, or any rendering engine.
 *
 * These shapes deliberately don't reuse X6's (NodeMetadata, TerminalData,
 * PointLike, …): importing them would couple the protocol's type surface
 * to the canvas engine, and executors — servers included — would then
 * carry X6's types just to describe a graph. Duplication here is the
 * boundary, not an oversight. */

/** Runtime state of one node — the same `data-state` contract every
 * component reads. The canvas only displays it; the executor writes it. */
export type NodeState = "idle" | "running" | "success" | "error";

export interface Position {
  x: number;
  y: number;
}

/** A logical port. `dir` fixes the geometry (in = top, out = bottom);
 * `type` is reserved for typed-connection labels. */
export interface WorkflowPort {
  id: string;
  dir: "in" | "out";
  type?: string;
}

export type WorkflowNodeData = Record<string, unknown>;

/** One node on the graph. `type` is the renderer's lookup key; `ports`
 * is required — the adapter derives geometry and connection validation
 * from it. `state` defaults to idle. */
export interface WorkflowNode {
  id: string;
  type: string;
  position: Position;
  ports: WorkflowPort[];
  state?: NodeState;
  data: WorkflowNodeData;
}

export interface WorkflowEndpoint {
  node: string;
  port: string;
}

export interface WorkflowEdge {
  id: string;
  source: WorkflowEndpoint;
  target: WorkflowEndpoint;
}

export interface WorkflowGraph {
  nodes: readonly WorkflowNode[];
  edges: readonly WorkflowEdge[];
}
