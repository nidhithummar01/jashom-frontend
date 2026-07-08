"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Magnetic from "@/components/motion/Magnetic";
import GpuHeroSvg from "./GpuHeroSvg";
import type { BlogPost } from "@/lib/blogs";
import BenefitsList from "@/components/sections/BenefitsList";
import TestimonialGrid from "@/components/sections/TestimonialGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import RelatedBlogsSection from "@/components/sections/RelatedBlogsSection";
import HireContactForm from "@/components/sections/HireContactForm";

/* ---- Source content (jashom.com/gpu-optimization-service) ---- */

const STATS = [
  { value: 10, suffix: "x", label: "Faster Execution" },
  { value: 40, suffix: "%", label: "Reduced Compute Costs" },
];

const CAPABILITIES = [
  {
    id: "01",
    tag: "CUDA INTERNALS",
    title: "CUDA Optimization",
    body: "We optimize the underlying kernel execution, better shared memory assignment, and also readjust thread block settings to optimize performance. The services of our CUDA Development are aimed at removing the warp divergence and the latency in the NVIDIA GPU architecture.",
  },
  {
    id: "02",
    tag: "PIPELINE ACCEL",
    title: "AI/ML Acceleration",
    body: "Optimize the equilibrium of both the speed of model training and inference via optimized batch operations and the control of accessing memory. We optimize compute to reduce training time and improve predictive performance.",
  },
  {
    id: "03",
    tag: "METRICS & TELEMETRY",
    title: "Performance Profiling",
    body: "We identify the areas of inefficiency in the execution flow and memory transfers into increasingly sophisticated profiling frameworks. The benefits of detailed benchmarking are accuracy in making optimization decisions and quantifiable performance improvements.",
  },
];

const INDUSTRIES = [
  "AI & Machine Learning",
  "Scientific Computing",
  "Data Analytics",
  "Rendering & Graphics",
];

