const navLinks = [
  {
    id: "cocktails",
    title: "Cocktails",
  },
  {
    id: "about",
    title: "About Us",
  },
  {
    id: "art",
    title: "The Art",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const cocktailLists = [
  {
    name: "Crisp Martini",
    country: "CA",
    detail: "Crisp & Clean",
    price: "$18",
  },
  {
    name: "The Crush",
    country: "AU",
    detail: "Refreshing Blend",
    price: "$18",
  },
  {
    name: "Jackrabbit",
    country: "CA",
    detail: "Grapefruit",
    price: "$19",
  },
  {
    name: "Hillstone Negroni",
    country: "IE",
    detail: "Classic",
    price: "$18",
  },
];

const mockTailLists = [
  {
    name: "Tropical Bloom",
    country: "US",
    detail: "Mango & Pineapple",
    price: "$10",
  },
  {
    name: "Passionfruit Mint",
    country: "US",
    detail: "Bright & Minty",
    price: "$12",
  },
  {
    name: "Citrus Glow",
    country: "CA",
    detail: "Orange & Yuzu",
    price: "$11",
  },
  {
    name: "Lavender Fizz",
    country: "IE",
    detail: "Floral Sparkle",
    price: "$12",
  },
];

const featureLists = [
  "Perfectly balanced blends",
  "Garnished to perfection",
  "Ice-cold every time",
  "Expertly shaken & stirred",
];

const goodLists = [
  "Handpicked ingredients",
  "Signature techniques",
  "Bartending artistry in action",
  "Freshly muddled flavors",
];

const storeInfo = {
  heading: "Where to Find Us",
  address: "123 Cocktail Lane, Suite 100, Los Angeles, CA 90001",
  contact: {
    phone: "(555) 987-6543",
    email: "hillstone@gmail.com",
  },
};

const openingHours = [
  { day: "Mon–Thu", time: "11:00am – 9:30pm" },
  { day: "Fri–Sat", time: "11:00am – 10pm" },
  { day: "Sun", time: "9:00am – 9pm" },
];

const socials = [
  {
    name: "Instagram",
    icon: "/images/insta.png",
    url: "#",
  },
  {
    name: "X (Twitter)",
    icon: "/images/x.png",
    url: "#",
  },
  {
    name: "Facebook",
    icon: "/images/fb.png",
    url: "#",
  },
];

const sliderLists = [
  {
    id: 1,
    name: "Classic Mojito",
    image: "/images/drink1.jpg",
    title: "Simple Ingredients, Bold Flavor",
    description:
      "White rum, fresh lime, muddled mint, and a touch of sugar, topped with soda. The Classic Mojito is easy to love and endlessly refreshing on a warm summer night.",
  },
  {
    id: 2,
    name: "Raspberry Mojito",
    image: "/images/drink2.jpg",
    title: "A Fruity Twist on a Classic",
    description:
      "Fresh raspberries muddled with mint and lime, shaken with rum and finished with soda. Tart, sweet, and bursting with berry flavor in every sip.",
  },
  {
    id: 3,
    name: "Violet Breeze",
    image: "/images/drink3.jpg",
    title: "Floral, Light, and Unforgettable",
    description:
      "Gin, crème de violette, and fresh lemon come together in a delicate, softly floral cocktail with a striking color that's as beautiful as it tastes.",
  },
  {
    id: 4,
    name: "Classic Margarita",
    image: "/images/drink4.jpg",
    title: "Bright, Bold, and Perfectly Balanced",
    description:
      "Silver tequila, fresh lime juice, and orange liqueur, shaken hard and served in a salt-rimmed glass. Tangy, smooth, and finished with a dried citrus wheel.",
  },
];

export {
  navLinks,
  cocktailLists,
  mockTailLists,
  featureLists,
  goodLists,
  openingHours,
  storeInfo,
  socials,
  sliderLists,
};
