"use client";

import { useEffect, useState } from "react";
import { Box, DropdownMenu, Button, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon, CheckIcon } from "@radix-ui/react-icons";
import { HERO_VARIANTS, type HeroVariantId } from "./HeroVariants";

const KEY = "radix-hero-variant";

export default function HeroVisualSwitcher() {
  const [variant, setVariant] = useState<HeroVariantId>("blueprint");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as HeroVariantId | null;
    if (saved && HERO_VARIANTS.some((v) => v.id === saved)) setVariant(saved);
    setMounted(true);
  }, []);

  const choose = (id: HeroVariantId) => {
    setVariant(id);
    localStorage.setItem(KEY, id);
  };

  const Active = HERO_VARIANTS.find((v) => v.id === variant)!.Component;

  return (
    <>
      <Box key={variant} className="j-hero-fade">
        <Active />
      </Box>

      {/* Floating style selector */}
      <Box position="fixed" style={{ right: 20, bottom: 20, zIndex: 60 }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button size="3" variant="solid" color="gray" highContrast style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }}>
              <MixerHorizontalIcon /> Hero Style
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant="solid" color="gray" side="top" align="end">
            <DropdownMenu.Label>
              <Text size="1">Choose hero illustration</Text>
            </DropdownMenu.Label>
            {HERO_VARIANTS.map((v, i) => (
              <DropdownMenu.Item key={v.id} onSelect={() => choose(v.id)}>
                <span style={{ width: 16, display: "inline-flex" }}>
                  {mounted && variant === v.id ? <CheckIcon /> : null}
                </span>
                Option {i + 1} — {v.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    </>
  );
}
