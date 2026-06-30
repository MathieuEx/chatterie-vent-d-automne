"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
            <button
              type="button"
              className="faq-item__question"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{item.question}</span>
              <span className="faq-item__icon" aria-hidden="true" />
            </button>
            <div id={`faq-answer-${index}`} className="faq-item__answer" role="region">
              <div className="faq-item__answer-inner">
                <p className="body-text-sm">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
