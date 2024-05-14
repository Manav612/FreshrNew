import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { Servicesdata2 } from '../utils';

const PackageScreen = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const renderitem = ({ item }) => (
    <View style={{
      backgroundColor: COLOR.WHITE,
      marginTop: 10,
      width: Screen_Width * 0.92,
      height: Screen_Height * 0.14,
      alignItems: 'center',
      paddingHorizontal: 20,
      borderRadius: 10,
      flexDirection: 'row'
    }}>
      <Image style={{ width: Screen_Width * 0.22, height: Screen_Height * 0.10, borderRadius: 10 }} source={item.image} />
      <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
        <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: '600', paddingRight: 10 }}>{item.name}</Text>
        <Text style={{ color: COLOR.BLACK_40, fontSize: 14, fontWeight: '600', paddingRight: 10 }}>{item.type}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Screen_Width * 0.55, alignItems: 'center' }}>
          <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 16, fontWeight: '600', paddingRight: 10 }}>{item.price}</Text>
          <TouchableOpacity style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.04, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: COLOR.WHITE }}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View>
      <View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row' }}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK }}>Our Package</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }}>See All</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} />
      <FlatList
        data={Servicesdata2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderitem}
      />
    </View>
  )
}

export default PackageScreen

const styles = StyleSheet.create({})