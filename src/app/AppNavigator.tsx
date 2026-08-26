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
  RequestConfirm,
  RequestDetails,
  SubmittedScreen,
} from '../screens/RequestFlow';
import { ChatScreen, SimpleListScreen, TrackingScreen, WarrantyScreen } from '../screens/SupportScreens';
import { activeRepair } from '../shared/data/mockData';
import { buildConfirmedRequest } from '../shared/lib/repair';
import { styles } from '../shared/theme/styles';
import type {
  AppScreen,
  ConfirmedRequest,
  RepairRequestDraft,
  RootTab,
  ThemeMode,
} from '../shared/types/navigation';

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
  const [confirmedRequest, setConfirmedRequest] = useState<ConfirmedRequest | null>(null);
  // The shop the user picked for this request; the top bar chat opens this conversation.
  const [selectedShopName, setSelectedShopName] = useState(activeRepair.shop);

  const confirmRequest = () => {
    const confirmed = buildConfirmedRequest(requestDraft);
    setConfirmedRequest(confirmed);
    setSelectedShopName(confirmed.shopName);
    setScreen({ name: 'request-submitted' });
  };

  if (screen.name === 'tabs') {
    return (
      <TabStack
        tab={screen.tab}
        setScreen={setScreen}
        theme={theme}
        setTheme={setTheme}
        requestDraft={requestDraft}
        confirmedRequest={confirmedRequest}
        onSelectShop={setSelectedShopName}
      />
    );
  }

  switch (screen.name) {
    case 'create-step-1':
      return <CreateStepOne theme={theme} draft={requestDraft} setDraft={setRequestDraft} onNext={() => setScreen({ name: 'create-step-2' })} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'create-step-2':
      return <CreateStepTwo theme={theme} draft={requestDraft} setDraft={setRequestDraft} onNext={() => setScreen({ name: 'create-step-3' })} onBack={() => setScreen({ name: 'create-step-1' })} />;
    case 'create-step-3':
      return <CreateStepThree theme={theme} draft={requestDraft} setDraft={setRequestDraft} onNext={() => setScreen({ name: 'request-confirm' })} onBack={() => setScreen({ name: 'create-step-2' })} />;
    case 'request-confirm':
      return <RequestConfirm theme={theme} draft={requestDraft} onConfirm={confirmRequest} onBack={() => setScreen({ name: 'create-step-3' })} />;
    case 'request-submitted':
      return <SubmittedScreen theme={theme} request={confirmedRequest} onViewRequests={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'request-details':
      return <RequestDetails theme={theme} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} onViewQuotes={() => setScreen({ name: 'quotes-list' })} onTrack={() => setScreen({ name: 'tracking' })} />;
    case 'quotes-list':
      return <QuotesList theme={theme} onBack={() => setScreen({ name: 'request-details' })} onOpenBusiness={() => setScreen({ name: 'business-profile' })} onAccept={() => setScreen({ name: 'accept-confirmation' })} />;
    case 'business-profile':
      return <BusinessProfile theme={theme} onBack={() => setScreen({ name: 'tabs', tab: 'Explore' })} onChat={() => setScreen({ name: 'chat' })} onAccept={() => setScreen({ name: 'accept-confirmation' })} />;
    case 'accept-confirmation':
      return <AcceptConfirmation theme={theme} onDone={() => setScreen({ name: 'tracking' })} />;
    case 'tracking':
      return <TrackingScreen theme={theme} request={confirmedRequest} onChat={() => setScreen({ name: 'chat' })} onWarranty={() => setScreen({ name: 'warranty' })} onBack={() => setScreen({ name: 'request-details' })} />;
    case 'chat':
      return <ChatScreen shopName={selectedShopName} theme={theme} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'warranty':
      return <WarrantyScreen theme={theme} onBack={() => setScreen({ name: 'tracking' })} />;
    case 'notifications':
      return <SimpleListScreen theme={theme} icon="notifications" title="Notifications" subtitle="Quotes received, status updates, and messages." items={['New quote from FixPro Electronics', 'Your request moved to In Progress', 'Message from Urban Tech Clinic']} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'edit-profile':
      return <SimpleListScreen theme={theme} icon="person" title="Edit Profile" subtitle="Update personal details and profile photo." items={['Full name', 'Email address', 'Phone number', 'Profile photo']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
    case 'settings':
      return <SimpleListScreen theme={theme} icon="settings" title="Settings" subtitle="Notifications, language, dark mode, and privacy." items={['Notifications preferences', 'Language', 'Dark mode', 'Privacy']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
    case 'help':
      return <SimpleListScreen theme={theme} icon="help-circle" title="Help & Support" subtitle="FAQs, contact support, and report a problem." items={['FAQs', 'Contact Support', 'Report a Problem']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
    case 'repair-history':
      return <SimpleListScreen theme={theme} icon="construct" title="Repair History" subtitle="Full list of completed repairs with warranties." items={['iPhone 14 back glass repair', 'LG fridge compressor service', 'PS5 HDMI port repair']} onBack={() => setScreen({ name: 'tabs', tab: 'Profile' })} />;
  }
}

function TabStack({
  tab,
  setScreen,
  theme,
  setTheme,
  requestDraft,
  confirmedRequest,
  onSelectShop,
}: {
  tab: RootTab;
  setScreen: (screen: AppScreen) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  requestDraft: RepairRequestDraft;
  confirmedRequest: ConfirmedRequest | null;
  onSelectShop: (shopName: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {tab === 'Home' ? (
        <HomeScreen
          onCreateRequest={() => setScreen({ name: 'create-step-1' })}
          onMessageShop={() => setScreen({ name: 'chat' })}
          onTrackRepair={() => setScreen({ name: 'tracking' })}
          confirmedRequest={confirmedRequest}
          theme={theme}
        />
      ) : null}
      {tab === 'Explore' ? (
        <ExploreScreen
          draft={requestDraft}
          showRecommendations={confirmedRequest !== null}
          onOpenBusiness={(shopName) => {
            onSelectShop(shopName);
            setScreen({ name: 'business-profile' });
          }}
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
