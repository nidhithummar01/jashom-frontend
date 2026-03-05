import {
  CaseStudyArticleLayout,
  CaseStudySection,
  CaseStudyTable,
} from '../CaseStudyArticleLayout';

export function GPUWorkloadOrchestrationCaseStudy() {
  return (
    <CaseStudyArticleLayout
      seo={{
        title: 'GPU Workload Orchestration Framework on Rocky Linux 9.7 | Case Study | Jashom',
        description:
          'Jashom built a demo-ready GPU workload orchestration system in under five days: REST API, VRAM-aware scheduling, Docker isolation, and full audit trail on Rocky Linux 9.7 with RTX 3090.',
        keywords:
          'GPU orchestration, Rocky Linux, FastAPI, VRAM scheduling, Docker, NVIDIA Container Toolkit',
      }}
      badge="Case Study 2 · Infrastructure Engineering · GPU Operations · Prototype → Production System"
      title="GPU Workload Orchestration Framework on Rocky Linux 9.7"
      hardware="NVIDIA RTX 3090 · Rocky Linux 9.7 · Docker + NVIDIA Container Toolkit"
      executiveSummary="Jashom designed and built a demo-ready GPU workload orchestration system from the ground up in under five working days. The system accepts jobs via a REST API, schedules them against GPU availability and VRAM constraints, executes them inside isolated Docker containers, and returns structured logs with full exit codes and audit trails. Built on Rocky Linux 9.7 with an NVIDIA RTX 3090, the system provides the complete infrastructure foundation for production GPU job management."
      stats={[
        { value: '5', label: 'Days to Demo-Ready' },
        { value: '4', label: 'API Endpoints Delivered' },
        { value: '100%', label: 'GPU Isolation Enforced' },
        { value: 'Full', label: 'Audit Trail per Job' },
      ]}
    >
      <CaseStudySection title="The Challenge">
        <p>
          The client needed a GPU job management system that could be demonstrated
          end-to-end, serve as a prototype foundation for production scaling, and enforce
          hard GPU isolation between concurrent workloads. Existing solutions were either
          too heavy (Kubernetes-based orchestration with significant infrastructure
          overhead) or too lightweight (shell scripts with no scheduling intelligence or
          audit capability).
        </p>
        <p className="mt-4">
          The requirements were specific: VRAM-aware scheduling, per-job GPU isolation
          using NVIDIA_VISIBLE_DEVICES, containerized execution, structured audit logs,
          and a REST API interface - all running on a single Rocky Linux 9.7 server with
          an RTX 3090.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Architecture Delivered">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              Component 1: FastAPI REST API Server
            </h3>
            <p className="mb-2">
              A production-grade FastAPI application providing three core endpoints:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>POST /jobs</strong> - Accepts job submissions with image, command,
                gpu_count, min_vram_mb, env, and volumes parameters. Returns job_id and
                initial status immediately.
              </li>
              <li>
                <strong>GET /jobs/{'{job_id}'}</strong> - Returns full job state: status,
                assigned GPUs, exit code, all timestamps.
              </li>
              <li>
                <strong>GET /jobs/{'{job_id}'}/logs</strong> - Returns captured stdout/stderr
                from the container run.
              </li>
            </ul>
            <p className="mt-2">
              The API server runs as a systemd service (uvicorn), starts on boot, and
              restarts automatically on failure.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              Component 2: VRAM-Aware Scheduler
            </h3>
            <p className="mb-2">A polling scheduler loop (separate systemd service) implementing:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Queries nvidia-smi for real-time VRAM totals and current usage per GPU</li>
              <li>Calculates available VRAM as total − used for each GPU</li>
              <li>Selects GPUs where available VRAM ≥ job&apos;s min_vram_mb requirement</li>
              <li>Reserves selected GPUs before container launch - preventing double-allocation</li>
              <li>If no GPUs meet constraints, sleeps 2–5 seconds and retries - jobs queue gracefully</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              Component 3: Docker Container Runner
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>GPU isolation via --gpus &quot;device=N&quot; flag</li>
              <li>Containers launched with --rm for automatic cleanup</li>
              <li>stdout/stderr captured to logs/{'{job_id}'}.log</li>
              <li>Exit code recorded to SQLite on completion</li>
              <li>Configurable job timeout (default 30–60 minutes)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              Component 4: SQLite Persistence & Audit Layer
            </h3>
            <CaseStudyTable
              headers={['Field', 'Description']}
              rows={[
                ['job_id', 'UUID - globally unique job identifier'],
                ['status', 'queued / running / succeeded / failed'],
                ['image, command', 'Exact Docker image and command submitted'],
                ['gpu_count, min_vram_mb', 'Resource requirements as submitted'],
                ['assigned_gpu_indices', 'Actual GPU indices assigned at runtime'],
                ['exit_code', 'Container process exit code'],
                ['created_at, started_at, finished_at', 'Full timestamp chain for auditability'],
                ['log_path', "Path to job's stdout/stderr log file on disk"],
              ]}
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Delivery Timeline">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Day 1:</strong> Server access validated · NVIDIA drivers + CUDA verified · Docker + NVIDIA Container Toolkit installed · GPU container smoke test passing</li>
          <li><strong>Day 2:</strong> FastAPI service running · SQLite schema created · POST /jobs storing queued jobs · GET endpoints operational</li>
          <li><strong>Day 3:</strong> Docker runner implemented · Log capture working · Exit codes recorded · Container cleanup on completion</li>
          <li><strong>Day 4:</strong> Scheduler loop running · VRAM-aware GPU selection · GPU reservation preventing double-allocation · Full job lifecycle tested</li>
          <li><strong>Day 5:</strong> systemd services configured · README with demo steps · End-to-end demo working reliably · Audit trail verified</li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Technologies Used">
        <p>
          FastAPI · Python 3.x · SQLite + SQLAlchemy · Docker + NVIDIA Container Toolkit ·
          nvidia-smi · uvicorn · systemd · Rocky Linux 9.7 · RTX 3090 · Pydantic · Bash
        </p>
      </CaseStudySection>

      <CaseStudySection title="Outcome & Extensibility – System Value">
        <p>
          The delivered framework provides a fully functional, demo-ready GPU job
          management system that serves as the foundation for production GPU orchestration.
          Its architecture cleanly separates API, scheduling, execution, and storage
          concerns - making it straightforward to extend to multi-GPU servers, multiple
          nodes, or cloud deployments. All GPU isolation guarantees are enforced at the
          container runtime level, providing hardware-level security without additional
          tooling.
        </p>
      </CaseStudySection>
    </CaseStudyArticleLayout>
  );
}
