import { Box, Container, Grid, Flex, Heading, Text, Link, Separator } from "@radix-ui/themes";
import {
  LinkedInLogoIcon, InstagramLogoIcon, VideoIcon, ChatBubbleIcon,
  EnvelopeClosedIcon, MobileIcon, HomeIcon, ArrowUpIcon,
} from "@radix-ui/react-icons";

const columns: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "GPU Optimization Service", href: "/gpu-optimization-service/" },
      { label: "CUDA Development Service", href: "/cuda-development-service/" },
      { label: "Hire CUDA Developer", href: "/hire-cuda-developer/" },
      { label: "Hire Rust Developer", href: "/hire-rust-developer/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Company Brochure", href: "/brochure/" },
      { label: "Contact Us", href: "/contact/" },
      { label: "Careers", href: "/careers/" },
      { label: "Legal", href: "/terms/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blogs/" },
      { label: "Case Studies", href: "/portfolio/" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/jashom/", icon: <LinkedInLogoIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/jashomtechnologies_", icon: <InstagramLogoIcon /> },
  { label: "YouTube", href: "https://youtube.com/@infojashom", icon: <VideoIcon /> },
  { label: "Reddit", href: "https://reddit.com/r/jashom", icon: <ChatBubbleIcon /> },
];

export default function Footer() {
  return (
    <Box asChild>
      <footer className="j-dark-band" style={{ paddingBlock: "3.5rem" }}>
        <Container style={{ maxWidth: 1280 }} px="5">
          <Grid columns={{ initial: "1", sm: "2", md: "5" }} gap="6">
            <Box style={{ gridColumn: "span 2" }}>
              <Heading size="6" mb="3" style={{ color: "#e8e6df", letterSpacing: "-0.02em" }}>Jashom</Heading>
              <Text size="2" style={{ color: "#a3a29c", maxWidth: 320, display: "block" }} mb="4">
                Empowering businesses with modern GPU optimization and CUDA development for high-performance computing.
              </Text>
              <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                  <HomeIcon color="#71706b" />
                  <Link href="https://maps.google.com/?q=AMBA+BUSINESS+PARK+ADALAJ+Gandhinagar+Gujarat" target="_blank" rel="noreferrer" size="1" style={{ color: "#a3a29c" }}>
                    SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar Gujarat
                  </Link>
                </Flex>
                <Flex align="center" gap="2">
                  <MobileIcon color="#71706b" />
                  <Link href="tel:+919023906363" size="2" style={{ color: "#a3a29c" }}>+91 90239 06363</Link>
                </Flex>
                <Flex align="center" gap="2">
                  <EnvelopeClosedIcon color="#71706b" />
                  <Link href="mailto:info@jashom.com" size="2" style={{ color: "#a3a29c" }}>info@jashom.com</Link>
                </Flex>
              </Flex>
            </Box>

            {columns.map((col) => (
              <Box key={col.heading}>
                <Text size="1" mb="3" style={{ color: "#71706b", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>
                  {col.heading}
                </Text>
                <Flex direction="column" gap="2">
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} size="2" style={{ color: "#a3a29c" }}>{l.label}</Link>
                  ))}
                </Flex>
              </Box>
            ))}
          </Grid>

          <Box mt="6" mb="5">
            <Text size="1" mb="3" style={{ color: "#71706b", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>Social</Text>
            <Flex gap="4" wrap="wrap">
              {socials.map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noreferrer" size="2" style={{ color: "#a3a29c" }}>
                  <Flex align="center" gap="2">{s.icon} {s.label}</Flex>
                </Link>
              ))}
            </Flex>
          </Box>

          <Separator size="4" style={{ background: "#2c2c30" }} />

          <Flex justify="between" align="center" wrap="wrap" gap="3" mt="4">
            <Text size="1" style={{ color: "#71706b" }}>
              © 2026 Jashom GPU Optimization. All rights reserved. Engineered for peak performance.
            </Text>
            <Flex gap="4" align="center" wrap="wrap">
              <Link href="/privacy/" size="1" style={{ color: "#a3a29c" }}>Privacy Policy</Link>
              <Link href="/terms/" size="1" style={{ color: "#a3a29c" }}>Terms of Service</Link>
              <Link href="/security/" size="1" style={{ color: "#a3a29c" }}>Security</Link>
              <Link href="#" size="1" style={{ color: "#a3a29c" }}>
                <Flex align="center" gap="1">Back to top <ArrowUpIcon /></Flex>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </footer>
    </Box>
  );
}
