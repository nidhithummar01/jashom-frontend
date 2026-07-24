const AUTHORS: Record<string, {
  name: string;
  role: string;
  bio: string[];
  linkedin: string;
  initials: string;
}> = {
  "Jay Dave": {
    name: "Jay Dave",
    role: "Founder & CEO, Jashom Technologies",
    bio: [
      "Jay Dave is the Founder and CEO of Jashom Technologies, a specialized GPU engineering company.",
      "Jashom helps AI startups, research organizations, and enterprises accelerate compute-intensive workloads through advanced CUDA development and GPU optimization — building scalable, production-ready infrastructure for AI models, simulations, and large-scale data processing.",
      "Jay writes about GPU computing, AI infrastructure, and the engineering challenges of scaling high-performance systems.",
    ],
    linkedin: "https://www.linkedin.com/in/jayksdave/",
    initials: "JD",
  },
  "Soham Thaker": {
    name: "Soham Thaker",
    role: "Technical Lead, Jashom Technologies",
    bio: [
      "Soham Thaker is the Technical Lead at Jashom Technologies, a technology company building scalable AI and digital solutions — from custom LLM applications and RAG systems to GPU-optimized computing and full-stack engineering.",
      "With a background spanning system architecture, Rust development and technical team leadership, Soham focuses on turning complex technical requirements into reliable, production-ready systems.",
      "He writes about AI engineering, system design, and the practical challenges of building at scale.",
    ],
    linkedin: "https://www.linkedin.com/in/thakersoham/",
    initials: "ST",
  },
};

export default function AuthorBio({ authorName }: { readonly authorName: string | null }) {
  if (!authorName) return null;
  const author = AUTHORS[authorName];
  if (!author) return null;

  return (
    <div className="mt-10 pt-8 border-t border-line">
      <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-3 uppercase mb-5">About the Author</p>
      <div className="flex gap-5 items-start">
        {/* Avatar initials */}
        <div className="shrink-0 w-14 h-14 bg-ink flex items-center justify-center">
          <span className="font-mono text-[0.875rem] font-medium text-warmwhite tracking-wider">
            {author.initials}
          </span>
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <div>
            <p className="font-mono font-medium text-[1rem] text-ink">{author.name}</p>
            <p className="font-mono text-[0.8125rem] text-ink-3 mt-0.5">{author.role}</p>
          </div>

          <div className="flex flex-col gap-2">
            {author.bio.map((para, i) => (
              <p key={i} className="text-[0.9375rem] text-ink-2 leading-relaxed">{para}</p>
            ))}
          </div>

          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.8125rem] font-mono text-ink-2 hover:text-ink transition-colors duration-200 w-fit mt-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
