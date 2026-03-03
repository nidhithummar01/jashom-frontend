import { GRADIENT_EMERALD_CYAN } from '../constants/theme';
import { createServiceFormFieldsConfig, createServiceOfficeCards } from './servicePageDataShared';

type ProcessStep = { title: string; description: string; gradient: string; shadow: string; pathD: string };
type ServiceItem = { title: string; description: string };
type BenefitItem = { title: string; description: string; borderColor: string };
type WhyChooseItem = { title: string; description: string };
type TestimonialItem = { quote: string; initials: string; role: string; company?: string; name?: string; avatarGradient: string };
type FaqItem = { q: string; a: string };
type AiModelItem = { name: string; src: string; alt: string };

type ServicePageConfig = {
  servicesData: readonly ServiceItem[];
  industryItems: readonly string[];
  processSteps: readonly ProcessStep[];
  benefitsData: readonly BenefitItem[];
  whyChooseItems: readonly WhyChooseItem[];
  testimonialsData: readonly TestimonialItem[];
  faqData: readonly FaqItem[];
  formMessagePlaceholder: string;
  officePhoneSubtitle: string;
  aiModelsData?: readonly AiModelItem[];
};

/** Single factory to build page data so key names and structure are not duplicated. */
function createServicePageData(config: ServicePageConfig) {
  const {
    servicesData,
    industryItems,
    processSteps,
    benefitsData,
    whyChooseItems,
    testimonialsData,
    faqData,
    formMessagePlaceholder,
    officePhoneSubtitle,
    aiModelsData,
  } = config;
  const base = {
    servicesData,
    industryItems,
    processSteps,
    benefitsData,
    whyChooseItems,
    testimonialsData,
    faqData,
    formFieldsConfig: createServiceFormFieldsConfig(formMessagePlaceholder),
    officeCardsData: createServiceOfficeCards(officePhoneSubtitle),
  };
  return aiModelsData ? { ...base, aiModelsData } : base;
}

const CUDA_SERVICES = [
  { title: 'Custom Parallel\nAlgorithm Design', description: 'To maintain long-term computational performance, we build workload-specific parallel plans, compromising thread allocation, the use of memory hierarchy, and synchronization.' },
  { title: 'GPU Acceleration for\nExisting Systems', description: 'With little disturbance, legacy applications are reformed to run on the GPU. We control the optimization of data transfer, API correspondence, and validation to production readiness.' },
  { title: 'End-to-End Performance\nArchitecture', description: 'Since we do initial modeling, benchmark validation, and hardening against deployment, we manage all the steps of the CUDA implementation with precision-driven engineering requirements.' },
] as const;

const CUDA_INDUSTRY = ['Artificial Intelligence Model Training & Inference Systems', 'Super-Accurate Scientific Research Platforms', 'Risk Engines and Algorithms Trading', 'Instant Media Rendering and Analysis'] as const;

