/** The search dialog's open state. The header carries two entries — the
 * center field and the rail's square trigger, which exists only while
 * the field is folded — and either must open the same dialog. */
export function useDocsSearch() {
  return useState("docs-search-open", () => false);
}
