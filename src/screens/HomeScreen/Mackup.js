import { ScrollView,StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import {Screen_Height,Screen_Width } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';

const Mackup = ({ navigation }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  return (
      <ScrollView style={{ width: Screen_Width, height: Screen_Height,paddingHorizontal:15 }}>
      <View style={{width:Screen_Width,height:Screen_Height*0.05,flexDirection:'row',alignItems:'center',gap:15,marginVertical:10}}>
        <AntDesign onPress={() => navigation.navigate('HomeScreen')} name="arrowleft" size={30} color="black" />
        <Text style={{fontWeight:'600',fontSize:25,color:'black'}}>Mack Up</Text>
      </View>  
      <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.91, height: 50,paddingHorizontal:10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10,alignItems:'center' }}>
          <AntDesign name="search1" size={30} color={COLOR.GRAY} />
          <TextInput placeholder='Search' placeholderTextColor={COLOR.GRAY} style={{ fontSize: 20,color:COLOR.GRAY }}>Search</TextInput>
        </View>
        <Ionicons name="filter" size={30} color={COLOR.ORANGECOLOR} />
      </View>
      
    </ScrollView>
  )
}

export default Mackup

const styles = StyleSheet.create({})