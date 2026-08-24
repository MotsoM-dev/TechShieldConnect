import { View } from 'react-native';
import { GlassToggle, HeroCard, InfoCard, StackButton } from '../../../shared/components/ui';
import { styles } from '../../../shared/theme/styles';
import type { ThemeMode } from '../../../shared/types/navigation';

type ProfileScreenProps = {
  onEditProfile: () => void;
  onHelp: () => void;
  onHistory: () => void;
  onSettings: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
};

export function ProfileScreen({
  onEditProfile,
  onHelp,
  onHistory,
  onSettings,
  onToggleTheme,
  theme,
}: ProfileScreenProps) {
  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="My Profile"
        body="Personal info, repair history, warranties, settings, and logout."
        theme={theme}
      />
      <GlassToggle theme={theme} onPress={onToggleTheme} />
      <StackButton theme={theme} label="Edit Profile" onPress={onEditProfile} />
      <StackButton theme={theme} label="Settings" onPress={onSettings} />
      <StackButton theme={theme} label="Help & Support" onPress={onHelp} />
      <StackButton theme={theme} label="Repair History" onPress={onHistory} />
      <InfoCard
        theme={theme}
        rows={[
          ['Warranties', '3 active'],
          ['Repair history', '12 completed'],
          ['Account', 'Signed in'],
        ]}
      />
    </View>
  );
}
