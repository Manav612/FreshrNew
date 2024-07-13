import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Switch,
  Image,
  Button,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {COLOR_DARK, COLOR_LIGHT} from '../constants/Colors';
import {Screen_Width} from '../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {barber} from '../constants/Icons';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();

  const invites = [
    {id: '1', img: barber},
    {id: '2', img: barber},
    {id: '3', img: barber},
    {id: '4', img: barber},
  ];

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const handleEventPress = item => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const generate24HourSchedule = () => {
    const schedule = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 || 12;
      const ampm = i < 12 ? 'AM' : 'PM';
      schedule.push(`${hour}:00 ${ampm}`);
    }
    return schedule;
  };

  const getEventsForDate = date => {
    return events.filter(event => event.date === date);
  };

  const renderTimeSlot = ({item}) => {
    const eventsForThisHour = getEventsForDate(selectedDate).filter(
      event =>
        event.startTime.startsWith(item.split(':')[0]) ||
        event.endTime.startsWith(item.split(':')[0]),
    );

    return (
      <View style={styles.timeSlot}>
        <Text style={styles.timeText}>{item}</Text>
        <View style={styles.eventContainer}>
          {eventsForThisHour.map(event => (
            <TouchableOpacity
              key={event.id}
              style={styles.event}
              onPress={() => handleEventPress(event)}>
              <Text style={styles.eventTitle}>{event.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const handleAddEvent = () => {
    const newEventWithId = {
      ...newEvent,
      id: Date.now(),
      date: selectedDate,
    };
    setEvents([...events, newEventWithId]);
    setAddEventModalVisible(false);
    setNewEvent({title: '', startTime: '', endTime: '', location: ''});
  };

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
    timeSlot: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR.GRAY,
    },
    timeText: {
      width: 80,
      color: COLOR.BLACK,
    },
    eventContainer: {
      flex: 1,
    },
    event: {
      backgroundColor: COLOR.GULABI,
      padding: 5,
      borderRadius: 5,
      marginBottom: 2,
    },
    eventTitle: {
      color: COLOR.BLACK,
      fontSize: 12,
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
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf: 'flex-start',
      color: COLOR.BLACK,
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
    addEventButton: {
      backgroundColor: COLOR.GULABI,
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      alignItems: 'center',
    },
    addEventButtonText: {
      color: COLOR.BLACK,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: COLOR.GRAY,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />
      <Text style={styles.selectedDate}>Schedule for {selectedDate}</Text>
      <TouchableOpacity
        style={styles.addEventButton}
        onPress={() => setAddEventModalVisible(true)}>
        <Text style={styles.addEventButtonText}>Add Event</Text>
      </TouchableOpacity>
      <FlatList
        data={generate24HourSchedule()}
        keyExtractor={item => item}
        renderItem={renderTimeSlot}
      />

      {/* Event Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => setModalVisible(false)}
              style={{alignSelf: 'flex-end'}}
            />
            <Text style={styles.title}>{selectedEvent?.title}</Text>
            <Text style={styles.title}>{selectedEvent?.date}</Text>
            <Text
              style={{
                color: COLOR.GRAY,
                fontSize: 14,
                alignSelf: 'flex-start',
              }}>
              Location
            </Text>
            <Text
              style={{
                color: COLOR.BLACK,
                fontSize: 18,
                alignSelf: 'flex-start',
              }}>
              {selectedEvent?.location}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'flex-start',
                width: Screen_Width * 0.6,
                marginVertical: 10,
              }}>
              <View>
                <Text style={{color: COLOR.GRAY, fontSize: 14}}>
                  Start Time
                </Text>
                <Text style={{color: COLOR.BLACK, fontSize: 18}}>
                  {selectedEvent?.startTime}
                </Text>
              </View>
              <View>
                <Text style={{color: COLOR.GRAY, fontSize: 14}}>End</Text>
                <Text style={{color: COLOR.BLACK, fontSize: 18}}>
                  {selectedEvent?.endTime}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLOR.BLACK_30,
                height: 1,
                width: Screen_Width * 0.8,
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                color: COLOR.GRAY,
                fontSize: 14,
                alignSelf: 'flex-start',
                marginVertical: 5,
              }}>
              Professionals
            </Text>
            <FlatList
              data={invites}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity style={{marginHorizontal: 5}}>
                  <FastImage
                    style={{height: 60, width: 60, borderRadius: 50}}
                    source={item.img}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.createButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addEventModalVisible}
        onRequestClose={() => setAddEventModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add New Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={text => setNewEvent({...newEvent, title: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Time (HH:MM)"
              value={newEvent.startTime}
              onChangeText={text => setNewEvent({...newEvent, startTime: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="End Time (HH:MM)"
              value={newEvent.endTime}
              onChangeText={text => setNewEvent({...newEvent, endTime: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newEvent.location}
              onChangeText={text => setNewEvent({...newEvent, location: text})}
            />
            <Button title="Add Event" onPress={handleAddEvent} />
            <Button
              title="Cancel"
              onPress={() => setAddEventModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarScreen;
