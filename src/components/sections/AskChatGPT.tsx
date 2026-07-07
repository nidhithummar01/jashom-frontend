"use client";

import React from "react";

export default function AskChatGPT() {
  return (
    <section className="w-full bg-linen border-b border-line py-8 flex items-center justify-center" id="ask-chatgpt">
      <div className="container-j flex justify-center">
        <div className="flex items-center gap-3 px-6 py-4 bg-paper border border-line rounded-[10px] shadow-[4px_4px_0px_0px_var(--color-line)] font-mono text-[0.875rem] md:text-[0.9375rem] text-ink-2 hover:border-ink hover:shadow-[6px_6px_0px_0px_var(--color-line)] transition-all duration-300 max-w-2xl w-full justify-center">
          {/* Radix ChatBubbleIcon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-ink-2 flex-shrink-0"
          >
            <path
              d="M12.5 3H2.5C1.67157 3 1 3.67157 1 4.5V9.5C1 10.3284 1.67157 11 2.5 11H7.5L10.5 13.5V11H12.5C13.3284 11 14 10.3284 14 9.5V4.5C14 3.67157 13.3284 3 12.5 3ZM2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5V9.5C13 9.77614 12.7761 10 12.5 10H10C9.72386 10 9.5 10.2239 9.5 10.5V11.7803L7.86377 10.4168C7.66986 10.2552 7.42676 10.1667 7.17544 10.1667H2.5C2.22386 10.1667 2 9.9428 2 9.66667V4.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-ink">
            Not sure how this helps you? Ask{" "}
            <a
              href="https://chatgpt.com/?q=How+can+Jashom+help+my+company+with+GPU+optimization+and+CUDA+development%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink font-semibold border-b border-ink/40 hover:border-ink hover:text-ink transition-colors pb-0.5"
            >
              ChatGPT
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

