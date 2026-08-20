import { Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { RootTab, ThemeMode } from '../types/navigation';
import { TABS } from '../data/mockData';
import { styles } from '../theme/styles';

type SetScreenButtonProps = {
  label: string;
  onPress: () => void;
  compact?: boolean;
  theme?: ThemeMode;
};

export function TopBar({ theme }: { theme: ThemeMode }) {
  return (
    <View style={[styles.topBar, theme === 'light' && styles.topBarLight]}>
      <Text style={[styles.topBarTitle, theme === 'light' && styles.topBarTitleLight]}>TechShieldConnect</Text>
      <Text style={styles.topBarSubtitle}>Advanced Protection, Invisible Strength</Text>
    </View>
  );
}

export function BrandHeader({ theme, pulse }: { theme: ThemeMode; pulse: Animated.Value }) {
  return (
    <View style={[styles.brandBlock, theme === 'light' && styles.brandBlockLight]}>
      <Animated.Image
        source={require('../../assets/techShield-logo.jpg')}
        style={[
          styles.logo,
          {
            transform: [
              {
                scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }),
              },
            ],
          },
        ]}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.kicker}>TechShieldConnect</Text>
        <Text style={styles.tagline}>Advanced Protection, Invisible Strength</Text>
      </View>
    </View>
  );
}

export function HeroCard({ title, body, theme }: { title: string; body: string; theme?: ThemeMode }) {
  return (
    <View style={[styles.heroCard, theme === 'light' && styles.heroCardLight]}>
      <Text style={styles.heroLabel}>{title}</Text>
      <Text style={styles.heroBody}>{body}</Text>
    </View>
  );
}

export function ActionGrid({
  primary,
  secondary,
  onPrimary,
  onSecondary,
  theme,
}: {
  primary: string;
  secondary: string;
  onPrimary: () => void;
  onSecondary: () => void;
  theme?: ThemeMode;
}) {
  return (
    <View style={styles.row}>
      <StackButton theme={theme} label={primary} onPress={onPrimary} compact />
      <StackButton theme={theme} label={secondary} onPress={onSecondary} compact />
    </View>
  );
}

export function PromoBanner({ theme }: { theme: ThemeMode }) {
  return (
    <View style={[styles.promoCard, theme === 'light' && styles.promoCardLight]}>
      <Text style={[styles.promoLabel, theme === 'light' && styles.darkReadableMuted]}>Featured offer</Text>
      <Text style={[styles.promoText, theme === 'light' && styles.darkReadableText]}>
        Free diagnostic checks this week at selected verified shops.
      </Text>
    </View>
  );
}

export function SearchCard({ theme }: { theme: ThemeMode }) {
  return (
    <View style={[styles.searchCard, theme === 'light' && styles.lightSurface]}>
      <Text style={[styles.searchLabel, theme === 'light' && styles.darkReadableText]}>
        Search by suburb, rating, or specialty
      </Text>
      <View style={styles.searchLine} />
      <Text style={[styles.searchPlaceholder, theme === 'light' && styles.darkReadableMuted]}>
        phone repair near Sandton
      </Text>
    </View>
  );
}

