import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StackButton } from '../../../shared/components/ui';
import {
  activeRepair,
  homeSpecials,
  promotedShops,
  recentRepairCards,
  rotatingTechTips,
} from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { ThemeMode } from '../../../shared/types/navigation';

type HomeScreenProps = {
  onCreateRequest: () => void;
  onMessageShop: () => void;
  theme: ThemeMode;
};

const repairHeroImages = [
  require('../../../../assets/hero-repair-trust.png'),
  require('../../../../assets/hero-phone-handoff.png'),
  require('../../../../assets/hero-happy-customer.png'),
];

export function HomeScreen({ onCreateRequest, onMessageShop, theme }: HomeScreenProps) {
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

      <SpecialsCarousel motion={specialsMotion} theme={theme} />

      {activeRepair ? (
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
  const light = theme === 'light';

  return (
    <View style={styles.carouselBlock}>
      <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Promoted</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.carouselRow,
            { transform: [{ translateX: motion.interpolate({ inputRange: [0, 1], outputRange: [0, -78] }) }] },
          ]}
        >
          {[...promotedShops, ...promotedShops].map((shop, index) => (
            <View key={`${shop.name}-${index}`} style={[styles.promotedCard, light && styles.promotedCardLight]}>
              <ImageBackground source={{ uri: shop.imageUrl }} style={styles.promotedImage} imageStyle={styles.cardImageRadius}>
                <View style={styles.imageShade} />
                <View style={styles.imageGlassOrb} />
                <Text style={styles.imageInitials}>{shop.name.slice(0, 2).toUpperCase()}</Text>
              </ImageBackground>
              <Text style={[styles.cardTitle, light && styles.darkReadableText]}>{shop.name}</Text>
              <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>{shop.area} - {shop.rating} rating</Text>
              <Text style={[styles.cardCaption, light && styles.darkReadableMuted]}>{shop.caption}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function SpecialsCarousel({ motion, theme }: { motion: Animated.Value; theme: ThemeMode }) {
  const light = theme === 'light';

  return (
    <View style={styles.carouselBlock}>
      <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Specials Near You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.carouselRow,
            { transform: [{ translateX: motion.interpolate({ inputRange: [0, 1], outputRange: [0, -52] }) }] },
          ]}
        >
          {[...homeSpecials, ...homeSpecials].map((special, index) => (
            <View key={`${special.title}-${index}`} style={[styles.specialCard, light && styles.promotedCardLight]}>
              <ImageBackground source={{ uri: special.imageUrl }} style={styles.specialImage} imageStyle={styles.cardImageRadius}>
                <View style={styles.imageShade} />
                <Text style={styles.specialPrice}>{special.price}</Text>
              </ImageBackground>
              <Text style={[styles.cardTitle, light && styles.darkReadableText]}>{special.title}</Text>
              <Text style={[styles.cardCaption, light && styles.darkReadableMuted]}>{special.caption}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
