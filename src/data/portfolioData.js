export const personalInfo = {
  name: "Naveenkumar R",
  nickname: "Naveen",
  title: "Computer Science and Engineering Student | Full-Stack Developer | Problem Solver",
  institution: "Chennai Institute of Technology",
  degree: "B.E. Computer Science and Engineering",
  cgpa: "9.05",
  headline: "I Build Ideas Into Scalable Digital Experiences.",
  subtitle: "Computer Science and Engineering student passionate about Full-Stack Development, Problem Solving, and building impactful software.",
  roles: [
    "Full-Stack Developer",
    "Problem Solver",
    "Competitive Programmer",
    "Software Engineer",
    "Spring Boot Specialist"
  ],
  location: "Chennai, India",
  status: "Available for Software Engineering & Full-Stack Roles",
  socials: {
    github: "https://github.com/NAVEENKUMAR12-R",
    linkedin: "https://www.linkedin.com/in/naveenkumar-r",
    email: "naveenkumarr.cse@gmail.com",
    leetcode: "https://leetcode.com/u/NAVEENKUMAR12-R/",
    codechef: "https://www.codechef.com/users/naveenkumar12r"
  },
  web3formsKey: "", // Optional: Get free access key from https://web3forms.com
  stats: [
    { label: "CGPA", value: "9.05", subtitle: "Academic Excellence", icon: "GraduationCap", color: "from-cyan-400 to-blue-500" },
    { label: "DSA Problems", value: "1,065+", subtitle: "Across Coding Platforms", icon: "Code2", color: "from-purple-400 to-pink-500" },
    { label: "LeetCode Peak", value: "1845", subtitle: "Knight Badge Tier", icon: "Trophy", color: "from-amber-400 to-orange-500" },
    { label: "Hackathons", value: "4+ Wins", subtitle: "National & Regional", icon: "Flame", color: "from-emerald-400 to-teal-500" }
  ]
};

export const skillsData = {
  categories: [
    {
      id: "languages",
      name: "Languages",
      icon: "Terminal",
      accent: "#00f0ff",
      skills: [
        { name: "C", level: "Proficient", icon: "c" },
        { name: "C++", level: "Advanced (DSA)", icon: "cpp" },
        { name: "Python", level: "Proficient", icon: "python" },
        { name: "Java", level: "Advanced (Spring)", icon: "java" },
        { name: "SQL", level: "Advanced", icon: "sql" },
        { name: "JavaScript", level: "Advanced (ES6+)", icon: "javascript" }
      ]
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: "Layout",
      accent: "#ec4899",
      skills: [
        { name: "HTML5", level: "Advanced", icon: "html5" },
        { name: "CSS3 / Modern CSS", level: "Advanced", icon: "css3" },
        { name: "React.js", level: "Advanced", icon: "react" },
        { name: "Figma", level: "UI/UX Design", icon: "figma" },
        { name: "Canva", level: "Visual Assets", icon: "canva" }
      ]
    },
    {
      id: "backend",
      name: "Backend & Database",
      icon: "Database",
      accent: "#8b5cf6",
      skills: [
        { name: "Node.js", level: "Advanced", icon: "nodejs" },
        { name: "Express.js", level: "Advanced", icon: "express" },
        { name: "REST APIs", level: "Architecture & Design", icon: "api" },
        { name: "MySQL", level: "Relational DB", icon: "mysql" },
        { name: "MongoDB", level: "NoSQL DB", icon: "mongodb" },
        { name: "PostgreSQL", level: "Relational DB", icon: "postgresql" }
      ]
    },
    {
      id: "javabackend",
      name: "Java Backend",
      icon: "Server",
      accent: "#f59e0b",
      skills: [
        { name: "Spring Boot", level: "Production Microservices", icon: "spring" },
        { name: "JPA", level: "Data Persistence", icon: "jpa" },
        { name: "Hibernate", level: "ORM Architecture", icon: "hibernate" },
        { name: "Spring Security", level: "Role-Based Auth", icon: "security" }
      ]
    },
    {
      id: "tools",
      name: "Tools & Testing",
      icon: "Wrench",
      accent: "#10b981",
      skills: [
        { name: "Git", level: "Version Control", icon: "git" },
        { name: "GitHub", level: "CI/CD & Collaboration", icon: "github" },
        { name: "Postman", level: "API Testing & Docs", icon: "postman" },
        { name: "Selenium", level: "Automated Testing", icon: "selenium" },
        { name: "TestNG", level: "Test Framework", icon: "testng" }
      ]
    },
    {
      id: "csfundamentals",
      name: "CS Fundamentals",
      icon: "Cpu",
      accent: "#06b6d4",
      skills: [
        { name: "Data Structures", level: "Deep Mastery", icon: "tree" },
        { name: "Algorithms", level: "Dynamic & Graph Algorithms", icon: "binary" },
        { name: "OOP", level: "Design Patterns & SOLID", icon: "boxes" },
        { name: "Computer Networks", level: "TCP/IP, HTTP, OSI", icon: "network" },
        { name: "DBMS", level: "Indexing, Normalization, ACID", icon: "database" },
        { name: "Operating Systems", level: "Concurrency, Threads, Memory", icon: "cpu" }
      ]
    }
  ]
};

