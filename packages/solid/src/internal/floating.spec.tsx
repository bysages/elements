// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { FloatingPortal, type FloatingPortalProps } from "./floating";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

function mount(props: FloatingPortalProps, container = document.createElement("div")) {
  document.body.append(container);
  dispose = render(() => <FloatingPortal {...props} />, container);
  return container;
}

describe("floating portal", () => {
  it("renders inline when portal is false", () => {
    const container = mount({ portal: false, children: <p>Inline</p> });
    expect(container.querySelector("p")?.textContent).toBe("Inline");
  });

  it("moves hydrated children to body by default", () => {
    mount({ portal: true, children: <p data-testid="vessel">Body</p> });
    expect(document.querySelector('[data-testid="vessel"]')?.textContent).toBe("Body");
  });

  it("moves hydrated children to a selector target", () => {
    const target = document.createElement("section");
    target.id = "floating-target";
    document.body.append(target);
    mount({ portal: "#floating-target", children: <p data-testid="vessel">Target</p> });
    expect(target.querySelector('[data-testid="vessel"]')?.textContent).toBe("Target");
  });

  it("removes portal children on dispose", () => {
    mount({ portal: true, children: <p data-testid="vessel">Owned</p> });
    expect(document.querySelector('[data-testid="vessel"]')).not.toBeNull();
    dispose?.();
    dispose = undefined;
    expect(document.querySelector('[data-testid="vessel"]')).toBeNull();
  });
});
