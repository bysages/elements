export * from "./theme";
export * from "./palette";

/** The grammar passes through: marks, transforms, scales, and defineChart
 * resolve against this package so consumers never import the engine
 * directly. Tree-shaking keeps unused marks out of the bundle. */
export * from "@tanstack/charts";
