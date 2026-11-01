import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/** Component CSS must speak in tokens. The scan reads the exported template
 * styles directly, keeps source line numbers by blanking comments instead of
 * removing them, and allows only mechanical pixel arithmetic: the hairline,
 * token-derived calculations, environment fallbacks, and black alpha stops
 * that masks use purely as opacity. */
const stylesRoot = path.resolve("packages/core/src/styles");
const violations = [];

const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith(".ts")) check(full);
  }
};

function check(file) {
  const source = readFileSync(file, "utf8");
  for (const template of source.matchAll(/`([\s\S]*?)`/g)) {
    const startLine = source.slice(0, template.index).split("\n").length;
    const css = template[1]
      .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, " "))
      .replace(/rgb\(0\s+0\s+0\s*\/[^)]*\)/gi, (stop) => stop.replace(/[^\n]/g, " "))
      .replace(/\bcalc\((?:[^()]|\([^()]*\))*\)/gi, (fn) =>
        /--bs-/.test(fn) ? fn.replace(/[^\n]/g, " ") : fn,
      )
      .replace(/\b(?:var|env)\((?:[^()]|\([^()]*\))*\)/gi, (fn) => fn.replace(/[^\n]/g, " "));

    css.split("\n").forEach((line, index) => {
      for (const hex of line.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
        violations.push({ file, line: startLine + index, value: hex[0] });
      }
      for (const pixel of line.matchAll(/\b\d+(?:\.\d+)?px\b/gi)) {
        // The cropper's scrim is deliberately unbounded; a token would fake a bounded spacing value.
        if (!["0px", "1px", "9999px"].includes(pixel[0].toLowerCase())) {
          violations.push({ file, line: startLine + index, value: pixel[0] });
        }
      }
    });
  }
}

walk(stylesRoot);

if (violations.length > 0) {
  console.error("Hardcoded visual values found:");
  for (const { file, line, value } of violations) {
    console.error(`${path.relative(process.cwd(), file)}:${line}: ${value}`);
  }
  process.exit(1);
}

console.log("Component styles use the token system.");
