<script lang="ts">
import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import { Portal } from "@ark-ui/svelte/portal";

import DatePickerRoot from "./DatePickerRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  value?: unknown;
  defaultValue?: unknown;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").DatePickerRootProps = $props();
</script>

<DatePickerRoot bind:value {defaultValue} {placeholder} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkDatePicker.Label>{label}</ArkDatePicker.Label>{/if}
  <ArkDatePicker.Control>
    <ArkDatePicker.Input aria-label={label ? undefined : placeholder} />
    <ArkDatePicker.Trigger><InternalIcon name="calendar" /></ArkDatePicker.Trigger>
  </ArkDatePicker.Control>
  <Portal>
    <ArkDatePicker.Positioner>
      <ArkDatePicker.Content>
        <ArkDatePicker.View view="day">
          <ArkDatePicker.Context>
            {#snippet children(dp)}
              <ArkDatePicker.ViewControl>
                <ArkDatePicker.PrevTrigger><InternalIcon name="chevron-left" /></ArkDatePicker.PrevTrigger>
                <ArkDatePicker.ViewTrigger><ArkDatePicker.RangeText /></ArkDatePicker.ViewTrigger>
                <ArkDatePicker.NextTrigger><InternalIcon name="chevron-right" /></ArkDatePicker.NextTrigger>
              </ArkDatePicker.ViewControl>
              <ArkDatePicker.Table>
                <ArkDatePicker.TableHead>
                  <ArkDatePicker.TableRow>
                    {#each dp().weekDays as day, index (index)}
                      <ArkDatePicker.TableHeader aria-label={day.long}>{day.narrow}</ArkDatePicker.TableHeader>
                    {/each}
                  </ArkDatePicker.TableRow>
                </ArkDatePicker.TableHead>
                <ArkDatePicker.TableBody>
                  {#each dp().weeks as week, weekIndex (weekIndex)}
                    <ArkDatePicker.TableRow>
                      {#each week as day, dayIndex (dayIndex)}
                        <ArkDatePicker.TableCell value={day}>
                          <ArkDatePicker.TableCellTrigger>{day.day}</ArkDatePicker.TableCellTrigger>
                        </ArkDatePicker.TableCell>
                      {/each}
                    </ArkDatePicker.TableRow>
                  {/each}
                </ArkDatePicker.TableBody>
              </ArkDatePicker.Table>
            {/snippet}
          </ArkDatePicker.Context>
        </ArkDatePicker.View>
      </ArkDatePicker.Content>
    </ArkDatePicker.Positioner>
  </Portal>
  {@render children?.()}
</DatePickerRoot>
