"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import HireCudaHeroSvg from "./HireCudaHeroSvg";
import { submitContactForm } from "@/lib/submitContact";

const BADGES = ["15 Days Risk-Free Trial", "24x7 Technical Support", "On-Time Delivery"];

const EXPERTISE = [
  { title: "Advanced Kernel Optimization", body: "We optimize CUDA kernels by creating them to be more warp efficient and less divergent, and optimize instruction throughput. We have a stable implementation and quantifiable speed scalability with complicated workloads." },
  { title: "Scalable Parallel Architecture", body: "In order to achieve higher throughput, our engineers design GPU-oriented systems with maximum concurrency and optimization in the distribution of computational tasks among threads and streaming multiprocessors." },
  { title: "Performance Profiling & Bottleneck Analysis", body: "With the help of modern profiling tools, we will examine execution times, latency, and utilization of the compute to be able to identify areas of inefficiency and employ data-based optimization measures." },
  { title: "AI & Machine Learning Acceleration", body: "We execute model training and inference pipelines at a faster pace by tuning CUDA implementations and better participation of the GPUs, and less computational intensity of large-scale AI tasks." },
  { title: "Efficient Memory Management", body: "Shared, global, pinned, and unified memory usage is optimized by our CUDA developers to minimize the latency of data transfer and maximize the overall application performance." },
  { title: "Multi-GPU & Distributed Computing", body: "We support a multi-GPU execution platform with tuned communication patterns, which enable enterprises to use optimized communication patterns and scale applications with high compute intensity." },
];

const HIRE_STEPS = [
  { title: "Share Your Project Requirements", body: "Characterize your type of workload and performance objectives, infrastructure, and the type of interaction you want so we can match the appropriate technical resources." },
  { title: "Examine Certified Profile of Developers", body: "We offer extensively vetted CUDA engineers who have skills that fit your whenever-needed computational and architectural requirements." },
  { title: "Select Your Hiring Model", body: "Select flexible staffing arrangements, such as full-time, part-time, and project hiring, depending on the scope and the timeline." },
  { title: "Start Development Implementation", body: "The CUDA developer of your choice is integrated with your working process and immediately begins to optimize and accelerate your application." },
];

const WHY_HIRE = [
  { title: "High-Quality Engineering Standards", body: "Our developers observe the best practices of coding and performance to provide stable and maintainable solutions for the GPU." },
  { title: "Strong Data Security & Confidentiality", body: "Our business works under the broad NDAs and safe development procedures to maintain the delicate business logic and intellectual property." },
  { title: "Proven GPU Development Experience", body: "Our group has practical experience in the fields of AI, analytics, simulation, and high-performance computing." },
  { title: "Cost-Optimized Resource Allocation", body: "Dependent employment platforms make sure that you only spend what is needed for your project." },
  { title: "Senior-Level Technical Expertise", body: "Our CUDA engineers have a combination of architectural and practical experience with the implementation of the efficient use of GPUs." },
  { title: "Rapid Onboarding Process", body: "We also make sure that we deploy resources as fast as possible, and this makes your project pick up without any unnecessary delays." },
];

const HIRING_MODELS = [
  { title: "Full-Time", body: "Contract a CUDA developer to work on your long-term project of non-temporal GPU or AI acceleration." },
  { title: "Part-Time", body: "Outsource CUDA specialists on a part-time basis to maintain optimization, upgrades, or performance enhancements." },
  { title: "Time & Material", body: "Flexible hourly development of the scale with changing CUDA needs and optimization via iteration." },
  { title: "Custom Model", body: "Receive a customized staffing plan that is based on your technical, scheduling, and budget requirements." },
];

