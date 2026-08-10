export interface GlossaryTerm {
  slug: string;
  term: string;
  hindiTerm?: string;
  category:
    | "Ritual Terms"
    | "Sacred Locations"
    | "Lineage & Priesthood"
    | "Scriptural Concepts";
  definition: string;
  detailedExplanation: string;
  relatedPillarSlug?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "pind",
    term: "Pind (Pinda)",
    hindiTerm: "पिण्ड",
    category: "Ritual Terms",
    definition:
      "Sacred cooked rice or barley flour ball offered during ancestral rituals to nourish departed souls.",
    detailedExplanation:
      "A Pinda is a symbolic physical body created from cooked rice, sesame seeds, barley flour, milk, and honey. In Vedic metaphysics, offering Pinda satisfies the hunger of departed ancestors (Pitrus) and provides them with a subtle body (Yatana Deha) to transcend lower realms toward Vaikuntha.",
    relatedPillarSlug: "gaya-pind-daan-guide",
  },
  {
    slug: "tarpan",
    term: "Tarpan (Tarpana)",
    hindiTerm: "तर्पण",
    category: "Ritual Terms",
    definition:
      "Ritual libation of sacred water mixed with black sesame seeds and Kusha grass to satisfy ancestral thirst.",
    detailedExplanation:
      "Derived from the Sanskrit root 'Trup' (meaning to satisfy or satiate), Tarpan is the act of offering water poured over fingers while reciting specific Vedic mantras. Black sesame seeds (Kala Til) are essential as they absorb negative subtle energy and carry the oblations directly to Pitru Loka.",
    relatedPillarSlug: "how-to-perform-tarpan",
  },
  {
    slug: "shradh",
    term: "Shradh (Shraddha)",
    hindiTerm: "श्राद्ध",
    category: "Ritual Terms",
    definition:
      "Ancestral rites performed with faith (Shraddha), devotion, and Vedic mantras for late family members.",
    detailedExplanation:
      "Shraddha comes from 'Shraddha' (profound faith). It is a sacred moral duty where householders express gratitude to three generations of ancestors (Pitra, Pitamaha, Prapitamaha) through Pinda offerings, Brahmin Bhojan, and charity.",
    relatedPillarSlug: "shradh-process-step-by-step",
  },
  {
    slug: "pitru",
    term: "Pitru (Pitras)",
    hindiTerm: "पितृ",
    category: "Scriptural Concepts",
    definition:
      "The revered ancestral spirits of deceased parents, grandparents, and forebears residing in Pitru Loka.",
    detailedExplanation:
      "In Hindu cosmology, Pitrus reside in Pitru Loka, a subtle realm governed by Lord Aryama and Lord Yama. Beneficent ancestors protect their living descendants, grant health, lineage continuity, and prosperity when honored through regular Shradh and Pind Daan.",
    relatedPillarSlug: "vedic-texts-pind-daan-garuda-purana",
  },
  {
    slug: "moksha",
    term: "Moksha",
    hindiTerm: "मोक्ष",
    category: "Scriptural Concepts",
    definition:
      "Ultimate spiritual liberation of the soul from the cycle of birth, death, and rebirth (Samsara).",
    detailedExplanation:
      "Performing Pind Daan at Vishnupad Temple Dhaam in Gaya is believed to grant immediate Moksha to ancestors, liberating them from karmic debts and granting permanent abode in Lord Vishnu's divine Vaikuntha realm.",
    relatedPillarSlug: "gaya-kshetra-complete-guide",
  },
  {
    slug: "gayawal-purohit",
    term: "Gayawal Tirth Purohit",
    hindiTerm: "गयावाल तीर्थ पुरोहित",
    category: "Lineage & Priesthood",
    definition:
      "Hereditary Gayawal Brahmin priests of Gaya holding sole authority to conduct official Pind Daan ceremonies.",
    detailedExplanation:
      "Blessed by Lord Brahma during the ancient Gaya Yajna, the Gayawal Brahmins maintain century-old genealogical registers (Panjis). A Gaya Pind Daan is complete only when certified by a Gayawal Pandit through Suphal blessing.",
    relatedPillarSlug: "gayawal-pandit-tradition",
  },
  {
    slug: "vedi",
    term: "Vedi",
    hindiTerm: "वेदि",
    category: "Sacred Locations",
    definition:
      "Sacred altar, altar stone, or designated holy spot in Gaya Kshetra where Pinda offerings are placed.",
    detailedExplanation:
      "Gaya Kshetra contains 45 sacred Vedis (altars) spread across Vishnupad, Phalgu River, Akshayvat, Pretsila, Ramshila, and nearby holy tanks. Each Vedi possesses unique metaphysical power for neutralizing specific karmic blockages.",
    relatedPillarSlug: "gaya-kshetra-complete-guide",
  },
  {
    slug: "dakshina",
    term: "Dakshina",
    hindiTerm: "दक्षिणा",
    category: "Ritual Terms",
    definition:
      "Auspicious monetary gift and respect offered to Vedic Pandits upon completion of sacred rituals.",
    detailedExplanation:
      "Dakshina is an indispensable component of any Vedic yajna or Shradh ceremony. Offering Dakshina with humility ensures the full spiritual fruit (Phala) of the ritual is consecrated for the ancestors.",
    relatedPillarSlug: "pind-daan-cost-gaya",
  },
  {
    slug: "panji",
    term: "Panji (Lineage Register)",
    hindiTerm: "पंजी",
    category: "Lineage & Priesthood",
    definition:
      "Hereditary genealogical palm-leaf registers maintained by Gayawal Pandits recording family lineages.",
    detailedExplanation:
      "Panjis are historical family tree archives kept by Gayawal Pandits for centuries. When a pilgrim visits Gaya, the Pandit looks up their Gotra, native village, and forebears' signatures to verify and record the visit.",
    relatedPillarSlug: "gotra-significance-in-shradh",
  },
  {
    slug: "akshayvat",
    term: "Akshayvat (Immortal Banyan)",
    hindiTerm: "अक्षयवट",
    category: "Sacred Locations",
    definition:
      "The undying Banyan tree blessed by Goddess Sita, marking the final stage of Gaya Pind Daan.",
    detailedExplanation:
      "The Akshayvat is believed to survive universal dissolution (Pralaya). Offering the final Pinda oblation at the roots of Akshayvat seals the ancestors' mukti permanently.",
    relatedPillarSlug: "akshayvat-sacred-banyan-tree",
  },
  {
    slug: "narayan-bali",
    term: "Narayan Bali",
    hindiTerm: "नारायण बलि",
    category: "Ritual Terms",
    definition:
      "Special Vedic ritual performed for souls who experienced untimely, accidental, or unnatural death.",
    detailedExplanation:
      "When a family member suffers an unnatural death (accident, sudden illness, drowning), their soul may get trapped as Pret (restless ghost). Narayan Bali invokes Lord Vishnu via golden idol worship to liberate restless spirits.",
    relatedPillarSlug: "narayan-bali-puja-gaya",
  },
  {
    slug: "tripindi-shradh",
    term: "Tripindi Shradh",
    hindiTerm: "त्रिपिंडी श्राद्ध",
    category: "Ritual Terms",
    definition:
      "Special Shradh rite performed to remove severe Pitru Dosh caused by three generations of neglected rites.",
    detailedExplanation:
      "If Shradh rites have been neglected for three consecutive generations, ancestral affliction causes persistent family obstacles. Tripindi Shradh offers three specific Pindas (Brahma, Vishnu, Rudra) to appease unfulfilled ancestral souls.",
    relatedPillarSlug: "tripindi-shradh-gaya-guide",
  },
];
