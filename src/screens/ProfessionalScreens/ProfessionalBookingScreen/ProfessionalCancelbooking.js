import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image';
import { Successful } from '../../../constants/Icons';

const ProfessionalCancelbooking = () => {
    const navigation = useNavigation();
    const [bookmarkStatus, setBookmarkStatus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleBookmarkStatus = () => {
        setBookmarkStatus(prevState => !prevState);
    };

    return (
        <ScrollView>
            <View style={{ width: Screen_Width, height: Screen_Height * 0.83, paddingHorizontal: 15 }}>
                <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
                    <AntDesign onPress={() => navigation.navigate('My Booking')} name="arrowleft" size={30} color="black" />
                    <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Cancel Booking</Text>
                </View>
                <View style={{ justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ color: COLOR.GRAY, fontSize: 15 }}>Please select a payment refund method (only 80% will be refunded).</Text>
                </View>
                <View style={{ backgroundColor: COLOR.WHITE, height: 70, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                        <Zocial name="stripe" size={30} color={COLOR.BLUE} />
                        <Text style={{ fontWeight: '800', fontSize: 16, color: COLOR.BLACK }}>Strip Payment</Text>
                    </View>
                    <Octicons
                        name={bookmarkStatus ? "dot" : "dot-fill"}
                        size={40}
                        color={COLOR.ORANGECOLOR}
                        onPress={toggleBookmarkStatus}
                    />
                </View>

                <View style={{ alignSelf: 'center', position: 'absolute', bottom: 0 }}>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <View style={{ backgroundColor: COLOR.BLACK_30, height: 2, width: 85, top: 12 }} />
                            <Text style={{ fontSize: 15, color: COLOR.GRAY }}>Paid: $16.00</Text>
                        </View>
                        <Text style={{ fontWeight: '600', fontSize: 15, color: COLOR.BLACK }}>Refund: $14.40</Text>
                    </View>
                    <TouchableOpacity onPress={toggleModal} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15, width: Screen_Width * 0.90 }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '800' }}>Confirm Cancellation</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', height: Screen_Height * 0.50, width: Screen_Width * 0.80, borderRadius: 25, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <FastImage source={Successful} style={{ height: 150, width: 150 }} resizeMode='cover' />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLOR.ORANGECOLOR }}>Successful!</Text>
                            <Text style={{ marginVertical: 10, fontSize: 18, color: COLOR.GRAY,textAlign:'center' }}>You have successfully canceled your {"\n"} booking order.80% funds will be {"\n"} returned to your account</Text>
                            <TouchableOpacity onPress={toggleModal} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15, width: Screen_Width * 0.70 }}>
                                <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '800' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default ProfessionalCancelbooking;

const styles = StyleSheet.create({});