const WHY_CHOOSE = [
  { title: "High-Impact GPU Acceleration", body: "We re-architect compute workflows to achieve the maximum amount of parallel performance, providing huge improvements in processing time on AI, analytics, and simulation workloads." },
  { title: "Enterprise-Ready AI Systems", body: "We develop CUDA-based AI systems with a scalable, stable, and real-world production foundation, all the way up to architecture planning to deployment pipelines." },
  { title: "Secure Development Framework", body: "To ensure protection of sensitive data and GPU infrastructure, we have strict security criteria, controlled access policies, and processes driven by compliance." },
  { title: "Accelerated Deployment Cycles", body: "Our streamlined development model is designed to be fast prototyping, highly optimizing and easy to move into production systems." },
  { title: "Dedicated Technical Assistance", body: "We maintain a long-term stability of the GPU in terms of performance and stability through constant monitoring, performance tuning, and troubleshooting by our experts." },
  { title: "Performance-Oriented Cost Strategy", body: "We maximize compute usage and assigning GPU resources to minimize infrastructure wastage and maximize investment." },
];

const REVIEWS = [
  { quote: "Our GPU workloads were dramatically improved after working with this team. Their CUDA optimization strategy enhanced throughput and reduced system latency beyond expectations.", who: "CTO, AI Solutions Firm" },
  { quote: "Their way of doing things in parallel contributed to us being able to meet our tight performance deadlines. Very well acquainted and technologically reliable.", who: "VP Engineering, Data Platform Company" },
  { quote: "The extraordinary knowledge of CUDA architecture. They assisted us in moving away the CPU-bound systems to scalable GPU infrastructure quickly.", who: "Lead ML Engineer, Tech Startup" },
  { quote: "Effective communication, good performance, and quantifiable performance benefits. They used their graphics prowess to enhance our analytics engine.", who: "Director of Technology" },
  { quote: "The team provided CUDA versions that were optimized and that reduced the training time of our AI models by a large margin.", who: "Head of AI Research" },
  { quote: "Professional, responsive, and highly skilled in GPU computing. We achieved performance milestones much faster than anticipated.", who: "Product Engineering Manager" },
];

const RELATED = [
  { title: "GPU Optimization Service", body: "Finetune your GPU workloads for maximum speed and efficiency, eliminating bottlenecks and maximizing resource utilization.", href: "/gpu-optimization-service/" },
  { title: "CUDA Development Service", body: "Build high-performance parallel applications with expert CUDA development tailored for speed, scalability and precision.", href: "/cuda-development-service/" },
];

const CONTACT_HIGHLIGHTS = [
  { title: "Quick Response", body: "We respond to all inquiries within 24 hours" },
  { title: "No Obligation", body: "Free consultation with no commitment required" },
  { title: "Expert Matching", body: "We'll match you with developers suited to your project" },
];

const HIRING_OPTIONS = ["Hourly Basis", "Monthly Basis", "Fixed Price Project", "Not Sure Yet"];

const FAQS = [
  { q: "Why should I hire a dedicated CUDA developer instead of a general developer?", a: "The CUDA developers are experts in the domain of the architecture of the GPUs, parallel computing, and optimization of performance. They reorganize algorithms with a specific execution in the GPU and provide much faster and more efficient performance in comparison to the general-purpose programming methods." },
  { q: "What types of projects require CUDA development expertise?", a: "AI/ML training, real-time data analytics, scientific simulations, computer vision, video processing, high-performance computing (HPC), and additional applications that rely on the acceleration provided by a graphics card are all applications that need CUDA skills." },
  { q: "How do CUDA developers improve application performance?", a: "They enhance the execution of the kernel, thread setup, memory, and the transfer of data between the CPU and the GPU. They remove bottlenecks and maximize throughput using profiling tools to get measurable performance improvements." },
  { q: "Can you optimize an existing GPU or CUDA-based application?", a: "Of course. Our CUDA team developers will examine existing implementations, uncover inefficiencies, and implement special-purpose optimization to achieve faster execution speed, scalability, and system stability." },
  { q: "Do you support multi-GPU or distributed GPU environments?", a: "Yes. Our work is scalable multi-GPU designs, where each workload is placed on multiple processors and devices communicate in a more efficient and optimal way to provide the performance of an enterprise." },
  { q: "What hiring models are available for CUDA developers?", a: "You can hire CUDA developers on a full-time basis, part-time basis, hourly basis (time and material), and various other custom ability basis according to your project scope and performance needs." },
];

