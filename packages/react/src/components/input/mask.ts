function accepts(slot: string, ch: string) {
  if (slot === "9") return /\d/.test(ch);
  if (slot === "a") return /[a-zA-Z]/.test(ch);
  return /[\da-zA-Z]/.test(ch);
}

/** Apply the entry mask: `9` takes a digit, `a` a letter, `*` either;
 * every other character is literal. A literal already typed is consumed,
 * not duplicated; a literal met out of place holds the walk and lets its
 * own slot claim it — so deleting through the middle reflows the shape
 * instead of corrupting it. */
export function applyMask(raw: string, mask: string) {
  const literals = new Set(mask.split("").filter((s) => s !== "9" && s !== "a" && s !== "*"));
  let out = "";
  let at = 0;
  slots: for (const slot of mask) {
    if (at >= raw.length) break;
    if (slot === "9" || slot === "a" || slot === "*") {
      let ch = raw[at];
      while (ch !== undefined && !accepts(slot, ch)) {
        if (literals.has(ch)) continue slots;
        at += 1;
        ch = raw[at];
      }
      if (ch === undefined) break;
      out += ch;
      at += 1;
    } else if (raw[at] === slot) {
      at += 1;
      out += slot;
    } else {
      out += slot;
    }
  }
  return out;
}
