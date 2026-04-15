import * as Theme from '../../../constants/theme';
import {
  CaseStudyArticleLayout,
  CaseStudySection,
  CaseStudyTable,
} from '../CaseStudyArticleLayout';

export function CloudGPUFineTuningCaseStudy() {
  return (
    <CaseStudyArticleLayout
      seo={{
        title: 'Cloud GPU Fine-Tuning Strategy for Production LLM Deployment | Case Study | Jashom',
        description:
          'Jashom developed a tiered cloud GPU fine-tuning strategy (7B to 70B+ models) with LoRA/QLoRA, reducing per-run costs and shortening the path from dataset to production model.',
        keywords:
          'LLM fine-tuning, LoRA, QLoRA, cloud GPU, Axolotl, DeepSpeed, 7B 70B models',
      }}
      badge="Case Study"
      title="Cloud GPU Fine-Tuning Strategy for Production LLM Deployment"
      hardware="Cloud GPU Fleet: RTX 4090 / A100 / H100 (provider-agnostic)"
      executiveSummary="Jashom developed and implemented a comprehensive cloud GPU fine-tuning strategy for a client needing to deploy custom language models at scale. The engagement covered hardware selection, fine-tuning method selection, framework configuration, training execution, and production deployment packaging - across model sizes from 7B to 70B+ parameters. The strategy reduced per-run costs by selecting parameter-efficient methods precisely matched to each use case and hardware tier."
      stats={[
        { value: '7B–70B+', label: 'Model Range' },
        { value: 'Tiered', label: 'Strategy (3 Tiers)' },
        { value: 'Provider-agnostic', label: 'Cloud GPU' },
        { value: 'Days', label: 'Dataset to Deploy' },
      ]}
    >
      <CaseStudySection title="The Challenge">
        <p>
          The client had AI use cases requiring custom model behavior - domain-specific
          knowledge, specialized response formats, particular reasoning patterns - that base
          models couldn&apos;t deliver. They needed a path from &quot;we have a dataset&quot; to
          &quot;we have a production model&quot; without building internal GPU infrastructure
          expertise or overspending on compute.
        </p>
        <p className="mt-4">
          The key tension: the client&apos;s use cases ranged from rapid prototyping of small
          models to production fine-tuning of 70B parameter models. A single approach
          wouldn&apos;t work. A framework that matched method, hardware, and cost to each use
          case was required.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Strategic Framework Delivered">
        <div className="space-y-8">
          <div
            className="p-6 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: Theme.ACCENT_COLOR }}>
              Tier 1: Rapid Prototyping (7B–13B Models)
            </h3>
            <CaseStudyTable
              headers={['Aspect', 'Detail']}
              rows={[
                ['GPU', 'Single RTX 4090 (24GB VRAM)'],
                ['Method', 'QLoRA - 4-bit quantization enabling 7B models comfortably, 13B models workably'],
                ['Framework', 'Unsloth - 2–5× faster than standard fine-tuning, significantly reduced VRAM usage'],
                ['Cost', '$2–8 per run (10k samples, 2–4 hours training)'],
                ['Outcome', 'Working fine-tuned model prototypes in under one business day'],
              ]}
            />
          </div>
          <div
            className="p-6 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: Theme.ACCENT_COLOR }}>
              Tier 2: Production Fine-Tuning (13B–40B Models)
            </h3>
            <CaseStudyTable
              headers={['Aspect', 'Detail']}
              rows={[
                ['GPU', '2–4× A100 80GB or RTX 6000 Ada (96–192GB total VRAM)'],
                ['Method', 'LoRA / QLoRA matched to model size and VRAM availability'],
                ['Framework', 'Axolotl + DeepSpeed - production workloads, native FSDP support'],
                ['Cost', '$15–80 per run'],
                ['Outcome', 'Production-quality fine-tuned models with full training metric history'],
              ]}
            />
          </div>
          <div
            className="p-6 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: Theme.ACCENT_COLOR }}>
              Tier 3: Large-Scale Training (70B Models)
            </h3>
            <CaseStudyTable
              headers={['Aspect', 'Detail']}
              rows={[
                ['GPU', '4–8× A100 80GB or H100 80GB clusters'],
                ['Method', 'QLoRA or LoRA - full fine-tuning is not cost-effective at this scale'],
                ['Framework', 'Axolotl + DeepSpeed ZeRO-3 with CPU/NVMe offloading'],
                ['Cost', '$50–200 per run'],
                ['Outcome', '70B+ parameter models fine-tuned for production deployment at manageable cost'],
              ]}
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Data Preparation Work">
        <p className="mb-4">
          Jashom applied structured data preparation protocols to the client&apos;s training
          datasets before any GPU compute was spent:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Consistency audit:</strong> enforced formatting standards across the full dataset</li>
          <li><strong>Domain-expert validation pass:</strong> flagged low-quality or ambiguous examples for removal</li>
          <li><strong>Deduplication:</strong> eliminated near-duplicate samples that inflate dataset size without adding learning signal</li>
          <li><strong>Coverage analysis:</strong> identified gaps in use-case coverage and recommended targeted data collection</li>
        </ul>
        <p className="mt-4">
          The principle applied throughout: model performance is determined more by data
          quality than volume. A 2,000-example high-quality dataset outperforms a
          20,000-example noisy one.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Cloud Provider Strategy">
        <p className="mb-4">
          Jashom&apos;s provider-agnostic approach matches cloud GPU availability to training
          needs at any given time. The client&apos;s workloads were executed across multiple
          providers depending on GPU availability, pricing, and reserved vs. spot instance
          tradeoffs:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>AWS (A100/H100 instances)</strong> - production runs with SLA requirements</li>
          <li><strong>Lambda Labs and CoreWeave</strong> - cost-optimized long-form training runs</li>
          <li><strong>RunPod</strong> - rapid prototyping and experimentation at low hourly cost</li>
        </ul>
        <p className="mt-4">
          All runs configured with frequent checkpointing to S3/GCS and immediate instance
          termination after training - minimizing idle compute cost.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Outcome – Strategic Value">
        <p>
          The tiered framework delivered predictable training costs, faster iteration from
          dataset to deployed model, and production-ready artifacts that could be packaged
          for inference immediately after training. The client&apos;s AI development cycle
          shortened from weeks (infrastructure setup + trial-and-error) to days (structured
          runs with pre-validated configurations).
        </p>
      </CaseStudySection>
    </CaseStudyArticleLayout>
  );
}
