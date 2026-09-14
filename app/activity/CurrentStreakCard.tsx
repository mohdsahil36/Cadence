import {
  ArrowLeft,
  Flame,
  GitCommit,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

import { activityStats, commits } from "../data/activity";

export default function ActivityPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">Activity</h1>

          <p className="text-xs text-muted-foreground">
            Your coding activity and streak
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={<Flame className="h-4 w-4" />}
          label="Current streak"
          value={`${activityStats.currentStreak} days`}
        />

        <StatCard
          icon={<Trophy className="h-4 w-4" />}
          label="Longest streak"
          value={`${activityStats.longestStreak} days`}
        />

        <StatCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Today's activity"
          value={`${activityStats.todaySubmissions} submissions`}
        />

        <StatCard
          icon={<GitCommit className="h-4 w-4" />}
          label="Today's commits"
          value={activityStats.todayCommits.toString()}
        />
      </section>

      {/* Today's activity */}
      <section className="mt-7">
        <div className="mb-3">
          <h2 className="text-sm font-semibold">Today&apos;s activity</h2>
        </div>

        <div className="rounded-xl border border-border bg-card px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                September 14, 2026
              </p>

              <p className="mt-1 text-lg font-semibold">
                {activityStats.todayCommits} commits
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border">
              <Flame className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[75%] rounded-full bg-foreground" />
          </div>

          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>Activity</span>
            <span>3 / 4 commits</span>
          </div>
        </div>
      </section>

      {/* Commits */}
      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Recent commits</h2>

            <p className="text-xs text-muted-foreground">
              Your latest coding activity
            </p>
          </div>

          <span className="text-xs text-muted-foreground">
            {activityStats.totalCommits} total
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
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
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border">
          {icon}
        </div>

        <span className="text-xs text-muted-foreground">{label}</span>
      </div>

      <p className="mt-2 text-lg font-semibold tracking-tight">{value}</p>
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
      className={`px-4 py-3.5 transition-colors hover:bg-muted/40 ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border">
          <GitCommit className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="truncate text-sm font-medium">{commit.message}</h3>

            <span className="shrink-0 text-[11px] text-muted-foreground">
              {commit.date} · {commit.time}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span>{commit.repository}</span>

            <span>•</span>

            <span className="font-mono">{commit.sha}</span>
          </div>

          <div className="mt-2 flex items-center gap-3 text-[11px]">
            <span className="text-muted-foreground">
              <span className="text-foreground">+{commit.additions}</span>{" "}
              additions
            </span>

            <span className="text-muted-foreground">
              <span className="text-foreground">-{commit.deletions}</span>{" "}
              deletions
            </span>

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
