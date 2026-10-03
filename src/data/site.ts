/**
 * Site-wide facts. Section-specific editorial copy lives inside its section component;
 * repeatable records (experience, projects, …) will live in content collections.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: "Piyush Kumar",
  role: "Software Engineer",
  focus: "Backend Developer",
  title: "Piyush Kumar — Software Engineer",
  description:
    "Piyush Kumar is a Software Engineer who enjoys solving problems, exploring new technologies, and finding better ways to turn ideas into something useful.",
  availability: ["Open to Full-Time Opportunities", "Available for Freelance Projects"],

  contact: {
    // PLACEHOLDER — not a real address (example.com is reserved for examples).
    // Replace with the real contact email before launch.
    email: "placeholder@example.com",
    // Add profile URLs here when ready; links render only when set.
    github: null as string | null,
    linkedin: null as string | null,
  },
} as const;

export const contactHref = `mailto:${site.contact.email}`;

/**
 * Primary navigation. Add an item only when its section ships, so the nav never links
 * to a section that doesn't exist yet.
 */
export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