export const experienceData = [
  {
    role: "Full Stack Development Intern",
    company: "Internzo",
    period: "February 2025",
    type: "Internship",
    location: "Remote / On-site",
    description: "Architected end-to-end features and scalable REST APIs for client-facing web applications.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "Postman"],
    highlights: [
      "Built performant and responsive web applications using modern React.js frontend architecture and modular component hierarchies.",
      "Engineered robust RESTful APIs with Node.js and Express.js to streamline backend data flow and client communication.",
      "Implemented schemas, queries, and indexing for efficient NoSQL data storage with MongoDB.",
      "Streamlined team collaboration and agile workflows through structured Git version control and GitHub pull request reviews.",
      "Conducted thorough automated and manual endpoint validation using Postman for zero-downtime deployments.",
      "Diagnosed and resolved critical application bottlenecks, debugging state flows and optimizing query execution speeds."
    ]
  }
];

export const projectsData = [
  {
    id: "ticketly",
    title: "TICKETLY",
    tagline: "High-Concurrency Movie Ticket Booking Platform",
    category: "Full-Stack Web App",
    badge: "Featured System",
    accent: "from-cyan-500 via-blue-600 to-indigo-700",
    glowColor: "rgba(0, 240, 255, 0.4)",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "Inngest"],
    description: "A production-ready full-stack movie ticket booking platform where users seamlessly browse movies, select real-time seats with temporary holding mechanisms, and securely finalize digital ticket bookings.",
    detailedDescription: "Ticketly addresses the classic concurrency challenge in ticket reservation systems. Leveraging Clerk for role-based multi-tier authentication and Inngest for asynchronous background job orchestration, the platform guarantees that seats selected by users are temporarily locked with automated expirations, completely mitigating race conditions and double bookings.",
    features: [
      "Secure authentication & session handling using Clerk with multi-role permissions (Admin & Customer).",
      "Dynamic real-time interactive theater seat layout with instant seat selection states.",
      "Temporary seat locking engine preventing concurrent duplicate reservations.",
      "Automated background workflows powered by Inngest to auto-release expired locks.",
      "High-throughput RESTful API architecture built on Express.js and optimized MongoDB aggregations.",
      "Responsive movie discovery hub with filtering by genre, format, language, and showtimes."
    ],
    architecture: [
      { label: "Frontend", val: "React.js + Tailwind / Modern CSS Glassmorphism" },
      { label: "Backend", val: "Node.js / Express.js REST Engine" },
      { label: "Database", val: "MongoDB with Concurrency Locks" },
      { label: "Background Jobs", val: "Inngest Serverless Event Workflows" },
      { label: "Auth", val: "Clerk Enterprise SSO / JWT" }
    ],
    github: "https://github.com/NAVEENKUMAR12-R",
    demo: "https://ticketly-system.vercel.app"
  },
  {
    id: "leave-hub",
    title: "LEAVE HUB",
    tagline: "Enterprise Leave Management & Approval System",
    category: "Enterprise Java / Spring Boot",
    badge: "Backend & System Design",
    accent: "from-purple-500 via-pink-600 to-rose-700",
    glowColor: "rgba(168, 85, 247, 0.4)",
    techStack: ["Java", "Spring Boot", "MySQL", "JPA", "Hibernate"],
    description: "A robust, role-based enterprise Leave Management System designed to automate employee leave applications, supervisor approvals, balance tracking, and audit logging with strict data integrity.",
    features: [
      "Role-based authorization (Employee, Manager, HR Admin) with custom permission filters.",
      "Layered Controller-Service-Repository architecture ensuring high testability and clean separation of concerns.",
      "High-performance persistence layer utilizing Spring Data JPA and Hibernate ORM with connection pooling.",
      "Intelligent leave balance validation preventing overdrafts and quota violations.",
      "Automated date validation and algorithmic overlapping leave request conflict detection.",
      "Comprehensive approval workflows with dynamic status updates (Pending, Approved, Rejected, Cancelled).",
      "Structured relational database schema normalized to 3NF in MySQL."
    ],
    architecture: [
      { label: "Core Backend", val: "Java 17 / Spring Boot 3" },
      { label: "ORM Layer", val: "Hibernate / Spring Data JPA" },
      { label: "Database", val: "MySQL Relational Engine (3NF)" },
      { label: "Architecture", val: "Layered Controller-Service-Repository" },
      { label: "Validation", val: "Custom Business Rule Engines & Date Collision Checks" }
    ],
    github: "https://github.com/NAVEENKUMAR12-R",
    demo: "https://github.com/NAVEENKUMAR12-R"
  }
];

