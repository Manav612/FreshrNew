


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
const timeSlots = [
  { id: '1', time: '12:00 PM To 1:00 PM' },
  { id: '2', time: '1:00 PM To 2:00 PM' },
  { id: '3', time: '2:00 PM To 3:00 PM' },
  { id: '4', time: '3:00 PM To 4:00 PM' },
  { id: '5', time: '4:00 PM To 5:00 PM' },
  { id: '6', time: '5:00 PM To 6:00 PM' },
  { id: '7', time: '6:00 PM To 7:00 PM' },
  { id: '8', time: '7:00 PM To 8:00 PM' },
  { id: '9', time: '8:00 PM To 9:00 PM' },
  { id: '10', time: '9:00 PM To 10:00 PM' },
  { id: '11', time: '10:00 PM To 11:00 PM' },
  { id: '12', time: '11:00 PM To 12:00 AM' },
];

const BookingHoursScreen = () => {
    const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation()
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.timeSlot}>
      <Text style={styles.timeText}>{item.time}</Text>
      <Text style={styles.priceText}>₹ N/A</Text>
      <View style={styles.statusIndicator}></View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 20,marginBottom:20 }}>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />

          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
            Booking Hours
          </Text>
        </View>
      <FlatList
        data={timeSlots}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default BookingHoursScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlot: {
    width: '30%',
    height: 100,
    margin: 5,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: 10,
  },
});
