import { useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  FilterChips,
  HeroCard,
  SearchCard,
  Section,
  StackButton,
  StarRating,
} from '../../../shared/components/ui';
import {
  eastLondonAreas,
  marketplaceProducts,
  repairShops,
} from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { RepairRequestDraft, ThemeMode } from '../../../shared/types/navigation';

type ExploreScreenProps = {
  draft: RepairRequestDraft;
  onOpenBusiness: (shopName: string) => void;
  showRecommendations: boolean;
  theme: ThemeMode;
};

type RepairShop = (typeof repairShops)[number];

const ALL_AREAS = 'All areas';
const areaOptions = [ALL_AREAS, ...eastLondonAreas];

/** After the Fix My Phone form, open Explore already filtered to the area the user chose. */
const areaForDraft = (draft: RepairRequestDraft, showRecommendations: boolean) =>
  showRecommendations && eastLondonAreas.includes(draft.area) ? draft.area : ALL_AREAS;

export function ExploreScreen({ draft, onOpenBusiness, showRecommendations, theme }: ExploreScreenProps) {
  const [area, setArea] = useState(() => areaForDraft(draft, showRecommendations));
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const light = theme === 'light';

  useEffect(() => {
    setArea(areaForDraft(draft, showRecommendations));
  }, [draft, showRecommendations]);

  const shops = useMemo(
    () => (area === ALL_AREAS ? repairShops : repairShops.filter((shop) => shop.area === area)),
    [area],
  );

  const matchesRequest = showRecommendations && area === draft.area;
  const selectedShop = repairShops.find((shop) => shop.id === selectedShopId);
  const shopProducts = selectedShop
    ? marketplaceProducts.filter((product) => product.shop === selectedShop.name)
    : [];

  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Find Repair Shops"
        body="Filter verified repair shops by area, then open one to see their services, prices, and the accessories they stock."
        theme={theme}
      />

      <SearchCard theme={theme} />

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <View style={styles.marketSectionHeader}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText, { marginBottom: 0 }]}>
            {matchesRequest ? `Recommended in ${area}` : 'Repair Shops'}
          </Text>
          <Text style={styles.marketSectionAction}>
            {shops.length} {shops.length === 1 ? 'shop' : 'shops'}
          </Text>
        </View>

        {matchesRequest ? (
          <Text style={[styles.uploadHint, light && styles.darkReadableMuted]}>
            Matched to your saved request. Change the area to widen your search.
          </Text>
        ) : null}

        <FilterChips options={areaOptions} selected={area} onSelect={setArea} theme={theme} />

        <View style={{ marginTop: 14 }}>
          {shops.length === 0 ? (
            <Text style={[styles.emptyState, light && styles.darkReadableMuted]}>
              No verified shops in {area} yet. Try another area.
            </Text>
          ) : (
            shops.map((shop, index) => (
              <ShopRow
                key={shop.id}
                shop={shop}
                theme={theme}
                first={index === 0}
                onPress={() => setSelectedShopId(shop.id)}
              />
            ))
          )}
        </View>
      </View>

      <Section
        theme={theme}
        title="Platform Benefits"
        chips={['Trusted reviews', 'Transparent pricing', 'Instant booking', 'GPS locator']}
      />

      <Modal
        visible={Boolean(selectedShop)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedShopId(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.shopModal, light && styles.requestModalLight]}>
            {selectedShop ? (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollArea}>
                <ImageBackground
                  source={{ uri: selectedShop.imageUrl }}
                  style={styles.modalImage}
                  imageStyle={styles.cardImageRadius}
                >
                  <View style={styles.imageShade} />
                </ImageBackground>

                <View>
                  <View style={styles.shopNameRow}>
                    <Text style={[styles.modalTitle, light && styles.darkReadableText]}>{selectedShop.name}</Text>
                    {selectedShop.verified ? <Ionicons name="shield-checkmark" size={18} color="#7bd2ff" /> : null}
                  </View>
                  <View style={[styles.shopRatingRow, { marginTop: 6 }]}>
                    <StarRating rating={Math.round(selectedShop.rating)} />
                    <Text style={styles.listingRatingText}>{selectedShop.rating.toFixed(1)}</Text>
                    <Text style={[styles.shopMeta, light && styles.darkReadableMuted]}>
                      ({selectedShop.reviews} reviews)
                    </Text>
                  </View>
                  <Text style={[styles.homeMeta, light && styles.darkReadableMuted, { marginTop: 6 }]}>
                    {selectedShop.area} - {selectedShop.hours}
                  </Text>
                  <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
                    {selectedShop.responseTime}
                  </Text>
                </View>

                <Text style={[styles.modalDescription, light && styles.darkReadableText]}>
                  {selectedShop.caption}
                </Text>

                <Text style={[styles.subTitle, light && styles.darkReadableText]}>Services</Text>
                <View>
                  {selectedShop.services.map((service, index) => (
                    <View key={service.name} style={[styles.serviceRow, index === 0 && styles.serviceRowFirst]}>
                      <Text style={[styles.serviceName, light && styles.darkReadableText]}>{service.name}</Text>
                      <Text style={styles.servicePrice}>{service.price}</Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.subTitle, light && styles.darkReadableText]}>Products they sell</Text>
                {shopProducts.length === 0 ? (
                  <Text style={[styles.emptyState, light && styles.darkReadableMuted]}>
                    This shop does not list accessories yet.
                  </Text>
                ) : (
                  <View>
                    {shopProducts.map((product, index) => (
                      <View key={product.id} style={[styles.productRow, index === 0 && styles.serviceRowFirst]}>
                        <Image source={{ uri: product.imageUrl }} style={styles.productThumb} resizeMode="cover" />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.productName, light && styles.darkReadableText]}>{product.title}</Text>
                          <Text style={[styles.productMeta, light && styles.darkReadableMuted]}>{product.detail}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                          <Text style={styles.servicePrice}>{product.price}</Text>
                          {!product.inStock ? <Text style={styles.outOfStock}>Out of stock</Text> : null}
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.row}>
                  <StackButton
                    theme={theme}
                    label="View Profile"
                    onPress={() => {
                      setSelectedShopId(null);
                      onOpenBusiness(selectedShop.name);
                    }}
                    compact
                  />
                  <StackButton theme={theme} label="Close" onPress={() => setSelectedShopId(null)} compact />
                </View>
              </ScrollView>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ShopRow({
  shop,
  theme,
  first,
  onPress,
}: {
  shop: RepairShop;
  theme: ThemeMode;
  first: boolean;
  onPress: () => void;
}) {
  const light = theme === 'light';

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      style={[styles.shopRow, first && styles.shopRowFirst]}
    >
      <Image source={{ uri: shop.imageUrl }} style={styles.shopThumb} resizeMode="cover" />
      <View style={styles.shopInfo}>
        <View style={styles.shopNameRow}>
          <Text style={[styles.shopName, light && styles.darkReadableText]} numberOfLines={1}>
            {shop.name}
          </Text>
          {shop.verified ? <Ionicons name="shield-checkmark" size={13} color="#7bd2ff" /> : null}
        </View>
        <View style={styles.shopRatingRow}>
          <StarRating rating={Math.round(shop.rating)} size={12} />
          <Text style={styles.listingRatingText}>{shop.rating.toFixed(1)}</Text>
          <Text style={[styles.shopMeta, light && styles.darkReadableMuted]}>- {shop.area}</Text>
        </View>
        <Text style={[styles.shopCaption, light && styles.darkReadableMuted]} numberOfLines={2}>
          {shop.caption}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={light ? '#47516f' : '#aebddd'} />
    </TouchableOpacity>
  );
}
