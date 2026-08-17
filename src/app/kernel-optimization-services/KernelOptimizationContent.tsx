"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Magnetic from "@/components/motion/Magnetic";
import type { BlogPost } from "@/lib/blogs";
import BenefitsList from "@/components/sections/BenefitsList";
import TestimonialGrid from "@/components/sections/TestimonialGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import RelatedBlogsSection from "@/components/sections/RelatedBlogsSection";
import HireContactForm from "@/components/sections/HireContactForm";

const STATS = [
  { value: 8, suffix: "x", label: "Faster System Response" },
  { value: 35, suffix: "%", label: "Lower Infrastructure Overhead" },
];

const CAPABILITIES = [
  {
    id: "01",
    tag: "LINUX KERNEL",
    title: "Linux Kernel Optimization",
    body: "We tune the kernel for efficient scheduling, process management, memory usage, and filesystem use to speed up workload execution and system responsiveness. All configurations are checked to ensure higher stability, less response time and uniformity under actual conditions.",
  },
  {
    id: "02",
    tag: "RESOURCE MGMT",
    title: "System Resource Optimization",
    body: "Our experts tweak CPU affinity, NUMA balancing, cache usage, storage throughput and networking parameters for maximum infrastructure efficiency. This leads to better resource utilization, reduced operating expenses and controlled application performance.",
  },
  {
    id: "03",
    tag: "METRICS & TELEMETRY",
    title: "Performance Monitoring & Analysis",
    body: "Many profiling tools and even continuous monitoring tools are used to determine kernel-level issues that impact performance. Detailed diagnostics and benchmarking enable data-driven optimizations for better reliability, throughput and long-term operational efficiency.",
  },
];

