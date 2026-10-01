import { faces } from "../../generative/faces.generated";
import { labelled, collectionFor, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Icon } from "../icon";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      const collection = collectionFor(props.options);
      return labelled(
        props.label,
        <Select.Root
          collection={collection}
          value={value != null ? [value] : undefined}
          onValueChange={(details) => setValue(details.value[0])}
        >
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder={props.placeholder} />
            </Select.Trigger>
            <Select.Indicator>
              <Icon name="chevrons-up-down" />
            </Select.Indicator>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                {props.options.map((option: { label: string; value: string }) => (
                  <Select.Item key={option.value} item={option}>
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Icon name="check" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
          <Select.HiddenSelect />
        </Select.Root>,
      );
    },
  },
});
