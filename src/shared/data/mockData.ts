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

export const verifiedBusinesses = [
  'Buffalo Tech Repairs - Beacon Bay - Phones and tablets',
  'Vincent Mobile Clinic - Vincent - iPhone and Samsung specialists',
  'Nahoon Device Lab - Nahoon - Diagnostics and premium repairs',
  'Mdantsane SmartFix - Mdantsane - Affordable phone repairs',
  'Southernwood Gadget Care - Southernwood - Fast quotes',
];

export const quotes = [
  'FixPro Electronics - R850 - 4.9 - 2 days',
  'HomeGuard Repairs - R780 - 4.8 - 3 days',
  'Urban Tech Clinic - R900 - 5.0 - 1 day',
];

export const marketDeals = [
  'Tempered glass screen protector - R149',
  'Anti-shock phone case - R249',
  'Laptop cleaning and thermal paste promo - 20% off',
  'Power bank and cable bundle - R399',
];

export const techCareLessons = [
  'How to spot battery swelling safely',
  'What to do in the first 10 minutes after water damage',
  'How warranties work after a repair',
  'When to repair vs replace your device',
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
