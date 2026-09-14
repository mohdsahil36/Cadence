"use client";

import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { activityStats } from "../data/activity";

export default function CurrentStreakCard() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/activity")}
      className="group flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5 text-left transition-colors hover:bg-muted cursor-pointer"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background">
        <Flame className="h-4 w-4 text-foreground" />
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Current streak</span>

        <span className="text-sm font-medium text-foreground">
          {activityStats.currentStreak} days
        </span>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
