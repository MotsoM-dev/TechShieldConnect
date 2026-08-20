import { View } from 'react-native';
import { ActionGrid, HeroCard, PromoBanner, Section } from '../../../components/ui';
import { featuredShops, recentRequests, requestFilters } from '../../../data/mockData';
import { styles } from '../../../theme/styles';
import type { ThemeMode } from '../../../types/navigation';

type HomeScreenProps = {
  onCreateRequest: () => void;
  onNotifications: () => void;
  theme: ThemeMode;
};

export function HomeScreen({ onCreateRequest, onNotifications, theme }: HomeScreenProps) {
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
        onPrimary={onCreateRequest}
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
