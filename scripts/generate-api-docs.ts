/** Extracts one page of API per component family, regenerated from source
 * so it can never drift. A pure module — the docs content generator
 * (docs/scripts/generate-component-docs.ts) renders what this extracts.
 *
 * Three facts feed each page, in order of authority:
 *  - the wrapper's own header comment (our dressing of the component)
 *  - the prop declarations (the defineFamily facade, then Ark's dist
 *    types for wrapped families; the local defineComponent for native
 *    primitives)
 *  - the anatomy parts (Zag's machine contract) matched against the parts
 *    our core stylesheet actually covers */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join, dirname } from "node:path";

import {
  Project,
  SyntaxKind,
  type ExpressionWithTypeArguments,
  type InterfaceDeclaration,
  Node,
  type ObjectLiteralElementLike,
  type ObjectLiteralExpression,
  type PropertyAssignment,
  type PropertySignature,
  type SourceFile,
} from "ts-morph";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const WRAPPERS = join(ROOT, "packages/vue/src/components");
const ARK_DIST = join(ROOT, "node_modules/@ark-ui/vue/dist/components");
const CORE_STYLES = join(ROOT, "packages/core/src/styles/components");

const project = new Project({ skipAddingFilesFromTsConfig: true });

const pascal = (s: string) => s.replace(/(^|-)([a-z])/g, (_, h, c) => c.toUpperCase());

function commentText(node: Node): string {
  return node
    .getLeadingCommentRanges()
    .map((r) => r.getText())
    .join("\n")
    .replace(/^\s*\/\*+|\*+\/\s*$/g, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\*?\s?/, ""))
    .join("\n")
    .trim();
}

function declaredDefault(comment: string): string | undefined {
  return comment.match(/@default\s+(.+)/)?.[1]?.trim();
}

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

export interface EmitDoc {
  name: string;
  payload: string;
}

export interface ComponentDoc {
  /** The part's own comment — the "why" above its API tables. */
  description?: string;
  props?: PropDoc[];
  emits?: EmitDoc[];
  slots?: { name: string }[];
}

export interface FamilyDoc {
  family: string;
  source: "ark" | "native";
  description: string;
  anatomy?: { parts: string[]; styled: string[] };
  components: Record<string, ComponentDoc>;
  /** The facade that precedes the anatomy; undefined for anatomy-only families. */
  facade?: string;
}

/** Resolve an extends clause to its interface by following the file's own
 * import table — no type checker involved (dist types trip it). */
function extendedInterface(
  iface: InterfaceDeclaration,
  ext: ExpressionWithTypeArguments,
): InterfaceDeclaration | undefined {
  const name = ext.getExpression().getText();
  const sourceFile = iface.getSourceFile();
  const importDecl = sourceFile
    .getImportDeclarations()
    .find((d) => d.getNamedImports().some((n) => n.getName() === name));
  if (!importDecl) return sourceFile.getInterface(name);
  const spec = importDecl.getModuleSpecifierValue();

  // A bare package name (an item's props may come straight from a Zag
  // machine) resolves through Ark's dependency graph.
  if (!spec.startsWith(".")) {
    try {
      const pkgDir = dirname(arkRequire.resolve(`${spec}/package.json`));
      const stem = spec.split("/").pop()!;
      const file =
        project.addSourceFileAtPathIfExists(join(pkgDir, "dist", `${stem}.types.d.ts`)) ??
        project.addSourceFileAtPathIfExists(join(pkgDir, "dist", "index.d.ts"));
      return file?.getInterface(name);
    } catch {
      return undefined;
    }
  }

  const dir = dirname(sourceFile.getFilePath());
  const base = join(dir, spec).replace(/\\/g, "/");
  // The declarations win: the sibling `.js` exists in dist too, but it
  // holds the runtime, not the interfaces.
  const file =
    project.addSourceFileAtPathIfExists(base.replace(/\.js$/, ".d.ts")) ??
    project.addSourceFileAtPathIfExists(base);
  return file?.getInterface(name);
}

