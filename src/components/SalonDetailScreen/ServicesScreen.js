import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Servicesdata } from '../utils';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ServicesScreen = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const renderitem = ({ item }) => (
    <TouchableOpacity style={{
      backgroundColor: COLOR.WHITE,
      marginTop: 10,
      width: Screen_Width * 0.92,
      height: Screen_Height * 0.08,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal:10,
      borderRadius: 10,
      flexDirection: 'row'
    }}>
      <Text style={{ color: COLOR.BLACK_40, fontSize: 16 }}>{item.name}</Text>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{ color: COLOR.BLACK, fontSize: 14, fontWeight: '600',paddingRight:10}}>{item.type}</Text>
        <AntDesign name="caretright" size={14} color={COLOR.ORANGECOLOR} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row' }}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK }}>Our Services</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }}>See All</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} />
      <FlatList
        data={Servicesdata}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderitem}
      />
      <TouchableOpacity style={{ width: Screen_Width * 0.80, height: Screen_Height * 0.05, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center',marginTop:5}}>
        <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE }}>Book Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ServicesScreen

const styles = StyleSheet.create({})