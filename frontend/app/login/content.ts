export const loginContent = {
  brand: "Cadence",
  nav: {
    signIn: "Sign in",
    getStarted: "Get started",
  },
  hero: {
    eyebrow: "Engineering rhythm",
    title: "Understand how you build.",
    cursive: "Commits, streaks, quiet hours — already a story.",
    body: "Cadence turns the pace of your work into something you can actually see, without asking you to change how you ship.",
    primaryCta: "Get started",
    secondaryCta: "See how it works",
    notes: [
      { label: "Signal", value: "Commits & streaks" },
      { label: "Access", value: "Repos you choose" },
      { label: "Privacy", value: "Scoped OAuth" },
    ],
    showcase: [
      {
        id: "pulse",
        number: "01",
        title: "Your pulse",
        caption: "Every commit lands like a beat in the fog.",
      },
      {
        id: "streak",
        number: "02",
        title: "Your streak",
        caption: "Consistency made visible — without the noise.",
      },
      {
        id: "quiet",
        number: "03",
        title: "Quiet hours",
        caption: "The gaps between work tell their own story.",
      },
    ],
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
    hint: "Hover a card for a closer look.",
    items: [
      {
        id: "connect",
        number: "01",
        title: "Connect",
        description: "Securely link your GitHub account in one click.",
        detail: "OAuth keeps tokens scoped to the repos you approve.",
        hoverLabel: "Linked",
      },
      {
        id: "select",
        number: "02",
        title: "Select",
        description: "Pick the repositories you want Cadence to follow.",
        detail: "Ignore noise. Track only the workstreams that matter.",
        hoverLabel: "3 repos",
      },
      {
        id: "discover",
        number: "03",
        title: "Discover",
        description: "Read commits, streaks and patterns as a clear rhythm.",
        detail: "Quiet hours become insight you can act on.",
        hoverLabelIdle: "99.9%",
        hoverLabelActive: "+12 today",
      },
    ],
  },
  close: {
    eyebrow: "Ready when you are",
    title: "Start reading your rhythm.",
    cursive: "no setup theatre — just GitHub",
    cta: "Sign in with GitHub",
  },
} as const;

export type LoginStepId = (typeof loginContent.steps.items)[number]["id"];
