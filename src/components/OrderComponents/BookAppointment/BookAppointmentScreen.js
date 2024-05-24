


import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { HoursData, Professional, } from '../../utils';
const BookAppointmentScreen = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItem, setSelectedItem] = useState('10:00');

  const renderItem3 = ({ item }) => (
    <View style={{ alignItems: 'center', marginTop: 10 }}>
      <TouchableOpacity style={{ backgroundColor: COLOR.WHITE, width: Screen_Width * 0.25, height: Screen_Height * 0.18, borderRadius: 25, marginHorizontal: 5, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Image source={item.image} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.09, borderRadius: 10 }} />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: COLOR.BLACK, fontSize: 16 }}>{item.title}</Text>
          <Text style={{ color: COLOR.BLACK_40, fontSize: 14 }}>{item.type}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  const styles = StyleSheet.create({
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginHorizontal: 5,
      borderRadius: 30,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    },
    selectedItem: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '500',
      color: COLOR.ORANGECOLOR,
    },
    SelectedCategorytext: {
      color: COLOR.WHITE,
    },
    CardContainer: {
      elevation: 2,
      backgroundColor: COLOR.WHITE,
      borderRadius: 25,
      height: Screen_Height * 0.14,
      width: Screen_Width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    CardImage: {
      width: 80,
      height: 80,
      resizeMode: 'cover',
      borderRadius: 15,
    },
    CardContain: {
      height: 90,
      width: 180,
      paddingVertical: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
  });

  const Hours = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem === item.name && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item.name)}>
      <View
        style={{
          marginHorizontal: 13,

        }}>
        <Text
          style={[
            styles.Categorytext,
            selectedItem === item.name && styles.SelectedCategorytext,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  // const Professional = ({item}) => (
  //   <TouchableOpacity
  //     style={{marginHorizontal: 13,}}
  //     onPress={() => setSelectedItem(item.id)}>

  //       <Image
  //         style={{height:100,width:100}}
  //         source={item.image}/>

  //   </TouchableOpacity>
  // );

  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10
        }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />

          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
            Book Appointment
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 18, color: COLOR.BLACK, fontWeight: '700', marginVertical: 10 }}>Select Date</Text>
      <Calendar
        enableSwipeMonths
        // theme={{
        //     backgroundColor: COLOR.GULABI,
        //     calendarBackground: COLOR.GULABI,
        //     textSectionTitleColor:COLOR.ORANGECOLOR,
        //     selectedDayBackgroundColor:COLOR.ORANGECOLOR,
        //     monthTextColor:COLOR.ORANGECOLOR,
        //     selectedDayTextColor:COLOR.GULABI,
        //     todayTextColor:COLOR.ORANGECOLOR,
        //     dayTextColor:COLOR.WHITE,
        //     arrowColor:COLOR.ORANGECOLOR,
        //     textDisabledColor:COLOR.GRAY
        //     }}
        // onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: COLOR.ORANGECOLOR,
          },
        }}
      />
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK, marginVertical: 10 }}>
          Select Hours
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Booking Hours Screen')}>
        <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.ORANGECOLOR, marginVertical: 10 }}>
          See All
        </Text>
        </TouchableOpacity>
        
      </View>
      <FlatList
        data={HoursData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Hours item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK, marginVertical: 10 }}>
          Select Professional
        </Text>
        <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.ORANGECOLOR, marginVertical: 10 }}>
          See All
        </Text>
      </View>
      <FlatList
        data={Professional}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem3}
      />

      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }} onPress={()=>navigation.navigate('PaymentMethod Screen')}>
        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Continue</Text>
      </TouchableOpacity>
      <View style={{ height: 90 }} />
    </ScrollView>

  )
}

export default BookAppointmentScreen;

const styles = StyleSheet.create({});
