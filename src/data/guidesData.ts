export interface FeaturedGuide {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  badge: string;
  category: string;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
}

export const featuredGuides: FeaturedGuide[] = [
  {
    slug: "what-is-pind-daan",
    title: "What is Pind Daan? The Complete Vedic Beginner's Guide to Ancestral Liberation",
    excerpt: "Explore the ancient oblation ritual, the energy of sesame and rice pindas, and why Gaya remains the supreme realm of salvation according to Garuda Purana.",
    readTime: "12 min read",
    badge: "Complete Beginner Guide",
    category: "Rituals",
    image: "/images/pinda_daan_ceremony.png",
    author: "Pt. Mishra Ji",
    authorRole: "Senior Gayawal Purohit",
    authorAvatar: "/images/avatar_acharya_shastri.png",
  },
  {
    slug: "why-vishnupad-temple-important",
    title: "Why Vishnupad Temple is Important: Vayu Purana Chronicles & Sacred Basalt Footprint",
    excerpt: "An in-depth scriptural study of Lord Vishnu's 40cm footprint stamped in solid basalt and why oblation at Vishnupad grants instant ancestral Moksha.",
    readTime: "8 min read",
    badge: "Scripture Chronicles",
    category: "Temples",
    image: "/images/gaya_vishnupad_temple.png",
    author: "Pt. Shastri Ji",
    authorRole: "Vedic Scholar",
    authorAvatar: "/images/gayawal_pandit_ritual.png",
  },
  {
    slug: "can-daughters-perform-pind-daan",
    title: "Can Daughters Perform Pind Daan? Scriptural Laws & Vedic Exceptions Clarified",
    excerpt: "Vedic texts permit daughters and wives to perform oblation if no male descendant exists. Discover the exact scriptural passages from Garuda Purana.",
    readTime: "15 min read",
    badge: "Vedic Law Vetted",
    category: "FAQs",
    image: "/images/family_pind_daan.png",
    author: "Pt. Mishra Ji",
    authorRole: "Senior Gayawal Purohit",
    authorAvatar: "/images/avatar_acharya_shastri.png",
  },
  {
    slug: "pitru-paksha-explained",
    title: "Pitru Paksha Explained: The 16-Day Sacred Auspicious Calendar & Obligations",
    excerpt: "Why the dark fortnight of Bhadrapada carries extraordinary spiritual power for ancestral peace, Mahalaya Amavasya rites, and Shraddha timings.",
    readTime: "20 min read",
    badge: "Calendar & Timings",
    category: "Festivals",
    image: "/images/falgu_river_ghats.png",
    author: "Acharya Shastri",
    authorRole: "Vedic Historian",
    authorAvatar: "/images/avatar_acharya_shastri.png",
  },
  {
    slug: "complete-gaya-travel-guide",
    title: "Complete Gaya Travel Guide: Delhi/Mumbai to Gaya, Flights, Hotels & Local Etiquette",
    excerpt: "Everything you need to know about traveling into Gaya, airport transfers, direct Vande Bharat trains, verified hotels, and senior citizen assistance.",
    readTime: "25 min read",
    badge: "Essential Travel Guide",
    category: "Travel",
    image: "/images/hotel_luxury_suite.png",
    author: "Pitraya Concierge Team",
    authorRole: "Gaya Sanctuary Operations",
    authorAvatar: "/images/avatar_acharya_shastri.png",
  },
];
