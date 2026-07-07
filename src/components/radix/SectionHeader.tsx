import { Flex, Heading, Text, Box } from "@radix-ui/themes";
import type { ReactNode } from "react";

export function SectionHeader({
  icon,
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  icon?: ReactNode;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const center = align === "center";
  return (
    <Flex
      direction="column"
      gap="3"
      align={center ? "center" : "start"}
      mb="6"
      style={{ textAlign: center ? "center" : "left", maxWidth: center ? 680 : undefined, marginInline: center ? "auto" : undefined }}
    >
      {(icon || eyebrow) && (
        <Flex align="center" gap="2">
          {icon && (
            <Box style={{ color: invert ? "#71706b" : "#9b9994", display: "inline-flex" }}>{icon}</Box>
          )}
          {eyebrow && <span className="j-eyebrow">{eyebrow}</span>}
        </Flex>
      )}
      <Heading size="7" style={{ letterSpacing: "-0.01em", color: invert ? "#e8e6df" : undefined }}>
        {title}
      </Heading>
      {intro && (
        <Text size="3" color="gray" style={{ maxWidth: 680, color: invert ? "#a3a29c" : undefined }}>
          {intro}
        </Text>
      )}
    </Flex>
  );
}
