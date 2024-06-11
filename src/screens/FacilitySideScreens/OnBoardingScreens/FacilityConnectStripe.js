import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, TextInput, Switch, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ConnectStripeIcon, barber } from '../../../constants/Icons';
import { NavigationScreens } from '../../../constants/Strings';
import { screenWidth } from 'react-native-gifted-charts/src/utils';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';

const FacilityConnectStripe = () => {

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.AuthField,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 5
    },
    input: {
        backgroundColor: COLOR.AuthField,
        borderRadius: 15,
        elevation: 5,
        shadowColor: COLOR.BLACK,
        marginVertical: 5
    },
    halfInput: {
        backgroundColor: COLOR.AuthField,
        borderRadius: 15,
        elevation: 5,
        shadowColor: COLOR.BLACK,
        marginVertical: 5,
        width: Screen_Width * 0.35
    },
    icon: {
        marginRight: 10,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: COLOR.ORANGECOLOR,
        justifyContent: 'center',
        borderRadius: 25,
        alignItems: 'center',
        marginBottom:20,
        height: 40,
        position:'absolute',
        bottom:5,
        width:Screen_Width*0.9,
        alignSelf:'center'
    },
    buttonText: {
        color: COLOR.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

  return (
    <View style={{backgroundColor:COLOR.WHITE}}>
  <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15,marginVertical:10,paddingHorizontal:15 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
        <Text style={{ fontWeight: '600', fontSize: 25, color:COLOR.BLACK }}>Connect Stripe</Text>
      </View>
  <View style={{justifyContent:'center',alignItems:'center',width:screenWidth,height:Screen_Height*0.6,paddingHorizontal:15}}>
    <FastImage source={ConnectStripeIcon} style={{width:Screen_Width*0.8,height:Screen_Height*0.4}} />
    <Text style={{color:COLOR.BLACK,fontSize:18,fontWeight:'700',textAlign:'center',width:Screen_Width*0.6}}>Connect to Stripe for seamless and secure payouts. Payouts are received every week.</Text>
  </View>
    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(NavigationScreens.FacilityBottomTab)}>
   <Text style={styles.buttonText}>Connect to stripe</Text>
</TouchableOpacity>
</View>
  );
};


export default FacilityConnectStripe;
