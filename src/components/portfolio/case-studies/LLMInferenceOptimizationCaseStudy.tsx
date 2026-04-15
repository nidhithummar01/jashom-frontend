import * as Theme from '../../../constants/theme';
import {
  CaseStudyArticleLayout,
  CaseStudySection,
  CaseStudyTable,
} from '../CaseStudyArticleLayout';

export function LLMInferenceOptimizationCaseStudy() {
  return (
    <CaseStudyArticleLayout
      seo={{
        title: 'LLM Inference Optimization on Constrained GPU Infrastructure | Case Study | Jashom',
        description:
          'Jashom re-engineered the full inference path for a 13B parameter LLM, delivering 42% higher throughput and 37% lower GPU power consumption across 12 distributed nodes.',
        keywords:
          'LLM inference optimization, CUDA kernel, TensorRT, INT8 quantization, RAG, GPU cluster',
      }}
      badge="Case Study"
      title="LLM Inference Optimization on Constrained GPU Infrastructure"
      hardware="Multi-node GPU cluster (12 distributed nodes)"
      executiveSummary="A client required deployment of a 13B parameter language model on constrained GPU infrastructure with strict power efficiency limits. Jashom re-engineered the full inference path - from CUDA kernel-level optimizations through dynamic quantization and adaptive batching - to deliver 42% higher throughput and 37% lower GPU power consumption, with no measurable degradation in model accuracy. The resulting system was deployed across 12 distributed nodes running real-time RAG queries, at one-third of the original projected cost."
      stats={[
        { value: '42%', label: 'Throughput Improvement' },
        { value: '37%', label: 'Power Reduction' },
        { value: '3×', label: 'Lower Operating Cost' },
        { value: '12', label: 'Distributed Nodes Deployed' },
      ]}
    >
      <CaseStudySection title="The Challenge">
        <p className="mb-4">
          The client was operating a 13B parameter language model as the backbone of a
          customer-facing conversational AI product. The infrastructure was mid-range GPU
          hardware - capable in theory, but heavily under-utilized due to inefficiencies in
          the inference stack. Two constraints made the project technically demanding:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Power budget:</strong> the deployment environment had strict per-rack
            power limits that the existing inference stack regularly exceeded under load
          </li>
          <li>
            <strong>Cost pressure:</strong> the client needed to scale from prototype to
            multi-node production at a cost that the existing per-query GPU spend made
            impossible
          </li>
        </ul>
        <p>
          Standard optimization approaches - reducing batch size, switching frameworks - had
          already been attempted. The client needed kernel-level engineering to go further.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Technical Approach">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 space-y-3 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: Theme.ACCENT_COLOR }}>
              Phase 1: Profiling and Bottleneck Identification
            </h3>
            <p>
              Jashom conducted a full profiling pass using NVIDIA Nsight to map the
              inference execution graph. Key findings included excessive memory bandwidth
              consumption from unoptimized attention operations, high kernel launch overhead
              from non-fused operators, and underutilized tensor cores due to misaligned
              precision modes.
            </p>
          </div>
          <div className="p-6 space-y-3 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: Theme.ACCENT_COLOR }}>
              Phase 2: Custom CUDA Kernel Development
            </h3>
            <p className="mb-2">We implemented custom CUDA kernels targeting the identified bottlenecks:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fused multi-head attention kernels reducing memory round-trips in the attention computation</li>
              <li>Operator fusion eliminating redundant kernel launches across transformer layers</li>
              <li>Optimized memory access patterns aligned to L2 cache boundaries for the client&apos;s specific GPU architecture</li>
            </ul>
          </div>
          <div className="p-6 space-y-3 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: Theme.ACCENT_COLOR }}>
              Phase 3: Dynamic Quantization - INT8 / FP16
            </h3>
            <p>
              We implemented dynamic quantization across the model&apos;s linear layers using INT8
              precision for weight storage with FP16 activations. This reduced the effective
              VRAM footprint of the model by approximately 40% while preserving the
              numerical range needed for accurate token prediction. Calibration was
              performed against a representative sample of the client&apos;s actual query
              distribution, not a generic benchmark.
            </p>
          </div>
          <div className="p-6 space-y-3 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: Theme.ACCENT_COLOR }}>
              Phase 4: TensorRT Inference Re-Engineering
            </h3>
            <p>
              The inference path was re-implemented using TensorRT with layer fusion enabled
              across the full transformer stack. TensorRT&apos;s profiling-guided optimization
              selected the most efficient kernel implementations for each layer given the
              client&apos;s hardware and precision requirements.
            </p>
          </div>
          <div className="p-6 space-y-3 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: Theme.ACCENT_COLOR }}>
              Phase 5: Adaptive Batching Scheduler
            </h3>
            <p>
              We designed an adaptive batching scheduler that dynamically adjusts batch size
              based on current GPU utilization and queue depth. Under light load, the
              scheduler runs smaller batches for lower latency. Under heavy load, it
              consolidates requests into larger batches to maximize throughput. This
              produced measurably higher GPU utilization across the variable load patterns
              of a production service.
            </p>
          </div>
          <div className="p-6 space-y-3 transition-shadow duration-300 hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]"
            style={Theme.GLASS_ARTICLE_CARD}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: Theme.ACCENT_COLOR }}>
              Phase 6: Distributed Deployment
            </h3>
            <p className="mb-0">
              The optimized inference stack was containerized and deployed across 12
              distributed nodes with load balancing. Each node runs an independent
              inference replica behind a shared request router. The RAG (Retrieval-Augmented
              Generation) pipeline was integrated at the routing layer, allowing context
              retrieval to happen in parallel with inference scheduling.
            </p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Results">
        <CaseStudyTable
          headers={['Metric', 'Before Optimization', 'After Jashom']}
          rows={[
            ['Inference Throughput', 'Baseline (100%)', '+42% (142%)'],
            ['GPU Power Consumption', 'Baseline (100%)', '−37% (63%)'],
            ['VRAM Utilization per Model', '~22GB (full FP16)', '~13GB (INT8/FP16 mixed)'],
            ['Cost per 1M Tokens', 'Reference', '~3× reduction'],
            ['Model Accuracy (BLEU vs. reference)', 'Reference', 'No measurable degradation'],
            ['Deployment Nodes', 'Prototype: 1 node', 'Production: 12 nodes'],
            ['RAG Query Latency (p50)', 'Baseline', 'Within latency SLA maintained'],
          ]}
        />
      </CaseStudySection>

      <CaseStudySection title="Technologies Used">
        <p>
          CUDA Custom Kernels · TensorRT with Layer Fusion · INT8/FP16 Dynamic Quantization ·
          PyTorch · LangChain (RAG layer) · NVIDIA Nsight Profiler · Docker (containerized
          deployment) · Adaptive batching scheduler (custom)
        </p>
      </CaseStudySection>

      <CaseStudySection title="Client Outcome – Business Impact">
        <p>
          Optimized model performance allowed the client to scale LLM inference at
          one-third of the original cost, enabling deployment of a full production
          conversational AI system on mid-range GPU clusters. The power efficiency gains
          resolved the per-rack budget constraint entirely, clearing the path for further
          capacity expansion.
        </p>
      </CaseStudySection>
    </CaseStudyArticleLayout>
  );
}
