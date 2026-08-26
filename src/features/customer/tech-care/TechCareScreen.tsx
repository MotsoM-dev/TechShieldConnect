import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { FilterChips, HeroCard, Section, StatTiles } from '../../../shared/components/ui';
import { techCareCategories, techCareGuides } from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { ThemeMode } from '../../../shared/types/navigation';

type TechCareScreenProps = {
  theme: ThemeMode;
};

export function TechCareScreen({ theme }: TechCareScreenProps) {
  const [category, setCategory] = useState('All');
  const light = theme === 'light';

  const guides = useMemo(
    () =>
      category === 'All' ? techCareGuides : techCareGuides.filter((guide) => guide.category === category),
    [category],
  );

  const stats = useMemo(() => {
    const completed = techCareGuides.filter((guide) => guide.progress === 100).length;
    const started = techCareGuides.filter((guide) => guide.progress > 0 && guide.progress < 100).length;
    return [
      { label: 'Completed', value: String(completed) },
      { label: 'In progress', value: String(started) },
      { label: 'Guides', value: String(techCareGuides.length) },
    ];
  }, []);

  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="TechCare"
        body="Learn how to protect your devices, avoid repair scams, understand warranties, and make smarter repair decisions."
        theme={theme}
      />

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Your learning</Text>
        <StatTiles stats={stats} theme={theme} />
      </View>

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <View style={styles.marketSectionHeader}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText, { marginBottom: 0 }]}>
            Care Guides
          </Text>
          <Text style={styles.marketSectionAction}>
            {guides.length} {guides.length === 1 ? 'guide' : 'guides'}
          </Text>
        </View>

        <FilterChips options={techCareCategories} selected={category} onSelect={setCategory} theme={theme} />

        <View style={{ marginTop: 6 }}>
          {guides.length === 0 ? (
            <Text style={[styles.emptyState, light && styles.darkReadableMuted]}>
              No guides in this category yet.
            </Text>
          ) : (
            guides.map((guide, index) => (
              <View key={guide.id} style={[styles.guideCard, index === 0 && styles.guideCardFirst]}>
                <View style={styles.guideIcon}>
                  <Ionicons name={guide.icon as keyof typeof Ionicons.glyphMap} size={20} color="#ff8ee4" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.guideTitle, light && styles.darkReadableText]}>{guide.title}</Text>
                  <Text style={[styles.guideBody, light && styles.darkReadableMuted]}>{guide.body}</Text>
                  <View style={styles.guideMetaRow}>
                    <Ionicons name="time-outline" size={12} color="#aebddd" />
                    <Text style={styles.guideDuration}>{guide.duration}</Text>
                    <Text style={styles.guideTag}>{guide.category}</Text>
                    {guide.progress === 100 ? <Text style={styles.guideDone}>Completed</Text> : null}
                  </View>
                  {guide.progress > 0 && guide.progress < 100 ? (
                    <View style={styles.guideProgressTrack}>
                      <View style={[styles.guideProgressFill, { width: `${guide.progress}%` }]} />
                    </View>
                  ) : null}
                </View>
              </View>
            ))
          )}
        </View>
      </View>

      <Section
        theme={theme}
        title="Coming Soon"
        chips={['Short videos', 'Device health quiz', 'Repair cost guides', 'Seasonal care reminders']}
      />
    </View>
  );
}