export function Section({
  title,
  items,
  chips,
  onItemPress,
  theme,
}: {
  title: string;
  items?: string[];
  chips?: string[];
  onItemPress?: () => void;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  return (
    <View style={[styles.sectionCard, light && styles.lightSurface]}>
      <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>{title}</Text>
      <View style={styles.sectionBody}>
        {items?.map((item) => (
          <TouchableOpacity key={item} onPress={onItemPress} activeOpacity={0.85} style={styles.listItem}>
            <View style={styles.dot} />
            <Text style={[styles.listText, light && styles.darkReadableText]}>{item}</Text>
          </TouchableOpacity>
        ))}
        {chips ? (
          <View style={styles.chipWrap}>
            {chips.map((chip) => (
              <View key={chip} style={[styles.chip, light && styles.chipLight]}>
                <Text style={[styles.chipText, light && styles.darkReadableText]}>{chip}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function GlassToggle({ theme, onPress }: { theme: ThemeMode; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.glassToggle}>
      <View>
        <Text style={styles.glassLabel}>Theme</Text>
        <Text style={styles.glassValue}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</Text>
      </View>
      <View style={styles.themeIconWrap}>
        <Text style={styles.themeIcon}>{theme === 'dark' ? 'D' : 'L'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function InfoCard({ rows, theme }: { rows: [string, string][]; theme?: ThemeMode }) {
  const light = theme === 'light';
  return (
    <View style={[styles.infoCard, light && styles.lightSurface]}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.infoRow}>
          <Text style={[styles.infoLabel, light && styles.darkReadableMuted]}>{label}</Text>
          <Text style={[styles.infoValue, light && styles.darkReadableText]}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

export function StackButton({ label, onPress, compact, theme }: SetScreenButtonProps) {
  const light = theme === 'light';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.button, compact && styles.buttonCompact, light && styles.buttonLight]}
    >
      <Text style={[styles.buttonText, light && styles.buttonTextLight]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ChatMock({ theme }: { theme: ThemeMode }) {
  const light = theme === 'light';
  return (
    <View style={[styles.chatCard, light && styles.lightSurface]}>
      <View style={[styles.chatBubbleLeft, light && styles.chatBubbleLightLeft]}>
        <Text style={[styles.chatText, light && styles.darkReadableText]}>
          Hi, we received your request and the repair is on track.
        </Text>
      </View>
      <View style={[styles.chatBubbleRight, light && styles.chatBubbleLightRight]}>
        <Text style={styles.chatText}>Great, please let me know when parts are ready.</Text>
      </View>
    </View>
  );
}

export function TextArea() {
  return (
    <TextInput
      style={styles.input}
      placeholder="Describe the problem..."
      placeholderTextColor="#8f98c7"
      multiline
    />
  );
}

export function CenterScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollView contentContainerStyle={styles.centerScreen} showsVerticalScrollIndicator={false}>
      <Text style={styles.screenTitle}>{title}</Text>
      <Text style={styles.screenSubtitle}>{subtitle}</Text>
      <View style={styles.stackGap}>{children}</View>
    </ScrollView>
  );
}

export function WizardShell({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <ScrollView contentContainerStyle={styles.centerScreen} showsVerticalScrollIndicator={false}>
      <Text style={styles.screenTitle}>{title}</Text>
      <Text style={styles.screenSubtitle}>{subtitle}</Text>
      <View style={styles.stackGap}>
        {children}
        <View style={styles.row}>
          <StackButton label="Back" onPress={onBack} compact />
          <StackButton label={nextLabel} onPress={onNext} compact />
        </View>
      </View>
    </ScrollView>
  );
}

export function TabBar({
  activeTab,
  onChange,
  theme = 'dark',
}: {
  activeTab: RootTab;
  onChange: (tab: RootTab) => void;
  theme?: ThemeMode;
}) {
  return (
    <View style={[styles.tabBar, theme === 'light' ? styles.tabBarLight : styles.tabBarDark]}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onChange(tab)}
          style={[
            styles.tabButton,
            theme === 'light' ? styles.tabButtonLight : styles.tabButtonDark,
            tab === activeTab && (theme === 'light' ? styles.tabButtonActiveLight : styles.tabButtonActiveDark),
            tab === 'Home' && styles.tabButtonHome,
          ]}
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.tabIconWrap,
              theme === 'light' ? styles.tabIconWrapLight : styles.tabIconWrapDark,
              tab === activeTab && (theme === 'light' ? styles.tabIconWrapActiveLight : styles.tabIconWrapActiveDark),
              tab === 'Home' && styles.tabIconWrapHome,
            ]}
          >
            <Text style={[styles.tabIcon, theme === 'light' ? styles.tabIconLight : styles.tabIconDark]}>
              {tabIcon(tab)}
            </Text>
          </View>
          <Text
            style={[
              styles.tabLabel,
              theme === 'light' ? styles.tabLabelLight : styles.tabLabelDark,
              tab === activeTab && (theme === 'light' ? styles.tabLabelActiveLight : styles.tabLabelActiveDark),
              tab === 'Home' && styles.tabLabelHome,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function tabIcon(tab: RootTab) {
  switch (tab) {
    case 'Home':
      return 'H';
    case 'Chat':
      return 'C';
    case 'Explore':
      return 'E';
    case 'Profile':
      return 'P';
  }
}
