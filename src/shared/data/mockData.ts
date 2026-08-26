import type { RootTab } from '../types/navigation';

export const TABS: RootTab[] = ['TechCare', 'Market', 'Home', 'Explore', 'Profile'];

export const requestFilters = ['Pending', 'Quoted', 'Booked', 'In Progress', 'Completed'];

export const deviceBrandOptions: Record<string, string[]> = {
  Phone: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo', 'Vivo', 'Nokia', 'Other'],
  Laptop: ['Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Apple', 'Microsoft', 'Other'],
  Tablet: ['Apple', 'Samsung', 'Huawei', 'Lenovo', 'Microsoft', 'Amazon', 'Other'],
  Other: ['LG', 'Hisense', 'Sony', 'JBL', 'Canon', 'Epson', 'Other'],
};

export const issueChips = [
  'Screen cracked',
  'Battery issue',
  'Not charging',
  'Water damage',
  'No power',
  'Overheating',
];

export const recentRequests = [
  'Samsung A54 screen replacement - Quoted',
  'Washing machine not draining - In Progress',
  'Dell laptop battery issue - Pending',
];

export const featuredShops = [
  'FixPro Electronics - Sandton - 4.9 rating',
  'HomeGuard Repairs - Midrand - Verified',
  'Urban Tech Clinic - Rosebank - Fast turnaround',
];

export const eastLondonAreas = ['Beacon Bay', 'Vincent', 'Southernwood', 'Quigney', 'Mdantsane', 'Nahoon'];

export const promotedShops = [
  {
    name: 'Buffalo Tech Repairs',
    area: 'Beacon Bay',
    rating: '4.9',
    caption: 'Same-day screens with genuine-grade parts.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Vincent Mobile Clinic',
    area: 'Vincent',
    rating: '4.8',
    caption: 'Fast iPhone and Samsung repair quotes.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nahoon Device Lab',
    area: 'Nahoon',
    rating: '5.0',
    caption: 'Premium diagnostics and clean repair reports.',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80',
  },
];

export const homeSpecials = [
  {
    title: 'Screen Rescue',
    price: 'Save R120',
    caption: 'Discounted screen repairs in Beacon Bay this week.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Water Damage Check',
    price: 'Free',
    caption: 'Free diagnostics before you approve the repair.',
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Battery Boost',
    price: 'From R499',
    caption: 'Battery replacement bundle with health report.',
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
  },
];

export const notifications = [
  'Buffalo Tech Repairs sent a new repair update.',
  'Your Samsung A54 is 68% complete.',
  'New Screen Rescue special is live in Beacon Bay.',
  'Vincent Mobile Clinic replied to your quote request.',
];

export const quotes = [
  'FixPro Electronics - R850 - 4.9 - 2 days',
  'HomeGuard Repairs - R780 - 4.8 - 3 days',
  'Urban Tech Clinic - R900 - 5.0 - 1 day',
];

export const marketCategories = ['All', 'Phones', 'Laptops', 'Tablets', 'Accessories'];

export const productCategories = ['All', 'Chargers', 'Covers', 'Headphones', 'Screen guards', 'Power banks'];

