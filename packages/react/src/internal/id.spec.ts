import { Fragment, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { useElementId } from "./id";

function Probe(props: { id?: string }) {
  return createElement("div", { "data-id": useElementId("probe", props) });
}

describe("useElementId", () => {
  it("generates distinct SSR-stable ids for sibling instances", () => {
    const html = renderToStaticMarkup(
      createElement(Fragment, null, createElement(Probe), createElement(Probe)),
    );
    const ids = [...html.matchAll(/data-id="([^"]+)"/g)].map((match) => match[1]);

    expect(ids).toHaveLength(2);
    expect(ids[0]).not.toBe(ids[1]);
    expect(ids.every((id) => /^bs-probe-[a-zA-Z0-9_-]+$/.test(id))).toBe(true);
  });

  it("lets an explicit id win", () => {
    const html = renderToStaticMarkup(createElement(Probe, { id: "consumer-id" }));

    expect(html).toContain('data-id="consumer-id"');
  });
});
