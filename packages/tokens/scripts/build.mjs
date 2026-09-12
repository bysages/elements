import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

import StyleDictionary from "style-dictionary";

const kebab = (parts) =>
  parts
    .map((part, index) =>
      index === 0 ? part : part.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
    )
    .join("-");

// Primitives are the only machine-built layer; they keep their DTCG source as
// the single source of truth and emit both CSS variables and a JS object.
const sd = new StyleDictionary({
  source: ["src/primitives/*.json"],
  hooks: {
    transforms: {
      "name/bs": {
        type: "name",
        transform: (token) => `bs-${kebab(token.path)}`,
      },
    },
    formats: {
      // Flat { css-variable: value } map — what JS consumers (theme engine,
      // chart theming) actually need, without DTCG metadata noise.
      "js/bs-flat": ({ dictionary }) => {
        const entries = dictionary.allTokens.map(
          (token) =>
            `  ${JSON.stringify(token.name)}: ${JSON.stringify(token.$value ?? token.value)}`,
        );
        return `export default {\n${entries.join(",\n")}\n};\n`;
      },
    },
  },
  platforms: {
    css: {
      transforms: ["attribute/cti", "name/bs"],
      buildPath: "dist/css/",
      files: [
        {
          destination: "primitives.css",
          format: "css/variables",
          options: { selector: ":root, :host" },
        },
      ],
    },
    js: {
      transforms: ["attribute/cti", "name/bs"],
      buildPath: "dist/js/",
      files: [{ destination: "index.mjs", format: "js/bs-flat" }],
    },
  },
});

await sd.buildAllPlatforms();

// Semantic layers (themes, density, contrast, typography, motion) are design
// decisions expressed directly in CSS. Everything ships in one cascade layer
// so any consumer stylesheet — and every shadow root — outranks tokens
// without specificity fights.
const semanticFiles = [
  "theme-light.css",
  "theme-dark.css",
  "accent.css",
  "density.css",
  "contrast.css",
  "typography.css",
  "motion.css",
];

const semantic = await Promise.all(
  semanticFiles.map((file) => readFile(`src/semantic/${file}`, "utf8")),
);

const body = [await readFile("dist/css/primitives.css", "utf8"), ...semantic].join("\n\n").trim();

const indented = body
  .split("\n")
  .map((line) => (line.trim() ? `  ${line}` : line))
  .join("\n");

const css = `@layer bs.tokens;\n\n@layer bs.tokens {\n${indented}\n}\n`;

await writeFile("dist/css/index.css", css);

// The same stylesheet as a typed string module, so bundler-free consumers
// (shadow-root adoptedStyleSheets, SSR head tags) don't need raw-import support.
const stylesModule = `/** Stylesheet for the full token layer, generated from dist/css/index.css. */\nexport default ${JSON.stringify(css)};\n`;
const stylesTypes = "declare const tokensCss: string;\nexport default tokensCss;\n";

await writeFile("dist/js/styles.mjs", stylesModule);
await writeFile("dist/js/styles.d.ts", stylesTypes);
await mkdir("dist", { recursive: true });
await copyFile("src/static/index.d.ts", "dist/index.d.ts");
