import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { navigationToReset } from '../../constants/NavigationController';
import FastImage from 'react-native-fast-image';
import { Loader } from '../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';

const OrderProcessingScreenProfSide = ({route}) => {
    const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const {data}= route.params
    const navigation = useNavigation()
    const onRequestToEnd = ()=>{
      console.log("===========   endddddd orderr   hiiii =========");
        const id = data.sender;
        socketServices.emit('order_update', {
            recipient:id,
            message: {
                type: 'Request_To_End_Order',
                id:id,
                order_id:data.message.order_id,
            },
        });
    }

    socketServices.on('Accept_To_End_Order', data => {
        console.log("ACCEPT END ORDER Calllllllllllllll : ",data);
        navigationToReset(navigation,NavigationScreens.ProfessionalBottomTab)
    });

    socketServices.on('Unhappy_To_End_Order', data => {
        console.log("Unhappy to end order : ",data);
    });

  return (
<View style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
<View style={{ height: Screen_Height * 0.5, width: Screen_Width * 0.8, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, shadowColor: COLOR.BLACK_70, elevation: 2, borderRadius: 15 }}>
  <Text style={{ fontSize: 24, color: COLOR.BLACK, fontWeight: "800",marginVertical:15}}>Order is Processing</Text>
  <FastImage
    style={{ width: 50, height: 50,marginVertical:15}}
    source={Loader}
    resizeMode={FastImage.resizeMode.contain}
  />
  <TouchableOpacity onPress={onRequestToEnd} style={{ backgroundColor: COLOR.ChartBlue, height: 50, width: Screen_Width * 0.6, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginVertical: 15}}>
    <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.WHITE }}>Request order completion</Text>
  </TouchableOpacity>
</View>
</View>
  )
}

export default OrderProcessingScreenProfSide

const styles = StyleSheet.create({})