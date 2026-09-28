<script setup lang="ts">
import { Badge, Button, Card, DatePicker, Icon, Progress, SegmentGroup } from "@bysages/vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { computed, ref } from "vue";

import { currentPlan, invoices, paymentMethod } from "./data";
import { toaster } from "./toast";

const statusTone = {
  paid: "success",
  refunded: "info",
  overdue: "danger",
} as const;

const statusFilter = ref("all");

const range = ref<DateValue[]>([]);

const filteredInvoices = computed(() =>
  invoices.filter((invoice) => {
    if (statusFilter.value !== "all" && invoice.status !== statusFilter.value) return false;
    const [start, end] = range.value;
    if (!start || !end) return true;
    const date = new Date(invoice.date);
    const day = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return day.compare(start) >= 0 && day.compare(end) <= 0;
  }),
);
</script>

<template>
  <div class="grid content-start gap-5">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-5">
      <Card.Root>
        <Card.Header>
          <Card.Title>{{ currentPlan.name }}</Card.Title>
          <Card.Description>Current plan · {{ currentPlan.renewal }}</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-4">
          <span class="font-serif text-3xl">{{ currentPlan.price }}</span>
          <Progress.Root :model-value="currentPlan.seatUse">
            <Progress.Label>Seats</Progress.Label>
            <Progress.ValueText />
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
          <p class="m-0 text-sm text-tertiary">{{ currentPlan.seats }}</p>
        </Card.Content>
        <Card.Footer>
          <Button
            size="sm"
            @click="
              toaster.create({
                title: 'Plan change requested',
                description: 'The billing owner will confirm the new tier.',
                type: 'info',
              })
            "
          >
            Change plan
          </Button>
        </Card.Footer>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Payment method</Card.Title>
          <Card.Description
            >{{ paymentMethod.brand }} · Expires {{ paymentMethod.expires }}</Card.Description
          >
        </Card.Header>
        <Card.Content class="grid gap-2">
          <p class="m-0 font-serif text-2xl tracking-[0.2em]">•••• {{ paymentMethod.last4 }}</p>
        </Card.Content>
        <Card.Footer>
          <Button
            variant="outline"
            size="sm"
            @click="
              toaster.create({
                title: 'Card update opened',
                description: 'A secure update sheet would take over here.',
                type: 'info',
              })
            "
          >
            Update card
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>

    <Card.Root>
      <Card.Header>
        <Card.Title>Invoices</Card.Title>
        <Card.Description>The newest first; refunded lines stay on the ledger.</Card.Description>
      </Card.Header>
      <Card.Content class="p-0!">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
          <SegmentGroup.Root v-model="statusFilter" aria-label="Filter invoices by status">
            <SegmentGroup.Indicator />
            <SegmentGroup.Item value="all">
              <SegmentGroup.ItemText>All</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="paid">
              <SegmentGroup.ItemText>Paid</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="refunded">
              <SegmentGroup.ItemText>Refunded</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="overdue">
              <SegmentGroup.ItemText>Overdue</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          </SegmentGroup.Root>
          <DatePicker.Root v-model="range" selection-mode="range" class="w-auto!">
            <DatePicker.Label class="sr-only">Period</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.Input :index="0" class="w-28!" />
              <DatePicker.Input :index="1" class="w-28!" />
              <DatePicker.Trigger>
                <Icon name="calendar" />
              </DatePicker.Trigger>
              <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
            </DatePicker.Control>
            <Teleport to="body">
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <!-- The shortcuts live in the popup: a second row here
                       would lift the inputs off the filter line. -->
                  <div class="flex gap-2">
                    <DatePicker.PresetTrigger value="lastMonth"
                      >Last month</DatePicker.PresetTrigger
                    >
                    <DatePicker.PresetTrigger value="thisQuarter"
                      >This quarter</DatePicker.PresetTrigger
                    >
                  </div>
                  <DatePicker.View view="day">
                    <DatePicker.Context v-slot="dp">
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger>
                          <Icon name="chevron-left" />
                        </DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>
                          <Icon name="chevron-right" />
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
                              <DatePicker.TableCellTrigger>{{
                                day.day
                              }}</DatePicker.TableCellTrigger>
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
                          <Icon name="chevron-left" />
                        </DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>
                          <Icon name="chevron-right" />
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
                              <DatePicker.TableCellTrigger>{{
                                month.label
                              }}</DatePicker.TableCellTrigger>
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
                          <Icon name="chevron-left" />
                        </DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>
                          <Icon name="chevron-right" />
                        </DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          <DatePicker.TableRow
                            v-for="(years, i) in dp.getYearsGrid({ columns: 4 })"
                            :key="i"
                          >
                            <DatePicker.TableCell
                              v-for="(year, j) in years"
                              :key="j"
                              :value="year.value"
                            >
                              <DatePicker.TableCellTrigger>{{
                                year.label
                              }}</DatePicker.TableCellTrigger>
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
        </div>
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="border-b border-border text-start text-tertiary">
              <th class="px-4 py-2 text-start font-medium">Invoice</th>
              <th class="px-4 py-2 text-start font-medium">Date</th>
              <th class="px-4 py-2 text-start font-medium">Amount</th>
              <th class="px-4 py-2 text-start font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredInvoices.length === 0">
              <td colspan="4" class="px-4 py-6 text-center text-tertiary">
                No invoices in this window.
              </td>
            </tr>
            <tr
              v-for="invoice in filteredInvoices"
              :key="invoice.id"
              class="border-b border-border last:border-b-0"
            >
              <td class="px-4 py-2 font-medium">{{ invoice.id }}</td>
              <td class="px-4 py-2 text-secondary">{{ invoice.date }}</td>
              <td class="px-4 py-2 text-secondary">{{ invoice.amount }}</td>
              <td class="px-4 py-2">
                <Badge :tone="statusTone[invoice.status]" variant="subtle">
                  {{ invoice.status }}
                </Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Content>
    </Card.Root>
  </div>
</template>
