import { View } from 'react-native';
import { HeroCard, InfoCard, SearchCard, Section } from '../../../shared/components/ui';
import { verifiedBusinesses } from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { RepairRequestDraft, ThemeMode } from '../../../shared/types/navigation';

type ExploreScreenProps = {
  draft: RepairRequestDraft;
  onOpenBusiness: () => void;
  showRecommendations: boolean;
  theme: ThemeMode;
};

export function ExploreScreen({ draft, onOpenBusiness, showRecommendations, theme }: ExploreScreenProps) {
  const recommendedBusinesses = verifiedBusinesses.filter((business) => business.includes(draft.area)).slice(0, 3);
  const recommendations = recommendedBusinesses.length > 0 ? recommendedBusinesses : verifiedBusinesses.slice(0, 3);

  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Find Repair Shops"
        body="Browse verified repair businesses by location, rating, specialty, and your saved request details."
        theme={theme}
      />
      {showRecommendations ? (
        <InfoCard
          theme={theme}
          rows={[
            ['Saved request', `${draft.brand} ${draft.deviceCategory}`],
            ['Problem', draft.issue],
            ['Area', draft.area],
            ['Budget', draft.budget],
          ]}
        />
      ) : null}
      <SearchCard theme={theme} />
      {showRecommendations ? (
        <Section
          theme={theme}
          title={`Recommended in ${draft.area}`}
          items={recommendations}
          onItemPress={onOpenBusiness}
        />
      ) : null}
      <Section theme={theme} title="Verified Businesses" items={verifiedBusinesses} onItemPress={onOpenBusiness} />
      <Section
        theme={theme}
        title="Platform Benefits"
        chips={['Trusted reviews', 'Transparent pricing', 'Instant booking', 'GPS locator']}
      />
    </View>
  );
}