/** Accessories sold by verified shops. `shop` links a product back to `repairShops`. */
export const marketplaceProducts = [
  {
    id: 'product-001',
    category: 'Chargers',
    title: 'Anker 20W Fast Charger',
    price: 'R380',
    detail: 'USB-C, 2 year warranty',
    shop: 'Buffalo Tech Repairs',
    area: 'Beacon Bay',
    rating: 4.9,
    inStock: true,
    description: 'Compact 20W USB-C wall charger that fast charges most modern phones. Carries a two year shop warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-002',
    category: 'Chargers',
    title: 'Braided USB-C Cable 2m',
    price: 'R149',
    detail: 'Nylon braid, 60W rated',
    shop: 'Vincent Mobile Clinic',
    area: 'Vincent',
    rating: 4.8,
    inStock: true,
    description: 'Two metre braided cable rated for 60W. Reinforced connectors so it survives daily bag life.',
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-003',
    category: 'Covers',
    title: 'Clear Shockproof Cover',
    price: 'R199',
    detail: 'Raised bezel, drop tested',
    shop: 'Buffalo Tech Repairs',
    area: 'Beacon Bay',
    rating: 4.7,
    inStock: true,
    description: 'Clear TPU cover with reinforced corners and a raised bezel that keeps the screen off flat surfaces.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-004',
    category: 'Covers',
    title: 'Leather Wallet Case',
    price: 'R349',
    detail: 'Card slots, magnetic close',
    shop: 'Nahoon Device Lab',
    area: 'Nahoon',
    rating: 4.6,
    inStock: false,
    description: 'Folio wallet case with three card slots and a magnetic closure. Doubles as a stand for video calls.',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-005',
    category: 'Headphones',
    title: 'Sony WH-CH520',
    price: 'R1 199',
    detail: 'Wireless, 50h battery',
    shop: 'Nahoon Device Lab',
    area: 'Nahoon',
    rating: 4.9,
    inStock: true,
    description: 'Over-ear wireless headphones with up to fifty hours of playback and multipoint pairing.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-006',
    category: 'Headphones',
    title: 'JBL Tune Earbuds',
    price: 'R699',
    detail: 'In-ear, charging case',
    shop: 'Mdantsane SmartFix',
    area: 'Mdantsane',
    rating: 4.5,
    inStock: true,
    description: 'True wireless earbuds with a pocket charging case and a sweat resistant shell for gym use.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-007',
    category: 'Screen guards',
    title: 'Tempered Glass Guard',
    price: 'R149',
    detail: 'Fitted free in store',
    shop: 'Southernwood Gadget Care',
    area: 'Southernwood',
    rating: 4.7,
    inStock: true,
    description: 'Nine H tempered glass with an oleophobic coating. Fitting is free when you buy in store.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-008',
    category: 'Power banks',
    title: '20000mAh Power Bank',
    price: 'R549',
    detail: 'Dual port, 22.5W',
    shop: 'Quigney Gadgets',
    area: 'Quigney',
    rating: 4.8,
    inStock: true,
    description: 'Twenty thousand mAh capacity with two output ports, enough for roughly four phone charges.',
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'product-009',
    category: 'Chargers',
    title: 'Car Charger Duo',
    price: 'R229',
    detail: '30W, two devices',
    shop: 'Quigney Gadgets',
    area: 'Quigney',
    rating: 4.4,
    inStock: true,
    description: 'Thirty watt dual port car charger so a driver and passenger can charge at the same time.',
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
  },
];

