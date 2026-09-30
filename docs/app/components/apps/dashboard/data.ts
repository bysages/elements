export type Locale = "en" | "zh";

export type OrderStatus = "active" | "trial" | "paused" | "churned";

export interface OrderRow {
  id: string;
  customer: string;
  region: string;
  status: OrderStatus;
  mrr: number;
  since: string;
}

/** A quarter of accounts. `since` rides ISO months so the default
 * string sort is also the chronological one. */
export const orders: OrderRow[] = [
  {
    id: "o-01",
    customer: "Jiangnan Textile",
    region: "Hangzhou",
    status: "active",
    mrr: 1840,
    since: "2024-11",
  },
  {
    id: "o-02",
    customer: "Orient Freight",
    region: "Shanghai",
    status: "active",
    mrr: 2460,
    since: "2023-06",
  },
  {
    id: "o-03",
    customer: "Cranfield Labs",
    region: "Boston",
    status: "trial",
    mrr: 0,
    since: "2025-08",
  },
  {
    id: "o-04",
    customer: "Meridian Health",
    region: "Chicago",
    status: "active",
    mrr: 3120,
    since: "2022-03",
  },
  {
    id: "o-05",
    customer: "Zhusha Ceramics",
    region: "Jingdezhen",
    status: "paused",
    mrr: 640,
    since: "2024-02",
  },
  {
    id: "o-06",
    customer: "Northwind Legal",
    region: "Toronto",
    status: "active",
    mrr: 1480,
    since: "2023-09",
  },
  {
    id: "o-07",
    customer: "Qinghua Analytics",
    region: "Beijing",
    status: "trial",
    mrr: 0,
    since: "2025-09",
  },
  {
    id: "o-08",
    customer: "Alder & Vine",
    region: "Portland",
    status: "churned",
    mrr: 0,
    since: "2023-01",
  },
  {
    id: "o-09",
    customer: "Celadon Hotels",
    region: "Suzhou",
    status: "active",
    mrr: 2260,
    since: "2024-05",
  },
  {
    id: "o-10",
    customer: "Harbor Survey",
    region: "Auckland",
    status: "active",
    mrr: 980,
    since: "2024-08",
  },
  {
    id: "o-11",
    customer: "Inkstone Press",
    region: "Hangzhou",
    status: "paused",
    mrr: 320,
    since: "2023-12",
  },
  {
    id: "o-12",
    customer: "Fairmount Schools",
    region: "Philadelphia",
    status: "active",
    mrr: 1740,
    since: "2022-10",
  },
  {
    id: "o-13",
    customer: "Bamboo Ridge Tea",
    region: "Hangzhou",
    status: "active",
    mrr: 520,
    since: "2025-01",
  },
  {
    id: "o-14",
    customer: "Sable & Co.",
    region: "London",
    status: "trial",
    mrr: 0,
    since: "2025-07",
  },
  {
    id: "o-15",
    customer: "Westloop Logistics",
    region: "Denver",
    status: "active",
    mrr: 2880,
    since: "2023-04",
  },
  {
    id: "o-16",
    customer: "Grand Canal Tours",
    region: "Suzhou",
    status: "churned",
    mrr: 0,
    since: "2022-07",
  },
];

const regionLabels: Record<string, Record<Locale, string>> = {
  Hangzhou: { en: "Hangzhou", zh: "杭州" },
  Shanghai: { en: "Shanghai", zh: "上海" },
  Boston: { en: "Boston", zh: "波士顿" },
  Chicago: { en: "Chicago", zh: "芝加哥" },
  Jingdezhen: { en: "Jingdezhen", zh: "景德镇" },
  Toronto: { en: "Toronto", zh: "多伦多" },
  Beijing: { en: "Beijing", zh: "北京" },
  Portland: { en: "Portland", zh: "波特兰" },
  Suzhou: { en: "Suzhou", zh: "苏州" },
  Auckland: { en: "Auckland", zh: "奥克兰" },
  Philadelphia: { en: "Philadelphia", zh: "费城" },
  London: { en: "London", zh: "伦敦" },
  Denver: { en: "Denver", zh: "丹佛" },
};

export function formatRegion(region: string, locale: Locale) {
  return regionLabels[region]?.[locale] ?? region;
}

