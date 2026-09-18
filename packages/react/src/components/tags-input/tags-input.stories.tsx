import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { TagsInput } from ".";

const meta: Meta = { title: "Components/Forms/Tags Input" };
export default meta;

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** The tag strip shared by every story: one chip per value, each with its
 * delete whisker and a double-click-edit input. */
function tagList() {
  return (
    <TagsInput.Context>
      {(tagsInput: { value: string[] }) =>
        tagsInput.value.map((value: string, index: number) => (
          <TagsInput.Item key={index} index={index} value={value}>
            <TagsInput.ItemPreview>
              <TagsInput.ItemText>{value}</TagsInput.ItemText>
              <TagsInput.ItemDeleteTrigger>
                <XIcon />
              </TagsInput.ItemDeleteTrigger>
            </TagsInput.ItemPreview>
            <TagsInput.ItemInput />
          </TagsInput.Item>
        ))
      }
    </TagsInput.Context>
  );
}

function field(rootProps: Record<string, any>, label = "Pigments", placeholder = "Add pigment") {
  return (
    <TagsInput.Root {...rootProps}>
      <TagsInput.Label>{label}</TagsInput.Label>
      <TagsInput.Control>
        {tagList()}
        <TagsInput.Input placeholder={placeholder} />
        <TagsInput.ClearTrigger>
          <XIcon />
        </TagsInput.ClearTrigger>
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  );
}

/** Type and press enter; chips carry a delete whisker each. */
export const Basic = {
  args: {
    label: "Pigments",
    placeholder: "Add pigment",
  },
  render: (args: any) =>
    field({ defaultValue: ["Qinghua", "Celadon"] }, args.label, args.placeholder),
};

/** The same pigment may be stamped twice. */
export const AllowDuplicates = {
  render: () => field({ allowDuplicates: true }),
};

/** Blur commits the typed text instead of clearing it. */
export const BlurBehavior = {
  render: () => field({ blurBehavior: "add" }),
};

/** A comma turns one typing run into two chips. */
export const Delimiter = {
  render: () => field({ delimiter: "," }),
};

/** Pasted text splits on the delimiter into chips in one stroke. */
export const PasteBehavior = {
  render: () => field({ addOnPaste: true, delimiter: "," }),
};

/** Chips stay deletable but double-click no longer opens the edit input. */
export const DisabledEditing = {
  render: () => field({ allowEditTag: false, defaultValue: ["Qinghua", "Celadon"] }),
};

/** The whole field rests: chips, delete triggers, and typing all off. */
export const Disabled = {
  render: () => field({ defaultValue: ["Qinghua", "Celadon", "Zhusha"], disabled: true }),
};

/** Read-only shows the chips but allows no change at all. */
export const ReadOnly = {
  render: () => field({ defaultValue: ["Qinghua", "Celadon", "Zhusha"], readOnly: true }),
};

/** The invalid state turns the hairline cinnabar. */
export const Invalid = {
  render: () => field({ invalid: true }),
};

/** Ten characters is all a single chip may hold. */
export const MaxTagLength = {
  render: () => field({ maxLength: 10 }),
};

/** Three chips is the ceiling; allow-overflow marks the excess instead of
 * blocking it. */
export const MaxWithOverflow = {
  render: () => field({ max: 3, allowOverflow: true }),
};

/** Typed text is folded to lowercase and trimmed before it becomes a chip. */
export const SanitizeValue = {
  render: () =>
    field({
      sanitizeValue: (value: string) => value.trim().toLowerCase(),
    }),
};

/** Duplicate entries are refused; the refused chip reads invalid. */
export const Validation = {
  render: () =>
    field({
      validate: (details: { value: string[]; inputValue: string }) =>
        !details.value.includes(details.inputValue),
    }),
};

/** The typed text itself is controlled, echoing every keystroke. */
export const ControlledInputValue = {
  render: () => {
    const [inputValue, setInputValue] = useState("");
    return (
      <TagsInput.Root
        inputValue={inputValue}
        onInputValueChange={(e: { inputValue: string }) => {
          setInputValue(e.inputValue);
        }}
      >
        <TagsInput.Label>Pigments</TagsInput.Label>
        <TagsInput.Control>
          {tagList()}
          <TagsInput.Input placeholder="Add pigment" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    );
  },
};

/** The chip list answers to state; deleting and adding round-trip. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState<string[]>(["Qinghua", "Celadon"]);
    return (
      <TagsInput.Root
        value={value}
        onValueChange={(e: { value: string[] }) => {
          setValue(e.value);
        }}
      >
        <TagsInput.Label>Pigments</TagsInput.Label>
        <TagsInput.Control>
          {tagList()}
          <TagsInput.Input placeholder="Add pigment" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    );
  },
};
