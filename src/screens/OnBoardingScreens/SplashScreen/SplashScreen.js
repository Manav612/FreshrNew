import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import FontSize from '../../../constants/FontSize';
import FastImage from 'react-native-fast-image';
import { Loader } from '../../../constants/Icons';
import WelcomeOnboardScreen from '../WelcomeOnboardScreen/WelcomeOnboardScreen';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome Onboard Screen');
    }, 3000);
    return () => clearTimeout(timer);
  }, []); 

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 60, marginVertical: 20 }}>F</Text>
      <FastImage
        style={{ width: 50, height: 50 }}
        source={Loader}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({});
