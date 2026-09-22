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
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
  description: string;
}

export const statFigures: StatFigure[] = [
  {
    label: "Monthly recurring",
    value: "$18,240",
    delta: "↑ 4.2%",
    direction: "up",
    description: "Against last month",
  },
  {
    label: "Active accounts",
    value: "42",
    delta: "↑ 3",
    direction: "up",
    description: "Two trials converted",
  },
  {
    label: "Churn rate",
    value: "2.1%",
    delta: "↓ 0.4%",
    direction: "up",
    description: "Lowest in a year",
  },
  {
    label: "Avg. contract",
    value: "$1,860",
    delta: "— 0.0%",
    direction: "flat",
    description: "Holding steady",
  },
];
