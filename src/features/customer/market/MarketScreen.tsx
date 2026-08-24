import { View } from 'react-native';
import { HeroCard, PromoBanner, SearchCard, Section } from '../../../shared/components/ui';
import { marketDeals } from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { ThemeMode } from '../../../shared/types/navigation';

type MarketScreenProps = {
  theme: ThemeMode;
};

export function MarketScreen({ theme }: MarketScreenProps) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Market"
        body="Shop accessories, protection products, repair deals, and limited promotions from trusted TechShield partners."
        theme={theme}
      />
      <SearchCard theme={theme} />
      <Section theme={theme} title="Featured Deals" items={marketDeals} />
      <Section
        theme={theme}
        title="Shop Categories"
        chips={['Screen guards', 'Phone cases', 'Chargers', 'Cleaning kits', 'Repair specials', 'Warranty add-ons']}
      />
      <PromoBanner theme={theme} />
    </View>
  );
}
