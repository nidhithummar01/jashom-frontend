"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly y?: number;
  readonly className?: string;
};

/* Scroll-into-view fade-rise. Content is fully visible without JS;
   motion only enhances. */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: reduced ? "none" : `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  readonly children: React.ReactNode[];
  readonly className?: string;
  readonly itemClassName?: string;
  readonly step?: number;
};

/* Staggered list entrance — 60ms cascade between items. */
export function Stagger({ children, className, itemClassName, step = 0.06 }: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      {React.Children.toArray(children).map((child, i) => (
        <motion.div
          key={(child as React.ReactElement).key ?? undefined}
          className={itemClassName}
          initial={{ opacity: 0, transform: reduced ? "none" : "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * step, ease: [0.23, 1, 0.32, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
