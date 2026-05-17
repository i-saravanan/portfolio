"use client";

import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import { motion } from "framer-motion";
import Scene from "@/components/Scene";

const navItems = ["About", "Skills", "Projects", "Experience", "Achievements", "Contact"];

const skills = [
  { name: "Java", accent: "text-signal", icon: Code2 },
  { name: "Spring Boot", accent: "text-mint", icon: Sparkles },
  { name: "REST APIs", accent: "text-aqua", icon: Network },
  { name: "Spring Data JPA", accent: "text-mint", icon: Database },
  { name: "MySQL", accent: "text-aqua", icon: Database },
  { name: "Hibernate", accent: "text-signal", icon: Server },
  { name: "Maven", accent: "text-coral", icon: TerminalSquare },
  { name: "Git & GitHub", accent: "text-white", icon: Github }
];

const projects = [
  {
    title: "Role-Based Ticket Management System",
    type: "Java + Hibernate + MySQL",
    description:
      "Console-based helpdesk system with registration, login, role checks, ticket creation, admin assignment, and agent status updates.",
    impact: "Shows backend layering, RBAC thinking, DAO/service separation, and persistence design.",
    metrics: ["RBAC workflow", "Hibernate ORM", "MySQL schema"],
    tone: "from-mint/20"
  },
  {
    title: "Smart Agriculture AI System",
    type: "AI-assisted agriculture workflow",
    description:
      "A problem-solving system concept for smarter farming decisions using data, prediction, and automation-focused backend thinking.",
    impact: "Positions you as a developer who can connect software architecture with real-world sectors.",
    metrics: ["AI concept", "Decision support", "Domain problem solving"],
    tone: "from-signal/20"
  },
  {
    title: "Employment Leave Management System",
    type: "Backend workflow application",
    description:
      "Leave request and approval flow designed around employee records, validation, role-based access, and maintainable business logic.",
    impact: "Demonstrates CRUD workflows, clean API-ready modeling, and practical enterprise use cases.",
    metrics: ["Approval flow", "Business rules", "Data modeling"],
    tone: "from-aqua/20"
  }
];

const achievements = [
  "Built backend-focused projects around real operational workflows.",
  "Comfortable with Java persistence patterns using Hibernate and Spring Data JPA.",
  "Focused on clean code, maintainability, and recruiter-readable project storytelling."
];

function SectionTitle({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-8 max-w-3xl"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-mint">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">{copy}</p> : null}
    </motion.div>
  );
}

function MagneticCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`glass rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-graphite/50 backdrop-blur-xl">
        <nav className="section-shell flex h-16 items-center justify-between">
          <a href="#hero" className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">
            SI
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="mailto:saravanan2004in@gmail.com"
            className="inline-flex items-center gap-2 rounded border border-mint/30 bg-mint/10 px-3 py-2 text-sm font-semibold text-mint transition hover:bg-mint/20"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </nav>
      </header>

      <section id="hero" className="section-shell flex min-h-screen items-center pt-20">
        <div className="max-w-4xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/75 backdrop-blur-lg"
          >
            <MapPin className="h-4 w-4 text-signal" />
            Tamil Nadu, India
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="text-balance font-display text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl"
          >
            Saravanan I
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-5 max-w-2xl text-xl leading-8 text-white/80 sm:text-2xl"
          >
            Java Backend Developer building scalable backend systems with clean code,
            reliable APIs, and database-first thinking.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 text-sm font-bold text-graphite transition hover:translate-y-[-2px] hover:bg-white"
            >
              View backend work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:translate-y-[-2px] hover:bg-white/10"
            >
              Recruiter contact
              <BriefcaseBusiness className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section-shell py-24">
        <SectionTitle
          eyebrow="About"
          title="Backend-focused, system-minded, and ready for high-growth teams."
          copy="I build Java backend projects with emphasis on clean structure, persistence, role-based workflows, and APIs that are easy to understand, test, and extend."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Primary stack", "Java, Spring Boot, REST APIs, Spring Data JPA, Hibernate, MySQL"],
            ["Working style", "Readable code, service-layer thinking, simple architecture, clear data flow"],
            ["Current goal", "Backend developer internships and fresher roles with recruiters or startup founders"]
          ].map(([title, copy]) => (
            <MagneticCard key={title} className="p-6">
              <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-white/70">{copy}</p>
            </MagneticCard>
          ))}
        </div>
      </section>

      <section id="skills" className="section-shell py-24">
        <SectionTitle
          eyebrow="Skill Matrix"
          title="A practical backend toolkit, presented like a living system."
          copy="Each skill is positioned as part of the backend pipeline: code, API contracts, persistence, build workflow, and source control."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="glass group rounded-lg p-5"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-7 w-7 ${skill.accent}`} />
                  <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_18px_rgba(77,240,189,0.8)]" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{skill.name}</h3>
                <div className="mt-4 h-1 rounded bg-white/10">
                  <div className="h-full w-[82%] rounded bg-gradient-to-r from-mint via-aqua to-signal" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="projects" className="section-shell py-24">
        <SectionTitle
          eyebrow="Projects"
          title="Recruiter-readable projects with backend substance."
          copy="The cards are built to quickly communicate problem, stack, and engineering signal so a reviewer understands your value without searching for it."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.58, delay: index * 0.08 }}
              className={`project-card glass rounded-lg bg-gradient-to-br ${project.tone} via-white/[0.04] to-transparent p-6`}
            >
              <div className="project-depth">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">{project.type}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-4 leading-7 text-white/70">{project.description}</p>
                <p className="mt-5 border-l-2 border-mint pl-4 text-sm leading-6 text-white/75">
                  {project.impact}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/75"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell py-24">
        <SectionTitle
          eyebrow="Experience"
          title="Built for internship and fresher-role positioning."
          copy="Until formal work experience is added, this section presents your project experience as backend engineering practice."
        />
        <div className="glass rounded-lg p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-signal">Project Experience</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                Java Backend Developer Portfolio Track
              </h3>
              <p className="mt-4 max-w-3xl leading-7 text-white/70">
                Designed backend-oriented systems involving user roles, database persistence,
                workflow validation, and maintainable Java application structure.
              </p>
            </div>
            <ShieldCheck className="h-10 w-10 text-mint" />
          </div>
        </div>
      </section>

      <section id="achievements" className="section-shell py-24">
        <SectionTitle
          eyebrow="Achievements"
          title="Signals that matter to backend recruiters."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((achievement) => (
            <div key={achievement} className="glass rounded-lg p-6">
              <Award className="h-7 w-7 text-signal" />
              <p className="mt-5 leading-7 text-white/70">{achievement}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell py-24">
        <div className="glass rounded-lg p-6 sm:p-10">
          <SectionTitle
            eyebrow="Contact"
            title="Let's connect the backend to the opportunity."
            copy="Replace the placeholder links below with your real email, GitHub, LinkedIn, and resume when ready."
          />
          <div className="flex flex-wrap gap-3">
            <a href="mailto:saravanan2004in@gmail.com" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 text-sm font-bold text-graphite">
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a href="https://github.com/i-saravanan" className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/saravanan-i" className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
