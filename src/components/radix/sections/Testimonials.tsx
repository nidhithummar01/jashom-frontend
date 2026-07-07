import { Section, Container, Grid, Card, Flex, Text, Box } from "@radix-ui/themes";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { SectionHeader } from "../SectionHeader";

const items = [
  {
    quote: "Jashom's GPU optimization reduced our inference latency by 73%. The team's expertise in CUDA programming is unmatched.",
    name: "Alexander D.",
    org: "Founder, 20+ years of experience.",
  },
  {
    quote: "The AI automation solutions delivered by Jashom transformed our workflow. We achieved 5x faster processing with their custom ML pipeline.",
    name: "Ricky T.",
    org: "CTO, 15+ years of experience.",
  },
  {
    quote: "Outstanding DevSecOps implementation. Jashom's team integrated security seamlessly into our CI/CD pipeline without compromising speed.",
    name: "Jimmy B.",
    org: "VP Engineering, 10+ years of experience.",
  },
];

export default function Testimonials() {
  return (
    <Section size="3">
      <Container style={{ maxWidth: 1280 }} px="5">
        <SectionHeader
          icon={<ChatBubbleIcon />}
          eyebrow="Testimonials"
          title="What Our Clients Say"
          intro="The industry leaders are banking on our CUDA and GPU engineering skills to get the compute workloads on high throughput, enhance AI responsiveness, and implement stable high-performance units with results that can be measured."
        />
        <Grid columns={{ initial: "1", sm: "3" }} gap="4" className="j-testi-grid" align="start">
          {items.map((t) => (
            <Card key={t.name} size="3">
              <Flex direction="column" gap="4" justify="between" style={{ height: "100%" }}>
                <Flex direction="column" gap="3">
                  <ChatBubbleIcon width={20} height={20} color="#9b9994" />
                  <Text size="3" style={{ fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</Text>
                </Flex>
                <Box>
                  <Text size="2" weight="bold" style={{ display: "block" }}>{t.name}</Text>
                  <Text size="1" color="gray">{t.org}</Text>
                </Box>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
