import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Specialist } from '../utils';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
const OurSpecialistDetails = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation()
  const renderItem3 = ({ item }) => (
    <View style={{ alignItems: 'center', marginTop: 10 }}>
      <TouchableOpacity style={{ width: Screen_Width * 0.88, height: Screen_Height * 0.12, borderRadius: 25, marginHorizontal: 5,paddingHorizontal:10, justifyContent:'space-between',flexDirection:'row', alignItems: 'center' }}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10}}>
        <FastImage source={item.image} style={{ width:80, height:80, borderRadius: 40 }} />
        <View style={{ }}>
          <Text style={{ color: COLOR.BLACK,fontWeight:'bold', fontSize: 16,textAlign:'left' }}>{item.title}</Text>
          <Text style={{ color: COLOR.BLACK_40, fontSize: 14 }}>{item.type}</Text>
        </View>
        </View>
        <TouchableOpacity style={{backgroundColor:COLOR.ORANGECOLOR,justifyContent:'center',alignItems:'center',width:100,height:30,borderRadius:20}} onPress={()=>navigation.navigate('Chat Screen',{title:item.title})}>
          <Text style={{color:COLOR.WHITE,fontWeight:'500'}}>message</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{backgroundColor:COLOR.LINECOLOR,height:2,width:Screen_Width*0.88}}/>

    </View>
  );
  return (
    <View>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10,marginHorizontal:10 }}>
                <View style={{flexDirection:'row',gap:10}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Our Specialist</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="search" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
      <FlatList
        data={Specialist}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem3}
      />
    </View>
  )
}

export default OurSpecialistDetails

const styles = StyleSheet.create({})