import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';

const OrderProcessingScreenProfSide = ({route}) => {
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
    <View>
      <Text>OrderProcessingScreenProfSide</Text>
      <Text>OrderProcessingScreenProfSide</Text>
      <Text>loading.......</Text>
      <TouchableOpacity onPress={onRequestToEnd}>
        <Text>Request to end order</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OrderProcessingScreenProfSide

const styles = StyleSheet.create({})