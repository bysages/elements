import { queryCollectionSearchSections } from "@nuxt/content/server";
import { defineEventHandler } from "h3";
import { useEvent } from "nitropack/runtime";

import { getCollectionsToQuery, getAvailableLocales } from "../utils/content";

/** The full-text index the client search builds from: one section per
 * heading, already split by the Content module. */
export default defineEventHandler(async (event) => {
  const collections = getCollectionsToQuery(undefined, getAvailableLocales(event));

  const sections = await Promise.all(
    collections.map(
      (collection) =>
        queryCollectionSearchSections(event, collection as never) as unknown as Promise<
          Array<Record<string, unknown>>
        >,
    ),
  );

  return sections.flat();
});
