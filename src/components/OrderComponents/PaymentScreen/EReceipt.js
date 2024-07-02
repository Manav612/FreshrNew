import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';

const EReceipt = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

  return (
    <>
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>E-Receipt</Text>
        </View>
        <MaterialCommunityIcons
          name="dots-horizontal-circle-outline"
          size={30}
          color={COLOR.BLACK}
        />
      </View>
      <View style={{ marginTop: '25%' }}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 15 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Barber/Salon</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Barbarella lnova</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Address</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>6993 Meadow Valley Terrace</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Name</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Daniel Austin</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Phone</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>+1 1111 467 378 555</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Booking Date</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>December 23, 2024</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Booking Hours</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>10:00 AM</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Professional</Text>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Nathan Alexander</Text>
        </View>

        <View style={{ marginTop: '15%' }}>
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Haircut (Quiff)</Text>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>$6.00</Text>
          </View>
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Hair Wash (Aloe Vera Shampoo)</Text>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>$5.50</Text>
          </View>
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Shaving (Thin Shaving)</Text>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>$4.50</Text>
          </View>
        </View>
      </View>
      
      
      <View style={{ height: 90 }} />

    </ScrollView>
    <TouchableOpacity
    style={{
      width: Screen_Width * 0.80,
      height: 50,
      backgroundColor: COLOR.ORANGECOLOR,
      justifyContent: 'center',
      borderRadius: 35,
      alignSelf: 'center',
      marginVertical: 20,
      position: 'absolute',
      bottom: 80,
      alignItems: 'center',
      gap: 20
    }}
  >
    <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE }}>
      Download E-Receipt
    </Text>
  </TouchableOpacity>
  </>
  )
}

export default EReceipt
