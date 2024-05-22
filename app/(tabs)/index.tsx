import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { Link, Stack } from 'expo-router'
import Theme from '@/constants/Theme';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import ListingsMap from '@/components/ListingsMap';

import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';



const Page = () => {

  const [category, setCategory] = React.useState('Tiny homes');

  const items = useMemo(()=> listingsData as any, []); // keep in memory for better performance

  const onCategoryChanged = (category: string) => {
    console.log(category);
    setCategory(category);
  }



  return (
    <View style={{ flex: 1, marginTop: 150 }}>

        <Stack.Screen options={{ 
            header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />
         }} />

         {/* <Listings items={items} category={category} /> */}
         <ListingsMap listings={listingsDataGeo} />
         <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})