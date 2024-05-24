import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';

const TransactionHistoryScreen = () => {

    const refRBSheet = useRef([]);
    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };
    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const handleResetPress = () => {
        setResetSelected(!resetSelected);
        setApplySelected(false);
    };

    const handleApplyPress = () => {
        setApplySelected(!applySelected);
        setResetSelected(false);
    };

    const TransactionData = [
        {
            id: 1,
            text: 'Payment from #10321',
            button: 'Pending',
            date: 'Mar 21,2019,3:30pm',
            price: '+ $10,255'
        },
        {
            id: 2,
            text: 'Process Refund #00910',
            button: 'Completed',
            date: 'Mar 21,2019,3:30pm',
            price: '- $17.50'
        },
        {
            id: 3,
            text: 'Pay. Pending #087651',
            button: 'Declined',
            date: 'Mar 21,2019,3:30pm',
            price: '3 items'
        },
        {
            id: 4,
            text: 'Payment from #023328',
            button: 'Completed',
            date: 'Mar 21,2019,3:30pm',
            price: '+ $250.00'
        },
        {
            id: 5,
            text: 'Pay. Pending #087651',
            button: 'Declined',
            date: 'Mar 21,2019,3:30pm',
            price: '+ $10,255'
        },
        {
            id: 6,
            text: 'Payment from #10321',
            button: 'Pending',
            date: 'Mar 21,2019,3:30pm',
            price: '+ $10,255'
        },
        {
            id: 7,
            text: 'Payment from #10321',
            button: 'Declined',
            date: 'Mar 21,2019,3:30pm',
            price: '3 items'
        },
        {
            id: 8,
            text: 'Payment from #10321',
            button: 'Completed',
            date: 'Mar 21,2019,3:30pm',
            price: '+ $20,255'
        },
        {
            id: 9,
            text: 'Payment from #10321',
            button: 'Declined',
            date: 'Mar 21,2019,3:30pm',
            price: '3 items'
        },
        {
            id: 10,
            text: 'Payment from #10321',
            button: 'Completed',
            date: 'Mar 21,2019,3:30pm',
            price: '+ $30,255'
        },
    ]
    const navigation = useNavigation()
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
            <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
                <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>TRANSACTION HISTORY</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',marginVertical:15}}>
                <Text style={{ fontWeight: '400', fontSize: 15, color: COLOR.BLACK }}>19-25 may</Text>
                <TouchableOpacity onPress={() => { handleResetPress(), openBottomSheet() }} style={{ width: 45, height: 45, backgroundColor:COLOR.WHITE,elevation:20,shadowColor:COLOR.ChartBlue, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}><Feather name="filter" size={30} color={COLOR.ChartBlue} /></TouchableOpacity>
            </View>
            <FlatList
                data={TransactionData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item,index }) => {
                    return (
                        <View style={{height:80,justifyContent: 'space-between', flexDirection: 'column',backgroundColor:index % 2 === 0 ? COLOR.AuthField : COLOR.WHITE,marginVertical:'auto' }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 15,marginHorizontal:10 }}>
                                <Text style={{fontSize:17,color:COLOR.BLACK}}>{item.text}</Text>
                                <Text
                                    style={{
                                        backgroundColor:item.button === 'Completed' ? COLOR.COMBTN : item.button === 'Pending' ? COLOR.GRAYBTN : COLOR.DECBTN,
                                        borderRadius: 5,
                                        width: 80,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        color: item.button === 'Completed' ? 'green' : item.button === 'Pending' ? 'red' : 'gray'
                                    }}
                                >
                                    {item.button}
                                </Text>

                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',marginHorizontal:10}}>
                                <Text>{item.date}</Text>
                                <Text style={{fontSize:16,fontWeight:'bold',color:COLOR.BLACK}}>{item.price}</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{height:100}}/>
            <View>
                <RBSheet
                    ref={(ref) => (refRBSheet.current[0] = ref)}

                    height={Screen_Height * 0.30}
                    customStyles={{

                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            backgroundColor: COLOR.WHITE,
                            borderRadius: 40,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            elevation: 10,
                            shadowColor: COLOR.BLACK,
                        },
                        draggableIcon: {
                            backgroundColor: COLOR.BLACK,
                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>
                    <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontWeight: '600', fontSize: 25,color:COLOR.CANCEL_B }}>Transaction History</Text>
                        </View>
                        {/* <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
                        <View style={{justifyContent:'center',marginVertical:10,paddingHorizontal:30,gap:10}}>
                            <Text style={{color:COLOR.BLACK,textAlign:'center',fontSize:18,fontWeight:'800'}}>Are you sure want to cancel your barber/salon booking?</Text>
                            <Text style={{color:COLOR.GRAY,textAlign:'center',fontSize:15}}>Only 80% of the money you can refund from your payment according to our policy</Text>
                        </View>
                        <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => {handleResetPress(); refRBSheet.current[0].close()}} style={{ backgroundColor: resetSelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{handleApplyPress(); refRBSheet.current[0].close()}} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes, Cancel Booking</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>    
                </RBSheet>
            </View>
        </ScrollView>
    )
}

export default TransactionHistoryScreen

const styles = StyleSheet.create({})