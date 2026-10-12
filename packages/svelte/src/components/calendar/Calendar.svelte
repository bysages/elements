<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("calendar");
injectComponentStyle("date-picker");

import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import InternalIcon from "../../internal/InternalIcon.svelte";
import type { CalendarProps } from "./props";

let {
  value = $bindable(),
  defaultValue,
  min,
  max,
  variant = "compact",
  mode = "month",
  selectionMode,
  startOfWeek,
  fixedWeeks = false,
  showWeekNumbers = false,
  outsideDaySelectable = true,
  closeOnSelect = true,
  minView,
  maxView,
  onValueChange,
  children,
  ...rest
}: CalendarProps = $props();
</script>

{#snippet title(dp)}
  {@const api = dp()}
  {@const date = api.focusedValue}
  <!-- zag's RangeText follows the visible day-page (startValue), which
       the month and year steps never move — it would freeze the title.
       Formatting the focused value keeps it in step with the arrows. -->
  {#if api.view === "month"}
    {api.format(date, { year: "numeric" })}
  {:else if api.view === "day"}
    {api.format(date, { month: "long", year: "numeric" })}
  {:else}
    {@const decade = Math.floor(date.year / 10) * 10}
    {decade} - {decade + 9}
  {/if}
{/snippet}

{#snippet header(dp)}
  <!-- The header lives inside every view: the triggers read their view
       from the view's props context, so one shared header outside the
       views would step months while the machine sits in month or year. -->
  <div data-scope="calendar" data-part="header">
    <ArkDatePicker.ViewControl>
      <ArkDatePicker.PrevTrigger>
        <InternalIcon name="chevron-left" />
      </ArkDatePicker.PrevTrigger>
      <ArkDatePicker.ViewTrigger>
        <ArkDatePicker.Context>
          {#snippet children(viewdp)}
            {@render title(viewdp)}
          {/snippet}
        </ArkDatePicker.Context>
      </ArkDatePicker.ViewTrigger>
      {#if variant === "full"}
        <button
          type="button"
          data-scope="calendar"
          data-part="today-trigger"
          onclick={() => {
            const current = dp();
            current.selectToday();
            if (mode === "year" && current.view === "month") current.setView("day");
          }}
        >
          Today
        </button>
      {/if}
      <ArkDatePicker.NextTrigger>
        <InternalIcon name="chevron-right" />
      </ArkDatePicker.NextTrigger>
    </ArkDatePicker.ViewControl>
  </div>
{/snippet}

<!-- The date-picker's grid standing on the page. Compact is the popup's
quiet card; full opens it into a dashboard calendar. Year mode starts on
a month overview; choosing a month drills into its day grid. -->
<div {...rest} data-scope="calendar" data-part="root" data-variant={variant} data-mode={mode}>
  <ArkDatePicker.Root
    open
    inline
    bind:value
    {defaultValue}
    {min}
    {max}
    {selectionMode}
    {startOfWeek}
    fixedWeeks={fixedWeeks || variant === "full"}
    {showWeekNumbers}
    {outsideDaySelectable}
    {closeOnSelect}
    {minView}
    {maxView}
    {...mode === "year" ? { defaultView: "month" as const, maxView: "month" as const } : {}}
    onValueChange={(details: any) => onValueChange?.(details.value)}
  >
    <ArkDatePicker.View view="day">
      <ArkDatePicker.Context>
        {#snippet children(dp)}
          {@render header(dp)}
          <ArkDatePicker.Table>
            <ArkDatePicker.TableHead>
              <ArkDatePicker.TableRow>
                {#if showWeekNumbers}
                  <ArkDatePicker.WeekNumberHeaderCell>Wk</ArkDatePicker.WeekNumberHeaderCell>
                {/if}
                {#each dp().weekDays as day, id (id)}
                  <ArkDatePicker.TableHeader aria-label={day.long}>
                    {day.narrow}
                  </ArkDatePicker.TableHeader>
                {/each}
              </ArkDatePicker.TableRow>
            </ArkDatePicker.TableHead>
            <ArkDatePicker.TableBody>
              {#each dp().weeks as week, id (id)}
                <ArkDatePicker.TableRow>
                  {#if showWeekNumbers}
                    <ArkDatePicker.WeekNumberCell weekIndex={id} {week}>
                      {dp().getWeekNumber(week)}
                    </ArkDatePicker.WeekNumberCell>
                  {/if}
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
      <ArkDatePicker.Context>
        {#snippet children(dp)}
          {@render header(dp)}
          {@const columns = mode === "year" ? 4 : 3}
          <ArkDatePicker.Table {columns}>
            <ArkDatePicker.TableBody>
              {#each dp().getMonthsGrid({ columns, format: columns === 4 ? "short" : "long" }) as months, id (id)}
                <ArkDatePicker.TableRow>
                  {#each months as month, id2 (id2)}
                    <ArkDatePicker.TableCell value={month.value} {columns}>
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
    {#if mode === "month"}
      <ArkDatePicker.View view="year">
        <ArkDatePicker.Context>
          {#snippet children(dp)}
            {@render header(dp)}
            <ArkDatePicker.Table columns={3}>
              <ArkDatePicker.TableBody>
                {#each dp().getYearsGrid({ columns: 3 }) as years, id (id)}
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
    {/if}
  </ArkDatePicker.Root>
  {@render children?.()}
</div>
