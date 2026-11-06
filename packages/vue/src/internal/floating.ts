import {
  defineComponent,
  h,
  Teleport,
  type Component,
  type DefineComponent,
  type PropType,
  type SetupContext,
  type SlotsType,
} from "vue";

export type FloatingPortalTarget = boolean | string;

/** Shared portal vocabulary for floating wrappers: `portal` mounts the
 * wrapped part at body, while a string names any stable portal target. */
export interface FloatingPortalProps {
  portal?: FloatingPortalTarget;
}

/** The raw portal decision for custom vessels whose positioner is not an
 * Ark part. It preserves inline SSR output and moves only on the client. */
export const FloatingPortal = defineComponent({
  name: "SFloatingPortal",
  inheritAttrs: false,
  props: {
    portal: { type: [Boolean, String] as PropType<FloatingPortalTarget>, default: undefined },
  },
  setup(props, ctx: SetupContext<{ default?: () => any }, SlotsType<{ default?: () => any }>>) {
    return () => {
      const content = () => ctx.slots.default?.();
      if (props.portal === undefined || props.portal === false) return content();

      // Keep the same vnode shape on both ends: SSR stays inline through
      // `disabled`, while the mounted app moves the vessel to its target.
      return h(
        Teleport,
        {
          to: props.portal === true ? "body" : props.portal,
          disabled: typeof document === "undefined",
        },
        content,
      );
    };
  },
}) as Component;

/** Wrap an Ark positioner without changing its anatomy contract. The
 * wrapper only adds the portal decision; every positioning prop and
 * attribute still belongs to the wrapped part. */
export function definePositioner(name: string, Positioner: Component) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      portal: { type: [Boolean, String] as PropType<FloatingPortalTarget>, default: undefined },
    },
    setup(props, ctx: SetupContext<{ default?: () => any }, SlotsType<{ default?: () => any }>>) {
      return () => {
        const positioner = () => h(Positioner, ctx.attrs, ctx.slots.default);

        return props.portal
          ? h(FloatingPortal, { portal: props.portal }, positioner)
          : positioner();
      };
    },
  }) as DefineComponent<FloatingPortalProps>;
}
