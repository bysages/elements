import { injectComponentStyle } from "@bysages/core";

import LayoutRoot from "./Layout.svelte";
import LayoutContent from "./LayoutContent.svelte";
import LayoutFooter from "./LayoutFooter.svelte";
import LayoutHeader from "./LayoutHeader.svelte";
import LayoutSider from "./LayoutSider.svelte";

/** The application skeleton: Root, Header, Sider, Content, Footer —
 * the admin arrangement dressed in the paper-and-ink surfaces. */
export const Layout = Object.assign(LayoutRoot, {
  Root: LayoutRoot,
  Header: LayoutHeader,
  Sider: LayoutSider,
  Content: LayoutContent,
  Footer: LayoutFooter,
});

export type { LayoutContext } from "./context";
export type { LayoutProps, LayoutRegionProps, LayoutSiderProps } from "./props";

injectComponentStyle("layout");
