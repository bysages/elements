<script setup lang="ts">
import { Badge, Button, Card, DatePicker, Progress, SegmentGroup } from "@bysages/vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { computed, ref } from "vue";

import {
  currentPlan,
  formatCurrency,
  formatDate,
  invoices,
  paymentMethod,
  type Locale,
} from "./data";
import { toaster } from "./toast";

const { locale } = useI18n();

const copy = {
  en: {
    plan: {
      name: "Scale",
      current: "Current plan",
      seats: "Seats",
      seatsValue: "{used} of {total} seats",
      perMonth: "/ mo",
      change: "Change plan",
      changeTitle: "Plan change requested",
      changeBody: "The billing owner will confirm the new tier.",
    },
    payment: {
      title: "Payment method",
      expires: "Expires",
      update: "Update card",
      updateTitle: "Card update opened",
      updateBody: "A secure update sheet would take over here.",
    },
    invoices: {
      title: "Invoices",
      description: "The newest first; refunded lines stay on the ledger.",
      filter: "Filter invoices by status",
      period: "Period",
      clear: "Clear",
      lastMonth: "Last month",
      thisQuarter: "This quarter",
      headers: {
        invoice: "Invoice",
        date: "Date",
        amount: "Amount",
        status: "Status",
      },
      empty: "No invoices in this window.",
    },
    statuses: {
      all: "All",
      paid: "Paid",
      refunded: "Refunded",
      overdue: "Overdue",
    },
  },
  zh: {
    plan: {
      name: "规模版",
      current: "当前方案",
      seats: "席位",
      seatsValue: "{used} / {total} 个席位",
      perMonth: "/ 月",
      change: "变更方案",
      changeTitle: "已提交方案变更",
      changeBody: "账单负责人将确认新的方案层级。",
    },
    payment: {
      title: "支付方式",
      expires: "有效期至",
      update: "更新银行卡",
      updateTitle: "已打开银行卡更新",
      updateBody: "这里将进入安全的卡片更新流程。",
    },
    invoices: {
      title: "发票记录",
      description: "按时间倒序展示，退款记录仍保留在账簿中。",
      filter: "按状态筛选发票",
      period: "账期",
      clear: "清除",
      lastMonth: "上个月",
      thisQuarter: "本季度",
      headers: {
        invoice: "发票",
        date: "日期",
        amount: "金额",
        status: "状态",
      },
      empty: "该时间段内没有发票。",
    },
    statuses: {
      all: "全部",
      paid: "已支付",
      refunded: "已退款",
      overdue: "已逾期",
    },
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);

const statusTone = {
  paid: "success",
  refunded: "info",
  overdue: "danger",
} as const;

const statusFilter = ref("all");

const invoiceFilters = computed(() =>
  (["all", "paid", "refunded", "overdue"] as const).map((value) => ({
    value,
    label: text.value.statuses[value],
  })),
);

const planDescription = computed(
  () => `${text.value.plan.current} · ${formatDate(currentPlan.renewal, locale.value as Locale)}`,
);
const planPrice = computed(
  () => `${formatCurrency(currentPlan.price, locale.value as Locale)} ${text.value.plan.perMonth}`,
);
const seatsText = computed(() =>
  text.value.plan.seatsValue
    .replace("{used}", String(currentPlan.seatsUsed))
    .replace("{total}", String(currentPlan.seatsTotal)),
);

function formatCardExpiry(value: string) {
  const [year, month] = value.split("-");
  return locale.value === "zh" ? `${year}/${month}` : `${month} / ${year}`;
}

const paymentDescription = computed(
  () =>
    `${paymentMethod.brand} · ${text.value.payment.expires} ${formatCardExpiry(paymentMethod.expires)}`,
);

function invoiceStatus(status: (typeof invoices)[number]["status"]) {
  return text.value.statuses[status];
}

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
  <div class="grid content-start gap-(--bs-gap-lg)">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-(--bs-gap-lg)">
      <Card>
        <Card.Header>
          <Card.Title>{{ text.plan.name }}</Card.Title>
          <Card.Description>{{ planDescription }}</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-(--bs-gap-lg)">
          <span class="font-serif text-3xl">{{ planPrice }}</span>
          <Progress.Root :model-value="currentPlan.seatUse">
            <Progress.Label>{{ text.plan.seats }}</Progress.Label>
            <Progress.ValueText />
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
          <p class="m-0 text-sm text-tertiary">{{ seatsText }}</p>
        </Card.Content>
        <Card.Footer>
          <Button
            size="sm"
            @click="
              toaster.create({
                title: text.plan.changeTitle,
                description: text.plan.changeBody,
                type: 'info',
              })
            "
          >
            {{ text.plan.change }}
          </Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>{{ text.payment.title }}</Card.Title>
          <Card.Description>{{ paymentDescription }}</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-(--bs-gap-sm)">
          <p class="m-0 font-serif text-2xl tracking-[0.2em]">•••• {{ paymentMethod.last4 }}</p>
        </Card.Content>
        <Card.Footer>
          <Button
            variant="outline"
            size="sm"
            @click="
              toaster.create({
                title: text.payment.updateTitle,
                description: text.payment.updateBody,
                type: 'info',
              })
            "
          >
            {{ text.payment.update }}
          </Button>
        </Card.Footer>
      </Card>
    </div>

    <Card>
      <Card.Header>
        <Card.Title>{{ text.invoices.title }}</Card.Title>
        <Card.Description>{{ text.invoices.description }}</Card.Description>
      </Card.Header>
      <Card.Content class="p-0!">
        <div
          class="flex flex-wrap items-center gap-x-(--bs-gap-xl) gap-y-(--bs-gap-md) px-(--bs-padding-lg) py-(--bs-padding-md)"
        >
          <SegmentGroup
            v-model="statusFilter"
            :items="invoiceFilters"
            :aria-label="text.invoices.filter"
          />
          <DatePicker.Root
            v-model="range"
            selection-mode="range"
            :locale="locale === 'zh' ? 'zh-CN' : 'en-US'"
            class="w-auto!"
          >
            <DatePicker.Label class="sr-only">{{ text.invoices.period }}</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.Input :index="0" class="w-28! @max-[28rem]:w-full!" />
              <DatePicker.Input :index="1" class="w-28! @max-[28rem]:w-full!" />
              <DatePicker.Trigger>
                <Icon name="i-lucide-calendar" />
              </DatePicker.Trigger>
              <DatePicker.ClearTrigger>{{ text.invoices.clear }}</DatePicker.ClearTrigger>
            </DatePicker.Control>
            <Teleport to="body">
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <!-- The shortcuts live in the popup: a second row here
                       would lift the inputs off the filter line. -->
                  <div class="flex gap-(--bs-gap-sm)">
                    <DatePicker.PresetTrigger value="lastMonth">
                      {{ text.invoices.lastMonth }}
                    </DatePicker.PresetTrigger>
                    <DatePicker.PresetTrigger value="thisQuarter">
                      {{ text.invoices.thisQuarter }}
                    </DatePicker.PresetTrigger>
                  </div>
                  <DatePicker.View view="day">
                    <DatePicker.Context v-slot="dp">
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger>
                          <Icon name="i-lucide-chevron-left" />
                        </DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>
                          <Icon name="i-lucide-chevron-right" />
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
                          <Icon name="i-lucide-chevron-left" />
                        </DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>
                          <Icon name="i-lucide-chevron-right" />
                        </DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          <DatePicker.TableRow
                            v-for="(months, i) in dp.getMonthsGrid({
                              columns: 4,
                            })"
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
                          <Icon name="i-lucide-chevron-left" />
                        </DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger><DatePicker.RangeText /></DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>
                          <Icon name="i-lucide-chevron-right" />
                        </DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          <DatePicker.TableRow
                            v-for="(years, i) in dp.getYearsGrid({
                              columns: 4,
                            })"
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
        <div class="-mx-1 overflow-x-auto px-(--bs-padding-xs)">
          <table class="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr class="border-b border-border text-start tracking-label text-tertiary">
                <th class="px-(--bs-padding-lg) py-(--bs-padding-sm) text-start font-medium">
                  {{ text.invoices.headers.invoice }}
                </th>
                <th class="px-(--bs-padding-lg) py-(--bs-padding-sm) text-end font-medium">
                  {{ text.invoices.headers.date }}
                </th>
                <th class="px-(--bs-padding-lg) py-(--bs-padding-sm) text-end font-medium">
                  {{ text.invoices.headers.amount }}
                </th>
                <th class="px-(--bs-padding-lg) py-(--bs-padding-sm) text-start font-medium">
                  {{ text.invoices.headers.status }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredInvoices.length === 0">
                <td
                  colspan="4"
                  class="px-(--bs-padding-lg) py-(--bs-padding-xl) text-center text-tertiary"
                >
                  {{ text.invoices.empty }}
                </td>
              </tr>
              <tr
                v-for="invoice in filteredInvoices"
                :key="invoice.id"
                class="border-b border-border last:border-b-0"
              >
                <td class="px-(--bs-padding-lg) py-(--bs-padding-sm) font-medium">
                  {{ invoice.id }}
                </td>
                <td
                  class="px-(--bs-padding-lg) py-(--bs-padding-sm) text-end text-secondary tabular-nums"
                >
                  {{ formatDate(invoice.date, locale as Locale) }}
                </td>
                <td
                  class="px-(--bs-padding-lg) py-(--bs-padding-sm) text-end font-medium tabular-nums"
                >
                  {{ formatCurrency(invoice.amount, locale as Locale, 2) }}
                </td>
                <td class="px-(--bs-padding-lg) py-(--bs-padding-sm)">
                  <Badge :tone="statusTone[invoice.status]" variant="subtle">
                    {{ invoiceStatus(invoice.status) }}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Content>
    </Card>
  </div>
</template>
