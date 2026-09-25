<script setup lang="ts">
import { DatePicker } from "@bysages/vue";
</script>

<template>
  <DatePicker.Root>
    <DatePicker.Label>Start date</DatePicker.Label>
    <DatePicker.Control>
      <DatePicker.Input />
      <DatePicker.Trigger>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="1.5" />
          <path d="M3 9.5h18M8 3v4M16 3v4" />
        </svg>
      </DatePicker.Trigger>
    </DatePicker.Control>
    <Teleport to="body">
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context v-slot="dp">
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    aria-hidden="true"
                    class="rotate-180"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>
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
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    <DatePicker.TableHeader
                      v-for="(day, i) in dp.weekDays"
                      :key="i"
                      :aria-label="day.long"
                    >
                      {{ day.narrow }}
                    </DatePicker.TableHeader>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  <DatePicker.TableRow v-for="(week, i) in dp.weeks" :key="i">
                    <DatePicker.TableCell v-for="(day, j) in week" :key="j" :value="day">
                      <DatePicker.TableCellTrigger>{{ day.day }}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Context v-slot="dp">
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    aria-hidden="true"
                    class="rotate-180"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>
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
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableBody>
                  <DatePicker.TableRow
                    v-for="(months, i) in dp.getMonthsGrid({ columns: 4 })"
                    :key="i"
                  >
                    <DatePicker.TableCell
                      v-for="(month, j) in months"
                      :key="j"
                      :value="month.value"
                    >
                      <DatePicker.TableCellTrigger>{{ month.label }}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Context v-slot="dp">
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    aria-hidden="true"
                    class="rotate-180"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>
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
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table>
                <DatePicker.TableBody>
                  <DatePicker.TableRow
                    v-for="(years, i) in dp.getYearsGrid({ columns: 4 })"
                    :key="i"
                  >
                    <DatePicker.TableCell v-for="(year, j) in years" :key="j" :value="year.value">
                      <DatePicker.TableCellTrigger>{{ year.label }}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </Teleport>
  </DatePicker.Root>
</template>
