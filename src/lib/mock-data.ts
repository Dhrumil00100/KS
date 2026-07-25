export type Service = {
  id: string;
  name: string;
  category: "hair" | "colour" | "skin" | "nails" | "bridal";
  duration: number;
  price: number;
  description: string;
};

export const services: Service[] = [
  { id: "1", name: "Signature Cut", category: "hair", duration: 60, price: 1800, description: "A precision cut tailored to your face shape and lifestyle." },
  { id: "2", name: "Balayage Colour", category: "colour", duration: 180, price: 7500, description: "Hand-painted highlights for a natural, effortless finish." },
  { id: "3", name: "Keratin Smoothing", category: "hair", duration: 120, price: 5500, description: "Frizz-free, glossy results lasting up to 3 months." },
  { id: "4", name: "Hydrafacial", category: "skin", duration: 75, price: 4000, description: "Deep-cleanse, exfoliate and hydrate for radiant skin." },
  { id: "5", name: "Gel Nail Art", category: "nails", duration: 90, price: 2000, description: "Intricate artistry with long-lasting gel formula." },
  { id: "6", name: "Bridal Package", category: "bridal", duration: 300, price: 22000, description: "Complete hair and makeup for your most important day." },
];

export type Staff = {
  id: string;
  name: string;
  role: string;
  experience: number;
  specialisations: string[];
  photo: string;
  bio: string;
};

export const staff: Staff[] = [
  { id: "1", name: "Aisha Khan", role: "Creative Director", experience: 11, specialisations: ["Balayage", "Editorial Colour", "Bridal"], photo: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&fit=crop&auto=format&q=70", bio: "11 years between Mumbai and Dubai. Aisha builds colour from the inside out." },
  { id: "2", name: "Rohan Seth", role: "Senior Stylist", experience: 8, specialisations: ["Precision Cuts", "Texture", "Men's Grooming"], photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&fit=crop&auto=format&q=70", bio: "Structure first. Rohan's cuts work from wash-and-go to red carpet." },
  { id: "3", name: "Priya Nair", role: "Skin & Beauty Specialist", experience: 7, specialisations: ["Hydrafacial", "Nail Art", "Anti-Ageing"], photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop&auto=format&q=70", bio: "Radiant skin is the best look. Priya has been proving it for 7 years." },
];

export const testimonials = [
  { id: "1", name: "Meera K.", rating: 5, text: "KULT is the only place I trust with my hair. Walked in unsure, walked out obsessed." },
  { id: "2", name: "Arjun V.", rating: 5, text: "For men who care about grooming — this is the place. Clean space, sharp cuts, no nonsense." },
  { id: "3", name: "Ananya B.", rating: 5, text: "My bridal experience was flawless. The team is meticulous and the results were beyond what I imagined." },
];

export const galleryImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&fit=crop&auto=format&q=70", category: "Colour" },
  { id: "2", url: "https://images.unsplash.com/photo-1560066984-138daaa0a5b2?w=800&fit=crop&auto=format&q=70", category: "Hair" },
  { id: "3", url: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&fit=crop&auto=format&q=70", category: "Bridal" },
  { id: "4", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&fit=crop&auto=format&q=70", category: "Nails" },
  { id: "5", url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&fit=crop&auto=format&q=70", category: "Skin" },
  { id: "6", url: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&fit=crop&auto=format&q=70", category: "Colour" },
  { id: "7", url: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&fit=crop&auto=format&q=70", category: "Hair" },
  { id: "8", url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&fit=crop&auto=format&q=70", category: "Skin" },
  { id: "9", url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&fit=crop&auto=format&q=70", category: "Bridal" },
  { id: "10", url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&fit=crop&auto=format&q=70", category: "Nails" },
  { id: "11", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop&auto=format&q=70", category: "Hair" },
  { id: "12", url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&fit=crop&auto=format&q=70", category: "Colour" },
];

export const mockLoyalty = {
  name: "Priya S.",
  tier: "KULT+",
  points: 340,
  nextTier: "KULT BLACK",
  pointsNeeded: 160,
  transactions: [
    { date: "2025-03-15", label: "Balayage Colour", delta: 75 },
    { date: "2025-02-28", label: "Signature Cut", delta: 18 },
    { date: "2025-02-01", label: "Reward Redeemed", delta: -100 },
  ],
};

export const serviceCategories = [
  { key: "hair", num: "01", title: "HAIR", line: "Cuts, styling and treatments." },
  { key: "colour", num: "02", title: "COLOUR", line: "Balayage, highlights, global tone." },
  { key: "skin", num: "03", title: "SKIN", line: "Facials and advanced skincare." },
  { key: "nails", num: "04", title: "NAILS", line: "Artistry, gels and manicures." },
];
