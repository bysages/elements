import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Slider from "./Slider.svelte";

/** A ruled track the hand slides between bounds. */
export default defineEntry({
  Slider: {
    ...faces.Slider,
    component: Slider,
  },
});
