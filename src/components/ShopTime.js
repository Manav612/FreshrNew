import { StyleSheet, Text, TouchableOpacity, Modal, View, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen_Height, Screen_Width } from '../constants/Constants';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';

const ShopTime = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [work, setWork] = useState('In salon');
  const [isEmail, setIsEmail] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('Delivery');


  const [timeData, setTimeData] = useState({
    Monday: { start: '10:00 AM', end: '11:00 PM' },
    Tuesday: { start: '10:00 AM', end: '11:00 PM' },
    Wednesday: { start: '10:00 AM', end: '11:00 PM' },
    Thursday: { start: '10:00 AM', end: '11:00 PM' },
    Friday: { start: '10:00 AM', end: '11:00 PM' },
    Saturday: { start: '10:00 AM', end: '11:00 PM' },
    Sunday: { start: '10:00 AM', end: '11:00 PM' },
  });

  const openModal = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const saveTime = () => {
    setTimeData({
      ...timeData,
      [selectedDay]: {
        start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    });
    setModalVisible(false);
  };

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartPicker(Platform.OS === 'ios');
    setStartTime(currentDate);
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndPicker(Platform.OS === 'ios');
    setEndTime(currentDate);
  };


  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      borderWidth: 1,
      borderColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 5
    },
    input: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: COLOR.BLACK
    },
    icon: {
      marginRight: 10
    },
    rememberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    },
    dropdownContainer: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLOR.AuthField,
      padding: 10
    },
    dropdown: {
      height: 50,
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
      color: COLOR.BLACK_40
    },
    selectedTextStyle: {
      fontSize: 16,
      color: COLOR.BLACK
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    icon: {
      marginRight: 10
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    dropdownItemSelected: {
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    ImageText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLOR.BLACK,
      textAlign: 'center'
    },
    imageContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 },
    imageInnerContainer: {
      height: 100,
      width: 100,
      borderRadius: 50,
      backgroundColor: COLOR.ORANGECOLOR,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: COLOR.ORANGECOLOR,
      position: 'relative',
      marginBottom: 20
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    cameraButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.BLACK,
      borderRadius: 25,
      height: 30,
      width: 30,
      position: 'absolute',
      right: 1,
      bottom: 1,
    },

    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      // backgroundColor: COLOR.ROYALBLUE,

    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '20%',
      width: '80%',
      backgroundColor: COLOR.ORANGECOLOR,
      borderRadius: 15,
    },
    closeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 30,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: COLOR.BLACK,
      fontSize: 18,
      fontWeight: '700',
    },

    iconStyle: {
      width: 20,
      height: 20,
    },
    errorText: {
      color: COLOR.ROYALGOLDEN
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: COLOR.WHITE,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR.GRAY,
    },
    dayText: {
      fontSize: 16,
      color: COLOR.BLACK
    },
    timeText: {
      fontSize: 16,
      color: COLOR.BLACK
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.BLACK_40,
    },
    modalContent: {
      width: '80%',
      backgroundColor: COLOR.WHITE,
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 10,
      color: COLOR.BLACK
    },
  });


  return (
    <View style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15 }}>
    
        <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK, marginBottom: 5 }}>Shop Timing</Text>
     
      <View style={styles.container}>
        {Object.keys(timeData).map((day) => (
          <TouchableOpacity key={day} style={styles.row} onPress={() => openModal(day)}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.timeText}>{`${timeData[day].start} - ${timeData[day].end}`}</Text>
          </TouchableOpacity>
        ))}

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit {selectedDay}</Text>
              <Text style={{ color: COLOR.BLACK }}>Opening Time:</Text>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="default"
                  onChange={onStartChange}
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShowStartPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}><Text  style={{ color: COLOR.WHITE,fontWeight:'bold' }}>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity>
                  {showStartPicker && (
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      display="default"
                      onChange={onStartChange}
                    />
                  )}
                </>
              )}
              <Text style={{ color: COLOR.BLACK }}>Closing Time:</Text>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="default"
                  onChange={onEndChange}
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShowEndPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}><Text style={{ color: COLOR.WHITE,fontWeight:'bold' }}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity>
                  {showEndPicker && (
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      display="default"
                      onChange={onEndChange}
                    />
                  )}
                </>
              )}
              <TouchableOpacity onPress={saveTime} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ChartBlue, marginVertical: 10 ,borderRadius:15}}><Text  style={{ color: COLOR.WHITE,fontWeight:'bold' }}>Save</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.CANCEL_B, marginVertical: 10,borderRadius:15 }}><Text  style={{ color: COLOR.WHITE,fontWeight:'bold' }}>Cancel</Text></TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>

      <View style={{ height: 100 }} />
    </View>
  )
}

export default ShopTime

const styles = StyleSheet.create({})