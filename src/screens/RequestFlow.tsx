import { CenterScreen, InfoCard, Section, StackButton, TextArea, WizardShell } from '../components/ui';
import { commonBrands, issueChips, quotes } from '../data/mockData';

export function CreateStepOne({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <WizardShell title="Create Request - Step 1" subtitle="Select Device" onBack={onBack} onNext={onNext} nextLabel="Continue">
      <Section theme="dark" title="Device Categories" chips={['Phone', 'Laptop', 'Tablet', 'Other']} />
      <Section theme="dark" title="Common Brands" chips={commonBrands} />
    </WizardShell>
  );
}

export function CreateStepTwo({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <WizardShell title="Create Request - Step 2" subtitle="Describe Problem" onBack={onBack} onNext={onNext} nextLabel="Continue">
      <TextArea />
      <Section theme="dark" title="Common Issue Chips" chips={issueChips} />
      <StackButton theme="dark" label="Upload Photos" onPress={() => {}} />
    </WizardShell>
  );
}

export function CreateStepThree({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <WizardShell title="Create Request - Step 3" subtitle="Location & Preferences" onBack={onBack} onNext={onNext} nextLabel="Submit Request">
      <Section theme="dark" title="Current Location / Address" chips={['Use current location', 'Enter address manually']} />
      <Section theme="dark" title="Preferred Date / Time" chips={['Today afternoon', 'Tomorrow morning', 'This weekend']} />
      <Section theme="dark" title="Budget Range (Optional)" chips={['Under R500', 'R500 - R1500', 'R1500+']} />
    </WizardShell>
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
