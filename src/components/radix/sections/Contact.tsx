"use client";

import { useState } from "react";
import {
  Section, Container, Grid, Card, Flex, Heading, Text, Box,
  TextField, TextArea, Select, Button, Link,
} from "@radix-ui/themes";
import {
  EnvelopeClosedIcon, HomeIcon, CheckCircledIcon, PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { SectionHeader } from "../SectionHeader";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section size="3" id="contact" style={{ background: "#eceae4" }}>
      <Container style={{ maxWidth: 1280 }} px="5">
        <Grid columns={{ initial: "1", md: "5" }} gap="6" align="start">
          <Box style={{ gridColumn: "span 2" }}>
            <SectionHeader
              icon={<EnvelopeClosedIcon />}
              eyebrow="Contact"
              title="Let's build high-performance AI systems"
              intro="Tell us about your infrastructure and your performance targets. We respond to every inquiry within 24 hours."
            />
            <Flex direction="column" gap="3" mt="2">
              <Flex align="center" gap="2">
                <HomeIcon color="#9b9994" />
                <Text size="2" color="gray">Gandhinagar, Gujarat, India</Text>
              </Flex>
              <Flex align="center" gap="2">
                <EnvelopeClosedIcon color="#9b9994" />
                <Link href="mailto:info@jashom.com" color="gray" highContrast size="2">info@jashom.com</Link>
              </Flex>
            </Flex>
          </Box>

          <Box style={{ gridColumn: "span 3" }}>
            <Card size="4">
              {sent ? (
                <Flex direction="column" align="center" justify="center" gap="3" style={{ minHeight: 320, textAlign: "center" }}>
                  <CheckCircledIcon width={40} height={40} color="#4e7a5c" />
                  <Heading size="5">Message received.</Heading>
                  <Text size="3" color="gray">Thank you — we&apos;ll get back to you within 24 hours.</Text>
                </Flex>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <Flex direction="column" gap="4">
                    <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                      <label>
                        <Text size="2" weight="medium" mb="1" style={{ display: "block" }}>Name</Text>
                        <TextField.Root placeholder="Your name" required />
                      </label>
                      <label>
                        <Text size="2" weight="medium" mb="1" style={{ display: "block" }}>Email</Text>
                        <TextField.Root type="email" placeholder="you@company.com" required />
                      </label>
                      <label>
                        <Text size="2" weight="medium" mb="1" style={{ display: "block" }}>Company</Text>
                        <TextField.Root placeholder="Company name" />
                      </label>
                      <label>
                        <Text size="2" weight="medium" mb="1" style={{ display: "block" }}>Phone</Text>
                        <TextField.Root type="tel" placeholder="+91" />
                      </label>
                    </Grid>
                    <Box>
                      <Text size="2" weight="medium" mb="1" style={{ display: "block" }}>Service interest</Text>
                      <Select.Root defaultValue="placeholder">
                        <Select.Trigger style={{ width: "100%" }} />
                        <Select.Content>
                          <Select.Item value="placeholder" disabled>Select a service</Select.Item>
                          <Select.Item value="gpu">GPU Optimization Service</Select.Item>
                          <Select.Item value="cuda">CUDA Development Service</Select.Item>
                          <Select.Item value="aiml">AI/ML Development</Select.Item>
                          <Select.Item value="consult">AI Consulting</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>
                    <label>
                      <Text size="2" weight="medium" mb="1" style={{ display: "block" }}>Project description</Text>
                      <TextArea rows={5} placeholder="What are you running, and how fast does it need to be?" required />
                    </label>
                    <Button type="submit" size="3" color="gray" highContrast>
                      <PaperPlaneIcon /> Send Message
                    </Button>
                    <Text size="1" color="gray">Your details are used only to respond to this inquiry.</Text>
                  </Flex>
                </form>
              )}
            </Card>
          </Box>
        </Grid>
      </Container>
    </Section>
  );
}
