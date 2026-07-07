import { Section, Container, Grid, Flex, Heading, Text, Button, Badge, Box } from "@radix-ui/themes";
import { RocketIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import HeroVisualSwitcher from "@/components/radix/HeroVisualSwitcher";

export default function Hero() {
  return (
    <Section size="4" className="j-dark-band" style={{ position: "relative", overflow: "clip" }}>
      <Container style={{ maxWidth: 1280 }} px="5">
        <Grid columns={{ initial: "1", md: "11" }} gap="7" align="center">
          {/* Left — copy */}
          <Box style={{ gridColumn: "span 6" }}>
            <Flex direction="column" align="start" gap="5">
              <Badge size="2" color="gray" variant="surface" highContrast>
                <RocketIcon /> Next-Gen AI Solutions
              </Badge>
              <Heading size="9" style={{ color: "#e8e6df", letterSpacing: "-0.02em", lineHeight: 1.08 }}>
                Powering High-Performance AI with Precision GPU Engineering
              </Heading>
              <Text size="4" style={{ color: "#a3a29c", maxWidth: 560 }}>
                We assist companies in unleashing the power of the current hardware, whether it is through
                high-level optimization of graphics cards or scalable parallel computing. Our developers have
                expertise in NVIDIA GPU optimization, CUDA acceleration, and production-ready AI systems that
                are used to deliver quantifiable improvements.
              </Text>
              <Flex gap="3" wrap="wrap" mt="2">
                <Button asChild size="4" variant="surface" color="gray" highContrast>
                  <a href="/contact/">Start Your AI Transformation <ArrowRightIcon /></a>
                </Button>
                <Button asChild size="4" variant="outline" color="gray">
                  <a href="https://cal.id/jashom-technologies/30min" target="_blank" rel="noreferrer">
                    Schedule a Meeting
                  </a>
                </Button>
              </Flex>
            </Flex>
          </Box>

          {/* Right — animated schematic (hidden on small) */}
          <Box style={{ gridColumn: "span 5" }} display={{ initial: "none", md: "block" }}>
            <HeroVisualSwitcher />
          </Box>
        </Grid>
      </Container>
    </Section>
  );
}
