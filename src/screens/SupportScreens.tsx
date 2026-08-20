import { CenterScreen, ChatMock, InfoCard, Section, StackButton } from '../components/ui';

export function TrackingScreen({
  onChat,
  onWarranty,
  onBack,
}: {
  onChat: () => void;
  onWarranty: () => void;
  onBack: () => void;
}) {
  return (
    <CenterScreen title="Repair Tracking" subtitle="Live progress with estimated completion.">
      <Section theme="dark" title="Status Timeline" chips={['Request', 'Quoted', 'Booked', 'In Progress', 'Completed']} />
      <InfoCard
        theme="dark"
        rows={[
          ['Estimated completion', 'Friday, 4:00 PM'],
          ['Current stage', 'In Progress'],
          ['Technician', 'FixPro Electronics'],
        ]}
      />
      <StackButton theme="dark" label="Chat" onPress={onChat} />
      <StackButton theme="dark" label="Digital Warranty" onPress={onWarranty} />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function ChatScreen({ onBack }: { onBack: () => void }) {
  return (
    <CenterScreen title="Chat" subtitle="Message the technician or repair shop directly.">
      <ChatMock theme="dark" />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function WarrantyScreen({ onBack }: { onBack: () => void }) {
  return (
    <CenterScreen title="Digital Warranty" subtitle="Post-repair warranty card, history, and receipt.">
      <InfoCard
        theme="dark"
        rows={[
          ['Warranty', '90 days'],
          ['Receipt', 'Download available'],
          ['Repair history', 'Linked to request'],
        ]}
      />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}

export function SimpleListScreen({
  title,
  subtitle,
  items,
  onBack,
}: {
  title: string;
  subtitle: string;
  items: string[];
  onBack: () => void;
}) {
  return (
    <CenterScreen title={title} subtitle={subtitle}>
      <Section theme="dark" title={title} items={items} />
      <StackButton theme="dark" label="Back" onPress={onBack} />
    </CenterScreen>
  );
}
