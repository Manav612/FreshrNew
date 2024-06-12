import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';

const ProceedWithout = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    return (
        <View style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: COLOR.WHITE, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLOR.BLACK, fontSize: 30, fontWeight: '800' }}>Freshr</Text>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SignUpScreen)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.9, height: 50, position: 'absolute', bottom: 150, backgroundColor: COLOR.ChartBlue, borderRadius: 25, marginHorizontal: 20 }}>
                <Text style={{ color: COLOR.WHITE, fontSize: 18, fontWeight: '500' }}>Sign up / Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.HomeTab)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.9, height: 50, position: 'absolute', bottom: 80, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 25, marginHorizontal: 20 }}>
                <Text style={{ color: COLOR.WHITE, fontSize: 18, fontWeight: '500' }}>Proceed without</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProceedWithout

const styles = StyleSheet.create({})