import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import FontSize from '../../../constants/FontSize';
import FastImage from 'react-native-fast-image';
import { Loader } from '../../../constants/Icons';
import WelcomeOnboardScreen from '../WelcomeOnboardScreen/WelcomeOnboardScreen';
import { GetAuthToken, GetThemeMode } from '../../../constants/AsyncStorage';
import { SetThemeMode } from '../../../redux/ThemeAction';
import { NavigationScreens } from '../../../constants/Strings';
import { SetAuthToken } from '../../../redux/AuthAction';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    GetFromStorage()
    // return () => clearTimeout(timer);

  }, []); 

  const GetFromStorage = async () => {

    // const authToken = await GetAuthToken();
    // dispatch(SetAuthToken(authToken));
    dispatch(SetThemeMode(parseInt(await GetThemeMode())));

    const authtoken = await GetAuthToken();
    console.log(authtoken);
    dispatch(SetAuthToken(authtoken));
    const timer = setTimeout(() => {
      navigation.navigate(authtoken == "" ? NavigationScreens.ProceedWithoutScreen : NavigationScreens.HomeTab);
    }, 3000);
    // dispatch(SetFontSize(parseInt(await GetFontSize())));
    // if (authToken != '') {
    //   try {
    //     const userDetail = await FetchUserDetials(authToken);
    //     dispatch(UserData(userDetail.data.data));
    //   } catch (e) {
    //     setTimeout(() => {
    //       navigation.replace(NavigationScreens.SignUpScreen);
    //     }, 2500);
    //   }
    // }
    // setTimeout(() => {
    //   if (authToken == '') {
    //     navigation.replace(NavigationScreens.SignUpScreen);
    //   } else {
    //     navigation.replace(NavigationScreens.HomeTab);
    //   }
    // }, 2500);
  }

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:COLOR.WHITE }}>
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
