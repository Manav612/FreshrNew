import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { OnBoard1 } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';

const ProfessionalCancelled = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();

    const Cancelled =[
        { id: 1, title: 'Dec 22, 2024 - 10:00 AM', Name: 'Lighthouse Barbers', Text: '5010 Hudson Plaza', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash', resetSelected: false, applySelected: false },
        { id: 2, title: 'Nov 20, 2024 - 13:00 pM', Name: 'Quinaatura Salon', Text: '7892 Prairieview Avenue', Avelebal: 'Services', SBT: 'Undercut Haircut, Regular Shaving, Natural Hair Wash,Shampoo Hair Wash', resetSelected: false, applySelected: false },
        { id: 3, title: 'Oct 18, 2024 - 16:00 PM', Name: 'Luxuriate Barber', Text: '0496 8th Street', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash', resetSelected: false, applySelected: false },
        { id: 4, title: 'May 12, 2024 - 12:00 AM', Name: 'Jelly Salon', Text: 'Uma Chokadi, Baroda', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash', resetSelected: false, applySelected: false },
        { id: 5, title: 'Jun 26, 2024 - 11:00 pM', Name: 'Ajanta Barbers', Text: 'Rk Prime,Rajkot', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash', resetSelected: false, applySelected: false },
    ];

    

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 10, paddingHorizontal: 20, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginVertical:10 }}>
                <View>
                <Text style={{ fontSize: 14, color: COLOR.BLACK}}>{item.title}</Text>
                </View>
             
                <View style={{ backgroundColor: COLOR.CANCEL_B, width: 75, height: 25, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: COLOR.WHITE }}>Cancelled</Text></View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <View style={{ height: 65, width: 65, backgroundColor: item.color, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={OnBoard1} style={{ width: 90, height: 100, resizeMode: 'cover', borderRadius: 10 }} />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLOR.BLACK, marginVertical: 2 }}>{item.Name}</Text>
                    <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{item.Text}</Text>
                    <Text style={{ fontSize: 15, color: COLOR.GRAY, marginVertical: 2 }}>{item.Avelebal}:</Text>
                    <Text style={{ fontSize: 15, color: COLOR.ORANGECOLOR, marginVertical: 2 }}>{item.SBT}</Text>
                </View>
            </View >
        </View>
    );

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 15, marginHorizontal: 15 }}
            data={Cancelled}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    )
}


export default ProfessionalCancelled

const styles = StyleSheet.create({})