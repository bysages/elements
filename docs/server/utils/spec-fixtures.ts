interface SpecPatch {
  op: "add";
  path: string;
  value: unknown;
}

interface SpecFixture {
  /** Any of these substrings in the prompt (lowercased) selects the fixture. */
  match: string[];
  patches: SpecPatch[];
}

const dashboard: SpecFixture = {
  match: ["dashboard", "metric", "progress", "仪表盘", "指标", "进度", "营收"],
  patches: [
    { op: "add", path: "/root", value: "dashboard" },
    {
      op: "add",
      path: "/elements/dashboard",
      value: {
        type: "Stack",
        props: { direction: "column", gap: "lg" },
        children: ["page-header", "metrics-grid", "progress-card"],
      },
    },
    {
      op: "add",
      path: "/elements/page-header",
      value: {
        type: "PageHeader",
        props: {
          title: "Revenue Dashboard",
          description: "Current performance and progress toward quarterly targets",
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/metrics-grid",
      value: {
        type: "Grid",
        props: { columns: 4, gap: "md" },
        repeat: { statePath: "/metrics", key: "id" },
        children: ["metric-stat"],
      },
    },
    {
      op: "add",
      path: "/elements/metric-stat",
      value: {
        type: "Stat",
        props: {
          label: { $item: "label" },
          value: { $item: "value" },
          change: { $item: "change" },
          direction: { $item: "direction" },
        },
        children: [],
      },
    },
    { op: "add", path: "/state/metrics", value: [] },
    {
      op: "add",
      path: "/state/metrics/0",
      value: {
        id: "mrr",
        label: "Monthly Recurring Revenue",
        value: "$248,500",
        change: "12.4% MoM",
        direction: "up",
      },
    },
    {
      op: "add",
      path: "/state/metrics/1",
      value: {
        id: "arr",
        label: "Annual Recurring Revenue",
        value: "$2.98M",
        change: "8.2% QoQ",
        direction: "up",
      },
    },
    {
      op: "add",
      path: "/state/metrics/2",
      value: {
        id: "new-revenue",
        label: "New Revenue",
        value: "$61,200",
        change: "4.1% QoQ",
        direction: "down",
      },
    },
    {
      op: "add",
      path: "/state/metrics/3",
      value: {
        id: "collection",
        label: "Collection Rate",
        value: "94.6%",
        change: "0.3 pts",
        direction: "flat",
      },
    },
    {
      op: "add",
      path: "/elements/progress-card",
      value: {
        type: "Card",
        props: {
          title: "Progress Overview",
          description: "Track completion against the current revenue target",
        },
        children: ["progress-stack"],
      },
    },
    {
      op: "add",
      path: "/elements/progress-stack",
      value: {
        type: "Stack",
        props: { direction: "column", gap: "md" },
        children: ["overall-progress", "segment-progress"],
      },
    },
    {
      op: "add",
      path: "/elements/overall-progress",
      value: {
        type: "Progress",
        props: {
          label: { $state: "/progress/label" },
          value: { $state: "/progress/overall" },
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/segment-progress",
      value: {
        type: "ProgressGroup",
        props: { segments: { $state: "/progress/segments" } },
        children: [],
      },
    },
    {
      op: "add",
      path: "/state/progress",
      value: {
        label: "Q4 revenue target",
        overall: 72,
        segments: [],
      },
    },
    { op: "add", path: "/state/progress/segments/0", value: { label: "Subscriptions", value: 84 } },
    { op: "add", path: "/state/progress/segments/1", value: { label: "Expansion", value: 63 } },
    { op: "add", path: "/state/progress/segments/2", value: { label: "New business", value: 41 } },
    { op: "add", path: "/state/progress/segments/3", value: { label: "Renewals", value: 78 } },
  ],
};

const signupForm: SpecFixture = {
  match: ["signup", "sign up", "form", "报名", "表单", "注册"],
  patches: [
    { op: "add", path: "/root", value: "main" },
    {
      op: "add",
      path: "/elements/main",
      value: {
        type: "Stack",
        props: { direction: "column", gap: "md" },
        children: ["form-card"],
      },
    },
    {
      op: "add",
      path: "/elements/form-card",
      value: {
        type: "Card",
        props: {
          title: "Create your account",
          description: "Enter your details to get started.",
        },
        children: ["signup-form", "form-result"],
      },
    },
    {
      op: "add",
      path: "/elements/signup-form",
      value: {
        type: "Form",
        props: {},
        children: ["name-field", "email-field", "terms-field", "submit-row"],
      },
    },
    {
      op: "add",
      path: "/elements/name-field",
      value: {
        type: "Field",
        props: { label: "Full name", hint: "Please enter your legal name.", required: true },
        children: ["name-input"],
      },
    },
    {
      op: "add",
      path: "/elements/name-input",
      value: {
        type: "Input",
        props: { placeholder: "Ada Lovelace", type: "text", value: { $bindState: "/form/name" } },
        children: [],
      },
    },
    { op: "add", path: "/state/form", value: { name: "", email: "", terms: false } },
    {
      op: "add",
      path: "/elements/email-field",
      value: {
        type: "Field",
        props: { label: "Email", hint: "We'll use this to verify your account.", required: true },
        children: ["email-input"],
      },
    },
    {
      op: "add",
      path: "/elements/email-input",
      value: {
        type: "Input",
        props: {
          placeholder: "you@example.com",
          type: "email",
          value: { $bindState: "/form/email" },
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/terms-field",
      value: {
        type: "Field",
        props: { label: "Terms", hint: "Required to continue.", required: true },
        children: ["terms-switch"],
      },
    },
    {
      op: "add",
      path: "/elements/terms-switch",
      value: {
        type: "Switch",
        props: {
          label: "I agree to the Terms of Service and Privacy Policy",
          checked: { $bindState: "/form/terms" },
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/submit-row",
      value: {
        type: "Stack",
        props: { direction: "row", gap: "md" },
        children: ["submit-button"],
      },
    },
    {
      op: "add",
      path: "/elements/submit-button",
      value: {
        type: "Button",
        props: { label: "Sign up", variant: "solid", size: "md" },
        on: { press: { action: "validateForm", params: { statePath: "/formValidation" } } },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/form-result",
      value: {
        type: "Alert",
        props: {
          status: "success",
          title: "Account created",
          message: "Your signup information is valid.",
        },
        visible: { $state: "/formValidation/valid", eq: true },
        children: [],
      },
    },
    { op: "add", path: "/state/formValidation", value: { valid: false, errors: {} } },
  ],
};

const roster: SpecFixture = {
  match: ["roster", "team", "member", "名录", "团队", "成员"],
  patches: [
    { op: "add", path: "/root", value: "main-stack" },
    {
      op: "add",
      path: "/elements/main-stack",
      value: {
        type: "Stack",
        props: { direction: "column", gap: "xl" },
        children: ["page-header", "stats-grid", "directory-card"],
      },
    },
    {
      op: "add",
      path: "/elements/page-header",
      value: {
        type: "PageHeader",
        props: {
          title: "Team Roster",
          description: "Avatars, roles, availability, and skill badges for the delivery team.",
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/stats-grid",
      value: {
        type: "Grid",
        props: { columns: 4, gap: "md" },
        children: ["stat-members", "stat-roles", "stat-departments", "stat-online"],
      },
    },
    {
      op: "add",
      path: "/elements/stat-members",
      value: {
        type: "Stat",
        props: {
          label: "Team members",
          value: { $state: "/stats/members" },
          change: "+1 this quarter",
          direction: "up",
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/stat-roles",
      value: {
        type: "Stat",
        props: {
          label: "Distinct roles",
          value: { $state: "/stats/roles" },
          change: "Across all squads",
          direction: "up",
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/stat-departments",
      value: {
        type: "Stat",
        props: {
          label: "Departments",
          value: { $state: "/stats/departments" },
          direction: "flat",
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/stat-online",
      value: {
        type: "Stat",
        props: {
          label: "Available now",
          value: { $state: "/stats/online" },
          change: "UTC overlap",
          direction: "up",
        },
        children: [],
      },
    },
    {
      op: "add",
      path: "/state/stats",
      value: { members: 6, roles: 6, departments: 5, online: 3 },
    },
    {
      op: "add",
      path: "/elements/directory-card",
      value: {
        type: "Card",
        props: {
          title: "Member directory",
          description: "Each profile uses initials, role badges, status, and skills.",
        },
        children: ["roster-list"],
      },
    },
    {
      op: "add",
      path: "/elements/roster-list",
      value: {
        type: "Grid",
        props: { columns: 2, gap: "md" },
        repeat: { statePath: "/roster", key: "id" },
        children: ["roster-card"],
      },
    },
    {
      op: "add",
      path: "/elements/roster-card",
      value: {
        type: "Card",
        props: { title: { $item: "name" }, description: { $item: "location" } },
        children: ["member-body"],
      },
    },
    {
      op: "add",
      path: "/elements/member-body",
      value: {
        type: "Stack",
        props: { direction: "column", gap: "md" },
        children: ["member-profile", "member-contact", "member-badges", "member-skills"],
      },
    },
    {
      op: "add",
      path: "/elements/member-profile",
      value: {
        type: "Stack",
        props: { direction: "row", gap: "md", align: "center" },
        children: ["member-avatar", "member-presence"],
      },
    },
    {
      op: "add",
      path: "/elements/member-avatar",
      value: { type: "Avatar", props: { name: { $item: "name" }, size: "lg" }, children: [] },
    },
    {
      op: "add",
      path: "/elements/member-presence",
      value: {
        type: "Badge",
        props: { text: { $item: "status" }, tone: { $item: "statusTone" }, variant: "subtle" },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/member-contact",
      value: {
        type: "Stack",
        props: { direction: "column", gap: "xs" },
        children: ["member-email", "member-timezone"],
      },
    },
    {
      op: "add",
      path: "/elements/member-email",
      value: {
        type: "Text",
        props: { variant: "body", text: { $template: "Email: ${email}" } },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/member-timezone",
      value: {
        type: "Text",
        props: { variant: "label", text: { $template: "Timezone: ${timezone}" } },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/member-badges",
      value: {
        type: "Stack",
        props: { direction: "row", gap: "xs", wrap: true },
        children: ["role-badge", "department-badge"],
      },
    },
    {
      op: "add",
      path: "/elements/role-badge",
      value: {
        type: "Badge",
        props: { text: { $template: "Role: ${role}" }, tone: "blue", variant: "solid" },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/department-badge",
      value: {
        type: "Badge",
        props: { text: { $template: "Dept: ${department}" }, tone: "purple", variant: "subtle" },
        children: [],
      },
    },
    {
      op: "add",
      path: "/elements/member-skills",
      value: {
        type: "Stack",
        props: { direction: "row", gap: "xs", wrap: true },
        repeat: { statePath: { $item: "skills" } },
        children: ["skill-badge"],
      },
    },
    {
      op: "add",
      path: "/elements/skill-badge",
      value: {
        type: "Badge",
        props: { text: { $item: "label" }, tone: { $item: "tone" }, variant: "outline" },
        children: [],
      },
    },
    { op: "add", path: "/state/roster", value: [] },
    {
      op: "add",
      path: "/state/roster/0",
      value: {
        id: "1",
        name: "Amara Okonkwo",
        role: "Product Manager",
        department: "Product",
        status: "Online",
        statusTone: "green",
        timezone: "UTC+1",
        email: "amara@northwind.dev",
        location: "Lisbon",
        skills: [
          { label: "Roadmaps", tone: "blue" },
          { label: "User Research", tone: "purple" },
          { label: "Release Notes", tone: "teal" },
        ],
      },
    },
    {
      op: "add",
      path: "/state/roster/1",
      value: {
        id: "2",
        name: "Kenji Sato",
        role: "Staff Engineer",
        department: "Engineering",
        status: "Focused",
        statusTone: "amber",
        timezone: "UTC+9",
        email: "kenji@northwind.dev",
        location: "Tokyo",
        skills: [
          { label: "Platform", tone: "blue" },
          { label: "APIs", tone: "purple" },
          { label: "Performance", tone: "green" },
        ],
      },
    },
    {
      op: "add",
      path: "/state/roster/2",
      value: {
        id: "3",
        name: "Lucía Mendes",
        role: "Product Designer",
        department: "Design",
        status: "Remote",
        statusTone: "cyan",
        timezone: "UTC+0",
        email: "lucia@northwind.dev",
        location: "Lisbon",
        skills: [
          { label: "Design Systems", tone: "blue" },
          { label: "Prototyping", tone: "purple" },
          { label: "Accessibility", tone: "teal" },
        ],
      },
    },
    {
      op: "add",
      path: "/state/roster/3",
      value: {
        id: "4",
        name: "Priya Raman",
        role: "QA Engineer",
        department: "Engineering",
        status: "Online",
        statusTone: "green",
        timezone: "UTC+5:30",
        email: "priya@northwind.dev",
        location: "Bengaluru",
        skills: [
          { label: "Testing", tone: "blue" },
          { label: "Automation", tone: "purple" },
          { label: "Risk Review", tone: "amber" },
        ],
      },
    },
    {
      op: "add",
      path: "/state/roster/4",
      value: {
        id: "5",
        name: "Mateo Alvarez",
        role: "Support Lead",
        department: "Support",
        status: "Away",
        statusTone: "gray",
        timezone: "UTC+2",
        email: "mateo@northwind.dev",
        location: "Madrid",
        skills: [
          { label: "Incident Triage", tone: "red" },
          { label: "Escalations", tone: "amber" },
          { label: "Customer Care", tone: "blue" },
        ],
      },
    },
    {
      op: "add",
      path: "/state/roster/5",
      value: {
        id: "6",
        name: "Nina Petrova",
        role: "Data Scientist",
        department: "Analytics",
        status: "Busy",
        statusTone: "red",
        timezone: "UTC+3",
        email: "nina@northwind.dev",
        location: "Berlin",
        skills: [
          { label: "ML", tone: "purple" },
          { label: "Experimentation", tone: "blue" },
          { label: "Dashboards", tone: "green" },
        ],
      },
    },
  ],
};

/** Recorded streams from the gateway, replayed so the studio demo
 * speaks without a credential on the wire. The signup form doubles as
 * the fallback — a form is the most generic thing to compose. */
const SPEC_FIXTURES = [dashboard, signupForm, roster];

export function pickSpecFixture(prompt: string): SpecPatch[] {
  const body = prompt.toLowerCase();
  const fixture =
    SPEC_FIXTURES.find((entry) => entry.match.some((keyword) => body.includes(keyword))) ??
    SPEC_FIXTURES[1];
  return fixture.patches;
}
