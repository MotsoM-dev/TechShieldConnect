import { View } from 'react-native';
import { ChatMock, HeroCard, Section, StackButton } from '../../../components/ui';
import { styles } from '../../../theme/styles';
import type { ThemeMode } from '../../../types/navigation';

type ChatScreenProps = {
  theme: ThemeMode;
};

export function ChatTabScreen({ theme }: ChatScreenProps) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Chat"
        body="Converse with the repair shop owner, ask about quotes, and get live updates in one place."
        theme={theme}
      />
      <ChatMock theme={theme} />
      <Section
        theme={theme}
        title="Quick Replies"
        chips={['Share the quote', 'Any update on parts?', 'When can I drop off?', 'Please call me']}
      />
      <StackButton theme={theme} label="Open Conversation" onPress={() => {}} />
    </View>
  );
}
