export const COMPONENT_MIME = "application/x-elements-component";
export const ROOT_ID = "root";

export interface StudioNode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children: string[];
}

export type StudioNodes = Record<string, StudioNode>;
