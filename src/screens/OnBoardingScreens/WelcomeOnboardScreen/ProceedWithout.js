import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';
import FastImage from 'react-native-fast-image';
import { Logo } from '../../../constants/Icons';

const ProceedWithout = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    return (
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: COLOR.WHITE, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage
                style={{ width: Screen_Width * 0.5, height: Screen_Height * 0.3 }}
                source={Logo}

                resizeMode={FastImage.resizeMode.contain}
            />
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SignUpScreen)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.9, height: 50, position: 'absolute', bottom: 120, backgroundColor: COLOR.ChartBlue, borderRadius: 25, marginHorizontal: 20 }}>
                <Text style={{ color: COLOR.WHITE, fontSize: 18, fontWeight: '500' }}>Sign up / Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.HomeTab)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.9, height: 50, position: 'absolute', bottom: 60, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 25, marginHorizontal: 20 }}>
                <Text style={{ color: COLOR.WHITE, fontSize: 18, fontWeight: '500' }}>Proceed without</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProceedWithout

const styles = StyleSheet.create({})