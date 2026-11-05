import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";

import { Typography } from "./index";

describe("Typography Heading", () => {
  it("chooses the semantic element independently of its visual size", () => {
    const html = renderToStaticMarkup(
      <Typography.Heading as="h2" size="lg">
        Published
      </Typography.Heading>,
    );

    expect(html).toContain('<h2 data-scope="typography" data-part="heading" data-size="lg">');
  });

  it("keeps the paragraph default and leaves the size attribute off raw use", () => {
    const html = renderToStaticMarkup(<Typography.Heading>Published</Typography.Heading>);

    expect(html).toContain('<p data-scope="typography" data-part="heading">');
    expect(html).not.toContain("data-size");
  });
});
