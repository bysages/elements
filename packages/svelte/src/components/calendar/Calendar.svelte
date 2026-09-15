<script lang="ts">
import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import type { CalendarProps } from "./props";

let { value, min, max, onValueChange, children, ...rest }: CalendarProps = $props();
</script>

<!-- The date-picker's month grid, standing on the page without its
popup: always open, the trigger gone, the vessel a quiet card. The
grid itself is the shared machinery — value, range selection, and
focus ride Ark's own contract. -->
<div {...rest} data-scope="calendar" data-part="root">
  <ArkDatePicker.Root
    open
    closeOnSelect
    value={value}
    min={min}
    max={max}
    onValueChange={(details: any) => onValueChange?.(details.value)}
  >
    <div data-scope="calendar" data-part="header">
      <ArkDatePicker.ViewControl>
        <ArkDatePicker.PrevTrigger>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
            style="transform: rotate(180deg)"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </ArkDatePicker.PrevTrigger>
        <ArkDatePicker.ViewTrigger>
          <ArkDatePicker.RangeText />
        </ArkDatePicker.ViewTrigger>
        <ArkDatePicker.NextTrigger>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </ArkDatePicker.NextTrigger>
      </ArkDatePicker.ViewControl>
    </div>
    <ArkDatePicker.View view="day">
      <ArkDatePicker.Context>
        {#snippet children(dp)}
          <ArkDatePicker.Table>
            <ArkDatePicker.TableHead>
              <ArkDatePicker.TableRow>
                {#each dp.weekDays as day, id (id)}
                  <ArkDatePicker.TableHeader aria-label={day.long}>
                    {day.narrow}
                  </ArkDatePicker.TableHeader>
                {/each}
              </ArkDatePicker.TableRow>
            </ArkDatePicker.TableHead>
            <ArkDatePicker.TableBody>
              {#each dp.weeks as week, id (id)}
                <ArkDatePicker.TableRow>
                  {#each week as day, id2 (id2)}
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
  </ArkDatePicker.Root>
  {@render children?.()}
</div>
