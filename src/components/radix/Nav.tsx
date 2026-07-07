"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  DropdownMenu,
  IconButton,
  Separator,
} from "@radix-ui/themes";
import {
  ChevronDownIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import MeetingDrawer from "@/components/MeetingDrawer";

const services = [
  { label: "GPU Emulator", desc: "Develop CUDA without GPU hardware", href: "#services" },
  { label: "GPU Profiler", desc: "Real-time performance analysis", href: "#services" },
  { label: "AI Assistant", desc: "Custom agents, skills, and GPU-aware optimization", href: "#services" },
  { label: "Code Analysis", desc: "Static & assembly insights", href: "#services" },
  { label: "Multi-GPU", desc: "Scale across multiple GPUs", href: "#services" },
];
const hire = [
  { label: "Hire CUDA Developer", href: "/hire-cuda-developer/" },
  { label: "Hire Rust Developer", href: "/hire-rust-developer/" },
];
const company = [
  { label: "About Us", href: "/about-us/" },
  { label: "Team", href: "/about-us/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Blog", href: "/blogs/" },
  { label: "Career", href: "/careers/" },
];

function Menu({ trigger, items }: { trigger: string; items: { label: string; href: string; desc?: string }[] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" color="gray" highContrast size="2">
          {trigger}
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="solid" color="gray">
        {items.map((it) => (
          <DropdownMenu.Item key={it.label} asChild>
            <a href={it.href}>
              <Flex direction="column" gap="0">
                <Text size="2" weight="medium">{it.label}</Text>
                {it.desc && (
                  <Text size="1" color="gray">{it.desc}</Text>
                )}
              </Flex>
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box
      position="sticky"
      top="0"
      style={{
        zIndex: 50,
        background: "rgba(247,247,244,0.85)",
        backdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid #e4e3de",
      }}
    >
      <Flex
        align="center"
        justify="between"
        px="5"
        style={{ height: 64, maxWidth: 1280, marginInline: "auto" }}
      >
        <Text asChild size="5" weight="bold" style={{ letterSpacing: "-0.02em" }}>
          <a href="/radix">Jashom</a>
        </Text>

        <Flex align="center" gap="2" display={{ initial: "none", md: "flex" }}>
          <Menu trigger="Services" items={services} />
          <Menu trigger="Hire Expert" items={hire} />
          <Menu trigger="Company" items={company} />
          <Button asChild variant="ghost" color="gray" highContrast size="2">
            <a href="#contact">Contact</a>
          </Button>
          <Button size="2" color="gray" highContrast ml="2" onClick={() => setIsDrawerOpen(true)}>
            Schedule a Meeting
          </Button>
        </Flex>

        <Box display={{ initial: "block", md: "none" }}>
          <IconButton variant="ghost" color="gray" highContrast onClick={() => setOpen((v) => !v)}>
            {open ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </IconButton>
        </Box>
      </Flex>

      {open && (
        <Box px="5" pb="4" display={{ initial: "block", md: "none" }} style={{ background: "#f7f7f4" }}>
          <Flex direction="column" gap="3" pt="2">
            {[...services, ...hire, ...company, { label: "Contact", href: "#contact" }].map((it) => (
              <Text asChild key={it.label + it.href} size="3">
                <a href={it.href} onClick={() => setOpen(false)}>{it.label}</a>
              </Text>
            ))}
            <Separator size="4" />
            <Button size="3" color="gray" highContrast onClick={() => { setOpen(false); setIsDrawerOpen(true); }}>
              Schedule a Meeting
            </Button>
          </Flex>
        </Box>
      )}
      <MeetingDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  );
}
