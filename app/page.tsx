"use client";

import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  GitBranch,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Scene from "@/components/Scene";

const email = "saravanan05082004@gmail.com";
const github = "https://github.com/i-saravanan";
const linkedin = "https://www.linkedin.com/in/saravanan-i";
const resume = "/saravanan-iyappan-resume.html";

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

const skills = [
  { name: "Java", logo: "J", detail: "Core backend programming", color: "from-orange-400 to-red-500", icon: Code2 },
  { name: "Spring Boot", logo: "S", detail: "REST APIs and services", color: "from-emerald-300 to-lime-400", icon: Sparkles },
  { name: "MySQL", logo: "M", detail: "Schema and persistence", color: "from-sky-300 to-blue-500", icon: Database },
  { name: "Hibernate", logo: "H", detail: "ORM and entities", color: "from-yellow-200 to-amber-500", icon: Layers3 },
  { name: "Git", logo: "G", detail: "Version control", color: "from-rose-300 to-orange-500", icon: GitBranch },
  { name: "GitHub", logo: "GH", detail: "Project management", color: "from-white to-slate-400", icon: Github },
  { name: "Maven", logo: "MV", detail: "Build lifecycle", color: "from-fuchsia-300 to-violet-500", icon: TerminalSquare },
  { name: "REST APIs", logo: "API", detail: "Contracts and flows", color: "from-cyan-300 to-aqua", icon: Network }
];

const projects = [
  {
    title: "Role-Based Ticket Management System",
    stack: "Java, Hibernate, MySQL",
    description:
      "Helpdesk workflow with registration, login, role checks, ticket creation, admin assignment, and agent status updates.",
    signal: "RBAC, DAO/service layering, persistence design",
    metrics: ["RBAC", "Hibernate", "MySQL"],
    icon: ShieldCheck,
    accent: "from-aqua via-violet to-coral"
  },
  {
    title: "Smart Agriculture AI System",
    stack: "AI workflow, backend logic, data flow",
    description:
      "Decision-support system concept for smarter farming using prediction, automation, and practical domain modeling.",
    signal: "Real-world problem solving with system design thinking",
    metrics: ["AI concept", "Data flow", "Automation"],
    icon: Activity,
    accent: "from-mint via-aqua to-violet"
  },
  {
    title: "Employment Leave Management System",
    stack: "Java backend, authentication, database",
    description:
      "Leave request and approval system built around employee records, validation, access control, and clean business rules.",
    signal: "CRUD workflows, approval logic, maintainable modeling",
    metrics: ["Auth", "Workflow", "JPA-ready"],
    icon: Workflow,
    accent: "from-coral via-violet to-aqua"
  }
];

const experienceBullets = [
  "Built REST APIs with Spring Boot and Hibernate for production-grade use cases",
  "Designed normalized MySQL schemas and implemented JPA repositories",
  "Implemented role-based access control and multi-tenant logic",
  "Practiced DSA consistently on LeetCode for placement readiness",
  "Developed backend-focused full-stack projects with authentication and database integration",
  "Used Git and GitHub for version control and project management"
];

const aboutCards = [
  {
    title: "System Layering",
    copy: "Controller, service, repository, entity, and database responsibilities stay clean and readable.",
    icon: Server
  },
  {
    title: "Data Discipline",
    copy: "Normalized MySQL schemas, JPA repositories, Hibernate mappings, and persistence-first project thinking.",
    icon: Database
  },
  {
    title: "Career Direction",
    copy: "Focused on backend developer internships and fresher roles for startup and recruiter audiences.",
    icon: Rocket
  }
];

const contactLinks = [
  { label: "Email", href: `mailto:${email}`, detail: email, icon: Mail },
  { label: "GitHub", href: github, detail: "github.com/i-saravanan", icon: Github },
  { label: "LinkedIn", href: linkedin, detail: "linkedin.com/in/saravanan-i", icon: Linkedin },
  { label: "Resume", href: resume, detail: "Open resume summary", icon: Download }
];

function CursorAura() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const smoothX = useSpring(mouseX, { stiffness: 140, damping: 28, mass: 0.3 });
  const smoothY = useSpring(mouseY, { stiffness: 140, damping: 28, mass: 0.3 });
  const dotX = useTransform(smoothX, (value) => value + 144);
  const dotY = useTransform(smoothY, (value) => value + 144);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      mouseX.set(event.clientX - 160);
      mouseY.set(event.clientY - 160);
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-80 w-80 rounded-full bg-aqua/10 blur-3xl md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-8 w-8 rounded-full border border-aqua/50 shadow-[0_0_28px_rgba(55,215,255,0.55)] md:block"
        style={{
          x: dotX,
          y: dotY
        }}
      />
    </>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
  download = false
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  return (
    <motion.a
      href={href}
      download={download}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className={
        variant === "primary"
          ? "glow-border inline-flex items-center gap-2 rounded bg-aqua px-5 py-3 text-sm font-bold text-graphite shadow-glow transition hover:bg-white"
          : "inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-aqua/50 hover:bg-white/20"
      }
    >
      {children}
    </motion.a>
  );
}

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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.65 }}
      className="mb-10 max-w-3xl"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-aqua">{eyebrow}</p>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">{copy}</p> : null}
    </motion.div>
  );
}

function TiltCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 4, rotateY: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`glass glow-border rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ProjectMockup({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mockup-grid relative h-44 overflow-hidden rounded border border-white/10 bg-black/30 p-4">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal" />
        <span className="h-2.5 w-2.5 rounded-full bg-aqua" />
      </div>
      <div className="space-y-3">
        <div className="h-3 w-2/3 rounded bg-white/20" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 rounded border border-aqua/20 bg-aqua/10" />
          <div className="h-16 rounded border border-violet/20 bg-violet/10" />
          <div className="h-16 rounded border border-coral/20 bg-coral/10" />
        </div>
        <div className="flex items-center justify-between rounded border border-white/10 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
          <span>{title.slice(0, 20)}</span>
          <span>API OK</span>
        </div>
      </div>
    </div>
  );
}

function LoadingIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.55 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-graphite"
    >
      <div className="text-center">
        <div className="mx-auto mb-5 h-14 w-14 rounded border border-aqua/40 bg-aqua/10 shadow-glow">
          <motion.div
            className="h-full w-full rounded bg-aqua/30"
            animate={{ rotate: 360, scale: [0.85, 1, 0.85] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-aqua">Booting backend portfolio</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LoadingIntro />
      <CursorAura />
      <Scene />
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-aqua via-violet to-coral" style={{ scaleX: scrollYProgress }} />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-graphite/50 backdrop-blur-2xl">
        <nav className="section-shell flex h-16 items-center justify-between">
          <a href="#hero" className="font-display text-sm font-bold uppercase tracking-[0.24em] text-white">
            Saravanan<span className="text-aqua">.dev</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="rounded px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <MagneticButton href={resume} variant="ghost">
            <Download className="h-4 w-4" />
            Resume
          </MagneticButton>
        </nav>
      </header>

      <section id="hero" className="section-shell flex min-h-screen items-center pt-20">
        <div className="grid w-full items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-6 inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/75 backdrop-blur-lg"
            >
              <MapPin className="h-4 w-4 text-aqua" />
              Tamil Nadu, India
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06 }}
              className="text-balance font-display text-5xl font-semibold leading-[1.01] text-white sm:text-7xl lg:text-8xl"
            >
              Saravanan Iyappan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-5 font-display text-xl text-aqua sm:text-2xl"
            >
              <span className="typewriter">Java Backend Developer</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="mt-5 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl"
            >
              Building scalable backend systems with clean code, reliable REST APIs,
              normalized MySQL schemas, and production-minded Java architecture.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton href="#projects">
                View projects
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href={`mailto:${email}`} variant="ghost">
                Contact me
                <Mail className="h-4 w-4" />
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="glass relative overflow-hidden rounded-lg p-5"
          >
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-aqua/20 blur-2xl" />
            <div className="relative rounded border border-white/10 bg-black/35 p-4">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-coral" />
                  <span className="h-3 w-3 rounded-full bg-signal" />
                  <span className="h-3 w-3 rounded-full bg-aqua" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">architecture.ts</span>
              </div>
              <div className="space-y-3 font-mono text-sm text-white/75">
                <p><span className="text-coral">const</span> service = <span className="text-aqua">SpringBoot</span>();</p>
                <p><span className="text-coral">route</span>(<span className="text-mint">"/api/tickets"</span>).secure(<span className="text-signal">RBAC</span>);</p>
                <p><span className="text-violet">repository</span>.save(entity).using(<span className="text-aqua">JPA</span>);</p>
                <p><span className="text-white/50">// clean layers, fast delivery</span></p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {["API", "DAO", "SQL"].map((item) => (
                  <div key={item} className="rounded border border-aqua/20 bg-aqua/10 px-3 py-4 text-center font-display text-sm font-bold text-aqua">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section-shell py-24">
        <SectionTitle
          eyebrow="Identity"
          title="A backend engineer profile with a clear systems signature."
          copy="The portfolio is shaped around the way backend work actually gets reviewed: architecture clarity, database thinking, reliable API contracts, and evidence of disciplined project execution."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {aboutCards.map(({ title, copy, icon: Icon }) => (
            <TiltCard key={title} className="p-6">
              <Icon className="h-8 w-8 text-aqua" />
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-white/70">{copy}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section id="skills" className="section-shell py-24">
        <SectionTitle
          eyebrow="Skill Orbit"
          title="Interactive backend toolkit with visual weight."
          copy="Skills are presented as a small runtime ecosystem, not a static checklist."
        />
        <div className="relative grid gap-4 lg:min-h-[520px] lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="glass rounded-lg p-7">
            <Cpu className="h-10 w-10 text-aqua" />
            <h3 className="mt-5 font-display text-3xl font-semibold text-white">Backend Runtime Core</h3>
            <p className="mt-4 leading-7 text-white/70">
              Java services, REST APIs, JPA persistence, MySQL schemas, Maven builds,
              and GitHub workflow tied together for recruiter-ready delivery.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="glass glow-border rounded-lg p-5"
                >
                  <div className={`mb-5 grid h-14 w-14 place-items-center rounded bg-gradient-to-br ${skill.color} font-display text-sm font-black text-graphite shadow-glow`}>
                    {skill.logo}
                  </div>
                  <Icon className="mb-4 h-6 w-6 text-aqua" />
                  <h3 className="font-display text-lg font-semibold text-white">{skill.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{skill.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="section-shell py-24">
        <SectionTitle
          eyebrow="Projects"
          title="Premium project cards with backend proof, not generic thumbnails."
          copy="Each card includes a mock interface, engineering signal, stack, and direct action buttons."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.62, delay: index * 0.08 }}
                whileHover={{ y: -12, rotateX: 3, rotateY: -3 }}
                className="project-card glass glow-border rounded-lg p-5"
              >
                <ProjectMockup title={project.title} accent={project.accent} />
                <div className="project-depth pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-8 w-8 text-aqua" />
                    <span className="rounded border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/60">{project.stack}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{project.title}</h3>
                  <p className="mt-4 leading-7 text-white/70">{project.description}</p>
                  <p className="mt-5 border-l-2 border-aqua pl-4 text-sm leading-6 text-white/75">{project.signal}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <span key={metric} className="rounded border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                        {metric}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={github} className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 text-xs font-bold text-graphite">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a href={`mailto:${email}?subject=${encodeURIComponent(project.title)}`} className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white">
                      <ExternalLink className="h-4 w-4" />
                      Live preview
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="section-shell py-24">
        <SectionTitle
          eyebrow="Experience"
          title="A balanced timeline for project-driven backend experience."
          copy="Built to show progression, scope, and engineering habits clearly on both desktop and mobile."
        />
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-aqua via-violet to-transparent md:block" />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-lg p-6 md:ml-12 md:p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded border border-aqua/25 bg-aqua/10 px-3 py-2 text-sm font-bold text-aqua">
                  <BriefcaseBusiness className="h-4 w-4" />
                  2024 - Present
                </div>
                <h3 className="font-display text-3xl font-semibold text-white">Backend Developer (Projects)</h3>
                <p className="mt-2 text-white/60">Self-directed / Academic Projects</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded border border-violet/30 bg-violet/20 shadow-violet">
                <Zap className="h-8 w-8 text-aqua" />
              </div>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {experienceBullets.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded border border-white/10 bg-white/[0.06] p-4"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-aqua/10 text-sm font-bold text-aqua">
                    {index + 1}
                  </div>
                  <p className="leading-7 text-white/70">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section-shell py-24">
        <div className="glass rounded-lg p-6 sm:p-10">
          <SectionTitle
            eyebrow="Contact"
            title="Ready for backend internships, fresher roles, and startup teams."
            copy="Reach me directly through email, GitHub, LinkedIn, or download the resume summary."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {contactLinks.map(({ label, href, detail, icon: Icon }) => (
              <a key={label} href={href} className="glow-border rounded border border-white/10 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/20">
                <Icon className="h-7 w-7 text-aqua" />
                <p className="mt-4 font-display text-lg font-semibold text-white">{label}</p>
                <p className="mt-2 break-words text-sm text-white/60">{detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="section-shell border-t border-white/10 py-8">
        <div className="flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>Designed and built for Saravanan Iyappan - Java Backend Developer.</p>
          <div className="flex gap-3">
            <a href={github} aria-label="GitHub" className="rounded border border-white/10 bg-white/10 p-2 text-white transition hover:text-aqua">
              <Github className="h-4 w-4" />
            </a>
            <a href={linkedin} aria-label="LinkedIn" className="rounded border border-white/10 bg-white/10 p-2 text-white transition hover:text-aqua">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${email}`} aria-label="Email" className="rounded border border-white/10 bg-white/10 p-2 text-white transition hover:text-aqua">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
