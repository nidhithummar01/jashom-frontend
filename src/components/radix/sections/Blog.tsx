/* eslint-disable @next/next/no-img-element */
import { Section, Container, Grid, Card, Flex, Heading, Text, Badge, Box, Link } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const posts = [
  {
    title: "LLM Inference Optimization on Constrained GPU Infrastructure",
    category: "Enterprise AI · LLM Deployment",
    tags: ["CUDA", "TensorRT", "LLM"],
    img: "/blog-img/gpu.optimization.png",
  },
  {
    title: "GPU Workload Orchestration Framework on Rocky Linux 9.7",
    category: "Infrastructure · GPU Operations",
    tags: ["FastAPI", "Docker", "Rocky Linux"],
    img: "/blog-img/cuda.service.hero.png",
  },
  {
    title: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment",
    category: "AI Engineering · Cloud Infrastructure",
    tags: ["LoRA", "DeepSpeed", "Cloud GPU"],
    img: "/blog-img/blog.png",
  },
];

export default function Blog() {
  return (
    <Section size="3" style={{ borderTop: "1px solid #e4e3de" }}>
      <Container style={{ maxWidth: 1280 }} px="5">
        <Flex align="center" justify="between" mb="7" wrap="wrap" gap="3">
          <span className="j-eyebrow" style={{ fontSize: "1.25rem", letterSpacing: "0.06em", color: "#111113", fontWeight: 600 }}>
            Latest Insights
          </span>
          <Link href="/blogs/" color="gray" highContrast weight="medium">
            <Flex align="center" gap="1">View All Posts <ArrowRightIcon /></Flex>
          </Link>
        </Flex>
        <Grid columns={{ initial: "1", sm: "3" }} gap="4">
          {posts.map((p) => (
            <Card key={p.title} size="3" className="j-blog-card" asChild>
              <a href="/blogs/">
                <Box style={{ aspectRatio: "16 / 10", overflow: "hidden", marginBottom: 16, background: "#eceae4" }}>
                  <img src={p.img} alt="" className="j-blog-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.95)" }} />
                </Box>
                <Flex direction="column" gap="2">
                  <Text size="1" color="gray" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.category}</Text>
                  <Heading as="h3" size="4">{p.title}</Heading>
                  <Flex gap="2" wrap="wrap" my="2">
                    {p.tags.map((t) => (
                      <Badge key={t} color="gray" variant="soft" radius="medium" style={{ whiteSpace: "nowrap" }}>
                        {t}
                      </Badge>
                    ))}
                  </Flex>
                  <Flex align="center" justify="between" mt="2" style={{ borderTop: "1px solid #e4e3de", paddingTop: 12 }}>
                    <Text size="1" color="gray" style={{ textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
                      View More
                    </Text>
                    <ArrowRightIcon style={{ color: "var(--gray-11)" }} />
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
