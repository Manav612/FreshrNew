import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';

const OrderProcessingScreenClientSide = () => {
    const [accept,setAccept]= useState('')
const navigation = useNavigation()
    socketServices.on('Request_To_End_Order', data => {
        console.log("END ORDER Calllllllllllllll : ",data);
        setAccept(data.message.id);

       });

       const onAcceptRequestEnd = ()=>{
        navigation.navigate(NavigationScreens.HomeScreen)
        socketServices.emit('order_update', {
            recipient:accept,
            message: {
                type: 'Accept_To_End_Order',
                id:accept,
            },
        });
    }

    const onUnhappyPress = ()=>{
        socketServices.emit('order_update', {
            recipient:accept,
            message: {
                type: 'Unhappy_To_End_Order',
                id:accept,
            },
        });
    }

  return (
    <View>
      <Text>Order is Processing</Text>
     
      <Text>loading.......</Text>
      {accept && (
        <>
      <TouchableOpacity onPress={onAcceptRequestEnd}>
        <Text>Accept request to end order</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onUnhappyPress}>
        <Text>unhappy</Text> 
      </TouchableOpacity>
      </>
      )
}
    
    </View>
  )
}

export default OrderProcessingScreenClientSide

const styles = StyleSheet.create({})