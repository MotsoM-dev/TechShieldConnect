export type RootTab = 'Home' | 'Chat' | 'Explore' | 'Profile';

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
