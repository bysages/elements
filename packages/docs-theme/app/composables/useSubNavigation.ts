import { useAppConfig, useRoute, useRouter } from "nuxt/app";
import { computed, inject, type Ref } from "vue";

import { useDocsI18n } from "./useDocsI18n";

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
  /** An optional sidebar group label (from the page's `navigation.section`
   * frontmatter). Present only on shelves that declare it — guide pages
   * and unmarked shelves never carry one, and stay ungrouped. */
  section?: string;
}

/** Fold the flat shelf into sidebar groups by each page's `section`
 * label, in first-appearance order. Pages without a label pass through
 * untouched — the grouping only appears where the content declares it,
 * so a theme consumer needs no configuration to keep its plain shelf. */
export function groupSections(items: NavItem[]): NavItem[] {
  if (!items.some((item) => item.section)) return items;
  const grouped: NavItem[] = [];
  const seen = new Map<string, NavItem>();
  for (const item of items) {
    if (!item.section) {
      grouped.push(item);
      continue;
    }
    let group = seen.get(item.section);
    if (!group) {
      group = { title: item.section, children: [] };
      seen.set(item.section, group);
      grouped.push(group);
    }
    group.children!.push(item);
  }
  return grouped;
}

/** The page a folder opens on: descend until a real path shows up. */
export function getFirstPagePath(item: NavItem): string {
  let current = item;
  while (current.children?.length) current = current.children[0]!;
  return current.path!;
}

/** Where the second navigation level lives, mirroring Docus: `header`
 * lifts the sections into a header row and narrows the sidebar to the
 * active section; `aside` (or unset) keeps the whole tree in the sidebar. */
export function useSubNavigation(provided?: Ref<NavItem[] | null | undefined>) {
  const route = useRoute();
  const appConfig = useAppConfig();
  const { isEnabled, localeOf, t, localePath } = useDocsI18n();
  const navigation = provided ?? inject<Ref<NavItem[]>>("navigation");

  // The site owns its pages; the theme only mirrors what the router
  // registered, so a gallery entry appears without any configuration
  // and never lies about a page the site doesn't have.
  const registeredSegments = computed(
    () =>
      new Set(
        useRouter()
          .getRoutes()
          .flatMap((item) => item.path.split("/"))
          .filter(Boolean),
      ),
  );

  // Gallery pages opt into the chrome with `gallery: true` in their page
  // meta — full-width, no sidebar, but the sections row stays so the
  // reader can walk back into the docs. `examples: true` is the older
  // spelling and keeps working for sites built before the gallery row.
  const isDocsPage = computed(
    () =>
      route.meta.layout === "docs" || route.meta.gallery === true || route.meta.examples === true,
  );

  const subNavigationMode = computed(() => {
    if (!isDocsPage.value) return undefined;
    return (appConfig.navigation as { sub?: "header" | "aside" | undefined } | undefined)?.sub;
  });

  // The shelf below the locale segment. During a locale switch the
  // navigation tree still speaks the old tongue while the route already
  // speaks the new one — matching on the shelf keeps the sidebar on its
  // section through the refresh instead of flashing the whole tree.
  const shelfOf = (path: string): string => {
    const segment = path.split("/")[1] ?? "";
    const shelf = `/${path.split("/").slice(2).join("/")}`;
    return isEnabled.value && segment && segment === localeOf(path) ? shelf : path;
  };

  const onShelf = (routePath: string, itemPath: string): boolean => {
    const routeShelf = shelfOf(routePath);
    const itemShelf = shelfOf(itemPath);
    return routeShelf === itemShelf || routeShelf.startsWith(`${itemShelf}/`);
  };

  const currentSection = computed(() => {
    if (!subNavigationMode.value || !navigation?.value) return undefined;
    return navigation.value.find((item) => item.path && onShelf(route.path, item.path));
  });

  const sections = computed(() => {
    if (!subNavigationMode.value || !navigation?.value) return [];
    const shelf = navigation.value
      .filter((item) => item.children?.length)
      .map((item) => ({
        label: item.title,
        to: getFirstPagePath(item),
        active: !!item.path && onShelf(route.path, item.path),
      }));
    // Galleries are real page trees, not content shelves, so they can't
    // ride the content tree. An entry joins only when its route exists.
    const galleries = (
      [
        { key: "examples", segment: "examples" },
        { key: "design", segment: "design" },
        { key: "studio", segment: "studio" },
      ] as const
    )
      .filter(({ segment }) => registeredSegments.value.has(segment))
      .map(({ key, segment }) => {
        const to = localePath(`/${segment}`);
        return { label: t(`docs.${key}`), to, active: onShelf(route.path, to) };
      });
    return [...shelf, ...galleries];
  });

  const sidebarNavigation = computed(() => {
    // In header mode the lane carries the active section only — the whole
    // tree must never flash in during a locale-switch refresh, so a miss
    // renders empty rather than falling back to the full tree.
    if (subNavigationMode.value) return groupSections(currentSection.value?.children ?? []);
    return groupSections(navigation?.value ?? []);
  });

  return { subNavigationMode, sections, currentSection, sidebarNavigation };
}
