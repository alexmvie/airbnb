import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import Theme from '@/constants/Theme';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import ListItem from '@/interfaces/listings';
import { ListItemGeo } from '@/interfaces/listingsGeo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Fonts from '@/constants/Fonts';

interface Props {
      listings: any;
}

const initialRegion = {
      latitude: 52.520008,
      longitude: 13.404954,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
}; // Berlin

// we wrap the map in a memo to avoid re-rendering the map on every map change
const ListingsMap = memo((props: Props) => {
      return <ListingsMapUncached {...props} />;
});

const ListingsMapUncached = (props: Props) => {
      const router = useRouter();
      const onMarkerSelected = (marker: ListItemGeo) => {
            router.push(`/listing/${marker.properties.id}`);
      };

      const renderCluster = (cluster: any) => {
            const { id, geometry, onPress, properties } = cluster;

            const points = properties.point_count;

            return (
                  <Marker
                        key={id}
                        coordinate={{
                              longitude: +geometry.coordinates[0],
                              latitude: +geometry.coordinates[1],
                        }}
                        onPress={onPress}
                  >
                        <View style={styles.cluster}>
                              <Text style={styles.clusterText}>{points}</Text>
                        </View>
                  </Marker>
            );
      };

      return (
            <View style={Theme.containerBorderless}>
                  <MapView
                        animationEnabled={false}
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        provider='google'
                        initialRegion={initialRegion}
                        clusterColor='white'
                        clusterTextColor='black'
                        renderCluster={renderCluster}
                  >
                        {props.listings.features.map((item: ListItemGeo) => (
                              <Marker
                                    key={item.properties.id}
                                    coordinate={{
                                          latitude: +item.properties.latitude,
                                          longitude: +item.geometry.coordinates[0],
                                    }}
                                    title={item.properties.name}
                                    description={item.properties.description}
                                    onPress={() => onMarkerSelected(item)}
                              >
                                    <View style={styles.marker}>
                                          {/* <Ionicons
                                        name='location-sharp'
                                        size={24}
                                        color='black'
                                    /> */}
                                          <Text style={styles.markerText}>€{item.properties.price}</Text>
                                    </View>
                              </Marker>
                        ))}
                  </MapView>
            </View>
      );
};

export default ListingsMap;

const styles = StyleSheet.create({
      map: {
            height: '100%',
            width: '100%',
      },

      marker: {
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
      },

      markerText: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 16,
      },

      cluster: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },

      clusterText: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 16,
            color: 'white',
      },
});
