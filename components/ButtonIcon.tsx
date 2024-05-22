import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Theme from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

export enum IconPosition {
      LEFT = 'left',
      RIGHT = 'right',
}
interface ButtonIconProps {
      onPress: () => void;
      text?: string;
      styleTouchableOpacity?: object;
      styleText?: object;
      icon?: any;
      iconPosition?: IconPosition;
}
const ButtonIcon = (props: ButtonIconProps) => {
      return (
            <TouchableOpacity
                  onPress={props.onPress}
                  style={[Theme.btn, styles.btn, props.styleTouchableOpacity]}
            >
                  {props.iconPosition === IconPosition.RIGHT && (
                        <Text style={[Theme.btnText, props.styleText]}>{props.text}</Text>
                  )}

                  {props.icon ? (
                        props.icon
                  ) : (
                        <Ionicons
                              name='map'
                              size={24}
                              color='white'
                        />
                  )}

                  {props.iconPosition === IconPosition.LEFT && <Text style={[Theme.btnText, props.styleText]}>{props.text}</Text>}
            </TouchableOpacity>
      );
};

export default ButtonIcon;

const styles = StyleSheet.create({
      btn: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            gap: 10,
      },
});
