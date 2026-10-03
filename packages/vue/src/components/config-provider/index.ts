import type { ComponentMessagesOverride, ThemeScene } from "@bysages/core";
import type { SetupContext } from "vue";
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  type ComputedRef,
  type InjectionKey,
  type PropType,
} from "vue";

/** The four density tiers the token layer's `[data-density]` selectors
 * name — whitespace and control heights compress, readability never
 * does. */
export type ConfigDensity = "compact" | "default" | "comfortable" | "spacious";

/** The named scene registers the token layer's `[data-scene]` selectors
 * retune — "auto" is the engine's own resolution and stays off the
 * subtree vocabulary. */
export type ConfigScene = Exclude<ThemeScene, "auto">;

/** The configuration a provider lays over its subtree. Every field is
 * optional: an absent field changes nothing, and the page's own
 * attributes keep ruling. */
export interface ConfigContext {
  density?: ConfigDensity;
  scene?: ConfigScene;
  /** A mineral pigment theme (qinghua, celadon, zhusha, …) landing as
   * `[data-accent]` on the host element. */
  accent?: string;
  /** Writing direction, landing as the native `dir` attribute. */
  dir?: "ltr" | "rtl";
  /** BCP-47 locale, landing as the native `lang` attribute. */
  locale?: string;
  /** Partial replacement copy for wrapper-owned controls; unresolved
   * leaves keep the locale default. */
  messages?: ComponentMessagesOverride;
}

/** Where descendants read the provider's snapshot from — the hook the
 * date and format families will consume to localize their output. */
export const configInjectionKey: InjectionKey<ComputedRef<ConfigContext>> = Symbol("bs-config");

/** The nearest provider's reactive snapshot, or an empty one when no
 * provider wraps the caller. */
export function useConfig(): ComputedRef<ConfigContext> {
  return inject(
    configInjectionKey,
    computed(() => ({})),
  );
}

export interface ConfigProviderProps {
  density?: ConfigDensity;
  scene?: ConfigScene;
  accent?: string;
  dir?: "ltr" | "rtl";
  locale?: string;
  messages?: ComponentMessagesOverride;
}

/**
 * The declarative host for global configuration: one element that both
 * carries the token layer's attributes — `[data-density]` and
 * `[data-accent]` fire on any element — and provides the same values to
 * descendants through `useConfig`, so interactive behavior (formatting,
 * messages) and visual theming stay one decision.
 */
export const ConfigProvider = defineComponent({
  name: "ConfigProvider",
  props: {
    density: { type: String as PropType<ConfigDensity>, default: undefined },
    scene: { type: String as PropType<ConfigScene>, default: undefined },
    accent: { type: String, default: undefined },
    dir: { type: String as PropType<"ltr" | "rtl">, default: undefined },
    locale: { type: String, default: undefined },
    messages: {
      type: Object as PropType<ComponentMessagesOverride>,
      default: undefined,
    },
  },
  setup(props, ctx: SetupContext) {
    provide(
      configInjectionKey,
      computed<ConfigContext>(() => ({
        density: props.density,
        scene: props.scene,
        accent: props.accent,
        dir: props.dir,
        locale: props.locale,
        messages: props.messages,
      })),
    );

    return () => {
      const { density, scene, accent, dir, locale } = props;
      return h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "config-provider",
          "data-part": "root",
          // Absent fields must not land on the element at all — the
          // token selectors fire on presence, and an empty attribute
          // would read as a value.
          ...(density != null ? { "data-density": density } : {}),
          ...(scene != null ? { "data-scene": scene } : {}),
          ...(accent != null ? { "data-accent": accent } : {}),
          ...(dir != null ? { dir } : {}),
          ...(locale != null ? { lang: locale } : {}),
        },
        () => ctx.slots.default?.(),
      );
    };
  },
});
