import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { Servicesdata } from '../../../components/utils';
import { NavigationScreens } from '../../../constants/Strings';


const profselectedDetailservice = ({ route }) => {
    const { item } = route.params
    console.log("==================", item);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();

    const [distance, setDistance] = useState(50);
    const [open, setOpen] = useState('');
    const [selectedItem, setSelectedItem] = useState(item);
    const handleSelect = (selectedItem) => {
        setSelectedItem(selectedItem);
        setOpen(false);
    };
    const styles = StyleSheet.create({
        input: {
            height: 70,
            marginLeft: 10,
            fontSize: 16,
            color: COLOR.BLACK,
            borderColor: COLOR.BLACK,
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 10
        },
        button: {
            backgroundColor: COLOR.ORANGECOLOR,
            justifyContent: 'center',
            borderRadius: 20,
            alignItems: 'center',
            height: 40,
            width: Screen_Width * 0.89,
            marginHorizontal: 10,
            marginVertical: 10,
        },
    })
    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
            <View style={{ width: Screen_Width * 0.89, height: 60, borderRadius: 10, marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><AntDesign name="arrowleft" size={30} color={COLOR.GRAY} /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setOpen(!open)} style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.89, height: 60, borderRadius: 10, marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', margin: 10 }}>
                    <Image source={selectedItem.img} style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 10 }} />
                    <Text>{selectedItem.name}</Text>
                </View>
                <AntDesign name={open ? "up" : "down"} size={27} color={COLOR.GRAY} />
            </TouchableOpacity>
            {open && (
                <FlatList
                    data={Servicesdata}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelect(item)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={item.img} style={{ height: 50, width: 50, resizeMode: 'cover', marginVertical: 10, borderRadius: 10 }} />
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
            <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.89, height: 225, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, alignItems: 'center' }}>
                <Image source={item.img} style={{ height: 150, width: 150, resizeMode: 'cover', margin: 10 }} />
                <TouchableOpacity style={{ backgroundColor: COLOR.ORANGECOLOR, height: 30, width: 125, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}><Text style={{ color: COLOR.WHITE, fontSize: 16 }}>Change image</Text></TouchableOpacity>
            </View>
            <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.89, height: 80, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 18 }}>Prices</Text>
                <TextInput
                    placeholder='$ 2000'
                    placeholderTextColor={COLOR.BLACK}
                    style={{ fontSize: 20, color: COLOR.BLACK, width: 100 }}
                />
            </View>
            <View style={{ width: Screen_Width * 0.89, height: 80, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, borderColor: COLOR.BLACK, borderWidth: 1 }}>
                <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 16, margin: 10 }}>Estimated Max duration in Minutes:<Text style={{color:COLOR.ORANGECOLOR}}>{distance} min</Text></Text>
                <Slider
                    style={{ width: '100%', marginTop: 10 }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    minimumTrackTintColor={COLOR.BLACK}
                    maximumTrackTintColor={COLOR.BLACK}
                    thumbTintColor={COLOR.BLACK}
                    value={distance}
                    onValueChange={(value) => setDistance(value)}
                />
            </View>
            <TextInput
                style={[styles.input, { color: COLOR.BLACK }]}
                placeholderTextColor={COLOR.BLACK}
                placeholder="Serice's description"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16, }}>Create Service</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default profselectedDetailservice

