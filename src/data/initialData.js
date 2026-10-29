export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Commerce & Management',
  'Arts & Humanities',
  'Biotechnology',
  'Information Technology'
];

export const FLOORS = [
  'Ground Floor',
  '1st Floor',
  '2nd Floor',
  '3rd Floor',
  '4th Floor'
];

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Utensils' },
  { id: 'Breakfast', name: 'Breakfast', icon: 'Sun' },
  { id: 'Meals', name: 'Meals', icon: 'Soup' },
  { id: 'Fast Food', name: 'Fast Food', icon: 'Pizza' },
  { id: 'Snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'Beverages', name: 'Beverages', icon: 'Coffee' },
  { id: 'Desserts', name: 'Desserts', icon: 'IceCream' }
];

export const INITIAL_MENU_ITEMS = [
  {
    id: 'item-1',
    name: 'Paneer Tikka Kathi Roll',
    category: 'Snacks',
    price: 110,
    dietary: 'veg',
    description: 'Char-grilled cottage cheese cubes wrapped in flaky paratha with mint chutney and crunchy onions.',
    prepTime: '10-12 mins',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-2',
    name: 'Crispy Fried Chicken Burger',
    category: 'Meals',
    price: 140,
    dietary: 'non-veg',
    description: 'Golden spiced chicken breast with melted cheddar, crisp lettuce, and smoky chipotle mayo in brioche.',
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-3',
    name: 'South Indian Masala Dosa Combo',
    category: 'Breakfast',
    price: 90,
    dietary: 'veg',
    description: 'Crisp golden crepe stuffed with spiced potato mash, served with piping hot sambar and fresh coconut chutney.',
    prepTime: '10-14 mins',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-4',
    name: 'Butter Chicken Rice Bowl',
    category: 'Meals',
    price: 160,
    dietary: 'non-veg',
    description: 'Tender chicken simmered in rich tomato cashew gravy, served over fragrant steamed jeera basmati rice.',
    prepTime: '15-18 mins',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-5',
    name: 'Veg Schezwan Fried Rice',
    category: 'Meals',
    price: 120,
    dietary: 'veg',
    description: 'Wok-tossed long-grain rice with crunchy farm veggies in bold spicy homemade Schezwan sauce.',
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-6',
    name: 'Delhi Samosa Chaat Platter',
    category: 'Snacks',
    price: 65,
    dietary: 'veg',
    description: 'Crushed crispy potato samosas topped with warm spiced chole, sweet yogurt, tamarind and coriander chutneys.',
    prepTime: '8-10 mins',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-7',
    name: 'Peri-Peri Crinkle Fries',
    category: 'Snacks',
    price: 80,
    dietary: 'veg',
    description: 'Hot crispy potato fries dusted with fiery African bird-eye chilli blend, served with garlic dip.',
    prepTime: '6-8 mins',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-8',
    name: 'Chicken Steamed Momos [6 pcs]',
    category: 'Snacks',
    price: 110,
    dietary: 'non-veg',
    description: 'Delicate Himalayan dumplings packed with minced seasoned chicken, scallions, and red roasted tomato dip.',
    prepTime: '10-12 mins',
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-9',
    name: 'Chilled Cold Coffee with Ice Cream',
    category: 'Beverages',
    price: 75,
    dietary: 'veg',
    description: 'Thick, creamy blend of Arabica espresso, chilled full-cream milk, topped with a scoop of vanilla bean ice cream.',
    prepTime: '5-7 mins',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-10',
    name: 'Desi Masala Chai Flask [Serves 2]',
    category: 'Beverages',
    price: 45,
    dietary: 'veg',
    description: 'Authentic Indian milk tea brewed slow with fresh crushed ginger, cardamom, and Assam tea leaves.',
    prepTime: '5-8 mins',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-11',
    name: 'Alphonso Mango Lassi',
    category: 'Beverages',
    price: 65,
    dietary: 'veg',
    description: 'Refreshing probiotic yogurt drink whipped with pure Alphonso mango pulp and saffron notes.',
    prepTime: '5-7 mins',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-12',
    name: 'Warm Chocolate Walnut Brownie',
    category: 'Desserts',
    price: 85,
    dietary: 'veg',
    description: 'Fudgy dark Belgian chocolate brownie loaded with toasted walnuts and drizzled with hot chocolate ganache.',
    prepTime: '5-6 mins',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-13',
    name: 'Hot Gulab Jamun [2 pcs]',
    category: 'Desserts',
    price: 50,
    dietary: 'veg',
    description: 'Melt-in-mouth milk solids dumplings soaked in rose and cardamom infused sugar syrup.',
    prepTime: '4-5 mins',
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-14',
    name: 'Grilled Cheesy Club Sandwich',
    category: 'Snacks',
    price: 95,
    dietary: 'veg',
    description: 'Triple-decker toasted bread filled with spiced potato masala, cucumber, tomato, and generous gooey mozzarella.',
    prepTime: '8-10 mins',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-15',
    name: 'Woodfired Mozzarella Margherita Pizza',
    category: 'Fast Food',
    price: 180,
    dietary: 'veg',
    description: 'Thin-crust sourdough pizza topped with San Marzano tomato reduction, melted fresh buffalo mozzarella, and fragrant garden basil.',
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-16',
    name: 'Creamy Parmesan Alfredo Penne',
    category: 'Fast Food',
    price: 150,
    dietary: 'veg',
    description: 'Al dente penne pasta tossed in rich garlic butter and aged parmesan cream sauce with sauteed bell peppers and mushrooms.',
    prepTime: '10-12 mins',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-17',
    name: 'Fresh Watermelon Mint Juice',
    category: 'Beverages',
    price: 60,
    dietary: 'veg',
    description: 'Cold-pressed natural watermelon juice muddled with garden mint leaves, Himalayan pink salt, and a dash of lime.',
    prepTime: '3-5 mins',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-18',
    name: 'Steamed Idli Sambar Platter [3 pcs]',
    category: 'Breakfast',
    price: 65,
    dietary: 'veg',
    description: 'Steaming hot, fluffy fermented rice and lentil idlis served with flavourful vegetable sambar, roasted coconut chutney, and podi.',
    prepTime: '5-7 mins',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-19',
    name: 'Puffed Poori Bhaji Platter [3 pcs]',
    category: 'Breakfast',
    price: 75,
    dietary: 'veg',
    description: 'Golden puffed deep-fried pooris served with spiced homestyle potato bhaji masala, fresh onion salad, and pickle.',
    prepTime: '8-10 mins',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: true
  },
  {
    id: 'item-20',
    name: 'Crispy Medu Vada Combo [2 pcs]',
    category: 'Breakfast',
    price: 70,
    dietary: 'veg',
    description: 'Crispy, golden-fried urad dal fritters infused with crushed black pepper, ginger, and curry leaves, served with fresh coconut chutney.',
    prepTime: '6-8 mins',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: false
  },
  {
    id: 'item-21',
    name: 'Desi Ghee Rava Upma',
    category: 'Breakfast',
    price: 55,
    dietary: 'veg',
    description: 'Warm, savory semolina cooked with roasted cashews, mustard seeds, green chillies, curry leaves, and a touch of fresh ginger.',
    prepTime: '5-7 mins',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    popular: false
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'CC-9021',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    customer: {
      name: 'Aarav Sharma',
      phone: '9876543210',
      department: 'Computer Science & Engineering',
      classroom: 'Room 304',
      floor: '3rd Floor',
      deliveryNote: 'Please hand over near the front whiteboard during lab break.'
    },
    items: [
      { id: 'item-1', name: 'Paneer Tikka Kathi Roll', price: 110, quantity: 2 },
      { id: 'item-9', name: 'Chilled Cold Coffee with Ice Cream', price: 75, quantity: 1 }
    ],
    subtotal: 295,
    deliveryFee: 0,
    total: 295,
    paymentMethod: 'Online Payment (UPI)',
    paymentStatus: 'Paid',
    status: 'Out for Delivery', // Received -> Preparing -> Out for Delivery -> Delivered
    estimatedDeliveryMins: 7,
    statusHistory: [
      { status: 'Received', time: new Date(Date.now() - 1000 * 60 * 8).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { status: 'Preparing', time: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { status: 'Out for Delivery', time: new Date(Date.now() - 1000 * 60 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]
  },
  {
    id: 'CC-8845',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    customer: {
      name: 'Priya Nambiar',
      phone: '9845123456',
      department: 'Electronics & Communication',
      classroom: 'DSP Lab 2',
      floor: '2nd Floor',
      deliveryNote: 'Call on phone when on 2nd floor staircase.'
    },
    items: [
      { id: 'item-2', name: 'Crispy Fried Chicken Burger', price: 140, quantity: 1 },
      { id: 'item-7', name: 'Peri-Peri Crinkle Fries', price: 80, quantity: 1 }
    ],
    subtotal: 220,
    deliveryFee: 0,
    total: 220,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Preparing',
    estimatedDeliveryMins: 12,
    statusHistory: [
      { status: 'Received', time: new Date(Date.now() - 1000 * 60 * 18).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { status: 'Preparing', time: new Date(Date.now() - 1000 * 60 * 10).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]
  },
  {
    id: 'CC-8712',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    customer: {
      name: 'Rohan Deshmukh',
      phone: '9123456780',
      department: 'Mechanical Engineering',
      classroom: 'Workshop Hall C',
      floor: 'Ground Floor',
      deliveryNote: 'Leave with bench 4.'
    },
    items: [
      { id: 'item-3', name: 'South Indian Masala Dosa Combo', price: 90, quantity: 2 },
      { id: 'item-10', name: 'Desi Masala Chai Flask [Serves 2]', price: 45, quantity: 1 }
    ],
    subtotal: 225,
    deliveryFee: 0,
    total: 225,
    paymentMethod: 'Online Payment (Card)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    estimatedDeliveryMins: 0,
    statusHistory: [
      { status: 'Received', time: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { status: 'Preparing', time: new Date(Date.now() - 1000 * 60 * 35).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { status: 'Out for Delivery', time: new Date(Date.now() - 1000 * 60 * 20).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { status: 'Delivered', time: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]
  }
];
