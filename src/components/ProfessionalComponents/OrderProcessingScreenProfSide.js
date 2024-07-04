import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';

const OrderProcessingScreenProfSide = ({route}) => {
    const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
const {data}= route.params;
    const onRequestToEnd = ()=>{
        const id = data.message.id;
        socketServices.emit('order_update', {
            recipient:id,
            message: {
                type: 'Request_To_End_Order',
                id:id,
            },
        });
    }

    socketServices.on('Accept_To_End_Order', data => {
        console.log("ACCEPT END ORDER Calllllllllllllll : ",data);
        navigation.navigate(NavigationScreens.ProfessionalHomeScreen)
    });

    socketServices.on('Unhappy_To_End_Order', data => {
        console.log("Unhappy to end order : ",data);
    });

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>OrderProcessingScreenProfSide</Text>
      <Text>loading.......</Text>
      <TouchableOpacity onPress={onRequestToEnd} style={{ backgroundColor: COLOR.ORANGECOLOR , height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.WHITE  }}>Request to end order</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OrderProcessingScreenProfSide

const styles = StyleSheet.create({})