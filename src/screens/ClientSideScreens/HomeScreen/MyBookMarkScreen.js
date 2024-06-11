import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from '../../../components/Category';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Filter } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MyBookMarkScreen = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('Delivery');
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [searchText, setSearchText] = useState('');
  const styles = StyleSheet.create({
    HeaderView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    HeaderText: { color:COLOR.BLACK, fontSize: 22, fontWeight: '600', marginLeft: 10 },
  });
  // const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  return (
    <ScrollView style={{backgroundColor:COLOR.WHITE}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
          alignItems: 'center',
        }}>
        <View style={styles.HeaderView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Following</Text>
        </View>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={30}
            color={COLOR.BLACK}
          />
        </TouchableOpacity> */}
      </View>
      <View style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginVertical: 10, marginHorizontal: 10, padding: 10, elevation: 2, shadowColor: COLOR.BLACK }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Where do we meet?</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Salon</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width*0.9, height: 50,paddingHorizontal:10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginVertical: 20 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <AntDesign name="search1" size={30} color={COLOR.GRAY} />
          <TextInput
            placeholder='Search'
            placeholderTextColor={COLOR.GRAY}
            style={{ fontSize: 20, color: COLOR.GRAY, width: 200 }}
            // onChangeText={text => {
            //   setSearchText(text);
            //   handleSearch();
            // }}
          />
        </View>
        <TouchableOpacity > 
          {/* //onPress={openBottomSheet} */}
          <FastImage source={Filter} style={{ height: 20, width: 20 }} />

        </TouchableOpacity>
      </View>
      <Category />
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default MyBookMarkScreen;


