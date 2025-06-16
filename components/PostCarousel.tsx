import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withDelay } from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

interface PostCarouselProps {
  images: string[];
  onDoubleTap: () => void;
}

export default function PostCarousel({ images, onDoubleTap }: PostCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const lastTap = useRef<number | null>(null);
  const heartScale = useSharedValue(0);

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      onDoubleTap();
      
      // Trigger haptic feedback on supported platforms
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      // Animate heart
      heartScale.value = withSequence(
        withTiming(1.8, { duration: 300 }),
        withDelay(500, withTiming(0, { duration: 300 }))
      );
      
      lastTap.current = null;
    } else {
      lastTap.current = now;
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  contentFit="cover"
                  transition={300}
                />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          
          {Platform.OS !== 'web' && (
            <Animated.View style={[styles.heartContainer, heartAnimatedStyle]}>
              <Heart size={80} fill={Colors.light.red} color={Colors.light.red} />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
      
      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    width,
    height: width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: Colors.light.tint,
  },
  heartContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -40,
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});