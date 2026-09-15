/** Language switches ride the same page record — only the locale
 * segment changes — and the out-in transition deadlocks there: the
 * entering page's async setup suspends while the transition waits on a
 * root it cannot animate. Page-to-page navigation keeps its dissolve;
 * a locale swap skips it — and only that one, the flag is restored
 * once the navigation lands so later swaps on the same record still
 * animate. The locale is the path's first segment, not a param —
 * @nuxtjs/i18n folds it into per-locale route records. */
export default defineNuxtRouteMiddleware((to, from) => {
  const segment = (path: string) => `/${path.split("/")[1] ?? ""}`;
  if (segment(to.path) === segment(from.path)) return;

  const restore = to.meta.pageTransition;
  const restoreFrom = from.meta.pageTransition;
  to.meta.pageTransition = false;
  from.meta.pageTransition = false;

  const off = useRouter().afterEach(() => {
    to.meta.pageTransition = restore;
    from.meta.pageTransition = restoreFrom;
    off();
  });
});
