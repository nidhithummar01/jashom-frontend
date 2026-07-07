import { Section, Container, Flex, Heading, Text, Button, Badge } from "@radix-ui/themes";
import { RocketIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function FinalCTA() {
  return (
    <Section size="4" className="j-dark-band" style={{ position: "relative", overflow: "clip" }}>
      <svg
        viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 160, opacity: 0.08, pointerEvents: "none" }}
      >
        <path d="M0 120 C 240 60, 480 60, 720 120 S 1200 180, 1440 120" stroke="#e8e6df" strokeWidth="1.5" fill="none" />
        <path d="M0 150 C 240 90, 480 90, 720 150 S 1200 210, 1440 150" stroke="#e8e6df" strokeWidth="1.5" fill="none" />
      </svg>
      <Container style={{ maxWidth: 1280, position: "relative" }} px="5">
        <Flex direction="column" align="center" gap="5" style={{ textAlign: "center", maxWidth: 760, marginInline: "auto" }}>
          <Badge size="2" color="gray" variant="surface" highContrast>
            <RocketIcon /> Get Started
          </Badge>
          <Heading size="8" style={{ color: "#e8e6df", letterSpacing: "-0.02em" }}>
            Ready to Accelerate Your AI Journey?
          </Heading>
          <Text size="4" style={{ color: "#a3a29c" }}>
            Join hundreds of forward-thinking companies leveraging Jashom&apos;s AI expertise to drive
            innovation and achieve unprecedented business outcomes.
          </Text>
          <Flex gap="3" wrap="wrap" justify="center" mt="2">
            <Button asChild size="4" variant="surface" color="gray" highContrast>
              <a href="https://cal.id/jashom-technologies/30min" target="_blank" rel="noreferrer">
                Request a Demo <ArrowRightIcon />
              </a>
            </Button>
            <Button asChild size="4" variant="outline" color="gray">
              <a href="/portfolio/">View Case Studies</a>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
