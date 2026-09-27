import { getContext, setContext } from "svelte";
import type { Component } from "svelte";

/** The seam this family passes the engine through — the members the
 * components drive, with the engine's field-name generics opened to
 * `any`. The engine ships no "any form" alias: its loosest, `FormLikeAPI`,
 * still pins names to `string`, which a concrete form's literal names
 * cannot satisfy. */
export interface AnyFormApi {
  handleSubmit(): Promise<unknown>;
  setFieldMeta(field: any, updater: (prev: any) => any): void;
  Field: Component;
}

export const FORM_KEY: unique symbol = Symbol("bysages-form");

export function provideForm(engine: AnyFormApi): AnyFormApi {
  setContext(FORM_KEY, engine);
  return engine;
}

export function useForm(): AnyFormApi | null {
  return getContext<AnyFormApi | null>(FORM_KEY) ?? null;
}
