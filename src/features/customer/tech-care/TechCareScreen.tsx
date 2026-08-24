import { View } from 'react-native';
import { HeroCard, Section } from '../../../shared/components/ui';
import { techCareLessons } from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { ThemeMode } from '../../../shared/types/navigation';

type TechCareScreenProps = {
  theme: ThemeMode;
};

export function TechCareScreen({ theme }: TechCareScreenProps) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="TechCare"
        body="Learn how to protect your devices, avoid repair scams, understand warranties, and make smarter repair decisions."
        theme={theme}
      />
      <Section theme={theme} title="Care Guides" items={techCareLessons} />
      <Section
        theme={theme}
        title="Learning Paths"
        chips={['Device safety', 'Repair basics', 'Warranty tips', 'Maintenance routines', 'Buying advice']}
      />
      <Section
        theme={theme}
        title="Coming Soon"
        chips={['Short videos', 'Device health quiz', 'Repair cost guides', 'Seasonal care reminders']}
      />
    </View>
  );
}
