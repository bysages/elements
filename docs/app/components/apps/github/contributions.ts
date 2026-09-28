export interface ContributionDay {
  week: number;
  weekday: number;
  date: Date;
  commits: number;
  tier: number;
}

// A seeded ramp keeps the wall identical on server and client — the
// year is simulated, but it always simulates the same year.
function seeded(seed: number) {
  return () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

const WEEKS = 52;
const rand = seeded(20260928);
const START = Date.UTC(2025, 9, 5);

export const contributionDays: ContributionDay[] = Array.from({ length: WEEKS * 7 }, (_, i) => {
  const weekday = i % 7;
  // Weekends rest more often — the way a real working season breathes.
  const weekend = weekday >= 5 ? 0.4 : 1;
  const commits = Math.floor(rand() * 21 * weekend);
  return {
    week: Math.floor(i / 7),
    weekday,
    date: new Date(START + i * 86400000),
    commits,
    tier: commits === 0 ? 0 : Math.min(4, Math.ceil(commits / 5)),
  };
});

export const contributionTotal = contributionDays.reduce((sum, d) => sum + d.commits, 0);
