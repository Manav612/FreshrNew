import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Width } from '../../constants/Constants';

const OrderProcessingScreenClientSide = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [accept, setAccept] = useState('')
    const [applySelected, setApplySelected] = useState(false);

    const navigation = useNavigation()
    socketServices.on('Request_To_End_Order', data => {
        console.log("END ORDER Calllllllllllllll : ", data);
        setAccept(data.message.id);

    });

    const onAcceptRequestEnd = () => {
        setApplySelected('Accept request to end order')
        navigation.navigate(NavigationScreens.HomeScreen)
        socketServices.emit('order_update', {
            recipient: accept,
            message: {
                type: 'Accept_To_End_Order',
                id: accept,
            },
        });
    }

    const onUnhappyPress = () => {
        setApplySelected('unhappy')
        socketServices.emit('order_update', {
            recipient: accept,
            message: {
                type: 'Unhappy_To_End_Order',
                id: accept,
            },
        });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                    <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>

                        <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>

                            <TouchableOpacity onPress={onAcceptRequestEnd} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Accept request to end order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onUnhappyPress} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>unhappy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
            }

        </View>
    )
}

export default OrderProcessingScreenClientSide

const styles = StyleSheet.create({})