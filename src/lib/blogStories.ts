export type BlogStory = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  readTime: string;
  image: string;
  relatedGuides: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const blogStories: BlogStory[] = [
  {
    slug: "stronger-visitor-visa-file",
    title: "How to prepare a stronger visitor visa file",
    category: "Visitor visa guides",
    blurb: "Avoid common refusal triggers and present your travel purpose clearly.",
    readTime: "3-min read",
    image: "/images/pexels-tima-miroshnichenko-7010095.jpg",
    relatedGuides: ["Travel itinerary tips", "Proof of funds explained"],
    sections: [
      {
        heading: "Start with a clear travel purpose",
        paragraphs: [
          "Explain exactly why you are traveling, where you plan to stay, and what activities you will do during your visit.",
          "Your invitation letter, itinerary, and cover letter should all support the same timeline and objective.",
        ],
      },
      {
        heading: "Show stable finances",
        paragraphs: [
          "Provide recent statements, salary evidence, and any sponsor documents in an organized way.",
          "Avoid unexplained large deposits right before your application because they can trigger extra scrutiny.",
        ],
      },
    ],
  },
  {
    slug: "student-visa-interview-guide",
    title: "Student visa interview guide",
    category: "Interview preparation",
    blurb: "Practice high-impact answers and structure your interview narrative with confidence.",
    readTime: "4-min read",
    image: "/images/study.jpg",
    relatedGuides: ["Student visa document checklist", "How to explain study gaps"],
    sections: [
      {
        heading: "Build your study narrative",
        paragraphs: [
          "Prepare a concise explanation of why this program, why this country, and how it fits your long-term goals.",
          "Support your explanation with admission details, previous academic records, and relevant experience.",
        ],
      },
      {
        heading: "Practice likely questions",
        paragraphs: [
          "Rehearse common interview questions aloud and keep your answers specific and honest.",
          "The goal is clarity and consistency with your documents, not memorized scripts.",
        ],
      },
    ],
  },
  {
    slug: "germany-work-visa-document-list",
    title: "Germany work visa document list",
    category: "Work visa preparation",
    blurb: "Use this practical list to avoid missed documents and delayed processing.",
    readTime: "5-min read",
    image: "/images/jobs.jpg",
    relatedGuides: ["Employment contract checklist", "Salary threshold basics"],
    sections: [
      {
        heading: "Prepare core employment documents",
        paragraphs: [
          "Include your signed employment contract, job description, and employer details exactly as required by the embassy.",
          "Make sure names, dates, and role titles match across every document.",
        ],
      },
      {
        heading: "Include qualification proof",
        paragraphs: [
          "Attach degrees, transcripts, and translated copies where applicable.",
          "If your profession is regulated, include licensing or recognition evidence to avoid processing delays.",
        ],
      },
    ],
  },
  {
    slug: "visitor-visa-checklist-first-time-applicants",
    title: "Visitor visa checklist for first-time applicants",
    category: "Travel checklists",
    blurb: "Follow a timeline-based checklist that keeps your entire file application-ready.",
    readTime: "3-min read",
    image: "/images/WhatsApp Image 2026-01-29 at 19.52.04.jpeg",
    relatedGuides: ["Cover letter examples", "Travel history presentation tips"],
    sections: [
      {
        heading: "Organize documents by timeline",
        paragraphs: [
          "Start with passport and identity records, then move to travel plans, finances, and supporting evidence.",
          "A time-based structure makes your package easier for officers to review.",
        ],
      },
      {
        heading: "Double-check consistency",
        paragraphs: [
          "Ensure travel dates, accommodation details, and sponsor information match across all forms.",
          "Small mismatches can create avoidable refusal risks.",
        ],
      },
    ],
  },
  {
    slug: "common-refusal-reasons-and-prevention",
    title: "Common refusal reasons and how to prevent them",
    category: "Refusal prevention",
    blurb: "Learn what visa officers flag most often and how to proactively address each risk.",
    readTime: "4-min read",
    image: "/images/ausbildung.jpg",
    relatedGuides: ["Strong return-plan examples", "Financial evidence dos and don'ts"],
    sections: [
      {
        heading: "Address weak travel intent",
        paragraphs: [
          "Provide a direct reason for travel and documents that support your itinerary and return plans.",
          "Ambiguous purpose statements are one of the top refusal triggers.",
        ],
      },
      {
        heading: "Strengthen evidence quality",
        paragraphs: [
          "Use complete, legible, and up-to-date records for finances and employment.",
          "Contradictory or incomplete files reduce confidence in the application.",
        ],
      },
    ],
  },
  {
    slug: "proof-of-funds-for-student-visas",
    title: "Proof of funds for student visa applications",
    category: "Student visa resources",
    blurb: "Understand acceptable financial documents and how to show stable sponsorship evidence.",
    readTime: "4-min read",
    image: "/images/study.jpg",
    relatedGuides: ["Blocked account explained", "Tuition + living costs planning"],
    sections: [
      {
        heading: "Know acceptable financial formats",
        paragraphs: [
          "Check the latest embassy guidance for blocked account, sponsorship, or scholarship requirements.",
          "Use official documents and include all required translations and attestations.",
        ],
      },
      {
        heading: "Demonstrate sustainability",
        paragraphs: [
          "Show that funds are sufficient for tuition and living expenses for the expected period.",
          "Add context where needed so officers can easily understand the source and continuity of funds.",
        ],
      },
    ],
  },
];

export function getBlogStoryBySlug(slug: string) {
  return blogStories.find((story) => story.slug === slug);
}
