import { FileUpload as ArkFileUpload } from "@ark-ui/vue/file-upload";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

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
    const id = useElementId("file-upload", attrs);
    injectComponentStyle("file-upload");

    return () => h(ArkFileUpload.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
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
          {
            "data-scope": "file-upload",
            "data-part": "trigger",
            "aria-hidden": "true",
          },
          slots.default?.(),
        ),
      );
  },
});

function fileIcon() {
  return iconNode("file");
}

function closeIcon() {
  return iconNode("x");
}

/** The one-tag path: a labelled dropzone and its accepted slips; MIME
 * rules, directories, and controlled files stay on the anatomy. */
const FileUploadFacade = defineComponent({
  name: "SFileUpload",
  props: {
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    maxFiles: { type: Number, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        FileUploadRoot,
        {
          ...attrs,
          size: props.size,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          maxFiles: props.maxFiles,
        },
        () => [
          ...(props.label ? [h(ArkFileUpload.Label, () => props.label)] : []),
          h(ArkFileUpload.Dropzone, () =>
            h(FileUploadTrigger, () => props.placeholder ?? "Choose files"),
          ),
          h(ArkFileUpload.ItemGroup, () =>
            h(ArkFileUpload.Context as never, null, {
              default: ({ acceptedFiles }: { acceptedFiles: File[] }) =>
                acceptedFiles.map((file) =>
                  h(ArkFileUpload.Item, { key: file.name, file }, () => [
                    h(ArkFileUpload.ItemPreview, () => fileIcon()),
                    h(ArkFileUpload.ItemName),
                    h(ArkFileUpload.ItemSizeText),
                    h(ArkFileUpload.ItemDeleteTrigger, () => closeIcon()),
                  ]),
                ),
            }),
          ),
          h(ArkFileUpload.HiddenInput),
        ],
      );
  },
});

type FileUploadParts = Omit<typeof ArkFileUpload, "Root" | "Trigger"> & {
  Root: typeof FileUploadRoot;
  Trigger: typeof FileUploadTrigger;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const FileUpload = defineFamily(FileUploadFacade, {
  ...ArkFileUpload,
  Root: FileUploadRoot,
  Trigger: FileUploadTrigger,
}) as unknown as typeof FileUploadFacade & FileUploadParts;
