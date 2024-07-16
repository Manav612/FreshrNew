import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {COLOR_DARK, COLOR_LIGHT} from '../constants/Colors';
import {Screen_Height, Screen_Width} from '../constants/Constants';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const handleTimeSelection = time => {
    setSelectedTime(time);
    setTimeModalVisible(false);
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      Alert.alert(
        'Appointment Booked',
        `Your appointment is scheduled for ${selectedDate} at ${selectedTime}.`,
        [{text: 'OK'}],
      );
    } else {
      Alert.alert('Error', 'Please select both date and time.', [{text: 'OK'}]);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 1; i <= 24; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  const styles = StyleSheet.create({
    container: {
      width: Screen_Width,
      height: Screen_Height,
      paddingHorizontal: 15,
      backgroundColor: COLOR.WHITE,
    },
    selectedInfo: {
      fontSize: 18,
      margin: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: COLOR.BLACK,
      marginVertical: 10,
    },
    button: {
      backgroundColor: COLOR.ORANGECOLOR,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
      marginHorizontal: 20,
    },
    buttonText: {
      color: COLOR.WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: COLOR.AuthField,
    },
    modalContent: {
      width: Screen_Width * 0.9,
      backgroundColor: COLOR.BACKGROUND,
      borderRadius: 10,
      padding: 20,
    },
    timeSlot: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: COLOR.GRAY,
    },
    timeText: {
      fontSize: 16,
      color: COLOR.BLACK,
    },
  });

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
        minDate={moment().format('YYYY-MM-DD')}
      />
      <Text style={styles.selectedInfo}>
        {selectedDate
          ? `Selected Date: ${selectedDate}`
          : 'Please select a date'}
      </Text>
      <Text style={styles.selectedInfo}>
        {selectedTime
          ? `Selected Time: ${selectedTime}`
          : 'Please select a time'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setTimeModalVisible(true)}>
        <Text style={styles.buttonText}>Select Time</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <ScrollView>
              {generateTimeSlots().map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.timeSlot}
                  onPress={() => handleTimeSelection(time)}>
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarScreen;
