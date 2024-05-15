import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Servicedetails } from '../utils';

const ServiceDetails = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const { name } = route.params;
  console.log("===============", name);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('Man'); // Initially 'Man' is selected
  const [selectedItem, setSelectedItem] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 15, alignItems: 'center', height: Screen_Height * 0.12, borderRadius: 10, flexDirection: 'row', backgroundColor: COLOR.WHITE, paddingHorizontal: 20, justifyContent: 'space-between', borderColor: selectedItem === item.id ? COLOR.ORANGECOLOR : COLOR.WHITE, borderWidth: 2 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={item.image} style={{ width: Screen_Width * 0.16, height: Screen_Height * 0.08, borderRadius: 12 }} />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: COLOR.BLACK }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: COLOR.BLACK_70 }}>{item.order}</Text>
            <Text style={{ fontSize: 16, fontWeight: '500', color: COLOR.ORANGECOLOR }}>{item.price}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setSelectedItem(item.id)}>
          <FontAwesome name={selectedItem === item.id ? 'circle' : 'circle-o'} size={24} color={selectedOption === item.id ? COLOR.ORANGECOLOR : COLOR.ORANGECOLOR} />
        </TouchableOpacity>
      </View>
    </View>

  );
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, color: COLOR.BLACK }}>{name}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 10, flex: 1, justifyContent: 'center', gap: 10, marginTop: 10 }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.45, height: Screen_Height * 0.05, backgroundColor: selectedOption === 'Man' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30 }}
          onPress={() => handleOptionSelect('Man')}
        >
          <Text style={{ color: selectedOption === 'Man' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontSize: 20 }}>Man</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.45, height: Screen_Height * 0.05, backgroundColor: selectedOption === 'Woman' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30 }}
          onPress={() => handleOptionSelect('Woman')}
        >
          <Text style={{ color: selectedOption === 'Woman' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontSize: 20 }}>Woman</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Servicedetails}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={{ width: Screen_Width * 0.80, height: Screen_Height * 0.05, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center', marginTop: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE }}>Apply</Text>
      </TouchableOpacity>
      <View style={{ height: 90 }} />
    </ScrollView>
  )
}

export default ServiceDetails

const styles = StyleSheet.create({})