/** Props of an interface including its family-local extends chain. Shared
 * plumbing from Ark's utils is documented once per page, not per part. */
function collectProps(
  iface: InterfaceDeclaration | undefined,
  seen = new Set<string>(),
): PropertySignature[] {
  if (!iface || seen.has(iface.getName())) return [];
  seen.add(iface.getName());
  const parents = iface.getExtends().flatMap((ext) => {
    const base = extendedInterface(iface, ext);
    // The extension file lives outside the family's own types — its props
    // (render strategy, layout props) are plumbing every part shares.
    if (base && !base.getSourceFile().getFilePath().includes("utils")) {
      return collectProps(base, seen);
    }
    return [];
  });
  return [...parents, ...iface.getProperties()];
}

function toDocs(props: PropertySignature[], _scope: SourceFile): PropDoc[] {
  return props
    .map((prop) => {
      const description = commentText(prop);
      const type = prop.getTypeNode()?.getText() ?? "";
      const doc: PropDoc = {
        name: prop.getName().replace(/^["']|["']$/g, ""),
        type: type.replace(/import\("[^"]+"\)\./g, ""),
        required: !prop.hasQuestionToken(),
        description,
      };
      return {
        ...doc,
        ...(declaredDefault(description) ? { default: declaredDefault(description)! } : {}),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Props of a wrapped (Ark) part: the dist `.vue.d.ts` declares a family
 * namespaced interface whose base lives in the family's types file. */
function arkProps(family: string, part: string): PropDoc[] {
  const pascalFamily = pascal(family);
  const vueFile = project.addSourceFileAtPath(join(ARK_DIST, family, `${family}-${part}.vue.d.ts`));
  const names = [`${pascalFamily}${pascal(part)}Props`, `${pascalFamily}${pascal(part)}BaseProps`];
  for (const name of names) {
    const iface = vueFile.getInterface(name);
    if (!iface) continue;
    // Family types and Zag machines carry the real prop documentation;
    // the shared plumbing (factory, utils, vue's own attributes) is not
    // this part's API.
    const props = collectProps(iface).filter((p) => {
      const path = p.getSourceFile().getFilePath();
      return !/[/\\](factory\.|utils[/\\]|@vue[/\\])/.test(path);
    });
    return toDocs(props, vueFile);
  }
  return [];
}

/** Parts a wrapped family dresses in its own defineComponent — the
 * `{ ...Ark, Root: SizedRoot }` spread. The object's key names the part,
 * and the wrapper's props are API the dist types cannot know about. */
function dressedProps(file: SourceFile): Record<string, PropDoc[]> {
  const out: Record<string, PropDoc[]> = {};
  for (const decl of file.getVariableDeclarations()) {
    const literal = decl.getInitializer()?.asKind(SyntaxKind.ObjectLiteralExpression);
    if (!literal) continue;
    for (const prop of literal.getProperties()) {
      if (!prop.isKind(SyntaxKind.PropertyAssignment)) continue;
      const ref = prop.getInitializer()?.asKind(SyntaxKind.Identifier);
      const comp = ref ? file.getVariableDeclaration(ref.getText()) : undefined;
      const call = comp?.getInitializer()?.asKind(SyntaxKind.CallExpression);
      if (call?.getExpression().getText() !== "defineComponent") continue;
      const arg = call.getArguments()[0]?.asKind(SyntaxKind.ObjectLiteralExpression);
      if (!arg) continue;
      const props = nativeProps(arg);
      const part = pascal(prop.getName());
      if (props.length) out[part] = props;
    }
  }
  return out;
}

/** A variable initializer may be asserted to satisfy wrapper types; the
 * component call is still the API source. */
function initializerCall(node: Node | undefined) {
  if (!node) return undefined;
  // The direct call is the declaration's own factory; nested calls belong
  // to the component setup and must never identify the declaration.
  return Node.isCallExpression(node)
    ? node
    : node.getDescendantsOfKind(SyntaxKind.CallExpression)[0];
}

/** The family facade attached through defineFamily: its runtime component
 * carries high-level props that no Ark part declares. */
function familyFacade(file: SourceFile):
  | {
      name: string;
      component: ObjectLiteralExpression;
      componentStatement: Node;
    }
  | undefined {
  for (const decl of file.getVariableDeclarations()) {
    // Exported facades may carry a type assertion around defineFamily.
    const call = initializerCall(decl.getInitializer());
    if (call?.getExpression().getText() !== "defineFamily") continue;
    const ref = call.getArguments()[0]?.asKind(SyntaxKind.Identifier);
    if (!ref) continue;
    const componentDecl = file.getVariableDeclaration(ref.getText());
    if (!componentDecl) continue;
    const componentCall = componentDecl.getInitializer()?.asKind(SyntaxKind.CallExpression);
    if (componentCall?.getExpression().getText() !== "defineComponent") continue;
    const component = componentCall.getArguments()[0]?.asKind(SyntaxKind.ObjectLiteralExpression);
    if (!component) continue;
    const componentStatement = componentDecl.getVariableStatement() ?? componentDecl;
    return { name: decl.getName(), component, componentStatement };
  }
}

/** The family's own face reads first; the dist props fill in the rest,
 * minus any the wrapper re-declares (its default may differ). */
function mergeProps(own: PropDoc[], ark: PropDoc[]): PropDoc[] {
  const seen = new Set(own.map((p) => p.name));
  return [...own, ...ark.filter((p) => !seen.has(p.name))];
}

/** Emits of a wrapped part: the dist `.vue.d.ts` spells them out either
 * as a literal object of handler signatures (older emit blocks) or as a
 * chain of `(evt: "name", details) => void` overloads on the render
 * function — both appear across the dist, so both are parsed. */
function arkEmits(family: string, part: string): EmitDoc[] {
  const file = project.addSourceFileAtPathIfExists(
    join(ARK_DIST, family, `${family}-${part}.vue.d.ts`),
  );
  if (!file) return [];
  const text = file.getFullText();
  const body = text.match(/ComponentOptionsMixin,\s*\{([\s\S]*?)\},\s*string,\s*PublicProps/)?.[1];
  const scope = body ?? text;
  const emits = new Map<string, EmitDoc>();
  const item = /["']?([\w:]+)["']?:\s*\(([^)]*)\)\s*=>/g;
  let m: RegExpExecArray | null;
  while ((m = item.exec(scope))) {
    // The instance's own $emit/expose plumbing matches the same shape.
    if (m[1] === "expose" || m[1] === "emit") continue;
    emits.set(m[1], { name: m[1], payload: m[2].trim() });
  }
  const overload = /\(evt:\s*["']([\w:]+)["']\s*,?\s*([^)]*)\)\s*=>/g;
  while ((m = overload.exec(scope))) {
    if (m[1] === "expose" || m[1] === "emit") continue;
    emits.set(m[1], { name: m[1], payload: m[2].trim() });
  }
  return [...emits.values()];
}

/** Emits of a native primitive: the `emits` declaration in its
 * defineComponent, with each payload spelled as written. */
function nativeEmits(component: ObjectLiteralExpression): EmitDoc[] {
  const emitsEntry = component
    .getProperties()
    .find(
      (p): p is PropertyAssignment =>
        p.isKind(SyntaxKind.PropertyAssignment) && p.getName() === "emits",
    );
  const literal = emitsEntry?.getInitializerIfKind?.(SyntaxKind.ObjectLiteralExpression);
  if (literal) {
    return literal.getProperties().flatMap((entry: ObjectLiteralElementLike) => {
      if (!entry.isKind(SyntaxKind.PropertyAssignment)) return [];
      const payload = entry.getInitializer()?.getText().replace(/\s+/g, " ") ?? "";
      return [{ name: entry.getName().replace(/^["']|["']$/g, ""), payload }];
    });
  }

  // Vue accepts the concise array form for emits without inline handlers;
  // derive v-model payloads from the matching facade prop.
  const names = emitsEntry?.getInitializerIfKind?.(SyntaxKind.ArrayLiteralExpression);
  if (!names) return [];
  return names.getElements().flatMap((element) => {
    if (!element.isKind(SyntaxKind.StringLiteral)) return [];
    const name = element.getLiteralText();
    const modelField = name.match(/^update:(.+)$/)?.[1];
    if (!modelField) return [{ name, payload: "—" }];
    const prop = nativeProps(component).find((candidate) => candidate.name === modelField);
    const valueType = prop?.type.match(/PropType<([\s\S]+)>/)?.[1] ?? prop?.type ?? "unknown";
    return [{ name, payload: `value: ${valueType}` }];
  });
}

/** Named slots a native part reads: every `ctx.slots.X` call inside the
 * component's own source span. The default slot goes unreported — the
 * examples show it. */
function nativeSlots(component: ObjectLiteralExpression): { name: string }[] {
  const sourceFile = component.getSourceFile();
  const start = component.getStart();
  const end = component.getEnd();
  const found = new Set<string>();
  for (const call of sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)) {
    const text = call.getText();
    const match = text.match(/ctx\.slots\.(\w+)/);
    if (match && match[1] !== "default" && call.getStart() >= start && call.getEnd() <= end) {
      found.add(match[1]!);
    }
  }
  return [...found].sort().map((name) => ({ name }));
}

/** Resolve a local object-literal identifier so shared prop objects stay
 * the runtime source while the generator still sees every entry. */
function objectLiteral(
  expression: Node | undefined,
  sourceFile: SourceFile,
  seen = new Set<string>(),
): ObjectLiteralExpression | undefined {
  if (!expression) return undefined;
  if (Node.isObjectLiteralExpression(expression)) return expression;
  if (!Node.isIdentifier(expression)) return undefined;
  const name = expression.getText();
  if (seen.has(name)) return undefined;
  seen.add(name);
  const declaration = sourceFile.getVariableDeclaration(name);
  return objectLiteral(declaration?.getInitializer(), sourceFile, seen);
}

/** Prop entries from a runtime object, expanding local shared objects
 * in source order. */
function propsFromLiteral(literal: ObjectLiteralExpression, sourceFile: SourceFile): PropDoc[] {
  return literal.getProperties().flatMap((entry: ObjectLiteralElementLike) => {
    if (Node.isSpreadAssignment(entry)) {
      const shared = objectLiteral(entry.getExpression(), sourceFile);
      return shared ? propsFromLiteral(shared, sourceFile) : [];
    }

    if (!entry.isKind(SyntaxKind.PropertyAssignment)) return [];
    const name = entry.getName().replace(/^["']|["']$/g, "");
    const body = entry.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
    const pick = (key: string) => {
      const found = body
        ?.getProperties()
        .find(
          (p): p is PropertyAssignment =>
            p.isKind(SyntaxKind.PropertyAssignment) && p.getName() === key,
        );
      return found?.getInitializer()?.getText();
    };
    const description = commentText(entry);
    const doc: PropDoc = { name, type: pick("type") ?? "unknown", required: false, description };
    const def = pick("default");
    return [{ ...doc, ...(def ? { default: def } : {}) }];
  });
}

/** Props of a native primitive: the runtime declaration inside its
 * defineComponent, with constructor types and defaults. Shared objects
 * and their spreads resolve in source order. */
function nativeProps(component: ObjectLiteralExpression): PropDoc[] {
  const propsEntry = component
    .getProperties()
    .find(
      (p): p is PropertyAssignment =>
        p.isKind(SyntaxKind.PropertyAssignment) && p.getName() === "props",
    );
  const literal = objectLiteral(propsEntry?.getInitializer(), component.getSourceFile());
  return literal ? propsFromLiteral(literal, component.getSourceFile()) : [];
}

/** A statement the family dressing note may sit above: an export
 * declaration, or a declaration carrying the export keyword. ts-morph
 * types `getModifiers` loosely across the statement union, so probe it
 * by shape. */
function exportedStatement(statement: Node): boolean {
  if (Node.isExportDeclaration(statement)) return true;
  const modifiers = (statement as { getModifiers?: () => readonly Node[] }).getModifiers?.() ?? [];
  return modifiers.some((m) => m.getKind() === SyntaxKind.ExportKeyword);
}

function isFamilyFacadeStatement(statement: Node): boolean {
  return (
    Node.isVariableStatement(statement) &&
    statement
      .getDeclarations()
      .some(
        (d) => initializerCall(d.getInitializer())?.getExpression().getText() === "defineFamily",
      )
  );
}

function isComponentStatement(statement: Node): boolean {
  return (
    Node.isVariableStatement(statement) &&
    statement
      .getDeclarations()
      .some(
        (d) => initializerCall(d.getInitializer())?.getExpression().getText() === "defineComponent",
      )
  );
}

function wrapperHeaderComment(file: SourceFile): string {
  // The dressing note sits above the family's main face. Native
  // families document it on the export — the Object.assign vessel or
  // the props type. A spread namespace can carry it too (editable), or
  // the dressing sits on the sized Root wrapper instead (the sized
  // families) — the spread's own plumbing note is a fixed template and
  // never dresses anything.
  for (const statement of file.getStatements()) {
    if (!exportedStatement(statement)) continue;
    if (isComponentStatement(statement) || isFamilyFacadeStatement(statement)) continue;
    const text = commentText(statement);
    if (
      Node.isVariableStatement(statement) &&
      statement.getDeclarations().some((d) => Node.isObjectLiteralExpression(d.getInitializer())) &&
      text.startsWith("Ark's namespace is frozen")
    ) {
      continue;
    }
    if (text) return text;
  }
  for (const statement of file.getStatements()) {
    if (!isComponentStatement(statement)) continue;
    const text = commentText(statement);
    if (text) return text;
  }
  for (const statement of file.getStatements()) {
    if (!exportedStatement(statement)) continue;
    const text = commentText(statement);
    if (text) return text;
  }
  return "";
}

/** Parts our stylesheet actually styles, from the data-part selectors. */
function styledParts(family: string): string[] {
  const file = join(CORE_STYLES, `${family}.ts`);
  if (!existsSync(file)) {
    // A family split out of a shared scope ("ai-message" out of "ai")
    // dresses from the scope's stylesheet — fall back to its stem.
    const stem = family.split("-")[0];
    if (stem === family || !existsSync(join(CORE_STYLES, `${stem}.ts`))) return [];
    return styledParts(stem);
  }
  const css = readFileSync(file, "utf8");
  return [...new Set([...css.matchAll(/\[data-part="([\w-]+)"\]/g)].map((m) => m[1]))].sort();
}

/** Zag machines are not hoisted by pnpm — resolve through Ark's own
 * dependency graph. Families without a machine (pure renderers like
 * swap) legitimately have none. */
const arkRequire = createRequire(join(ROOT, "node_modules/@ark-ui/vue/package.json"));

function zagParts(family: string): string[] {
  let pkgDir: string;
  try {
    pkgDir = dirname(arkRequire.resolve(`@zag-js/${family}/package.json`));
  } catch {
    return [];
  }
  const file = join(pkgDir, "dist", `${family}.anatomy.mjs`);
  if (!existsSync(file)) return [];
  const text = readFileSync(file, "utf8");
  // Both spellings exist: createAnatomy("x").parts("a", "b") and
  // createAnatomy("x", ["a", "b"]).
  const list =
    text.match(/createAnatomy\("[\w-]+"\)\.parts\(([^)]*)\)/s)?.[1] ??
    text.match(/createAnatomy\("[\w-]+",\s*\[([\s\S]*?)\]\)/)?.[1] ??
    "";
  return [...list.matchAll(/"([\w-]+)"/g)].map((m) => m[1]);
}

export function documentFamily(dir: string): FamilyDoc | null {
  const indexPath = join(WRAPPERS, dir, "index.ts");
  if (!existsSync(indexPath)) return null;
  const indexFile = project.addSourceFileAtPath(indexPath);
  const indexText = indexFile.getFullText();

  const arkImport = indexText.match(/import \{[^}]*as Ark\w+[^}]*\} from "@ark-ui\/vue\/([\w-]+)"/);
  const description = wrapperHeaderComment(indexFile);
  // A family that merely composes an Ark part under another name (the
  // calendar wears the date-picker) is still its own native family —
  // only a re-export of the matching module is a wrapped one.
  const isWrapped = arkImport !== null && arkImport[1] === dir;

  let components: Record<string, ComponentDoc> = {};
  let source: "ark" | "native";
  let anatomy: string[];
  let facadeName: string | undefined;
  // Both shelves report the styled parts, and the native branch's anatomy
  // is the same list — read the stylesheet once.
  const styled = styledParts(dir);

  if (isWrapped && arkImport) {
    source = "ark";
    const family = arkImport[1];
    const parts = readdirSync(join(ARK_DIST, family))
      .map((f) => f.match(new RegExp(`^${family}-([\\w-]+)\\.vue\\.d\\.ts$`))?.[1])
      .filter((p): p is string => !!p && p !== "root-provider" && p !== "context");
    const dressed = dressedProps(indexFile);
    const facade = familyFacade(indexFile);
    facadeName = facade?.name;
    // The facade is the family's high-level face; Root is the wrapper the
    // other parts mount under, so both precede Ark's own parts.
    const orderedParts = facade ? ["root", ...parts.filter((part) => part !== "root")] : parts;
    components = {
      ...(facade
        ? {
            [facade.name]: {
              description: commentText(facade.componentStatement),
              props: nativeProps(facade.component),
              emits: nativeEmits(facade.component),
              slots: nativeSlots(facade.component),
            },
          }
        : {}),
      ...Object.fromEntries(
        orderedParts.map((part) => {
          const key = pascal(part);
          const own = dressed[key] ?? [];
          const props = mergeProps(own, arkProps(family, part));
          const emits = arkEmits(family, part);
          return [
            key,
            {
              ...(props.length ? { props } : {}),
              ...(emits.length ? { emits } : {}),
            },
          ];
        }),
      ),
    };
    anatomy = zagParts(family);
  } else {
    source = "native";
    components = {};
    for (const decl of indexFile.getVariableDeclarations()) {
      const call = decl.getInitializer()?.asKind(SyntaxKind.CallExpression);
      if (!call) continue;
      const callee = call.getExpression().getText();
      // A part factory ("part(\"Icon\", \"span\")") contributes a styled
      // part with no API of its own — its runtime name is the family's
      // prefix, the same convention every native wrapper follows.
      if (callee === "part") {
        const partName = call
          .getArguments()[0]
          ?.asKind(SyntaxKind.StringLiteral)
          ?.getLiteralValue();
        if (partName) {
          const description = commentText(decl.getVariableStatement() ?? decl);
          components[pascal(dir) + pascal(partName)] = description ? { description } : {};
        }
        continue;
      }
      if (callee !== "defineComponent") continue;
      const arg = call.getArguments()[0]?.asKind(SyntaxKind.ObjectLiteralExpression);
      if (!arg) continue;
      const nameProp = arg
        .getProperties()
        .find(
          (p): p is PropertyAssignment =>
            p.isKind(SyntaxKind.PropertyAssignment) && p.getName() === "name",
        );
      const name = nameProp?.getInitializerIfKind(SyntaxKind.StringLiteral)?.getLiteralText();
      if (!name) continue;
      const props = nativeProps(arg);
      const emits = nativeEmits(arg);
      const slots = nativeSlots(arg);
      const description = commentText(decl.getVariableStatement() ?? decl);
      components[name] = {
        ...(description ? { description } : {}),
        ...(props.length ? { props } : {}),
        ...(emits.length ? { emits } : {}),
        ...(slots.length ? { slots } : {}),
      };
    }
    anatomy = styled;
  }

  return {
    family: dir,
    source,
    description,
    ...(anatomy.length ? { anatomy: { parts: anatomy, styled } } : {}),
    components,
    ...(facadeName ? { facade: facadeName } : {}),
  };
}

export function families(): string[] {
  return readdirSync(WRAPPERS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}
