import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';

const PaymentMethod = ({ route }) => {
    const navigation = useNavigation();
    const { services, address, data } = useMemo(() => route.params, [route.params]);
    const [bookmarkStatus, setBookmarkStatus] = useState(false);
    const theme = useSelector(state => state.ThemeReducer);

    const COLOR = useMemo(() => theme == 1 ? COLOR_DARK : COLOR_LIGHT, [theme]);
    const COLOR1 = useMemo(() => theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT, [theme]);

    console.log("=======  data socket    =======", data);

    const toggleBookmarkStatus = useCallback(() => {
        setBookmarkStatus(prevState => !prevState);
    }, []);

    const navigateToReviewSummary = useCallback(() => {
        navigation.navigate('ReviewSummary Screen', {
            services: services,
            address: address,
            OrderData: data
        });
    }, [navigation, services, address, data]);

    return (
        <ScrollView>
            <View style={{ width: Screen_Width, height: Screen_Height * 0.83, paddingHorizontal: 15 }}>
                <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
                    <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
                    <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Payment Method</Text>
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
                    <TouchableOpacity onPress={navigateToReviewSummary} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15, width: Screen_Width * 0.90 }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '800' }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default PaymentMethod;

const styles = StyleSheet.create({});