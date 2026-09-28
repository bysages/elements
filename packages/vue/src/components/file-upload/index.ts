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

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const FileUpload: Omit<typeof ArkFileUpload, "Root"> & { Root: typeof FileUploadRoot } = {
  ...ArkFileUpload,
  Root: FileUploadRoot,
};
