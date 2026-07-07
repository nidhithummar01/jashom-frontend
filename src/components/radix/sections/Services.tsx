import { Section, Container, Grid, Flex, Heading, Text, Box, Link } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { GaugeVisual, ParallelVisual } from "../ServiceVisuals";

const services = [
  {
    title: "GPU Optimization Service",
    body: "We optimize AI and compute workloads with the help of advanced GPU optimization, performance, efficiency, and hardware usage.",
    points: ["Workload profiling & bottleneck analysis", "Inference acceleration (TensorRT, Triton)", "Memory & bandwidth optimization"],
    href: "/gpu-optimization-service/",
  },
  {
    title: "CUDA Development Service",
    body: "Hire skilled CUDA developers to create and optimize parallel advanced applications that meet your requirements.",
    points: ["Custom kernel development", "Parallel algorithm optimization", "Multi-GPU system architecture"],
    href: "/cuda-development-service/",
  },
];

export default function Services() {
  return (
    <Section size="3" id="services" style={{ background: "var(--bg-secondary)", borderBlock: "1px solid #e4e3de" }}>
      <Container style={{ maxWidth: 1280 }} px="5">
        <Box mb="8" style={{ maxWidth: 620 }}>
          <Heading size="7" mb="3" style={{ letterSpacing: "-0.01em" }}>Which Services We Provide</Heading>
          <Text size="3" color="gray">
            Two core disciplines, one outcome: AI systems that run at the speed the hardware was built for.
          </Text>
        </Box>

        <Flex direction="column" gap="9">
          {services.map((s, i) => {
            const textCol = (
              <Box>
                <Heading as="h3" size="6" mb="3">{s.title}</Heading>
                <Text size="3" color="gray" mb="5" style={{ maxWidth: "55ch", display: "block" }}>{s.body}</Text>
                <Flex direction="column" gap="3" mb="5">
                  {s.points.map((pt) => (
                    <Flex key={pt} align="center" gap="3">
                      <Box style={{ width: 16, height: 1, background: "#111113", flexShrink: 0 }} />
                      <Text size="2">{pt}</Text>
                    </Flex>
                  ))}
                </Flex>
                <Link href={s.href} color="gray" highContrast weight="medium" size="2">
                  <Flex align="center" gap="1">Explore service <ArrowRightIcon /></Flex>
                </Link>
              </Box>
            );
            const visualCol = (
              <Box style={{ background: "var(--bg-primary)", border: "1px solid #e4e3de", padding: "1rem" }}>
                {i === 0 ? <GaugeVisual /> : <ParallelVisual />}
              </Box>
            );
            const reverse = i % 2 === 1;
            return (
              <Grid key={s.title} columns={{ initial: "1", md: "2" }} gap="7" align="center">
                {reverse ? (
                  <>
                    <Box className="j-svc-text">{textCol}</Box>
                    <Box className="j-svc-visual">{visualCol}</Box>
                  </>
                ) : (
                  <>
                    {textCol}
                    {visualCol}
                  </>
                )}
              </Grid>
            );
          })}
        </Flex>
      </Container>
    </Section>
  );
}
