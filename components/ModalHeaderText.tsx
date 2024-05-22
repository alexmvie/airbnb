import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

const ModalHeaderText = () => {
      const [active, setActive] = useState(0);
      return (
            <View style={styles.container}>
                  <TouchableOpacity onPress={() => setActive(0)}>
                        <Text style={[styles.selTxt, active === 0 && styles.activeTxt]}>Stays</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActive(1)}>
                        <Text style={[styles.selTxt, active === 1 && styles.activeTxt]}>Experiences</Text>
                  </TouchableOpacity>
            </View>
      );
};

export default ModalHeaderText;

const styles = StyleSheet.create({
      container: {
            flexDirection: 'row',
            justifyContent: 'center',

            gap: 10,
      },
      selTxt: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 18,
      },
      activeTxt: {
            textDecorationColor: Colors.primary,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
      },
});
