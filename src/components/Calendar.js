import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, TextInput, Switch, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { Screen_Width } from '../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { barber } from '../constants/Icons';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
LocaleConfig.defaultLocale = 'en';

const events = [
  { id: 1, date: '2024-05-27', title: 'Morning Meeting', startTime: '07:00', endTime: '08:00', recurrence: 'none' },
  { id: 2, date: '2024-05-27', title: 'Project Discussion', startTime: '09:00', endTime: '10:00', recurrence: 'none' },
  { id: 3, date: '2024-05-27', title: 'Lunch Break', startTime: '12:00', endTime: '13:00', recurrence: 'none' },
  { id: 4, date: '2024-05-27', title: 'Client Call', startTime: '15:00', endTime: '16:00', recurrence: 'none' },
  { id: 5, date: '2024-05-28', title: 'Conference', startTime: '14:00', endTime: '16:00', recurrence: 'none' },
  // Add more events as needed
];

const getEventsForDate = (date) => {
  return events.filter(event => event.date === date);
};

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();

  const invites = [
    { id: '1', img: barber },
    { id: '2', img: barber },
    { id: '3', img: barber },
    { id: '4', img: barber },

  ];


  const renderItem = ({ item }) => (
    <TouchableOpacity style={{marginHorizontal:5}}>
      <FastImage
        style={{height:60,width:60,borderRadius:50}}
        source={item.img}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleEventPress = (item) => {
    console.log("==================", item);
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR.BACKGROUND,
    },
    selectedDate: {
      fontSize: 18,
      margin: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: COLOR.BLACK,
    },
    eventItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      gap: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    eventTime: {
      fontSize: 14,
      color: COLOR.GRAY,
      flex: 1,
    },
    eventDetails: {
      backgroundColor: COLOR.GULABI,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      height: 50,
      width: Screen_Width * 0.6,
      paddingHorizontal: 5,
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLOR.BLACK,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: Screen_Width * 0.9,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      marginTop: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf: 'flex-start',
      color: COLOR.BLACK

    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      alignSelf: 'flex-start'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      width: '100%'
    },
    tagContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    tag: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: '#EAEAEA',
      color: '#555',
    },
    selectedTag: {
      backgroundColor: '#FFD700',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    inviteRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      marginBottom: 10,
    },
    inviteAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    createButton: {
      backgroundColor: '#6C63FF',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      width: '100%',
    },
    createButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    
  });

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      <Text style={styles.selectedDate}>Events for {selectedDate}</Text>
      <FlatList
        data={eventsForSelectedDate}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTime}>{item.startTime} - {item.endTime}</Text>
            <TouchableOpacity onPress={() => handleEventPress(item)} style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <AntDesign name="close" size={24} color="black" onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }} />
            <Text style={styles.title}>{selectedEvent?.title}</Text>
            <Text style={styles.title}>{selectedEvent?.date}</Text>
            <Text style={{ color: COLOR.GRAY, fontSize: 14, alignSelf: 'flex-start' }}>Location</Text>
            <Text style={{ color: COLOR.BLACK, fontSize: 18, alignSelf: 'flex-start' }}>Los angles,CA</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'flex-start', width: Screen_Width * 0.6, marginVertical: 10 }}>
              <View>
                <Text style={{ color: COLOR.GRAY, fontSize: 14, }}>Start Time</Text>
                <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>{selectedEvent?.startTime}</Text>
              </View>
              <View>
                <Text style={{ color: COLOR.GRAY, fontSize: 14, }}>End</Text>
                <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>{selectedEvent?.endTime}</Text>
              </View>
            </View>
            <View style={{ backgroundColor: COLOR.BLACK_30, height: 1, width: Screen_Width * 0.8,marginVertical:10 }} />
            <Text style={{ color: COLOR.GRAY, fontSize: 14,alignSelf:'flex-start',marginVertical:5 }}>Professionals</Text>
            <FlatList
              data={invites}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.createButtonText}>Repeat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default CalendarScreen;
