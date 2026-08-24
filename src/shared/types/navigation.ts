export type RootTab = 'Profile' | 'Explore' | 'Home' | 'Market' | 'TechCare';

export type RepairRequestDraft = {
  deviceCategory: string;
  brand: string;
  problemDescription: string;
  issue: string;
  area: string;
  preferredTime: string;
  budget: string;
  photos: string[];
};

export type AppScreen =
  | { name: 'tabs'; tab: RootTab }
  | { name: 'create-step-1' }
  | { name: 'create-step-2' }
  | { name: 'create-step-3' }
  | { name: 'request-submitted' }
  | { name: 'request-details' }
  | { name: 'quotes-list' }
  | { name: 'business-profile' }
  | { name: 'accept-confirmation' }
  | { name: 'tracking' }
  | { name: 'chat' }
  | { name: 'warranty' }
  | { name: 'notifications' }
  | { name: 'edit-profile' }
  | { name: 'settings' }
  | { name: 'help' }
  | { name: 'repair-history' };

export type ThemeMode = 'dark' | 'light';
