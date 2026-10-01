import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Card from "./Card.svelte";

/** Grouping vessel. Give title and description instead of hand-building a header; children render in the body. */
export default defineEntry({
  Card: {
    ...faces.Card,
    component: Card,
  },
});
