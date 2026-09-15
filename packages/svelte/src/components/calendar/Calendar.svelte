<script lang="ts">
import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import type { CalendarProps } from "./props";

let { value, min, max, onValueChange, children, ...rest }: CalendarProps = $props();
</script>

{#snippet title(dp)}
  <!-- zag's RangeText follows the visible day-page (startValue), which
       the month and year steps never move — it would freeze the title.
       Formatting the focused value keeps it in step with the arrows. -->
  {#if dp.view === "year"}
    {@const decade = Math.floor(dp.focusedValue.year / 10) * 10}
    {decade} - {decade + 9}
  {:else if dp.view === "month"}
    {dp.format(dp.focusedValue, { year: "numeric" })}
  {:else}
    {dp.format(dp.focusedValue, { month: "long", year: "numeric" })}
  {/if}
{/snippet}
{#snippet header()}
  <!-- The header lives inside every view: the triggers read their view
       from the view's props context, so one shared header outside the
       views would step months while the machine sits in month or year. -->
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
        <ArkDatePicker.Context>
          {#snippet children(dp)}
            {@render title(dp)}
          {/snippet}
        </ArkDatePicker.Context>
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
{/snippet}

<!-- The date-picker's month grid, standing on the page without its
popup: always open, the trigger gone, the vessel a quiet card. The
title zooms out through month and year grids; the grids themselves
are the shared machinery — value, range selection, and focus ride
Ark's own contract. Inline keeps the machine's dismissable layer
off, since no popup content ever renders for it to watch. -->
<div {...rest} data-scope="calendar" data-part="root">
  <ArkDatePicker.Root
    open
    closeOnSelect
    inline
    value={value}
    min={min}
    max={max}
    onValueChange={(details: any) => onValueChange?.(details.value)}
  >
    <!-- Three views ride the machine; only the one matching the current
         view shows. Month and year are hand-laid grids of three columns
         — the machine supplies the cells. -->
    <ArkDatePicker.View view="day">
      {@render header()}
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
    <ArkDatePicker.View view="month">
      {@render header()}
      <ArkDatePicker.Context>
        {#snippet children(dp)}
          <ArkDatePicker.Table columns={3}>
            <ArkDatePicker.TableBody>
              {#each dp.getMonthsGrid({ columns: 3 }) as months, id (id)}
                <ArkDatePicker.TableRow>
                  {#each months as month, id2 (id2)}
                    <ArkDatePicker.TableCell value={month.value} columns={3}>
                      <ArkDatePicker.TableCellTrigger>{month.label}</ArkDatePicker.TableCellTrigger>
                    </ArkDatePicker.TableCell>
                  {/each}
                </ArkDatePicker.TableRow>
              {/each}
            </ArkDatePicker.TableBody>
          </ArkDatePicker.Table>
        {/snippet}
      </ArkDatePicker.Context>
    </ArkDatePicker.View>
    <ArkDatePicker.View view="year">
      {@render header()}
      <ArkDatePicker.Context>
        {#snippet children(dp)}
          <ArkDatePicker.Table columns={3}>
            <ArkDatePicker.TableBody>
              {#each dp.getYearsGrid({ columns: 3 }) as years, id (id)}
                <ArkDatePicker.TableRow>
                  {#each years as year, id2 (id2)}
                    <ArkDatePicker.TableCell value={year.value} columns={3}>
                      <ArkDatePicker.TableCellTrigger>{year.label}</ArkDatePicker.TableCellTrigger>
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
