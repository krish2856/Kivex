export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "We deep-dive into your business, audience, goals, and competitive landscape to understand exactly what needs to be built.",
  },
  {
    number: "02",
    title: "STRATEGY",
    description: "We architect the optimal solution — defining technology choices, user flows, system design, and a clear roadmap.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "We craft interfaces that feel premium, intuitive, and conversion-focused. Every pixel has a purpose.",
  },
  {
    number: "04",
    title: "BUILD",
    description: "We develop using modern, scalable technology. Clean code, performance-first architecture, rigorous testing.",
  },
  {
    number: "05",
    title: "AUTOMATE",
    description: "We integrate intelligent automation — eliminating manual work and creating systems that operate at scale.",
  },
  {
    number: "06",
    title: "LAUNCH",
    description: "We deploy, monitor, optimize, and support. Your digital system goes live with ongoing partnership.",
  },
];
