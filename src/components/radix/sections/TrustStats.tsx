import { Section, Container, Grid, Flex, Heading, Text, Box } from "@radix-ui/themes";
import { BarChartIcon } from "@radix-ui/react-icons";
import Counter from "@/components/motion/Counter";

const stats = [
  { value: 25, suffix: "+", label: "Clients served" },
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "X", label: "Peak performance gain" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

export default function TrustStats() {
  return (
    <Section size="3" className="j-dark-band">
      <Container style={{ maxWidth: 1280 }} px="5">
        <Flex align="center" justify="center" gap="2" mb="6">
          <BarChartIcon color="#71706b" />
          <span className="j-eyebrow">Track Record</span>
        </Flex>
        <Grid columns={{ initial: "2", sm: "4" }} gap="6">
          {stats.map((s) => (
            <Box key={s.label} style={{ textAlign: "center" }}>
              <Heading size="9" style={{ letterSpacing: "-0.02em", color: "#e8e6df" }}>
                <Counter value={s.value} suffix={s.suffix} />
              </Heading>
              <Text size="2" mt="2" style={{ display: "block", color: "#a3a29c" }}>{s.label}</Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
