// The whole collection as named exports — a consumer that knows which
// glyph it wants imports that one name. Runtime lookup lives in the
// consumers that need it (@bysages/core/icons curates the wrappers'
// whitelist there); this package is only the set itself.
export * from "./data.generated";
export type { IconifyIcon } from "@iconify/types";
