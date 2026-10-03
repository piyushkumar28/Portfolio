/**
 * The skills, in five areas. Backend is the centre of gravity; the links
 * show how tools in different areas work together. Deliberately no levels or percentages: each tool gets a kind (what
 * it is) and one plain line on what it is for. The Skills section marks the
 * tools used in the current role (derived from the experience collection).
 *
 * `toolLinks` are real relationships between tools (symmetric): each one is
 * drawn as a wire, so the picture can't claim a connection the data doesn't
 * contain.
 */
export interface Tool {
  name: string;
  kind: string;
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
    text: "Services, logic and the APIs everything else talks to.",
    tools: [
      {
        name: "Python",
        kind: "Language",
        text: "My main language for backend work and scripting.",
      },
      {
        name: "Django",
        kind: "Framework",
        text: "The framework behind the backend work in my current role.",
      },
      { name: "Node.js", kind: "Runtime", text: "JavaScript on the server, used in projects." },
      {
        name: "REST APIs",
        kind: "Interface",
        text: "How the frontend, the backend and other systems talk to each other.",
      },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    text: "Interfaces built on top of those APIs.",
    tools: [
      {
        name: "React",
        kind: "Library",
        text: "Component-based interfaces that call the backend’s APIs.",
      },
      {
        name: "JavaScript",
        kind: "Language",
        text: "The language of the frontend, and of Node.js on the server.",
      },
      {
        name: "Tailwind CSS",
        kind: "Styling",
        text: "Utility-first styling for building interfaces quickly.",
      },
      {
        name: "Vite",
        kind: "Build tool",
        text: "Fast development servers and builds for frontend projects.",
      },
    ],
  },
  {
    id: "data",
    name: "Data",
    text: "Where the application’s state lives.",
    tools: [
      { name: "SQL", kind: "Query language", text: "Querying and shaping relational data." },
      {
        name: "PostgreSQL",
        kind: "Database",
        text: "The relational database I work with alongside Django.",
      },
      {
        name: "Relational Databases",
        kind: "Data model",
        text: "The model underneath: tables, keys and relationships.",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Engineering",
    text: "Shipping, running and versioning the work.",
    tools: [
      { name: "AWS", kind: "Cloud", text: "Cloud services for hosting and running projects." },
      { name: "Azure", kind: "Cloud", text: "Microsoft’s cloud, including its AI services." },
      {
        name: "Docker",
        kind: "Containers",
        text: "Containers, so a service runs the same everywhere.",
      },
      { name: "Git", kind: "Version control", text: "Version control for everything I write." },
      {
        name: "GitHub",
        kind: "Collaboration",
        text: "Hosting repositories and collaborating on code.",
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Automation",
    text: "Applied AI and the workflows around it, built on the same foundations.",
    tools: [
      {
        name: "Azure AI",
        kind: "AI services",
        text: "Managed AI services, used for document text extraction.",
      },
      { name: "OCR", kind: "Extraction", text: "Turning scanned documents into structured text." },
      { name: "LLMs", kind: "Models", text: "Language models used as one part of an application." },
      {
        name: "RAG",
        kind: "Retrieval",
        text: "Grounding a model’s answers in your own documents.",
      },
      {
        name: "AI Agents",
        kind: "Orchestration",
        text: "Models that plan and call tools to complete a task.",
      },
      {
        name: "Vector Databases",
        kind: "Storage",
        text: "Storing embeddings so related content can be found by meaning.",
      },
      {
        name: "n8n",
        kind: "Workflows",
        text: "Visual workflows that connect apps and automate repetitive steps.",
      },
    ],
  },
];

export const toolLinks: [string, string][] = [
  ["Node.js", "REST APIs"],
  ["REST APIs", "Django"],
  ["Django", "Python"],
  ["Django", "PostgreSQL"],
  ["Django", "Docker"],
  ["Node.js", "JavaScript"],
  ["REST APIs", "React"],
  ["REST APIs", "n8n"],
  ["React", "JavaScript"],
  ["React", "Tailwind CSS"],
  ["React", "Vite"],
  ["PostgreSQL", "SQL"],
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
