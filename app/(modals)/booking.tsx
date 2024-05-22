import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import Theme from '@/constants/Theme';
import { useRouter } from 'expo-router';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ButtonIcon, { IconPosition } from '@/components/ButtonIcon';
import Fonts from '@/constants/Fonts';
import { places } from '@/assets/data/places';
import { Guest, guestsGroups } from '@/assets/data/guestGroups';

import DatePicker from 'react-native-modern-datepicker';

/**
 * Renders a BlurView component for Android and iOS platforms.
 * Android: Renders a View with a background color because BlurView is not supported on Android.
 *
 * @param {any} props - The properties to pass to the BlurViewUniversal component.
 * @return {React.ReactNode} The rendered BlurView component.
 */
const BlurViewUniversal = (props: any) => {
      if (Platform.OS === 'android') {
            return (
                  <View
                        {...props}
                        style={[styles.container, props.style, { backgroundColor: Colors.white }]}
                  />
            );
      }

      return <BlurView {...props} />;
};

const booking = () => {
      const router = useRouter();

      const [openCard, setOpenCard] = React.useState(2);
      const [selectedPlace, setSelectedPlace] = React.useState(0);
      const today = new Date().toISOString().substring(0, 10);

      const [groups, setGroups] = React.useState(guestsGroups);

      const onClearAll = () => {
            setOpenCard(0);
            setSelectedPlace(0);
            setGroups(guestsGroups);
            console.log('clear all called');
      };

      const onSearch = () => {
            router.back();
      };

      const onChangeGuestCount = (groupsIndex: number, count: number) => {
            //const newGroups = [...groups]; <<-- will not work because it will mutate the original array
            const newGroups = groups.map((group) => ({ ...group })); //<<-- will work because it will create a new array
            newGroups[groupsIndex].count += count;
            if (newGroups[groupsIndex].count < 0) newGroups[groupsIndex].count = 0;
            if (newGroups[groupsIndex].count > 9) newGroups[groupsIndex].count = 9;
            setGroups(newGroups);
      };

      const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

      return (
            <BlurViewUniversal style={styles.container}>
                  {/* WHERE */}
                  <Animated.View style={styles.card}>
                        {openCard !== 0 && (
                              <AnimatedTouchableOpacity
                                    onPress={() => setOpenCard(0)}
                                    style={styles.cardPreview}
                                    entering={FadeIn.duration(200)}
                                    exiting={FadeOut.duration(200)}
                              >
                                    <Text style={styles.previewText}>Where</Text>
                                    <Text style={styles.previewdData}>I'm flexible</Text>
                              </AnimatedTouchableOpacity>
                        )}

                        {openCard === 0 && (
                              <>
                                    <Animated.Text
                                          style={styles.cardHeader}
                                          entering={FadeIn}
                                    >
                                          Where to?
                                    </Animated.Text>
                                    <Animated.View style={styles.cardBody}>
                                          <View style={[Theme.inputField, { flexDirection: 'row', gap: 10 }]}>
                                                <Ionicons
                                                      name='search'
                                                      size={24}
                                                      color={Colors.grey}
                                                />
                                                <TextInput
                                                      style={{}}
                                                      placeholder='Search destinations'
                                                      id='selectedPlace'
                                                      placeholderTextColor={Colors.grey}
                                                      //onChangeText={() => setSelectedPlace(places[selectedPlace].)}
                                                      value={places[selectedPlace].title}
                                                />
                                          </View>

                                          <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerStyle={{ gap: 10 }}
                                                style={{ marginTop: 20 }}
                                          >
                                                {places.map((place, index) => (
                                                      <TouchableOpacity
                                                            onPress={() => setSelectedPlace(index)}
                                                            key={index}
                                                      >
                                                            <Image
                                                                  source={place.img}
                                                                  style={
                                                                        index == selectedPlace
                                                                              ? styles.placeImgSelected
                                                                              : styles.placeImg
                                                                  }
                                                            />
                                                            <Text style={styles.placeName}>{place.title}</Text>
                                                      </TouchableOpacity>
                                                ))}
                                          </ScrollView>
                                    </Animated.View>
                              </>
                        )}
                  </Animated.View>

                  {/* WHEN */}
                  <Animated.View style={styles.card}>
                        {openCard !== 1 && (
                              <AnimatedTouchableOpacity
                                    onPress={() => setOpenCard(1)}
                                    style={styles.cardPreview}
                                    entering={FadeIn.duration(200)}
                                    exiting={FadeOut.duration(200)}
                              >
                                    <Text style={styles.previewText}>When?</Text>
                                    <Text style={styles.previewdData}>Any week</Text>
                              </AnimatedTouchableOpacity>
                        )}

                        {openCard === 1 && (
                              <>
                                    <Animated.Text style={styles.cardHeader}>When?</Animated.Text>
                                    <Animated.View style={styles.cardBody}>
                                          <DatePicker
                                                current={today}
                                                selected={today}
                                                mode='calendar'
                                                options={{
                                                      defaultFont: Fonts.primaryRegular,
                                                      headerFont: Fonts.primaryBold,
                                                      mainColor: Colors.primary,
                                                }}
                                          />
                                    </Animated.View>
                              </>
                        )}
                  </Animated.View>

                  {/* WHO */}
                  <Animated.View style={styles.card}>
                        {openCard !== 2 && (
                              <AnimatedTouchableOpacity
                                    onPress={() => setOpenCard(2)}
                                    style={styles.cardPreview}
                                    entering={FadeIn.duration(200)}
                                    exiting={FadeOut.duration(200)}
                              >
                                    <Text style={styles.previewText}>Who?</Text>
                                    <Text style={styles.previewdData}>Add guest</Text>
                              </AnimatedTouchableOpacity>
                        )}

                        {openCard === 2 && (
                              <>
                                    <Animated.Text style={styles.cardHeader}>Who is coming?</Animated.Text>
                                    <Animated.View style={styles.cardBody}>
                                          {groups.map((guest, index) => (
                                                <View
                                                      key={index}
                                                      style={[styles.guestItem, index < groups.length - 1 && styles.itemBorder]}
                                                >
                                                      <View>
                                                            <Text>{guest.name}</Text>
                                                            <Text>{guest.text}</Text>
                                                      </View>
                                                      <View
                                                            style={{
                                                                  flexDirection: 'row',
                                                                  gap: 10,
                                                                  alignItems: 'center',
                                                                  justifyContent: 'center',
                                                            }}
                                                      >
                                                            <TouchableOpacity onPress={() => onChangeGuestCount(index, -1)}>
                                                                  <Ionicons
                                                                        name='remove-circle-outline'
                                                                        size={26}
                                                                        color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                                                                  />
                                                            </TouchableOpacity>
                                                            <Text
                                                                  style={{
                                                                        fontFamily: Fonts.primarySemiBold,
                                                                        fontSize: 16,
                                                                        textAlign: 'center',
                                                                  }}
                                                            >
                                                                  {guest.count}
                                                            </Text>
                                                            <TouchableOpacity onPress={() => onChangeGuestCount(index, 1)}>
                                                                  <Ionicons
                                                                        name='add-circle-outline'
                                                                        size={26}
                                                                        color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                                                                  />
                                                            </TouchableOpacity>
                                                      </View>
                                                </View>
                                          ))}
                                    </Animated.View>
                              </>
                        )}
                  </Animated.View>

                  {/* footer */}
                  <Animated.View
                        entering={SlideInDown.delay(200)}
                        style={Theme.footer}
                  >
                        <View style={styles.buttonRow}>
                              <TouchableOpacity onPress={onClearAll}>
                                    <Text style={Theme.btnTextUnderline}>Clear all</Text>
                              </TouchableOpacity>

                              <ButtonIcon
                                    text='Search'
                                    onPress={onSearch}
                                    icon={
                                          <Ionicons
                                                name='search-outline'
                                                size={24}
                                                color='white'
                                          />
                                    }
                                    iconPosition={IconPosition.LEFT}
                              />
                        </View>
                  </Animated.View>
            </BlurViewUniversal>
      );
};

export default booking;

const styles = StyleSheet.create({
      container: {
            flex: 1,
            paddingTop: 100,
      },
      buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
      },
      button: {
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
      },

      card: {
            backgroundColor: '#fff',
            borderRadius: 14,
            margin: 10,
            elevation: 4,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: {
                  width: 2,
                  height: 2,
            },
            gap: 20,
      },
      previewText: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 14,
            color: Colors.grey,
      },
      previewdData: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 14,
            color: Colors.dark,
      },
      cardHeader: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 24,
            padding: 20,
      },
      cardBody: {
            paddingHorizontal: 20,
            paddingBottom: 20,
      },
      cardPreview: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
      },
      placeImg: {
            width: 100,
            height: 100,
            borderRadius: 10,
      },
      placeImgSelected: {
            width: 100,
            height: 100,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.grey,
      },
      placeName: {
            fontFamily: Fonts.primaryRegular,
            fontSize: 12,
            marginTop: 10,
      },

      guestItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
      },
      itemBorder: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: Colors.grey,
      },
});