export const repairShops = [
  {
    id: 'shop-001',
    name: 'Buffalo Tech Repairs',
    area: 'Beacon Bay',
    rating: 4.9,
    reviews: 214,
    responseTime: 'Replies in about 20 min',
    hours: 'Mon - Sat, 08:00 - 17:30',
    verified: true,
    caption: 'Same-day screens with genuine-grade parts.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
    services: [
      { name: 'Screen replacement', price: 'From R850' },
      { name: 'Battery replacement', price: 'From R499' },
      { name: 'Charging port repair', price: 'From R380' },
      { name: 'Water damage clean', price: 'From R650' },
    ],
  },
  {
    id: 'shop-002',
    name: 'Vincent Mobile Clinic',
    area: 'Vincent',
    rating: 4.8,
    reviews: 168,
    responseTime: 'Replies in about 35 min',
    hours: 'Mon - Fri, 09:00 - 18:00',
    verified: true,
    caption: 'Fast iPhone and Samsung repair quotes.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    services: [
      { name: 'iPhone screen repair', price: 'From R1 100' },
      { name: 'Samsung screen repair', price: 'From R780' },
      { name: 'Software restore', price: 'From R250' },
    ],
  },
  {
    id: 'shop-003',
    name: 'Nahoon Device Lab',
    area: 'Nahoon',
    rating: 5.0,
    reviews: 96,
    responseTime: 'Replies in about 15 min',
    hours: 'Tue - Sat, 08:30 - 17:00',
    verified: true,
    caption: 'Premium diagnostics and clean repair reports.',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80',
    services: [
      { name: 'Full diagnostics', price: 'Free' },
      { name: 'Motherboard repair', price: 'From R1 450' },
      { name: 'Data recovery', price: 'From R900' },
      { name: 'Laptop servicing', price: 'From R550' },
    ],
  },
  {
    id: 'shop-004',
    name: 'Mdantsane SmartFix',
    area: 'Mdantsane',
    rating: 4.6,
    reviews: 302,
    responseTime: 'Replies in about 45 min',
    hours: 'Mon - Sat, 08:00 - 18:00',
    verified: true,
    caption: 'Affordable phone repairs with walk-in slots.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    services: [
      { name: 'Screen replacement', price: 'From R650' },
      { name: 'Battery replacement', price: 'From R420' },
      { name: 'Speaker repair', price: 'From R300' },
    ],
  },
  {
    id: 'shop-005',
    name: 'Southernwood Gadget Care',
    area: 'Southernwood',
    rating: 4.5,
    reviews: 87,
    responseTime: 'Replies in about 1 hour',
    hours: 'Mon - Fri, 09:00 - 17:00',
    verified: false,
    caption: 'Quick quotes on phones, tablets, and consoles.',
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
    services: [
      { name: 'Tablet screen repair', price: 'From R980' },
      { name: 'Console HDMI repair', price: 'From R700' },
      { name: 'Screen guard fitting', price: 'Free with purchase' },
    ],
  },
  {
    id: 'shop-006',
    name: 'Quigney Gadgets',
    area: 'Quigney',
    rating: 4.7,
    reviews: 131,
    responseTime: 'Replies in about 30 min',
    hours: 'Mon - Sat, 08:30 - 17:30',
    verified: true,
    caption: 'Accessories, trade-ins, and small repairs.',
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=900&q=80',
    services: [
      { name: 'Accessory fitting', price: 'Free' },
      { name: 'Trade-in valuation', price: 'Free' },
      { name: 'Charging port clean', price: 'From R180' },
    ],
  },
];

export const marketListings = [
  {
    id: 'listing-001',
    category: 'Phones',
    title: 'iPhone 12 Pro 128GB',
    price: 'R6 400',
    condition: 'Good condition',
    detail: '89% battery health',
    seller: 'Lindiwe M.',
    sellerRating: 4.8,
    area: 'Beacon Bay',
    postedAt: '2 hours ago',
    verified: true,
    description:
      'Selling my iPhone 12 Pro. Screen is original with no cracks, small scuff on the bottom frame. Comes with a case and cable, box included.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-002',
    category: 'Phones',
    title: 'Samsung Galaxy S21',
    price: 'R4 850',
    condition: 'Screen replaced',
    detail: 'Repaired at Buffalo Tech',
    seller: 'Sipho N.',
    sellerRating: 4.6,
    area: 'Vincent',
    postedAt: 'Yesterday',
    verified: true,
    description:
      'Screen was replaced last month at Buffalo Tech Repairs, receipt and warranty slip included. Battery still strong, everything works.',
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-003',
    category: 'Laptops',
    title: 'Dell Latitude 7400',
    price: 'R7 200',
    condition: 'Excellent',
    detail: 'i5, 16GB RAM, 512GB SSD',
    seller: 'Thandeka R.',
    sellerRating: 5.0,
    area: 'Nahoon',
    postedAt: '3 days ago',
    verified: false,
    description:
      'Upgrading to a new machine. Battery holds about 5 hours, keyboard and trackpad are clean. Charger included, no dents.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-004',
    category: 'Phones',
    title: 'Huawei P30 Lite',
    price: 'R2 100',
    condition: 'Fair condition',
    detail: 'Hairline crack, fully working',
    seller: 'Anele K.',
    sellerRating: 4.3,
    area: 'Mdantsane',
    postedAt: '4 days ago',
    verified: false,
    description:
      'Hairline crack in the top corner that does not affect touch. Priced to move. Happy to meet at a verified TechShield shop for the handover.',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-005',
    category: 'Tablets',
    title: 'iPad 9th Gen 64GB',
    price: 'R3 950',
    condition: 'Like new',
    detail: 'Wi-Fi, with cover',
    seller: 'Zanele P.',
    sellerRating: 4.9,
    area: 'Southernwood',
    postedAt: '5 days ago',
    verified: true,
    description:
      'Barely used, kept in a folio cover from day one. No scratches on the screen. Selling because I moved to a laptop for studies.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-006',
    category: 'Accessories',
    title: 'Anker 20W Charger Bundle',
    price: 'R380',
    condition: 'Sealed',
    detail: 'Charger plus braided cable',
    seller: 'Quigney Gadgets',
    sellerRating: 4.7,
    area: 'Quigney',
    postedAt: '6 days ago',
    verified: true,
    description:
      'Brand new sealed fast charger with a 1.8m braided USB-C cable. Bought two by mistake, selling one at cost.',
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=900&q=80',
  },
];

