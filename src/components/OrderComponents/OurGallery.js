
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Servicesdata3 } from '../utils';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OurGallery = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
    const renderitem = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, margin: 5 }}>
            <Image source={item.image} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />
        </View>
    );
    return (
        <View style={{paddingHorizontal:15}}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                   marginVertical:10
                }}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />

                    <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
                        Our Gallery
                    </Text>
                </View>

                <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="dots-horizontal-circle-outline"
                        size={28}
                        color={COLOR.BLACK}
                    />
                </TouchableOpacity>

            </View>
            {/* <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} /> */}
            <FlatList
                data={Servicesdata3}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                key={3}
                keyExtractor={item => item.id}
                renderItem={renderitem}
            />
        </View>
    )
}

export default OurGallery

const styles = StyleSheet.create({})