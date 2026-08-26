import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { avatarInitials, CenterScreen, InfoCard, MenuRow, Section, StackButton } from '../shared/components/ui';
import { activeRepair, chatMessages, chatQuickReplies, repairShops } from '../shared/data/mockData';
import { repairProgress } from '../shared/lib/repair';
import { styles } from '../shared/theme/styles';
import type { ConfirmedRequest, ThemeMode } from '../shared/types/navigation';

export function TrackingScreen({
  onChat,
  onWarranty,
  onBack,
  request,
  theme,
}: {
  onChat: () => void;
  onWarranty: () => void;
  onBack: () => void;
  request: ConfirmedRequest | null;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  const live = request ? repairProgress(request) : null;

  // Fall back to the demo repair when the user has not confirmed a request yet.
  const device = request ? `${request.draft.brand} ${request.draft.deviceCategory}` : activeRepair.device;
  const shopName = request?.shopName ?? activeRepair.shop;
  const area = request?.shopArea ?? activeRepair.area;
  const percent = live?.percent ?? activeRepair.progress;
  const stage = live?.stage ?? activeRepair.stage;
  const eta = live?.etaLabel ?? activeRepair.estimate;

  return (
    <CenterScreen
      eyebrow="Live update"
      title="Repair tracking"
      subtitle="Follow progress and see the estimated completion time."
      theme={theme}
    >
      <View style={[styles.progressCard, light && styles.lightSurface]}>
        <View style={styles.homeCardHeader}>
          <View>
            <Text style={[styles.sectionTitle, light && styles.darkReadableText, { marginBottom: 0 }]}>
              {device}
            </Text>
            <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
              {shopName} - {area}
            </Text>
          </View>
          <Text style={styles.progressPercent}>{percent}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
          {stage} - {live ? live.remainingLabel : `estimated ${eta}`}
        </Text>
      </View>
      <Section theme={theme} title="Status Timeline" chips={['Request', 'Quoted', 'Booked', 'In Progress', 'Completed']} />
      <InfoCard
        theme={theme}
        rows={[
          ['Reference', request?.reference ?? '-'],
          ['Ready by', eta],
          ['Current stage', stage],
          ['Technician', shopName],
        ]}
      />
      <View style={styles.row}>
        <StackButton theme={theme} label="Chat" onPress={onChat} compact />
        <StackButton theme={theme} label="Digital Warranty" onPress={onWarranty} compact />
      </View>
      <StackButton theme={theme} label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

type ChatEntry = { id: string; from: string; text: string; time: string };

/** Author id for the current user's own messages. */
const MINE = 'me';

export function ChatScreen({
  onBack,
  shopName,
  theme = 'dark',
}: {
  onBack: () => void;
  shopName: string;
  theme?: ThemeMode;
}) {
  const [thread, setThread] = useState<ChatEntry[]>(() => chatMessages.map((message) => ({ ...message })));
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const light = theme === 'light';
  const shop = repairShops.find((item) => item.name === shopName);

  const send = (text: string) => {
    const body = text.trim();
    if (!body) return;
    setThread((current) => [
      ...current,
      {
        id: `msg-${Date.now()}`,
        from: MINE,
        text: body,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setDraft('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.chatScreen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={styles.chatTopRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onBack}
          style={[styles.chatBackButton, light && styles.chatBackButtonLight]}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={20} color={light ? '#131a3a' : '#ffffff'} />
        </TouchableOpacity>
        <View style={[styles.chatHeader, light && styles.chatHeaderLight, { flex: 1 }]}>
          <View style={styles.chatAvatar}>
            <Text style={styles.chatAvatarText}>{avatarInitials(shopName)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.chatShopName, light && styles.darkReadableText]} numberOfLines={1}>
              {shopName}
            </Text>
            <View style={styles.chatPresence}>
              <View style={styles.chatPresenceDot} />
              <Text style={styles.chatPresenceText} numberOfLines={1}>
                {shop ? `${shop.area} - ${shop.responseTime}` : 'Usually replies within an hour'}
              </Text>
            </View>
          </View>
          {shop?.verified ? <Ionicons name="shield-checkmark" size={18} color="#7bd2ff" /> : null}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatScroll}
        contentContainerStyle={styles.chatScrollContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        keyboardShouldPersistTaps="handled"
      >
        {thread.map((message) => {
          const mine = message.from === MINE;
          return (
            <View
              key={message.id}
              style={[styles.chatMessageRow, mine ? styles.chatRowRight : styles.chatRowLeft]}
            >
              <View
                style={
                  mine
                    ? [styles.chatBubbleRight, light && styles.chatBubbleLightRight, { marginLeft: 0 }]
                    : [styles.chatBubbleLeft, light && styles.chatBubbleLightLeft, { marginRight: 0 }]
                }
              >
                <Text style={[styles.chatText, light && !mine && styles.darkReadableText]}>{message.text}</Text>
              </View>
              <Text style={[styles.chatTime, mine && styles.chatTimeRight]}>{message.time}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={[styles.chatFooter, light && styles.chatFooterLight]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.chatQuickRow}>
            {chatQuickReplies.map((reply) => (
              <TouchableOpacity
                key={reply}
                activeOpacity={0.85}
                onPress={() => send(reply)}
                style={[styles.chatQuickChip, light && styles.chatQuickChipLight]}
              >
                <Text style={[styles.chatQuickText, light && styles.darkReadableText]}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.chatInputRow}>
          <TextInput
            style={[styles.chatInput, light && styles.chatInputLight]}
            placeholder={`Message ${shopName}...`}
            placeholderTextColor={light ? '#8b93b8' : '#8f98c7'}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => send(draft)}
            disabled={draft.trim().length === 0}
            style={[styles.chatSend, draft.trim().length === 0 && styles.chatSendDisabled]}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export function WarrantyScreen({ onBack, theme }: { onBack: () => void; theme?: ThemeMode }) {
  const light = theme === 'light';
  return (
    <CenterScreen
      eyebrow="Protected"
      title="Digital warranty"
      subtitle="Your post-repair warranty card, history, and receipt."
      theme={theme}
    >
      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <MenuRow theme={theme} first icon="shield-checkmark" label="Warranty period" value="90 days" />
        <MenuRow theme={theme} icon="receipt" label="Receipt" value="Available" />
        <MenuRow theme={theme} icon="construct" label="Repair history" value="Linked" />
      </View>
      <InfoCard
        theme={theme}
        rows={[
          ['Covered by', activeRepair.shop],
          ['Device', activeRepair.device],
          ['Valid until', 'Friday, 12 November 2026'],
        ]}
      />
      <StackButton theme={theme} label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function SimpleListScreen({
  title,
  subtitle,
  items,
  onBack,
  icon = 'ellipse',
  theme,
}: {
  title: string;
  subtitle: string;
  items: string[];
  onBack: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  return (
    <CenterScreen title={title} subtitle={subtitle} theme={theme}>
      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        {items.map((item, index) => (
          <MenuRow key={item} theme={theme} first={index === 0} icon={icon} label={item} onPress={() => {}} />
        ))}
      </View>
      <StackButton theme={theme} label="Back" onPress={onBack} />
    </CenterScreen>
  );
}
