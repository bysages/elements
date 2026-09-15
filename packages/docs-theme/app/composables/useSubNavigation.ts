import { useAppConfig, useRoute } from "nuxt/app";
import { computed, inject, type Ref } from "vue";

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
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
  const navigation = provided ?? inject<Ref<NavItem[]>>("navigation");

  const isDocsPage = computed(() => route.meta.layout === "docs");

  const subNavigationMode = computed(() => {
    if (!isDocsPage.value) return undefined;
    return (appConfig.navigation as { sub?: "header" | "aside" } | undefined)?.sub;
  });

  const currentSection = computed(() => {
    if (!subNavigationMode.value || !navigation?.value) return undefined;
    return navigation.value.find(
      (item) => route.path === item.path || route.path.startsWith(`${item.path}/`),
    );
  });

  const sections = computed(() => {
    if (!subNavigationMode.value || !navigation?.value) return [];
    return navigation.value
      .filter((item) => item.children?.length)
      .map((item) => ({
        label: item.title,
        to: getFirstPagePath(item),
        active: route.path === item.path || route.path.startsWith(`${item.path}/`),
      }));
  });

  const sidebarNavigation = computed(() => {
    if (subNavigationMode.value && currentSection.value) return currentSection.value.children ?? [];
    return navigation?.value ?? [];
  });

  return { subNavigationMode, sections, currentSection, sidebarNavigation };
}
