import { FileUpload as ArkFileUpload } from "@ark-ui/vue/file-upload";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** FileUpload, dressed in the paper-and-ink system: a dashed
 * dropzone that floods with subtle light on drag-over, and accepted files
 * as loose hairline slips. The parts — Root, Label, Trigger,
 * Dropzone, HiddenInput, ItemGroup, Item, ItemName, ItemSizeText,
 * ItemPreview, ItemPreviewImage, ItemDeleteTrigger, ClearTrigger,
 * Context. */
const FileUploadRoot = defineComponent({
  name: "SFileUploadRoot",
  props: {
    /** One rung of the control-height ladder for the trigger. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("file-upload");

    return () => h(ArkFileUpload.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/** The inner trigger repeats the click binding the dropzone already
 * owns, and no flavor of taming a nested button survives the audit —
 * assistive tech can still land on it. So the visual cue is a plain
 * span wearing the trigger props; the dropzone stays the one real
 * control, keyboard included. */
const FileUploadTrigger = defineComponent({
  name: "SFileUploadTrigger",
  inheritAttrs: false,
  setup(_, { slots }) {
    return () =>
      h(ArkFileUpload.Trigger, { asChild: true }, () =>
        h(
          "span",
          { "data-scope": "file-upload", "data-part": "trigger", "aria-hidden": "true" },
          slots.default?.(),
        ),
      );
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const FileUpload: Omit<typeof ArkFileUpload, "Root" | "Trigger"> & {
  Root: typeof FileUploadRoot;
  Trigger: typeof FileUploadTrigger;
} = {
  ...ArkFileUpload,
  Root: FileUploadRoot,
  Trigger: FileUploadTrigger,
};
