import { defineComponent, h } from "vue";

/** Storybook mounts a story's vnode outside any reactive effect, so a bare
 * `reactive()` never re-renders the tree. `withState` hosts the closure in
 * a component's setup — state is created once, and the returned render
 * function re-runs inside Vue's reactive effect. */
export function withState(setup: () => () => any) {
  return h(defineComponent({ name: "WithState", setup }));
}
