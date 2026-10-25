import { createSignal } from "solid-js";

import { AiTool } from ".";

const meta = { title: "Components/AI/AI Tool" };
export default meta;

/** A tool call in each state: reaching, running, answered, refused.
 * The dot pairs color with the word — never color alone. */
export const Basic = {
  render: () => (
    <div
      style={{ display: "grid", gap: "0.75rem", "inline-size": "100%", "max-inline-size": "46rem" }}
    >
      <AiTool name="search_web" status="running" input={'{"query": "paper stock"}'} />
      <AiTool
        name="search_web"
        status="completed"
        defaultOpen={true}
        input={'{"query": "paper stock"}'}
        output={'{"hits": 12}'}
      />
      <AiTool name="send_fax" status="error" input={'{"to": "+86 …"}'} output="Error: line busy" />
      <AiTool name="read_file" output={'{"path": "/etc/colophon"}'} />
    </div>
  ),
};

/** Structured values have a readable default format; custom markup can
 * still replace either side with the `input` or `output` slot. */
export const Structured = {
  render: () => (
    <div
      style={{ display: "grid", gap: "0.75rem", "inline-size": "100%", "max-inline-size": "46rem" }}
    >
      <AiTool
        name="search_web"
        status="completed"
        defaultOpen={true}
        inputValue={{ query: "paper stock", limit: 5 }}
        outputValue={{ hits: 12, sources: ["catalog", "archive"] }}
      />
    </div>
  ),
};

/** A required gate reports its decision through `approve` and `deny`. */
export const Approval = {
  render: () => {
    const [approval, setApproval] = createSignal<"required" | "approved" | "denied">("required");

    return (
      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          "inline-size": "100%",
          "max-inline-size": "46rem",
        }}
      >
        <AiTool
          name="write_file"
          status={
            approval() === "approved" ? "completed" : approval() === "denied" ? "denied" : "pending"
          }
          approval={approval()}
          defaultOpen={true}
          inputValue={{ path: "/notes/colophon.md" }}
          onApprove={() => setApproval("approved")}
          onDeny={() => setApproval("denied")}
        />
      </div>
    );
  },
};
