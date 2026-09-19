import type { WorkflowGraph } from "./types";

/** The wire format's contract version. Bump it whenever the graph shape
 * breaks what older readers expect, and teach deserialize to migrate. */
export const WORKFLOW_GRAPH_VERSION = 1;

/** The versioned envelope a graph travels in. */
export interface SerializedWorkflowGraph {
  version: typeof WORKFLOW_GRAPH_VERSION;
  graph: WorkflowGraph;
}

export const serializeWorkflowGraph = (graph: WorkflowGraph): SerializedWorkflowGraph => ({
  version: WORKFLOW_GRAPH_VERSION,
  graph,
});

/** Reads a serialized graph back. An unrecognized version means the
 * payload was written by an incompatible writer — refuse it loudly
 * rather than render a half-understood graph. */
export const deserializeWorkflowGraph = (serialized: {
  version: number;
  graph: WorkflowGraph;
}): WorkflowGraph => {
  if (serialized.version !== WORKFLOW_GRAPH_VERSION) {
    throw new Error(
      `Unsupported workflow graph version ${serialized.version} (expected ${WORKFLOW_GRAPH_VERSION})`,
    );
  }
  return serialized.graph;
};
