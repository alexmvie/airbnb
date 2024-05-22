import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

export const Measures = {
      footerHeight: 100,
};

const styles = StyleSheet.create({
      headerCaption: {
            fontFamily: Fonts.primarySemiBold,
      },
      tabIconCaption: {
            fontFamily: Fonts.primarySemiBold,
      },
      searchCaption: {
            fontFamily: Fonts.primarySemiBold,
      },
      categoryBtnCaption: {
            fontFamily: Fonts.primarySemiBold,
      },
      headline: {
            fontFamily: Fonts.primarySemiBold,
            fontSize: 24,
      },
      container: {
            flex: 1,
            backgroundColor: Colors.screenBackground,
            padding: 20,
      },
      containerBorderless: {
            flex: 1,
            backgroundColor: Colors.screenBackground,
      },
      inputField: {
            height: 44,
            borderWidth: 1,
            borderColor: '#ABABAB',
            borderRadius: 8,
            padding: 10,
            backgroundColor: '#fff',
            fontFamily: Fonts.primaryRegular,
      },
      btn: {
            backgroundColor: Colors.primary,
            height: 50,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
      },
      btnText: {
            color: '#fff',
            fontSize: 16,
            fontFamily: Fonts.primarySemiBold,
      },
      btnOutline: {
            borderWidth: 1,
            borderColor: Colors.grey,
            height: 50,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
      },
      btnTextOutline: {
            color: Colors.grey,
            fontSize: 16,
            fontFamily: Fonts.primarySemiBold,
      },
      btnTextUnderline: {
            color: Colors.grey,
            fontSize: 16,
            fontFamily: Fonts.primarySemiBold,
            textDecorationLine: 'underline',
      },
      btnIcon: {
            position: 'absolute',
            left: 16,
            fontSize: 24,
      },
      footer: {
            position: 'absolute',
            height: Measures.footerHeight,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopColor: Colors.grey,
            borderTopWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
      },
      seperatorView: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 30,
      },
      seperator: {
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.grey,
      },
      seperatorText: {
            color: Colors.grey,
            fontFamily: Fonts.primarySemiBold,
      },
});

export default styles;
