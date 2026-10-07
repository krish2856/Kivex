export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "We review your current workflow, audit where your team loses hours, and pin down the exact features you actually need.",
  },
  {
    number: "02",
    title: "STRATEGY",
    description: "We map out user flows, database schemas, and API integrations before writing code so there are no surprises later.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "We design clean, responsive interfaces that customers can navigate easily without needing an explanation.",
  },
  {
    number: "04",
    title: "BUILD",
    description: "We write maintainable TypeScript and clean components with fast API response times and verified mobile layouts.",
  },
  {
    number: "05",
    title: "AUTOMATE",
    description: "We connect webhooks, CRM records, WhatsApp alerts, and automated reminders so routine work runs on its own.",
  },
  {
    number: "06",
    title: "LAUNCH",
    description: "We deploy to production, verify domain records and analytics, and stay active on monitoring to handle any edge cases.",
  },
];
