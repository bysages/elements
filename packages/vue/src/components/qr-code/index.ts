import { QrCode as ArkQrCode } from "@ark-ui/vue/qr-code";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** QrCode, dressed in the paper-and-ink system: the pattern prints in
 * ink on the page, with an optional paper badge and a seal-cut download
 * control. The parts — Root, Frame, Pattern, Overlay,
 * DownloadTrigger. */
const QrCodeRoot = defineComponent({
  name: "SQrCodeRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("qr-code", attrs);

    return () => h(ArkQrCode.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The complete printable code behind one payload. */
const QrCodeFacade = defineComponent({
  name: "SQrCode",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
  },
  emits: {
    "update:modelValue": (_value: string) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("qr-code");
    return () =>
      h(
        QrCodeRoot,
        {
          ...attrs,
          defaultValue: props.defaultValue,
          modelValue: props.modelValue,
          "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
        },
        () => h(ArkQrCode.Frame, () => h(ArkQrCode.Pattern)),
      );
  },
});

export const QrCode = defineFamily(QrCodeFacade, {
  ...ArkQrCode,
  Root: QrCodeRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof QrCodeFacade &
  Omit<typeof ArkQrCode, "Root"> & { Root: typeof QrCodeRoot };