const CUDA_PROCESS: readonly ProcessStep[] = [
  { title: 'Computational Profiling', description: 'We measure execution patterns, memory loads, and bottlenecks in order to come up with realistic acceleration targets.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-blue-500/50', pathD: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { title: 'Parallel Systems Blueprint', description: 'Models known as thread hierarchy, shared memory models, and workload partitioning are designed for models that are ideal to execute using the GPUs.', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50', pathD: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { title: 'CUDA Core Development', description: 'The high-occupancy kernels are also designed to provide the predictability of throughput when operating at peak loading.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-cyan-500/50', pathD: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Bottleneck Elimination & Benchmarking', description: 'The profiling tools reveal the areas of inefficiency so that they can be refined to achieve continuous and reliable performance improvements.', gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/50', pathD: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Application Integration', description: 'GPU modules are integrated into your software ecosystem with clean interfaces and continuity.', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/50', pathD: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { title: 'Production Optimization', description: 'Scalability is guaranteed during post-deployment analysis, based on the changing workloads and multi-GPUs.', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/50', pathD: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
];

const CUDA_BENEFITS: readonly BenefitItem[] = [
  { title: 'Accelerated\nComputational\nPerformance', description: 'CUDA allows parallel computation of thousands of Cores on the GPU, which saves a lot of processing time when dealing with complex workloads, like AI training, simulations, and applications of large data analytics.', borderColor: 'rgba(34, 211, 238, 0.35)' },
  { title: 'Improved\nInfrastructure\nEfficiency', description: 'By moving more intensive workloads off of CPU and onto the GPUs, the organizations are able to handle larger data volumes with reduced hardware resources to enhance performance-per-watt and infrastructure ROI.', borderColor: 'rgba(6, 182, 212, 0.35)' },
  { title: 'Enhanced\nCompetitive\nPositioning', description: 'A rapid computational speed can be more useful in fast experimentation, real-time analysis, and sophisticated modeling, which will enable companies to innovate faster and have a high level of technological superiority in their industry.', borderColor: 'rgba(139, 92, 246, 0.35)' },
  { title: 'Scalable\nHigh-Performance\nArchitecture', description: 'The architecture of CUDA-based systems is built so that it can be used in both multi-GPU architectures and high-performance clusters, both in terms of throughput and reliability, as data requirements and computing complexity rise.', borderColor: 'rgba(236, 72, 153, 0.35)' },
  { title: 'Future-Ready\nTechnology\nInvestment', description: 'Adopting CUDA aligns your infrastructure with evolving GPU advancements, ensuring compatibility with emerging AI frameworks, deep learning models, and next-generation computational workloads.', borderColor: 'rgba(251, 146, 60, 0.35)' },
  { title: 'Reduced\nDevelopment\nCycles', description: 'The performance in terms of optimization of GPU acceleration reduces the time of implementation in testing and in the process of iteration, whereby development teams can quickly rise above their experimental levels and proceed with their production processes more efficiently.', borderColor: 'rgba(52, 211, 153, 0.35)' },
];

const CUDA_WHY: readonly WhyChooseItem[] = [
  { title: 'Advanced Parallel Computing Expertise', description: 'Our engineers have extensive practical experience in CUDA programming and in the design of large-scale parallel architecture, as well as in the management of the GPU memory. We build production-ready acceleration frameworks that prioritize execution stability, optimal resource utilization, and sustained high-throughput performance across demanding computational environments.' },
  { title: 'Quantifiable Performance Improvements', description: 'All CUDA implementations have advanced profiling, benchmarking, and performance analysis. We quantify the reduction of latency, throughput improvement as well as resource efficiency to make sure that optimization outcomes are realistic, evidence-based, and consistent with clearly established performance goals.' },
  { title: 'Workload-Specific Optimization Strategy', description: "We do not just make some arbitrary acceleration, but instead analyze the patterns of execution of your application, data dependencies, and scaling needs. This enables us to design CUDA solutions that are highly targeted to optimally match workload behaviour and provide predictable and orderable computational benefits." },
];

const CUDA_TESTIMONIALS: readonly TestimonialItem[] = [
  { quote: '"GPU acceleration significantly enhanced our data processing framework, reducing execution cycles under high-load scenarios."', initials: 'DE', role: 'Director of Engineering', company: 'AI Platform', avatarGradient: GRADIENT_EMERALD_CYAN },
  { quote: '"Our migration to CUDA-based execution improved analytical throughput without expanding infrastructure costs."', initials: 'CT', role: 'Chief Technology Officer', company: 'Technology Company', avatarGradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
  { quote: '"The architectural redesign delivered predictable performance scaling across multiple GPU nodes."', initials: 'HS', role: 'Head of Systems Engineering', company: 'Engineering Company', avatarGradient: 'linear-gradient(135deg, #22D3EE, #34D399)' },
];

const CUDA_FAQ: readonly FaqItem[] = [
  { q: 'How do I know if my application is suitable for CUDA acceleration?', a: 'Applications whose operations are frequently repeated in numbers, process large datasets, matrix calculations, or can be performed in parallel are good candidates. Performing profiling measurements helps us identify whether there are any performance improvements that can be realized and achieved through the use of GPU acceleration.' },
  { q: 'Can CUDA be integrated into an existing production system?', a: 'Yes. We refactor and modularize elements such that there is no disruption to other business operations, and a full system rebuild is not necessary to add the acceleration of a graphics card to your existing architecture.' },
  { q: 'What is the difference between CPU optimization and CUDA optimization?', a: 'CPU optimization enhances the ability to run sequence-related tasks, whereas CUDA optimization rearranges workloads to execute them in a massively parallel fashion across the armies of cores in GPUs, which is much more efficient at providing high throughput in tasks of high compute intensity.' },
  { q: 'Do you support multi-GPU and cluster-based deployments?', a: 'Absolutely. Our CUDA architectures are optimized to be scaled to multi-GPU and high-performance cluster environments, such that the performance remains consistent as the level of computational requirements rises.' },
  { q: 'How do you measure performance improvement in CUDA projects?', a: 'Before and after optimization, we measure the reduction of execution time, the increased memory efficiency, and scalability through profiling tools, benchmarking frameworks, and throughput analysis.' },
  { q: 'Is ongoing CUDA performance tuning necessary?', a: 'Yes. With the changing workloads, periodical profiling and optimization will ensure the efficiency is maintained and avoid any bottlenecks, keeping the utilization of the GPUs optimal over time.' },
];

const GPU_SERVICES = [
  { title: 'CUDA\nOptimization', description: 'We optimize the underlying kernel execution, better shared memory assignment, and also readjust thread block settings to optimize performance. The services of our CUDA Development are aimed at removing the warp divergence and the latency in the NVIDIA GPU architecture.' },
  { title: 'AI/ML\nAcceleration', description: 'Optimize the equilibrium of both the speed of model training and inference via optimized batch operations and the control of accessing memory. We optimize compute to reduce training time and improve predictive performance.' },
  { title: 'Performance\nProfiling', description: 'We identify the areas of inefficiency in the execution flow and memory transfers into increasingly sophisticated profiling frameworks. The benefits of detailed benchmarking are accuracy in making optimization decisions and quantifiable performance improvements.' },
] as const;

const GPU_INDUSTRY = ['AI & Machine Learning', 'Scientific Computing', 'Data Analytics', 'Rendering & Graphics'] as const;

const GPU_PROCESS: readonly ProcessStep[] = [
  { title: 'Assessment', description: 'Assess existing GPU architecture, load, and establish specific optimization objectives.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-blue-500/50', pathD: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { title: 'Analysis', description: 'Gather real-time monitoring information and spot performance issues and performance bottlenecks.', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50', pathD: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
  { title: 'Kernel Optimization', description: 'Refine CUDA kernels and improve parallel execution balance.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-cyan-500/50', pathD: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { title: 'Tuning', description: 'Expenses in runtime parameters and memory allocation, better throughput.', gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/50', pathD: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Testing', description: 'Authenticate gains with validation checkpoints.', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/50', pathD: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Deployment', description: 'Employ workloads that are optimized, monitored, and improved.', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/50', pathD: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
];

const GPU_BENEFITS: readonly BenefitItem[] = [
  { title: 'Faster\nProcessing\nSpeed', description: 'Fasten hardened compute tasks with an ideal use of parallelization and data movement. With decreased processing time, there will be shorter experimentation times and shorter delivery times.', borderColor: 'rgba(34, 211, 238, 0.35)' },
  { title: 'Lower Costs of\nInfrastructure', description: 'Optimize the use of GPUs in order to reduce costs on clouds and hardware. Harmful efficiency brings a decrease in over-provisioning and enhanced resource allocation.', borderColor: 'rgba(6, 182, 212, 0.35)' },
  { title: 'Improved\nScalability', description: 'Processes more data and intricate programs with no drop in performance or increased proportional cost.', borderColor: 'rgba(139, 92, 246, 0.35)' },
  { title: 'Enhanced\nModel\nPerformance', description: 'Improve the performance of AI models training and inference with optimal CUDA execution paths.', borderColor: 'rgba(236, 72, 153, 0.35)' },
  { title: 'Competitive\nAdvantage', description: 'Become better computers to hasten innovation and become more powerful in data-based markets.', borderColor: 'rgba(251, 146, 60, 0.35)' },
  { title: 'Energy\nEfficiency', description: 'Minimize energy use by optimizing the use of GPUs, which helps on the sustainability agenda and limits the cost of running the operations.', borderColor: 'rgba(52, 211, 153, 0.35)' },
];

const GPU_WHY: readonly WhyChooseItem[] = [
  { title: 'Advanced Parallel Computing Expertise', description: 'Our experts have extensive expertise in CUDA implementation, tuning of the GPU architecture, and high-performance parallel systems. This is done at low-level kernel optimization all the way up to optimizing an entire NVIDIA GPU, and we work to squeeze the highest performance out of every tier of your computing system.' },
  { title: 'Results Backed by Data', description: 'We value quantitative difference. Each interaction is predetermined by profiling information, systematic testing, and efficiency metrics showing evident acceleration, competitive advantages, and enhanced hardware use.' },
  { title: 'Optimization Built Around Your Workload', description: 'No generic templates. We will create application-specific GPU optimization that will respond to your application and run a discussion, infrastructure configuration, as well as scalability needs by making the performance consistently enhanced on a long-term basis.' },
];

const GPU_TESTIMONIALS: readonly TestimonialItem[] = [
  { quote: '"Their graphics processing optimization experience minimized our processing latency. The CUDA execution benefits were fast and quantifiable."', initials: 'AM', name: 'Arjun Mehta', role: 'Director of Engineering, NovaAI Labs', avatarGradient: GRADIENT_EMERALD_CYAN },
  { quote: '"Our AI training pipeline became significantly faster after their optimization work. Clear performance gains with reduced infrastructure strain."', initials: 'SA', name: 'Sofia Alvarez', role: 'CTO, Quantix Systems', avatarGradient: GRADIENT_EMERALD_CYAN },
  { quote: '"We hired their CUDA developers for complex optimization tasks. The results were stable, scalable, and production-ready."', initials: 'DB', name: 'Daniel Brooks', role: 'Chief Operating Officer, CoreTech Solutions', avatarGradient: GRADIENT_EMERALD_CYAN },
];

const GPU_FAQ: readonly FaqItem[] = [
  { q: 'How long does a GPU optimization project typically take?', a: 'The timelines of projects are based on the complexity of the workload, the level of infrastructure, and the objectives of the performance. Enterprise environments take most optimization engagements between a few weeks and a few months.' },
  { q: 'Can you optimize legacy CUDA codebases?', a: 'Yes. We test current CUDA implementations, determine architectural waste, and cull kernels to optimize memory access characteristics, parallel execution ratio, and total performance.' },
  { q: 'What metrics do you use to measure optimization success?', a: 'We assess the use of GPUs, the performance, the ability to use memory, the decrease in latency, the efficiency of the scalability, and the savings in costs using structured profiling and benchmarking techniques.' },
  { q: 'Do optimized workloads remain stable in production?', a: 'Absolutely. All optimizations are tested, regressed, and monitored during deployment to make sure that the performance improvements will be maintained in the field.' },
];

const GPU_AI_MODELS: readonly AiModelItem[] = [
  { name: 'GPT-4o', src: '/images/AI Models exeperty/gpt-4o.jpg.jpg', alt: 'GPT-4o' },
  { name: 'Llama 3', src: '/images/AI Models exeperty/llama-3.jpg.webp', alt: 'Llama 3' },
  { name: 'PaLM 2', src: '/images/AI Models exeperty/palm-2.jpg.webp', alt: 'PaLM 2' },
  { name: 'Stability AI', src: '/images/AI Models exeperty/stability-ai.jpg.webp', alt: 'Stability AI' },
  { name: 'Google Gemini', src: '/images/AI Models exeperty/google-gemini.jpg.webp', alt: 'Google Gemini' },
  { name: 'Vicuna', src: '/images/AI Models exeperty/vicuna.jpg.webp', alt: 'Vicuna' },
  { name: 'Mistral', src: '/images/AI Models exeperty/mistral.jpg.webp', alt: 'Mistral' },
  { name: 'Claude', src: '/images/AI Models exeperty/claude.jpg.webp', alt: 'Claude' },
];

export const cudaDevelopmentPageData = createServicePageData({
  servicesData: CUDA_SERVICES,
  industryItems: CUDA_INDUSTRY,
  processSteps: CUDA_PROCESS,
  benefitsData: CUDA_BENEFITS,
  whyChooseItems: CUDA_WHY,
  testimonialsData: CUDA_TESTIMONIALS,
  faqData: CUDA_FAQ,
  formMessagePlaceholder: 'Tell us about your CUDA development needs...',
  officePhoneSubtitle: 'Available Mon-Fri, 9AM-6PM IST',
});

export const gpuOptimizationPageData = createServicePageData({
  servicesData: GPU_SERVICES,
  industryItems: GPU_INDUSTRY,
  processSteps: GPU_PROCESS,
  benefitsData: GPU_BENEFITS,
  whyChooseItems: GPU_WHY,
  testimonialsData: GPU_TESTIMONIALS,
  faqData: GPU_FAQ,
  formMessagePlaceholder: 'Tell us about your GPU optimization needs...',
  officePhoneSubtitle: 'Mon-Fri, 9AM-6PM IST',
  aiModelsData: GPU_AI_MODELS,
});
