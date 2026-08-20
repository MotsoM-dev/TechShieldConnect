import { View } from 'react-native';
import {
  ActionGrid,
  ChatMock,
  GlassToggle,
  HeroCard,
  InfoCard,
  PromoBanner,
  SearchCard,
  Section,
  StackButton,
} from '../components/ui';
import {
  featuredShops,
  recentRequests,
  requestFilters,
  verifiedBusinesses,
} from '../data/mockData';
import { styles } from '../theme/styles';
import type { ThemeMode } from '../types/navigation';

export function HomeTab({
  onCreate,
  onNotifications,
  theme,
}: {
  onCreate: () => void;
  onNotifications: () => void;
  theme: ThemeMode;
}) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Home Dashboard"
        body="Quick actions, recent requests, featured repair shops, and promotional banners."
        theme={theme}
      />
      <ActionGrid
        primary="Create Request"
        secondary="Notifications"
        onPrimary={onCreate}
        onSecondary={onNotifications}
        theme={theme}
      />
      <Section theme={theme} title="Recent Requests" items={recentRequests} />
      <Section theme={theme} title="Request Status Filters" chips={requestFilters} />
      <Section theme={theme} title="Featured Repair Shops" items={featuredShops} />
      <PromoBanner theme={theme} />
      <Section
        theme={theme}
        title="Future TechShield AI"
        chips={['Device health score', 'Battery prediction', 'Repair prediction', 'Cost estimation']}
      />
    </View>
  );
}

export function ChatTab({ theme }: { theme: ThemeMode }) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Chat"
        body="Converse with the repair shop owner, ask about quotes, and get live updates in one place."
        theme={theme}
      />
      <ChatMock theme={theme} />
      <Section
        theme={theme}
        title="Quick Replies"
        chips={['Share the quote', 'Any update on parts?', 'When can I drop off?', 'Please call me']}
      />
      <StackButton theme={theme} label="Open Conversation" onPress={() => {}} />
    </View>
  );
}

export function ExploreTab({
  onBusiness,
  theme,
}: {
  onBusiness: () => void;
  theme: ThemeMode;
}) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Find Repair Shops"
        body="Browse verified repair businesses by location, rating, and specialty."
        theme={theme}
      />
      <SearchCard theme={theme} />
      <Section theme={theme} title="Verified Businesses" items={verifiedBusinesses} onItemPress={onBusiness} />
      <Section
        theme={theme}
        title="Platform Benefits"
        chips={['Trusted reviews', 'Transparent pricing', 'Instant booking', 'GPS locator']}
      />
    </View>
  );
}

export function ProfileTab({
  onEdit,
  onSettings,
  onHelp,
  onHistory,
  theme,
  onToggleTheme,
}: {
  onEdit: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onHistory: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="My Profile"
        body="Personal info, repair history, warranties, settings, and logout."
        theme={theme}
      />
      <GlassToggle theme={theme} onPress={onToggleTheme} />
      <StackButton theme={theme} label="Edit Profile" onPress={onEdit} />
      <StackButton theme={theme} label="Settings" onPress={onSettings} />
      <StackButton theme={theme} label="Help & Support" onPress={onHelp} />
      <StackButton theme={theme} label="Repair History" onPress={onHistory} />
      <InfoCard
        theme={theme}
        rows={[
          ['Warranties', '3 active'],
          ['Repair history', '12 completed'],
          ['Account', 'Signed in'],
        ]}
      />
    </View>
  );
}
