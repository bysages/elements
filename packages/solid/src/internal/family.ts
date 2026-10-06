/** Attaches anatomy parts to a callable family facade. */
export function defineFamily<Facade extends (...args: never[]) => unknown, Parts extends object>(
  facade: Facade,
  parts: Parts,
): Facade & Parts {
  return Object.assign(facade, parts);
}

/** Gives a single-component family the same callable + Root surface. */
export function withSelfRoot<Component_ extends (...args: never[]) => unknown>(
  component: Component_,
): Component_ & { Root: Component_ } {
  return Object.assign(component, { Root: component });
}
