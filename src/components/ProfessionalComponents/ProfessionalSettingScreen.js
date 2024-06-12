import { StyleSheet, Text, TouchableOpacity, Modal, View, Button, ScrollView, SectionList, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import CalendarScreen from '../Calendar';
import { ProfessionalProfileData } from '../utils';
import { Image } from 'react-native-svg';
import { barber } from '../../constants/Icons';
import { NavigationScreens } from '../../constants/Strings';

const ProfessionalSettingScreen = () => {
    const navigation = useNavigation()
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;


    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
            borderWidth: 1,
            borderColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 5
        },
        input: {
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: COLOR.BLACK
        },
        icon: {
            marginRight: 10
        },
        rememberContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10
        },
        dropdownContainer: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: COLOR.AuthField,
            padding: 10
        },
        dropdown: {
            height: 50,
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            paddingHorizontal: 8,
        },
        placeholderStyle: {
            fontSize: 16,
            color: COLOR.BLACK_40
        },
        selectedTextStyle: {
            fontSize: 16,
            color: COLOR.BLACK
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        icon: {
            marginRight: 10
        },
        dropdownItem: {
            padding: 10,
            backgroundColor: COLOR.AuthField,
            color: COLOR.BLACK
        },
        dropdownItemSelected: {
            backgroundColor: COLOR.AuthField,
            color: COLOR.BLACK
        },
        ImageText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: COLOR.BLACK,
            textAlign: 'center'
        },
        imageContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 },
        imageInnerContainer: {
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: COLOR.ORANGECOLOR,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            shadowColor: COLOR.ORANGECOLOR,
            position: 'relative',
            marginBottom: 20
        },
        image: {
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        cameraButton: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK,
            borderRadius: 25,
            height: 30,
            width: 30,
            position: 'absolute',
            right: 1,
            bottom: 1,
        },

        modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            // backgroundColor: COLOR.ROYALBLUE,

        },
        innerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '20%',
            width: '80%',
            backgroundColor: COLOR.ORANGECOLOR,
            borderRadius: 15,
        },
        closeButton: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
        },
        buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 30,
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: COLOR.BLACK,
            fontSize: 18,
            fontWeight: '700',
        },

        iconStyle: {
            width: 20,
            height: 20,
        },
        errorText: {
            color: COLOR.ROYALGOLDEN
        },
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: COLOR.WHITE,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: COLOR.GRAY,
        },
        dayText: {
            fontSize: 16,
            color: COLOR.BLACK
        },
        timeText: {
            fontSize: 16,
            color: COLOR.BLACK
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK_40,
        },
        modalContent: {
            width: '80%',
            backgroundColor: COLOR.WHITE,
            padding: 20,
            borderRadius: 10,
        },
        modalTitle: {
            fontSize: 18,
            marginBottom: 10,
            color: COLOR.BLACK
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        header: {
            fontSize: 20,
            backgroundColor: '#f4f4f4',
            padding: 10,
            fontWeight: 'bold',
        },
        item: {
            backgroundColor: '#fff',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        itemText: {
            fontSize: 16,
        },
    });


    return (
        <ScrollView style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15 }}>
            <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color={COLOR.BLACK} />
                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Settings</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold' }}>Account Settings</Text>
                <View>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <AntDesign name="user" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Personal information</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />

                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <AntDesign name="videocamera" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Tutorial</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={{ marginBottom: 20 }}>

                <Text style={{ fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold' }}>Pro</Text>
                <View>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />
                    <TouchableOpacity onPress={()=>navigation.navigate('Home Tab')} style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <AntDesign name="swap" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Switch to Client account</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />

                    <TouchableOpacity onPress={()=>navigation.navigate(NavigationScreens.FacilityBottomTab)} style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <AntDesign name="swap" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Become a host</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View> */}
            <View style={{ marginBottom: 20 }}>

                <Text style={{ fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold' }}>Support</Text>
                <View>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <AntDesign name="customerservice" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Support</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />

                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <MaterialIcons name="feedback" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Feedback</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginBottom: 20 }}>

                <Text style={{ fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold' }}>Legal</Text>
                <View>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <Ionicons name="newspaper" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Terms of service</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginBottom: 20 }}>

                <Text style={{ fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold' }}>Deletion</Text>
                <View>
                    <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, marginVertical: 10 }} />
                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.88, height: 50, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <AntDesign name="delete" size={20} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Account Deletion</Text>
                        </View>
                        <AntDesign name="right" size={20} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 50, flexDirection: 'row', backgroundColor: COLOR.ORANGECOLOR, borderRadius: 15}}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '600' }}>Logout</Text>
            </TouchableOpacity>
            <View style={{ height: 100 }} />
        </ScrollView>
    )
}
export default ProfessionalSettingScreen
