import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { AppNavigator } from './src/app/AppNavigator';
import { TabBar, TopBar } from './src/shared/components/ui';
import { styles } from './src/shared/theme/styles';
import type { AppScreen, ThemeMode } from './src/shared/types/navigation';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>({ name: 'tabs', tab: 'Home' });
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const pulse = useRef(new Animated.Value(0)).current;
  const shouldShowTopBar = !['create-step-1', 'create-step-2', 'create-step-3'].includes(screen.name);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 2400, useNativeDriver: true }),
      ]),
    ).start();
  }, [pulse]);

  const body = useMemo(
    () => (
      <AppNavigator
        screen={screen}
        setScreen={setScreen}
        theme={theme}
        setTheme={setTheme}
      />
    ),
    [screen, theme],
  );

  return (
    <View style={[styles.app, theme === 'light' && styles.appLight]}>
      {shouldShowTopBar ? <TopBar theme={theme} /> : null}
      <Animated.View
        style={[
          styles.glowA,
          {
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] }),
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.08] }) }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glowB,
          {
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] }),
            transform: [{ translateY: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }],
          },
        ]}
      />
      {body}
      {screen.name === 'tabs' ? (
        <TabBar activeTab={screen.tab} onChange={(tab) => setScreen({ name: 'tabs', tab })} theme={theme} />
      ) : null}
    </View>
  );
}
