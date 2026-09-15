import { Format as ArkFormat } from "@ark-ui/vue/format";
import { defineComponent, h, type Component } from "vue";

/** Format, dressed in the paper-and-ink system: Intl formatting for
 * numbers, currency, bytes and relative time. The parts —
 * Number, Byte, Time, RelativeTime. */
export const Format = {
  ...ArkFormat,
  Number: homed(ArkFormat.Number),
  Byte: homed(ArkFormat.Byte),
  Time: homed(ArkFormat.Time),
  RelativeTime: homed(ArkFormat.RelativeTime),
} as typeof ArkFormat;

/** Each format part renders as bare text. Adjacent bare text serializes
 * into one node server-side, so hydration has nothing to anchor on and
 * the page mismatches. Each part is re-homed in a span — an inline
 * element with no style of its own, typography still flows from the
 * token layer. */
function homed<T extends Component>(part: T): T {
  return defineComponent({
    // Re-declare the part's props, then forward everything: declared
    // props ride `props`, the rest of the attributes stay in `attrs` —
    // only class and style belong to the span itself.
    ...(part as { props?: Record<string, unknown> }),
    setup(props, { attrs, slots }) {
      return () => {
        const { class: cls, style: sty, ...rest } = attrs;
        return h("span", { class: cls, style: sty }, () => [
          h(part, { ...props, ...rest } as never, slots),
        ]);
      };
    },
  }) as T;
}
