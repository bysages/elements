import { iconHtml } from "../../internal/icon";
import type { MentionEntry, MentionTriggers } from "../mentions";

interface TokenModel {
  pattern: string;
  entry: MentionEntry;
  trigger: string;
}

const triggerList = (triggers?: MentionTriggers): string[] => {
  const all = triggers == null ? ["@"] : Array.isArray(triggers) ? triggers : [triggers];
  return all.filter((trigger) => trigger.length > 0);
};

const tokensFor = (value: string, entries: MentionEntry[], triggers: string[]): TokenModel[] => {
  const tokens: TokenModel[] = [];
  const add = (pattern: string, entry: MentionEntry, trigger: string) => {
    if (!pattern || !value.includes(pattern)) return;
    tokens.push({ pattern, entry, trigger });
  };

  entries.forEach((entry) => {
    triggers.forEach((trigger) => {
      add(trigger + entry.label, entry, trigger);
      const inserted = entry.insertText?.trim();
      if (inserted?.startsWith(trigger)) add(inserted, entry, trigger);
    });
  });

  return tokens.sort((left, right) => {
    const start = value.indexOf(left.pattern) - value.indexOf(right.pattern);
    return start || right.pattern.length - left.pattern.length;
  });
};

const readToken = (node: HTMLElement): TokenModel => ({
  pattern: `${node.dataset.promptTrigger ?? "@"}${node.dataset.promptLabel ?? ""}`,
  trigger: node.dataset.promptTrigger ?? "@",
  entry: {
    id: node.dataset.promptId,
    label: node.dataset.promptLabel ?? "",
    value: node.dataset.promptValue ?? "",
    icon: node.dataset.promptIcon,
    kind: node.dataset.promptKind,
  },
});

const readNode = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (!(node instanceof HTMLElement)) return "";
  if (node.tagName === "BR") return "\n";
  if (node.dataset.promptToken === "") return readToken(node).pattern;

  const block = node.tagName === "DIV" || node.tagName === "P";
  const children = Array.from(node.childNodes).map(readNode).join("");
  return block && children ? `${children}\n` : children;
};

export const serializeEditor = (root: HTMLElement): string =>
  Array.from(root.childNodes).map(readNode).join("").replace(/\n$/, "");

export const readCaret = (root: HTMLElement): number => {
  const selection = window.getSelection();
  if (document.activeElement !== root || !selection || selection.rangeCount === 0) {
    return serializeEditor(root).length;
  }

  const selected = selection.getRangeAt(selection.rangeCount - 1);
  const range = document.createRange();
  range.selectNodeContents(root);
  range.setEnd(selected.endContainer, selected.endOffset);
  return range.toString().length;
};

const caretPosition = (root: HTMLElement, offset: number) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let remaining = offset;
  let node = walker.nextNode();
  let last: Text | null = null;

  while (node) {
    const text = node as Text;
    if (remaining <= text.data.length) return { container: text, offset: remaining };
    remaining -= text.data.length;
    last = text;
    node = walker.nextNode();
  }

  return last
    ? { container: last, offset: last.data.length }
    : { container: root, offset: root.childNodes.length };
};

const tokenNode = (model: TokenModel): HTMLElement => {
  const node = document.createElement("span");
  node.contentEditable = "false";
  node.dataset.promptToken = "";
  node.setAttribute("data-scope", "ai");
  node.setAttribute("data-part", "prompt-mention");
  node.dataset.promptTrigger = model.trigger;
  node.dataset.promptLabel = model.entry.label;
  node.dataset.promptValue = model.entry.value;
  if (model.entry.kind != null) node.dataset.promptKind = model.entry.kind;
  if (model.entry.id) node.dataset.promptId = model.entry.id;
  if (model.entry.icon) node.dataset.promptIcon = model.entry.icon;
  node.title = `${model.trigger}${model.entry.label}`;

  // The browser selection includes this invisible trigger, so its text
  // offset agrees with the serialized plain-text value.
  const trigger = document.createElement("span");
  trigger.textContent = model.trigger;
  trigger.setAttribute("data-scope", "ai");
  trigger.setAttribute("data-part", "mention-trigger");
  node.append(trigger);

  if (model.entry.icon) {
    const icon = document.createElement("span");
    icon.setAttribute("data-scope", "ai");
    icon.setAttribute("data-part", "mention-icon");
    icon.innerHTML = iconHtml(model.entry.icon, {
      "data-scope": "icon",
      "data-part": "root",
      "data-size": "inherit",
    });
    node.append(icon);
  }

  const label = document.createElement("span");
  label.textContent = model.entry.label;
  label.setAttribute("data-scope", "ai");
  label.setAttribute("data-part", "mention-label");
  node.append(label);
  return node;
};

export const renderEditor = (
  root: HTMLElement,
  value: string,
  entries: MentionEntry[],
  triggers?: MentionTriggers,
): void => {
  const fragment = document.createDocumentFragment();
  let cursor = 0;

  tokensFor(value, entries, triggerList(triggers)).forEach((model) => {
    const start = value.indexOf(model.pattern, cursor);
    if (start === -1) return;
    if (start > cursor) fragment.append(value.slice(cursor, start));
    fragment.append(tokenNode(model));
    cursor = start + model.pattern.length;
  });

  if (cursor < value.length) fragment.append(value.slice(cursor));
  root.replaceChildren(fragment);
  root.toggleAttribute("data-empty", root.childNodes.length === 0);
};

/** Insert a mention as a rich token. The hidden trigger text keeps the
 * browser selection and the serialized plain text in step. */
export const insertEditorToken = (
  root: HTMLElement,
  entry: MentionEntry,
  trigger: string,
  start: number,
  end: number,
): string => {
  const hasTailSpace = /^\s/.test(serializeEditor(root).slice(end));
  const range = document.createRange();
  const from = caretPosition(root, start);
  const to = caretPosition(root, end);
  range.setStart(from.container, from.offset);
  range.setEnd(to.container, to.offset);
  range.deleteContents();

  const node = tokenNode({ pattern: trigger + entry.label, entry, trigger });
  range.insertNode(node);

  let tail: Text | null = null;
  if (!hasTailSpace) {
    tail = document.createTextNode(" ");
    node.after(tail);
  }

  root.focus();
  const selection = window.getSelection();
  // A mention is atomic, so selecting inside it makes browsers paint the
  // caret against the token edge. Park it in the following editable text.
  const followingText = (() => {
    let current: Node | null = node.nextSibling;
    while (current) {
      if (current.nodeType === Node.TEXT_NODE) return current as Text;
      const walker = document.createTreeWalker(current, NodeFilter.SHOW_TEXT);
      const text = walker.nextNode() as Text | null;
      if (text) return text;
      current = current.nextSibling;
    }
    return null;
  })();

  const target = tail ?? followingText;
  if (selection && target) {
    const caret = document.createRange();
    if (tail) caret.selectNodeContents(tail);
    else caret.setStart(target, 0);
    caret.collapse(true);
    selection.removeAllRanges();
    selection.addRange(caret);
  }

  return serializeEditor(root);
};

export const setEditorCaret = (root: HTMLElement, offset: number): void => {
  const position = caretPosition(root, offset);
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.setStart(position.container, position.offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const insertLineBreak = (root: HTMLElement): string => {
  document.execCommand("insertLineBreak");
  return serializeEditor(root);
};
