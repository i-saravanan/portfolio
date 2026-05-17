"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
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
  Orbit,
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
import Scene from "@/components/Scene";

const email = "saravanan05082004@gmail.com";
const github = "https://github.com/i-saravanan";
const linkedin = "https://www.linkedin.com/in/saravanan-i";
const resume = "/saravanan-iyappan-resume.html";

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

const techLogos = [
  { name: "Java", mark: "J", icon: Code2, gradient: "from-orange-300 via-red-400 to-coral" },
  { name: "Spring Boot", mark: "S", icon: Sparkles, gradient: "from-emerald-300 via-mint to-lime-300" },
  { name: "MySQL", mark: "MY", icon: Database, gradient: "from-sky-300 via-aqua to-blue-500" },
  { name: "Hibernate", mark: "H", icon: Layers3, gradient: "from-yellow-200 via-amber-300 to-orange-400" },
  { name: "Git", mark: "G", icon: GitBranch, gradient: "from-orange-300 via-coral to-rose-500" },
  { name: "GitHub", mark: "GH", icon: Github, gradient: "from-white via-slate-300 to-slate-500" },
  { name: "Maven", mark: "MV", icon: TerminalSquare, gradient: "from-fuchsia-300 via-violet to-purple-500" },
  { name: "React", mark: "R", icon: Orbit, gradient: "from-cyan-200 via-aqua to-blue-400" },
  { name: "Next.js", mark: "N", icon: Cpu, gradient: "from-white via-slate-200 to-aqua" }
];

const projects = [
  {
    title: "Role-Based Ticket Management System",
    stack: "Java / Hibernate / MySQL",
    summary: "RBAC helpdesk workflow with login, ticket creation, admin assignment, and agent status updates.",
    chips: ["RBAC", "DAO layer", "Hibernate", "MySQL"],
    icon: ShieldCheck,
    accent: "from-aqua via-violet to-coral"
  },
  {
    title: "Smart Agriculture AI System",
    stack: "AI workflow / Backend logic",
    summary: "Agriculture decision-support system concept with data flow, prediction, and automation logic.",
    chips: ["AI flow", "Domain model", "Automation", "Data"],
    icon: Network,
    accent: "from-mint via-aqua to-violet"
  },
  {
    title: "Employment Leave Management System",
    stack: "Java / Auth / Database",
    summary: "Leave request and approval workflow with authentication, validation, and database integration.",
    chips: ["Auth", "Workflow", "CRUD", "Schema"],
    icon: Workflow,
    accent: "from-coral via-violet to-aqua"
  }
];

const experience = [
  "Built REST APIs with Spring Boot and Hibernate for production-grade backend systems",
  "Designed normalized MySQL database schemas and implemented JPA repositories",
  "Developed role-based access control and authentication systems",
  "Built scalable backend architectures using Java and Spring Boot",
  "Practiced DSA consistently on LeetCode for placement preparation",
  "Used Git and GitHub for version control and collaborative workflow",
  "Developed backend-driven full-stack applications with database integration"
];

const aboutCards = [
  { title: "API Systems", body: "Spring Boot REST APIs, authentication, role-based access control, and workflow logic.", icon: Server },
  { title: "Persistence", body: "MySQL schemas, Hibernate mappings, JPA repositories, and database integration.", icon: Database },
  { title: "Delivery", body: "Git, GitHub, Maven, project structure, and readable implementation habits.", icon: BadgeCheck }
];

const contactLinks = [
  { label: "Email", href: `mailto:${email}`, detail: email, icon: Mail },
  { label: "GitHub", href: github, detail: "github.com/i-saravanan", icon: Github },
  { label: "LinkedIn", href: linkedin, detail: "linkedin.com/in/saravanan-i", icon: Linkedin },
  { label: "Resume", href: resume, detail: "Resume summary", icon: Download }
];

function CursorSystem() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const size = useMotionValue(34);
  const smoothX = useSpring(x, { stiffness: 150, damping: 26, mass: 0.25 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 26, mass: 0.25 });
  const smoothSize = useSpring(size, { stiffness: 180, damping: 20 });
  const cursorX = useTransform(smoothX, (value) => value - 17);
  const cursorY = useTransform(smoothY, (value) => value - 17);
  const auraX = useTransform(smoothX, (value) => value - 192);
  const auraY = useTransform(smoothY, (value) => value - 192);
  const [trail, setTrail] = useState(() =>
    Array.from({ length: 10 }, (_, index) => ({ id: index, x: -100, y: -100 }))
  );

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(target?.closest("a, button, .magnetic, .project-card"));

      x.set(event.clientX);
      y.set(event.clientY);
      size.set(interactive ? 72 : 34);
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);

      setTrail((items) => {
        const first = items[0] ?? { id: 0, x: -100, y: -100 };
        const rest = items.slice(1);
        return [...rest, { ...first, x: event.clientX, y: event.clientY }];
      });
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [size, x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      {trail.map((dot, index) => (
        <motion.span
          key={dot.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-aqua"
          animate={{
            x: dot.x,
            y: dot.y,
            opacity: index / trail.length,
            scale: 0.45 + index / trail.length
          }}
          transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.22 }}
          style={{ boxShadow: "0 0 18px rgba(55,215,255,0.75)" }}
        />
      ))}
      <motion.div
        className="absolute rounded-full border border-aqua/70 bg-aqua/10 mix-blend-screen shadow-[0_0_38px_rgba(55,215,255,0.55)]"
        style={{
          x: cursorX,
          y: cursorY,
          width: smoothSize,
          height: smoothSize
        }}
      />
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-violet/15 blur-3xl"
        style={{
          x: auraX,
          y: auraY
        }}
      />
    </div>
  );
}

