import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';

import { Dropdown } from 'react-native-element-dropdown';
import { ClockUserIcon, GearFineIcon, barber } from '../../../constants/Icons';
import { NavigationScreens } from '../../../constants/Strings';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import socketServices from '../../../Services/Socket';
import { showModal } from '../../../redux/modalAction';


const ProfessionalHome = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const dispatch = useDispatch()
    const inSalonData = [
        { value: 100, label: 'May' },
        { value: 600, label: 'Jun' },
        { value: 800, label: 'Jul' },
        {
            value: 600, label: 'Aug', customDataPoint: () => (
                <View style={styles.customLabel}>
                    <Text style={styles.labelText}>$27632</Text>
                    <Text style={styles.labelText}>August</Text>
                </View>
            ),
        },
        { value: 700, label: 'Sep' },
        { value: 750, label: 'Oct' },
    ];

    const deliveryData = [
        { value: 300, label: 'May' },
        { value: 400, label: 'Jun' },
        { value: 500, label: 'Jul' },
        { value: 800, label: 'Aug' },
        { value: 600, label: 'Sep' },
        { value: 900, label: 'Oct' },
    ];
    const [selectedYear, setSelectedYear] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [user, setUser] = useState('');
    const [selected, setSelected] = useState()
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => ({
        label: (currentYear - i).toString(),
        value: currentYear - i,
    }));

    useEffect(() => {
        // console.log('Setting up socket listener');
        // socketServices.on('create_order', data => {
        //     console.log('Received create_order event:', data);
        //     try {
        //         console.log('Attempting to show modal');
        //         dispatch(showModal(data.message.data.order));
        //         console.log('Modal action dispatched');
        //     } catch (error) {
        //         console.error('Error showing modal:', error);
        //     }
        // });

        // return () => {
        //     console.log('Cleaning up socket listener');
        //     socketServices.off('create_order');
        // };
    }, []);

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
            console.log('========  user ID   ===========', res.data.data.user)
            setUser(res.data.data.user);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 5

        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', marginVertical: 10
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 15,
        },
        name: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOR.BLACK,
            width: 100
        },
        role: {
            fontSize: 14,
            color: COLOR.GRAY,
        },
        menuIcon: {
            marginLeft: 'auto',
        },
        menuText: {
            fontSize: 24,
        },
        earningsContainer: {
            marginVertical: 20,
            padding: 20,
            backgroundColor: COLOR.BLACK,
            borderRadius: 10,
            alignItems: 'center',
        },
        earningsText: {
            fontSize: 28,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        percentageText: {
            fontSize: 16,
            color: COLOR.ORANGECOLOR, // COLOR.ORANGECOLOR-red color for percentage
        },
        earningsSubText: {
            fontSize: 16,
            color: COLOR.GRAY,
        },
        overview: {
            marginVertical: 20,
        },
        overviewTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: COLOR.BLACK
        },
        overviewRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10
        },
        overviewBox: {
            width: '48%',
            padding: 15,
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            margin: 2,
            elevation: 2,
            shadowColor: COLOR.BLACK,

        },
        overviewBoxTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        overviewBoxValue: {
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 5,
            color: COLOR.BLACK
        },
        overviewBoxSubText: {
            fontSize: 14,
            color: COLOR.GRAY,
        },
        increaseText: {
            fontSize: 16,
            color: COLOR.ChartBlue, // lime-green color for increase
        },
        decreaseText: {
            fontSize: 16,
            color: COLOR.ORANGECOLOR, // COLOR.ORANGECOLOR-red color for decrease
        },
        chartContainer: {
            marginVertical: 20,
            alignItems: 'center',
            backgroundColor: COLOR.WHITE,
            elevation: 2,
            marginHorizontal: 2,
            shadowColor: COLOR.BLACK,
            borderRadius: 20,
            height: Screen_Height * 0.48,
            justifyContent: 'center',

        },
        chartTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: COLOR.BLACK
        },
        customLabel: {
            backgroundColor: COLOR.WHITE,
            padding: 5,
            borderRadius: 5,
            shadowColor: COLOR.BLACK,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 3,
            color: COLOR.BLACK
        },
        labelText: {
            fontWeight: 'bold',
            textAlign: 'center',
            color: COLOR.BLACK
        },
        dropdownContainer: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            borderColor: COLOR.AuthField,
            padding: 10
        },
        dropdown: {
            height: 25,
            width: 150,
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
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE, height: Screen_Height, width: Screen_Width, paddingHorizontal: 15 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Image style={styles.avatar} source={barber} />
                        <View>
                            <Text style={styles.name} numberOfLines={1}>{user?.firstName}{' '}{user?.lastName}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity onPress={() => setSelected(!selected)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <MaterialCommunityIcons name={selected ? 'toggle-switch-off' : 'toggle-switch'} size={24} color={COLOR.BLACK} />
                            <Text style={{ color: COLOR.BLACK }}>Queue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfessionalScheduleScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <FastImage source={ClockUserIcon} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    marginVertical: 20,
                    padding: 20,
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 20,
                    margin: 2,
                    elevation: 2,
                    shadowColor: COLOR.BLACK,
                    alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <View>
                        <Text style={styles.earningsText}>10,254 <Text style={styles.percentageText}>1.5% ↓</Text></Text>
                        <Text style={styles.earningsSubText}>Earnings At This Week</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.TransactionHistoryScreen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <AntDesign name="right" size={28} color={COLOR.ChartBlue} />
                    </TouchableOpacity>

                </View>
                <View style={styles.overview}>
                    <Text style={styles.overviewTitle}>Overview</Text>
                    <View style={styles.overviewRow}>
                        <View style={styles.overviewBox}>
                            <Text style={styles.overviewBoxTitle}>Customer</Text>
                            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
                            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
                        </View>
                        <View style={styles.overviewBox}>
                            <Text style={styles.overviewBoxTitle}>Orders</Text>
                            <Text style={styles.overviewBoxValue}>300 <Text style={styles.increaseText}>+0.5% ↑</Text></Text>
                            <Text style={styles.overviewBoxSubText}>Compared to 280 last week</Text>
                        </View>
                    </View>
                    <View style={styles.overviewRow}>
                        <View style={styles.overviewBox}>
                            <Text style={styles.overviewBoxTitle}>Cancel Orders</Text>
                            <Text style={styles.overviewBoxValue}>59 <Text style={styles.decreaseText}>-1.5% ↓</Text></Text>
                            <Text style={styles.overviewBoxSubText}>Compared to 65 last week</Text>
                        </View>
                        <View style={styles.overviewBox}>
                            <Text style={styles.overviewBoxTitle}>Completed</Text>
                            <Text style={styles.overviewBoxValue}>241 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
                            <Text style={styles.overviewBoxSubText}>Compared to 215 last year</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.chartContainer}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: Screen_Width * 0.88, paddingHorizontal: 10 }}>
                        <Text style={styles.chartTitle}>Earning Figures</Text>
                        <View style={styles.dropdownContainer}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={theme === 1 ? { color: COLOR_LIGHT.BLACK } : { color: COLOR_DARK.WHITE }}
                                selectedItemTextStyle={theme === 1 ? { color: COLOR_LIGHT.BLACK } : { color: COLOR_DARK.WHITE }}
                                data={years}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="In this year"
                                value={selectedYear}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setSelectedYear(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: Screen_Width * 0.88, paddingHorizontal: 15, marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 20, backgroundColor: COLOR.ChartBlue }} />
                            <Text style={{ color: COLOR.BLACK }}>In Salon</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 20, backgroundColor: COLOR.ORANGECOLOR }} />
                            <Text style={{ color: COLOR.BLACK }}>Delivery</Text>
                        </View>
                    </View>
                    <LineChart
                        data={inSalonData}
                        data2={deliveryData}
                        height={Screen_Height * 0.3}
                        width={Screen_Width * 0.7}
                        yAxisLabelWidth={30}
                        initialSpacing={30}
                        color1={COLOR.ChartBlue}
                        color2={COLOR.ORANGECOLOR}
                        dataPointsColor1={COLOR.ChartBlue}
                        dataPointsColor2={COLOR.ORANGECOLOR}
                        thickness={3}
                        startFillColor1={COLOR.ChartBlue}
                        endFillColor1={COLOR.ChartBlue}
                        startOpacity1={0.5}
                        endOpacity1={0.1}
                        startFillColor2={COLOR.ORANGECOLOR}
                        endFillColor2={COLOR.ORANGECOLOR}
                        startOpacity2={0.5}
                        endOpacity2={0.1}
                        xAxisLabelTextStyle={{ color: COLOR.BLACK }}
                        yAxisLabelTextStyle={{ color: COLOR.BLACK }}
                        yAxisTextStyle={{ color: COLOR.BLACK }}
                    />

                </View>
                <View style={{ height: 100 }} />
            </View>
        </ScrollView>
    );
};



export default ProfessionalHome;

