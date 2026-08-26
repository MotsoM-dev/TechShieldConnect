import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  CenterScreen,
  InfoCard,
  MenuRow,
  Section,
  StackButton,
  StepIndicator,
  TextArea,
  WizardShell,
} from '../shared/components/ui';
import { deviceBrandOptions, eastLondonAreas, issueChips, quotes } from '../shared/data/mockData';
import { estimateHoursFor, formatDuration, formatEta, pickShopFor } from '../shared/lib/repair';
import { styles } from '../shared/theme/styles';
import type { ConfirmedRequest, RepairRequestDraft, ThemeMode } from '../shared/types/navigation';

/** Three input steps plus the confirmation step. */
const TOTAL_STEPS = 4;

type DraftStepProps = {
  draft: RepairRequestDraft;
  setDraft: (draft: RepairRequestDraft) => void;
  onNext: () => void;
  onBack: () => void;
  theme?: ThemeMode;
};

export function CreateStepOne({ draft, setDraft, onNext, onBack, theme }: DraftStepProps) {
  const brandOptions = deviceBrandOptions[draft.deviceCategory] ?? deviceBrandOptions.Other;
  const showingCustomBrand = !brandOptions.includes(draft.brand) || draft.brand === 'Other';

  const handleDeviceCategorySelect = (deviceCategory: string) => {
    const nextBrandOptions = deviceBrandOptions[deviceCategory] ?? deviceBrandOptions.Other;
    const brand = nextBrandOptions.includes(draft.brand) ? draft.brand : nextBrandOptions[0];
    setDraft({ ...draft, deviceCategory, brand });
  };

  return (
    <WizardShell
      title="Select your device"
      subtitle="Tell us what needs fixing so shops can quote accurately."
      onBack={onBack}
      onNext={onNext}
      nextLabel="Continue"
      step={1}
      totalSteps={TOTAL_STEPS}
      theme={theme}
    >
      <SelectableChips
        theme={theme}
        title="Device Categories"
        options={['Phone', 'Laptop', 'Tablet', 'Other']}
        selected={draft.deviceCategory}
        onSelect={handleDeviceCategorySelect}
      />
      <SelectableChips
        theme={theme}
        title="Common Brands"
        options={brandOptions}
        selected={showingCustomBrand ? 'Other' : draft.brand}
        onSelect={(brand) => setDraft({ ...draft, brand })}
      />
      {showingCustomBrand ? (
        <View style={[styles.sectionCard, theme === 'light' && styles.lightSurface]}>
          <Text style={[styles.sectionTitle, theme === 'light' && styles.darkReadableText]}>Enter Brand</Text>
          <TextInput
            style={[styles.singleLineInput, theme === 'light' && styles.chatInputLight]}
            placeholder="Type your device brand"
            placeholderTextColor={theme === 'light' ? '#8b93b8' : '#8f98c7'}
            value={draft.brand === 'Other' ? '' : draft.brand}
            onChangeText={(customBrand) => setDraft({ ...draft, brand: customBrand })}
          />
        </View>
      ) : null}
    </WizardShell>
  );
}

export function CreateStepTwo({ draft, setDraft, onNext, onBack, theme }: DraftStepProps) {
  const light = theme === 'light';
  return (
    <WizardShell
      title="Describe the problem"
      subtitle="The more detail you give, the more accurate your quotes will be."
      onBack={onBack}
      onNext={onNext}
      nextLabel="Continue"
      step={2}
      totalSteps={TOTAL_STEPS}
      theme={theme}
    >
      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>What went wrong?</Text>
        <TextArea
          theme={theme}
          value={draft.problemDescription}
          onChangeText={(problemDescription) => setDraft({ ...draft, problemDescription })}
        />
      </View>
      <SelectableChips
        theme={theme}
        title="Common Issues"
        options={issueChips}
        selected={draft.issue}
        onSelect={(issue) => setDraft({ ...draft, issue })}
      />
      <PhotoUploadCard theme={theme} />
    </WizardShell>
  );
}

function PhotoUploadCard({ theme }: { theme?: ThemeMode }) {
  const light = theme === 'light';
  return (
    <View style={[styles.sectionCard, light && styles.lightSurface]}>
      <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Upload Damage Photos</Text>
      <Text style={[styles.uploadHint, light && styles.darkReadableMuted]}>
        Add clear photos of the device so shops can quote accurately.
      </Text>
      <View style={styles.uploadCard}>
        <Ionicons name="camera" size={30} color="#7bd2ff" />
        <Text style={[styles.uploadTitle, light && styles.darkReadableText]}>Add photos</Text>
        <Text style={[styles.uploadMeta, light && styles.darkReadableMuted]}>
          Photo upload will be available soon
        </Text>
      </View>
    </View>
  );
}

