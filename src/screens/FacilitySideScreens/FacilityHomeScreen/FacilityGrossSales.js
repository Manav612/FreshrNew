import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { NavigationScreens } from '../../../constants/Strings';
import { Dropdown } from 'react-native-element-dropdown';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { LineChart } from 'react-native-gifted-charts';
import { FacilityData } from '../../../components/utils';
import { Hair1 } from '../../../constants/Icons';

const FacilityGrossSales = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [isFocus, setIsFocus] = useState(false);
    const [gender, setGender] = useState('');
    const [selectedYear, setSelectedYear] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        toggleModal();
        // Handle the selected item here, e.g., navigate to the FacilityDetalisScreen
    };


    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => ({
        label: (currentYear - i).toString(),
        value: currentYear - i,
    }));

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

    const styles = StyleSheet.create({
        HeaderView: {

            marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
        },
        dropdown: {
            height: 40,
            width: 150,
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            paddingHorizontal: 8,
            marginBottom: 10
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
        chartContainer: {
            marginVertical: 20,
            alignItems: 'center',
            backgroundColor: COLOR.WHITE,
            elevation: 2,
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
        earningsContainer: {
            marginVertical: 20,
            padding: 20,
            backgroundColor: COLOR.BLACK,
            borderRadius: 10,
            alignItems: 'center',
        },
        earningsText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        earningsSubText: {
            fontSize: 16,
            color: COLOR.GRAY,
        },
    });

    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15,backgroundColor:COLOR.WHITE }}>
            <View style={styles.HeaderView}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Gross Sales</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilitySettingScreen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>

            {/* <View>
                <TouchableOpacity
                    style={{
                        marginVertical: 10,
                        padding: 20,
                        backgroundColor: COLOR.WHITE,
                        borderRadius: 20,
                        elevation: 2,
                        shadowColor: COLOR.BLACK,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    onPress={toggleModal}
                >
                    {selectedItem ? (
                        <>
                            <Image
                                source={Hair1}
                                style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 10 }}
                            />
                            <View style={{ width: Screen_Width * 0.5 }}>
                                <Text style={styles.earningsText}>{selectedItem.name}</Text>
                                <Text style={styles.earningsSubText}>{selectedItem.title}</Text>
                            </View>
                        </>
                    ) : (
                        <Text>Select a facility</Text>
                    )}
                    <AntDesign name="down" size={28} color={COLOR.ChartBlue} />
                </TouchableOpacity>

                <Modal visible={isModalVisible} animationType="slide">
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={FacilityData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        marginVertical: 10,
                                        marginHorizontal: 15,
                                        padding: 20,
                                        backgroundColor: COLOR.WHITE,
                                        borderRadius: 20,
                                        elevation: 2,
                                        shadowColor: COLOR.BLACK,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent:'space-between',
                                        gap: 20,
                                    }}
                                    onPress={() => handleItemSelect(item)}
                                >
                                   
                                    <Image
                                        source={Hair1}
                                        style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 10 }}
                                    />
                                    <View style={{ width: Screen_Width * 0.5 }}>
                                        <Text style={styles.earningsText}>{item.name}</Text>
                                        <Text style={styles.earningsSubText}>{item.title}</Text>
                                    </View>
                                    <Fontisto
                                        name={selectedItem?.id === item.id ? "checkbox-active" : "checkbox-passive"}
                                        size={24}
                                        color={COLOR.ORANGECOLOR}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={{ padding: 20, backgroundColor: COLOR.WHITE }}
                            onPress={toggleModal}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View> */}

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
        </ScrollView>
    )
}

export default FacilityGrossSales

