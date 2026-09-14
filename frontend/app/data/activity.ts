export type Commit = {
  id: string;
  message: string;
  repository: string;
  sha: string;
  date: string;
  time: string;
  additions: number;
  deletions: number;
  url: string;
};

export const activityStats = {
  currentStreak: 12,
  longestStreak: 27,
  todayCommits: 3,
  todaySubmissions: 2,
  totalCommits: 84,
};

export const commits: Commit[] = [
  {
    id: "1",
    message: "Add binary search solution",
    repository: "leetcode-solutions",
    sha: "8f3a21c",
    date: "Sep 14, 2026",
    time: "10:42 PM",
    additions: 24,
    deletions: 2,
    url: "#",
  },
  {
    id: "2",
    message: "Solve longest substring without repeating characters",
    repository: "leetcode-solutions",
    sha: "92ac812",
    date: "Sep 14, 2026",
    time: "8:16 PM",
    additions: 31,
    deletions: 0,
    url: "#",
  },
  {
    id: "3",
    message: "Add two pointer solution",
    repository: "leetcode-solutions",
    sha: "4bd81fa",
    date: "Sep 14, 2026",
    time: "6:34 PM",
    additions: 18,
    deletions: 1,
    url: "#",
  },
  {
    id: "4",
    message: "Implement sliding window solution",
    repository: "leetcode-solutions",
    sha: "1bc91de",
    date: "Sep 13, 2026",
    time: "9:21 PM",
    additions: 27,
    deletions: 3,
    url: "#",
  },
  {
    id: "5",
    message: "Add stack based solution",
    repository: "leetcode-solutions",
    sha: "7d92aa1",
    date: "Sep 13, 2026",
    time: "7:48 PM",
    additions: 16,
    deletions: 0,
    url: "#",
  },
  {
    id: "6",
    message: "Refactor array utilities",
    repository: "coding-platform",
    sha: "a72f9c4",
    date: "Sep 12, 2026",
    time: "10:12 PM",
    additions: 42,
    deletions: 18,
    url: "#",
  },
  {
    id: "7",
    message: "Add linked list reversal solution",
    repository: "leetcode-solutions",
    sha: "c81b332",
    date: "Sep 12, 2026",
    time: "8:37 PM",
    additions: 22,
    deletions: 0,
    url: "#",
  },
  {
    id: "8",
    message: "Fix edge case in merge intervals",
    repository: "leetcode-solutions",
    sha: "e29f7ab",
    date: "Sep 11, 2026",
    time: "9:05 PM",
    additions: 8,
    deletions: 4,
    url: "#",
  },
  {
    id: "9",
    message: "Add merge intervals solution",
    repository: "leetcode-solutions",
    sha: "f17c821",
    date: "Sep 10, 2026",
    time: "10:28 PM",
    additions: 35,
    deletions: 0,
    url: "#",
  },
];
