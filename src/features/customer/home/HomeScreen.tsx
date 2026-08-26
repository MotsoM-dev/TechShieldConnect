import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { MediaCarousel, StackButton } from '../../../shared/components/ui';
import {
  activeRepair,
  homeSpecials,
  promotedShops,
  recentRepairCards,
  rotatingTechTips,
} from '../../../shared/data/mockData';
import { repairProgress } from '../../../shared/lib/repair';
import { styles } from '../../../shared/theme/styles';
import type { ConfirmedRequest, ThemeMode } from '../../../shared/types/navigation';

const confirmedRequestRows = (request: ConfirmedRequest): [string, string][] => [
  ['Device', `${request.draft.brand} ${request.draft.deviceCategory}`],
  ['Problem', request.draft.issue],
  ['Area', request.draft.area],
  ['Budget', request.draft.budget],
];

type HomeScreenProps = {
  onCreateRequest: () => void;
  onMessageShop: () => void;
  onTrackRepair: () => void;
  confirmedRequest: ConfirmedRequest | null;
  theme: ThemeMode;
};

const repairHeroImages = [
  require('../../../../assets/hero-repair-trust.png'),
  require('../../../../assets/hero-phone-handoff.png'),
  require('../../../../assets/hero-happy-customer.png'),
];

