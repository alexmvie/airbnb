import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import ListItem from '@/interfaces/listings';
import listItemData from '@/assets/data/airbnb-listings.json';
import Theme from '@/constants/Theme';

import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { Measures } from '@/constants/Theme';

const IMG_SZ = 300;

const Page = () => {
      const { id } = useLocalSearchParams();

      const listItem: ListItem | undefined = (listItemData as ListItem[]).find((item: ListItem) => {
            //console.log("🚀 ~ Page ~ listItem:", item)
            return item.id === id;
      });

      if (!listItem) return null;

      const scrollRef = useAnimatedRef<Animated.ScrollView>();

      // NOTE -- we use useScrollViewOffset to get the scroll position
      const scrollOffset = useScrollViewOffset(scrollRef);

      // NOTE -- we use useAnimatedStyle to animate the image and achieve the parallax and zoom effect
      const imageAnimatedStyle = useAnimatedStyle(() => {
            return {
                  transform: [
                        {
                              translateY: interpolate(
                                    scrollOffset.value,
                                    [-IMG_SZ, 0, IMG_SZ],
                                    [-IMG_SZ/2, 0, IMG_SZ*0.75],
                              ),
                        },
                        {
                              scale: interpolate(
                                    scrollOffset.value,
                                    [-IMG_SZ, 0, IMG_SZ],
                                    [2, 1, 1],
                              ),
                        },
                  ],
            };
      });

      // NOTE -- the picture is displayed at the top of the phone screen because
      // we set the header to transparent in the layout where we intantiate this page
      // at tihs line of code --->>  <Stack.Screen name='listings/[id]' options={{ headerTitle: '', headerTransparent: true }} />

      return (
            <View style={Theme.containerBorderless}>
                  <Animated.ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: Measures.footerHeight }} scrollEventThrottle={16} >
                        <Animated.Image
                              source={{ uri: listItem?.xl_picture_url }}
                              style={[styles.image, imageAnimatedStyle]}
                        />

                        <View style={styles.infoContainer}>
                              <Text style={styles.name}>{listItem.name}</Text>
                              <Text style={styles.location}>
                                    {listItem.room_type} in {listItem.smart_location}
                              </Text>
                              <Text style={styles.rooms}>
                                    {listItem.guests_included} guests · {listItem.bedrooms} bedrooms · {listItem.beds} bed ·{' '}
                                    {listItem.bathrooms} bathrooms
                              </Text>
                              <View style={{ flexDirection: 'row', gap: 4 }}>
                                    <Ionicons
                                          name='star'
                                          size={16}
                                    />
                                    <Text style={styles.ratings}>
                                          {listItem.review_scores_rating / 20} · {listItem.number_of_reviews} reviews
                                    </Text>
                              </View>
                              <View style={styles.divider} />

                              <View style={styles.hostView}>
                                    <Image
                                          source={{ uri: listItem.host_picture_url }}
                                          style={styles.host}
                                    />

                                    <View>
                                          <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listItem.host_name}</Text>
                                          <Text>Host since {listItem.host_since}</Text>
                                    </View>
                              </View>

                              <View style={styles.divider} />

                              <Text style={styles.description}>{listItem.description}</Text>
                        </View>
                  </Animated.ScrollView>

                  <Animated.View
                        entering={SlideInDown.delay(500).duration(1000)}
                        style={Theme.footer}
                  >
                        <TouchableOpacity style={styles.footerText}>
                              <Text style={styles.footerPrice}>€{listItem.price}</Text>
                              <Text>night</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Theme.btn, { paddingHorizontal: 24 }]}>
                              <Text style={Theme.btnText}>Reserve</Text>
                        </TouchableOpacity>
                  </Animated.View>
            </View>
      );
};

export default Page;

const styles = StyleSheet.create({
      footerView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
      },
      price: {
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: Fonts.primarySemiBold,
      },
      perNight: {
            fontSize: 16,
            color: Colors.grey,
            fontFamily: Fonts.primarySemiBold,
      },

      image: {
            height: IMG_SZ,
            width: '100%',
      },
      infoContainer: {
            padding: 24,
            backgroundColor: Colors.white,
      },
      name: {
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: Fonts.primarySemiBold,
      },
      location: {
            fontSize: 18,
            marginTop: 10,
            fontFamily: Fonts.primarySemiBold,
      },
      rooms: {
            fontSize: 16,
            color: Colors.grey,
            marginVertical: 4,
            fontFamily: Fonts.primaryRegular,
      },
      ratings: {
            fontSize: 16,
            fontFamily: Fonts.primarySemiBold,
      },
      divider: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.grey,
            marginVertical: 16,
      },
      host: {
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: Colors.white,
      },
      hostView: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
      },
      footerText: {
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
      },
      footerPrice: {
            fontSize: 18,
            fontFamily: Fonts.primarySemiBold,
      },
      roundButton: {
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            color: Colors.primary,
      },
      bar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
      },
      header: {
            backgroundColor: '#fff',
            height: 100,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.grey,
      },

      description: {
            fontSize: 16,
            marginTop: 10,
            fontFamily: Fonts.primaryRegular,
      },
});
