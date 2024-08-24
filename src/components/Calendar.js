
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment, { duration } from 'moment';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { Screen_Height, Screen_Width } from '../constants/Constants';
import { Hair1 } from '../constants/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;

  const handleDayPress = day => {
    const formattedDate = moment(day.dateString).format('ddd MMMM DD YYYY');
    setSelectedDate(formattedDate);
  };

  const handleTimeSelection = time => {
    setSelectedTime(time);
    setTimeModalVisible(false);
  };

  const handleBookAppointmentStatus = (item) => {
    setSelectedAppointment(item);
    setActionModalVisible(true);

  }

  const handleBookAppointment = () => {
    setModalVisible2(true)
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 1; i <= 24; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  const appointments = [
    {
      id: '1',
      title: 'Barbarella inova',
      price: '$699',
      duration: '20min',
      services: 'Quiff Haircut. Thin Shaving. Aloe Vera Shampoo Hair Wash',
      date: 'Dec 22,2024 - 10:00 AM-11:00 AM',

      image: Hair1, // replace with the actual path to your image
    },
    {
      id: '2',
      title: 'Barbarella inova',
      price: '$6909',
      duration: '20min',
      services: 'Quiff Haircut. Thin Shaving. Aloe Vera Shampoo Hair Wash',
      date: 'Dec 22,2024 - 10:00 AM-11:00 AM',

      image: Hair1, // replace with the actual path to your image
    },
    {
      id: '3',
      title: 'Barbarella inova',
      price: '$69889',
      duration: '20min',
      services: 'Quiff Haircut. Thin Shaving. Aloe Vera Shampoo Hair Wash',
      date: 'Dec 22,2024 - 10:00 AM-11:00 AM',

      image: Hair1, // replace with the actual path to your image
    },
    {
      id: '4',
      title: 'Barbarella inova',
      price: '$69099',
      duration: '20min',
      services: 'Quiff Haircut. Thin Shaving. Aloe Vera Shampoo Hair Wash',
      date: 'Dec 22,2024 - 10:00 AM-11:00 AM',

      image: Hair1, // replace with the actual path to your image
    },
    // Add more appointments as needed
  ];

  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBookAppointmentStatus(item)} style={styles.appointmentItem}>
      <Image source={item.image} style={styles.appointmentImage} />
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentTitle}>{item.title}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: 10 }}
          onPress={() => setActionModalVisible(true)}>
          <AntDesign name="down" size={22} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={styles.appointmentLocation}>{item.price} ({item.duration})</Text>
        <Text style={styles.appointmentServices}>{item.services}</Text>
        <Text style={styles.appointmentDate}>{item.date}</Text>
      </View>

    </TouchableOpacity>
  );

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
      marginVertical: 5,
    },
    button: {
      backgroundColor: COLOR.ORANGECOLOR,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 20,
    },
    button2: {
      backgroundColor: COLOR.ORANGECOLOR,
      width: Screen_Width * 0.3,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 5,
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
      backgroundColor: COLOR.WHITE,
      borderRadius: 20,
      padding: 20,

    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent2: {
      width: 300,
      padding: 20,
      backgroundColor: COLOR.WHITE,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: COLOR.BLACK,
      textAlign: 'center'
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
    appointmentItem: {
      flexDirection: 'row',
      backgroundColor: COLOR.WHITE,
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      elevation: 2,
      shadowColor: COLOR.BLACK,
      marginHorizontal: 4

    },
    appointmentImage: {
      width: Screen_Width * 0.2,
      height: Screen_Height * 0.13,
      borderRadius: 10,
      marginRight: 10,
    },
    appointmentDetails: {
      flex: 1,
    },
    appointmentTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLOR.BLACK,
    },
    appointmentLocation: {
      fontSize: 14,
      color: COLOR.GRAY,
    },
    appointmentServices: {
      fontSize: 14,
      color: COLOR.ORANGECOLOR,
    },
    appointmentDate: {
      fontSize: 14,
      color: COLOR.BLACK,
    },
  });

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        minDate={moment().format('YYYY-MM-DD')}
      />
      <Text style={styles.selectedInfo}>
        {selectedDate
          ? selectedDate
          : 'Please select a date'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
        <Text style={styles.buttonText}>Book new appointment</Text>
      </TouchableOpacity>

      {/* FlatList for displaying appointment details */}
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
      />
      <View style={{ height: 150 }} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible(false)}>
        <View style={{ backgroundColor: COLOR.BLACK_30, justifyContent: 'center', alignItems: 'center', height: Screen_Height }}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <View style={styles.appointmentItem}>
                <Image source={selectedAppointment.image} style={styles.appointmentImage} />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentTitle}>{selectedAppointment.title}</Text>
                  <Text style={styles.appointmentLocation}>{selectedAppointment.price} ({selectedAppointment.duration})</Text>
                  <Text style={styles.appointmentServices}>{selectedAppointment.services}</Text>
                  <Text style={styles.appointmentDate}>{selectedAppointment.date}</Text>
                </View>
              </View>
            )}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button2, { backgroundColor: COLOR.CANCEL_B }]}
                onPress={() => {
                  setSelectedAction('Cancel');
                  setActionModalVisible(false);
                  setConfirmationModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  setSelectedAction('Reschedule');
                  setActionModalVisible(false);
                  setConfirmationModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={modalVisible2} onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent2}>
            <Text style={styles.modalTitle}>Share your calendar</Text>
            <TextInput
              style={[styles.input2, { color: COLOR.BLACK }]}
              placeholder="Phone (Coming soon)"
              placeholderTextColor={COLOR.GRAY}
              value={phone}
              keyboardType='number-pad'
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={[styles.input2, { color: COLOR.BLACK }]}
              placeholder="Email"
              placeholderTextColor={COLOR.GRAY}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TouchableOpacity
              // onPress={handleSave}
              style={{
                width: 255,
                backgroundColor: COLOR.ORANGECOLOR,
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => setModalVisible2(false)}
              style={{
                width: 255,
                backgroundColor: COLOR.ChartBlue,
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Share with contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible2(false)}
              style={{
                width: 255,
                backgroundColor: COLOR.CANCEL_B,
                height: 40,
                borderRadius: 10,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(false)}>
        <View style={{ backgroundColor: COLOR.BLACK_30, justifyContent: 'center', alignItems: 'center', height: Screen_Height }}>

          <View style={styles.modalContent}>
            <Text style={styles.selectedInfo}>
              Are you sure you want to {selectedAction}?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  setConfirmationModalVisible(false);
                  Alert.alert('Confirmed', `${selectedAction} confirmed`, [{ text: 'OK' }]);
                }}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => setConfirmationModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