export const competitiveProgrammingData = {
  summary: {
    totalSolved: "1,065+",
    totalContests: "150+",
    platformsCount: 3
  },
  platforms: [
    {
      id: "leetcode",
      name: "LeetCode",
      badge: "Knight Badge",
      badgeColor: "from-amber-400 to-orange-500",
      accent: "#f59e0b",
      solved: "852+",
      maxRating: "1845",
      contests: "120",
      link: "https://leetcode.com/u/NAVEENKUMAR12-R/",
      highlights: [
        "Earned prestigious Knight Badge (Top ~5% global percentile)",
        "Consistent participant in 120+ weekly & biweekly rounds",
        "Deep mastery across DP, Trees, Graphs, Greedy, and Binary Search"
      ],
      breakdown: [
        { type: "Easy", count: "290+", color: "#10b981" },
        { type: "Medium", count: "460+", color: "#f59e0b" },
        { type: "Hard", count: "102+", color: "#ef4444" }
      ]
    },
    {
      id: "codechef",
      name: "CodeChef",
      badge: "3 Star Coder",
      badgeColor: "from-blue-400 to-indigo-500",
      accent: "#3b82f6",
      solved: "128",
      maxRating: "1628",
      contests: "32",
      link: "https://www.codechef.com/users/naveenkumar12r",
      highlights: [
        "Achieved 3-Star Rating (Peak Rating: 1628)",
        "Active participant in Starters and Cook-Off rounds",
        "Expertise in constructive algorithms, combinatorics & number theory"
      ],
      breakdown: [
        { type: "Starters", count: "24", color: "#3b82f6" },
        { type: "Cook-Off", count: "8", color: "#8b5cf6" }
      ]
    },
    {
      id: "codeforces",
      name: "Codeforces",
      badge: "Pupil / Active",
      badgeColor: "from-cyan-400 to-teal-500",
      accent: "#06b6d4",
      solved: "85",
      maxRating: "1139",
      contests: "15+",
      link: "https://codeforces.com/profile/NAVEENKUMAR12-R",
      highlights: [
        "Peak Rating: 1139",
        "Tackled diverse speed-coding problemsets under strict time limits",
        "Refined optimization and mathematical reasoning techniques"
      ],
      breakdown: [
        { type: "Div. 2 / Div. 3", count: "15+", color: "#06b6d4" }
      ]
    }
  ]
};

export const achievementsData = [
  {
    id: "think-up",
    title: "Top 10 — Think Up Ideathon 2024",
    organization: "Think Up Ideathon",
    meta: "Out of 200+ Competitive Teams",
    year: "2024",
    icon: "Trophy",
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(245, 158, 11, 0.3)",
    description: "Shortlisted into the top 10 finalists among 200+ engineering teams nationwide for conceptualizing and presenting a high-impact technology solution."
  },
  {
    id: "gate-2026",
    title: "GATE 2026 Qualified",
    organization: "National Examination Board",
    meta: "Score: 30.35 | All India Rank: 28,114",
    year: "2026",
    icon: "Award",
    accent: "from-cyan-400 to-blue-500",
    glow: "rgba(6, 182, 212, 0.3)",
    description: "Successfully cleared the premier Graduate Aptitude Test in Engineering (Computer Science & Information Technology), validating core CS fundamentals."
  },
  {
    id: "one-delhi",
    title: "National Finalist",
    organization: "One Delhi Open Stack Hackathon",
    meta: "National Stage Recognition",
    year: "2024",
    icon: "Flame",
    accent: "from-purple-400 to-pink-500",
    glow: "rgba(168, 85, 247, 0.3)",
    description: "Engineered real-time urban open stack solutions against top student developer teams from across India to reach the Grand National Finale."
  },
  {
    id: "build-with-india",
    title: "Top 50 Finalist",
    organization: "Build With India Hackathon",
    meta: "Out of 500+ National Teams",
    year: "2024",
    icon: "Zap",
    accent: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.3)",
    description: "Ranked in the top 50 innovators nationwide out of 500+ teams for creating scalable software for domestic socio-economic impact."
  }
];

export const leadershipData = [
  {
    title: "Hackerz Department Symposium",
    role: "Event Coordinator & Event Head",
    scope: "GLITCHED Code Debugging Event",
    participants: "300+ Participants Coordinated",
    accent: "from-cyan-500 to-blue-600",
    points: [
      "Conceptualized, structured, and spearheaded 'GLITCHED', a flagship code debugging and algorithmic troubleshooting competition.",
      "Curated complex multi-language bug scenarios (C, C++, Java, Python) testing edge cases, memory leaks, and logical pitfalls.",
      "Managed seamless event logistics, judging criteria, and live scoring platform for 300+ enthusiastic participants."
    ]
  },
  {
    title: "Young Mind Coder Program",
    role: "Technical Mentor & Instructor",
    scope: "Foundational Python & Problem Solving",
    participants: "Junior Students & Beginners",
    accent: "from-purple-500 to-pink-600",
    points: [
      "Mentored junior engineering students in foundational Python programming, algorithmic thinking, and clean code principles.",
      "Conducted interactive hands-on coding workshops, problem deconstruction sessions, and debugging masterclasses.",
      "Fostered a collaborative learning culture guiding peers toward competitive programming readiness and project development."
    ]
  }
];
