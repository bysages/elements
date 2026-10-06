import { withSelfRoot } from "../../internal/family";
import UserComponent from "./User.svelte";

/** A person on one line: the seal before the words, the name and its
 * quiet echo beneath. */
export const User = withSelfRoot(UserComponent);

export type { UserProps } from "./props";