export const marketSpecials = [
  {
    title: 'Screen Rescue',
    price: 'Save R120',
    shop: 'Buffalo Tech Repairs',
    area: 'Beacon Bay',
    caption: 'Discounted screen repairs booked through the app this week.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Battery Boost',
    price: 'From R499',
    shop: 'Vincent Mobile Clinic',
    area: 'Vincent',
    caption: 'Battery replacement bundled with a free health report.',
    imageUrl: 'https://images.unsplash.com/photo-1603539444875-76e7684265f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Water Damage Check',
    price: 'Free',
    shop: 'Nahoon Device Lab',
    area: 'Nahoon',
    caption: 'Free diagnostics before you approve any repair work.',
    imageUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Trade-In Tuesday',
    price: '20% off',
    shop: 'Mdantsane SmartFix',
    area: 'Mdantsane',
    caption: 'Trade an old handset and take 20% off any repair.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  },
];

export const marketTechTips = [
  {
    title: 'Check the IMEI before you pay',
    body: 'Ask the seller to dial *#06# in front of you, then verify the IMEI is not blacklisted before any money changes hands.',
    source: 'TechShield safety desk',
  },
  {
    title: 'Meet at a verified shop',
    body: 'Verified TechShield shops let buyers and sellers hand over devices on their premises. It is free and there is a witness.',
    source: 'Buffalo Tech Repairs',
  },
  {
    title: 'Ask for the repair slip',
    body: 'If a listing says the screen was replaced, ask for the repair receipt. It tells you the part grade and whether warranty still applies.',
    source: 'Vincent Mobile Clinic',
  },
  {
    title: 'Test the charging port',
    body: 'Plug the device in and watch it charge for a minute. Loose or slow charging is the most common hidden fault on used phones.',
    source: 'Nahoon Device Lab',
  },
];

export const marketReviews = [
  {
    id: 'review-001',
    author: 'Nomsa D.',
    rating: 5,
    subject: 'Bought from Lindiwe M.',
    area: 'Beacon Bay',
    postedAt: '2 days ago',
    helpful: 14,
    body: 'Met at Buffalo Tech Repairs so they could check the phone first. Everything matched the listing exactly. Smooth handover.',
  },
  {
    id: 'review-002',
    author: 'Kagiso T.',
    rating: 4,
    subject: 'Screen Rescue special',
    area: 'Vincent',
    postedAt: '4 days ago',
    helpful: 9,
    body: 'Repair was done same day and the price held to the quote. Took a bit longer than promised but they kept me updated on chat.',
  },
  {
    id: 'review-003',
    author: 'Yusuf A.',
    rating: 5,
    subject: 'Sold my Galaxy S21',
    area: 'Southernwood',
    postedAt: '1 week ago',
    helpful: 21,
    body: 'Listed on Monday, sold by Wednesday. Being able to attach my repair receipt to the listing made buyers trust the price.',
  },
  {
    id: 'review-004',
    author: 'Refilwe M.',
    rating: 3,
    subject: 'Bought from Anele K.',
    area: 'Mdantsane',
    postedAt: '1 week ago',
    helpful: 6,
    body: 'Phone works fine but the crack was slightly bigger than the photos showed. Ask for a video before you travel to meet.',
  },
];

export const customerProfile = {
  name: 'Goso Yonga',
  email: 'goso.yonga@gmail.com',
  phone: '+27 82 555 0119',
  area: 'Beacon Bay, East London',
  memberSince: 'Member since March 2026',
  stats: [
    { label: 'Repairs', value: '12' },
    { label: 'Warranties', value: '3' },
    { label: 'Reviews', value: '8' },
  ],
};

export const techCareGuides = [
  {
    id: 'guide-001',
    title: 'Spot battery swelling safely',
    body: 'Learn the warning signs of a swelling battery and how to handle the device without making it worse.',
    duration: '4 min read',
    category: 'Device safety',
    icon: 'battery-half',
    progress: 100,
  },
  {
    id: 'guide-002',
    title: 'The first 10 minutes after water damage',
    body: 'What to do, and what never to do, in the minutes that decide whether your phone survives a spill.',
    duration: '6 min read',
    category: 'Device safety',
    icon: 'water',
    progress: 60,
  },
  {
    id: 'guide-003',
    title: 'How warranties work after a repair',
    body: 'Understand part grades, warranty periods, and what voids the cover on a repaired device.',
    duration: '5 min read',
    category: 'Warranty tips',
    icon: 'shield-checkmark',
    progress: 0,
  },
  {
    id: 'guide-004',
    title: 'Repair or replace your device',
    body: 'A simple cost and age test that tells you when a repair is worth it and when it is throwing money away.',
    duration: '7 min read',
    category: 'Buying advice',
    icon: 'swap-horizontal',
    progress: 0,
  },
  {
    id: 'guide-005',
    title: 'Avoid common repair scams',
    body: 'The quotes, parts, and pressure tactics to watch for when you hand your device to a stranger.',
    duration: '5 min read',
    category: 'Repair basics',
    icon: 'alert-circle',
    progress: 25,
  },
];

export const techCareCategories = [
  'All',
  'Device safety',
  'Repair basics',
  'Warranty tips',
  'Buying advice',
];

export const rotatingTechTips = [
  'Back up your phone before every repair handover.',
  'If your phone gets wet, power it off immediately and avoid charging it.',
  'A swollen battery is urgent. Do not press the screen down.',
  'Ask repair shops which part grade they are quoting for.',
  'Keep your repair receipt because it anchors your warranty.',
  'Use a surge protector when charging during storms.',
  'Clean your charging port gently. Never force metal objects inside.',
  'If a screen flickers after a drop, book diagnostics before it worsens.',
  'A slow phone may need storage cleanup before hardware repair.',
  'Avoid cheap cables that heat up while charging.',
];

export const chatMessages = [
  { id: 'msg-001', from: 'shop', text: 'Hi, we received your request for the Samsung A54 screen. Thanks for the photos.', time: '08:12' },
  { id: 'msg-002', from: 'me', text: 'Great. What will it cost and how long does it take?', time: '08:14' },
  { id: 'msg-003', from: 'shop', text: 'R850 including the part and labour, with a two day turnaround and a 90 day warranty.', time: '08:15' },
  { id: 'msg-004', from: 'me', text: 'That works for me. When can I drop it off?', time: '08:20' },
  { id: 'msg-005', from: 'shop', text: 'Any time before 17:30 today. We will post progress updates right here in the chat.', time: '08:22' },
] as const;

export const chatQuickReplies = [
  'Any update on parts?',
  'When can I collect?',
  'Please call me',
  'Share the quote',
];

export const activeRepair = {
  device: 'Samsung A54',
  shop: 'Buffalo Tech Repairs',
  area: 'Beacon Bay',
  stage: 'In Progress',
  progress: 68,
  estimate: 'Tomorrow, 3:30 PM',
};

export const recentRepairCards = [
  {
    id: 'repair-001',
    device: 'iPhone 13',
    shop: 'Vincent Mobile Clinic',
    price: 'R1,250',
    status: 'Completed',
    description: 'Cracked front screen after a drop. Touch still worked, but glass was lifting near the top corner.',
    photos: ['Front crack', 'Top corner', 'After repair'],
  },
  {
    id: 'repair-002',
    device: 'Samsung A54',
    shop: 'Buffalo Tech Repairs',
    price: 'R850',
    status: 'In Progress',
    description: 'Screen replacement and charging port inspection. User reported flickering and slow charging.',
    photos: ['Screen flicker', 'Charging port', 'Device label'],
  },
];
