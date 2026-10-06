import { withSelfRoot } from "../../internal/family";
import ConfigProviderComponent from "./ConfigProvider.svelte";

/** The declarative host for global configuration: one element carrying
 * the token layer's attributes and providing the same values to
 * descendants through `useConfig`. */
export const ConfigProvider = withSelfRoot(ConfigProviderComponent);

export type { ConfigContext, ConfigDensity } from "./context";
export { useConfig } from "./context";
export type { ConfigProviderProps } from "./props";
