/**
 * Skills, grouped by what they're for. Deliberately no levels or percentages:
 * the Skills section marks which tools are part of the current role (derived
 * from the experience collection) and presents the rest as projects and
 * self-directed learning.
 */
export interface SkillGroup {
  name: string;
  description: string;
  tools: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    description: "The parts people see and use.",
    tools: ["React", "Tailwind CSS", "Vite", "JavaScript", "HTML", "CSS"],
  },
  {
    name: "Backend",
    description: "Services, data models and the APIs between them.",
    tools: ["Python", "Django", "Node.js", "REST APIs"],
  },
  {
    name: "Data",
    description: "Structuring, storing and querying relational data.",
    tools: ["SQL", "PostgreSQL", "Relational databases"],
  },
  {
    name: "Cloud / DevOps",
    description: "Packaging, versioning and running software beyond my own machine.",
    tools: ["AWS", "Azure", "Docker", "Git", "GitHub"],
  },
  {
    name: "AI",
    description: "Reading documents, grounding language models in real data, and agents.",
    tools: ["Azure AI", "OCR", "LLMs", "RAG", "AI agents", "Vector databases"],
  },
  {
    name: "Automation / Testing",
    description: "Checking that things work, and removing repetitive work.",
    tools: ["Selenium", "Pytest", "Postman", "n8n"],
  },
];
