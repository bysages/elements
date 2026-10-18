import { injectComponentStyle } from "@bysages/core/styling";
import { Show, createSignal, splitProps, type JSX } from "solid-js";

import { iconNode } from "../../internal/icon";
import { useComponentMessages } from "../config-provider/use-component-messages";

export type BannerStatus = "ink" | "info" | "success" | "warning" | "danger";

export interface BannerRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  status?: BannerStatus;
}

/** A page-level notice, spoken across the full measure: a wash of the
 * status pigment, one heavier hairline on the leading edge, and room
 * for actions and a quiet close. Ink is the neutral register; the four
 * semantic pigments are fixed. */
function Root(props: BannerRootProps) {
  const [own, rest] = splitProps(props, ["status"]);
  const status = own.status ?? "ink";
  return (
    <div
      {...rest}
      role={status === "ink" ? undefined : "status"}
      data-scope="banner"
      data-part="root"
      data-status={status}
    />
  );
}

function part(name: string, tag: string) {
  function Component(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const Tag = tag as "div";
    return <Tag {...props} data-scope="banner" data-part={name.toLowerCase()} />;
  }
  return Component;
}

const Icon = part("Icon", "span");
const Body = part("Body", "div");
const Title = part("Title", "p");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

/** The quiet close: a plain square-cut button; dismissal stays the
 * consumer's state. */
function Close(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [own, rest] = splitProps(props, ["type"]);
  const messages = useComponentMessages();
  return (
    <button
      {...rest}
      type={own.type ?? "button"}
      aria-label={rest["aria-label"] ?? messages().banner.dismiss}
      data-scope="banner"
      data-part="close"
    >
      {iconNode("x")}
    </button>
  );
}

export interface BannerFacadeProps extends Omit<BannerRootProps, "status" | "title"> {
  /** The status pigment; ink is the neutral register. */
  status?: BannerStatus;
  /** What the notice says at a glance. */
  title?: string;
  /** The supporting line, in the quiet register. */
  message?: string;
  /** Give the reader a way to fold the notice. */
  dismissible?: boolean;
  /** Where the reader answers — a row of buttons. */
  actions?: JSX.Element;
  children?: JSX.Element;
}

/** The shorthand: a complete notice from text, with actions and the
 * close folded away until asked for. Once closed, it stays closed. */
function BannerFacade(props: BannerFacadeProps) {
  const [own, rest] = splitProps(props, [
    "actions",
    "children",
    "dismissible",
    "message",
    "status",
    "title",
  ]);
  const [visible, setVisible] = createSignal(true);
  return (
    <Show when={visible()}>
      <Root {...rest} status={own.status}>
        <Body>
          <Show when={own.title}>
            <Title>{own.title}</Title>
          </Show>
          <Show when={own.message}>
            <Description>{own.message}</Description>
          </Show>
          <Show when={own.children}>{own.children}</Show>
          <Show when={own.actions}>
            <Actions>{own.actions}</Actions>
          </Show>
        </Body>
        <Show when={own.dismissible}>
          <Close onClick={() => setVisible(false)} />
        </Show>
      </Root>
    </Show>
  );
}

export const Banner = Object.assign(BannerFacade, {
  Root,
  Icon,
  Body,
  Title,
  Description,
  Actions,
  Close,
});

injectComponentStyle("banner");