function Cards({ items, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { items: { title: string; body: string }[]; cols?: string }) {
  return (
    <Stagger className={`grid ${cols} border-t border-line`} itemClassName="h-full" step={0.05}>
      {items.map((c) => (
        <div key={c.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
          <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{c.title}</h3>
          <p className="text-[0.875rem] text-ink-2">{c.body}</p>
        </div>
      ))}
    </Stagger>
  );
}

const ExpertiseVisual = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          <text x="10" y="20" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">WARP EXECUTION ARCHITECTURE</text>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
                <rect key={c} x={25 + c * 24} y={35 + r * 18} width="16" height="12" rx="1" className={`${r === 0 ? "fill-ink/5 animate-pulse" : ""} transition-all duration-300`} />
              ))}
            </g>
          ))}
          <line x1="25" y1="30" x2="215" y2="30" strokeDasharray="3 3" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          <text x="10" y="20" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">STREAM ALLOCATION PROCESSOR</text>
          <rect x="25" y="35" width="80" height="60" rx="2" strokeDasharray="2 2" />
          <text x="35" y="47" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">HOST ENGINE</text>
          <rect x="135" y="35" width="80" height="60" rx="2" />
          <text x="145" y="47" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">GPU CORES</text>
          <path d="M105 55 L135 55" strokeWidth="1.5" className="animate-pulse" />
          <path d="M105 75 L135 75" strokeWidth="1.5" className="animate-pulse" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          <text x="10" y="20" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">PROFILING BOTTLENECK ANALYSIS</text>
          <path d="M25 25 L25 95 L215 95" />
          <path d="M25 80 Q 75 20, 125 70 T 215 40" strokeWidth="1.5" />
          <circle cx="125" cy="70" r="4" className="fill-ink animate-ping" />
          <text x="135" y="73" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">LATENCY SPIKE DETECTED</text>
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          <text x="10" y="20" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">NEURAL WORKLOAD INFERENCE</text>
          {[35, 60, 85].map((y1) => (
            <g key={y1}>
              {[35, 60, 85].map((y2) => (
                <line key={y2} x1="45" y1={y1} x2="115" y2={y2} opacity="0.3" />
              ))}
            </g>
          ))}
          {[35, 60, 85].map((y1) => (
            <g key={y1}>
              {[35, 60, 85].map((y2) => (
                <line key={y2} x1="115" y1={y1} x2="185" y2={y2} opacity="0.3" />
              ))}
            </g>
          ))}
          {[45, 115, 185].map((x) => (
            <g key={x}>
              {[35, 60, 85].map((y) => (
                <circle key={y} cx={x} cy={y} r="5" className="fill-linen stroke-line" />
              ))}
            </g>
          ))}
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          <text x="10" y="20" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">SHARED REGISTER MEMSPACE</text>
          <rect x="25" y="35" width="180" height="20" rx="1" />
          <text x="35" y="47" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">GLOBAL D-RAM (HIGH LATENCY)</text>
          <rect x="25" y="70" width="180" height="30" rx="1" className="fill-ink/5" />
          <text x="35" y="87" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">SHARED L1 CACHE (LOW LATENCY)</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          <text x="10" y="20" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">MULTI-GPU SYSTEM LINK</text>
          <rect x="25" y="40" width="45" height="45" rx="2" />
          <rect x="95" y="40" width="45" height="45" rx="2" />
          <rect x="165" y="40" width="45" height="45" rx="2" />
          <path d="M70 62 L95 62" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
          <path d="M140 62 L165 62" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
          <text x="32" y="66" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">GPU 0</text>
          <text x="102" y="66" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">GPU 1</text>
          <text x="172" y="66" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" stroke="none">GPU 2</text>
        </svg>
      );
  }
};

