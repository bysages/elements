import type {
  MenuContentProps as ArkMenuContentProps,
  MenuRootProps as ArkMenuRootProps,
} from "@ark-ui/svelte/menu";

export type MenuRootProps = ArkMenuRootProps & {
  /** One rung of the control-height ladder for the vessel's rows. */
  size?: "sm" | "md" | "lg";
};

export type MenuContentProps = ArkMenuContentProps;
