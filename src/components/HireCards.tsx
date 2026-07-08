import { Stagger } from "@/components/motion/Reveal";

interface CardItem {
  title: string;
  body: string;
}

interface Props {
  readonly items: CardItem[];
  readonly cols?: string;
}

export default function HireCards({ items, cols = "sm:grid-cols-2 lg:grid-cols-3" }: Props) {
  return (
    <Stagger className={`grid ${cols} border-t border-line`} itemClassName="h-full" step={0.05}>
      {items.map((c) => (
        <div key={c.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
          <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{c.title}</h3>
          <p className="text-[0.875rem] text-ink-2">{c.body}</p>
        </div>
      ))}
    </Stagger>
  );
}
