const PELE_REGULAR =
  "7q7q9vfgfgopij5b9999atg87q997q7qfgfgfgfgfgfgfgfgfgfg7q7qg8g8g8fgs7ijijk2k2ijgzlmk27qdwijfgn5k2lmijlmk2ijgzk2ijq8ijijgz7q7q7qd1fg99fgfgdwfgfg7qfgfg6666dw66n5fgfgfgfg99dw7qfgdwk2dwdwdw9a789ag8";
const PELE_BOLD =
  "7q99d6fgfgopk26m9999atg87q997q7qfgfgfgfgfgfgfgfgfgfg9999g8g8g8gzr3k2k2k2k2ijgzlmk27qfgk2gzn5k2lmijlmk2ijgzk2ijq8ijijgz997q99g8fg99fggzfggzfg99gzgz7q7qfg7qopgzgzgzgzatfg99gzfglmfgfgdwat7satg8";

const BOLD = 1;
const MONO = 4;
const SMALLER = 1.2;

function unpack(packed: string): Uint16Array {
  const widths = new Uint16Array(95);
  for (let index = 0; index < 95; index += 1) {
    widths[index] = Number.parseInt(packed.slice(index * 2, index * 2 + 2), 36);
  }
  return widths;
}

const regularWidths = unpack(PELE_REGULAR);
const boldWidths = unpack(PELE_BOLD);

function isWide(code: number): boolean {
  return (
    (code >= 0x1100 && code <= 0x115f) ||
    (code >= 0x2e80 && code <= 0xa4cf) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xfe30 && code <= 0xfe4f) ||
    (code >= 0xff00 && code <= 0xff60) ||
    (code >= 0xffe0 && code <= 0xffe6) ||
    (code >= 0xd800 && code <= 0xdbff)
  );
}

function isZeroWidth(code: number): boolean {
  return (
    code === 0xad ||
    (code >= 0x300 && code <= 0x36f) ||
    (code >= 0x200b && code <= 0x200f) ||
    (code >= 0xdc00 && code <= 0xdfff) ||
    (code >= 0xfe00 && code <= 0xfe0f) ||
    code === 0xfeff
  );
}

/** Pele 1.13 does not export its metrics fallback, although its browser
 * default uses canvas. Keeping this deterministic copy in core is what
 * makes server HTML and client HTML agree before fonts are ready. */
export const metricsMeasurer = {
  width(text: string, size: number, style: number): number {
    const effectiveSize = style & 8 || style & 16 ? size / SMALLER : size;
    const widths = style & BOLD ? boldWidths : regularWidths;
    let units = 0;

    for (let index = 0; index < text.length; index += 1) {
      const code = text.charCodeAt(index);
      if (code < 32) continue;
      if (code < 127) units += style & MONO ? 600 : widths[code - 32];
      else if (isZeroWidth(code)) continue;
      else if (isWide(code)) units += style & MONO ? 1200 : 1000;
      else units += style & MONO ? 600 : 580;
    }

    return (units * effectiveSize) / 1000;
  },
};
