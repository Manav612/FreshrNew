import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import OTPTextView from 'react-native-otp-textinput';

const otp = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const navigation = useNavigation();
  return (
    <View style={{backgroundColor:COLOR.WHITE}}>
      <View style={{
        flexDirection: 'row',
        margin: 15,
        gap: 10,
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{ color: COLOR.BLACK, fontSize: 22 }}>Forgot Password</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center',flex:1}}>
        <View style={{height:Screen_Height*0.20,alignItems:'center'}}>
        <Text style={{ color: COLOR.BLACK_70, fontSize: 20 }}>Code has been send to +1 111***99</Text>
        <OTPTextView
            containerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
            handleTextChange={(code) => console.log(code)}
            inputCount={4}
            keyboardType="numeric"
            tintColor={COLOR.ORANGECOLOR}
            offTintColor={COLOR.GRAY}
            inputCellLength={1}
            inputCellWidth={50} // Adjust size as needed
            inputCellHeight={50} // Adjust size as needed
            inputCellBorderWidth={0}
            inputCellRadius={0}
            focusedBorderColor={COLOR.ORANGECOLOR}
            offBorderColor={COLOR.GRAY}
            autoFocusOnLoad
          />
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
    </View>
  )
}

export default otp

const styles = StyleSheet.create({})