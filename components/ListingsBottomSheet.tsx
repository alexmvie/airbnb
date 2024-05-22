import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import ListItem from '@/interfaces/listings';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';
import ButtonIcon, { IconPosition } from './ButtonIcon';

interface Props {
      listings: ListItem[];
      category: string;
}
const ListingsBottomSheet = (props: Props) => {
      const bottomSheetRef = useRef<BottomSheet>(null);
      const snapPoints = useMemo(() => ['12%', '100%'], []);
      const [refresh, setRefresh] = React.useState(0);

      const showMap = () => {
            bottomSheetRef.current?.collapse();
            setRefresh(refresh + 1);
      };

      return (
            <BottomSheet
                  ref={bottomSheetRef}
                  snapPoints={snapPoints}
                  handleIndicatorStyle={{ backgroundColor: Colors.grey }}
                  backgroundStyle={{ backgroundColor: Colors.screenBackground }}
                  index={1} // initially open bottom sheet
                  enablePanDownToClose={false}
            >
                  <View style={{ backgroundColor: Colors.screenBackground, padding: 16, flex: 1 }}>
                        <Listings
                              items={props.listings}
                              category={props.category}
                              refresh={refresh}
                        />
                  </View>

                  <View style={styles.absoluteBtnContainer}>
                        <ButtonIcon
                              text='Map'
                              onPress={showMap}
                              icon={
                                    <Ionicons
                                          name='map'
                                          size={24}
                                          color='white'
                                    />
                              }
                              iconPosition={IconPosition.LEFT}
                        />
                  </View>
            </BottomSheet>
      );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
      absoluteBtnContainer: {
            position: 'absolute',
            bottom: 30,
            width: '100%',
            alignItems: 'center',
      },
});
