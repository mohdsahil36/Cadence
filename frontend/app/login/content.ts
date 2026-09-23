export const loginContent = {
  brand: "Cadence",
  nav: {
    signIn: "Sign in",
    howItWorks: "How it works",
  },
  hero: {
    badge: "Commit intelligence",
    titleLead: "Understand how you",
    titleAccent: "build.",
    cursive: "Commits, streaks, quiet hours — already a story.",
    body: "Cadence turns the pace of your work into something you can actually see.",
    primaryCta: "Connect with GitHub",
    secondaryCta: "See how it works",
    trust: ["Private by default", "Scoped OAuth", "Repos you choose"],
    product: {
      header: "This week",
      live: "Live preview",
      streak: "12 day streak",
      commits: "47 commits",
      quiet: "Quiet 1–5am",
      repos: "3 repos synced",
      footnote: "Sample rhythm — yours appears after GitHub",
    },
  },
  auth: {
    eyebrow: "Welcome",
    title: "Your code.",
    titleAccent: "Your cadence.",
    body: "Connect GitHub to begin. We only sync what you choose.",
    cta: "Continue with GitHub",
    divider: "private by default",
    chips: [
      { label: "Access", value: "Repos you choose" },
      { label: "Sync", value: "Live commits" },
    ],
    privacy:
      "Cadence only accesses GitHub data for the repositories you choose.",
    close: "Close",
  },
  steps: {
    eyebrow: "How it works",
    title: "Three quiet steps.",
    cursive: "from connect to clarity",
    hint: "A technical bento — hover the cells.",
    bento: {
      connect: {
        title: "Connect",
        body: "Link GitHub in one OAuth click. Tokens stay scoped to the repos you approve.",
        terminal: "> connect github --scoped",
        snippet: [
          "const cadence = await auth.github()",
          'cadence.scope(["repos:read"])',
        ],
      },
      select: {
        title: "Select",
        body: "Track only the workstreams that matter.",
        features: [
          "Repos you choose",
          "Live commit sync",
          "Ignore noise",
          "Private by default",
        ],
      },
      discover: {
        title: "Discover",
        body: "Commits, streaks and quiet hours as a clear rhythm.",
        chips: ["Commits", "Streaks", "Quiet hours", "Rhythm", "+"],
      },
      private: {
        title: "Private",
        body: "Your graph stays yours. Nothing public by default.",
        badge: "locked",
      },
      scoped: {
        title: "Scoped",
        body: "OAuth stays narrow — repos you pick, nothing else.",
        pieces: ["OAuth", "Repos", "Sync", "You"],
      },
    },
  },
  close: {
    eyebrow: "Ready when you are",
    title: "Start reading your rhythm.",
    cursive: "no setup theatre — just GitHub",
    cta: "Sign in with GitHub",
  },
} as const;

export type LoginStepId = keyof typeof loginContent.steps.bento;
