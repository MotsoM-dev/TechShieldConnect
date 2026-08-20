import { Animated, ScrollView } from 'react-native';
import { BrandHeader } from '../components/ui';
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
import { ChatTab, ExploreTab, HomeTab, ProfileTab } from '../screens/Tabs';
import { ChatScreen, SimpleListScreen, TrackingScreen, WarrantyScreen } from '../screens/SupportScreens';
import { styles } from '../theme/styles';
import type { AppScreen, RootTab, ThemeMode } from '../types/navigation';

type NavigatorProps = {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  pulse: Animated.Value;
};

export function AppNavigator({ screen, setScreen, theme, setTheme, pulse }: NavigatorProps) {
  if (screen.name === 'tabs') {
    return (
      <TabStack
        tab={screen.tab}
        setScreen={setScreen}
        theme={theme}
        setTheme={setTheme}
        pulse={pulse}
      />
    );
  }

  switch (screen.name) {
    case 'create-step-1':
      return <CreateStepOne onNext={() => setScreen({ name: 'create-step-2' })} onBack={() => setScreen({ name: 'tabs', tab: 'Home' })} />;
    case 'create-step-2':
      return <CreateStepTwo onNext={() => setScreen({ name: 'create-step-3' })} onBack={() => setScreen({ name: 'create-step-1' })} />;
    case 'create-step-3':
      return <CreateStepThree onNext={() => setScreen({ name: 'request-submitted' })} onBack={() => setScreen({ name: 'create-step-2' })} />;
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
      return <ChatScreen onBack={() => setScreen({ name: 'tabs', tab: 'Chat' })} />;
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
  pulse,
}: {
  tab: RootTab;
  setScreen: (screen: AppScreen) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  pulse: Animated.Value;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <BrandHeader theme={theme} pulse={pulse} />
      {tab === 'Home' ? <HomeTab onCreate={() => setScreen({ name: 'create-step-1' })} onNotifications={() => setScreen({ name: 'notifications' })} theme={theme} /> : null}
      {tab === 'Chat' ? <ChatTab theme={theme} /> : null}
      {tab === 'Explore' ? <ExploreTab onBusiness={() => setScreen({ name: 'business-profile' })} theme={theme} /> : null}
      {tab === 'Profile' ? <ProfileTab onEdit={() => setScreen({ name: 'edit-profile' })} onSettings={() => setScreen({ name: 'settings' })} onHelp={() => setScreen({ name: 'help' })} onHistory={() => setScreen({ name: 'repair-history' })} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /> : null}
    </ScrollView>
  );
}
