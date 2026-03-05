import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BarChart3,
  Box,
  Brain,
  ClipboardList,
  Cloud,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Gauge,
  Heart,
  GitBranch,
  Rocket,
  Server,
  Zap,
} from 'lucide-react';

export const CAPABILITY_MATRIX_BG = 'rgba(34, 211, 238, 0.05)';
export const CARD_BORDER = 'rgba(255, 255, 255, 0.1)';
export const ICON_BOX_BG = 'rgba(34, 211, 238, 0.1)';

export const SUMMARY_CARD_STYLE = {
  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.03) 100%)',
  borderColor: 'rgba(34, 211, 238, 0.2)',
  backdropFilter: 'blur(8px)',
} as const;

export const SUMMARY_ICON_BOX = {
  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%)',
  border: '1px solid rgba(34, 211, 238, 0.3)',
} as const;

export const techStackData: { title: string; items: string[]; Icon: LucideIcon }[] = [
  {
    title: 'GPU & Inference',
    Icon: Cpu,
    items: ['CUDA', 'ROCm', 'TensorRT', 'Triton Inference Server', 'ONNX', 'nvidia-smi', 'NVIDIA Nsight', 'INT8/FP16 Quantization', 'Layer Fusion'],
  },
  {
    title: 'AI / ML Frameworks',
    Icon: Brain,
    items: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'LangChain', 'DeepSpeed (ZeRO-3)', 'Unsloth', 'Axolotl', 'TorchTune', 'vLLM'],
  },
  {
    title: 'Infrastructure',
    Icon: Server,
    items: ['Docker', 'NVIDIA Container Toolkit', 'FastAPI', 'uvicorn', 'SQLite', 'SQLAlchemy', 'systemd', 'Rocky Linux 9.7', 'Ubuntu 22.04', 'Python 3.x'],
  },
  {
    title: 'Monitoring & Telemetry',
    Icon: Activity,
    items: ['Redfish API', 'Supermicro AST2600 BMC', 'Lambda Scalar servers', 'undici (Node.js)', 'TypeScript / Electron'],
  },
  {
    title: 'Cloud Providers',
    Icon: Cloud,
    items: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Lambda Labs', 'CoreWeave', 'RunPod', 'Vast.ai', 'TensorDock'],
  },
];

export const engagementModelData: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: 'Fixed-Scope Prototype',
    Icon: Rocket,
    description: 'Well-defined problem, delivered in 3–5 days. Priced by scope. Examples: GPU orchestration prototype, Redfish telemetry integration, fine-tuning run with evaluation.',
  },
  {
    title: 'Production Engineering',
    Icon: Code2,
    description: 'Ongoing GPU engineering, model optimization, or AI system development. Embedded technical partnership with measurable milestones.',
  },
  {
    title: 'Applied Research',
    Icon: FlaskConical,
    description: 'Low-power inference architectures, GPU sharing fabric design, model compression and distillation. Research engineering alongside production deliverables.',
  },
  {
    title: 'GPU Audit',
    Icon: ClipboardList,
    description: 'Profiling and optimization assessment of your existing GPU infrastructure. Delivered as a prioritized recommendations report with measurable impact projections.',
  },
];

export const portfolioSummaryData: { capability: string; evidence: string; Icon: LucideIcon }[] = [
  { capability: 'Custom CUDA kernel engineering for LLMs', evidence: 'Case Study 1: kernel-level optimization of 13B parameter model', Icon: Cpu },
  { capability: 'INT8/FP16 quantization without accuracy loss', evidence: 'Case Study 1: zero measured accuracy degradation post-quantization', Icon: Gauge },
  { capability: '42% throughput improvement on production inference', evidence: 'Case Study 1: measured result on 13B model, 12-node deployment', Icon: BarChart3 },
  { capability: '37% GPU power reduction', evidence: 'Case Study 1: measured against pre-optimization baseline', Icon: Zap },
  { capability: 'REST API GPU job scheduling with VRAM awareness', evidence: 'Case Study 2: full FastAPI + SQLite orchestration system', Icon: Server },
  { capability: 'Containerized GPU execution with hard isolation', evidence: 'Case Study 2: NVIDIA_VISIBLE_DEVICES enforced per job', Icon: Box },
  { capability: 'LoRA / QLoRA strategy across 7B–70B models', evidence: 'Case Study 3: tiered fine-tuning framework', Icon: Brain },
  { capability: 'Multi-provider cloud GPU management', evidence: 'Case Study 3: AWS, Lambda Labs, CoreWeave, RunPod', Icon: Cloud },
  { capability: 'Out-of-band BMC hardware telemetry', evidence: 'Case Study 4: Redfish / AST2600 integration', Icon: Activity },
  { capability: 'Production platform engineering (TypeScript / Node.js)', evidence: 'Case Study 4: Electron app metric collector extension', Icon: Code2 },
];

export const capabilityMatrixData: {
  capability: string;
  technicalDepth: string;
  businessImpact: string;
  Icon: LucideIcon;
}[] = [
  {
    capability: 'GPU Kernel Engineering',
    technicalDepth: 'CUDA / ROCm kernel development, layer fusion, operator optimization',
    businessImpact: 'Faster inference, lower hardware cost per query',
    Icon: Cpu,
  },
  {
    capability: 'LLM Power Optimization',
    technicalDepth: 'INT8/FP16 quantization, TensorRT inference re-engineering',
    businessImpact: '37%+ power reduction with no accuracy loss',
    Icon: Zap,
  },
  {
    capability: 'AI Model Fine-Tuning',
    technicalDepth: 'LoRA, QLoRA across 7B–70B+ models; cloud infra strategy',
    businessImpact: 'Production models in hours, not weeks',
    Icon: Brain,
  },
  {
    capability: 'Workload Orchestration',
    technicalDepth: 'REST API scheduling, VRAM-aware assignment, container isolation',
    businessImpact: 'GPU jobs tracked, isolated, and audited end-to-end',
    Icon: GitBranch,
  },
  {
    capability: 'Hardware Telemetry',
    technicalDepth: 'Redfish / BMC integration, per-GPU power & thermal monitoring',
    businessImpact: 'Real-time infrastructure visibility without OS dependency',
    Icon: Activity,
  },
  {
    capability: 'RAG Infrastructure',
    technicalDepth: 'Retrieval-Augmented Generation with distributed data layers',
    businessImpact: 'Real-time contextual AI at scale',
    Icon: Database,
  },
  {
    capability: 'Healthcare AI',
    technicalDepth: 'Dispatch optimization, triage analytics, hospital system integration',
    businessImpact: 'Saves critical minutes in emergency response',
    Icon: Heart,
  },
];

/** Single export for layout (service-page pattern). */
export const portfolioPageData = {
  CAPABILITY_MATRIX_BG,
  CARD_BORDER,
  ICON_BOX_BG,
  SUMMARY_CARD_STYLE,
  SUMMARY_ICON_BOX,
  capabilityMatrixData,
  engagementModelData,
  portfolioSummaryData,
  techStackData,
};
