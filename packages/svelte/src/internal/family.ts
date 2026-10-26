import type { Component } from "svelte";

/** Keeps a parts namespace as named properties only, so the mounted
 * facade remains the family's one callable component. */
export type FamilyParts<Parts> = { [Key in keyof Parts]: Parts[Key] };

/** Attaches anatomy parts to a callable family facade without letting
 * a parts namespace overwrite the facade's own component metadata. */
export function defineFamily<Facade extends Component<any, any, any>, Parts extends object>(
  facade: Facade,
  parts: Parts,
): Facade & FamilyParts<Parts> {
  return Object.assign(facade, parts);
}

/** Gives a single-component family the same component + Root surface. */
export function withSelfRoot<Component_ extends Component<any, any, any>>(
  component: Component_,
): Component_ & { Root: Component_ } {
  return Object.assign(component, { Root: component });
}
