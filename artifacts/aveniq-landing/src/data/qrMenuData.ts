export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
  isPopular?: boolean;
}

export interface MenuCategories {
  [category: string]: MenuItem[];
}

export const QR_MENU_DATA: MenuCategories = {
  Coffee: [
    {
      id: "cappuccino",
      name: "Cappuccino",
      description: "Silky microfoam, double espresso, cocoa dust",
      price: 180,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80",
      tags: ["House Blend", "Double Shot"],
      isPopular: true,
    },
    {
      id: "americano",
      name: "Americano",
      description: "Rich espresso pulled over hot mountain water",
      price: 150,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
      tags: ["Single Origin"],
    },
    {
      id: "flat-white",
      name: "Flat White",
      description: "Velvety textured milk over double ristretto",
      price: 190,
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80",
      tags: ["Oat Milk Available"],
      isPopular: true,
    },
    {
      id: "mocha",
      name: "Artisan Mocha",
      description: "Single origin espresso, 70% dark Belgian chocolate",
      price: 220,
      image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=400&q=80",
      tags: ["Belgian Dark"],
    },
  ],

  Breakfast: [
    {
      id: "avocado-toast",
      name: "Avocado Toast",
      description: "Whipped local ricotta, seed dukkah, toasted sourdough",
      price: 320,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
      tags: ["Vegetarian", "Organic"],
      isPopular: true,
    },
    {
      id: "eggs-toast",
      name: "Eggs & Sourdough",
      description: "Two poached farm eggs, slow-fermented toast, herbs",
      price: 280,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
      tags: ["Farm Fresh"],
    },
    {
      id: "granola-bowl",
      name: "Granola Bowl",
      description: "House-toasted oats, organic Greek yogurt, wild berries, honey",
      price: 260,
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=400&q=80",
      tags: ["Gluten-Free"],
    },
    {
      id: "pancakes",
      name: "Buttermilk Pancakes",
      description: "Vanilla bean whipped butter, organic maple, fresh berries",
      price: 290,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80",
      tags: ["Chef Special"],
      isPopular: true,
    },
  ],

  Pastries: [
    {
      id: "croissant",
      name: "Butter Croissant",
      description: "72-layer laminated French pastry, golden flaky crust",
      price: 160,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80",
      tags: ["Baked Fresh"],
      isPopular: true,
    },
    {
      id: "pain-au-chocolat",
      name: "Pain au Chocolat",
      description: "Two batons of Valrhona dark chocolate, laminated butter dough",
      price: 190,
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=400&q=80",
      tags: ["French Butter"],
    },
    {
      id: "cinnamon-roll",
      name: "Cinnamon Roll",
      description: "Brown sugar, Ceylon cinnamon, Madagascar vanilla soft glaze",
      price: 180,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      tags: ["Warm"],
    },
  ],

  "Cold Drinks": [
    {
      id: "iced-latte",
      name: "Iced Latte",
      description: "Double shot slow-extracted espresso over crystal clear ice",
      price: 220,
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80",
      tags: ["Chilled", "Double Shot"],
      isPopular: true,
    },
    {
      id: "cold-brew",
      name: "Cold Brew Reserve",
      description: "18-hour cold steeped single origin Ethiopian beans",
      price: 210,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80",
      tags: ["Single Origin", "18h Steep"],
    },
    {
      id: "iced-matcha",
      name: "Iced Matcha Latte",
      description: "Uji ceremonial grade matcha, chilled oat milk, agave",
      price: 240,
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80",
      tags: ["Uji Ceremonial", "Organic"],
    },
  ],
};
