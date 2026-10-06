import { describe, expect, it } from "vitest";

import { Accordion } from "../components/accordion";
import { Dialog } from "../components/dialog";
import { Drawer } from "../components/drawer";
import { FloatingPanel } from "../components/floating-panel";
import { Highlight } from "../components/highlight";
import { HoverCard } from "../components/hover-card";
import { Menu } from "../components/menu";
import { NavigationMenu } from "../components/navigation-menu";
import { Popover } from "../components/popover";
import { Select } from "../components/select";
import { Toaster } from "../components/toast";
import { Toggle } from "../components/toggle";
import { Tooltip } from "../components/tooltip";
import { Tour } from "../components/tour";

const compositeFamilies = {
  Accordion,
  Dialog,
  Drawer,
  FloatingPanel,
  HoverCard,
  Menu,
  NavigationMenu,
  Popover,
  Select,
  Toggle,
  Tooltip,
  Tour,
};

describe("dual-form component exports", () => {
  it("keeps a facade distinct from Root for composite families", () => {
    for (const [name, family] of Object.entries(compositeFamilies)) {
      expect(family, name).toBeTypeOf("function");
      expect(family.Root, name).toBeTypeOf("function");
      expect(family.Root, name).not.toBe(family);
    }
  });

  it("makes a single-component family its own Root", () => {
    expect(Highlight).toBeTypeOf("function");
    expect(Highlight.Root).toBe(Highlight);
    expect(Toaster.Root).toBe(Toaster);
  });
});
