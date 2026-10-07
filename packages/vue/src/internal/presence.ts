import type { Component } from "vue";

type PresenceProps = Record<string, unknown>;
type ComponentEmits = string[] | Record<string, null>;

const noop = () => {};
const bridgedRoots = new WeakMap<object, Component>();

/** Copies an Ark root with the presence declaration Vue needs; the shared
 * Ark component stays untouched. */
export function withPresenceRoot<Root extends Component>(root: Root): Root {
  const cached = bridgedRoots.get(root);
  if (cached) return cached as Root;

  const options = root as { emits?: ComponentEmits };
  const emits = options.emits ?? [];
  const nextEmits: ComponentEmits = Array.isArray(emits)
    ? emits.includes("enterComplete")
      ? emits
      : [...emits, "enterComplete"]
    : { ...emits, enterComplete: null };
  const bridged = { ...root, emits: nextEmits } as Root;
  bridgedRoots.set(root, bridged);
  return bridged;
}

/** Ark roots invoke `enterComplete`, but their own emits option only names
 * `exitComplete`; keep a listener flowing while giving Vue the declared
 * handler it needs when no one is listening. */
export function withPresenceEnter<Props extends PresenceProps>(props: Props): Props {
  return { ...props, onEnterComplete: props.onEnterComplete ?? noop } as Props;
}
