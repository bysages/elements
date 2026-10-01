import BrowserComponent from "./Browser.svelte";
import BrowserBodyComponent from "./BrowserBody.svelte";
import BrowserDotsComponent from "./BrowserDots.svelte";
import BrowserTitleBarComponent from "./BrowserTitleBar.svelte";
import BrowserUrlBarComponent from "./BrowserUrlBar.svelte";

/** A browser window as a vessel: Root, TitleBar, Dots, UrlBar, Body. */
export const Browser = Object.assign(BrowserComponent, {
  TitleBar: BrowserTitleBarComponent,
  Dots: BrowserDotsComponent,
  UrlBar: BrowserUrlBarComponent,
  Body: BrowserBodyComponent,
});
