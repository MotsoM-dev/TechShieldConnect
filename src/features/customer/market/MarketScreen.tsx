import { useEffect, useMemo, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, ImageBackground, Modal, Text, TextInput, View } from 'react-native';
import {
  avatarInitials,
  FilterChips,
  HeroCard,
  ListingCard,
  MediaCarousel,
  SearchCard,
  StackButton,
  StarRating,
} from '../../../shared/components/ui';
import {
  marketCategories,
  marketListings,
  marketplaceProducts,
  marketReviews,
  marketSpecials,
  marketTechTips,
  productCategories,
} from '../../../shared/data/mockData';
import { styles } from '../../../shared/theme/styles';
import type { ThemeMode } from '../../../shared/types/navigation';

type MarketScreenProps = {
  theme: ThemeMode;
};

type MarketReview = (typeof marketReviews)[number];

export function MarketScreen({ theme }: MarketScreenProps) {
  const [category, setCategory] = useState('All');
  const [productCategory, setProductCategory] = useState('All');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<MarketReview[]>(marketReviews);
  const specialsMotion = useRef(new Animated.Value(0)).current;
  const light = theme === 'light';

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(specialsMotion, { toValue: 1, duration: 22000, useNativeDriver: true }),
        Animated.timing(specialsMotion, { toValue: 0, duration: 22000, useNativeDriver: true }),
      ]),
    ).start();
  }, [specialsMotion]);

  const listings = useMemo(
    () => (category === 'All' ? marketListings : marketListings.filter((item) => item.category === category)),
    [category],
  );

  const products = useMemo(
    () =>
      productCategory === 'All'
        ? marketplaceProducts
        : marketplaceProducts.filter((product) => product.category === productCategory),
    [productCategory],
  );

  const selectedListing = marketListings.find((item) => item.id === selectedListingId);
  const selectedProduct = marketplaceProducts.find((product) => product.id === selectedProductId);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return '0.0';
    return (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <View style={styles.stackGap}>
      <HeroCard
        title="Market"
        body="Buy and sell devices with your neighbours, grab repair specials from verified shops, and see what other people experienced before you commit."
        theme={theme}
      />

      <SearchCard theme={theme} />

      <FilterChips options={marketCategories} selected={category} onSelect={setCategory} theme={theme} />

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <View style={styles.marketSectionHeader}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText, { marginBottom: 0 }]}>
            For Sale Near You
          </Text>
          <Text style={styles.marketSectionAction}>{listings.length} listings</Text>
        </View>

        {listings.length === 0 ? (
          <Text style={[styles.emptyState, light && styles.darkReadableMuted]}>
            No {category.toLowerCase()} listed right now. Check back soon or switch category.
          </Text>
        ) : (
          <View style={styles.listingGrid}>
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                theme={theme}
                onPress={() => setSelectedListingId(listing.id)}
                item={{
                  imageUrl: listing.imageUrl,
                  title: listing.title,
                  price: listing.price,
                  condition: listing.condition,
                  detail: listing.detail,
                  footnote: `${listing.area} - ${listing.postedAt}`,
                  personName: listing.seller,
                  personRating: listing.sellerRating,
                  verified: listing.verified,
                }}
              />
            ))}
          </View>
        )}
      </View>

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <View style={styles.marketSectionHeader}>
          <Text style={[styles.sectionTitle, light && styles.darkReadableText, { marginBottom: 0 }]}>
            Products & Accessories
          </Text>
          <Text style={styles.marketSectionAction}>
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </Text>
        </View>

        <FilterChips
          options={productCategories}
          selected={productCategory}
          onSelect={setProductCategory}
          theme={theme}
        />

        <View style={[styles.listingGrid, { marginTop: 14 }]}>
          {products.map((product) => (
            <ListingCard
              key={product.id}
              theme={theme}
              onPress={() => setSelectedProductId(product.id)}
              item={{
                imageUrl: product.imageUrl,
                title: product.title,
                price: product.price,
                condition: product.inStock ? 'In stock' : 'Out of stock',
                detail: product.detail,
                footnote: product.area,
                personName: product.shop,
                personRating: product.rating,
              }}
            />
          ))}
        </View>
      </View>

      <MediaCarousel
        title="Shop Specials"
        theme={theme}
        motion={specialsMotion}
        variant="special"
        cards={marketSpecials.map((special) => ({
          key: special.title,
          imageUrl: special.imageUrl,
          title: special.title,
          meta: `${special.shop} - ${special.area}`,
          caption: special.caption,
          badge: special.price,
        }))}
      />

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Tech Tips</Text>
        {marketTechTips.map((tip, index) => (
          <View key={tip.title} style={[styles.marketTipCard, index === 0 && styles.marketTipCardFirst]}>
            <View style={styles.marketTipIcon}>
              <Ionicons name="bulb" size={17} color="#7bd2ff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.marketTipTitle, light && styles.darkReadableText]}>{tip.title}</Text>
              <Text style={[styles.marketTipBody, light && styles.darkReadableMuted]}>{tip.body}</Text>
              <Text style={styles.marketTipSource}>{tip.source}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.sectionCard, light && styles.lightSurface]}>
        <Text style={[styles.sectionTitle, light && styles.darkReadableText]}>Community Experiences</Text>

        <View style={styles.ratingSummary}>
          <View>
            <Text style={[styles.ratingScore, light && styles.darkReadableText]}>{averageRating}</Text>
            <Text style={[styles.ratingCount, light && styles.darkReadableMuted]}>
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            <StarRating rating={Math.round(Number(averageRating))} size={18} />
            <Text style={[styles.ratingCount, light && styles.darkReadableMuted]}>
              Buyers and sellers rate each handover across East London.
            </Text>
          </View>
        </View>

        <ReviewComposer
          theme={theme}
          onSubmit={(review) => setReviews((current) => [review, ...current])}
        />

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewAvatar}>
                <Text style={styles.reviewAvatarText}>{avatarInitials(review.author)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.reviewAuthor, light && styles.darkReadableText]}>{review.author}</Text>
                <Text style={[styles.reviewSubject, light && styles.darkReadableMuted]}>
                  {review.subject} - {review.area}
                </Text>
              </View>
              <StarRating rating={review.rating} />
            </View>
            <Text style={[styles.reviewBody, light && styles.darkReadableText]}>{review.body}</Text>
            <View style={styles.reviewFooter}>
              <View style={styles.reviewFooterAction}>
                <Ionicons name="thumbs-up-outline" size={13} color="#aebddd" />
                <Text style={styles.reviewFooterText}>Helpful ({review.helpful})</Text>
              </View>
              <View style={styles.reviewFooterAction}>
                <Ionicons name="share-social-outline" size={13} color="#aebddd" />
                <Text style={styles.reviewFooterText}>Share</Text>
              </View>
              <Text style={styles.reviewFooterText}>{review.postedAt}</Text>
            </View>
          </View>
        ))}
      </View>

      <Modal
        visible={Boolean(selectedListing)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedListingId(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.requestModal, light && styles.requestModalLight]}>
            {selectedListing ? (
              <>
                <ImageBackground
                  source={{ uri: selectedListing.imageUrl }}
                  style={styles.modalImage}
                  imageStyle={styles.cardImageRadius}
                >
                  <View style={styles.imageShade} />
                </ImageBackground>
                <Text style={[styles.modalTitle, light && styles.darkReadableText]}>{selectedListing.title}</Text>
                <View style={styles.modalHeaderRow}>
                  <Text style={styles.listingPrice}>{selectedListing.price}</Text>
                  <View style={styles.listingConditionPill}>
                    <Text style={styles.listingConditionText}>{selectedListing.condition}</Text>
                  </View>
                </View>
                <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
                  {selectedListing.detail} - {selectedListing.area} - {selectedListing.postedAt}
                </Text>
                <Text style={[styles.modalDescription, light && styles.darkReadableText]}>
                  {selectedListing.description}
                </Text>
                <View style={styles.listingSellerRow}>
                  <View style={styles.listingAvatar}>
                    <Text style={styles.listingAvatarText}>{avatarInitials(selectedListing.seller)}</Text>
                  </View>
                  <Text style={[styles.listingSellerName, light && styles.darkReadableText]}>
                    {selectedListing.seller}
                  </Text>
                  <StarRating rating={Math.round(selectedListing.sellerRating)} />
                  <Text style={styles.listingRatingText}>{selectedListing.sellerRating.toFixed(1)}</Text>
                </View>
                <View style={styles.row}>
                  <StackButton theme={theme} label="Message Seller" onPress={() => setSelectedListingId(null)} compact />
                  <StackButton theme={theme} label="Close" onPress={() => setSelectedListingId(null)} compact />
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Modal>

      <Modal
        visible={Boolean(selectedProduct)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedProductId(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.requestModal, light && styles.requestModalLight]}>
            {selectedProduct ? (
              <>
                <ImageBackground
                  source={{ uri: selectedProduct.imageUrl }}
                  style={styles.modalImage}
                  imageStyle={styles.cardImageRadius}
                >
                  <View style={styles.imageShade} />
                </ImageBackground>
                <Text style={[styles.modalTitle, light && styles.darkReadableText]}>{selectedProduct.title}</Text>
                <View style={styles.modalHeaderRow}>
                  <Text style={styles.listingPrice}>{selectedProduct.price}</Text>
                  <View style={styles.listingConditionPill}>
                    <Text style={styles.listingConditionText}>
                      {selectedProduct.inStock ? 'In stock' : 'Out of stock'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.homeMeta, light && styles.darkReadableMuted]}>
                  {selectedProduct.detail} - sold by {selectedProduct.shop}, {selectedProduct.area}
                </Text>
                <Text style={[styles.modalDescription, light && styles.darkReadableText]}>
                  {selectedProduct.description}
                </Text>
                <View style={styles.listingSellerRow}>
                  <View style={styles.listingAvatar}>
                    <Text style={styles.listingAvatarText}>{avatarInitials(selectedProduct.shop)}</Text>
                  </View>
                  <Text style={[styles.listingSellerName, light && styles.darkReadableText]}>
                    {selectedProduct.shop}
                  </Text>
                  <StarRating rating={Math.round(selectedProduct.rating)} />
                  <Text style={styles.listingRatingText}>{selectedProduct.rating.toFixed(1)}</Text>
                </View>
                <StackButton theme={theme} label="Close" onPress={() => setSelectedProductId(null)} />
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ReviewComposer({
  theme,
  onSubmit,
}: {
  theme: ThemeMode;
  onSubmit: (review: MarketReview) => void;
}) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const light = theme === 'light';
  const canSubmit = rating > 0 && body.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    onSubmit({
      id: `review-${Date.now()}`,
      author: 'You',
      rating,
      subject: 'Your experience',
      area: 'East London',
      postedAt: 'Just now',
      helpful: 0,
      body: body.trim(),
    });
    setRating(0);
    setBody('');
  };

  return (
    <View style={[styles.composerCard, light && styles.composerCardLight]}>
      <Text style={[styles.composerLabel, light && styles.darkReadableText]}>Share your experience</Text>
      <StarRating rating={rating} size={24} onChange={setRating} />
      <TextInput
        style={[styles.composerInput, light && styles.composerInputLight]}
        placeholder="How did the handover or repair go?"
        placeholderTextColor={light ? '#8b93b8' : '#8f98c7'}
        value={body}
        onChangeText={setBody}
        multiline
      />
      <StackButton
        theme={theme}
        label={canSubmit ? 'Post Review' : 'Add a rating and a note'}
        onPress={submit}
      />
    </View>
  );
}
