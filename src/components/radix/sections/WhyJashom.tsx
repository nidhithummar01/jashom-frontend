import { Section, Container, Grid, Flex, Heading, Text, Button, Box } from "@radix-ui/themes";
import {
  LightningBoltIcon, RocketIcon, LockClosedIcon, TimerIcon,
  ChatBubbleIcon, BarChartIcon, ArrowRightIcon,
} from "@radix-ui/react-icons";

const reasons = [
  { icon: <LightningBoltIcon width={20} height={20} />, title: "10x GPU Performance Improvement", body: "Architecture-sensitive tuning methods are used by us to reap the best out of NVIDIA GPUs, providing physical acceleration to AI applications." },
  { icon: <RocketIcon width={20} height={20} />, title: "Production-Grade AI Systems", body: "Develop scalable systems that are designed with a focus on reliability, monitoring, and long-term performance." },
  { icon: <LockClosedIcon width={20} height={20} />, title: "Enterprise-Level Security", body: "Our operations are enforced under stringent security measures, compliance, and data protection models in order to secure essential workloads." },
  { icon: <TimerIcon width={20} height={20} />, title: "Rapid Implementation Cycles", body: "We satisfy the timeline requirements of projects through organized processes, which allow us to roll out faster and maintain the quality of performance." },
  { icon: <ChatBubbleIcon width={20} height={20} />, title: "Dedicated Technical Support", body: "Our experts have continued optimization, surveillance, and expert services that ensure that the system operates continuously." },
  { icon: <BarChartIcon width={20} height={20} />, title: "Cost-Efficient Scaling", body: "Our frameworks for designing GPU systems consider the demand of performance with functional efficiency to ensure the highest ROI in the long-term." },
];

export default function WhyJashom() {
  return (
    <Section size="3">
      <Container style={{ maxWidth: 1280 }} px="5">
        <Box mb="7" style={{ maxWidth: 620 }}>
          <Heading size="7" mb="3" style={{ letterSpacing: "-0.01em" }}>Why Choose Jashom?</Heading>
          <Text size="3" color="gray">
            Experience the Jashom advantage with cutting-edge GPU optimization and CUDA development solutions
          </Text>
        </Box>

        <Box
          className="j-why-grid"
          style={{
            borderTop: "1px solid #e4e3de",
            borderLeft: "1px solid #e4e3de",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
          }}
        >
          {reasons.map((r) => (
            <Box
              key={r.title}
              className="j-why-cell"
              style={{
                borderRight: "1px solid #e4e3de",
                borderBottom: "1px solid #e4e3de",
                padding: "1.75rem",
              }}
            >
              <Box
                className="j-why-icon"
                mb="4"
                style={{
                  width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg-tertiary)", color: "#111113",
                }}
              >
                {r.icon}
              </Box>
              <Heading as="h3" size="4" mb="2">{r.title}</Heading>
              <Text size="2" color="gray">{r.body}</Text>
            </Box>
          ))}
        </Box>

        <Flex justify="center" mt="7">
          <Button asChild size="3" color="gray" highContrast>
            <a href="/contact/">Start Your AI Transformation <ArrowRightIcon /></a>
          </Button>
        </Flex>
      </Container>
    </Section>
  );
}
