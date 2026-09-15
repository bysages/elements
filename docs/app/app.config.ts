export default defineAppConfig({
  header: {
    title: "Elements",
  },
  seo: {
    titleTemplate: "%s · Elements",
    title: "Elements",
    description:
      "The By Sages UI component library — headless interaction dressed in paper and ink.",
  },
  github: {
    url: "https://github.com/bysages/elements",
    branch: "main",
    rootDir: "docs",
  },
  navigation: {
    sub: "header",
  },
  docs: {
    name: "Elements",
    description:
      "The By Sages UI component library — headless interaction dressed in paper and ink.",
    copyright: { label: "By Sages", url: "https://www.bysages.com/" },
  },
});