export function formatCurrency(amount: number, locale: Locale, fractionDigits = 0) {
  return amount.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: locale === "zh" ? "CNY" : "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

const englishMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatYearMonth(value: string, locale: Locale) {
  const [year, month] = value.split("-").map(Number) as [number, number];
  return locale === "zh" ? `${year}年${month}月` : `${englishMonths[month - 1]} ${year}`;
}

export function formatDate(value: string, locale: Locale) {
  const [year, month, day] = value.split("-").map(Number) as [number, number, number];
  return locale === "zh"
    ? `${year}年${month}月${day}日`
    : `${englishMonths[month - 1]} ${day}, ${year}`;
}

export const monthlyRevenue = [
  { month: "Oct", revenue: 128 },
  { month: "Nov", revenue: 141 },
  { month: "Dec", revenue: 136 },
  { month: "Jan", revenue: 158 },
  { month: "Feb", revenue: 171 },
  { month: "Mar", revenue: 166 },
  { month: "Apr", revenue: 182 },
  { month: "May", revenue: 194 },
  { month: "Jun", revenue: 189 },
  { month: "Jul", revenue: 205 },
  { month: "Aug", revenue: 214 },
  { month: "Sep", revenue: 223 },
];

export const weeklyTrend = [
  { day: "Mon", sessions: 318 },
  { day: "Tue", sessions: 356 },
  { day: "Wed", sessions: 342 },
  { day: "Thu", sessions: 401 },
  { day: "Fri", sessions: 428 },
  { day: "Sat", sessions: 236 },
  { day: "Sun", sessions: 204 },
];

export interface StatFigure {
  id: "mrr" | "activeAccounts" | "churnRate" | "avgContract";
  direction: "up" | "down" | "flat";
}

export const statFigures: StatFigure[] = [
  { id: "mrr", direction: "up" },
  { id: "activeAccounts", direction: "up" },
  { id: "churnRate", direction: "up" },
  { id: "avgContract", direction: "flat" },
];

// ---------------------------------------------------------------------------
// Billing

export const currentPlan = {
  name: "Scale",
  seatsUsed: 24,
  seatsTotal: 30,
  renewal: "2026-11-01",
  price: 499,
  seatUse: 80,
};

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "refunded" | "overdue";
}

/** The newest first - the ledger reads top down. */
export const invoices: Invoice[] = [
  { id: "INV-2041", date: "2026-10-01", amount: 499, status: "paid" },
  { id: "INV-1996", date: "2026-09-01", amount: 499, status: "paid" },
  { id: "INV-1932", date: "2026-08-01", amount: 521, status: "refunded" },
  { id: "INV-1877", date: "2026-07-01", amount: 499, status: "paid" },
  { id: "INV-1821", date: "2026-06-01", amount: 466, status: "overdue" },
];

export const paymentMethod = {
  brand: "Visa",
  last4: "4242",
  expires: "2028-08",
};

// ---------------------------------------------------------------------------
// Reports

/** Twelve months of expansion - the same span the revenue chart covers,
 * plotted as collected cash against the plan. */
export const cashCollected = [
  { month: "Oct", cash: 118 },
  { month: "Nov", cash: 129 },
  { month: "Dec", cash: 125 },
  { month: "Jan", cash: 147 },
  { month: "Feb", cash: 163 },
  { month: "Mar", cash: 159 },
  { month: "Apr", cash: 171 },
  { month: "May", cash: 186 },
  { month: "Jun", cash: 181 },
  { month: "Jul", cash: 196 },
  { month: "Aug", cash: 208 },
  { month: "Sep", cash: 217 },
];

export interface ChannelRow {
  id: "direct" | "marketplace" | "outbound" | "events";
  share: number;
  accounts: number;
}

export const channels: ChannelRow[] = [
  { id: "direct", share: 46, accounts: 19 },
  { id: "marketplace", share: 27, accounts: 11 },
  { id: "outbound", share: 17, accounts: 7 },
  { id: "events", share: 10, accounts: 5 },
];

// ---------------------------------------------------------------------------
// Settings

export const consoleSettings = {
  workspace: "By Sages Console",
  email: "sage@example.com",
  timezone: "GMT+8",
  density: "comfortable",
  digest: true,
  anomalyAlerts: true,
  weeklyReport: false,
};
