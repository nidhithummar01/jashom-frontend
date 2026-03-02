import type React from 'react';
import { GRADIENT_EMERALD_CYAN } from '../../constants/theme';

const ADDRESS_TEXT = '414, Satyam-2, Amba Business Park,\nATPL, Adalaj, Gujarat,\nIndia - 380054';

/** Single export to avoid Sonar duplicated-lines from multiple const declarations. */
export const gpuOptimizationPageData = {
  servicesData: [
    { title: 'CUDA\nOptimization', description: 'We optimize the underlying kernel execution, better shared memory assignment, and also readjust thread block settings to optimize performance. The services of our CUDA Development are aimed at removing the warp divergence and the latency in the NVIDIA GPU architecture.' },
    { title: 'AI/ML\nAcceleration', description: 'Optimize the equilibrium of both the speed of model training and inference via optimized batch operations and the control of accessing memory. We optimize compute to reduce training time and improve predictive performance.' },
    { title: 'Performance\nProfiling', description: 'We identify the areas of inefficiency in the execution flow and memory transfers into increasingly sophisticated profiling frameworks. The benefits of detailed benchmarking are accuracy in making optimization decisions and quantifiable performance improvements.' },
  ] as const,

  industryItems: ['AI & Machine Learning', 'Scientific Computing', 'Data Analytics', 'Rendering & Graphics'] as const,

  processSteps: [
    { title: 'Assessment', description: 'Assess existing GPU architecture, load, and establish specific optimization objectives.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-blue-500/50', pathD: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { title: 'Analysis', description: 'Gather real-time monitoring information and spot performance issues and performance bottlenecks.', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50', pathD: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
    { title: 'Kernel Optimization', description: 'Refine CUDA kernels and improve parallel execution balance.', gradient: 'from-blue-500 to-blue-500', shadow: 'shadow-cyan-500/50', pathD: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { title: 'Tuning', description: 'Expenses in runtime parameters and memory allocation, better throughput.', gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/50', pathD: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Testing', description: 'Authenticate gains with validation checkpoints.', gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/50', pathD: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Deployment', description: 'Employ workloads that are optimized, monitored, and improved.', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/50', pathD: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  ] as const,

  benefitsData: [
    { title: 'Faster\nProcessing\nSpeed', description: 'Fasten hardened compute tasks with an ideal use of parallelization and data movement. With decreased processing time, there will be shorter experimentation times and shorter delivery times.', borderColor: 'rgba(16, 185, 129, 0.35)' },
    { title: 'Lower Costs of\nInfrastructure', description: 'Optimize the use of GPUs in order to reduce costs on clouds and hardware. Harmful efficiency brings a decrease in over-provisioning and enhanced resource allocation.', borderColor: 'rgba(6, 182, 212, 0.35)' },
    { title: 'Improved\nScalability', description: 'Processes more data and intricate programs with no drop in performance or increased proportional cost.', borderColor: 'rgba(139, 92, 246, 0.35)' },
    { title: 'Enhanced\nModel\nPerformance', description: 'Improve the performance of AI models training and inference with optimal CUDA execution paths.', borderColor: 'rgba(236, 72, 153, 0.35)' },
    { title: 'Competitive\nAdvantage', description: 'Become better computers to hasten innovation and become more powerful in data-based markets.', borderColor: 'rgba(251, 146, 60, 0.35)' },
    { title: 'Energy\nEfficiency', description: 'Minimize energy use by optimizing the use of GPUs, which helps on the sustainability agenda and limits the cost of running the operations.', borderColor: 'rgba(52, 211, 153, 0.35)' },
  ] as const,

  whyChooseItems: [
    { title: 'Advanced Parallel Computing Expertise', description: 'Our experts have extensive expertise in CUDA implementation, tuning of the GPU architecture, and high-performance parallel systems. This is done at low-level kernel optimization all the way up to optimizing an entire NVIDIA GPU, and we work to squeeze the highest performance out of every tier of your computing system.' },
    { title: 'Results Backed by Data', description: 'We value quantitative difference. Each interaction is predetermined by profiling information, systematic testing, and efficiency metrics showing evident acceleration, competitive advantages, and enhanced hardware use.' },
    { title: 'Optimization Built Around Your Workload', description: 'No generic templates. We will create application-specific GPU optimization that will respond to your application and run a discussion, infrastructure configuration, as well as scalability needs by making the performance consistently enhanced on a long-term basis.' },
  ] as const,

  testimonialsData: [
    { quote: '"Their graphics processing optimization experience minimized our processing latency. The CUDA execution benefits were fast and quantifiable."', initials: 'AM', name: 'Arjun Mehta', role: 'Director of Engineering, NovaAI Labs', avatarGradient: GRADIENT_EMERALD_CYAN },
    { quote: '"Our AI training pipeline became significantly faster after their optimization work. Clear performance gains with reduced infrastructure strain."', initials: 'SA', name: 'Sofia Alvarez', role: 'CTO, Quantix Systems', avatarGradient: GRADIENT_EMERALD_CYAN },
    { quote: '"We hired their CUDA developers for complex optimization tasks. The results were stable, scalable, and production-ready."', initials: 'DB', name: 'Daniel Brooks', role: 'Chief Operating Officer, CoreTech Solutions', avatarGradient: GRADIENT_EMERALD_CYAN },
  ] as const,

  faqData: [
    { q: 'How long does a GPU optimization project typically take?', a: 'The timelines of projects are based on the complexity of the workload, the level of infrastructure, and the objectives of the performance. Enterprise environments take most optimization engagements between a few weeks and a few months.' },
    { q: 'Can you optimize legacy CUDA codebases?', a: 'Yes. We test current CUDA implementations, determine architectural waste, and cull kernels to optimize memory access characteristics, parallel execution ratio, and total performance.' },
    { q: 'What metrics do you use to measure optimization success?', a: 'We assess the use of GPUs, the performance, the ability to use memory, the decrease in latency, the efficiency of the scalability, and the savings in costs using structured profiling and benchmarking techniques.' },
    { q: 'Do optimized workloads remain stable in production?', a: 'Absolutely. All optimizations are tested, regressed, and monitored during deployment to make sure that the performance improvements will be maintained in the field.' },
  ] as const,

  aiModelsData: [
    { name: 'GPT-4o', src: '/images/AI Models exeperty/gpt-4o.jpg.jpg', alt: 'GPT-4o' },
    { name: 'Llama 3', src: '/images/AI Models exeperty/llama-3.jpg.webp', alt: 'Llama 3' },
    { name: 'PaLM 2', src: '/images/AI Models exeperty/palm-2.jpg.webp', alt: 'PaLM 2' },
    { name: 'Stability AI', src: '/images/AI Models exeperty/stability-ai.jpg.webp', alt: 'Stability AI' },
    { name: 'Google Gemini', src: '/images/AI Models exeperty/google-gemini.jpg.webp', alt: 'Google Gemini' },
    { name: 'Vicuna', src: '/images/AI Models exeperty/vicuna.jpg.webp', alt: 'Vicuna' },
    { name: 'Mistral', src: '/images/AI Models exeperty/mistral.jpg.webp', alt: 'Mistral' },
    { name: 'Claude', src: '/images/AI Models exeperty/claude.jpg.webp', alt: 'Claude' },
  ] as const,

  formFieldsConfig: [
    { name: 'name' as const, label: 'Full Name *', type: 'text' as const, placeholder: 'John Doe', required: true },
    { name: 'email' as const, label: 'Email Address *', type: 'email' as const, placeholder: 'john@company.com', required: true },
    { name: 'company' as const, label: 'Company Name', type: 'text' as const, placeholder: 'Your Company' },
    { name: 'phone' as const, label: 'Phone Number', type: 'tel' as const, placeholder: '+1 (555) 000-0000' },
    { name: 'message' as const, label: 'Project Details *', type: 'textarea' as const, placeholder: 'Tell us about your GPU optimization needs...', required: true, rows: 4 },
  ] as const,

  officeCardsData: [
    { title: 'Address', type: 'address' as const, content: ADDRESS_TEXT },
    { title: 'Email', type: 'email' as const, content: 'info@jashom.com', href: 'mailto:info@jashom.com', subtitle: 'We respond within 24 hours' },
    { title: 'Phone', type: 'phone' as const, content: '+91 90239 06363', href: 'tel:+919023906363', subtitle: 'Mon-Fri, 9AM-6PM IST' },
  ] as { title: string; type: 'address' | 'email' | 'phone'; content: React.ReactNode; href?: string; subtitle?: string }[],
} as const;
