import { Brain, Cpu, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import type { HomeContactFormData, HomeContactFieldName, ServiceFormField } from '../homeContactTypes';
import { img } from '../portfolio/caseStudiesConfig';
import { ACCENT_COLOR, GRADIENT_EMERALD_CYAN, TEXT_FAFAFA, TEXT_WHITE } from '../../constants/theme';

const LOGO_BASE_CLASS = 'w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300';

export type { HomeContactFormData };

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
  BLOG_CARD_BORDER: '1px solid rgba(255, 255, 255, 0.08)' as const,

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
    { name: 'name', label: 'Name *', type: 'text', placeholder: 'John Doe', required: true },
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
    { src: '/logos/nvidia.png', alt: 'NVIDIA', className: `h-10 sm:h-12 ${LOGO_BASE_CLASS}` },
    { src: '/logos/aws.png', alt: 'AWS', className: `h-10 sm:h-12 ${LOGO_BASE_CLASS}` },
    { src: '/logos/goggle cloud.png', alt: 'Google Cloud', className: `h-10 sm:h-12 ${LOGO_BASE_CLASS}` },
    { src: '/logos/microsoft-azure.png', alt: 'Microsoft Azure', className: `h-12 sm:h-14 ${LOGO_BASE_CLASS}` },
  ] as const,

  trustedMetricsData: [
    { value: '$20bn', description: 'worth investment portfolios managed', from: 'from-blue-500/10', to: 'to-blue-600/5', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-400/40', valueGradient: 'from-blue-400 to-blue-200' },
    { value: '10x', description: 'faster pharmaceutical market analytics', from: 'from-purple-500/10', to: 'to-purple-600/5', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-400/40', valueGradient: 'from-purple-400 to-purple-200' },
    { value: '20M+', description: 'customers enjoying AI-powered shopping', from: 'from-blue-500/10', to: 'to-cyan-600/5', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-400/40', valueGradient: 'from-cyan-400 to-cyan-200' },
    { value: '$50K', description: 'saved annually with DevOps', from: 'from-green-500/10', to: 'to-green-600/5', border: 'border-green-500/20', hoverBorder: 'hover:border-green-400/40', valueGradient: 'from-green-400 to-green-200' },
  ] as const,

  testimonialsData: [
    { quote: `"Jashom's GPU optimization reduced our inference latency by 73%. The team's expertise in CUDA programming is unmatched."`, initials: 'DC', name: 'David Chen', role: 'VP Engineering, Apex AI', avatarGradient: GRADIENT_EMERALD_CYAN },
    { quote: `"The AI automation solutions delivered by Jashom transformed our workflow. We achieved 5x faster processing with their custom ML pipeline."`, initials: 'MR', name: 'Maria Rodriguez', role: 'CTO, DataFlow Systems', avatarGradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
    { quote: `"Outstanding DevSecOps implementation. Jashom's team integrated security seamlessly into our CI/CD pipeline without compromising speed."`, initials: 'EW', name: 'Emily Watson', role: 'Head of Security, TechCorp', avatarGradient: 'linear-gradient(135deg, #22D3EE, #34D399)' },
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
    { value: '500+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '10x', label: 'Performance Gain' },
    { value: '24/7', label: 'Support Available' },
  ] as const,

  portfolioProjects: [
    { title: 'BoostReferral - SaaS Platform', industry: 'SaaS', challenge: 'Businesses needed an automated solution to manage referral programs', solution: 'Comprehensive referral management platform with analytics', impact: ['Automated referral management', '99.9% platform uptime', 'Scalable SaaS architecture'], tags: ['SaaS Platform', 'Analytics', 'Automation'], image: img('boostreferral.jpg'), link: '/projects/boostreferral', liveUrl: 'https://www.boostreferral.com' },
    { title: 'ProjectSphere - Project Management Platform', industry: 'SaaS', challenge: 'Organizations need comprehensive project management tools', solution: 'Complete project management platform with real-time collaboration', impact: ['45% team efficiency', '30% faster delivery', '85% user adoption'], tags: ['Project Management', 'Collaboration', 'Analytics'], image: img('projectsphere.jpg'), link: '/projects/projectsphere' },
    { title: 'EnviroPulse - Environmental Monitoring', industry: 'Environmental Tech', challenge: 'Real-time monitoring across multiple zones needed', solution: 'IoT sensors with advanced analytics for environmental monitoring', impact: ['35% reduction in incidents', 'Real-time monitoring', 'Multi-zone tracking'], tags: ['IoT', 'Real-time Data', 'Analytics'], image: img('enviropulse.jpg'), link: '/projects/enviropulse', liveUrl: 'https://enviropulse.jashom.com' },
    { title: 'GreenSphere - ESG Platform', industry: 'ESG Platform', challenge: 'ESG metrics tracking and reporting challenges', solution: 'Comprehensive ESG tracking and reporting platform', impact: ['23% carbon reduction', '65% reporting efficiency', 'Automated reporting'], tags: ['ESG', 'Sustainability', 'Reporting'], image: img('greensphere.jpg'), link: '/projects/greensphere', liveUrl: 'https://greenesg.jashom.com/' },
    { title: 'EcoBot AI - Sustainability Assistant', industry: 'AI Platform', challenge: 'Organizations struggle with environmental regulations', solution: 'AI-powered sustainability assistant with instant responses', impact: ['40% reduced compliance issues', '60% better decisions', 'Instant responses'], tags: ['AI', 'NLP', 'Sustainability'], image: img('ecobot-ai.jpg'), link: '/projects/ecobot-ai', liveUrl: 'https://ecoai.jashom.com/dashboard' },
    { title: 'Jashom Health - Hospital System', industry: 'Healthcare', challenge: 'Multi-location healthcare with HIPAA compliance needed', solution: 'Comprehensive hospital management with real-time monitoring', impact: ['99.9% uptime', '40% reduced overhead', '100% HIPAA compliance'], tags: ['HIPAA', 'Healthcare', 'Real-time'], image: img('jashom-health.jpg'), link: '/projects/jashom-health', liveUrl: 'https://jashomhealth.jashom.com' },
    { title: 'Jashom Healthcare - Interoperability', industry: 'Healthcare', challenge: 'Healthcare systems in silos needed integration', solution: 'Seamless interoperability with HL7/FHIR protocols', impact: ['99.9% uptime', '35% reduced duplicates', '50+ partners integrated'], tags: ['HL7', 'FHIR', 'Integration'], image: img('jashom-healthcare.jpg'), link: '/projects/jashom-healthcare', liveUrl: 'https://jashomhealthcare.jashom.com' },
    { title: 'Jashom ICU Connect - Remote Monitoring', industry: 'Remote ICU', challenge: 'Rural hospitals lack access to specialist care', solution: 'Remote monitoring platform bridging rural hospitals and specialists', impact: ['40% reduced transfers', '15+ hospitals connected', '<30s response time'], tags: ['Remote Monitoring', 'Vital Signs', 'Collaboration'], image: img('jashom-icu-connect.jpg'), link: '/projects/jashom-icu-connect', liveUrl: 'https://jashomhealthcareplus.jashom.com' },
    { title: 'RAG.LU - AI Knowledge Platform', industry: 'AI Platform', challenge: 'Intelligent knowledge management needed', solution: 'RAG technology for knowledge management', impact: ['93% accuracy', '10x faster processing', 'AI transformation'], tags: ['RAG', 'AI', 'Knowledge Management'], image: img('rag-lu.ai.png'), link: '/projects/rag-lu', liveUrl: 'https://rag.lu' },
  ],
};

export function formatBlogDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
