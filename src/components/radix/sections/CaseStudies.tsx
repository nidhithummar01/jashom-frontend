import { Section, Container, Grid, Card, Flex, Heading, Text, Badge, Link, Box } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import CardGlyph, { type GlyphVariant } from "@/components/CardGlyph";

const studies: { title: string; category: string; tags: string[]; glyph: GlyphVariant }[] = [
  { title: "LLM Inference Optimization on Constrained GPU Infrastructure", category: "Enterprise AI · LLM Deployment", tags: ["CUDA", "TensorRT", "LLM"], glyph: "pulse" },
  { title: "GPU Workload Orchestration Framework on Rocky Linux 9.7", category: "Infrastructure · GPU Operations", tags: ["FastAPI", "Docker", "Rocky Linux"], glyph: "nodes" },
  { title: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment", category: "AI Engineering · Cloud Infrastructure", tags: ["LoRA", "DeepSpeed", "Cloud GPU"], glyph: "tune" },
  { title: "Real-Time GPU Server Hardware Telemetry via Redfish BMC", category: "Infrastructure Monitoring · GPU Data Centers", tags: ["Redfish", "BMC", "Telemetry"], glyph: "wave" },
];

export default function CaseStudies() {
  return (
    <Section size="3">
      <Container style={{ maxWidth: 1280 }} px="5">
        <Grid columns={{ initial: "1", md: "12" }} gap="5" align="end" mb="7">
          <Box style={{ gridColumn: "span 8" }}>
            <Heading size="7" mb="3" style={{ letterSpacing: "-0.01em" }}>Case Studies</Heading>
            <Text size="3" color="gray" style={{ maxWidth: "55ch", display: "block" }}>
              See real-world applications in which advanced optimization of the GPU and tailored CUDA
              engineering improved performance standards and business speed.
            </Text>
          </Box>
          <Box style={{ gridColumn: "span 4", textAlign: "right" }}>
            <Link href="/portfolio/" color="gray" highContrast weight="medium">
              <Flex align="center" gap="1" justify="end">View all case studies <ArrowRightIcon /></Flex>
            </Link>
          </Box>
        </Grid>

        <Grid columns={{ initial: "1", sm: "2" }} gap="4">
          {studies.map((s) => (
            <Card key={s.title} size="4" className="card-neon" asChild>
              <a href="/portfolio/">
                <CardGlyph variant={s.glyph} />
                <Flex direction="column" gap="3" justify="between" style={{ minHeight: 190, position: "relative" }}>
                  <Box>
                    <Text className="neon-meta" size="1" color="gray" mb="2" style={{ display: "block", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {s.category}
                    </Text>
                    <Heading as="h3" size="5">{s.title}</Heading>
                  </Box>
                  <Flex gap="2" wrap="wrap">
                    {s.tags.map((t) => (
                      <Badge key={t} className="neon-chip" color="gray" variant="soft" radius="full">{t}</Badge>
                    ))}
                  </Flex>
                </Flex>
              </a>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
