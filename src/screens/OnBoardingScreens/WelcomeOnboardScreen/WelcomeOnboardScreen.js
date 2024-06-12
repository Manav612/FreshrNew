import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { OnBoard1, OnBoard2, OnBoard3, Splash, SplashImage } from '../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import Onboarding from 'react-native-onboarding-swiper';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../constants/Strings';
const WelcomeOnboardScreen = () => {
    const [showSplash, setShowSplash] = useState(true);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    // const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation()
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000); // 3000 milliseconds = 3 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showSplash ? (
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:COLOR.WHITE }}>
               <ImageBackground source={Splash} style={{height:Screen_Height,width:Screen_Width,justifyContent:'flex-end',paddingBottom:30,paddingHorizontal:30}}>
                 <Text style={{fontSize:30,fontWeight:'bold',color:COLOR.WHITE}}>Welcome to 👋</Text>
                 <Text style={{fontSize:55,fontWeight:'bold',color:COLOR.ORANGECOLOR }}>Freshr</Text>
                 <Text style={{fontSize:16,fontWeight:'bold',color:COLOR.WHITE,marginBottom:30}}>The best barber & salon app in this{'\n'}century for your good looks and beauty.</Text>
               </ImageBackground>
             </View>
            ) : (
                <Onboarding
                bottomBarColor={COLOR.ORANGECOLOR}
                onDone={() => navigation.navigate(NavigationScreens.ProceedWithoutScreen)}
                onSkip={() => navigation.navigate(NavigationScreens.ProceedWithoutScreen)}
                // onDone={() => navigation.navigate('Home Tab')}
                // onSkip={() => navigation.navigate('Home Tab')}
                
                containerStyles={{height:Screen_Height*0.5,justifyContent:'flex-start',backgroundColor:COLOR.WHITE}}
                    pages={[
                        {
                            backgroundColor:COLOR.WHITE,
                            image: (
                                <View>
                                    <Image source={OnBoard1} style={{width:Screen_Width,height:Screen_Height*0.6,resizeMode:'stretch'}}/>
                                </View>
                            ),
                            title: (
                                <View>
                                    <Text style={{color:COLOR.BLACK,fontWeight:'bold',fontSize:24,textAlign:'center',padding:5}}>Find Barbers and salons Easily in Your Hands</Text>
                                </View>
                            ),
                        },
                        {
                            backgroundColor:COLOR.WHITE,
                            image: (
                                <View >
                                   <Image source={OnBoard2} style={{width:Screen_Width,height:Screen_Height*0.6,resizeMode:'stretch'}}/>
                                </View>
                            ),
                            title: (
                                <View>
                                    <Text style={{color:COLOR.BLACK,fontWeight:'bold',fontSize:24,textAlign:'center',padding:5}}>Book Your Favorite Barber and Salon Quickly</Text>
                                </View>
                            ),
                        },
                        {
                            backgroundColor:COLOR.WHITE,
                            image: (
                                <View >
                                  <Image source={OnBoard3} style={{width:Screen_Width,height:Screen_Height*0.6,resizeMode:'stretch'}}/>
                                </View>
                            ),
                            title: (
                                <View>
                                    <Text style={{color:COLOR.BLACK,fontWeight:'bold',fontSize:24,textAlign:'center',padding:5}}>Come be handsome and beautiful with us right now!</Text>
                                </View>
                            ),
                        },
                    ]}
                />
            )}
        </>
    );
};

export default WelcomeOnboardScreen;