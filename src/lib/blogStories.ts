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

type CountryGuide = {
  country: string;
  countrySlug: string;
  visaType: "study visa" | "visitor visa" | "work visa" | "business visa";
  category: string;
};

const programmaticGuides: CountryGuide[] = [
  { country: "Germany", countrySlug: "germany", visaType: "study visa", category: "Student visa resources" },
  { country: "Germany", countrySlug: "germany", visaType: "visitor visa", category: "Visitor visa guides" },
  { country: "Germany", countrySlug: "germany", visaType: "work visa", category: "Work visa preparation" },
  { country: "Germany", countrySlug: "germany", visaType: "business visa", category: "Travel checklists" },
  { country: "Canada", countrySlug: "canada", visaType: "study visa", category: "Student visa resources" },
  { country: "Canada", countrySlug: "canada", visaType: "visitor visa", category: "Visitor visa guides" },
  { country: "Canada", countrySlug: "canada", visaType: "work visa", category: "Work visa preparation" },
  { country: "Canada", countrySlug: "canada", visaType: "business visa", category: "Travel checklists" },
  { country: "Australia", countrySlug: "australia", visaType: "study visa", category: "Student visa resources" },
  { country: "Australia", countrySlug: "australia", visaType: "visitor visa", category: "Visitor visa guides" },
  { country: "Australia", countrySlug: "australia", visaType: "work visa", category: "Work visa preparation" },
  { country: "Australia", countrySlug: "australia", visaType: "business visa", category: "Travel checklists" },
  { country: "New Zealand", countrySlug: "new-zealand", visaType: "study visa", category: "Student visa resources" },
  { country: "New Zealand", countrySlug: "new-zealand", visaType: "visitor visa", category: "Visitor visa guides" },
  { country: "New Zealand", countrySlug: "new-zealand", visaType: "work visa", category: "Work visa preparation" },
  { country: "New Zealand", countrySlug: "new-zealand", visaType: "business visa", category: "Travel checklists" },
  { country: "United Kingdom", countrySlug: "uk", visaType: "study visa", category: "Student visa resources" },
  { country: "United Kingdom", countrySlug: "uk", visaType: "visitor visa", category: "Visitor visa guides" },
  { country: "United Kingdom", countrySlug: "uk", visaType: "work visa", category: "Work visa preparation" },
  { country: "United Kingdom", countrySlug: "uk", visaType: "business visa", category: "Travel checklists" },
];

const generatedStories: BlogStory[] = programmaticGuides.map((guide) => ({
  slug: `${guide.countrySlug}-${guide.visaType.replace(/\s+/g, "-")}-checklist`,
  title: `${guide.country} ${guide.visaType} checklist from Ghana`,
  category: guide.category,
  blurb: `A practical step-by-step checklist for ${guide.country} ${guide.visaType} applicants preparing from Ghana.`,
  readTime: "4-min read",
  image: "/images/study.jpg",
  relatedGuides: ["Proof of funds checklist", "Cover letter structure", "Interview readiness notes"],
  sections: [
    {
      heading: "Document checklist by stage",
      paragraphs: [
        "Start with identity and travel records, then gather purpose-specific documents and financial evidence.",
        "Group your file by sections so officers can review your application quickly and clearly.",
      ],
    },
    {
      heading: "Common refusal risks to avoid",
      paragraphs: [
        "Ensure dates, names, and sponsor details match across all forms and supporting files.",
        "Add a clear travel narrative that explains why this route fits your background and timeline.",
      ],
    },
  ],
}));

const editorialStories: BlogStory[] = [
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
    slug: "germany-vs-canada-study-path",
    title: "Germany vs Canada study path: costs, timelines, and outcomes",
    category: "Student visa resources",
    blurb: "Compare tuition, proof-of-funds expectations, processing windows, and post-study routes.",
    readTime: "5-min read",
    image: "/images/study.jpg",
    relatedGuides: ["Proof of funds for student visas", "Student visa interview guide"],
    sections: [
      {
        heading: "Cost and funding comparison",
        paragraphs: [
          "Germany can have lower tuition in many public institutions while Canada may offer broader co-op pathways depending on the program.",
          "Plan for tuition, living costs, insurance, and reserve funds before selecting your route.",
        ],
      },
      {
        heading: "Post-study planning",
        paragraphs: [
          "Evaluate post-study work permit options and residency pathways before you submit your first application.",
          "A destination with a clear work transition often gives better long-term outcomes.",
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

export const blogStories: BlogStory[] = [...editorialStories, ...generatedStories];

export function getBlogStoryBySlug(slug: string) {
  return blogStories.find((story) => story.slug === slug);
}