export function HomeScreen({
  onCreateRequest,
  onMessageShop,
  onTrackRepair,
  confirmedRequest,
  theme,
}: HomeScreenProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const carouselMotion = useRef(new Animated.Value(0)).current;
  const specialsMotion = useRef(new Animated.Value(0)).current;
  const tipMotion = useRef(new Animated.Value(1)).current;
  const heroImageMotion = useRef(new Animated.Value(1)).current;
  const entrance = useRef(new Animated.Value(0)).current;
  const light = theme === 'light';
  const selectedRequest = recentRepairCards.find((request) => request.id === selectedRequestId);

  // Progress is derived from elapsed time, so re-render periodically while a repair is live.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!confirmedRequest) return;
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, [confirmedRequest]);

  const liveProgress = confirmedRequest ? repairProgress(confirmedRequest, now) : null;

  useEffect(() => {
    Animated.timing(entrance, { toValue: 1, duration: 650, useNativeDriver: true }).start();
  }, [entrance]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carouselMotion, { toValue: 1, duration: 19000, useNativeDriver: true }),
        Animated.timing(carouselMotion, { toValue: 0, duration: 19000, useNativeDriver: true }),
      ]),
    ).start();
  }, [carouselMotion]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(specialsMotion, { toValue: 1, duration: 22000, useNativeDriver: true }),
        Animated.timing(specialsMotion, { toValue: 0, duration: 22000, useNativeDriver: true }),
      ]),
    ).start();
  }, [specialsMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(tipMotion, { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.timing(tipMotion, { toValue: 1, duration: 320, useNativeDriver: true }),
      ]).start();
      setTipIndex((current) => (current + 1) % rotatingTechTips.length);
    }, 9800);

    return () => clearInterval(interval);
  }, [tipMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(heroImageMotion, { toValue: 0, duration: 350, useNativeDriver: true }).start(() => {
        setHeroImageIndex((current) => (current + 1) % repairHeroImages.length);
        Animated.timing(heroImageMotion, { toValue: 1, duration: 450, useNativeDriver: true }).start();
      });
    }, 300000);

    return () => clearInterval(interval);
  }, [heroImageMotion]);

  return (
    <View style={styles.stackGap}>
      <Animated.View
        style={[
          styles.homeHero,
          light && styles.homeHeroLight,
          {
            opacity: entrance,
            transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
          },
        ]}
      >
        <Text style={[styles.homeEyebrow, light && styles.darkReadableMuted]}>East London repair network</Text>
        <Text style={[styles.homeTitle, light && styles.darkReadableText]}>Get your phone fixed without the guesswork.</Text>
        <Text style={[styles.homeCopy, light && styles.darkReadableMuted]}>
          Submit once, then TechShield recommends trusted shops near your area.
        </Text>
        <Animated.View style={[styles.homeHeroImageWrap, { opacity: heroImageMotion }]}>
          <Image
            source={repairHeroImages[heroImageIndex]}
            style={styles.homeHeroImage}
            resizeMode="cover"
            accessibilityLabel="A TechShield customer repair experience"
          />
        </Animated.View>
        <View style={styles.row}>
          <StackButton theme={theme} label="Fix My Phone" onPress={onCreateRequest} compact />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.tipCard,
          light && styles.tipCardLight,
          {
            opacity: tipMotion,
            transform: [{ scale: tipMotion.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] }) }],
          },
        ]}
      >
        <Text style={styles.tipLabel}>TechCare Tip</Text>
        <Text style={[styles.tipText, light && styles.darkReadableText]}>{rotatingTechTips[tipIndex]}</Text>
      </Animated.View>

      {confirmedRequest && liveProgress ? (
        <View style={[styles.savedRequestCard, light && styles.lightSurface]}>
          <View style={styles.savedRequestHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionTitle, light && styles.darkReadableText, { marginBottom: 0 }]}>
                Your Repair
              </Text>
              <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
                {confirmedRequest.reference} - {confirmedRequest.shopName}
              </Text>
            </View>
            <Text style={styles.savedRequestBadge}>{liveProgress.stage}</Text>
          </View>

          <View style={styles.repairProgressBlock}>
            <View style={styles.homeCardHeader}>
              <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
                {liveProgress.remainingLabel}
              </Text>
              <Text style={styles.progressPercent}>{liveProgress.percent}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${liveProgress.percent}%` }]} />
            </View>
            <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
              Ready by {liveProgress.etaLabel}
            </Text>
          </View>

          {confirmedRequestRows(confirmedRequest).map(([label, value]) => (
            <View key={label} style={styles.infoRow}>
              <Text style={[styles.infoLabel, light && styles.darkReadableMuted]}>{label}</Text>
              <Text style={[styles.infoValue, light && styles.darkReadableText]}>{value}</Text>
            </View>
          ))}

          <View style={[styles.row, { marginTop: 10 }]}>
            <StackButton theme={theme} label="Track Repair" onPress={onTrackRepair} compact />
            <StackButton theme={theme} label="Message Shop" onPress={onMessageShop} compact />
          </View>
        </View>
      ) : null}

      <SpecialsCarousel motion={specialsMotion} theme={theme} />

      {!confirmedRequest && activeRepair ? (
        <View style={[styles.progressCard, light && styles.lightSurface]}>
          <View style={styles.homeCardHeader}>
            <View>
              <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Current Repair</Text>
              <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
                {activeRepair.device} at {activeRepair.shop}
              </Text>
            </View>
            <Text style={styles.progressPercent}>{activeRepair.progress}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${activeRepair.progress}%` }]} />
          </View>
          <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
            {activeRepair.stage} - estimated {activeRepair.estimate}
          </Text>
          <StackButton theme={theme} label="Message Shop" onPress={onMessageShop} />
        </View>
      ) : null}

      <PromotedCarousel motion={carouselMotion} theme={theme} />

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Recent Requests</Text>
        {recentRepairCards.map((request) => (
          <TouchableOpacity
            key={request.id}
            activeOpacity={0.86}
            style={styles.requestPreview}
            onPress={() => setSelectedRequestId(request.id)}
          >
            <View>
              <Text style={[styles.requestPreviewTitle, light && styles.darkReadableText]}>{request.device}</Text>
              <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>{request.shop} - {request.price}</Text>
            </View>
            <Text style={styles.requestStatus}>{request.status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={Boolean(selectedRequest)} transparent animationType="fade" onRequestClose={() => setSelectedRequestId(null)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.requestModal, light && styles.requestModalLight]}>
            <Text style={[styles.modalTitle, light && styles.darkReadableText]}>{selectedRequest?.device}</Text>
            <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>{selectedRequest?.shop} - {selectedRequest?.price}</Text>
            <Text style={[styles.modalDescription, light && styles.darkReadableText]}>{selectedRequest?.description}</Text>
            <View style={styles.photoGrid}>
              {selectedRequest?.photos.map((photo) => (
                <View key={photo} style={styles.photoTile}>
                  <Text style={styles.photoText}>{photo}</Text>
                </View>
              ))}
            </View>
            <StackButton theme={theme} label="Close" onPress={() => setSelectedRequestId(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function PromotedCarousel({ motion, theme }: { motion: Animated.Value; theme: ThemeMode }) {
  return (
    <MediaCarousel
      title="Promoted"
      theme={theme}
      motion={motion}
      cards={promotedShops.map((shop) => ({
        key: shop.name,
        imageUrl: shop.imageUrl,
        title: shop.name,
        meta: `${shop.area} - ${shop.rating} rating`,
        caption: shop.caption,
        initials: shop.name.slice(0, 2).toUpperCase(),
      }))}
    />
  );
}

function SpecialsCarousel({ motion, theme }: { motion: Animated.Value; theme: ThemeMode }) {
  return (
    <MediaCarousel
      title="Specials Near You"
      theme={theme}
      motion={motion}
      variant="special"
      cards={homeSpecials.map((special) => ({
        key: special.title,
        imageUrl: special.imageUrl,
        title: special.title,
        caption: special.caption,
        badge: special.price,
      }))}
    />
  );
}
