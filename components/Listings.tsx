import {  ListRenderItem, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Link } from 'expo-router';
import ListItem from '@/interfaces/listings';
import { Ionicons } from '@expo/vector-icons';
import Fonts from '@/constants/Fonts';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
      items: ListItem[];
      category: string;
      refresh: number;
}
const Listings = (props: Props) => {
      const [isLoading, setIsLoading] = React.useState(true);
      const listRef = React.useRef<FlatList | null>(null);

      useEffect(() => {
            console.log('refresh', props.refresh);
            if (props.refresh) {
                  listRef.current?.scrollToOffset({ offset: 0, animated: false });
            }
      }, [props.refresh]);
      

      const renderRow: ListRenderItem<ListItem> = ({ item }) => (
            <Link
                  href={`/listing/${item.id}`}
                  style={{ flex: 1 }}
                  asChild
            >
                  <TouchableOpacity>
                        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                              <Image
                                    source={{ uri: item.medium_url }}
                                    style={styles.image}
                              />
                              <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30 }}>
                                    <Ionicons
                                          name='heart'
                                          size={24}
                                          color='black'
                                          style={{ opacity: 0.2 }}
                                    />
                              </TouchableOpacity>
                              <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30 }}>
                                    <Ionicons
                                          name='heart-outline'
                                          size={24}
                                          color='black'
                                    />
                              </TouchableOpacity>

                              <View style={styles.row}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={styles.scoreRow}>
                                          <Ionicons
                                                name='star'
                                                size={16}
                                                style={styles.starIcon}
                                          />
                                          <Text style={styles.score}>{item.review_scores_rating / 20}</Text>
                                    </View>
                              </View>
                              <Text style={styles.roomType}>{item.room_type}</Text>
                              <View style={styles.priceRow}>
                                    <Text style={styles.priceText}>€ {item.price}</Text>
                                    <Text style={styles.priceUnit}>night</Text>
                              </View>
                        </Animated.View>
                  </TouchableOpacity>
            </Link>
      );

      useEffect(() => {
            setIsLoading(true);
            setTimeout(() => {
                  console.log('loaded', props.category);
                  setIsLoading(false);
            }, 500);
      }, [props.category]);

      return (
            <View style={{ flex: 1 }}>
                  <FlatList
                        ref={listRef}
                        data={isLoading ? [] : props.items}
                        renderItem={renderRow}
                        ListHeaderComponent={<Text style={styles.flatListCaption}>{props.items.length} Homes</Text>}
                  />
            </View>
      );
};

export default Listings;

const styles = StyleSheet.create({
      listing: {
            padding: 10,
      },
      image: {
            width: '100%',
            height: 200,
            backgroundColor: 'pink',
            borderRadius: 10,
      },

      name: {
            fontSize: 16,
            fontFamily: Fonts.primarySemiBold
      },

      row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
      },
      scoreRow: {
            flexDirection: 'row',
            gap: 4,
      },
      starIcon: {},
      score: {
            fontFamily: Fonts.primarySemiBold
      },
      roomType: {
            fontFamily: Fonts.primaryRegular,
      },
      priceRow: {
            flexDirection: 'row',
            gap: 4,
      },
      priceText: {
            fontFamily: Fonts.primarySemiBold
      },
      priceUnit: {
            fontFamily: Fonts.primaryRegular,
      },

      flatListCaption: {
            textAlign: 'center',
            fontSize: 16,
            fontFamily: Fonts.primarySemiBold
      }
});
