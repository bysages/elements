/** nuxt-og-image carries template params in a single encoded URL
 * segment, hard-capped around 200 characters — a long title plus an
 * unbounded description overflows it and the params silently drop.
 * Budget ~150 characters total: subtract the title, then cut the
 * description at the last sentence boundary that fits. */
export function formatOgDescription(title?: string, description?: string): string | undefined {
  if (!description) return undefined;
  const budget = 150 - Math.min(title?.length ?? 0, 60);
  if (description.length <= budget) return description;
  const cut = description.slice(0, budget);
  const sentence = cut.lastIndexOf(". ");
  return `${(sentence > 0 ? cut.slice(0, sentence) : cut).trimEnd()}…`;
}
