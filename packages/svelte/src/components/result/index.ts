import ResultDescriptionComponent from "./Description.svelte";
import ResultExtraComponent from "./Extra.svelte";
import ResultComponent from "./Result.svelte";
import ResultIconComponent from "./ResultIcon.svelte";
import ResultTitleComponent from "./Title.svelte";

/** A verdict drawn after the deed — Result, Result.Icon, Result.Title,
 * Result.Description, Result.Extra. */
export const Result = Object.assign(ResultComponent, {
  Root: ResultComponent,
  Icon: ResultIconComponent,
  Title: ResultTitleComponent,
  Description: ResultDescriptionComponent,
  Extra: ResultExtraComponent,
});
