import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CenterScreen, InfoCard, Section, StackButton, TextArea, WizardShell } from '../shared/components/ui';
import { deviceBrandOptions, eastLondonAreas, issueChips, quotes } from '../shared/data/mockData';
import { styles } from '../shared/theme/styles';
import type { RepairRequestDraft } from '../shared/types/navigation';

type DraftStepProps = {
  draft: RepairRequestDraft;
  setDraft: (draft: RepairRequestDraft) => void;
  onNext: () => void;
  onBack: () => void;
};

export function CreateStepOne({ draft, setDraft, onNext, onBack }: DraftStepProps) {
  const brandOptions = deviceBrandOptions[draft.deviceCategory] ?? deviceBrandOptions.Other;
  const showingCustomBrand = !brandOptions.includes(draft.brand) || draft.brand === 'Other';

  const handleDeviceCategorySelect = (deviceCategory: string) => {
    const nextBrandOptions = deviceBrandOptions[deviceCategory] ?? deviceBrandOptions.Other;
    const brand = nextBrandOptions.includes(draft.brand) ? draft.brand : nextBrandOptions[0];
    setDraft({ ...draft, deviceCategory, brand });
  };

  return (
    <WizardShell title="Create Request - Step 1" subtitle="Select Device" onBack={onBack} onNext={onNext} nextLabel="Continue">
      <SelectableChips
        title="Device Categories"
        options={['Phone', 'Laptop', 'Tablet', 'Other']}
        selected={draft.deviceCategory}
        onSelect={handleDeviceCategorySelect}
      />
      <SelectableChips
        title="Common Brands"
        options={brandOptions}
        selected={showingCustomBrand ? 'Other' : draft.brand}
        onSelect={(brand) => setDraft({ ...draft, brand })}
      />
      {showingCustomBrand ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Enter Brand</Text>
          <TextInput
            style={styles.singleLineInput}
            placeholder="Type your device brand"
            placeholderTextColor="#8f98c7"
            value={draft.brand === 'Other' ? '' : draft.brand}
            onChangeText={(customBrand) => setDraft({ ...draft, brand: customBrand })}
          />
        </View>
      ) : null}
    </WizardShell>
  );
}

export function CreateStepTwo({ draft, setDraft, onNext, onBack }: DraftStepProps) {
  return (
    <WizardShell title="Create Request - Step 2" subtitle="Describe Problem" onBack={onBack} onNext={onNext} nextLabel="Continue">
      <TextArea
        value={draft.problemDescription}
        onChangeText={(problemDescription) => setDraft({ ...draft, problemDescription })}
      />
      <SelectableChips
        title="Common Issue Chips"
        options={issueChips}
        selected={draft.issue}
        onSelect={(issue) => setDraft({ ...draft, issue })}
      />
      <PhotoUploadCard />
    </WizardShell>
  );
}

function PhotoUploadCard() {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Upload Damage Photos</Text>
      <Text style={styles.uploadHint}>Add clear photos of the device so shops can quote accurately.</Text>
      <View style={styles.uploadCard}>
        <Text style={styles.uploadIcon}>+</Text>
        <Text style={styles.uploadTitle}>Photo upload placeholder</Text>
        <Text style={styles.uploadMeta}>Photo upload will be available soon</Text>
      </View>
    </View>
  );
}

export function CreateStepThree({ draft, setDraft, onNext, onBack }: DraftStepProps) {
  return (
    <WizardShell title="Create Request - Step 3" subtitle="Location & Preferences" onBack={onBack} onNext={onNext} nextLabel="Find Shops">
      <SelectableChips
        title="East London Area"
        options={eastLondonAreas}
        selected={draft.area}
        onSelect={(area) => setDraft({ ...draft, area })}
      />
      <SelectableChips
        title="Preferred Date / Time"
        options={['Today afternoon', 'Tomorrow morning', 'This weekend']}
        selected={draft.preferredTime}
        onSelect={(preferredTime) => setDraft({ ...draft, preferredTime })}
      />
      <SelectableChips
        title="Budget Range (Optional)"
        options={['Under R500', 'R500 - R1500', 'R1500+']}
        selected={draft.budget}
        onSelect={(budget) => setDraft({ ...draft, budget })}
      />
      <InfoCard
        theme="dark"
        rows={[
          ['Device', `${draft.brand} ${draft.deviceCategory}`],
          ['Problem', draft.issue],
          ['Area', draft.area],
        ]}
      />
    </WizardShell>
  );
}

function SelectableChips({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.chipWrap}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            activeOpacity={0.82}
            onPress={() => onSelect(option)}
            style={[styles.chip, option === selected && styles.chipSelected]}
          >
            <Text style={styles.chipText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function SubmittedScreen({ onViewRequests }: { onViewRequests: () => void }) {
  return (
    <CenterScreen title="Request Submitted" subtitle="Your repair request has been sent to verified shops.">
      <StackButton theme="dark" label="View My Requests" onPress={onViewRequests} />
    </CenterScreen>
  );
}

export function RequestDetails({
  onBack,
  onViewQuotes,
  onTrack,
}: {
  onBack: () => void;
  onViewQuotes: () => void;
  onTrack: () => void;
}) {
  return (
    <CenterScreen title="Request Details" subtitle="View a single request with device info, photos, and timeline.">
      <InfoCard theme="dark" rows={[['Device', 'Samsung A54'], ['Status', 'Quoted'], ['Estimated', '2 days']]} />
      <Section theme="dark" title="Timeline" chips={['Request', 'Quoted', 'Booked', 'In Progress', 'Completed']} />
      <StackButton theme="dark" label="View Quotes" onPress={onViewQuotes} />
      <StackButton theme="dark" label="Track Repair" onPress={onTrack} />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function QuotesList({
  onBack,
  onOpenBusiness,
  onAccept,
}: {
  onBack: () => void;
  onOpenBusiness: () => void;
  onAccept: () => void;
}) {
  return (
    <CenterScreen title="Quotes List" subtitle="Compare offers from repair businesses.">
      <Section theme="dark" title="Quotes" items={quotes} onItemPress={onOpenBusiness} />
      <StackButton theme="dark" label="Accept Quote" onPress={onAccept} />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function BusinessProfile({
  onBack,
  onChat,
  onAccept,
}: {
  onBack: () => void;
  onChat: () => void;
  onAccept: () => void;
}) {
  return (
    <CenterScreen title="Business Profile" subtitle="Photos, ratings, reviews, services, and response time.">
      <Section theme="dark" title="Services" chips={['Screen repair', 'Battery replacement', 'Water damage', 'Motherboard repair']} />
      <Section theme="dark" title="Reviews" items={['4.9 average rating', 'Fast response time', 'Professional communication']} />
      <StackButton theme="dark" label="Chat" onPress={onChat} />
      <StackButton theme="dark" label="Accept Quote" onPress={onAccept} />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function AcceptConfirmation({ onDone }: { onDone: () => void }) {
  return (
    <CenterScreen title="Accept Quote Confirmation" subtitle="Confirm the selected quote and finalize your booking.">
      <InfoCard theme="dark" rows={[['Business', 'FixPro Electronics'], ['Price', 'R850'], ['Estimated days', '2']]} />
      <StackButton theme="dark" label="Confirm Booking" onPress={onDone} />
    </CenterScreen>
  );
}