export default function HireCudaContent() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeExpertise, setActiveExpertise] = useState(0);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
              <span className="block overflow-clip">
                <motion.span className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                  Hire CUDA Developers
                </motion.span>
              </span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 font-mono text-[0.9375rem] text-ink-3">
              CUDA Programming Experts | GPU Acceleration Engineers | Parallel Processing Specialists
            </motion.p>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 max-w-[58ch] text-[1.0625rem] text-ink-2">
              Create high-performance GPU applications using expert CUDA programmers. We develop optimized parallel designs, stream memory, and access the full potential of GPUs to run AI models, simulations, and other data-intensive computing environments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="mt-9 flex flex-col gap-6">
              <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary w-fit">HIRE CUDA DEVELOPER NOW</a></Magnetic>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-ink-2">
                {BADGES.map((b) => (
                  <li key={b} className="flex items-center gap-2"><span className="w-4 h-px bg-ink shrink-0" aria-hidden="true" />{b}</li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <HireCudaHeroSvg />
          </motion.div>
        </div>
      </section>

      <main>
        {/* Intro */}
        <section className="section" id="intro">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5">
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Enhance GPU Performance with Dedicated CUDA Engineers</SplitHeading>
                <Reveal>
                  <p className="text-ink-2 max-w-[68ch]">
                    Our CUDA development team assists companies in taking CPU-based systems to high-performance asymmetric solutions on GPUs. Scheduling the algorithms to perform the parallel execution and refining the thread-level activities, we provide significant improvements in the speed and resource usage. Our engineers become a natural part of your design, all the way to optimization of deployment, and concentrate on providing stable, scalable, and production-ready CUDA implementations.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <Magnetic strength={0.18}>
                    <a href="/contact/" className="btn btn-primary">TALK TO OUR EXPERT</a>
                  </Magnetic>
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.15}>
                  <div className="w-full border border-line bg-paper shadow-[6px_6px_0px_0px_var(--color-line)] p-4 font-mono text-[0.8rem] text-ink leading-relaxed">
                    <div className="flex items-center justify-between border-b border-line pb-2 mb-3 text-ink-3 text-[0.7rem]">
                      <span>SESSION: ACTIVE</span>
                      <span>cuda-profile-tool v1.2</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-ink-3">$ nvprof --metrics achieved_occupancy ./cuda_app</p>
                      <p className="text-ink-3">==12403== Profiling result:</p>
                      <div className="grid grid-cols-4 border-b border-line/30 pb-1 text-ink-3 text-[0.75rem]">
                        <span>Metric</span>
                        <span>Min</span>
                        <span>Max</span>
                        <span>Avg</span>
                      </div>
                      <div className="grid grid-cols-4 text-ink-2">
                        <span>occupancy</span>
                        <span>0.24</span>
                        <span>0.95</span>
                        <span className="text-ink font-bold">0.89</span>
                      </div>
                      <p className="text-[0.7rem] text-ink-3 mt-2">----------------------------------------</p>
                      <p className="text-ink font-semibold mt-1">[JASHOM ACCELERATION STATS]</p>
                      <p className="text-ink-2">Memory Bandwidth: <span className="text-ink font-mono font-bold">84.2 GB/s → 412.8 GB/s</span></p>
                      <p className="text-ink-2">Kernels Divergence: <span className="text-ink font-mono font-bold">Reduced by 85%</span></p>
                      <p className="text-ink font-bold animate-pulse text-[0.85rem] mt-2">SPEEDUP FACTOR: 4.88x</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Technical expertise */}
        <section className="section bg-paper border-y border-line" id="expertise">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Technical Expertise of Our CUDA Developers</SplitHeading>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-start border-t border-line pt-10">
              {/* Left column: vertical tabs list */}
              <div className="lg:col-span-5 flex flex-col border-l border-line">
                {EXPERTISE.map((exp, idx) => (
                  <button
                    key={exp.title}
                    onClick={() => setActiveExpertise(idx)}
                    onMouseEnter={() => setActiveExpertise(idx)}
                    className={`flex items-start text-left gap-4 py-4 px-6 border-b border-line hover:bg-tint transition-all duration-300 ${
                      activeExpertise === idx ? "bg-linen border-l-2 border-l-ink -ml-[2px]" : "bg-transparent border-l-0"
                    }`}
                  >
                    <span className="font-mono text-[0.8rem] text-ink-3 mt-0.5">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="font-sans font-medium text-[0.95rem] text-ink">{exp.title}</span>
                  </button>
                ))}
              </div>

              {/* Right column: dynamic preview card */}
              <div className="lg:col-span-7 border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)] p-6 md:p-8 flex flex-col justify-between min-h-[380px]">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider block mb-2">
                      [ SKILL_{String(activeExpertise + 1).padStart(2, "0")} / CORE ]
                    </span>
                    <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">
                      {EXPERTISE[activeExpertise].title}
                    </h3>
                    <p className="text-[0.9rem] text-ink-2 leading-relaxed">
                      {EXPERTISE[activeExpertise].body}
                    </p>
                  </div>
                  <div className="mt-8 border border-line/50 bg-paper p-4 h-40 flex items-center justify-center relative overflow-hidden">
                    <ExpertiseVisual index={activeExpertise} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to hire */}
        <section className="section" id="how-to-hire">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">How to Hire Our CUDA Developers?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">The process of hiring CUDA skills to work on your project is simple and clear.</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" itemClassName="h-full" step={0.05}>
              {HIRE_STEPS.map((p, i) => {
                const icons = [
                  (
                    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  ),
                  (
                    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  (
                    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                      <rect x="3" y="3" width="7" height="9" />
                      <rect x="14" y="3" width="7" height="5" />
                      <rect x="14" y="12" width="7" height="9" />
                      <rect x="3" y="16" width="7" height="5" />
                    </svg>
                  ),
                  (
                    <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                      <line x1="12" y1="4" x2="12" y2="20" />
                    </svg>
                  )
                ];
                return (
                  <div key={p.title} className="group h-full p-6 bg-linen border border-line shadow-none hover:shadow-[6px_6px_0px_0px_var(--color-line)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[0.875rem] text-ink-3">STEP {String(i + 1).padStart(2, "0")}</span>
                        {icons[i]}
                      </div>
                      <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{p.title}</h3>
                      <p className="text-[0.875rem] text-ink-2 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Why hire from us */}
        <section className="section bg-paper border-y border-line" id="why-hire">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Hire CUDA Developers from Us?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Our entire process revolves around the peace of mind for our clients, explore what you get when you choose us.</p></Reveal>
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line shadow-[6px_6px_0px_0px_var(--color-line)] bg-linen" itemClassName="h-full" step={0.05}>
              {WHY_HIRE.map((h, i) => {
                const icons = [
                  // High-Quality Engineering
                  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>,
                  // Data Security
                  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>,
                  // Proven GPU Experience
                  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>,
                  // Cost-Optimized
                  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>,
                  // Senior-Level
                  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>,
                  // Rapid Onboarding
                  <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 group-hover:text-ink transition-colors duration-300">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ];
                return (
                  <div key={h.title} className="group p-6 md:p-8 border-r border-b border-line bg-linen transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[0.75rem] text-ink-3">[ HIRE_{String(i + 1).padStart(2, "0")} ]</span>
                        {icons[i]}
                      </div>
                      <h3 className="font-sans font-medium text-[1.1rem] text-ink mb-2">{h.title}</h3>
                      <p className="text-[0.875rem] text-ink-2 leading-relaxed">{h.body}</p>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Hiring models */}
        <section className="section bg-linen border-t border-line" id="hiring-models">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Flexible Hiring Models</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">To achieve your performance goals and the scope of developing CUDA, use the appropriate engagement model.</p></Reveal>
            </div>
            
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" itemClassName="h-full" step={0.06}>
              {HIRING_MODELS.map((model, idx) => {
                const isFeatured = idx === 0; // Full-Time is featured
                const inclusions = [
                  // Full-Time
                  ["160 hours / month", "Direct Slack / Teams access", "Daily standups & updates", "15-day risk-free trial"],
                  // Part-Time
                  ["80 hours / month", "Flexible execution", "Weekly sprint reporting", "Direct developer contact"],
                  // Time & Material
                  ["Pay-as-you-go hourly", "Dynamic project scope", "Bi-weekly invoices", "Ideal for debugging & audits"],
                  // Custom
                  ["Custom resource scaling", "Multi-developer squads", "Enterprise SLA parameters", "Dedicated technical lead"]
                ][idx];

                return (
                  <div
                    key={model.title}
                    className={`group relative h-full p-6 md:p-8 border transition-all duration-300 flex flex-col justify-between min-h-[380px] shadow-[4px_4px_0px_0px_var(--color-line)] ${
                      isFeatured
                        ? "bg-paper border-ink"
                        : "bg-paper border-line hover:border-ink hover:translate-y-[-2px]"
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute top-0 right-6 -translate-y-1/2 bg-ink text-paper text-[0.65rem] font-mono tracking-widest px-2.5 py-1 border border-line uppercase">
                        [ RECOMMENDED ]
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between border-b border-line/50 pb-4 mb-4">
                        <h3 className="font-sans font-semibold text-[1.25rem] text-ink">{model.title}</h3>
                        <span className="font-mono text-[0.8rem] text-ink-3">MOD_{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="text-[0.875rem] text-ink-2 leading-relaxed mb-6">{model.body}</p>
                      
                      <ul className="space-y-2.5 text-[0.8125rem] text-ink-2 font-mono">
                        {inclusions.map((inc) => (
                          <li key={inc} className="flex items-center gap-2">
                            <span className="text-ink font-bold">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Ready to unleash the power of CUDA?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[58ch]">Accelerate your compute workloads with production-grade CUDA engineering and performance-first architecture.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Take Charge</a></Magnetic></div></Reveal>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section" id="why-choose">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Choose Us for CUDA Development?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Partner with a CUDA-focused engineering team that blends deep GPU expertise with practical business execution. We assist companies in changing the compute-intensive systems into scalable and performance-oriented architectures.</p></Reveal>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 0: High-Impact GPU Acceleration (Col-span 2 on md+) */}
              <div className="group border border-line bg-linen shadow-[4px_4px_0px_0px_var(--color-line)] p-6 md:p-8 md:col-span-2 flex flex-col justify-between hover:bg-paper transition-all duration-300 min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.75rem] text-ink-3">[ VAL_01 / PERFORMANCE ]</span>
                    <span className="font-mono text-[0.8rem] text-ink font-semibold animate-pulse">4.88x SPEEDUP</span>
                  </div>
                  <h3 className="font-sans font-semibold text-[1.25rem] text-ink mb-3">{WHY_CHOOSE[0].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed max-w-[65ch]">{WHY_CHOOSE[0].body}</p>
                </div>
                <div className="mt-6 border border-line/30 bg-paper p-4 font-mono text-[0.75rem] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-3">LEGACY CPU-BASED PIPELINE:</span>
                    <span className="text-ink-2">12.4s execution</span>
                  </div>
                  <div className="w-full bg-linen h-2 relative overflow-hidden border border-line">
                    <div className="bg-ink-3 h-full w-[80%]"></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-ink font-bold">OPTIMIZED CUDA COMPUTE:</span>
                    <span className="text-ink font-bold">1.82s execution</span>
                  </div>
                  <div className="w-full bg-linen h-2 relative overflow-hidden border border-line">
                    <div className="bg-ink h-full w-[15%]"></div>
                  </div>
                </div>
              </div>

              {/* Card 1: Enterprise-Ready AI Systems */}
              <div className="group border border-line bg-linen shadow-[4px_4px_0px_0px_var(--color-line)] p-6 md:p-8 flex flex-col justify-between hover:bg-paper transition-all duration-300 min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.75rem] text-ink-3">[ VAL_02 / ARCHITECTURE ]</span>
                  </div>
                  <h3 className="font-sans font-semibold text-[1.25rem] text-ink mb-3">{WHY_CHOOSE[1].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{WHY_CHOOSE[1].body}</p>
                </div>
              </div>

              {/* Card 2: Secure Development Framework */}
              <div className="group border border-line bg-linen shadow-[4px_4px_0px_0px_var(--color-line)] p-6 md:p-8 flex flex-col justify-between hover:bg-paper transition-all duration-300 min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.75rem] text-ink-3">[ VAL_03 / COMPLIANCE ]</span>
                  </div>
                  <h3 className="font-sans font-semibold text-[1.25rem] text-ink mb-3">{WHY_CHOOSE[2].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{WHY_CHOOSE[2].body}</p>
                </div>
              </div>

              {/* Card 3: Accelerated Deployment Cycles */}
              <div className="group border border-line bg-linen shadow-[4px_4px_0px_0px_var(--color-line)] p-6 md:p-8 flex flex-col justify-between hover:bg-paper transition-all duration-300 min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.75rem] text-ink-3">[ VAL_04 / PROTOTYPE ]</span>
                  </div>
                  <h3 className="font-sans font-semibold text-[1.25rem] text-ink mb-3">{WHY_CHOOSE[3].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{WHY_CHOOSE[3].body}</p>
                </div>
              </div>

              {/* Card 4: Dedicated Technical Assistance */}
              <div className="group border border-line bg-linen shadow-[4px_4px_0px_0px_var(--color-line)] p-6 md:p-8 flex flex-col justify-between hover:bg-paper transition-all duration-300 min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.75rem] text-ink-3">[ VAL_05 / SUPPORT ]</span>
                  </div>
                  <h3 className="font-sans font-semibold text-[1.25rem] text-ink mb-3">{WHY_CHOOSE[4].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">{WHY_CHOOSE[4].body}</p>
                </div>
              </div>

              {/* Card 5: Performance-Oriented Cost Strategy (Col-span 2 on md+) */}
              <div className="group border border-line bg-linen shadow-[4px_4px_0px_0px_var(--color-line)] p-6 md:p-8 md:col-span-2 flex flex-col justify-between hover:bg-paper transition-all duration-300 min-h-[260px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.75rem] text-ink-3">[ VAL_06 / STRATEGY ]</span>
                    <span className="font-mono text-[0.8rem] text-ink font-semibold animate-pulse">65% CLOUD SAVINGS</span>
                  </div>
                  <h3 className="font-sans font-semibold text-[1.25rem] text-ink mb-3">{WHY_CHOOSE[5].title}</h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed max-w-[65ch]">{WHY_CHOOSE[5].body}</p>
                </div>
                <div className="mt-6 border border-line/30 bg-paper p-4 font-mono text-[0.75rem] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-3">COMPUTE COST ON NVIDIA H100 PODS:</span>
                  </div>
                  <div className="flex items-center gap-4 text-[0.8rem]">
                    <span className="text-ink-2 line-through">$42,500 / mo</span>
                    <span className="text-ink font-bold">→ $14,875 / mo optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section bg-paper border-y border-line" id="reviews">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Trusted by Global Technology Leaders</SplitHeading>
                <Reveal><p className="text-ink-2 text-[1.0625rem] max-w-[60ch]">Companies in all sectors are using our CUDA knowledge to address the intricate performance issues and speed up the most important applications. Long-term partnerships are developed as a result of our focus on precision engineering and quantifiable outcomes.</p></Reveal>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-1 lg:items-end">
                <span className="font-mono text-[0.8125rem] text-ink-3 uppercase tracking-wider">Jashom Reviews</span>
                <span className="font-mono text-[2.5rem] leading-none text-ink font-bold">4.8</span>
                <span className="text-[0.8125rem] text-ink-2">Powered by Clutch</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.map((t, i) => (
                <Reveal key={i} delay={i * 0.06} className="h-full">
                  <figure className="h-full flex flex-col p-6 md:p-8 hover:bg-tint transition-all duration-300 border border-line">
                    <blockquote className="font-mono text-[16px] leading-[1.45] text-ink flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem] text-ink-2">{t.who}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="section" id="related">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Explore Related GPU Services</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[60ch]">Want to hire best CUDA developer experts? Browse some other complimentary GPU oriented services that can make the system even more performance-efficient and scalable.</p></Reveal>
            </div>
            <Stagger className="grid md:grid-cols-2 gap-6" step={0.08}>
              {RELATED.map((r) => (
                <div key={r.title} className="group flex flex-col p-6 md:p-8 border border-line hover:bg-tint transition-all duration-300">
                  <h3 className="text-[1.25rem] font-medium mb-3">{r.title}</h3>
                  <p className="text-ink-2 mb-6 flex-1">{r.body}</p>
                  <a href={r.href} className="link-line text-ink font-medium text-[0.9375rem] w-fit">Know More →</a>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-paper border-y border-line" id="faq">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">FAQs</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Frequently Asked Questions</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Common questions about hiring CUDA developers from Jashom</p></Reveal>
            </div>
            <div className="border-t border-line max-w-3xl">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-ink font-medium">
                    {f.q}
                    <span className="text-ink-2 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-ink-2 pb-5 max-w-[60ch]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Get Started with Expert CUDA Developers</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">Fill out the form and our team will get back to you within 24 hours. Share your project requirements and we&rsquo;ll match you with the perfect CUDA developer for your needs.</p></Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 flex flex-col gap-5">
                    {CONTACT_HIGHLIGHTS.map((h) => (
                      <div key={h.title}>
                        <p className="text-ink font-medium mb-1">{h.title}</p>
                        <p className="text-[0.9375rem] text-ink-2">{h.body}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                {status === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                    <p className="font-mono text-3xl mb-3">Request received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const model = fd.get("model") as string;
                        const rawMsg = fd.get("message") as string;
                        setStatus("loading");
                        try {
                          await submitContactForm({
                            fullName: fd.get("name") as string,
                            email: fd.get("email") as string,
                            phone: fd.get("phone") as string,
                            company: fd.get("company") as string,
                            message: model ? `[Hiring Model: ${model}]\n\n${rawMsg}` : rawMsg,
                          });
                          setStatus("sent");
                        } catch (err) {
                          setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
                          setStatus("error");
                        }
                      }} className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Full Name *</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email Address *</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="phone" className="text-sm text-ink-2">Phone Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="company" className="text-sm text-ink-2">Company Name</label><input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="model" className="text-sm text-ink-2">Preferred Hiring Model *</label>
                        <select id="model" name="model" required defaultValue="" className="field-j">
                          <option value="" disabled>Select a hiring model</option>
                          {HIRING_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Project Requirements *</label><textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="Tell us about your project and performance targets." /></div>
                      <div className="sm:col-span-2 flex flex-col gap-3 items-start">
                        {status === "error" && <p className="text-[0.8125rem] text-red-600">{errorMsg}</p>}
                        <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? "Sending…" : "Submit Request"}</button>
                        <p className="text-[0.8125rem] text-ink-3">By submitting this form, you agree to our privacy policy and terms of service.</p>
                      </div>
                    </form>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
