import { StyleSheet, Text, View,SectionList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Hair1 } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';

const FacilityHistory = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const notifications = [
    { title: 'Today', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ',services:'Services', description:'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash',time:'Dec 22,2024 - 10:00 AM' }] },
    { title: 'Yesterday', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ',services:'Services', description:'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash',time:'Nov 25,2024 - 10:00 AM'  }] },
    { title: "Today's Special Offers", data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ',services:'Services', description:'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash',time:'Oct 19,2024 - 10:00 AM'  }] },
    { title: 'December 11, 2024', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ',services:'Services', description:'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash',time:'May 16,2024 - 10:00 AM'  }] },
    { title: 'Account Setup Successful!', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ',services:'Services', description:'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash',time:'Jun 22,2024 - 10:00 AM'  }] },
]; 

const renderItem = ({ item }) => (
  <>
  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', paddingHorizontal:15, paddingVertical: 10, backgroundColor:COLOR.WHITE,borderRadius:10}}>
          <Image source={Hair1} style={{ width: 100, height: 100,borderRadius:10,resizeMode:'cover'}} />
      <View style={{width:Screen_Width*0.53}}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLOR.BLACK}}>{item.message}</Text>
          <Text style={{ fontSize: 15, color: COLOR.BLACK }}>{item.price}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.GRAY}}>{item.services}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.ORANGECOLOR}}>{item.description}</Text>
          <Text style={{ fontSize: 15, color: COLOR.BLACK }}>{item.time}</Text>
      </View>
  </View>
  <View style={{height:100}}/>
  </>
);

const renderSectionHeader = ({ section: { title } }) => (
  <Text style={{ fontSize: 22, color: COLOR.BLACK, marginTop: 20, marginBottom: 10}}>{title}</Text>
);


  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 15, marginHorizontal: 15 }}
      sections={notifications}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListHeaderComponent={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, color: COLOR.BLACK }}>History</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
      }
    />
  )
}

export default FacilityHistory

const styles = StyleSheet.create({})