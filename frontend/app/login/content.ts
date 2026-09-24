export const loginContent = {
  brand: "Nocta",
  nav: {
    howItWorks: "How it works",
    about: "About",
    cta: "Get started",
  },
  hero: {
    wordmark: "Nocta",
    title: "Decide tonight",
    tagline: "One meaningful action, every night.",
    body: "Each evening, Nocta scores your goals, picks one next step, and protects rest when you need it.",
    rotating: [
      "Deadlines and neglect — not noise — set the score.",
      "One next step. Then the night is yours.",
      "Recovery nights count. Rest is a valid priority.",
      "Quiet categories rise when they have waited too long.",
      "Leave the desk with clarity, not another list.",
    ],
    primaryCta: "Start tonight",
    secondaryCta: "See how it works",
  },
  why: {
    eyebrow: "Why Nocta exists",
    before: "After work the list never ended, and the night was already short.",
    // Core idea — italic serif, lights up on scroll
    emphasis: "Score what matters. Pick one next step.",
    after: "Let rest stay honest.",
  },
  features: {
    title: "How Nocta works.",
    items: [
      {
        id: "scoring",
        title: "Deterministic scoring",
        description:
          "Clear rules on deadlines and neglect decide priority — never a model guessing what matters.",
        span: "third",
      },
      {
        id: "one-action",
        title: "One action, not a list",
        description:
          "Tonight ends with a single next step, so you close the laptop knowing what mattered.",
        span: "two-thirds",
      },
      {
        id: "reflection",
        title: "Weekly reflection",
        description:
          "A short weekly pass to notice patterns — without turning life into a dashboard.",
        span: "third",
      },
      {
        id: "recovery",
        title: "Recovery nights",
        description:
          "Some nights the right action is rest. Nocta protects that choice without guilt.",
        span: "third",
      },
      {
        id: "neglected",
        title: "Neglected-area tracking",
        description:
          "Quiet goal categories surface when they have been ignored for too long.",
        span: "third",
      },
    ],
  },
  close: {
    title: "Tonight, do one thing that matters",
    body: "Open Nocta after work, see the score, and choose a single action before you sleep.",
    cta: "Get started",
    trust: "Built by a developer job-hunting after work",
  },
  auth: {
    title: "Start tonight",
    body: "Account and sync ship in a later build. For now, explore how Nocta thinks.",
    // deferred to v2: real auth + session
    cta: "Continue",
    close: "Close",
  },
} as const;

export type NoctaFeatureId = (typeof loginContent.features.items)[number]["id"];
