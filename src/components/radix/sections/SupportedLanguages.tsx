/* eslint-disable @next/next/no-img-element */
import { Section, Container, Box, Flex, Heading, Text } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const langs = [
  { name: "CUDA", desc: "Native CUDA C/C++", icon: "/mini-icon/cuda.svg" },
  { name: "Triton", desc: "OpenAI Triton", icon: "/mini-icon/chatgpt.svg" },
  { name: "Mojo", desc: "Mojo GPU kernels", icon: "/mini-icon/mojo.svg" },
  { name: "PyTorch", desc: "PyTorch Framework", icon: "/mini-icon/pytorch.svg" },
  { name: "CUTE", desc: "CUTLASS Templates", icon: "/mini-icon/cute.svg" },
  { name: "CUDA Tile", desc: "Tile-based CUDA kernels", icon: "/mini-icon/cuda-tile .svg" },
  { name: "Numba", desc: "Numba GPU kernels", icon: "/mini-icon/numba.png" },
  { name: "TileLang", desc: "Tile Language DSL", icon: "/mini-icon/tile-lang.svg" },
  { name: "REQUEST", desc: "Request a new language", request: true },
];

export default function SupportedLanguages() {
  return (
    <Section size="3" style={{ background: "var(--bg-primary)", borderBlock: "1px solid #e4e3de" }}>
      <Container style={{ maxWidth: 1280 }} px="5">
        <Box style={{ textAlign: "center", maxWidth: 680, marginInline: "auto" }} mb="7">
          <span className="j-eyebrow">Supported Languages</span>
          <Heading size="7" mt="3" mb="3" style={{ letterSpacing: "-0.01em" }}>Write GPU code in your preferred DSL</Heading>
          <Text size="3" color="gray">
            Jashom supports multiple GPU programming languages and domain-specific languages, including
            Numba, Mojo, and CUDA Tile.
          </Text>
        </Box>

        <Box
          className="j-lang-grid"
          style={{
            borderTop: "1px solid #e4e3de",
            borderLeft: "1px solid #e4e3de",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {langs.map((l) => (
            <Box
              key={l.name}
              style={{
                background: "var(--bg-secondary)",
                borderRight: "1px solid #e4e3de",
                borderBottom: "1px solid #e4e3de",
                padding: "1.5rem",
              }}
            >
              <Flex align="center" gap="2" mb="2" style={{ height: 32 }}>
                {l.request ? (
                  <PlusCircledIcon width={26} height={26} color="#9b9994" />
                ) : (
                  <img src={l.icon} alt={l.name} style={{ height: 28, width: 28, objectFit: "contain" }} />
                )}
              </Flex>
              <Heading as="h3" size="3" style={{ textTransform: "uppercase", letterSpacing: "0.02em" }}>{l.name}</Heading>
              <Text size="1" color="gray">{l.desc}</Text>
            </Box>
          ))}
        </Box>
      </Container>
    </Section>
  );
}
