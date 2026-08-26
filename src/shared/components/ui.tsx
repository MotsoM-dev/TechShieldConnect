import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Image, ImageBackground, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { RootTab, ThemeMode } from '../types/navigation';
import { notifications, TABS } from '../data/mockData';
import { styles } from '../theme/styles';

type SetScreenButtonProps = {
  label: string;
  onPress: () => void;
  compact?: boolean;
  theme?: ThemeMode;
};

export function TopBar({ theme, onOpenChat }: { theme: ThemeMode; onOpenChat?: () => void }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const light = theme === 'light';

  return (
    <View style={[styles.topBar, theme === 'light' && styles.topBarLight]}>
      <Image
        source={
          light
            ? require('../../../assets/techShield-logo-light.png')
            : require('../../../assets/techShield-logo.jpg')
        }
        style={[styles.topBarLogo, light && styles.topBarLogoLight]}
        resizeMode="contain"
      />
      <Text style={[styles.topBarTitle, theme === 'light' && styles.topBarTitleLight]}>TechShieldConnect</Text>
      {onOpenChat ? (
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={onOpenChat}
          style={[styles.topBarChat, light && styles.topBarChatLight]}
          accessibilityRole="button"
          accessibilityLabel="Open chat with your repair shop"
        >
          <Ionicons name="chatbubble-ellipses" size={21} color={light ? '#131a3a' : '#ffffff'} />
          <View style={styles.topBarAlertBadge} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => setNotificationsOpen(true)}
        style={[styles.topBarAlert, theme === 'light' && styles.topBarAlertLight]}
        accessibilityRole="button"
        accessibilityLabel="Open notifications"
      >
        <Ionicons name="notifications" size={22} color={light ? '#131a3a' : '#ffffff'} />
        <View style={styles.topBarAlertBadge} />
      </TouchableOpacity>
      <Modal
        visible={notificationsOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setNotificationsOpen(false)}
      >
        <TouchableOpacity activeOpacity={1} style={styles.notificationBackdrop} onPress={() => setNotificationsOpen(false)}>
          <View style={[styles.notificationDropdown, light && styles.notificationDropdownLight]}>
            <Text style={[styles.notificationTitle, light && styles.darkReadableText]}>Notifications</Text>
            {notifications.map((notification) => (
              <View key={notification} style={styles.notificationItem}>
                <View style={styles.notificationDot} />
                <Text style={[styles.notificationText, light && styles.darkReadableText]}>{notification}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
        phone repair near Beacon Bay
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

export type CarouselCard = {
  key: string;
  imageUrl: string;
  title: string;
  meta?: string;
  caption?: string;
  badge?: string;
  initials?: string;
};

/**
 * Horizontally drifting card rail shared by Home (Promoted, Specials Near You)
 * and Market (Shop Specials) so all three read as the same component.
 */
export function MediaCarousel({
  title,
  cards,
  variant = 'promoted',
  motion,
  theme,
  onCardPress,
}: {
  title: string;
  cards: CarouselCard[];
  variant?: 'promoted' | 'special';
  motion?: Animated.Value;
  theme?: ThemeMode;
  onCardPress?: (card: CarouselCard) => void;
}) {
  const light = theme === 'light';
  const special = variant === 'special';

  return (
    <View style={styles.carouselBlock}>
      <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.carouselRow,
            motion
              ? {
                  transform: [
                    { translateX: motion.interpolate({ inputRange: [0, 1], outputRange: [0, special ? -52 : -78] }) },
                  ],
                }
              : null,
          ]}
        >
          {[...cards, ...cards].map((card, index) => (
            <TouchableOpacity
              key={`${card.key}-${index}`}
              activeOpacity={onCardPress ? 0.86 : 1}
              onPress={onCardPress ? () => onCardPress(card) : undefined}
              style={[special ? styles.specialCard : styles.promotedCard, light && styles.promotedCardLight]}
            >
              <ImageBackground
                source={{ uri: card.imageUrl }}
                style={special ? styles.specialImage : styles.promotedImage}
                imageStyle={styles.cardImageRadius}
              >
                <View style={styles.imageShade} />
                {card.initials ? <View style={styles.imageGlassOrb} /> : null}
                {card.badge ? <Text style={styles.specialPrice}>{card.badge}</Text> : null}
                {card.initials ? <Text style={styles.imageInitials}>{card.initials}</Text> : null}
              </ImageBackground>
              <Text style={[styles.cardTitle, light && styles.darkReadableText]}>{card.title}</Text>
              {card.meta ? (
                <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>{card.meta}</Text>
              ) : null}
              {card.caption ? (
                <Text style={[styles.cardCaption, light && styles.darkReadableMuted]}>{card.caption}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

/** Horizontally scrolling single-select chip row, shared by every filter in the app. */
export function FilterChips({
  options,
  selected,
  onSelect,
  theme,
}: {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.marketFilterRow}>
        {options.map((option) => {
          const active = option === selected;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.85}
              onPress={() => onSelect(option)}
              style={[styles.chip, light && styles.chipLight, active && styles.chipSelected]}
            >
              <Text style={[styles.chipText, light && !active && styles.darkReadableText]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

export type ListingCardItem = {
  imageUrl: string;
  title: string;
  price: string;
  /** Pink pill under the title: device condition, or stock state for products. */
  condition?: string;
  detail?: string;
  footnote?: string;
  personName?: string;
  personRating?: number;
  verified?: boolean;
};

/** Grid tile used for device listings in Market and for devices/products in Explore. */
export function ListingCard({
  item,
  theme,
  onPress,
}: {
  item: ListingCardItem;
  theme: ThemeMode;
  onPress: () => void;
}) {
  const light = theme === 'light';

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      style={[styles.listingCard, light && styles.listingCardLight]}
    >
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.listingImage}
        imageStyle={styles.listingImageRadius}
      >
        <View style={styles.imageShade} />
        <View style={styles.listingBadgeRow}>
          {item.verified ? (
            <View style={styles.listingVerified}>
              <Ionicons name="shield-checkmark" size={11} color="#7bd2ff" />
              <Text style={styles.listingVerifiedText}>Verified</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.listingPrice}>{item.price}</Text>
      </ImageBackground>

      <View style={styles.listingBody}>
        <Text style={[styles.listingTitle, light && styles.darkReadableText]} numberOfLines={2}>
          {item.title}
        </Text>
        {item.condition ? (
          <View style={styles.listingConditionPill}>
            <Text style={styles.listingConditionText}>{item.condition}</Text>
          </View>
        ) : null}
        {item.detail ? (
          <Text style={[styles.listingDetail, light && styles.darkReadableMuted]} numberOfLines={2}>
            {item.detail}
          </Text>
        ) : null}
        {item.footnote ? (
          <Text style={[styles.listingDetail, light && styles.darkReadableMuted]}>{item.footnote}</Text>
        ) : null}
        {item.personName ? (
          <View style={styles.listingSellerRow}>
            <View style={styles.listingAvatar}>
              <Text style={styles.listingAvatarText}>{avatarInitials(item.personName)}</Text>
            </View>
            <Text style={[styles.listingSellerName, light && styles.darkReadableText]} numberOfLines={1}>
              {item.personName}
            </Text>
            {item.personRating !== undefined ? (
              <Text style={styles.listingRatingText}>{item.personRating.toFixed(1)}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export function avatarInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function StarRating({
  rating,
  size = 14,
  onChange,
}: {
  rating: number;
  size?: number;
  onChange?: (rating: number) => void;
}) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          activeOpacity={onChange ? 0.7 : 1}
          onPress={onChange ? () => onChange(star) : undefined}
          disabled={!onChange}
          accessibilityRole={onChange ? 'button' : 'image'}
          accessibilityLabel={onChange ? `Rate ${star} out of 5` : `${rating} out of 5 stars`}
        >
          <Ionicons name={star <= rating ? 'star' : 'star-outline'} size={size} color="#ffc75f" />
        </TouchableOpacity>
      ))}
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

export function TextArea({
  value,
  onChangeText,
  theme,
}: {
  value?: string;
  onChangeText?: (value: string) => void;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  return (
    <TextInput
      style={[styles.input, light && styles.chatInputLight]}
      placeholder="Describe the problem..."
      placeholderTextColor={light ? '#8b93b8' : '#8f98c7'}
      value={value}
      onChangeText={onChangeText}
      multiline
    />
  );
}

export function ScreenHeader({
  title,
  subtitle,
  eyebrow,
  theme,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  return (
    <View style={styles.formHeader}>
      {eyebrow ? <Text style={styles.formEyebrow}>{eyebrow}</Text> : null}
      <Text style={[styles.formTitle, light && styles.darkReadableText]}>{title}</Text>
      <Text style={[styles.formSubtitle, light && styles.darkReadableMuted]}>{subtitle}</Text>
    </View>
  );
}

/** Stacked screen that sits below the top bar. */
export function CenterScreen({
  title,
  subtitle,
  eyebrow,
  children,
  theme,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: React.ReactNode;
  theme?: ThemeMode;
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenScroll} showsVerticalScrollIndicator={false}>
      <ScreenHeader title={title} subtitle={subtitle} eyebrow={eyebrow} theme={theme} />
      <View style={styles.stackGap}>{children}</View>
    </ScrollView>
  );
}

export function StepIndicator({ step, total, theme }: { step: number; total: number; theme?: ThemeMode }) {
  const light = theme === 'light';
  return (
    <View>
      <View style={styles.stepTrack}>
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            style={[
              styles.stepSegment,
              light && styles.stepSegmentLight,
              index < step && styles.stepSegmentActive,
            ]}
          />
        ))}
      </View>
      <Text style={styles.stepCount}>
        Step {step} of {total}
      </Text>
    </View>
  );
}

/** Full-screen form step. Renders without the top bar, so it uses its own top padding. */
export function WizardShell({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel,
  step,
  totalSteps,
  theme,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  step: number;
  totalSteps: number;
  theme?: ThemeMode;
}) {
  return (
    <ScrollView contentContainerStyle={styles.formScreen} showsVerticalScrollIndicator={false}>
      <View style={styles.formHeader}>
        <Text style={styles.formEyebrow}>Repair request</Text>
        <Text style={[styles.formTitle, theme === 'light' && styles.darkReadableText]}>{title}</Text>
        <Text style={[styles.formSubtitle, theme === 'light' && styles.darkReadableMuted]}>{subtitle}</Text>
        <StepIndicator step={step} total={totalSteps} theme={theme} />
      </View>
      <View style={styles.stackGap}>
        {children}
        <View style={styles.row}>
          <StackButton theme={theme} label="Back" onPress={onBack} compact />
          <StackButton theme={theme} label={nextLabel} onPress={onNext} compact />
        </View>
      </View>
    </ScrollView>
  );
}

export function MenuRow({
  icon,
  label,
  value,
  onPress,
  first,
  theme,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  first?: boolean;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.menuRow, first && styles.menuRowFirst]}
    >
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={18} color="#7bd2ff" />
      </View>
      <Text style={[styles.menuLabel, light && styles.darkReadableText]}>{label}</Text>
      {value ? <Text style={styles.menuValue}>{value}</Text> : null}
      {onPress ? <Ionicons name="chevron-forward" size={17} color={light ? '#47516f' : '#aebddd'} /> : null}
    </TouchableOpacity>
  );
}

export function StatTiles({ stats, theme }: { stats: { label: string; value: string }[]; theme?: ThemeMode }) {
  const light = theme === 'light';
  return (
    <View style={styles.statRow}>
      {stats.map((stat) => (
        <View key={stat.label} style={[styles.statTile, light && styles.statTileLight]}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={[styles.statLabel, light && styles.darkReadableMuted]}>{stat.label}</Text>
        </View>
      ))}
    </View>
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
            tab === activeTab && tab === 'Home' && styles.tabButtonHomeActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.tabLabel,
              theme === 'light' ? styles.tabLabelLight : styles.tabLabelDark,
              tab === activeTab && (theme === 'light' ? styles.tabLabelActiveLight : styles.tabLabelActiveDark),
              tab === 'Home' && styles.tabLabelHome,
              tab === activeTab && tab === 'Home' && styles.tabLabelHomeActive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
