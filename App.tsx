import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { TabBar, TopBar } from './src/components/ui';
import { AppNavigator } from './src/navigation/AppNavigator';
import { styles } from './src/theme/styles';
import type { AppScreen, ThemeMode } from './src/types/navigation';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>({ name: 'tabs', tab: 'Home' });
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const pulse = useRef(new Animated.Value(0)).current;

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
        pulse={pulse}
      />
    ),
    [pulse, screen, theme],
  );

  return (
    <View style={[styles.app, theme === 'light' && styles.appLight]}>
      <TopBar theme={theme} />
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
