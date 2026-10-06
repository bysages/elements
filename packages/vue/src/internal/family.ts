import type { Component } from "vue";

/** Attaches anatomy parts to a callable family facade without letting
 * a parts namespace overwrite the facade's own component metadata. */
export function defineFamily<
  Facade extends Component,
  Parts extends { Root: Component } & Record<string, Component>,
>(facade: Facade, parts: Parts): Facade & Parts {
  const familyParts = Object.fromEntries(
    Object.entries(parts).filter(([name]) => /^[A-Z]/.test(name)),
  );

  return Object.assign(facade, familyParts) as Facade & Parts;
}

/** Gives a single-component family the same callable + Root surface. */
export function withSelfRoot<Component_ extends Component>(
  component: Component_,
): Component_ & { Root: Component_ } {
  return Object.assign(component, { Root: component });
}
