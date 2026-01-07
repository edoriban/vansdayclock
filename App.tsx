import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  Animated
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshCcw, ShieldAlert, Info } from 'lucide-react-native';
import Colors from './constants/Colors';
import DoomsdayClock from './components/DoomsdayClock';
import CosmicBackground from './components/CosmicBackground';
import { useDoomsday } from './hooks/useDoomsday';
import { setupNotifications } from './services/notificationService';

function DoomsdayApp() {
  const { data, loading, refresh } = useDoomsday();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Gracefully handle notification errors in Expo Go
    setupNotifications().catch(err => console.log('Notification setup skipped:', err.message));
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (!loading && data) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, data]);

  if (loading && !data) {
    return (
      <View style={[styles.container, styles.center]}>
        <CosmicBackground />
        <ActivityIndicator size="large" color={Colors.midnight.accent} />
        <Text style={styles.loadingText}>ASSESSING GLOBAL THREATS...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CosmicBackground />
      <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <ShieldAlert color={Colors.midnight.accent} size={32} />
            <Animated.Text
              style={[
                styles.title,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              DOOMSDAY CLOCK
            </Animated.Text>
            <TouchableOpacity onPress={() => refresh()} style={styles.refreshButton}>
              <RefreshCcw color={Colors.midnight.text} size={24} />
            </TouchableOpacity>
          </View>

          <DoomsdayClock timeUntilMidnight={data?.timeUntilMidnight || '89 Seconds to Midnight'} />

          <View style={styles.infoCard}>
            <View style={styles.row}>
              <Info color={Colors.midnight.gold} size={20} />
              <Text style={styles.cardTitle}>CURRENT STATUS</Text>
            </View>
            <Text style={styles.statusText}>{data?.statusText}</Text>
            <Text style={styles.lastUpdated}>Last sync: {new Date(data?.lastUpdated || '').toLocaleTimeString()}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Data source: Bulletin of the Atomic Scientists</Text>
            <Text style={styles.disclaimer}>This application is for informational purposes only. Monitoring global existential risks in real-time.</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <DoomsdayApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.midnight.background,
  },
  safeArea: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 40 : 0,
    marginBottom: 20,
  },
  title: {
    color: Colors.midnight.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 4,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },
  refreshButton: {
    padding: 8,
  },
  loadingText: {
    color: Colors.midnight.text,
    marginTop: 20,
    letterSpacing: 2,
    fontSize: 12,
  },
  infoCard: {
    backgroundColor: Colors.midnight.card,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.midnight.gold,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: Colors.midnight.gold,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 1,
  },
  statusText: {
    color: Colors.midnight.text,
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  lastUpdated: {
    color: Colors.midnight.muted,
    fontSize: 12,
    marginTop: 15,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.midnight.muted,
    fontSize: 12,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: Colors.midnight.muted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 14,
  },
});
