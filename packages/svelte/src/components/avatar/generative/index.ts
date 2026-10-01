import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Avatar from "./Avatar.svelte";

/** A person's seal: image when given, initials as the fallback. */
export default defineEntry({
  Avatar: {
    ...faces.Avatar,
    component: Avatar,
  },
});
