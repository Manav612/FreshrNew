import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { Servicesdata2, Servicesdata3 } from '../utils';
import { useNavigation } from '@react-navigation/native';

const GalleryScreen = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
const navigation = useNavigation()
  const renderitem = ({ item}) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,margin:5 }}>
          <Image source={item.image} style={{ width:Screen_Width*0.28,height:Screen_Height*0.13,borderRadius:10 }} />
    </View>
  );
  return (
    <View>
     <View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row' }}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK }}>Our Gallery</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }} onPress={()=>navigation.navigate('OurGallery Screen')}>See All</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} />
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

export default GalleryScreen

const styles = StyleSheet.create({})