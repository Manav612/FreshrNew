import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';

import { Dropdown } from 'react-native-element-dropdown';
import { barber } from '../../../constants/Icons';
import { NavigationScreens } from '../../../constants/Strings';


const ProfessionalHome = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
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

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => ({
        label: (currentYear - i).toString(),
        value: currentYear - i,
    }));

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: COLOR.WHITE,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
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
            color: COLOR.BLACK
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
        },
        overviewBox: {
            width: '48%',
            padding: 15,
            backgroundColor: COLOR.WHITE,
            borderRadius: 10,
            marginVertical: 5
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
            shadowColor: COLOR.BLACK,
            borderRadius: 25,
            width: Screen_Width * 0.88,
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
            height: 40,
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Image style={styles.avatar} source={barber} />
                        <View>
                            <Text style={styles.name}>Nathan Alexander</Text>
                            <Text style={styles.role}>Senior Barber</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfessionalScheduleScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <MaterialIcons name="schedule" size={28} color={COLOR.ChartBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfessionalSettingScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <AntDesign name="setting" size={28} color={COLOR.ChartBlue} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginVertical: 20,
                    padding: 20,
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 10,
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
                        xAxisLabelTextStyle={{color:COLOR.BLACK}}
                        yAxisLabelTextStyle={{color:COLOR.BLACK}}
                        yAxisTextStyle={{color:COLOR.BLACK}}
                    />

                </View>
                <View style={{ height: 100 }} />
            </View>
        </ScrollView>
    );
};



export default ProfessionalHome;