function Magnetic({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  return (
    <motion.div
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function ActionLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Magnetic className="inline-flex">
      <motion.a
        href={href}
        whileTap={{ scale: 0.97 }}
        className={
          variant === "primary"
            ? "glow-border inline-flex items-center gap-2 rounded bg-aqua px-5 py-3 text-sm font-black text-graphite shadow-glow transition hover:bg-white"
            : "inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-aqua/60 hover:bg-white/20"
        }
      >
        {children}
      </motion.a>
    </Magnetic>
  );
}

function SectionHeader({
  eyebrow,
  title
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65 }}
      className="mb-10 max-w-3xl"
    >
      <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-aqua">{eyebrow}</p>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
        {title}
      </h2>
    </motion.div>
  );
}

function TechLogo({
  tech,
  index
}: {
  tech: (typeof techLogos)[number];
  index: number;
}) {
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 26 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.045 }}
      whileHover={{ y: -12, scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
      className="magnetic glass glow-border group rounded-lg p-4"
    >
      <div className={`relative grid h-16 w-16 place-items-center rounded bg-gradient-to-br ${tech.gradient} font-display text-sm font-black text-graphite shadow-glow`}>
        <span>{tech.mark}</span>
        <div className="absolute inset-0 rounded bg-white/20 opacity-0 blur-xl transition group-hover:opacity-100" />
      </div>
      <Icon className="mt-5 h-6 w-6 text-aqua" />
      <h3 className="mt-4 font-display text-lg font-semibold text-white">{tech.name}</h3>
    </motion.div>
  );
}

function ProjectPreview({ accent }: { accent: string }) {
  return (
    <div className="mockup-grid relative h-48 overflow-hidden rounded border border-white/10 bg-black/35 p-4">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal" />
          <span className="h-2.5 w-2.5 rounded-full bg-aqua" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">api monitor</span>
      </div>
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
        <div className="space-y-2">
          <div className="h-20 rounded border border-aqua/20 bg-aqua/10" />
          <div className="h-10 rounded border border-violet/20 bg-violet/20" />
        </div>
        <div className="space-y-2">
          <div className="h-3 rounded bg-white/20" />
          <div className="h-3 w-10/12 rounded bg-white/10" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-14 rounded bg-coral/15" />
            <div className="h-14 rounded bg-aqua/15" />
            <div className="h-14 rounded bg-violet/20" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded border border-white/10 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
        <span>status: stable</span>
        <span className="text-aqua">200 ok</span>
      </div>
    </div>
  );
}

function LoadingIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.55 }}
      className="fixed inset-0 z-[90] grid place-items-center bg-graphite"
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded border border-aqua/40 bg-aqua/10 shadow-glow"
          animate={{ rotate: 360, scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <Cpu className="h-7 w-7 text-aqua" />
        </motion.div>
        <p className="text-xs font-black uppercase tracking-[0.32em] text-aqua">Initializing runtime</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const particles = useMemo(() => Array.from({ length: 28 }, (_, index) => index), []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LoadingIntro />
      <CursorSystem />
      <Scene />
      <motion.div
        className="fixed left-0 right-0 top-0 z-[75] h-1 origin-left bg-gradient-to-r from-aqua via-violet to-coral"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-graphite/55 backdrop-blur-2xl">
        <nav className="section-shell flex h-16 items-center justify-between">
          <a href="#hero" className="font-display text-sm font-black uppercase tracking-[0.24em] text-white">
            Saravanan<span className="text-aqua">.dev</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="rounded px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <ActionLink href={resume} variant="ghost">
            <Download className="h-4 w-4" />
            Resume
          </ActionLink>
        </nav>
      </header>

      <section id="hero" className="section-shell relative flex min-h-screen items-center pt-20">
        <div className="absolute inset-0 -z-10">
          {particles.map((particle) => (
            <motion.span
              key={particle}
              className="absolute h-1 w-1 rounded-full bg-aqua"
              style={{
                left: `${(particle * 37) % 100}%`,
                top: `${(particle * 53) % 100}%`
              }}
              animate={{ y: [-18, 18, -18], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 4 + (particle % 6), repeat: Infinity, delay: particle * 0.08 }}
            />
          ))}
        </div>

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
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="text-balance font-display text-5xl font-semibold leading-[1.01] text-white sm:text-7xl lg:text-8xl"
            >
              Saravanan Iyappan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mt-5 font-display text-xl text-aqua sm:text-2xl"
            >
              <span className="typewriter">Java Backend Developer</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl"
            >
              Building scalable backend systems with clean code, REST APIs, Spring Boot,
              Hibernate, JPA repositories, and normalized MySQL schemas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <ActionLink href="#projects">
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </ActionLink>
              <ActionLink href={`mailto:${email}`} variant="ghost">
                Contact
                <Mail className="h-4 w-4" />
              </ActionLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.26 }}
            className="glass overflow-hidden rounded-lg p-5"
          >
            <div className="relative min-h-[360px] overflow-hidden rounded border border-white/10 bg-black/35 p-5">
              <div className="absolute right-8 top-8 h-40 w-40 rounded-full bg-aqua/20 blur-3xl" />
              <div className="absolute bottom-8 left-8 h-32 w-32 rounded-full bg-violet/20 blur-3xl" />
              <motion.div
                className="absolute right-8 top-10 grid h-32 w-32 place-items-center rounded-full border border-aqua/30 bg-aqua/10 shadow-glow"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-16 w-16 rounded-full border border-violet/50 bg-violet/20" />
              </motion.div>
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-coral" />
                    <span className="h-3 w-3 rounded-full bg-signal" />
                    <span className="h-3 w-3 rounded-full bg-aqua" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">backend.core</span>
                </div>
                <div className="space-y-4 font-mono text-sm text-white/75">
                  <p><span className="text-coral">class</span> TicketService {"{"}</p>
                  <p className="pl-5"><span className="text-aqua">@Transactional</span></p>
                  <p className="pl-5">Response createTicket(Request request) {"{"}</p>
                  <p className="pl-10"><span className="text-mint">auth</span>.verifyRole(user);</p>
                  <p className="pl-10"><span className="text-violet">repository</span>.save(entity);</p>
                  <p className="pl-5">{"}"}</p>
                  <p>{"}"}</p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["API", "AUTH", "SQL"].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -6 }}
                      className="rounded border border-aqua/20 bg-aqua/10 px-3 py-5 text-center font-display text-sm font-black text-aqua"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section-shell py-24">
        <SectionHeader eyebrow="Profile" title="Backend-first engineering with clean architecture instincts." />
        <div className="grid gap-4 md:grid-cols-3">
          {aboutCards.map(({ title, body, icon: Icon }) => (
            <Magnetic key={title}>
              <motion.div whileHover={{ y: -10, rotateX: 4, rotateY: -4 }} className="glass glow-border rounded-lg p-6">
                <Icon className="h-8 w-8 text-aqua" />
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-white/70">{body}</p>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </section>

      <section id="skills" className="section-shell py-24">
        <SectionHeader eyebrow="Technology Ecosystem" title="Animated backend stack orbit." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techLogos.map((tech, index) => (
            <TechLogo key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </section>

      <section id="projects" className="section-shell py-24">
        <SectionHeader eyebrow="Projects" title="Interactive systems with API, auth, and database depth." />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.62, delay: index * 0.08 }}
                whileHover={{ y: -12, rotateX: 4, rotateY: -4 }}
                className="project-card glass glow-border rounded-lg p-5"
              >
                <ProjectPreview accent={project.accent} />
                <div className="project-depth pt-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <Icon className="h-8 w-8 shrink-0 text-aqua" />
                    <span className="rounded border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/60">{project.stack}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{project.title}</h3>
                  <p className="mt-4 leading-7 text-white/70">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.chips.map((chip) => (
                      <span key={chip} className="rounded border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/70">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={github} className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 text-xs font-black text-graphite">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a href={`mailto:${email}?subject=${encodeURIComponent(project.title)}`} className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white">
                      <ExternalLink className="h-4 w-4" />
                      Live
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="section-shell py-24">
        <SectionHeader eyebrow="Experience" title="2024 - Present" />
        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-aqua via-violet to-transparent md:block" />
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.7 }}
            className="glass glow-border rounded-lg p-6 md:ml-14 md:p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-aqua">Backend Developer (Projects)</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">Self-directed / Academic Projects</h3>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded border border-violet/30 bg-violet/20 shadow-violet">
                <BriefcaseBusiness className="h-8 w-8 text-aqua" />
              </div>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {experience.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.055 }}
                  className="rounded border border-white/10 bg-white/[0.06] p-4"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-aqua/10 text-sm font-black text-aqua">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="leading-7 text-white/72">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section-shell py-24">
        <div className="glass glow-border rounded-lg p-6 sm:p-10">
          <SectionHeader eyebrow="Contact" title="Backend internships, fresher roles, and startup teams." />
          <div className="grid gap-4 md:grid-cols-4">
            {contactLinks.map(({ label, href, detail, icon: Icon }) => (
              <a key={label} href={href} className="rounded border border-white/10 bg-white/10 p-5 transition hover:-translate-y-1 hover:bg-white/20">
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
          <p>Saravanan Iyappan - Java Backend Developer</p>
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
