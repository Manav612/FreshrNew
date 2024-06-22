import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Servicesdata } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';

const OurServices = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

    const navigation = useNavigation();

    const renderitem = ({ item }) => (
        <TouchableOpacity style={{
            backgroundColor: COLOR.WHITE,
            marginTop: 10,
            width: Screen_Width * 0.92,
            height: Screen_Height * 0.08,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderRadius: 10,
            flexDirection: 'row'
        }} onPress={() => navigation.navigate('ServiceDetails Screen', { name: item.name })}>
            <Text style={{ color: COLOR.BLACK_40, fontSize: 16 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 14, fontWeight: '600', paddingRight: 10 }}>{item.type}</Text>
                <AntDesign name="caretright" size={14} color={COLOR.ORANGECOLOR} />
            </View>
        </TouchableOpacity>
    );
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Select Services</Text>
                    </View>
                    {/* <TouchableOpacity>
                    <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
                </TouchableOpacity> */}
                </View>
                <FlatList
                    data={Servicesdata}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderitem}
                />

                <View style={{ height: 170 }} />
            </ScrollView>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15, position: 'absolute', bottom: 90, width: Screen_Width * 0.95, marginHorizontal: 10 }} onPress={() => navigation.navigate(NavigationScreens.BookAppointmentScreen)}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Select Timing</Text>
            </TouchableOpacity>
        </>
    )
}

export default OurServices

const styles = StyleSheet.create({})