import { Brain, Cpu, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import type { HomeContactFormData, HomeContactFieldName, ServiceFormField } from '../homeContactTypes';
import { ACCENT_COLOR, GRADIENT_EMERALD_CYAN, TEXT_FAFAFA, TEXT_WHITE } from '../../constants/theme';

const LOGO_BASE_CLASS = 'w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300';

/** Trusted-by section: same visual weight in uniform cards */
const TRUSTED_LOGO_IMG_CLASS =
  'h-auto max-h-10 w-auto max-w-[min(100%,160px)] sm:max-h-12 sm:max-w-[180px] object-contain object-center mx-auto opacity-[0.95] transition-opacity duration-300 group-hover:opacity-100';

export type { HomeContactFormData };

export type PortfolioProject = {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string[];
  tags: string[];
  image: string;
  link: string;
  /** Optional external URL for "Visit Live Platform" link */
  liveUrl?: string;
};

/** Single export to avoid Sonar duplicated-lines from multiple const declarations. */
export const homePageData = {
  VIOLET_COLOR: '#7C3AED' as const,

  CTA_GRADIENT_STYLE: {
    background: GRADIENT_EMERALD_CYAN,
    borderColor: 'transparent',
    color: TEXT_WHITE,
    boxShadow: '0 8px 32px rgba(34, 211, 238, 0.4)',
  } as const,

  BENEFIT_CARD_STYLE: {
    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.03) 100%)',
    borderColor: 'rgba(34, 211, 238, 0.2)',
    backdropFilter: 'blur(8px)',
  } as const,

  BENEFIT_ICON_BOX: {
    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
  } as const,

  BLOG_CARD_BG: '#111827' as const,
  /** No border on latest-blog cards (image/gradient provides edge definition). */
  BLOG_CARD_BORDER: 'none' as const,

  BLOG_BADGE_STYLE: {
    background: 'rgba(34, 211, 238, 0.15)',
    color: ACCENT_COLOR,
    border: '1px solid rgba(34, 211, 238, 0.3)',
    backdropFilter: 'blur(8px)',
  } as const,

  VIEW_ALL_BTN_STYLE: {
    background: 'rgba(34, 211, 238, 0.12)',
    border: '1px solid rgba(34, 211, 238, 0.35)',
    color: TEXT_FAFAFA,
  } as const,

  LOGO_BASE_CLASS,

  homeContactFormFields: [
    { name: 'fullName', label: 'Name *', type: 'text', placeholder: 'John Doe', required: true },
    { name: 'email', label: 'Email *', type: 'email', placeholder: 'john@company.com', required: true },
    { name: 'company', label: 'Company', type: 'text', placeholder: 'Your Company' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
    {
      name: 'service',
      label: 'Service Interest',
      type: 'select',
      placeholder: '',
      options: [
        { value: '', label: 'Select a service' },
        { value: 'gpu-optimization', label: 'GPU Optimization Service' },
        { value: 'cuda-development', label: 'CUDA Development Service' },
        { value: 'ai-ml', label: 'AI/ML Development' },
        { value: 'consulting', label: 'AI Consulting' },
      ],
    },
    { name: 'message', label: 'Message *', type: 'textarea', placeholder: 'Tell us about your project...', required: true, rows: 4 },
  ] as ServiceFormField<HomeContactFieldName>[],

  whatWeDoData: [
    { title: 'GPU Optimization', description: 'We provide dedicated GPU Optimization Services aimed at the maximum use of the compute efficiency. Our model will guarantee optimization in the use of hardware, the reduction of operational expenses, and coherent high-performance scale.', colorKey: 'emerald' as const },
    { title: 'CUDA Development', description: 'Our CUDA Development Services assist companies in developing high-performance parallel applications to suit their workloads with high demand. Our built-in kernel development-based team of CUDA Developers provides your apps with complete utilization of NVIDIA architecture.', colorKey: 'emerald' as const },
  ] as const,

  servicesProvideData: [
    { title: 'GPU Optimization Service', description: 'We optimize AI and compute workloads with the help of advanced GPU optimization, performance, efficiency, and hardware usage.', href: '/gpu-optimization-service/', Icon: Cpu, colorKey: 'emerald' as const, buttonStyle: { background: ACCENT_COLOR, color: TEXT_WHITE } },
    { title: 'CUDA Development Service', description: 'Hire skilled CUDA developers to create and optimize parallel advanced applications that meet your requirements.', href: '/cuda-development-service/', Icon: Zap, colorKey: 'emerald' as const, buttonStyle: { background: 'linear-gradient(135deg, #22D3EE, #06B6D4)', color: TEXT_WHITE } },
  ] as const,

  trustedLogosData: [
    { src: '/logos/nvidia.svg', alt: 'NVIDIA', className: TRUSTED_LOGO_IMG_CLASS },
    { src: '/logos/aws-new.png', alt: 'AWS', className: TRUSTED_LOGO_IMG_CLASS },
    { src: '/logos/goggle cloud.png', alt: 'Google Cloud', className: TRUSTED_LOGO_IMG_CLASS },
    { src: '/logos/microsoft-azure.png', alt: 'Microsoft Azure', className: TRUSTED_LOGO_IMG_CLASS },
  ] as const,

  trustedMetricsData: [
    { value: '5M', description: 'worth investment portfolios managed', from: 'from-blue-500/10', to: 'to-blue-600/5', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-400/40', valueGradient: 'from-blue-400 to-blue-200' },
    { value: '2X', description: 'faster market analytics', from: 'from-purple-500/10', to: 'to-purple-600/5', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-400/40', valueGradient: 'from-purple-400 to-purple-200' },
    { value: '10M', description: 'customers enjoying AI-powered shopping', from: 'from-blue-500/10', to: 'to-cyan-600/5', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-400/40', valueGradient: 'from-cyan-400 to-cyan-200' },
    { value: '$50K', description: 'saved annually with DevOps', from: 'from-green-500/10', to: 'to-green-600/5', border: 'border-green-500/20', hoverBorder: 'hover:border-green-400/40', valueGradient: 'from-green-400 to-green-200' },
  ] as const,

  testimonialsData: [
    { quote: `"Jashom's GPU optimization reduced our inference latency by 73%. The team's expertise in CUDA programming is unmatched."`, initials: 'AD', name: 'Alexander D.', role: 'Founder, 20+ years of experience.', avatarGradient: GRADIENT_EMERALD_CYAN },
    { quote: `"The AI automation solutions delivered by Jashom transformed our workflow. We achieved 5x faster processing with their custom ML pipeline."`, initials: 'RT', name: 'Ricky T.', role: 'CTO, 15+ years of experience.', avatarGradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
    { quote: `"Outstanding DevSecOps implementation. Jashom's team integrated security seamlessly into our CI/CD pipeline without compromising speed."`, initials: 'JB', name: 'Jimmy B.', role: 'VP Engineering, 10+ years of experience.', avatarGradient: 'linear-gradient(135deg, #22D3EE, #34D399)' },
  ] as const,

  benefitsData: [
    { title: '10x GPU Performance Improvement', description: 'Architecture-sensitive tuning methods are used by us to reap the best out of NVIDIA GPUs, providing physical acceleration to AI applications.', Icon: Cpu },
    { title: 'Production-Grade AI Systems', description: 'Develop scalable systems that are designed with a focus on reliability, monitoring, and long-term performance.', Icon: Brain },
    { title: 'Enterprise-Level Security', description: 'Our operations are enforced under stringent security measures, compliance, and data protection models in order to secure essential workloads.', Icon: Shield },
    { title: 'Rapid Implementation Cycles', description: 'We satisfy the timeline requirements of projects through organized processes, which allow us to roll out faster and maintain the quality of performance.', Icon: Zap },
    { title: 'Dedicated Technical Support', description: 'Our experts have continued optimization, surveillance, and expert services that ensure that the system operates continuously.', Icon: Users },
    { title: 'Cost-Efficient Scaling', description: 'Our frameworks for designing GPU systems consider the demand of performance with functional efficiency to ensure the highest ROI in the long-term.', Icon: TrendingUp },
  ] as const,

  statsData: [
    { value: '50+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '10x', label: 'Performance Gain' },
    { value: '24/7', label: 'Support Available' },
  ] as const,

  portfolioProjects: [
    { title: 'LLM Inference Optimization on Constrained GPU Infrastructure', industry: 'Enterprise AI · LLM Deployment', challenge: 'Constrained GPU infrastructure limited inference throughput and power efficiency', solution: 'Full inference path re-engineering with CUDA kernels, TensorRT, and adaptive batching across 12 nodes', impact: ['42% higher throughput', '37% lower power', '12 distributed nodes'], tags: ['CUDA', 'TensorRT', 'LLM'], image: '/images/gpu.optimization.jpg', link: '/portfolio/case-study/llm-inference-optimization/' },
    { title: 'GPU Workload Orchestration Framework on Rocky Linux 9.7', industry: 'Infrastructure · GPU Operations', challenge: 'Organizations needed VRAM-aware GPU job scheduling with isolation and audit trails', solution: 'REST API orchestration with VRAM-aware scheduling, Docker isolation, and full audit trail', impact: ['5 days to demo', '4 endpoints', '100% isolation'], tags: ['FastAPI', 'Docker', 'Rocky Linux'], image: '/images/cuda.service.hero.jpg', link: '/portfolio/case-study/gpu-workload-orchestration/' },
    { title: 'Cloud GPU Fine-Tuning Strategy for Production LLM Deployment', industry: 'AI Engineering · Cloud Infrastructure', challenge: 'Production LLM deployment required tiered fine-tuning across 7B–70B+ models', solution: 'Provider-agnostic cloud GPU strategy with LoRA/QLoRA, Axolotl, DeepSpeed; dataset to production in days', impact: ['7B–70B+ models', '3 tiers', 'Days to deploy'], tags: ['LoRA', 'DeepSpeed', 'Cloud GPU'], image: '/images/blog.jpg', link: '/portfolio/case-study/cloud-gpu-fine-tuning/' },
    { title: 'Real-Time GPU Server Hardware Telemetry via Redfish BMC', industry: 'Infrastructure Monitoring · GPU Data Centers', challenge: 'Real-time visibility into GPU server power, temperature, and fan metrics without OS dependency', solution: 'Live dashboard with 30s refresh from Lambda Scalar BMCs via Redfish; HTTPS, Basic Auth, scoped SSL', impact: ['30s refresh', '4 servers', 'Out-of-band'], tags: ['Redfish', 'BMC', 'Telemetry'], image: '/images/portfolio.jpg', link: '/portfolio/case-study/redfish-bmc-telemetry/' },
  ] as PortfolioProject[],
};

export function formatBlogDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
