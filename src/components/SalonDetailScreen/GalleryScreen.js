import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { Servicesdata2, Servicesdata3 } from '../utils';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const GalleryScreen = ({facilitiesData}) => {
    console.log("========  facilitiesData  ============>", facilitiesData);
    const galleryImages = facilitiesData?.gallery;
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
const navigation = useNavigation()
  const renderitem = ({ item}) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',marginHorizontal:10, marginBottom: 10 }}>
          <FastImage source={{ uri: item }} style={{ width:Screen_Width*0.26,height:Screen_Height*0.13,borderRadius:10 }} />
    </View>
  );
  return (
    <View>
     <View style={{ justifyContent: 'space-between', alignItems:'center',marginTop:10,paddingHorizontal:10, flexDirection: 'row' }}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK }}>Our Gallery</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }} onPress={()=>navigation.navigate('OurGallery Screen')}>See All</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.88, marginVertical: 20,marginHorizontal:10 }} />
      <FlatList
        data={galleryImages}
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