const PROCESS = [
  {
    title: "Discover",
    body: "Discuss and evaluate the current infrastructure, workload, kernel configurations and performance goals to help create a definite optimization goal sheet for the operation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Evaluate",
    body: "Produce a report that describes the nature of the performance constraints and the root causes through system logs, hardware utilization, scheduling behaviour, memory utilization and input/output activity.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="2 12 6 5 10 16 14 9 18 13 22 8" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: "Optimize",
    body: "Apply tested kernel configurations, resource management enhancements and operating system improvements customized to your infrastructure and application needs.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
  {
    title: "Verify",
    body: "Validate all optimizations using benchmarking, monitoring and performance testing to assure improved results while not impacting system stability.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 4.5v5c0 4.5-3.5 8.5-8 9.5-4.5-1-8-5-8-9.5v-5z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Maintain",
    body: "Monitor OS performance constantly, make required tuning changes and support changing workloads with proactive kernel support services.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Improve",
    body: "Tune kernel settings as infrastructure expands, applications evolve, and operational needs change in order to keep improvements going for the long-term.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const BENEFITS = [
  { title: "Improved Operational Stability", body: "Minimize unforeseen disruptions to your system and provide a more stable environment for essential business applications, 24 hours a day." },
  { title: "Efficient Resource Allocation", body: "Properly utilize processors, memory, storage and networking resources so that they are not wasted and provide better workload performance throughout your infrastructure." },
  { title: "Faster Application Execution", body: "Reduce delays arising from inefficient kernel behaviour so that under high workloads applications can process requests faster and more reliably." },
  { title: "Stronger Infrastructure Reliability", body: "Optimize operating system configurations to enhance the overall resilience of the operating system for continuous business operations and minimize maintenance-related disruptions." },
  { title: "Better Scalability", body: "Build infrastructure for future growth using kernel configurations optimized for future workloads as well as for system performance." },
  { title: "Long-Term Performance Management", body: "Keep the operating system tuned, monitored and optimized for maximum efficiency as infrastructure needs evolve." },
];

const WHY = [
  { title: "Experienced Linux Engineers", body: "We have a wealth of expertise in the enterprise Linux space, assisting organizations to optimize kernel functionality, troubleshoot system issues and enhance the reliability of their infrastructure using proven engineering practices." },
  { title: "Performance-Driven Methodology", body: "Each recommendation is derived from a comprehensive system analysis, benchmark and workload assessment. Only validated changes that provide measurable improvements are implemented, without unnecessary operational risk." },
  { title: "Optimization Built Around Your Workload", body: "Each workload in every business is different. Application, architecture, and environment-specific kernel parameters are tuned to enhance processing efficiency, resource allocation, and OS stability, without sacrificing performance." },
];

const TESTIMONIALS = [
  { quote: "Their kernel optimization expertise dramatically reduced our server response times. The changes were precise, validated, and production-safe.", name: "Ethan Parker", org: "Director of Engineering, BrightPath Solutions" },
  { quote: "After their OS tuning work, our Linux infrastructure became noticeably more stable under peak load. Clear, measurable gains.", name: "Megan Collins", org: "CTO, NorthPeak Digital" },
  { quote: "We hired their Linux engineers for a complex optimization project. The results — lower latency, better resource use — were exactly what we needed.", name: "Ryan Mitchell", org: "Chief Operating Officer, ClearStone Consulting" },
];

const FAQS = [
  { q: "Can optimization be performed on live production servers?", a: "Yes. To keep the operating environment minimally impacted while maintaining stability, we use controlled implementation procedures and rigorous testing and validation procedures." },
  { q: "Which Linux operating systems do you support?", a: "We focus our optimisation efforts on mainly Linux based operating systems, such as enterprise variants in cloud, virtualisation and on-premises production environments." },
  { q: "Will the kernel changes impact existing applications?", a: "In most cases, no. We focus on optimizing the operating system performance without compromising the existing applications, services or production workloads." },
  { q: "How do you measure success when optimizing?", a: "System performance is evaluated before and after implementation through benchmarks, resource usage measures, response times, throughput analysis and continuous performance monitoring." },
];

/** Overview SVG — kernel scheduling / system layers motif */
function OverviewSvg() {
  return (
    <svg
      viewBox="0 0 360 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* background grid */}
      <g stroke="var(--color-line)" strokeWidth="0.6" opacity="0.5">
        {[0, 60, 120, 180, 240, 300, 360].map((x) => (
          <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="180" />
        ))}
        {[0, 45, 90, 135, 180].map((y) => (
          <line key={`gy${y}`} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* Layer stack — OS kernel layers */}
      {[
        { y: 30, w: 280, label: "HARDWARE", opacity: "0.25" },
        { y: 65, w: 240, label: "KERNEL SPACE", opacity: "0.45" },
        { y: 100, w: 200, label: "SYSTEM CALLS", opacity: "0.65" },
        { y: 135, w: 160, label: "USER SPACE", opacity: "0.9" },
      ].map((layer) => (
        <g key={layer.label}>
          <rect
            x={(360 - layer.w) / 2}
            y={layer.y}
            width={layer.w}
            height="26"
            fill="var(--color-ink)"
            fillOpacity={layer.opacity}
            stroke="var(--color-ink)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x="180"
            y={layer.y + 17}
            textAnchor="middle"
            fill="var(--color-linen)"
            fontSize="8"
            fontFamily="var(--font-mono)"
            letterSpacing="2"
          >
            {layer.label}
          </text>
        </g>
      ))}

      {/* top label */}
      <text x="40" y="20" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.7">KERNEL LAYERS</text>
    </svg>
  );
}

export default function KernelOptimizationContent({ blogPosts = [] }: { readonly blogPosts?: BlogPost[] }) {
  const reduced = useReducedMotion();

  const RELATED_BLOGS = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
              <span className="block overflow-clip">
                <motion.span
                  className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  Kernel Optimization Services
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2"
            >
              Our Kernel Optimization Services enhance the efficiency, stability and responsiveness of Linux-based systems in enterprise environments. We optimise kernel parameters, scheduler actions, memory usage, and disk optimisation to overcome performance constraints and handle demanding production workloads.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10"
            >
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Get Free Consultation</a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Hero SVG — right column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md" aria-hidden="true">
              {/* outer border */}
              <rect x="20" y="20" width="440" height="280" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="6 4" />
              {/* inner card */}
              <rect x="60" y="60" width="360" height="200" fill="var(--color-paper)" fillOpacity="0.08" stroke="var(--color-line)" strokeWidth="1" />
              {/* kernel grid */}
              {[100, 140, 180, 220, 260, 300, 340].map((x) => (
                <line key={`kx${x}`} x1={x} y1="60" x2={x} y2="260" stroke="var(--color-line)" strokeWidth="0.5" strokeOpacity="0.4" />
              ))}
              {[100, 140, 180, 220].map((y) => (
                <line key={`ky${y}`} x1="60" y1={y} x2="420" y2={y} stroke="var(--color-line)" strokeWidth="0.5" strokeOpacity="0.4" />
              ))}
              {/* active cell highlight */}
              <rect x="180" y="140" width="40" height="40" fill="var(--color-ink)" fillOpacity="0.15" stroke="var(--color-ink)" strokeWidth="1.5" />
              {/* lightning bolt */}
              <path d="M204 152 L196 162 L202 162 L198 174 L208 160 L202 160 Z" fill="var(--color-ink)" fillOpacity="0.7" />
              {/* throughput bars */}
              <rect x="340" y="200" width="16" height="40" fill="var(--color-ink-3)" fillOpacity="0.3" stroke="var(--color-ink-3)" strokeWidth="1" />
              <rect x="360" y="185" width="16" height="55" fill="var(--color-ink-2)" fillOpacity="0.4" stroke="var(--color-ink-2)" strokeWidth="1" />
              <rect x="380" y="165" width="16" height="75" fill="var(--color-ink)" fillOpacity="0.6" stroke="var(--color-ink)" strokeWidth="1.5" />
              {/* labels */}
              <text x="73" y="285" fill="var(--color-ink-3)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.6">KERNEL // OPTIMISED</text>
              <text x="336" y="250" fill="var(--color-ink-3)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">THROUGHPUT ↑</text>
            </svg>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Overview + stats */}
        <section className="section" id="overview">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Overview</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">What does Kernel Optimization mean?</SplitHeading>
                <Reveal>
                  <p className="text-ink-2 max-w-[60ch]">
                    Kernel optimisation is the act of tuning and tweaking the operating system kernel, which is responsible for hardware resource management. Greater efficiency in processes like CPU scheduling, memory utilization, storage access, networking and kernel configuration algorithms can enable faster application performance, higher system stability and better resource utilization in physical, virtual and cloud systems.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-ink-2 max-w-[60ch]">
                    Optimized kernels can lower latency, bring better consistency on workloads and provide better efficiency for business-critical applications. From enterprise databases to cloud-based applications, virtualization, and high-performance computing, kernel optimization guarantees the system's reliability and efficiency in high-quality production environments.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-10">
                <Reveal>
                  <OverviewSvg />
                </Reveal>
                <Stagger className="grid grid-cols-2 gap-x-8 gap-y-8" step={0.08}>
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <p className="font-mono text-[clamp(2rem,4vw,3rem)] leading-none text-ink font-bold">
                        <Counter value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-2.5 text-[0.8125rem] md:text-[0.875rem] text-ink-3 uppercase tracking-[0.15em] font-mono">{s.label}</p>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section bg-paper border-y border-line" id="capabilities">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Optimize Performance That Powers Critical Systems</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  Our engineers take a deep look at the behavior of the kernel, workloads, and the configuration of operating systems to achieve better system responsiveness, allocation of resources, and performance of infrastructure within enterprise Linux deployments.
                </p>
              </Reveal>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Card 1 — full width */}
              <div className="lg:col-span-12 grid lg:grid-cols-12 gap-0 border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line">
                  <div className="w-full flex flex-col">
                    <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                      <span>[ OPT_01 ]</span>
                      <span>LINUX KERNEL</span>
                    </div>
                    <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">{CAPABILITIES[0].title}</h3>
                    <p className="text-[0.875rem] text-ink-2 leading-relaxed">{CAPABILITIES[0].body}</p>
                  </div>
                </div>
                {/* Live scheduler animation */}
                <div className="lg:col-span-6 bg-paper min-h-[280px] flex flex-col justify-center p-6 font-mono text-[0.8125rem]">
                  <div className="flex items-center justify-between border-b border-line pb-4 mb-5">
                    <span className="text-ink font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></span>
                      <span>KERNEL_SCHEDULER: ACTIVE</span>
                    </span>
                    <span className="text-ink-3 text-[10px] uppercase">CFS Policy</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["sched_latency_ns → 4ms", "sched_min_granularity_ns → 500µs", "vm.swappiness → 10", "kernel.numa_balancing → 1", "net.core.somaxconn → 65535"].map((line) => (
                      <div key={line} className="flex items-center gap-3">
                        <span className="text-green-500 dark:text-green-400 text-[10px]">✔</span>
                        <span className="text-ink-2 text-[0.8rem]">{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 mt-5">
                    <div>
                      <span className="text-ink-3 block text-[10px] uppercase">Context switches</span>
                      <span className="text-ink font-bold">-62%</span>
                    </div>
                    <div>
                      <span className="text-ink-3 block text-[10px] uppercase">Task latency</span>
                      <span className="text-ink font-bold">1.4ms (OPTIMAL)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="lg:col-span-6 flex flex-col justify-between border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                <div className="p-6 md:p-8 flex-1 flex flex-col border-b border-line">
                  <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                    <span>[ OPT_02 ]</span>
                    <span>RESOURCE MGMT</span>
                  </div>
                  <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">{CAPABILITIES[1].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{CAPABILITIES[1].body}</p>
                </div>
                <div className="bg-paper min-h-[220px] p-6 font-mono text-[0.8125rem] flex flex-col justify-center">
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "CPU Utilization", pct: 94 },
                      { label: "Memory Efficiency", pct: 88 },
                      { label: "Storage Throughput", pct: 91 },
                      { label: "Network Bandwidth", pct: 86 },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] text-ink-3 uppercase">
                          <span>{m.label}</span>
                          <span>{m.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-line rounded overflow-hidden">
                          <div className="h-full bg-ink rounded" style={{ width: `${m.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="lg:col-span-6 flex flex-col justify-between border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                <div className="p-6 md:p-8 flex-1 flex flex-col border-b border-line">
                  <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                    <span>[ OPT_03 ]</span>
                    <span>METRICS & TELEMETRY</span>
                  </div>
                  <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">{CAPABILITIES[2].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{CAPABILITIES[2].body}</p>
                </div>
                <div className="bg-paper min-h-[220px] p-6 font-mono text-[0.8125rem] flex flex-col justify-center gap-4">
                  {[
                    { metric: "perf stat — cache-misses", val: "0.41%", good: true },
                    { metric: "iostat — await", val: "1.2ms", good: true },
                    { metric: "vmstat — si/so", val: "0 / 0", good: true },
                    { metric: "ss — retrans", val: "0.003%", good: true },
                  ].map((row) => (
                    <div key={row.metric} className="flex items-center justify-between border-b border-line pb-2 last:border-b-0 last:pb-0">
                      <span className="text-ink-3 text-[10px]">{row.metric}</span>
                      <span className={`font-bold text-[0.8rem] ${row.good ? "text-green-500 dark:text-green-400" : "text-ink"}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Reveal className="mt-10">
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Get in Touch With Us</a>
              </Magnetic>
            </Reveal>
          </div>
        </section>

        {/* Second capabilities block — "Create Stable…" */}
        <section className="section" id="solutions">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Create Stable, Efficient &amp; High-Performing OSs</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  Each infrastructure environment's requirements for workloads vary. Our kernel experts analyze system architecture, discover inefficient processes within the OS, and apply specific optimizations that enhance system stability, responsiveness and reliability without compromising the critical functions of the business.
                </p>
              </Reveal>
            </div>

            <Stagger className="grid md:grid-cols-3 gap-6" step={0.08}>
              {[
                {
                  tag: "CONFIGURATION",
                  title: "Custom Kernel Configuration",
                  body: "Each workload in every business is different. Application, architecture and environment-specific kernel parameters are tuned to further enhance processing efficiency, resource allocation, and OS stability, without sacrificing performance.",
                },
                {
                  tag: "ENGINEERING",
                  title: "System Performance Engineering",
                  body: "Our engineers fine-tune CPU scheduling, memory consumption, storage operations, network communication, and more to remove performance constraints. The outcome is smoother execution of the applications, better responsiveness and consistent performance in production environments.",
                },
                {
                  tag: "SUPPORT",
                  title: "Kernel Maintenance & Support",
                  body: "Optimization of the kernel is a continuous process. We keep a close eye on system activity, install known patches, test your system configuration and ensure that your OS is secure, reliable, and optimized as workloads change.",
                },
              ].map((item, i) => (
                <div key={item.title} className="group p-6 md:p-8 bg-linen border border-line shadow-[4px_4px_0px_0px_var(--color-line)] hover:shadow-[8px_8px_0px_0px_var(--color-line)] transition-all duration-300 flex flex-col hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                    <span>[ SOL_0{i + 1} ]</span>
                    <span className="uppercase">{item.tag}</span>
                  </div>
                  <h3 className="font-sans font-medium text-[1.125rem] text-ink mb-3">{item.title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Process */}
        <section className="section bg-paper border-y border-line" id="process">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28 h-fit">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Our Approach</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">A Practical Framework for Kernel Optimization</SplitHeading>
                <Reveal><p className="text-ink font-medium text-[1.0625rem]">Disciplined Engineering, Measurable Gains</p></Reveal>
                <Reveal delay={0.06}>
                  <p className="text-ink-2 max-w-[45ch]">All engagements are based on a disciplined engineering process that emphasizes measurable gains, operations continuity and infrastructure performance over short-term configuration changes.</p>
                </Reveal>
                <Reveal delay={0.12} className="mt-6 hidden lg:block">
                  <Magnetic strength={0.18}>
                    <a href="/contact/" className="btn btn-primary">Start Your Optimization</a>
                  </Magnetic>
                </Reveal>
              </div>

              <div className="lg:col-span-7 flex flex-col">
                <div className="border-t border-line">
                  {PROCESS.map((p, i) => (
                    <div key={p.title} className="group flex gap-6 p-6 border-b border-line hover:bg-tint transition-all duration-300">
                      <div className="flex flex-col items-center">
                        <span className="font-mono text-[1.25rem] text-ink font-semibold tabular-nums leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="w-px flex-1 bg-line/60 my-3 group-last:hidden" />
                        <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center bg-paper text-ink-2 group-hover:text-ink group-hover:border-ink transition-colors duration-300">
                          {p.icon}
                        </div>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className="font-sans font-medium text-[1.0625rem] text-ink mb-2">{p.title}</h3>
                        <p className="text-[0.875rem] text-ink-2 max-w-[55ch] leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 block lg:hidden px-6">
                  <Magnetic strength={0.18}>
                    <a href="/contact/" className="btn btn-primary w-full text-center">Start Your Optimization</a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA banner */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Need Reliable Kernel Optimization Experts?</SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 text-ink-2 max-w-[60ch]">
                Our experts optimize operating environments for Linux kernel, enterprise servers, cloud infrastructure and production workloads to ensure stable, secure, high-performance operating environments that scale with your business.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10">
                <Magnetic strength={0.18}>
                  <a href="/contact/" className="btn btn-primary">Let&rsquo;s Talk About Your Infrastructure</a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        <BenefitsList heading="Why Kernel Optimization Matters" items={BENEFITS} />

        {/* Why choose us */}
        <section className="section bg-paper border-y border-line" id="why">
          <div className="container-j">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Why Us</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] mt-2">Why Partner with Jashom?</SplitHeading>
              <p className="mt-3 text-ink-2 text-[0.9375rem]">Technology precision for trustworthy Linux performance</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {WHY.map((w, i) => {
                const icons = [
                  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
                  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
                  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
                ];
                return (
                  <Reveal key={w.title} delay={i * 0.08} className="h-full">
                    <div className="group h-full p-6 md:p-8 bg-linen border border-line shadow-[4px_4px_0px_0px_var(--color-line)] hover:shadow-[8px_8px_0px_0px_var(--color-line)] transition-all duration-300 flex flex-col items-start hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center bg-white text-ink-2 group-hover:text-ink group-hover:border-ink group-hover:bg-tint transition-all duration-300 mb-6">
                        {icons[i]}
                      </div>
                      <h3 className="font-sans font-medium text-[1.125rem] text-ink mb-3">{w.title}</h3>
                      <p className="text-[0.875rem] text-ink-2 leading-relaxed">{w.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <TestimonialGrid heading="Trusted by Businesses That Depend on Linux" subtitle="Industries around the world depend on Jashom to make their operating system perform more efficiently and increase infrastructure stability." items={TESTIMONIALS} />

        <FaqAccordion subtitle="Common Questions About Kernel Optimization" items={FAQS} sectionClassName="section" />

        <RelatedBlogsSection posts={RELATED_BLOGS} />

        <HireContactForm
          heading="Manage and Optimize Your Linux Infrastructure with Confidence"
          description="From performance optimization to troubleshooting bottlenecks and creating a more stable operating environment, our experts are here to assist you. Share your infrastructure details and we'll suggest the best optimization for your business."
          messagePlaceholder="Tell us about your Linux infrastructure and performance goals."
          messageFallback="Kernel Optimization enquiry"
          sectionClassName="section bg-paper border-y border-line"
        />
      </main>
    </>
  );
}
