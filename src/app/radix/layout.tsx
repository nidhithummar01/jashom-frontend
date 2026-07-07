import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./radix-theme.css";

export const metadata: Metadata = {
  title: "Jashom Technologies — Radix Edition",
  description:
    "Radix UI rebuild of the Jashom homepage, themed to the brand cream / ink palette.",
};

export default function RadixLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Theme
      appearance="light"
      accentColor="gray"
      grayColor="sand"
      radius="none"
      scaling="100%"
      panelBackground="solid"
      className="jashom-radix"
    >
      {children}
    </Theme>
  );
}
