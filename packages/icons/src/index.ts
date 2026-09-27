import type { IconifyIcon } from "@iconify/types";

import * as glyphs from "./data.generated.js";

export type { IconifyIcon } from "@iconify/types";

/** The registry holds only the curated list in icons.config.json — a name
 * outside it is a miss, and the wrappers treat a miss as a loud error. */
export function getIcon(name: string): IconifyIcon | undefined {
  // Registry names are kebab-case; generated exports are the same names
  // with underscores, since a module export cannot carry a hyphen.
  return (glyphs as Record<string, IconifyIcon>)[name.replace(/-/g, "_")];
}
