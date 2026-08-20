import { View } from 'react-native';
import { HeroCard, SearchCard, Section } from '../../../components/ui';
import { verifiedBusinesses } from '../../../data/mockData';
import { styles } from '../../../theme/styles';
import type { ThemeMode } from '../../../types/navigation';

type ExploreScreenProps = {
  onOpenBusiness: () => void;
  theme: ThemeMode;
};

export function ExploreScreen({ onOpenBusiness, theme }: ExploreScreenProps) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Find Repair Shops"
        body="Browse verified repair businesses by location, rating, and specialty."
        theme={theme}
      />
      <SearchCard theme={theme} />
      <Section theme={theme} title="Verified Businesses" items={verifiedBusinesses} onItemPress={onOpenBusiness} />
      <Section
        theme={theme}
        title="Platform Benefits"
        chips={['Trusted reviews', 'Transparent pricing', 'Instant booking', 'GPS locator']}
      />
    </View>
  );
}
