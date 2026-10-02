/**
 * The skills map. Backend sits at the centre; the other groups connect to it.
 * Deliberately no levels or percentages: each tool gets one plain line on what
 * it is for, and the Skills section marks the tools used in the current role
 * (derived from the experience collection).
 *
 * `links` are real relationships between tools (symmetric). The connections
 * drawn between groups are derived from them, so the picture can't claim a
 * relationship the data doesn't contain.
 */
export interface Tool {
  name: string;
  text: string;
}

export interface SkillGroup {
  id: "backend" | "frontend" | "data" | "cloud" | "ai";
  name: string;
  text: string;
  tools: Tool[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    name: "Backend",
    text: "The centre of the map: services, logic and the APIs everything else talks to.",
    tools: [
      { name: "Python", text: "My main language for backend work and scripting." },
      { name: "Django", text: "The framework behind the backend work in my current role." },
      { name: "Node.js", text: "JavaScript on the server, used in projects." },
      {
        name: "REST APIs",
        text: "How the frontend, the backend and other systems talk to each other.",
      },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    text: "Interfaces built on top of those APIs.",
    tools: [
      { name: "React", text: "Component-based interfaces that call the backend’s APIs." },
      { name: "JavaScript", text: "The language of the frontend, and of Node.js on the server." },
      { name: "Tailwind CSS", text: "Utility-first styling for building interfaces quickly." },
      { name: "Vite", text: "Fast development servers and builds for frontend projects." },
    ],
  },
  {
    id: "data",
    name: "Data",
    text: "Where the application’s state lives.",
    tools: [
      { name: "SQL", text: "Querying and shaping relational data." },
      { name: "PostgreSQL", text: "The relational database I work with alongside Django." },
      {
        name: "Relational Databases",
        text: "The model underneath: tables, keys and relationships.",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Engineering",
    text: "Shipping, running and versioning the work.",
    tools: [
      { name: "AWS", text: "Cloud services for hosting and running projects." },
      { name: "Azure", text: "Microsoft’s cloud, including its AI services." },
      { name: "Docker", text: "Containers, so a service runs the same everywhere." },
      { name: "Git", text: "Version control for everything I write." },
      { name: "GitHub", text: "Hosting repositories and collaborating on code." },
    ],
  },
  {
    id: "ai",
    name: "AI & Automation",
    text: "Applied AI and workflows, built on the same foundations.",
    tools: [
      { name: "Azure AI", text: "Managed AI services, used for document text extraction." },
      { name: "OCR", text: "Turning scanned documents into structured text." },
      { name: "LLMs", text: "Language models used as one part of an application." },
      { name: "RAG", text: "Grounding a model’s answers in your own documents." },
      { name: "AI Agents", text: "Models that plan and call tools to complete a task." },
      {
        name: "Vector Databases",
        text: "Storing embeddings so related content can be found by meaning.",
      },
      { name: "n8n", text: "Visual workflows that connect apps and automate repetitive steps." },
    ],
  },
];

export const toolLinks: [string, string][] = [
  ["Python", "Django"],
  ["Django", "REST APIs"],
  ["Django", "PostgreSQL"],
  ["Django", "Docker"],
  ["Node.js", "JavaScript"],
  ["Node.js", "REST APIs"],
  ["REST APIs", "React"],
  ["REST APIs", "n8n"],
  ["React", "JavaScript"],
  ["React", "Tailwind CSS"],
  ["React", "Vite"],
  ["SQL", "PostgreSQL"],
  ["SQL", "Relational Databases"],
  ["PostgreSQL", "Relational Databases"],
  ["Docker", "AWS"],
  ["Docker", "Azure"],
  ["Git", "GitHub"],
  ["Azure", "Azure AI"],
  ["Azure AI", "OCR"],
  ["LLMs", "RAG"],
  ["LLMs", "AI Agents"],
  ["RAG", "Vector Databases"],
  ["AI Agents", "n8n"],
];

/** Stable id for a tool name, for DOM ids and data attributes. */
export const toolId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
