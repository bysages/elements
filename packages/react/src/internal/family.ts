/** Gives a single-component family the same callable + Root surface. */
export function withSelfRoot<C>(component: C): C & { Root: C } {
  const family = component as C & { Root: C };
  family.Root = component;
  return family;
}
