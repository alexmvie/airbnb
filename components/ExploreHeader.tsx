import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '@/constants/Theme';
import React, { useRef } from 'react';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ScrollView } from 'react-native-gesture-handler';

const categories = [
      {
            name: 'Tiny homes',
            icon: 'home',
      },
      {
            name: 'Cabins',
            icon: 'house-siding',
      },
      {
            name: 'Trending',
            icon: 'local-fire-department',
      },
      {
            name: 'Play',
            icon: 'videogame-asset',
      },
      {
            name: 'City',
            icon: 'apartment',
      },
      {
            name: 'Beachfront',
            icon: 'beach-access',
      },
      {
            name: 'Countryside',
            icon: 'nature-people',
      },
];

interface Props {
      onCategoryChanged: (category: string) => void;
}

const ExploreHeader = (props: Props) => {
      const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
      const scrollRef = useRef<ScrollView | null>(null);
      const [activeIndex, setActiveIndex] = React.useState(0);

      const setSelectedCategory = (index: number) => {
            const selected = itemsRef.current[index];

            setActiveIndex(index);

            selected?.measure((x) => {
                  scrollRef.current?.scrollTo({ x: x - 16, animated: true });
            });

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            props.onCategoryChanged(categories[index].name);
      };

      // here we did a kind of fixing the statusbar height issue on android
      const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
      const paddingTop = Platform.OS === 'android' && statusBarHeight ? statusBarHeight + 40 : 0;

      return (
            // <SafeAreaView style={[Theme.container, { paddingTop }]}>
            <SafeAreaView style={{ flex: 1, paddingTop: paddingTop }}>
                  <View style={styles.categoriesContainer}>
                        <View style={styles.actionRow}>
                              <Link
                                    href='/(modals)/booking'
                                    asChild
                              >
                                    <TouchableOpacity style={styles.searchBtn}>
                                          <Ionicons
                                                name='search'
                                                size={24}
                                                color={Colors.grey}
                                          />
                                          <View>
                                                <Text style={Theme.searchCaption}>Where to?</Text>
                                                <Text style={[Theme.searchCaption, { color: Colors.grey }]}>
                                                      Anywhere . Any week . Guests
                                                </Text>
                                          </View>
                                    </TouchableOpacity>
                              </Link>

                              <TouchableOpacity style={styles.filterBtn}>
                                    <Ionicons
                                          name='options-outline'
                                          size={24}
                                          color={Colors.grey}
                                    />
                              </TouchableOpacity>
                        </View>

                        <ScrollView
                              ref={scrollRef}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              scrollEnabled={true} // Explicitly enabling scrolling
                              contentContainerStyle={styles.scrollViewContent} // Using a custom style to manage the layout
                        >
                              {categories.map((item, index) => (
                                    <TouchableOpacity
                                          ref={(element) => (itemsRef.current[index] = element)}
                                          style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                                          key={index}
                                          onPress={() => setSelectedCategory(index)}
                                    >
                                          <MaterialIcons
                                                name={item.icon as any}
                                                size={24}
                                                color={activeIndex === index ? Colors.primary : Colors.grey}
                                          />
                                          <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                                                {item.name}
                                          </Text>
                                    </TouchableOpacity>
                              ))}
                        </ScrollView>
                  </View>
            </SafeAreaView>
      );
};

export default ExploreHeader;

const styles = StyleSheet.create({
      categoriesContainer: {
            backgroundColor: Colors.white,
            height: 150,
      },
      actionRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 10,
      },
      filterBtn: {
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.grey,
            borderRadius: 24,
      },
      searchBtn: {
            backgroundColor: Colors.white,
            flexDirection: 'row',
            gap: 10,
            padding: 14,
            alignItems: 'center',
            width: 'auto',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.greyLight,
            borderRadius: 30,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 8,
            shadowOffset: {
                  width: 1,
                  height: 1,
            },
      },
      categoryText: {
            fontSize: 14,
            color: Colors.grey,
      },
      categoryTextActive: {
            fontSize: 14,
            color: '#000',
      },
      categoriesBtn: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 8,
      },
      categoriesBtnActive: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: '#000',
            borderBottomWidth: 2,
            paddingBottom: 8,
      },

      scrollViewContent: {
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 16,
      },
});
