"use client";

export type QuickAction = { readonly label: string; readonly href: string; readonly external?: boolean };

export default function QuickActions(_: { readonly actions: QuickAction[]; readonly label?: string }) {
  return null;
}
