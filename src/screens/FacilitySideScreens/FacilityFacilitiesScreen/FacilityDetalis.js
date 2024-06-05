import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConfirmationForCreateFacilitie from '../OnBoardingScreens/ConfirmationForCreateFacilitie/ConfirmationForCreateFacilitie';

const FacilityDetalis = ({ route }) => {
  const { data } = route.params
  console.log('=============>', data);
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  return (
    <ScrollView>
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
          <Text style={styles.HeaderText}>{data.name}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfessionalSettingScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <AntDesign name="setting" size={28} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
        <TouchableOpacity style={{height:50,width:160,backgroundColor:'#D9D9D9',alignItems:'center',justifyContent:'center'}}><Text style={{size:20,color:COLOR.BLACK}}>Manage seats</Text></TouchableOpacity>
        <TouchableOpacity style={{height:50,width:160,backgroundColor:'#D9D9D9',alignItems:'center',justifyContent:'center'}}><Text style={{size:20,color:COLOR.BLACK}}>Edit Facility</Text></TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default FacilityDetalis

const styles = StyleSheet.create({
  HeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderText: { color: '#000', fontSize: 22, fontWeight: '600', marginLeft: 10 },
})