export function CreateStepThree({ draft, setDraft, onNext, onBack, theme }: DraftStepProps) {
  return (
    <WizardShell
      title="Location and preferences"
      subtitle="We match you to verified shops near you that fit your budget."
      onBack={onBack}
      onNext={onNext}
      nextLabel="Review Request"
      step={3}
      totalSteps={TOTAL_STEPS}
      theme={theme}
    >
      <SelectableChips
        theme={theme}
        title="East London Area"
        options={eastLondonAreas}
        selected={draft.area}
        onSelect={(area) => setDraft({ ...draft, area })}
      />
      <SelectableChips
        theme={theme}
        title="Preferred Date / Time"
        options={['Today afternoon', 'Tomorrow morning', 'This weekend']}
        selected={draft.preferredTime}
        onSelect={(preferredTime) => setDraft({ ...draft, preferredTime })}
      />
      <SelectableChips
        theme={theme}
        title="Budget Range (Optional)"
        options={['Under R500', 'R500 - R1500', 'R1500+']}
        selected={draft.budget}
        onSelect={(budget) => setDraft({ ...draft, budget })}
      />
    </WizardShell>
  );
}

function SelectableChips({
  title,
  options,
  selected,
  onSelect,
  theme,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  return (
    <View style={[styles.sectionCard, light && styles.lightSurface]}>
      <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>{title}</Text>
      <View style={styles.chipWrap}>
        {options.map((option) => {
          const active = option === selected;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.82}
              onPress={() => onSelect(option)}
              style={[styles.chip, light && styles.chipLight, active && styles.chipSelected]}
            >
              <Text style={[styles.chipText, light && !active && styles.darkReadableText]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/** Final step: review everything, see who will do it and how long, then confirm. */
export function RequestConfirm({
  draft,
  onConfirm,
  onBack,
  theme,
}: {
  draft: RepairRequestDraft;
  onConfirm: () => void;
  onBack: () => void;
  theme?: ThemeMode;
}) {
  const light = theme === 'light';
  const shop = pickShopFor(draft.area);
  const turnaround = `About ${formatDuration(estimateHoursFor(draft.issue))}`;

  return (
    <ScrollView contentContainerStyle={styles.formScreen} showsVerticalScrollIndicator={false}>
      <View style={styles.formHeader}>
        <Text style={styles.formEyebrow}>Repair request</Text>
        <Text style={[styles.formTitle, light && styles.darkReadableText]}>Confirm your request</Text>
        <Text style={[styles.formSubtitle, light && styles.darkReadableMuted]}>
          Check the details below. Once confirmed you can track progress from the Home screen.
        </Text>
        <StepIndicator step={4} total={TOTAL_STEPS} theme={theme} />
      </View>

      <View style={styles.stackGap}>
        <View style={[styles.sectionCard, light && styles.lightSurface]}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Your device</Text>
          <InfoCard
            theme={theme}
            rows={[
              ['Device', `${draft.brand} ${draft.deviceCategory}`],
              ['Problem', draft.issue],
              ['Description', draft.problemDescription],
            ]}
          />
        </View>

        <View style={[styles.sectionCard, light && styles.lightSurface]}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Assigned shop</Text>
          <MenuRow theme={theme} first icon="storefront" label={shop.name} value={`${shop.rating.toFixed(1)} rating`} />
          <MenuRow theme={theme} icon="location" label="Area" value={shop.area} />
          <MenuRow theme={theme} icon="time" label="Estimated turnaround" value={turnaround} />
          <MenuRow theme={theme} icon="chatbubble-ellipses" label="Response time" value={shop.responseTime} />
        </View>

        <View style={[styles.sectionCard, light && styles.lightSurface]}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Preferences</Text>
          <InfoCard
            theme={theme}
            rows={[
              ['Area', draft.area],
              ['Preferred time', draft.preferredTime],
              ['Budget', draft.budget],
            ]}
          />
        </View>

        <View style={styles.row}>
          <StackButton theme={theme} label="Back" onPress={onBack} compact />
          <StackButton theme={theme} label="Confirm Request" onPress={onConfirm} compact />
        </View>
      </View>
    </ScrollView>
  );
}

export function SubmittedScreen({
  onViewRequests,
  request,
  theme,
}: {
  onViewRequests: () => void;
  request: ConfirmedRequest | null;
  theme?: ThemeMode;
}) {
  return (
    <CenterScreen
      eyebrow="All done"
      title="Request confirmed"
      subtitle="Your repair is booked. Track the progress any time from the Home screen."
      theme={theme}
    >
      <View style={[styles.sectionCard, theme === 'light' && styles.lightSurface]}>
        <MenuRow theme={theme} first icon="checkmark-circle" label="Reference" value={request?.reference ?? '-'} />
        <MenuRow theme={theme} icon="storefront" label="Shop" value={request?.shopName ?? '-'} />
        <MenuRow
          theme={theme}
          icon="time"
          label="Ready by"
          value={request ? formatEta(request) : '-'}
        />
        <MenuRow theme={theme} icon="notifications" label="Updates" value="In app + chat" />
      </View>
      <StackButton theme={theme} label="Track on Home" onPress={onViewRequests} />
    </CenterScreen>
  );
}

export function RequestDetails({
  onBack,
  onViewQuotes,
  onTrack,
  theme,
}: {
  onBack: () => void;
  onViewQuotes: () => void;
  onTrack: () => void;
  theme?: ThemeMode;
}) {
  return (
    <CenterScreen
      eyebrow="Repair request"
      title="Request details"
      subtitle="Device info, photos, and the full repair timeline."
      theme={theme}
    >
      <InfoCard theme={theme} rows={[['Device', 'Samsung A54'], ['Status', 'Quoted'], ['Estimated', '2 days']]} />
      <Section theme={theme} title="Timeline" chips={['Request', 'Quoted', 'Booked', 'In Progress', 'Completed']} />
      <View style={styles.row}>
        <StackButton theme={theme} label="View Quotes" onPress={onViewQuotes} compact />
        <StackButton theme={theme} label="Track Repair" onPress={onTrack} compact />
      </View>
      <StackButton theme={theme} label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function QuotesList({
  onBack,
  onOpenBusiness,
  onAccept,
  theme,
}: {
  onBack: () => void;
  onOpenBusiness: () => void;
  onAccept: () => void;
  theme?: ThemeMode;
}) {
  return (
    <CenterScreen
      eyebrow="Compare"
      title="Your quotes"
      subtitle="Compare offers from repair businesses before you commit."
      theme={theme}
    >
      <Section theme={theme} title="Quotes" items={quotes} onItemPress={onOpenBusiness} />
      <View style={styles.row}>
        <StackButton theme={theme} label="Accept Quote" onPress={onAccept} compact />
        <StackButton theme={theme} label="Back" onPress={onBack} compact />
      </View>
    </CenterScreen>
  );
}

export function BusinessProfile({
  onBack,
  onChat,
  onAccept,
  theme,
}: {
  onBack: () => void;
  onChat: () => void;
  onAccept: () => void;
  theme?: ThemeMode;
}) {
  return (
    <CenterScreen
      eyebrow="Verified shop"
      title="Business profile"
      subtitle="Ratings, reviews, services, and response time."
      theme={theme}
    >
      <Section
        theme={theme}
        title="Services"
        chips={['Screen repair', 'Battery replacement', 'Water damage', 'Motherboard repair']}
      />
      <Section
        theme={theme}
        title="Reviews"
        items={['4.9 average rating', 'Fast response time', 'Professional communication']}
      />
      <View style={styles.row}>
        <StackButton theme={theme} label="Chat" onPress={onChat} compact />
        <StackButton theme={theme} label="Accept Quote" onPress={onAccept} compact />
      </View>
      <StackButton theme={theme} label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function AcceptConfirmation({ onDone, theme }: { onDone: () => void; theme?: ThemeMode }) {
  return (
    <CenterScreen
      eyebrow="Almost there"
      title="Confirm your booking"
      subtitle="Check the details below, then finalise the booking."
      theme={theme}
    >
      <InfoCard
        theme={theme}
        rows={[['Business', 'FixPro Electronics'], ['Price', 'R850'], ['Estimated days', '2']]}
      />
      <StackButton theme={theme} label="Confirm Booking" onPress={onDone} />
    </CenterScreen>
  );
}