const PROCESS = [
  {
    title: "Assessment",
    body: "Assess existing GPU architecture, load, and establish specific optimization objectives.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="2" width="6" height="4" rx="1" />
        <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3" />
        <path d="M9 12l2 2 4-4" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
  },
  {
    title: "Analysis",
    body: "Gather real-time monitoring information and spot performance issues and performance bottlenecks.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="2 12 6 5 10 16 14 9 18 13 22 8" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: "Kernel Optimization",
    body: "Refine CUDA kernels and improve parallel execution balance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <line x1="9" y1="4" x2="9" y2="20" />
        <line x1="15" y1="4" x2="15" y2="20" />
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Tuning",
    body: "Expenses in runtime parameters and memory allocation, better throughput.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="9" cy="6" r="2" fill="currentColor" />
        <circle cx="15" cy="12" r="2" fill="currentColor" />
        <circle cx="9" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Testing",
    body: "Authenticate gains with validation checkpoints.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 4.5v5c0 4.5-3.5 8.5-8 9.5-4.5-1-8-5-8-9.5v-5z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Deployment",
    body: "Employ workloads that are optimized, monitored, and improved.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C8 6 7 10 7 13a5 5 0 0 0 10 0c0-3-1-7-5-11z" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const BENEFITS = [
  { title: "Faster Processing Speed", body: "Fasten hardened compute tasks with an ideal use of parallelization and data movement. With decreased processing time, there will be shorter experimentation times and shorter delivery times." },
  { title: "Lower Costs of Infrastructure", body: "Optimize the use of GPUs in order to reduce costs on clouds and hardware. Harmful efficiency brings a decrease in over-provisioning and enhanced resource allocation." },
  { title: "Improved Scalability", body: "Processes more data and intricate programs with no drop in performance or increased proportional cost." },
  { title: "Enhanced Model Performance", body: "Improve the performance of AI models training and inference with optimal CUDA execution paths." },
  { title: "Competitive Advantage", body: "Become better computers to hasten innovation and become more powerful in data-based markets." },
  { title: "Energy Efficiency", body: "Minimize energy use by optimizing the use of GPUs, which helps on the sustainability agenda and limits the cost of running the operations." },
];

const MODELS = [
  {
    name: "GPT-4o",
    logo: "https://www.edigitalagency.com.au/wp-content/uploads/new-ChatGPT-logo-black-png-large-size.png",
    cls: "h-8 md:h-9",
  },
  {
    name: "Google Gemini",
    logo: "/brand-logo/gemini.png",
    cls: "h-7 md:h-8",
  },
  {
    name: "Claude",
    logo: "/brand-logo/clude.png",
    cls: "h-8 md:h-9",
  },
  {
    name: "Llama 3",
    logo: "/brand-logo/Meta-Logo.png",
    cls: "h-7 md:h-8",
  },
  {
    name: "Mistral",
    logo: "/brand-logo/mistral.png",
    cls: "h-7 md:h-8",
  },
  {
    name: "Hugging Face",
    logo: "/brand-logo/Hugging-face.png",
    cls: "h-8 md:h-9",
  },
  {
    name: "Stability AI",
    logo: "/brand-logo/stability-ai.png",
    cls: "h-6 md:h-7",
  },
  {
    name: "Ollama",
    logo: "/brand-logo/ollama-logo.png",
    cls: "h-7 md:h-8",
  },
];

const WHY = [
  { title: "Advanced Parallel Computing Expertise", body: "Our experts have extensive expertise in CUDA implementation, tuning of the GPU architecture, and high-performance parallel systems. This is done at low-level kernel optimization all the way up to optimizing an entire NVIDIA GPU, and we work to squeeze the highest performance out of every tier of your computing system." },
  { title: "Results Backed by Data", body: "We value quantitative difference. Each interaction is predetermined by profiling information, systematic testing, and efficiency metrics showing evident acceleration, competitive advantages, and enhanced hardware use." },
  { title: "Optimization Built Around Your Workload", body: "No generic templates. We will create application-specific GPU optimization that will respond to your application and run a discussion, infrastructure configuration, as well as scalability needs by making the performance consistently enhanced on a long-term basis." },
];

const TESTIMONIALS = [
  { quote: "Their graphics processing optimization experience minimized our processing latency. The CUDA execution benefits were fast and quantifiable.", name: "Arjun Mehta", org: "Director of Engineering, NovaAI Labs" },
  { quote: "Our AI training pipeline became significantly faster after their optimization work. Clear performance gains with reduced infrastructure strain.", name: "Sofia Alvarez", org: "CTO, Quantix Systems" },
  { quote: "We hired their CUDA developers for complex optimization tasks. The results were stable, scalable, and production-ready.", name: "Daniel Brooks", org: "Chief Operating Officer, CoreTech Solutions" },
];

const FAQS = [
  { q: "How long does a GPU optimization project typically take?", a: "The timelines of projects are based on the complexity of the workload, the level of infrastructure, and the objectives of the performance. Enterprise environments take most optimization engagements between a few weeks and a few months." },
  { q: "Can you optimize legacy CUDA codebases?", a: "Yes. We test current CUDA implementations, determine architectural waste, and cull kernels to optimize memory access characteristics, parallel execution ratio, and total performance." },
  { q: "What metrics do you use to measure optimization success?", a: "We assess the use of GPUs, the performance, the ability to use memory, the decrease in latency, the efficiency of the scalability, and the savings in costs using structured profiling and benchmarking techniques." },
  { q: "Do optimized workloads remain stable in production?", a: "Absolutely. All optimizations are tested, regressed, and monitored during deployment to make sure that the performance improvements will be maintained in the field." },
];

/** Minimal overview SVG — performance bar chart with GPU grid motif */
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
        {[0, 45, 90, 135, 180, 225, 270, 315, 360].map((x) => (
          <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="180" />
        ))}
        {[0, 36, 72, 108, 144, 180].map((y) => (
          <line key={`gy${y}`} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* baseline */}
      <line x1="40" y1="148" x2="320" y2="148" stroke="var(--color-line)" strokeWidth="1.5" />

      {/* Bar 1 — 40% height, muted */}
      <rect x="72" y="92" width="36" height="56" stroke="var(--color-ink-3)" strokeWidth="1.5" />

      {/* Bar 2 — 65% height, muted */}
      <rect x="142" y="66" width="36" height="82" stroke="var(--color-ink-2)" strokeWidth="1.5" />

      {/* Bar 3 — 100% height, accent fill */}
      <rect
        x="212"
        y="28"
        width="36"
        height="120"
        fill="var(--color-ink)"
        fillOpacity="0.07"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />

      {/* accent top cap on bar 3 */}
      <line x1="212" y1="28" x2="248" y2="28" stroke="var(--color-ink)" strokeWidth="3" />

      {/* arrow up — indicating performance */}
      <path
        d="M230 148 L230 36 M222 50 L230 36 L238 50"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        opacity="0.25"
      />

      {/* labels */}
      <text x="72" y="165" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">BEFORE</text>
      <text x="136" y="165" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">OPTIMISED</text>
      <text x="210" y="165" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">WITH JASHOM</text>

      {/* top label */}
      <text x="40" y="20" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.7">GPU PERFORMANCE</text>
    </svg>
  );
}

function CudaSimulation() {
  const [activeBlock, setActiveBlock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBlock((prev) => (prev + 1) % 32);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between p-6 font-mono text-[0.8125rem]">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 mb-4 gap-2">
        <span className="text-ink font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></span>
          <span>CUDA_KERNEL_WORKER: RUNNING</span>
        </span>
        <span className="text-ink-3 uppercase text-[10px]">Blocks: 32 | Threads: 1024</span>
      </div>

      {/* Grid of Blocks */}
      <div className="grid grid-cols-8 gap-1.5 sm:gap-2 my-auto max-w-md mx-auto w-full">
        {Array.from({ length: 32 }, (_, i) => {
          const isActive = i === activeBlock;
          const isProcessed = i < activeBlock;
          let blockClass: string;
          if (isActive) blockClass = "bg-ink border-ink text-linen scale-105 shadow-sm";
          else if (isProcessed) blockClass = "bg-tint/40 border-line text-ink-2";
          else blockClass = "bg-paper border-line text-ink-3";
          return (
            <div
              key={`block-${i}`}
              className={`aspect-square border flex items-center justify-center transition-all duration-200 rounded-xs ${blockClass}`}
            >
              <span className="text-[9px] font-bold">
                {isActive ? "⚡" : String(i).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 mt-4">
        <div>
          <span className="text-ink-3 block text-[10px] uppercase">Warp Divergence</span>
          <span className="text-ink font-bold text-[0.9375rem]">0.0% (OPTIMAL)</span>
        </div>
        <div>
          <span className="text-ink-3 block text-[10px] uppercase">Latency</span>
          <span className="text-ink font-bold text-[0.9375rem]">1.18ms (-72%)</span>
        </div>
      </div>
    </div>
  );
}

function MlSimulation() {
  const [step, setStep] = useState(0);
  const [throughput, setThroughput] = useState(2850);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
      setThroughput(Math.floor(2820 + Math.random() * 60)); // NOSONAR — visual simulation only
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between p-6 font-mono text-[0.8125rem]">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 mb-4 gap-2">
        <span className="text-ink font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></span>
          <span>PIPELINE_ENGINE: ACCELERATED</span>
        </span>
        <span className="text-ink-3 uppercase text-[10px]">FP8 Tensor Core Mode</span>
      </div>

      {/* Pipeline SVG Animation */}
      <div className="relative h-28 flex items-center justify-center border border-line bg-paper/50 rounded-xs p-4 my-auto overflow-hidden">
        <svg viewBox="0 0 300 80" className="w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Connection lines */}
          <path d="M40 40 L130 40 M170 40 L260 40" strokeDasharray="4 4" className="text-line" />
          
          {/* Stages */}
          <circle cx="40" cy="40" r="14" className={`${step === 0 ? "fill-ink text-linen stroke-ink" : "fill-linen stroke-line"} transition-colors duration-200`} />
          <circle cx="150" cy="40" r="14" className={`${step === 1 || step === 2 ? "fill-ink text-linen stroke-ink" : "fill-linen stroke-line"} transition-colors duration-200`} />
          <circle cx="260" cy="40" r="14" className={`${step === 3 ? "fill-ink text-linen stroke-ink" : "fill-linen stroke-line"} transition-colors duration-200`} />
          
          {/* Step Labels */}
          <text x="40" y="43" textAnchor="middle" fontSize="8" className={step === 0 ? "fill-linen font-bold" : "fill-ink"} fontFamily="var(--font-mono)">IN</text>
          <text x="150" y="43" textAnchor="middle" fontSize="8" className={step === 1 || step === 2 ? "fill-linen font-bold" : "fill-ink"} fontFamily="var(--font-mono)">GPU</text>
          <text x="260" y="43" textAnchor="middle" fontSize="8" className={step === 3 ? "fill-linen font-bold" : "fill-ink"} fontFamily="var(--font-mono)">OUT</text>

          {/* Tokens moving */}
          {step === 0 && <circle cx="85" cy="40" r="3" className="fill-ink animate-ping" />}
          {step === 1 && <circle cx="150" cy="40" r="18" className="stroke-ink/40 fill-none animate-pulse" />}
          {step === 2 && <circle cx="205" cy="40" r="3" className="fill-ink animate-ping" />}
        </svg>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 mt-4">
        <div>
          <span className="text-ink-3 block text-[10px] uppercase">Throughput</span>
          <span className="text-ink font-bold text-[0.9375rem] tabular-nums">{throughput} TOK/S</span>
        </div>
        <div>
          <span className="text-ink-3 block text-[10px] uppercase">Tensor Core Use</span>
          <span className="text-ink font-bold text-[0.9375rem]">98.6% (OPTIMAL)</span>
        </div>
      </div>
    </div>
  );
}

function ProfilingSimulation() {
  const [sliderVal, setSliderVal] = useState(15);
  const [goingUp, setGoingUp] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderVal((prev) => {
        if (goingUp) {
          if (prev >= 90) {
            setGoingUp(false);
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev <= 15) {
            setGoingUp(true);
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, 25);
    return () => clearInterval(interval);
  }, [goingUp]);

  return (
    <div className="flex flex-col h-full justify-between p-6 font-mono text-[0.8125rem]">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 mb-4 gap-2">
        <span className="text-ink font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></span>
          <span>PROFILER: RUNNING</span>
        </span>
        <span className="text-ink-3 uppercase text-[10px]">Auto Optimization Sweep</span>
      </div>

      {/* Compare visualizer */}
      <div className="flex flex-col gap-4 my-auto">
        <div className="flex justify-between text-[10px] text-ink-3">
          <span>BEFORE JASHOM</span>
          <span>AFTER OPTIMIZATION</span>
        </div>
        <div className="relative h-22 border border-line bg-paper/50 rounded-xs flex flex-col justify-center p-4">
          {/* Flame graph timeline representation */}
          <div className="h-6 flex border border-line rounded-xs bg-linen overflow-hidden relative">
            {/* Host-to-Device Copy */}
            <div 
              className="h-full bg-ink-3/45 flex items-center justify-center text-[9px] text-ink font-bold border-r border-line transition-all duration-300"
              style={{ width: `${60 - sliderVal * 0.45}%` }}
            >
              H2D
            </div>
            {/* Kernel Execution */}
            <div 
              className="h-full bg-ink flex items-center justify-center text-[9px] text-linen font-bold border-r border-line transition-all duration-300"
              style={{ width: `${30 + sliderVal * 0.45}%` }}
            >
              KERNEL
            </div>
            {/* Device-to-Host Copy */}
            <div 
              className="h-full bg-ink-3/20 flex items-center justify-center text-[9px] text-ink-2 transition-all duration-300"
              style={{ width: `${10 - sliderVal * 0.05}%` }}
            >
              D2H
            </div>
          </div>
          
          <div className="mt-2.5 flex justify-between text-[10px] text-ink-2">
            <span>Overhead: {Math.max(10, 80 - Math.round(sliderVal * 0.7))}%</span>
            <span>Kernel overlap: {Math.min(95, Math.round(sliderVal * 0.95))}%</span>
          </div>
        </div>

        {/* Sweep Track */}
        <div className="relative h-1 bg-line rounded overflow-hidden">
          <div 
            className="h-full bg-ink"
            style={{ width: `${sliderVal}%` }}
          />
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 mt-4">
        <div>
          <span className="text-ink-3 block text-[10px] uppercase">Execution time</span>
          <span className="text-ink font-bold text-[0.9375rem] tabular-nums">
            {(4.2 - sliderVal * 0.03).toFixed(2)}ms
          </span>
        </div>
        <div>
          <span className="text-ink-3 block text-[10px] uppercase">Latency savings</span>
          <span className="text-ink font-bold text-[0.9375rem] tabular-nums">
            -{Math.round(sliderVal * 0.72)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GpuOptimizationContent({ blogPosts = [] }: { readonly blogPosts?: BlogPost[] }) {
  const reduced = useReducedMotion();

  const RELATED_BLOGS = blogPosts
    .filter((post) =>
      ["what-is-gpu-optimization", "cpu-vs-gpu-computing", "nvidia-gpus-perfect-for-ai-workloads"].includes(post.slug)
    )
    .slice(0, 3);

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
                  NVIDIA GPU Optimization Services
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2"
            >
              We provide advanced GPU Optimization Services, used to maximize your computing infrastructure to full performance. Our team optimizes workload patterns, execution pipes, and parallel processing to remove bottlenecks.
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <GpuHeroSvg />
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
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">What is GPU Optimization?</SplitHeading>
                <Reveal>
                  <p className="text-ink-2 max-w-[60ch]">
                    GPU optimization is a performance engineering science that aims at making the best use of throughput in a parallel computing system. It requires workload profiling, CUDA kernel restructuring, thread synchronization optimization, and efficient use of memory access to deliver consistent high-performance execution on modern hardware.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-ink-2 max-w-[60ch]">
                    Training time can also be minimized by optimized workloads on GPUs, infrastructure waste is minimized, and AI, scientific simulations, and data analytics apps are able to achieve higher compute densities. The result is accelerated processing, optimal use of hardware for compute-intensive processes, and cost-sustainability.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-10">
                {/* Minimal themed SVG illustration */}
                <Reveal>
                  <OverviewSvg />
                </Reveal>
                {/* KPI stats */}
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
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Optimize Performance That Drives Real Results</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  Our engineers integrate CUDA Development Services with profound architectural experience to increase the use of a GPU on a wide range of workloads.
                </p>
              </Reveal>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Bento Card 1: CUDA Optimization (Full width) */}
              <div className="lg:col-span-12 grid lg:grid-cols-12 gap-0 border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                {/* Left side: Text */}
                <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line">
                  <div className="w-full flex flex-col">
                    <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                      <span>[ OPT_01 ]</span>
                      <span>CUDA INTERNALS</span>
                    </div>
                    
                    <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">
                      {CAPABILITIES[0].title}
                    </h3>
                    <p className="text-[0.875rem] text-ink-2 leading-relaxed">
                      {CAPABILITIES[0].body}
                    </p>
                  </div>
                </div>

                {/* Right side: Visual simulation */}
                <div className="lg:col-span-6 bg-paper min-h-[300px]">
                  <CudaSimulation />
                </div>
              </div>

              {/* Bento Card 2: AI/ML Acceleration (Half width) */}
              <div className="lg:col-span-6 flex flex-col justify-between border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                <div className="p-6 md:p-8 flex-1 flex flex-col border-b border-line">
                  <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                    <span>[ OPT_02 ]</span>
                    <span>PIPELINE ACCEL</span>
                  </div>
                  
                  <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">
                    {CAPABILITIES[1].title}
                  </h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">
                    {CAPABILITIES[1].body}
                  </p>
                </div>
                
                <div className="bg-paper min-h-[260px] flex flex-col justify-center">
                  <MlSimulation />
                </div>
              </div>

              {/* Bento Card 3: Performance Profiling (Half width) */}
              <div className="lg:col-span-6 flex flex-col justify-between border border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                <div className="p-6 md:p-8 flex-1 flex flex-col border-b border-line">
                  <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                    <span>[ OPT_03 ]</span>
                    <span>METRICS & TELEMETRY</span>
                  </div>
                  
                  <h3 className="font-sans font-medium text-[1.25rem] text-ink mb-4">
                    {CAPABILITIES[2].title}
                  </h3>
                  <p className="text-[0.875rem] text-ink-2 leading-relaxed">
                    {CAPABILITIES[2].body}
                  </p>
                </div>
                
                <div className="bg-paper min-h-[260px] flex flex-col justify-center">
                  <ProfilingSimulation />
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

        {/* Industries */}
        <section className="section" id="industries">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Industry-Focused GPU Optimization Solutions</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  Our GPU optimization services are designed to satisfy the computational needs of industry-specific situations. Each of our solutions is differentiated based on workload complexity, goals, and scalability goals.
                </p>
              </Reveal>
            </div>
            
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]" itemClassName="h-full" step={0.06}>
              {[
                {
                  name: "AI & Machine Learning",
                  desc: "Accelerating tensor core operations, mixed-precision training, and high-throughput LLM/diffusion inference execution pipelines.",
                  svg: (
                    <svg viewBox="0 0 100 60" className="w-full h-12 text-ink opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="15" cy="15" r="4" className="fill-linen" />
                      <circle cx="15" cy="30" r="4" className="fill-linen" />
                      <circle cx="15" cy="45" r="4" className="fill-linen" />
                      <circle cx="50" cy="20" r="4" className="fill-linen" />
                      <circle cx="50" cy="40" r="4" className="fill-linen" />
                      <circle cx="85" cy="30" r="4" className="fill-linen" />
                      <line x1="19" y1="15" x2="46" y2="20" />
                      <line x1="19" y1="15" x2="46" y2="40" />
                      <line x1="19" y1="30" x2="46" y2="20" />
                      <line x1="19" y1="30" x2="46" y2="40" />
                      <line x1="19" y1="45" x2="46" y2="20" />
                      <line x1="19" y1="45" x2="46" y2="40" />
                      <line x1="54" y1="20" x2="81" y2="30" />
                      <line x1="54" y1="40" x2="81" y2="30" />
                      <circle cx="50" cy="20" r="1.5" className="fill-ink animate-pulse" />
                      <circle cx="85" cy="30" r="1.5" className="fill-ink animate-pulse [animation-delay:0.3s]" />
                    </svg>
                  )
                },
                {
                  name: "Scientific Computing",
                  desc: "Optimizing double-precision (FP64) linear algebra solvers, stencil computations, and multi-GPU message passing (NCCL) for large physical simulations.",
                  svg: (
                    <svg viewBox="0 0 100 60" className="w-full h-12 text-ink opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M10 30 Q 25 10, 40 30 T 70 30 T 90 30" strokeDasharray="2 2" />
                      <path d="M10 30 Q 25 45, 40 30 T 70 30 T 90 30" />
                      <circle cx="25" cy="20" r="2" className="fill-ink animate-pulse" />
                      <circle cx="55" cy="40" r="2" className="fill-ink animate-pulse [animation-delay:0.2s]" />
                      <line x1="25" y1="20" x2="55" y2="40" strokeWidth="0.5" />
                    </svg>
                  )
                },
                {
                  name: "Data Analytics",
                  desc: "Streamlining parallel reduction operations, fast radix sort, and CUDA-accelerated databases for petabyte-scale real-time memory queries.",
                  svg: (
                    <svg viewBox="0 0 100 60" className="w-full h-12 text-ink opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="10" y="10" width="22" height="15" rx="1" />
                      <rect x="38" y="10" width="22" height="15" rx="1" />
                      <rect x="66" y="10" width="22" height="15" rx="1" />
                      <path d="M21 30 L50 48 M49 30 L50 48 M77 30 L50 48" strokeDasharray="2 2" />
                      <rect x="38" y="40" width="22" height="12" rx="1" className="fill-linen" />
                    </svg>
                  )
                },
                {
                  name: "Rendering & Graphics",
                  desc: "Minimizing branch divergence in custom ray-tracing kernels, BVH traversal optimizations, and real-time viewport denoising algorithms.",
                  svg: (
                    <svg viewBox="0 0 100 60" className="w-full h-12 text-ink opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="1">
                      <line x1="10" y1="30" x2="80" y2="10" strokeDasharray="2 2" />
                      <line x1="10" y1="30" x2="80" y2="50" strokeDasharray="2 2" />
                      <rect x="30" y="22" width="12" height="16" rx="1" className="fill-linen" />
                      <rect x="70" y="12" width="20" height="36" rx="1" />
                    </svg>
                  )
                }
              ].map((ind, i) => (
                <div key={ind.name} className="group flex flex-col justify-between p-6 md:p-8 border-r border-b border-line bg-linen transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6 font-mono text-[0.75rem] text-ink-3">
                      <span>[ IND_0{i + 1} ]</span>
                      <span className="uppercase tracking-wider">Vertical Segment</span>
                    </div>
                    <div className="h-20 flex items-center justify-center border border-line bg-paper p-3 mb-6 relative overflow-hidden group-hover:shadow-inner transition-shadow duration-300">
                      {ind.svg}
                    </div>
                    <h3 className="font-sans font-medium text-[1.1rem] text-ink mb-3">{ind.name}</h3>
                    <p className="text-[0.875rem] text-ink-2 leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Process */}
        <section className="section bg-paper border-y border-line" id="process">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left Column - Header info */}
              <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28 h-fit">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Our Process</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">GPU Optimization Journey</SplitHeading>
                <Reveal><p className="text-ink font-medium text-[1.0625rem]">A Structured Workload Optimization Model</p></Reveal>
                <Reveal delay={0.06}>
                  <p className="text-ink-2 max-w-[45ch]">A dedicated six-step model to attain regular, measurable improvement in the performance of your GPU infrastructure.</p>
                </Reveal>
                <Reveal delay={0.12} className="mt-6 hidden lg:block">
                  <Magnetic strength={0.18}>
                    <a href="/contact/" className="btn btn-primary">Start Your Optimization Journey</a>
                  </Magnetic>
                </Reveal>
              </div>

              {/* Right Column - Step List */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="border-t border-line">
                  {PROCESS.map((p, i) => (
                    <div key={p.title} className="group flex gap-6 p-6 border-b border-line hover:bg-tint transition-all duration-300">
                      {/* Step details Left Column */}
                      <div className="flex flex-col items-center">
                        <span className="font-mono text-[1.25rem] text-ink font-semibold tabular-nums leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="w-px flex-1 bg-line/60 my-3 group-last:hidden" />
                        <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center bg-paper text-ink-2 group-hover:text-ink group-hover:border-ink transition-colors duration-300">
                          {p.icon}
                        </div>
                      </div>

                      {/* Step details Right Column */}
                      <div className="flex-1 pt-0.5">
                        <h3 className="font-sans font-medium text-[1.0625rem] text-ink mb-2 group-hover:text-ink transition-colors duration-200">{p.title}</h3>
                        <p className="text-[0.875rem] text-ink-2 max-w-[55ch] leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 block lg:hidden px-6">
                  <Magnetic strength={0.18}>
                    <a href="/contact/" className="btn btn-primary w-full text-center">Start Your Optimization Journey</a>
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
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Need a Custom AI Development Partner?</SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 text-ink-2 max-w-[60ch]">
                We develop high-performing AI systems based on optimized GPU architecture. Whether you need to hire CUDA Developers for specialized projects or require end-to-end CUDA Development Services, our team delivers scalable solutions engineered for production-grade performance.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10">
                <Magnetic strength={0.18}>
                  <a href="/contact/" className="btn btn-primary">Let&rsquo;s talk about Your Project</a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        <BenefitsList heading="Business Benefits of GPU Optimization" items={BENEFITS} />

        {/* AI models */}
        <section className="section bg-paper border-y border-line" id="models">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Expertise</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] mt-2">AI Models We Have Expertise In</SplitHeading>
            </div>
            
            {/* Unified 8-logo grid with perfect responsive columns */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                {MODELS.map((m) => (
                  <div key={m.name}
                    className="group flex flex-col items-center justify-center gap-4 py-8 px-6 min-h-[140px] border-r border-b border-line hover:bg-tint/50 transition-colors duration-300">
                    <div className="h-16 flex items-center justify-center">
                      <img src={m.logo} alt={m.name}
                        className={`${m.cls} w-auto max-w-[80%] object-contain filter grayscale contrast-[0.8] opacity-60 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-300`} />
                    </div>
                    <span className="font-mono text-[0.7rem] text-ink-3 uppercase tracking-wider transition-colors duration-200 group-hover:text-ink">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section bg-paper border-y border-line" id="why">
          <div className="container-j">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Validation</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] mt-2">Why Choose Us for GPU Optimization?</SplitHeading>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {WHY.map((w, i) => {
                const whyIcons = [
                  // Advanced Parallel Computing Expertise
                  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 2v20M2 12h20M12 12l5.5-5.5M12 12L6.5 6.5M12 12l5.5 5.5M12 12l-5.5 5.5" /></svg>,
                  // Results Backed by Data
                  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
                  // Optimization Built Around Your Workload
                  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                ];
                return (
                  <Reveal key={w.title} delay={i * 0.08} className="h-full">
                    <div className="group h-full p-6 md:p-8 bg-linen border border-line shadow-[4px_4px_0px_0px_var(--color-line)] hover:shadow-[8px_8px_0px_0px_var(--color-line)] transition-all duration-300 flex flex-col items-start translate-y-0 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center bg-white text-ink-2 group-hover:text-ink group-hover:border-ink group-hover:bg-tint transition-all duration-300 mb-6">
                        {whyIcons[i]}
                      </div>
                      <h3 className="font-sans font-medium text-[1.125rem] text-ink mb-3 group-hover:text-ink transition-colors duration-200">{w.title}</h3>
                      <p className="text-[0.875rem] text-ink-2 leading-relaxed">{w.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <TestimonialGrid heading="What Our Clients Say" subtitle="Trusted by forward-thinking organizations to deliver high-performance GPU and CUDA solutions." items={TESTIMONIALS} />

        <FaqAccordion subtitle="Common questions about GPU optimization services from Jashom" items={FAQS} sectionClassName="section" />
        <RelatedBlogsSection posts={RELATED_BLOGS} />

        <HireContactForm
          heading="Get Started with GPU Optimization"
          description="Fill out the form and our team will get back to you within 24 hours."
          messagePlaceholder="Tell us about your workload and performance targets."
          messageFallback="GPU Optimization enquiry"
          sectionClassName="section bg-paper border-y border-line"
        />
      </main>
    </>
  );
}
