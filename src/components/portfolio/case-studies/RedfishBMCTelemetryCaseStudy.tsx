import {
  CaseStudyArticleLayout,
  CaseStudySection,
  CaseStudyTable,
} from '../CaseStudyArticleLayout';

export function RedfishBMCTelemetryCaseStudy() {
  return (
    <CaseStudyArticleLayout
      seo={{
        title: 'Real-Time GPU Server Hardware Telemetry via Redfish BMC Integration | Case Study | Jashom',
        description:
          'Jashom extended a device management platform to support real-time hardware telemetry from GPU server BMCs via Redfish API - power, temperature, fan speeds every 30 seconds without touching the OS.',
        keywords:
          'Redfish, BMC, GPU telemetry, Lambda Scalar, Supermicro AST2600, hardware monitoring',
      }}
      badge="Case Study"
      title="Real-Time GPU Server Hardware Telemetry via Redfish BMC Integration"
      hardware="Lambda Scalar GPU Servers · Supermicro AST2600 BMC · Electron / Node.js"
      executiveSummary="Jashom extended a device management platform (Cosmic) to support real-time hardware telemetry from GPU server BMCs (Baseboard Management Controllers) via the Redfish API. The integration enables live dashboard updates every 30 seconds showing GPU server power consumption, CPU and GPU temperatures, and fan speeds - without touching the main OS. The implementation required fixing three critical bugs in the existing HTTP executor and adding structured support for BMC device types."
      stats={[
        { value: '30s', label: 'Dashboard Refresh' },
        { value: '4', label: 'Lambda Scalar Servers' },
        { value: 'Out-of-band', label: 'No OS Dependency' },
        { value: 'HTTPS + Auth', label: 'Redfish Compliant' },
      ]}
    >
      <CaseStudySection title="Context">
        <p>
          The customer lab operates four Lambda Scalar GPU servers, each equipped with a
          Supermicro AST2600 BMC chip. The BMC runs on a dedicated network port,
          independent of the main OS - providing hardware telemetry even when the server
          is powered off. It exposes a modern REST API (Redfish) over HTTPS, returning
          structured JSON for power, temperature, and fan metrics.
        </p>
        <p className="mt-4">
          The target: all four servers&apos; hardware health visible on a live dashboard,
          updating every 30 seconds, sourced directly from the BMC - not from software
          agents on the main OS.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Technical Problem Identified">
        <p className="mb-4">
          The platform&apos;s existing HTTP metric executor had three blocking defects when
          used against a Redfish BMC:
        </p>
        <CaseStudyTable
          headers={['Bug #', 'What Was Happening', 'What Was Required']}
          rows={[
            [
              '1 - Protocol',
              'URL built as http:// - Redfish only runs on HTTPS (port 443)',
              'Build URL as https:// by default for BMC connections',
            ],
            [
              '2 - Auth',
              'No Authorization header - BMC returns HTTP 401 on every request',
              'Base64-encode credentials and send as Authorization: Basic header',
            ],
            [
              '3 - TLS',
              'BMC uses self-signed certificate - Node.js fetch() throws UNABLE_TO_VERIFY_LEAF_SIGNATURE',
              'Bypass SSL verification scoped to BMC requests via undici Agent (not process-wide)',
            ],
          ]}
        />
      </CaseStudySection>

      <CaseStudySection title="Solution Architecture">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              HTTP Executor Rewrite
            </h3>
            <p>
              The executeHTTPCommand function was rewritten to handle HTTPS by default,
              inject Basic Auth credentials from the device&apos;s stored connection profile
              (following the same pattern as the existing SSH executor), and apply
              per-request SSL bypass via undici Agent for BMC devices - preserving SSL
              verification for all other HTTPS requests made by the platform.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              Why undici, not NODE_TLS_REJECT_UNAUTHORIZED
            </h3>
            <p>
              Setting NODE_TLS_REJECT_UNAUTHORIZED = &apos;0&apos; is process-wide - it
              disables SSL verification for every HTTPS request in the Electron process,
              including connections to Anthropic API, update servers, and any other
              services. The undici Agent approach scopes the SSL bypass to a single
              request. This is the correct architecture for a production platform.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              JSON Path Parser Hardening
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Null guard added</strong> - prevents crashes when an intermediate key is undefined (common in varying Redfish firmware versions)</li>
              <li><strong>Bracket notation normalization</strong> - converts PowerControl[0].PowerConsumedWatts to PowerControl.0.PowerConsumedWatts for consistent path traversal</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#22D3EE' }}>
              New MetricName Types & Supermicro BMC Device Configuration
            </h3>
            <p className="mb-2">Two new metric type identifiers added:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>fan-speed (unit: RPM) - for BMC fan RPM readings</li>
              <li>gpu-slot-power (unit: W) - for per-GPU-slot power draw readings</li>
            </ul>
            <p className="mb-2">New device type supermicro-bmc covering four metric streams:</p>
            <ul className="list-disc pl-6">
              <li><strong>Total system power</strong> - /redfish/v1/Chassis/1/Power → PowerControl[0].PowerConsumedWatts (every 30s)</li>
              <li><strong>CPU temperature</strong> - /redfish/v1/Chassis/1/Thermal → Temperatures[n].ReadingCelsius</li>
              <li><strong>Fan speed</strong> - /redfish/v1/Chassis/1/Thermal → Fans[n].Reading in RPM (every 60s)</li>
              <li><strong>GPU slot power</strong> - /redfish/v1/Chassis/1/Power → PowerControl[n].PowerConsumedWatts (where available)</li>
            </ul>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Testing Approach">
        <p className="mb-2">The implementation was validated at four levels before hardware deployment:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Unit tests (vitest):</strong> 30+ tests covering Auth encoding, URL construction, JSON path parsing, mock fetch behavior, and error handling - no hardware required</li>
          <li><strong>Node.js one-liners:</strong> rapid sanity checks on JSON path traversal and Base64 encoding</li>
          <li><strong>curl verification against real BMC:</strong> confirmed Redfish URL structure and verified array indices for Temperatures, Fans, and PowerControl entries on actual AST2600 hardware</li>
          <li><strong>End-to-end Cosmic test:</strong> confirmed live watts values appearing on dashboard with 30-second refresh</li>
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Outcome – Infrastructure Visibility Delivered">
        <p>
          Four Lambda Scalar GPU servers now surface real-time hardware health data - total
          system power in watts, CPU and GPU temperatures, and fan RPM - on a live
          dashboard updating every 30 seconds. The monitoring runs out-of-band through the
          dedicated BMC management port, with no software agents required on the main OS
          and no dependency on the server&apos;s operational state.
        </p>
      </CaseStudySection>
    </CaseStudyArticleLayout>
  );
}
