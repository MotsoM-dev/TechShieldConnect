import { useState } from 'react';
import { ScrollView } from 'react-native';
import { ExploreScreen } from '../features/customer/explore';
import { HomeScreen } from '../features/customer/home';
import { MarketScreen } from '../features/customer/market';
import { ProfileScreen } from '../features/customer/profile';
import { TechCareScreen } from '../features/customer/tech-care';
import {
  AcceptConfirmation,
  BusinessProfile,
  CreateStepOne,
  CreateStepThree,
  CreateStepTwo,
  QuotesList,
  RequestDetails,
  SubmittedScreen,
} from '../screens/RequestFlow';
import { ChatScreen, SimpleListScreen, TrackingScreen, WarrantyScreen } from '../screens/SupportScreens';
import { styles } from '../shared/theme/styles';
import type { AppScreen, RepairRequestDraft, RootTab, ThemeMode } from '../shared/types/navigation';

type NavigatorProps = {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

export function AppNavigator({ screen, setScreen, theme, setTheme }: NavigatorProps) {
  const [requestDraft, setRequestDraft] = useState<RepairRequestDraft>({
    deviceCategory: 'Phone',
    brand: 'Samsung',
    problemDescription: 'Screen is cracked and flickering after a drop.',
    issue: 'Screen cracked',
    area: 'Beacon Bay',
    preferredTime: 'Tomorrow morning',
    budget: 'R500 - R1500',
    photos: [],
  });
  const [hasSubmittedRequest, setHasSubmittedRequest] = useState(false);

  if (screen.name === 'tabs') {
    return (
      <TabStack
        tab={screen.tab}
        setScreen={setScreen}
        theme={theme}
        setTheme={setTheme}
        requestDraft={requestDraft}
        hasSubmittedRequest={hasSubmittedRequest}
      />
    );
  }

  switch (screen.name) {
    case 'create-step-1':
      return <CreateStepOne draft={requestDraft} setDraft={setRequestDraft} onNext={() => setScreen({ name: 'create-step-2' })} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'create-step-2':
      return <CreateStepTwo draft={requestDraft} setDraft={setRequestDraft} onNext={() => setScreen({ name: 'create-step-3' })} onBack={() => setScreen({ name: 'create-step-1' })} />;
    case 'create-step-3':
      return <CreateStepThree draft={requestDraft} setDraft={setRequestDraft} onNext={() => { setHasSubmittedRequest(true); setScreen({ name: 'tabs', tab: 'Explore' }); }} onBack={() => setScreen({ name: 'create-step-2' })} />;
    case 'request-submitted':
      return <SubmittedScreen onViewRequests={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'request-details':
      return <RequestDetails onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} onViewQuotes={() => setScreen({ name: 'quotes-list' })} onTrack={() => setScreen({ name: 'tracking' })} />;
    case 'quotes-list':
      return <QuotesList onBack={() => setScreen({ name: 'request-details' })} onOpenBusiness={() => setScreen({ name: 'business-profile' })} onAccept={() => setScreen({ name: 'accept-confirmation' })} />;
    case 'business-profile':
      return <BusinessProfile onBack={() => setScreen({ name: 'quotes-list' })} onChat={() => setScreen({ name: 'chat' })} onAccept={() => setScreen({ name: 'accept-confirmation' })} />;
    case 'accept-confirmation':
      return <AcceptConfirmation onDone={() => setScreen({ name: 'tracking' })} />;
    case 'tracking':
      return <TrackingScreen onChat={() => setScreen({ name: 'chat' })} onWarranty={() => setScreen({ name: 'warranty' })} onBack={() => setScreen({ name: 'request-details' })} />;
    case 'chat':
      return <ChatScreen onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'warranty':
      return <WarrantyScreen onBack={() => setScreen({ name: 'tracking' })} />;
    case 'notifications':
      return <SimpleListScreen title="Notifications" subtitle="Quotes received, status updates, and messages." items={['New quote from FixPro Electronics', 'Your request moved to In Progress', 'Message from Urban Tech Clinic']} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'edit-profile':
      return <SimpleListScreen title="Edit Profile" subtitle="Update personal details and profile photo." items={['Full name', 'Email address', 'Phone number', 'Profile photo']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
    case 'settings':
      return <SimpleListScreen title="Settings" subtitle="Notifications, language, dark mode, and privacy." items={['Notifications preferences', 'Language', 'Dark mode', 'Privacy']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
    case 'help':
      return <SimpleListScreen title="Help & Support" subtitle="FAQs, contact support, and report a problem." items={['FAQs', 'Contact Support', 'Report a Problem']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
    case 'repair-history':
      return <SimpleListScreen title="Repair History" subtitle="Full list of completed repairs with warranties." items={['iPhone 14 back glass repair', 'LG fridge compressor service', 'PS5 HDMI port repair']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
  }
}

function TabStack({
  tab,
  setScreen,
  theme,
  setTheme,
  requestDraft,
  hasSubmittedRequest,
}: {
  tab: RootTab;
  setScreen: (screen: AppScreen) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  requestDraft: RepairRequestDraft;
  hasSubmittedRequest: boolean;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {tab === 'Home' ? (
        <HomeScreen
          onCreateRequest={() => setScreen({ name: 'create-step-1' })}
          onMessageShop={() => setScreen({ name: 'chat' })}
          theme={theme}
        />
      ) : null}
      {tab === 'Explore' ? (
        <ExploreScreen
          draft={requestDraft}
          showRecommendations={hasSubmittedRequest}
          onOpenBusiness={() => setScreen({ name: 'business-profile' })}
          theme={theme}
        />
      ) : null}
      {tab === 'Market' ? <MarketScreen theme={theme} /> : null}
      {tab === 'TechCare' ? <TechCareScreen theme={theme} /> : null}
      {tab === 'Profile' ? (
        <ProfileScreen
          onEditProfile={() => setScreen({ name: 'edit-profile' })}
          onSettings={() => setScreen({ name: 'settings' })}
          onHelp={() => setScreen({ name: 'help' })}
          onHistory={() => setScreen({ name: 'repair-history' })}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          theme={theme}
        />
      ) : null}
    </ScrollView>
  );
}
