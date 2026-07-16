"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export type QuickAction = { readonly label: string; readonly href: string; readonly external?: boolean };

/* Context-aware floating action button. Mirrors the Customizer trigger's visual
   language (w-12 h-12, bg-ink, square, shadow) but anchored bottom-left so the
   two floating controls never overlap. Each page passes its own actions.
   Hidden below the sm breakpoint (as is the Customizer trigger) so the fixed
   buttons never obscure page content on narrow viewports; every action here
   is also reachable through the main nav. */
export default function QuickActions({ actions, label = "Quick actions" }: { readonly actions: QuickAction[]; readonly label?: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  void actions; void label; void open; void reduced;
  return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden sm:flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-2 mb-1"
          >
            {actions.map((a, i) => {
              const cls = "block whitespace-nowrap bg-paper border border-line text-ink text-[0.875rem] font-medium px-4 py-2.5 shadow-lg hover:bg-tint hover:-translate-y-0.5 transition-all duration-200";
              return (
                <motion.li
                  key={a.label}
                  initial={{ opacity: 0, x: reduced ? 0 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                >
                  {a.external ? (
                    <a href={a.href} className={cls} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={() => setOpen(false)}>
                      {a.label}
                    </a>
                  ) : (
                    <Link href={a.href} className={cls} onClick={() => setOpen(false)}>
                      {a.label}
                    </Link>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={label}
        className="flex items-center justify-center w-12 h-12 bg-ink text-paper border border-line rounded-none shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          className="transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }} aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
