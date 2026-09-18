import { componentStyles, tokensCss, type ApplyThemeOptions } from "@bysages/core";
import { addComponent, addPlugin, addTemplate, createResolver, defineNuxtModule } from "@nuxt/kit";

/** Whether a value exported by @bysages/vue is a component or a family
 * namespace: a component itself, or an object holding components one
 * level deep. Theme constants and plain data fail the check; types
 * never reach the runtime. */
function isComponentExport(value: unknown): boolean {
  if (typeof value === "function") return true;
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  if ("render" in value || "setup" in value) return true;
  return Object.values(value).some(
    (member) =>
      typeof member === "function" ||
      (typeof member === "object" && member !== null && ("render" in member || "setup" in member)),
  );
}

/** Global component names this module must not claim: they belong to the
 * Nuxt ecosystem, and the site templates are written against them. */
const RESERVED = new Set(["Icon"]);

export interface BsElementsOptions {
  /** Prefix for the auto-imported components — "Bs" renders `<BsButton>`.
   * Empty by default. */
  prefix?: string;
  /** Theme applied on the client before the app mounts: mode, accent,
   * scene, density, contrast — anything `applyTheme` accepts. */
  theme?: ApplyThemeOptions;
}

export default defineNuxtModule<BsElementsOptions>({
  meta: {
    name: "@bysages/nuxt",
    configKey: "bsElements",
  },
  defaults: {
    prefix: "",
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // The registry is the library's own export surface, read live: a new
    // family lands in @bysages/vue and every consuming app picks it up
    // without this module changing. Family namespaces (Object.assign
    // products) and plain components both pass the shape check; the
    // PascalCase rule keeps composables and factories out.
    const families = (await import("@bysages/vue")) as unknown as Record<string, unknown>;
    for (const name of Object.keys(families)) {
      if (!/^[A-Z]/.test(name) || !isComponentExport(families[name])) continue;
      // @nuxt/icon owns the global `Icon` name — every docs template
      // writes `<Icon name="i-lucide-*">` against it, and our inkwell
      // shell (a bare box that carries children, no `name` prop) would
      // shadow it into silence. It stays import-only.
      if (RESERVED.has(name)) continue;
      addComponent({
        name: options.prefix + name,
        export: name,
        filePath: "@bysages/vue",
      });
    }

    // The wrappers and the theme plugin are authored in TypeScript and
    // rely on the app's aliases and auto-imports — they must ride the
    // Nuxt build.
    nuxt.options.build.transpile.push("@bysages/nuxt", "@bysages/vue", "@bysages/core");

    nuxt.options.runtimeConfig.public.bsElements = {
      theme: options.theme ?? null,
    };

    // Ship the whole core style layer as one build-time stylesheet: SSR
    // pages carry styled HTML, so the first paint never waits on the
    // wrappers' runtime injection. The head marker tells that injection
    // to stand down — it parses before any module script, so the
    // wrappers cannot race it however their chunks load.
    // Written through addTemplate, not by hand: Nuxt 4 clears its build
    // directory after module setup runs, so a file written here is
    // deleted before the css manifest that references it is generated —
    // a template lands after that clear and travels with the build.
    const styles = addTemplate({
      filename: "bs-styles/core.css",
      getContents: () => tokensCss + Object.values(componentStyles).join("\n"),
      write: true,
    });
    nuxt.options.css.push(styles.dst);
    nuxt.options.app.head.meta ||= [];
    nuxt.options.app.head.meta.push({ name: "bs-styles-shipped", content: "build" });

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
