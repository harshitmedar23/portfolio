export const profile = {
  name: "Harshit Medar",
  initials: "HM",
  title: "Computer Science Engineer",
  description: "Computer Science student building practical software, web applications, and systems while exploring AI.",
  githubUrl: "https://github.com/harshitmedar23",
  githubUsername: "harshitmedar23",
  linkedinUrl: "https://www.linkedin.com/in/harshit-medar-99b554387/",
  email: "harshitmedar26@gmail.com",
  resumePath: "/resume.pdf",
} as const;

export const education = {
  program: "Computer Science Engineering",
  institution: "",
  status: "Student",
} as const;

export const focusAreas = [
  { title: "Software development", status: "BUILDING", detail: "Practical applications and systems." },
  { title: "Artificial intelligence", status: "LEARNING", detail: "Exploring AI as part of computer science." },
  { title: "Web development", status: "EXPERIMENTING", detail: "Building usable web applications." },
] as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const skillGroups = [
  { label: "Languages", items: [{ name: "Java", mark: "Jv" }, { name: "Python", mark: "Py" }, { name: "C", mark: "C" }, { name: "C++", mark: "C++" }, { name: "PHP", mark: "php" }, { name: "JavaScript", mark: "JS" }] },
  { label: "Frontend", items: [{ name: "HTML", mark: "5" }, { name: "CSS", mark: "#" }, { name: "React", mark: "R" }, { name: "Flutter", mark: "Fl" }] },
  { label: "Backend", items: [{ name: "Flask", mark: "F" }, { name: "Node.js", mark: "N" }] },
  { label: "Database", items: [{ name: "MySQL", mark: "My" }, { name: "SQLite", mark: "Sq" }] },
  { label: "Tools", items: [{ name: "Git", mark: "Gt" }, { name: "GitHub", mark: "GH" }, { name: "VS Code", mark: "VS" }, { name: "Docker", mark: "D" }] },
] as const;

export const skillProjectUsage: Record<string, string[]> = {
  Python: ["KisanQueue"],
  Flask: ["KisanQueue"],
  MySQL: ["KisanQueue", "MedTrack"],
  SQLite: ["KisanQueue"],
  "Node.js": ["RINA-MUSIC"],
  Discord: ["RINA-MUSIC"],
  Lavalink: ["RINA-MUSIC"],
};

export const projects = [
  {
    name: "KisanQueue", number: "01", category: "Web application",
    description: "A farmer procurement slot booking and queue management web application.",
    stack: ["Flask", "Python", "SQLite / MySQL", "Flask-SocketIO"],
    details: ["Slot booking", "Live queue updates", "OTP authentication", "QR check-in", "Notifications", "Analytics"],
    githubUrl: "", demoUrl: "", accent: "blue",
    caseStudy: { problem: null, solution: null, architecture: null, challenges: null, learning: null },
  },
  {
    name: "MedTrack", number: "02", category: "Database system",
    description: "A smart pharmacy inventory management system focused on organized stock records.",
    stack: ["MySQL", "DBMS"], details: ["Pharmacy inventory management", "Stock records", "Database-driven management"],
    githubUrl: "", demoUrl: "", accent: "cyan",
    caseStudy: { problem: null, solution: null, architecture: null, challenges: null, learning: null },
  },
  {
    name: "RINA-MUSIC", number: "03", category: "Discord bot",
    description: "A Discord music bot project involving Lavalink-based music playback.",
    stack: ["Node.js", "Discord", "Lavalink"], details: ["Music playback", "Lavalink-based architecture"],
    githubUrl: "", demoUrl: "", accent: "violet",
    caseStudy: { problem: null, solution: null, architecture: null, challenges: null, learning: null },
  },
] as const;

export const journeyMilestones = [
  { label: "Education", title: "Computer Science Engineering", detail: "Studying computer science and building a foundation in software." },
  { label: "Projects", title: "Learning through projects", detail: "KisanQueue, MedTrack, and RINA-MUSIC." },
  { label: "Technical learning", title: "Exploring the stack", detail: "Software development, web development, application development, and AI." },
  { label: "Current focus", title: "Build practical applications", detail: "Learning and improving by experimenting with technology." },
] as const;

export type Achievement = { title: string; description: string; date?: string };
export const achievements: Achievement[] = [];

export const technologyCount = skillGroups.reduce((count, group) => count + group.items.length, 0);
