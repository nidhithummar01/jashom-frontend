import { Section, Container, Grid, Flex, Heading, Text, Badge, Box } from "@radix-ui/themes";
import { MixIcon } from "@radix-ui/react-icons";

const pillars = [
  {
    title: "GPU Optimization",
    badge: "High Performance",
    body: "We provide dedicated GPU Optimization Services aimed at the maximum use of the compute efficiency. Our model will guarantee optimization in the use of hardware, the reduction of operational expenses, and coherent high-performance scale.",
  },
  {
    title: "CUDA Development",
    badge: "High Performance",
    body: "Our CUDA Development Services assist companies in developing high-performance parallel applications to suit their workloads with high demand. Our built-in kernel development-based team of CUDA Developers provides your apps with complete utilization of NVIDIA architecture.",
  },
];

export default function WhatWeDo() {
  return (
    <Section size="3">
      <Container style={{ maxWidth: 1280 }} px="5">
        <Grid columns={{ initial: "1", md: "12" }} gap="7">
          {/* Sticky left title */}
          <Box style={{ gridColumn: "span 4" }}>
            <Box style={{ position: "sticky", top: 96 }}>
              <Flex align="center" gap="2" mb="3">
                <MixIcon color="#9b9994" />
                <span className="j-eyebrow">What We Do</span>
              </Flex>
              <Heading size="7" style={{ letterSpacing: "-0.01em", maxWidth: "16ch" }}>
                What We Do
              </Heading>
              <Text size="3" color="gray" mt="3" style={{ maxWidth: "34ch", display: "block" }}>
                We engineer performance-first systems with measurable impact, from low-level GPU tuning to
                production-ready CUDA acceleration.
              </Text>
            </Box>
          </Box>

          {/* Right pillar list */}
          <Box style={{ gridColumn: "span 8" }}>
            {pillars.map((p, i) => (
              <Box
                key={p.title}
                py="6"
                style={{ borderBottom: i < pillars.length - 1 ? "1px solid #e4e3de" : undefined }}
              >
                <Flex align="center" justify="between" mb="3" gap="3">
                  <Heading as="h3" size="6">{p.title}</Heading>
                  <Badge color="gray" variant="soft" radius="full" style={{ whiteSpace: "nowrap" }}>{p.badge}</Badge>
                </Flex>
                <Text size="3" color="gray">{p.body}</Text>
              </Box>
            ))}
          </Box>
        </Grid>
      </Container>
    </Section>
  );
}
