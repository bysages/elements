import { ref } from "vue";

/** One assistant per app: the floating input and the panel meet here.
 * The float hands its text over through `open`, the panel sends it. */
const isOpen = ref(false);
const draft = ref("");

export function useAssistant() {
  function open(text?: string) {
    if (text) draft.value = text;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, draft, open, close };
}
