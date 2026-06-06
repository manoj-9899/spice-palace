import { IMAGES, MENU_IMAGES } from "./images";

export const RESTAURANT = {
  name: "Spice Palace",
  phone: "+918805348821",
  phoneDisplay: "+91 88053 48821",
  whatsapp: "918805348821",
  email: "hello@spicepalace.in",
  hours: "12pm – 11pm daily",
  address: "MG Road, Pune 411001",
  city: "Pune",
  url: "https://spicepalace.in",
};

export function whatsappUrl(text: string) {
  return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP = {
  table: whatsappUrl("Hi Spice Palace, I'd like to book a table. Date: \nTime: \nGuests: "),
  bulk: whatsappUrl("Hi Spice Palace, I'd like to enquire about a bulk / party order. Details: "),
  order: (items: string) => whatsappUrl(`Hi Spice Palace, I'd like to order:\n${items}\nTotal: `),
};

export const trustBadges = [
  { label: "4.9 Rating", icon: "★" },
  { label: "1200+ Happy Customers", icon: "✓" },
  { label: "Fresh Ingredients Daily", icon: "✓" },
];

export interface FeaturedDish {
  id: string;
  name: string;
  desc: string;
  price: number;
  rating: number;
  image: string;
  cat: string;
  diet: "veg" | "non-veg";
  spice: "Mild" | "Medium" | "Hot";
  popular?: boolean;
  badge?: string;
}

export const featuredDishes: FeaturedDish[] = [
  {
    id: "butter-chicken",
    name: "Chicken Butter Masala",
    desc: "Succulent pieces of grilled chicken simmered in a rich, velvety tomato and butter gravy.",
    price: 580,
    rating: 4.8,
    image: IMAGES.butterChicken,
    cat: "Mughlai",
    diet: "non-veg",
    spice: "Medium",
    popular: true,
    badge: "Popular",
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    desc: "Black lentils slow-cooked for 24 hours with cream, butter, and traditional spices.",
    price: 420,
    rating: 4.9,
    image: IMAGES.dalMakhani,
    cat: "Punjabi Classic",
    diet: "veg",
    spice: "Mild",
    popular: true,
    badge: "Best Seller",
  },
  {
    id: "seekh-kebab",
    name: "Seekh Kebab",
    desc: "Minced mutton infused with robust spices, hand-pressed on skewers and charcoal-grilled.",
    price: 680,
    rating: 4.7,
    image: IMAGES.seekhKebab,
    cat: "Tandoor",
    diet: "non-veg",
    spice: "Hot",
    badge: "Chef's Pick",
  },
];

export const menuTabs = [
  { id: "curries", label: "Curries", icon: "🍛" },
  { id: "starters", label: "Starters", icon: "🥗" },
  { id: "breads", label: "Breads", icon: "🍞" },
  { id: "biryani", label: "Biryani", icon: "🍚" },
  { id: "desserts", label: "Desserts", icon: "🍮" },
] as const;

export type MenuCategory = (typeof menuTabs)[number]["id"];

export interface MenuItem {
  id: string;
  name: string;
  sub: string;
  price: number;
  rating: number;
  prepTime: number;
  image: string;
  popular?: boolean;
}

export const menuByCategory: Record<MenuCategory, MenuItem[]> = {
  curries: [
    { id: "rogan-josh", name: "Rogan Josh", sub: "Kashmiri slow-cooked lamb in aromatic spices", price: 720, rating: 4.9, prepTime: 25, image: MENU_IMAGES.curries.roganJosh, popular: true },
    { id: "paneer-tikka-m", name: "Paneer Tikka Masala", sub: "Grilled cottage cheese in smoky tomato gravy", price: 480, rating: 4.8, prepTime: 18, image: MENU_IMAGES.curries.paneerTikkaMasala },
    { id: "chettinad-prawn", name: "Chettinad Prawn Curry", sub: "Coastal prawns in fiery chettinad masala", price: 960, rating: 4.9, prepTime: 22, image: MENU_IMAGES.curries.chettinadPrawn },
    { id: "dal-makhani-m", name: "Dal Makhani", sub: "Black lentils slow-cooked with butter and cream", price: 420, rating: 4.9, prepTime: 15, image: MENU_IMAGES.curries.dalMakhani, popular: true },
    { id: "butter-chicken-m", name: "Chicken Butter Masala", sub: "Velvety tomato-cream gravy with tender chicken", price: 580, rating: 4.9, prepTime: 20, image: MENU_IMAGES.curries.butterChicken, popular: true },
    { id: "palak-paneer", name: "Palak Paneer", sub: "Fresh spinach curry with cottage cheese", price: 440, rating: 4.7, prepTime: 16, image: MENU_IMAGES.curries.palakPaneer },
  ],
  starters: [
    { id: "galouti-kebab", name: "Galouti Kebab", sub: "Melt-in-mouth Lucknawi minced meat patties", price: 620, rating: 4.7, prepTime: 15, image: MENU_IMAGES.starters.galoutiKebab },
    { id: "seekh-kebab", name: "Seekh Kebab", sub: "Char-grilled lamb skewers from the tandoor", price: 680, rating: 4.8, prepTime: 18, image: MENU_IMAGES.starters.seekhKebab, popular: true },
    { id: "paneer-tikka-app", name: "Paneer Tikka", sub: "Marinated cottage cheese grilled in clay oven", price: 380, rating: 4.8, prepTime: 12, image: MENU_IMAGES.starters.paneerTikka },
    { id: "samosa-chaat", name: "Samosa Chaat", sub: "Crispy samosa with chutneys and yogurt", price: 280, rating: 4.6, prepTime: 10, image: MENU_IMAGES.starters.samosaChaat },
    { id: "tandoori-chicken", name: "Tandoori Chicken", sub: "Half chicken marinated in yogurt and spices", price: 520, rating: 4.9, prepTime: 25, image: MENU_IMAGES.starters.tandooriChicken, popular: true },
    { id: "pav-bhaji", name: "Pav Bhaji Royale", sub: "Spiced vegetable mash with butter-toasted pav", price: 320, rating: 4.8, prepTime: 12, image: MENU_IMAGES.starters.pavBhaji },
  ],
  breads: [
    { id: "garlic-naan", name: "Garlic Naan", sub: "Tandoor flatbread with fresh garlic and butter", price: 120, rating: 4.9, prepTime: 8, image: MENU_IMAGES.breads.garlicNaan, popular: true },
    { id: "butter-naan", name: "Butter Naan", sub: "Classic soft naan brushed with melted butter", price: 90, rating: 4.8, prepTime: 8, image: MENU_IMAGES.breads.butterNaan },
    { id: "laccha-paratha", name: "Laccha Paratha", sub: "Flaky layered whole-wheat tandoor bread", price: 110, rating: 4.7, prepTime: 10, image: MENU_IMAGES.breads.lacchaParatha },
    { id: "cheese-naan", name: "Cheese Naan", sub: "Stuffed with melted cheese and herbs", price: 160, rating: 4.8, prepTime: 10, image: MENU_IMAGES.breads.cheeseNaan },
    { id: "roomali-roti", name: "Roomali Roti", sub: "Paper-thin handkerchief bread", price: 80, rating: 4.6, prepTime: 7, image: MENU_IMAGES.breads.roomaliRoti },
    { id: "stuffed-paratha", name: "Aloo Paratha", sub: "Whole-wheat paratha with spiced potatoes", price: 140, rating: 4.7, prepTime: 12, image: MENU_IMAGES.breads.alooParatha },
  ],
  biryani: [
    { id: "hyderabadi-biryani", name: "Hyderabadi Biryani", sub: "Dum-cooked basmati with tender mutton", price: 850, rating: 4.9, prepTime: 30, image: MENU_IMAGES.biryani.hyderabadi, popular: true },
    { id: "lucknowi-biryani", name: "Lucknowi Biryani", sub: "Awadhi-style layered fragrant rice", price: 780, rating: 4.8, prepTime: 28, image: MENU_IMAGES.biryani.lucknowi },
    { id: "chicken-biryani", name: "Chicken Biryani", sub: "Aromatic basmati with marinated chicken", price: 620, rating: 4.9, prepTime: 25, image: MENU_IMAGES.biryani.chicken, popular: true },
    { id: "veg-biryani", name: "Vegetable Biryani", sub: "Seasonal vegetables with saffron rice", price: 480, rating: 4.7, prepTime: 22, image: MENU_IMAGES.biryani.veg },
    { id: "egg-biryani", name: "Egg Biryani", sub: "Spiced rice with boiled eggs", price: 420, rating: 4.6, prepTime: 20, image: MENU_IMAGES.biryani.egg },
    { id: "prawn-biryani", name: "Prawn Biryani", sub: "Coastal-style biryani with fresh prawns", price: 920, rating: 4.8, prepTime: 28, image: MENU_IMAGES.biryani.prawn },
  ],
  desserts: [
    { id: "gulab-jamun", name: "Gulab Jamun", sub: "Warm milk dumplings in rose-cardamom syrup", price: 180, rating: 4.9, prepTime: 5, image: MENU_IMAGES.desserts.gulabJamun, popular: true },
    { id: "rasmalai", name: "Rasmalai", sub: "Soft cheese discs in saffron milk", price: 220, rating: 4.8, prepTime: 5, image: MENU_IMAGES.desserts.rasmalai },
    { id: "kheer", name: "Phirni Kheer", sub: "Ground rice pudding with pistachios", price: 160, rating: 4.7, prepTime: 5, image: MENU_IMAGES.desserts.kheer },
    { id: "kulfi", name: "Mango Kulfi", sub: "Traditional ice cream with Alphonso mango", price: 140, rating: 4.8, prepTime: 3, image: MENU_IMAGES.desserts.kulfi },
    { id: "jalebi", name: "Jalebi", sub: "Crispy spirals in sugar syrup", price: 120, rating: 4.6, prepTime: 5, image: MENU_IMAGES.desserts.jalebi },
    { id: "gajar-halwa", name: "Gajar Ka Halwa", sub: "Slow-cooked carrot pudding with nuts", price: 200, rating: 4.9, prepTime: 8, image: MENU_IMAGES.desserts.gajarHalwa },
  ],
};

export const reviewPlatforms = [
  { name: "Google", rating: "4.9", reviews: "680+" },
  { name: "Zomato", rating: "4.8", reviews: "320+" },
  { name: "Swiggy", rating: "4.7", reviews: "210+" },
  { name: "TripAdvisor", rating: "4.9", reviews: "150+" },
];

export const testimonials = [
  {
    id: 1,
    quote: "An extraordinary dining experience — the Dal Makhani alone is worth the trip from Mumbai. Service was warm and attentive throughout.",
    name: "Md. Zubair Khan",
    location: "Mumbai",
    date: "Jan 2025",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    quote: "Celebrated our anniversary here — flawless ambiance and the Hyderabadi Biryani was pure magic. Chef Raj personally greeted us.",
    name: "Priya Sharma",
    location: "Pune",
    date: "Feb 2025",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    quote: "Best North Indian food in Koregaon Park. Butter chicken is consistently excellent and portions are generous. Highly recommend.",
    name: "Rohan Kulkarni",
    location: "Pune",
    date: "Mar 2025",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    quote: "We ordered catering for 80 guests — food arrived on time, still hot, and everyone asked for the restaurant name. Outstanding bulk service.",
    name: "Sanjay Mehta",
    location: "Pune",
    date: "Apr 2025",
    rating: 5,
    verified: true,
  },
];

export const chefStats = [
  { value: 22, suffix: "+", label: "Years Experience" },
  { value: 50000, suffix: "+", label: "Guests Served" },
  { value: 15, suffix: "+", label: "Awards Won" },
  { value: 120, suffix: "+", label: "Signature Dishes" },
];

export const blogPosts = [
  {
    id: "biryani-art",
    tag: "RECIPE",
    readTime: "5 min read",
    date: "June 2026",
    title: "The Art of Slow-Cooking the Perfect Biryani",
    author: "Chef Raj Malhotra",
    excerpt: "Discover the secrets of dum-cooking — the centuries-old technique that locks in every drop of flavour.",
    image: MENU_IMAGES.biryani.hyderabadi,
    content: [
      "At Spice Palace, our Hyderabadi Biryani spends forty-five minutes sealed in a handi — no shortcuts, no rushing the rice.",
      "We start with aged basmati soaked for exactly thirty minutes. The meat is marinated overnight in yogurt and house biryani masala.",
      "The handi is layered in strict order and sealed with dough. On a low flame, the pot cooks in its own humidity — that is the dum.",
    ],
  },
  {
    id: "spice-trail",
    tag: "INGREDIENTS",
    readTime: "4 min read",
    date: "May 2026",
    title: "The Spice Trail: Journey Through Our Masala Box",
    author: "Priya Deshmukh",
    excerpt: "From Kashmiri saffron to Chettinad kalpasi — how rare spices define our signature dishes.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    content: [
      "Every Monday morning, our spice ledger is updated by hand. We source from trusted importers across India.",
      "The masala box holds twenty-four spices, each in a labelled tin.",
    ],
  },
  {
    id: "award-2024",
    tag: "AWARDS",
    readTime: "3 min read",
    date: "Nov 2024",
    title: "Spice Palace Named Best Indian Restaurant of 2024",
    author: "Spice Palace Team",
    excerpt: "Honoured to receive the National Restaurant Award for outstanding Indian fine dining.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    content: [
      "In November 2024, Spice Palace received the National Restaurant Award for Best Indian Fine Dining — West Zone.",
      "Thank you to our team and loyal guests who made this possible.",
    ],
  },
];

export const newsletterBenefits = [
  "Weekly specials & festival menus",
  "Exclusive chef recipes",
  "Member-only discounts",
  "Birthday dining rewards",
];
