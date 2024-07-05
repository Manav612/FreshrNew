
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Screen_Height, Screen_Width} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreens } from '../../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { navigationToReset } from '../../../constants/NavigationController';

const ProfessionalPrivacyAndPolicy = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation()
  const styles = StyleSheet.create({
    container: {
      height:Screen_Height*0.9,
      padding: 16,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color:COLOR.BLACK
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
      color:COLOR.BLACK,
      fontWeight:'bold'
    },
    button: {
      backgroundColor: COLOR.ORANGECOLOR,
      alignSelf:'center',
      position:'absolute',
      bottom:5,
      borderRadius: 25,
      width:Screen_Width*0.9,
      height:40,
      justifyContent:'center',
      alignItems:'center'
    },
    buttonText: {
      color:COLOR.WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:COLOR.WHITE}}>
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <Text style={{fontWeight: '500', fontSize: 28, color: COLOR.BLACK}}>
          Privacy Policy
        </Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 8,
          }}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>

          <MaterialIcons name="add" size={18} color={COLOR.BLACK} />
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 50,
              backgroundColor: COLOR.BLACK,
            }}></View>
          <View
            style={{
              height: 1,
              backgroundColor: COLOR.BLACK,
              width: Screen_Width * 0.87,
            }}></View>
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 50,
              backgroundColor: COLOR.BLACK,
            }}></View>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 8,
          }}>
          <Text style={styles.sectionTitle}>2. Personal Data We Collect</Text>
          <MaterialIcons name="add" size={18} color={COLOR.BLACK} />
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 50,
              backgroundColor: COLOR.BLACK,
            }}></View>
          <View
            style={{
              height: 1,
              backgroundColor: COLOR.BLACK,
              width: Screen_Width * 0.87,
            }}></View>
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 50,
              backgroundColor: COLOR.BLACK,
            }}></View>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 8,
          }}>
          <Text style={styles.sectionTitle}>3. Cookie Policy</Text>
          <MaterialIcons name="add" size={18} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>What are cookies?</Text>
        <Text style={{fontSize: 16, marginBottom: 10,color:COLOR.GRAY}}>
          A cookie is a small file with information that your browser stores on
          your device. Information in this file is typically shared with the
          owner of the site in addition to potential partners and third parties
          to that business.The collection of this information may be used in the
          function of the site and/or to improve your experience.
        </Text>
        <Text style={styles.text}>How we use cookies?</Text>
        <Text style={{fontSize: 16, marginBottom: 10,color:COLOR.GRAY}}>
          A cookie is a small file with information that your browser stores on
          your device. Information in this file is typically shared with the
          owner of the site in addition to potential partners and third parties
          to that business.The collection of this information may be used in the
          function of the site and/or to improve your experience.
        </Text>
        <Text style={styles.text}>We do not use cookies?</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>navigationToReset(navigation,NavigationScreens.ProfessionalConnectStripeScreen)}>
        <Text style={styles.buttonText}>Accept All</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};



export default ProfessionalPrivacyAndPolicy;
