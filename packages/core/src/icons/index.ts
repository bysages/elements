import {
  check,
  chevron_down,
  chevron_left,
  chevron_right,
  chevron_up,
  chevrons_up_down,
  arrow_up,
  arrow_left,
  arrow_right,
  copy,
  image,
  file,
  info,
  circle_check,
  triangle_alert,
  circle_x,
  eye,
  eye_off,
  upload,
  star,
  pencil,
  inbox,
  calendar,
  square,
  zoom_in,
  zoom_out,
  rotate_cw,
  droplet,
  x,
} from "@bysages/icons";
import type { IconifyIcon } from "@bysages/icons";

export type { IconifyIcon };

// The wrappers' registry — the few glyphs the component families draw
// themselves. It is code, not config: the whitelist is this import list,
// and a typo here fails the build. Anything beyond it is imported
// straight from @bysages/icons by whoever names the glyph.
const registry: Record<string, IconifyIcon> = {
  check,
  chevron_down,
  chevron_left,
  chevron_right,
  chevron_up,
  chevrons_up_down,
  arrow_up,
  arrow_left,
  arrow_right,
  copy,
  image,
  file,
  info,
  circle_check,
  triangle_alert,
  circle_x,
  eye,
  eye_off,
  upload,
  star,
  pencil,
  inbox,
  calendar,
  square,
  zoom_in,
  zoom_out,
  rotate_cw,
  droplet,
  x,
};

export function getIcon(name: string): IconifyIcon | undefined {
  // Registry names are kebab-case; generated exports are the same names
  // with underscores, since a module export cannot carry a hyphen.
  return registry[name.replace(/-/g, "_")];
}
