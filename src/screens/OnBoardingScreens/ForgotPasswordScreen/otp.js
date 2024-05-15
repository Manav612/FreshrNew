import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';


const otp = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const navigation = useNavigation();
  return (
    <>
      <View style={{
        flexDirection: 'row',
        margin: 15,
        gap: 10,
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={{ color: COLOR.BLACK, fontSize: 22 }}>Forgot Password</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center',flex:1}}>
        <View style={{height:Screen_Height*0.20,alignItems:'center'}}>
        <Text style={{ color: COLOR.BLACK_70, fontSize: 20 }}>Code has been send to +1 111*****99</Text>
  
            </View>
            <Text  style={{textAlign:'center',fontSize:18,color:COLOR.BLACK_70}}>Resend code in 55s</Text>
            <TouchableOpacity style={{
              width:Screen_Width*0.90,
              height:Screen_Height*0.06,
              borderRadius:30,
              backgroundColor:COLOR.ORANGECOLOR,
              justifyContent:'center',
              position:'absolute',
              bottom:10,
              elevation:10,
              shadowColor:COLOR.ORANGECOLOR}} 
              onPress={()=>navigation.navigate('NewpasswordScreen') }
              >
              <Text style={{textAlign:'center',fontSize:18,color:COLOR.WHITE_80}}>Verify</Text>
            </TouchableOpacity>
      </View>
    </>
  )
}

export default otp

const styles = StyleSheet.create({})