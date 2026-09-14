import { Flame, GitCommit, Trophy, CheckCircle2 } from "lucide-react";

import { activityStats, commits } from "../data/activity";

export default function ActivityPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">Your coding activity</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Activity & Streak
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Keep building consistently. Your activity, streak and recent commits
          will appear here.
        </p>
      </div>

      {/* Stats */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="Current streak"
          value={`${activityStats.currentStreak} days`}
        />

        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Longest streak"
          value={`${activityStats.longestStreak} days`}
        />

        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Today's activity"
          value={`${activityStats.todaySubmissions} submissions`}
        />

        <StatCard
          icon={<GitCommit className="h-5 w-5" />}
          label="Today's commits"
          value={activityStats.todayCommits.toString()}
        />
      </section>

      {/* Today's Activity */}
      <section className="mt-10">
        <div>
          <h2 className="text-lg font-semibold">Today&apos;s activity</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your coding activity for today.
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                September 14, 2026
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {activityStats.todayCommits} commits
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[75%] rounded-full bg-foreground" />
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Keep going to maintain your streak.
          </p>
        </div>
      </section>

      {/* Commits */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent commits</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest coding activity from GitHub.
            </p>
          </div>

          <span className="text-sm text-muted-foreground">
            {activityStats.totalCommits} total
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          {commits.map((commit, index) => (
            <CommitItem
              key={commit.id}
              commit={commit}
              isLast={index === commits.length - 1}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>

        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function CommitItem({
  commit,
  isLast,
}: {
  commit: (typeof commits)[number];
  isLast: boolean;
}) {
  return (
    <div
      className={`p-5 transition hover:bg-muted/40 ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <div className="flex gap-4">
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <GitCommit className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium">{commit.message}</h3>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span>{commit.repository}</span>

                <span>•</span>

                <span className="font-mono">{commit.sha}</span>
              </div>
            </div>

            <span className="shrink-0 text-xs text-muted-foreground">
              {commit.date} · {commit.time}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="text-green-600">+{commit.additions}</span>

            <span className="text-red-500">-{commit.deletions}</span>

            <a
              href={commit.url}
              className="ml-auto text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              View commit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
