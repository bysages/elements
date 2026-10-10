import { SignaturePad as ArkSignaturePad } from "@ark-ui/vue/signature-pad";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** SignaturePad, dressed in the paper-and-ink system: a quiet paper
 * field with a guide hairline where ink — real ink strokes — is laid down.
 * The parts — Root, Label, Control, Segment, SegmentPath, Guide,
 * ClearTrigger, HiddenInput, Context. */
const SignaturePadRoot = defineComponent({
  name: "SSignaturePadRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("signature-pad", attrs);

    return () => h(ArkSignaturePad.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The one-tag path: the paper, guide, clear control, and hidden form
 * value; stroke previews and drawing events stay on the anatomy. */
const SignaturePadFacade = defineComponent({
  name: "SSignaturePad",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: undefined },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    /** Show the reset control. */
    clearable: { type: Boolean, default: true },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        SignaturePadRoot,
        {
          ...attrs,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          defaultPaths: props.defaultValue,
          ...(props.modelValue === undefined
            ? {}
            : {
                paths: props.modelValue,
                onDraw: (details: { paths: string[] }) => emit("update:modelValue", details.paths),
              }),
        } as never,
        () => [
          ...(props.label ? [h(ArkSignaturePad.Label, () => props.label)] : []),
          h(ArkSignaturePad.Control, () => [
            h(ArkSignaturePad.Segment),
            ...(props.clearable
              ? [h(ArkSignaturePad.ClearTrigger, () => iconNode("undo", { width: 14, height: 14 }))]
              : []),
            h(ArkSignaturePad.Guide),
          ]),
          h(ArkSignaturePad.HiddenInput),
        ],
      );
  },
});

export const SignaturePad = defineFamily(SignaturePadFacade, {
  ...ArkSignaturePad,
  Root: SignaturePadRoot,
}) as unknown as typeof SignaturePadFacade &
  (Omit<typeof ArkSignaturePad, "Root"> & { Root: typeof SignaturePadRoot });

injectComponentStyle("signature-pad");
