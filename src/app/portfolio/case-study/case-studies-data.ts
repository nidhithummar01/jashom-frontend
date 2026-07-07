export type Block =
  | { t: "p"; text: string }
  | { t: "bullets"; items: string[] }
  | { t: "sub"; heading: string; blocks: Block[] }
  | { t: "table"; headers: string[]; rows: string[][] };

export type Section = { heading: string; eyebrow?: string; blocks: Block[] };

export type CaseStudy = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  hardware: string;
  summary: string;
  stats: { value: string; label: string }[];
  sections: Section[];
  technologies: string[];
  outcome: { heading: string; paras: string[] };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "llm-inference-optimization",
    metaTitle: "LLM Inference Optimization on Constrained GPU Infrastructure | Case Study | Jashom",
    metaDescription: "See how Jashom optimized LLM inference to achieve faster response times, reduced costs, and improved AI performance at scale.",
    title: "LLM Inference Optimization on Constrained GPU Infrastructure",
    hardware: "Hardware: Multi-node GPU cluster (12 distributed nodes)",
    summary: "A client required deployment of a 13B parameter language model on constrained GPU infrastructure with strict power efficiency limits. Jashom re-engineered the full inference path - from CUDA kernel-level optimizations through dynamic quantization and adaptive batching - to deliver 42% higher throughput and 37% lower GPU power consumption, with no measurable degradation in model accuracy. The resulting system was deployed across 12 distributed nodes running real-time RAG queries, at one-third of the original projected cost.",
    stats: [
      { value: "42%", label: "Throughput Improvement" },
      { value: "37%", label: "Power Reduction" },
      { value: "3×", label: "Lower Operating Cost" },
      { value: "12", label: "Distributed Nodes Deployed" },
    ],
    sections: [
      {
        heading: "The Challenge",
        blocks: [
          { t: "p", text: "The client was operating a 13B parameter language model as the backbone of a customer-facing conversational AI product. The infrastructure was mid-range GPU hardware - capable in theory, but heavily under-utilized due to inefficiencies in the inference stack. Two constraints made the project technically demanding:" },
          { t: "bullets", items: [
            "Power budget: the deployment environment had strict per-rack power limits that the existing inference stack regularly exceeded under load",
            "Cost pressure: the client needed to scale from prototype to multi-node production at a cost that the existing per-query GPU spend made impossible",
          ] },
          { t: "p", text: "Standard optimization approaches - reducing batch size, switching frameworks - had already been attempted. The client needed kernel-level engineering to go further." },
        ],
      },
      {
        heading: "Technical Approach",
        blocks: [
          { t: "sub", heading: "Phase 1: Profiling and Bottleneck Identification", blocks: [
            { t: "p", text: "Jashom conducted a full profiling pass using NVIDIA Nsight to map the inference execution graph. Key findings included excessive memory bandwidth consumption from unoptimized attention operations, high kernel launch overhead from non-fused operators, and underutilized tensor cores due to misaligned precision modes." },
          ] },
          { t: "sub", heading: "Phase 2: Custom CUDA Kernel Development", blocks: [
            { t: "p", text: "We implemented custom CUDA kernels targeting the identified bottlenecks:" },
            { t: "bullets", items: [
              "Fused multi-head attention kernels reducing memory round-trips in the attention computation",
              "Operator fusion eliminating redundant kernel launches across transformer layers",
              "Optimized memory access patterns aligned to L2 cache boundaries for the client's specific GPU architecture",
            ] },
          ] },
          { t: "sub", heading: "Phase 3: Dynamic Quantization - INT8 / FP16", blocks: [
            { t: "p", text: "We implemented dynamic quantization across the model's linear layers using INT8 precision for weight storage with FP16 activations. This reduced the effective VRAM footprint of the model by approximately 40% while preserving the numerical range needed for accurate token prediction. Calibration was performed against a representative sample of the client's actual query distribution, not a generic benchmark." },
          ] },
          { t: "sub", heading: "Phase 4: TensorRT Inference Re-Engineering", blocks: [
            { t: "p", text: "The inference path was re-implemented using TensorRT with layer fusion enabled across the full transformer stack. TensorRT's profiling-guided optimization selected the most efficient kernel implementations for each layer given the client's hardware and precision requirements." },
          ] },
          { t: "sub", heading: "Phase 5: Adaptive Batching Scheduler", blocks: [
            { t: "p", text: "We designed an adaptive batching scheduler that dynamically adjusts batch size based on current GPU utilization and queue depth. Under light load, the scheduler runs smaller batches for lower latency. Under heavy load, it consolidates requests into larger batches to maximize throughput. This produced measurably higher GPU utilization across the variable load patterns of a production service." },
          ] },
          { t: "sub", heading: "Phase 6: Distributed Deployment", blocks: [
            { t: "p", text: "The optimized inference stack was containerized and deployed across 12 distributed nodes with load balancing. Each node runs an independent inference replica behind a shared request router. The RAG (Retrieval-Augmented Generation) pipeline was integrated at the routing layer, allowing context retrieval to happen in parallel with inference scheduling." },
          ] },
        ],
      },
      {
        heading: "Results",
        blocks: [
          { t: "table", headers: ["Metric", "Before Optimization", "After Jashom"], rows: [
            ["Inference Throughput", "Baseline (100%)", "+42% (142%)"],
            ["GPU Power Consumption", "Baseline (100%)", "−37% (63%)"],
            ["VRAM Utilization per Model", "~22GB (full FP16)", "~13GB (INT8/FP16 mixed)"],
            ["Cost per 1M Tokens", "Reference", "~3× reduction"],
            ["Model Accuracy (BLEU vs. reference)", "Reference", "No measurable degradation"],
            ["Deployment Nodes", "Prototype: 1 node", "Production: 12 nodes"],
            ["RAG Query Latency (p50)", "Baseline", "Within latency SLA maintained"],
          ] },
        ],
      },
    ],
    technologies: ["CUDA Custom Kernels", "TensorRT with Layer Fusion", "INT8/FP16 Dynamic Quantization", "PyTorch", "LangChain (RAG layer)", "NVIDIA Nsight Profiler", "Docker (containerized deployment)", "Adaptive batching scheduler (custom)"],
    outcome: {
      heading: "Client Outcome – Business Impact",
      paras: ["Optimized model performance allowed the client to scale LLM inference at one-third of the original cost, enabling deployment of a full production conversational AI system on mid-range GPU clusters. The power efficiency gains resolved the per-rack budget constraint entirely, clearing the path for further capacity expansion."],
    },
  },
  {
    slug: "gpu-workload-orchestration",
    metaTitle: "GPU Workload Orchestration Framework on Rocky Linux 9.7 | Case Study | Jashom",
    metaDescription: "Learn how Jashom streamlined GPU workload orchestration to maximize efficiency, reduce costs, and enhance performance.",
    title: "GPU Workload Orchestration Framework on Rocky Linux 9.7",
    hardware: "Hardware: NVIDIA RTX 3090 · Rocky Linux 9.7 · Docker + NVIDIA Container Toolkit",
    summary: "Jashom designed and built a demo-ready GPU workload orchestration system from the ground up in under five working days. The system accepts jobs via a REST API, schedules them against GPU availability and VRAM constraints, executes them inside isolated Docker containers, and returns structured logs with full exit codes and audit trails. Built on Rocky Linux 9.7 with an NVIDIA RTX 3090, the system provides the complete infrastructure foundation for production GPU job management.",
    stats: [
      { value: "5", label: "Days to Demo-Ready" },
      { value: "4", label: "API Endpoints Delivered" },
      { value: "100%", label: "GPU Isolation Enforced" },
      { value: "Full", label: "Audit Trail per Job" },
    ],
    sections: [
      {
        heading: "The Challenge",
        blocks: [
          { t: "p", text: "The client needed a GPU job management system that could be demonstrated end-to-end, serve as a prototype foundation for production scaling, and enforce hard GPU isolation between concurrent workloads. Existing solutions were either too heavy (Kubernetes-based orchestration with significant infrastructure overhead) or too lightweight (shell scripts with no scheduling intelligence or audit capability)." },
          { t: "p", text: "The requirements were specific: VRAM-aware scheduling, per-job GPU isolation using NVIDIA_VISIBLE_DEVICES, containerized execution, structured audit logs, and a REST API interface - all running on a single Rocky Linux 9.7 server with an RTX 3090." },
        ],
      },
      {
        heading: "Architecture Delivered",
        blocks: [
          { t: "sub", heading: "Component 1: FastAPI REST API Server", blocks: [
            { t: "p", text: "A production-grade FastAPI application providing three core endpoints:" },
            { t: "bullets", items: [
              "POST /jobs - Accepts job submissions with image, command, gpu_count, min_vram_mb, env, and volumes parameters. Returns job_id and initial status immediately.",
              "GET /jobs/{job_id} - Returns full job state: status, assigned GPUs, exit code, all timestamps.",
              "GET /jobs/{job_id}/logs - Returns captured stdout/stderr from the container run.",
            ] },
            { t: "p", text: "The API server runs as a systemd service (uvicorn), starts on boot, and restarts automatically on failure." },
          ] },
          { t: "sub", heading: "Component 2: VRAM-Aware Scheduler", blocks: [
            { t: "p", text: "A polling scheduler loop (separate systemd service) implementing:" },
            { t: "bullets", items: [
              "Queries nvidia-smi for real-time VRAM totals and current usage per GPU",
              "Calculates available VRAM as total − used for each GPU",
              "Selects GPUs where available VRAM ≥ job's min_vram_mb requirement",
              "Reserves selected GPUs before container launch - preventing double-allocation",
              "If no GPUs meet constraints, sleeps 2–5 seconds and retries - jobs queue gracefully",
            ] },
          ] },
          { t: "sub", heading: "Component 3: Docker Container Runner", blocks: [
            { t: "bullets", items: [
              "GPU isolation via --gpus \"device=N\" flag",
              "Containers launched with --rm for automatic cleanup",
              "stdout/stderr captured to logs/{job_id}.log",
              "Exit code recorded to SQLite on completion",
              "Configurable job timeout (default 30–60 minutes)",
            ] },
          ] },
          { t: "sub", heading: "Component 4: SQLite Persistence & Audit Layer", blocks: [
            { t: "table", headers: ["Field", "Description"], rows: [
              ["job_id", "UUID - globally unique job identifier"],
              ["status", "queued / running / succeeded / failed"],
              ["image, command", "Exact Docker image and command submitted"],
              ["gpu_count, min_vram_mb", "Resource requirements as submitted"],
              ["assigned_gpu_indices", "Actual GPU indices assigned at runtime"],
              ["exit_code", "Container process exit code"],
              ["created_at, started_at, finished_at", "Full timestamp chain for auditability"],
              ["log_path", "Path to job's stdout/stderr log file on disk"],
            ] },
          ] },
        ],
      },
      {
        heading: "Delivery Timeline",
        blocks: [
          { t: "bullets", items: [
            "Day 1: Server access validated · NVIDIA drivers + CUDA verified · Docker + NVIDIA Container Toolkit installed · GPU container smoke test passing",
            "Day 2: FastAPI service running · SQLite schema created · POST /jobs storing queued jobs · GET endpoints operational",
            "Day 3: Docker runner implemented · Log capture working · Exit codes recorded · Container cleanup on completion",
            "Day 4: Scheduler loop running · VRAM-aware GPU selection · GPU reservation preventing double-allocation · Full job lifecycle tested",
            "Day 5: systemd services configured · README with demo steps · End-to-end demo working reliably · Audit trail verified",
          ] },
        ],
      },
    ],
    technologies: ["FastAPI", "Python 3.x", "SQLite + SQLAlchemy", "Docker + NVIDIA Container Toolkit", "nvidia-smi", "uvicorn", "systemd", "Rocky Linux 9.7", "RTX 3090", "Pydantic", "Bash"],
    outcome: {
      heading: "Outcome & Extensibility – System Value",
      paras: ["The delivered framework provides a fully functional, demo-ready GPU job management system that serves as the foundation for production GPU orchestration. Its architecture cleanly separates API, scheduling, execution, and storage concerns - making it straightforward to extend to multi-GPU servers, multiple nodes, or cloud deployments. All GPU isolation guarantees are enforced at the container runtime level, providing hardware-level security without additional tooling."],
    },
  },
  {
    slug: "cloud-gpu-fine-tuning",
    metaTitle: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment | Case Study | Jashom",
    metaDescription: "Discover how Jashom optimized cloud GPU fine tuning for AI models, improving performance, scalability, and cost efficiency.",
    title: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment",
    hardware: "Hardware: Cloud GPU Fleet: RTX 4090 / A100 / H100 (provider-agnostic)",
    summary: "Jashom developed and implemented a comprehensive cloud GPU fine-tuning strategy for a client needing to deploy custom language models at scale. The engagement covered hardware selection, fine-tuning method selection, framework configuration, training execution, and production deployment packaging - across model sizes from 7B to 70B+ parameters. The strategy reduced per-run costs by selecting parameter-efficient methods precisely matched to each use case and hardware tier.",
    stats: [
      { value: "7B–70B+", label: "Model Range" },
      { value: "Tiered", label: "Strategy (3 Tiers)" },
      { value: "Provider-agnostic", label: "Cloud GPU" },
      { value: "Days", label: "Dataset to Deploy" },
    ],
    sections: [
      {
        heading: "The Challenge",
        blocks: [
          { t: "p", text: "The client had AI use cases requiring custom model behavior - domain-specific knowledge, specialized response formats, particular reasoning patterns - that base models couldn't deliver. They needed a path from \"we have a dataset\" to \"we have a production model\" without building internal GPU infrastructure expertise or overspending on compute." },
          { t: "p", text: "The key tension: the client's use cases ranged from rapid prototyping of small models to production fine-tuning of 70B parameter models. A single approach wouldn't work. A framework that matched method, hardware, and cost to each use case was required." },
        ],
      },
      {
        heading: "Strategic Framework Delivered",
        blocks: [
          { t: "sub", heading: "Tier 1: Rapid Prototyping (7B–13B Models)", blocks: [
            { t: "table", headers: ["Aspect", "Detail"], rows: [
              ["GPU", "Single RTX 4090 (24GB VRAM)"],
              ["Method", "QLoRA - 4-bit quantization enabling 7B models comfortably, 13B models workably"],
              ["Framework", "Unsloth - 2–5× faster than standard fine-tuning, significantly reduced VRAM usage"],
              ["Cost", "$2–8 per run (10k samples, 2–4 hours training)"],
              ["Outcome", "Working fine-tuned model prototypes in under one business day"],
            ] },
          ] },
          { t: "sub", heading: "Tier 2: Production Fine-Tuning (13B–40B Models)", blocks: [
            { t: "table", headers: ["Aspect", "Detail"], rows: [
              ["GPU", "2–4× A100 80GB or RTX 6000 Ada (96–192GB total VRAM)"],
              ["Method", "LoRA / QLoRA matched to model size and VRAM availability"],
              ["Framework", "Axolotl + DeepSpeed - production workloads, native FSDP support"],
              ["Cost", "$15–80 per run"],
              ["Outcome", "Production-quality fine-tuned models with full training metric history"],
            ] },
          ] },
          { t: "sub", heading: "Tier 3: Large-Scale Training (70B Models)", blocks: [
            { t: "table", headers: ["Aspect", "Detail"], rows: [
              ["GPU", "4–8× A100 80GB or H100 80GB clusters"],
              ["Method", "QLoRA or LoRA - full fine-tuning is not cost-effective at this scale"],
              ["Framework", "Axolotl + DeepSpeed ZeRO-3 with CPU/NVMe offloading"],
              ["Cost", "$50–200 per run"],
              ["Outcome", "70B+ parameter models fine-tuned for production deployment at manageable cost"],
            ] },
          ] },
        ],
      },
      {
        heading: "Data Preparation Work",
        blocks: [
          { t: "p", text: "Jashom applied structured data preparation protocols to the client's training datasets before any GPU compute was spent:" },
          { t: "bullets", items: [
            "Consistency audit: enforced formatting standards across the full dataset",
            "Domain-expert validation pass: flagged low-quality or ambiguous examples for removal",
            "Deduplication: eliminated near-duplicate samples that inflate dataset size without adding learning signal",
            "Coverage analysis: identified gaps in use-case coverage and recommended targeted data collection",
          ] },
          { t: "p", text: "The principle applied throughout: model performance is determined more by data quality than volume. A 2,000-example high-quality dataset outperforms a 20,000-example noisy one." },
        ],
      },
      {
        heading: "Cloud Provider Strategy",
        blocks: [
          { t: "p", text: "Jashom's provider-agnostic approach matches cloud GPU availability to training needs at any given time. The client's workloads were executed across multiple providers depending on GPU availability, pricing, and reserved vs. spot instance tradeoffs:" },
          { t: "bullets", items: [
            "AWS (A100/H100 instances) - production runs with SLA requirements",
            "Lambda Labs and CoreWeave - cost-optimized long-form training runs",
            "RunPod - rapid prototyping and experimentation at low hourly cost",
          ] },
          { t: "p", text: "All runs configured with frequent checkpointing to S3/GCS and immediate instance termination after training - minimizing idle compute cost." },
        ],
      },
    ],
    technologies: ["QLoRA", "LoRA", "Unsloth", "Axolotl", "DeepSpeed (ZeRO-3)", "RTX 4090", "A100 80GB", "H100 80GB", "AWS", "Lambda Labs", "CoreWeave", "RunPod"],
    outcome: {
      heading: "Outcome – Strategic Value",
      paras: ["The tiered framework delivered predictable training costs, faster iteration from dataset to deployed model, and production-ready artifacts that could be packaged for inference immediately after training. The client's AI development cycle shortened from weeks (infrastructure setup + trial-and-error) to days (structured runs with pre-validated configurations)."],
    },
  },
  {
    slug: "redfish-bmc-telemetry",
    metaTitle: "Real-Time GPU Server Hardware Telemetry via Redfish BMC Integration | Case Study | Jashom",
    metaDescription: "Explore how Jashom implemented Redfish BMC telemetry to enhance system monitoring, reliability, and infrastructure visibility.",
    title: "Real-Time GPU Server Hardware Telemetry via Redfish BMC Integration",
    hardware: "Hardware: Lambda Scalar GPU Servers · Supermicro AST2600 BMC · Electron / Node.js",
    summary: "Jashom extended a device management platform (Cosmic) to support real-time hardware telemetry from GPU server BMCs (Baseboard Management Controllers) via the Redfish API. The integration enables live dashboard updates every 30 seconds showing GPU server power consumption, CPU and GPU temperatures, and fan speeds - without touching the main OS. The implementation required fixing three critical bugs in the existing HTTP executor and adding structured support for BMC device types.",
    stats: [
      { value: "30s", label: "Dashboard Refresh" },
      { value: "4", label: "Lambda Scalar Servers" },
      { value: "Out-of-band", label: "No OS Dependency" },
      { value: "HTTPS + Auth", label: "Redfish Compliant" },
    ],
    sections: [
      {
        heading: "Context",
        blocks: [
          { t: "p", text: "The customer lab operates four Lambda Scalar GPU servers, each equipped with a Supermicro AST2600 BMC chip. The BMC runs on a dedicated network port, independent of the main OS - providing hardware telemetry even when the server is powered off. It exposes a modern REST API (Redfish) over HTTPS, returning structured JSON for power, temperature, and fan metrics." },
          { t: "p", text: "The target: all four servers' hardware health visible on a live dashboard, updating every 30 seconds, sourced directly from the BMC - not from software agents on the main OS." },
        ],
      },
      {
        heading: "Technical Problem Identified",
        blocks: [
          { t: "p", text: "The platform's existing HTTP metric executor had three blocking defects when used against a Redfish BMC:" },
          { t: "table", headers: ["Bug #", "What Was Happening", "What Was Required"], rows: [
            ["1 - Protocol", "URL built as http:// - Redfish only runs on HTTPS (port 443)", "Build URL as https:// by default for BMC connections"],
            ["2 - Auth", "No Authorization header - BMC returns HTTP 401 on every request", "Base64-encode credentials and send as Authorization: Basic header"],
            ["3 - TLS", "BMC uses self-signed certificate - Node.js fetch() throws UNABLE_TO_VERIFY_LEAF_SIGNATURE", "Bypass SSL verification scoped to BMC requests via undici Agent (not process-wide)"],
          ] },
        ],
      },
      {
        heading: "Solution Architecture",
        blocks: [
          { t: "sub", heading: "HTTP Executor Rewrite", blocks: [
            { t: "p", text: "The executeHTTPCommand function was rewritten to handle HTTPS by default, inject Basic Auth credentials from the device's stored connection profile (following the same pattern as the existing SSH executor), and apply per-request SSL bypass via undici Agent for BMC devices - preserving SSL verification for all other HTTPS requests made by the platform." },
          ] },
          { t: "sub", heading: "Why undici, not NODE_TLS_REJECT_UNAUTHORIZED", blocks: [
            { t: "p", text: "Setting NODE_TLS_REJECT_UNAUTHORIZED = '0' is process-wide - it disables SSL verification for every HTTPS request in the Electron process, including connections to Anthropic API, update servers, and any other services. The undici Agent approach scopes the SSL bypass to a single request. This is the correct architecture for a production platform." },
          ] },
          { t: "sub", heading: "JSON Path Parser Hardening", blocks: [
            { t: "bullets", items: [
              "Null guard added - prevents crashes when an intermediate key is undefined (common in varying Redfish firmware versions)",
              "Bracket notation normalization - converts PowerControl[0].PowerConsumedWatts to PowerControl.0.PowerConsumedWatts for consistent path traversal",
            ] },
          ] },
          { t: "sub", heading: "New MetricName Types & Supermicro BMC Device Configuration", blocks: [
            { t: "p", text: "Two new metric type identifiers added:" },
            { t: "bullets", items: [
              "fan-speed (unit: RPM) - for BMC fan RPM readings",
              "gpu-slot-power (unit: W) - for per-GPU-slot power draw readings",
            ] },
            { t: "p", text: "New device type supermicro-bmc covering four metric streams:" },
            { t: "bullets", items: [
              "Total system power - /redfish/v1/Chassis/1/Power → PowerControl[0].PowerConsumedWatts (every 30s)",
              "CPU temperature - /redfish/v1/Chassis/1/Thermal → Temperatures[n].ReadingCelsius",
              "Fan speed - /redfish/v1/Chassis/1/Thermal → Fans[n].Reading in RPM (every 60s)",
              "GPU slot power - /redfish/v1/Chassis/1/Power → PowerControl[n].PowerConsumedWatts (where available)",
            ] },
          ] },
        ],
      },
      {
        heading: "Testing Approach",
        blocks: [
          { t: "p", text: "The implementation was validated at four levels before hardware deployment:" },
          { t: "bullets", items: [
            "Unit tests (vitest): 30+ tests covering Auth encoding, URL construction, JSON path parsing, mock fetch behavior, and error handling - no hardware required",
            "Node.js one-liners: rapid sanity checks on JSON path traversal and Base64 encoding",
            "curl verification against real BMC: confirmed Redfish URL structure and verified array indices for Temperatures, Fans, and PowerControl entries on actual AST2600 hardware",
            "End-to-end Cosmic test: confirmed live watts values appearing on dashboard with 30-second refresh",
          ] },
        ],
      },
    ],
    technologies: ["Redfish API", "Supermicro AST2600 BMC", "Lambda Scalar servers", "undici (Node.js)", "TypeScript / Electron", "vitest", "Basic Auth", "JSON Path Parser"],
    outcome: {
      heading: "Outcome – Infrastructure Visibility Delivered",
      paras: ["Four Lambda Scalar GPU servers now surface real-time hardware health data - total system power in watts, CPU and GPU temperatures, and fan RPM - on a live dashboard updating every 30 seconds. The monitoring runs out-of-band through the dedicated BMC management port, with no software agents required on the main OS and no dependency on the server's operational state."],
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
