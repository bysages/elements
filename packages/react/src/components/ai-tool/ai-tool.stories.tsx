import type { Meta } from "@storybook/react-vite";

import { AiTool } from ".";

const meta: Meta = { title: "Components/AI/AI Tool" };
export default meta;

/** A tool call in each state: reaching, running, answered, refused.
 * The dot pairs color with the word — never color alone. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", width: "100%", maxWidth: "46rem" }}>
      <AiTool name="search_web" status="running" input='{"query": "paper stock"}' />
      <AiTool
        name="search_web"
        status="completed"
        defaultOpen
        input='{"query": "paper stock"}'
        output='{"hits": 12}'
      />
      <AiTool name="send_fax" status="error" input='{"to": "+86 …"}' output="Error: line busy" />
      <AiTool name="read_file" output='{"path": "/etc/colophon"}' />
    </div>
  ),
};
