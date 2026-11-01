/**
 * Stream scroll physics shared by the AI conversation wrappers. A growing
 * log follows only when the reader is already resting at its bottom edge;
 * a just-made user gesture owns the viewport for a short cooldown, so a
 * token that lands immediately afterwards cannot yank it back.
 *
 * @module
 */

export interface ConversationFollowerOptions {
  /** Bottom-edge distance that still counts as pinned. */
  threshold?: number;
  /** How long a reader gesture blocks programmatic scrolling. */
  cooldown?: number;
}

/** Attach bottom-pinned auto-follow to a scrollable log. Returns cleanup. */
export function createConversationFollower(
  node: HTMLElement,
  { threshold = 96, cooldown = 150 }: ConversationFollowerOptions = {},
): () => void {
  let pinned = true;
  let lastUserGestureAt = 0;

  const markGesture = () => {
    lastUserGestureAt = performance.now();
  };

  const handleScroll = () => {
    pinned = node.scrollHeight - node.scrollTop - node.clientHeight < threshold;
    // Our own follow lands at the bottom, so it never arms the cooldown;
    // any reader scroll that leaves the bottom does.
    if (!pinned) markGesture();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (["ArrowUp", "PageUp", "Home"].includes(event.key)) markGesture();
  };

  const follow = () => {
    if (!pinned || performance.now() - lastUserGestureAt <= cooldown) return;
    node.scrollTop = node.scrollHeight;
  };

  const observer = new MutationObserver(follow);
  observer.observe(node, { childList: true, subtree: true, characterData: true });
  node.addEventListener("scroll", handleScroll, { passive: true });
  node.addEventListener("wheel", markGesture, { passive: true });
  node.addEventListener("touchmove", markGesture, { passive: true });
  node.addEventListener("keydown", handleKeyDown);

  return () => {
    observer.disconnect();
    node.removeEventListener("scroll", handleScroll);
    node.removeEventListener("wheel", markGesture);
    node.removeEventListener("touchmove", markGesture);
    node.removeEventListener("keydown", handleKeyDown);
  };
}
