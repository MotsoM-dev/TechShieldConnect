import { Text, View } from 'react-native';
import { avatarInitials, GlassToggle, MenuRow, StatTiles } from '../../../shared/components/ui';
import { customerProfile } from '../../../shared/data/mockData';
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
  const light = theme === 'light';

  return (
    <View style={styles.stackGap}>
      <View style={[styles.profileCard, light && styles.lightSurface]}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{avatarInitials(customerProfile.name)}</Text>
        </View>
        <Text style={[styles.profileName, light && styles.darkReadableText]}>{customerProfile.name}</Text>
        <Text style={[styles.profileMeta, light && styles.darkReadableMuted]}>{customerProfile.area}</Text>
        <Text style={[styles.profileMeta, light && styles.darkReadableMuted]}>{customerProfile.memberSince}</Text>
        <StatTiles stats={customerProfile.stats} theme={theme} />
      </View>

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Account</Text>
        <MenuRow theme={theme} first icon="person" label="Edit Profile" onPress={onEditProfile} />
        <MenuRow theme={theme} icon="time" label="Repair History" value="12" onPress={onHistory} />
        <MenuRow theme={theme} icon="settings" label="Settings" onPress={onSettings} />
        <MenuRow theme={theme} icon="help-circle" label="Help & Support" onPress={onHelp} />
      </View>

      <GlassToggle theme={theme} onPress={onToggleTheme} />

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Contact details</Text>
        <MenuRow theme={theme} first icon="mail" label="Email" value={customerProfile.email} />
        <MenuRow theme={theme} icon="call" label="Phone" value={customerProfile.phone} />
        <MenuRow theme={theme} icon="location" label="Area" value={customerProfile.area} />
      </View>
    </View>
  );
}
