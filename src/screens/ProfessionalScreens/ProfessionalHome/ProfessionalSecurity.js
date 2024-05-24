import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';

const ProfessionalSecurity = () => {
    const navigation = useNavigation()
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const [toggleStatus, setToggleStatus] = useState({});
    const [toggleStatus1, setToggleStatus1] = useState({});
    const [toggleStatus2, setToggleStatus2] = useState({});

    const toggleBookmark = () => {
        setToggleStatus(prevState => ({
            ...prevState,
            "dark_mode": !prevState["dark_mode"]
        }));
    };

    const toggleBookmark1 = () => {
        setToggleStatus1(prevState => ({
            ...prevState,
            "dark_mode": !prevState["dark_mode"]
        }));
    };

    const toggleBookmark2 = () => {
        setToggleStatus2(prevState => ({
            ...prevState,
            "dark_mode": !prevState["dark_mode"]
        }));
    };


    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
            <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Security</Text>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, flexDirection: 'row' }}>
                <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Remeber me</Text>
                <TouchableOpacity onPress={() => toggleBookmark("dark_mode")}>
                    <FontAwesome
                        name={toggleStatus["dark_mode"] ? "toggle-off" : "toggle-on"}
                        size={30}
                        color={COLOR.ORANGECOLOR}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, flexDirection: 'row' }}>
                <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Face ID</Text>
                <TouchableOpacity onPress={() => toggleBookmark1("dark_mode")}>
                    <FontAwesome
                        name={toggleStatus1["dark_mode"] ? "toggle-off" : "toggle-on"}
                        size={30}
                        color={COLOR.ORANGECOLOR}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, flexDirection: 'row' }}>
                <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Biometric ID</Text>
                <TouchableOpacity onPress={() => toggleBookmark2("dark_mode")}>
                    <FontAwesome
                        name={toggleStatus2["dark_mode"] ? "toggle-off" : "toggle-on"}
                        size={30}
                        color={COLOR.ORANGECOLOR}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Google Authenticator</Text>
                <AntDesign name="right" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    borderRadius: 35,
                    backgroundColor: COLOR.GULABI,
                    marginVertical:10
                }}
            >
                 <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20, fontWeight: '500' }}>
                    Change Password
                </Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default ProfessionalSecurity

const styles = StyleSheet.create({})