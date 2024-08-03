

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, View, ScrollView, Alert, Platform, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { BASE_API_URL } from '../../Services';
import axios from 'axios';
import Slider from '@react-native-community/slider';

const ProfessionalScheduleScreen = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [autoSwitchToFreelancer, setAutoSwitchToFreelancer] = useState(false);
  const authToken = useSelector(state => state.AuthReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(10);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [timeData, setTimeData] = useState({
    Mon: { start: '10:00', end: '23:00', isActive: true },
    Tue: { start: '10:00', end: '23:00', isActive: true },
    Wed: { start: '10:00', end: '23:00', isActive: true },
    Thu: { start: '10:00', end: '23:00', isActive: true },
    Fri: { start: '10:00', end: '23:00', isActive: true },
    Sat: { start: '10:00', end: '23:00', isActive: true },
    Sun: { start: '10:00', end: '23:00', isActive: true },
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };
      const response = await axios.get(`${BASE_API_URL}/professionals/professional/schedule`, config);
      console.log("==================   res  ==========", response);
      const fetchedSchedule = response.data.data.ProfessionalSchedule.timing;
      const fetchedAutoSwitch = response.data.data.ProfessionalSchedule.autoSwichToFreelancer;

      const updatedTimeData = Object.keys(fetchedSchedule).reduce((acc, day) => {
        acc[day] = {
          ...fetchedSchedule[day],
          isActive: true
        };
        return acc;
      }, {});

      setTimeData(updatedTimeData);
      setAutoSwitchToFreelancer(fetchedAutoSwitch);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      Alert.alert("Error", "Failed to fetch schedule. Please try again.");
    }
  };

  const updateSchedule = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };
      const convertTo24HourFormat = (time) => {
        let [hours, minutes] = time.split(/[: ]/);
        const period = time.includes('PM') ? 'PM' : 'AM';
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);

        if (period === 'PM' && hours !== 12) {
          hours += 12;
        } else if (period === 'AM' && hours === 12) {
          hours = 0;
        }

        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      };

      const convertTo12HourFormat = (time) => {
        let [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
      };

      const formatTime = (time) => {

        if (!time || typeof time !== 'string') {
          return 'Invalid Time';
        }

        // Check if the time has AM/PM and convert it to 24-hour format
        if (time.includes('AM') || time.includes('PM')) {
          return convertTo24HourFormat(time);
        }

        // Validate 24-hour format
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
          return 'Invalid Time';
        }

        return convertTo12HourFormat(time);
      };

      const scheduleData = {
        timing: Object.keys(timeData).reduce((acc, day) => {
          acc[day] = {
            start: formatTime(timeData[day].start),
            end: formatTime(timeData[day].end)
          };
          return acc;
        }, {}),
        autoSwichToFreelancer: autoSwitchToFreelancer
      };

      console.log(scheduleData);


      console.log("schedule data----", scheduleData);

      const data = await axios.patch(`${BASE_API_URL}/professionals/professional/schedule`, scheduleData, config);
      console.log("-----------?>>>?>?>>>-", data.data)
      Alert.alert("Success", "Schedule updated successfully");
      fetchSchedule();
    } catch (error) {
      console.error("Error updating schedule:", error);
      Alert.alert("Error", "Failed to update schedule. Please try again.");
    }
  };

  const toggleDay = (day) => {
    setTimeData(prevData => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        isActive: !prevData[day].isActive,
      },
    }));
  };

  const openModal = (day) => {
    setSelectedDay(day);
    const [startHours, startMinutes] = timeData[day].start.split(':');
    const [endHours, endMinutes] = timeData[day].end.split(':');

    const newStartTime = new Date();
    newStartTime.setHours(parseInt(startHours, 10));
    newStartTime.setMinutes(parseInt(startMinutes, 10));

    const newEndTime = new Date();
    newEndTime.setHours(parseInt(endHours, 10));
    newEndTime.setMinutes(parseInt(endMinutes, 10));

    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setModalVisible(true);
  };

  const saveTime = () => {
    setTimeData(prevData => ({
      ...prevData,
      [selectedDay]: {
        ...prevData[selectedDay],
        start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        end: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      },
    }));
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


  const FreelanceData = [
    {
      id: 1,
      price: '1x'
    },
    {
      id: 2,
      price: '2x'
    },
    {
      id: 3,
      price: '3x'
    },
    {
      id: 4,
      price: '4x'
    },
    {
      id: 5,
      price: '5x'
    },
    {
      id: 6,
      price: '6x'
    },
    {
      id: 7,
      price: '7x'
    },
    {
      id: 8,
      price: '8x'
    },
    {
      id: 9,
      price: '9x'
    },
    {
      id: 10,
      price: '10x'
    },
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dayInfo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 20,
    },
    dayText: {
      fontSize: 16,
      color: COLOR.BLACK,
    },
    timeText: {
      fontSize: 16,
      color: COLOR.BLACK,
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
      color: COLOR.BLACK,
    },
  });

  return (
    <ScrollView style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity onPress={() => setAutoSwitchToFreelancer(!autoSwitchToFreelancer)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, }}>
          <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.BLACK }}>Auto Switch to Freelancer</Text>
          <MaterialCommunityIcons name={autoSwitchToFreelancer ? 'toggle-switch' : 'toggle-switch-off'} size={40} color={COLOR.ORANGECOLOR} />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={toggleDropdown}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 5,

        }}>
        <Text style={{ color: COLOR.BLACK }}>
          Freelancer Quote
        </Text>
        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          color={'#000'}
          size={25}
        />
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={FreelanceData}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingHorizontal: 5 }}>
                <Text>{item.price}</Text>
              </View>
            )
          }}
        />
      )} */}
      <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 15, elevation: 3, shadowColor: COLOR.ChartBlue, alignItems: 'center', justifyContent: 'center', height: 80, marginHorizontal: 2 }}>
        <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600', }}>
          Freelancer Charge ($) <Text style={{ color: COLOR.ORANGECOLOR }}>{price}x</Text>
        </Text>

        <Slider
          style={{ width: '100%', marginTop: 10 }}
          minimumValue={0}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={COLOR.BLACK}
          maximumTrackTintColor={COLOR.BLACK}
          thumbTintColor={COLOR.ORANGECOLOR}
          value={price}
          onValueChange={(value) => setPrice(value)}
        />
      </View>

      <View style={styles.container}>
        {Object.keys(timeData).map((day) => (
          <View key={day} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            paddingHorizontal: 10,
            height: 50,
            backgroundColor: COLOR.WHITE,
            borderRadius: 15,
            elevation: 4,
            shadowColor: COLOR.ChartBlue,
            marginHorizontal: 2
          }}>
            <TouchableOpacity style={styles.dayInfo} onPress={() => openModal(day)}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.timeText}>{`${timeData[day].start}  - ${timeData[day].end}`}</Text>
            </TouchableOpacity>
            <Text style={styles.timeText}>{timeData[day].isActive ? 'Open' : 'Close'}</Text>
            <TouchableOpacity onPress={() => toggleDay(day)}>
              <MaterialCommunityIcons
                name={timeData[day].isActive ? 'toggle-switch' : 'toggle-switch-off'}
                size={40}
                color={timeData[day].isActive ? COLOR.GREEN : COLOR.CANCEL_B}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: Screen_Width * 0.8,
          height: 50,
          backgroundColor: COLOR.ChartBlue,
          marginTop: 20,
          alignSelf: 'center',
          borderRadius: 10,
        }}
        onPress={updateSchedule}
      >
        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '600' }}>Update Schedule</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {selectedDay}</Text>
            <Text style={{ color: COLOR.BLACK }}>Start Time:</Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onStartChange}
              />
            ) : (
              <>
                <TouchableOpacity onPress={() => setShowStartPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}>
                  <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onStartChange}
                  />
                )}
              </>
            )}
            <Text style={{ color: COLOR.BLACK }}>End Time:</Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={endTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onEndChange}
              />
            ) : (
              <>
                <TouchableOpacity onPress={() => setShowEndPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}>
                  <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onEndChange}
                  />
                )}
              </>
            )}
            <TouchableOpacity onPress={saveTime} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ChartBlue, marginVertical: 10, borderRadius: 15 }}>
              <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.CANCEL_B, marginVertical: 10, borderRadius: 15 }}>
              <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default ProfessionalScheduleScreen;