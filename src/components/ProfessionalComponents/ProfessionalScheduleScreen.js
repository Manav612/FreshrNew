// import { StyleSheet, Text, TouchableOpacity, Modal, View, Button, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Screen_Height, Screen_Width } from '../../constants/Constants';
// import { Dropdown } from 'react-native-element-dropdown';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
// import CalendarScreen from '../Calendar';
// import { BASE_API_URL } from '../../Services';
// import axios from 'axios';

// const ProfessionalScheduleScreen = () => {
//   const navigation = useNavigation()
//   const theme = useSelector(state => state.ThemeReducer);
//   const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//   const [work, setWork] = useState('In salon');
//   const [isEmail, setIsEmail] = useState(false);
//   const [isFocus, setIsFocus] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [startTime, setStartTime] = useState(new Date());
//   const [endTime, setEndTime] = useState(new Date());
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);
//   const [activeTab, setActiveTab] = useState('Delivery');
//   const [Toggle2, setToggle2] = useState();
//   const [Toggle, setToggle] = useState();
//   const [fetched, setFetched] = useState([]);
//   const authToken = useSelector(state => state.AuthReducer);

//   const [timeData, setTimeData] = useState({
//     Mon: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//     Tue: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//     Wed: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//     Thu: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//     Fri: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//     Sat: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//     Sun: { start: '10:00 AM', end: '11:00 PM', isActive: true },
//   });

//   useEffect(() => {
//     fetchDataForSchedule()
//   }, [])

//   const toggleDay = (day) => {
//     setTimeData(prevData => ({
//       ...prevData,
//       [day]: {
//         ...prevData[day],
//         isActive: !prevData[day].isActive,
//       },
//     }));
//   };

//   const openModal = (day) => {
//     setSelectedDay(day);
//     setModalVisible(true);
//   };

//   const saveTime = () => {
//     setTimeData({
//       ...timeData,
//       [selectedDay]: {
//         start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         end: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       },
//     });
//     setModalVisible(false);
//   };

//   const onStartChange = (event, selectedDate) => {
//     const currentDate = selectedDate || startTime;
//     setShowStartPicker(Platform.OS === 'ios');
//     setStartTime(currentDate);
//   };

//   const onEndChange = (event, selectedDate) => {
//     const currentDate = selectedDate || endTime;
//     setShowEndPicker(Platform.OS === 'ios');
//     setEndTime(currentDate);
//   };

//   const fetchDataForSchedule = async () => {
//     try {

//       const config = {
//         headers: {
//           'Authorization': `Bearer ${authToken}`
//         }
//       }
//       const res = await axios.get(`${BASE_API_URL}/professionals/professional/schedule`, config);
//       console.log('========    schedule ============', res.data.data.ProfessionalSchedule);

//       setFetched(res.data.data.professionals);

//     } catch (error) {
//       console.error("Error:", error);

//     }
//   };
//   const UpdateSchedule = async () => {
//     try {

//       const config = {
//         headers: {
//           'Authorization': `Bearer ${authToken}`
//         }
//       }
//       const res = await axios.patch(`${BASE_API_URL}/professionals/professional/schedule`, config);
//       console.log('========    schedule ============', res.data.data.ProfessionalSchedule);

//       // setFetched(res.data.data.professionals);

//     } catch (error) {
//       console.error("Error:", error);

//     }
//   };




//   return (
//     <ScrollView style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15 }}>

//       <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginBottom: 20 }}>
//         {/* <TouchableOpacity onPress={() => navigation.goBack()}><AntDesign name="arrowleft" size={30} color={COLOR.BLACK} /></TouchableOpacity> */}
//         {/* <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK, marginBottom: 5 }}>My Schedule</Text> */}
//       </View>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 20 }}>

//         <TouchableOpacity onPress={() => setToggle(!Toggle)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, }}>
//           <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.BLACK }}>Vacation Mode</Text>
//           <MaterialCommunityIcons name={Toggle ? 'toggle-switch-off' : 'toggle-switch'} size={40} color={COLOR.ORANGECOLOR} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setToggle2(!Toggle2)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, }}>
//           <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.BLACK }}>Freelance Mode</Text>
//           <MaterialCommunityIcons name={Toggle2 ? 'toggle-switch-off' : 'toggle-switch'} size={40} color={COLOR.ChartBlue} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.container}>
//         {Object.keys(timeData).map((day) => (
//           <View key={day} style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginVertical: 10,
//             paddingHorizontal: 10,
//             height: 50,
//             backgroundColor: COLOR.WHITE,
//             borderRadius: 15,
//             elevation: 4,
//             shadowColor: COLOR.ChartBlue,

//           }}>
//             <TouchableOpacity style={styles.dayInfo} onPress={() => openModal(day)}>
//               <Text style={styles.dayText}>{day}</Text>
//               <Text style={styles.timeText}>{`${timeData[day].start} - ${timeData[day].end}`}</Text>
//             </TouchableOpacity>
//             <Text style={styles.timeText}>{timeData[day].isActive ? 'Open' : 'Close'}</Text>
//             <TouchableOpacity onPress={() => toggleDay(day)}>
//               <MaterialCommunityIcons
//                 name={timeData[day].isActive ? 'toggle-switch' : 'toggle-switch-off'}
//                 size={40}
//                 color={timeData[day].isActive ? COLOR.GREEN : COLOR.CANCEL_B}
//               />
//             </TouchableOpacity>
//           </View>

//         ))}
//       </View>

//       <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:Screen_Width*0.8,height:50,backgroundColor:COLOR.ChartBlue}}>
//         <Text style={{color:COLOR.WHITE,fontSize:16,fontWeight:'600'}}>Update Schedule</Text>
//       </TouchableOpacity>

//       <Modal visible={modalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit {selectedDay}</Text>
//             <Text style={{ color: COLOR.BLACK }}>Start Time:</Text>
//             {Platform.OS === 'ios' ? (
//               <DateTimePicker
//                 value={startTime}
//                 mode="time"
//                 display="default"
//                 onChange={onStartChange}
//               />
//             ) : (
//               <>
//                 <TouchableOpacity onPress={() => setShowStartPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}><Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity>
//                 {showStartPicker && (
//                   <DateTimePicker
//                     value={startTime}
//                     mode="time"
//                     display="default"
//                     onChange={onStartChange}
//                   />
//                 )}
//               </>
//             )}
//             <Text style={{ color: COLOR.BLACK }}>End Time:</Text>
//             {Platform.OS === 'ios' ? (
//               <DateTimePicker
//                 value={endTime}
//                 mode="time"
//                 display="default"
//                 onChange={onEndChange}
//               />
//             ) : (
//               <>
//                 <TouchableOpacity onPress={() => setShowEndPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}><Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></TouchableOpacity>
//                 {showEndPicker && (
//                   <DateTimePicker
//                     value={endTime}
//                     mode="time"
//                     display="default"
//                     onChange={onEndChange}
//                   />
//                 )}
//               </>
//             )}
//             <TouchableOpacity onPress={saveTime} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ChartBlue, marginVertical: 10, borderRadius: 15 }}><Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Save</Text></TouchableOpacity>
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.CANCEL_B, marginVertical: 10, borderRadius: 15 }}><Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Cancel</Text></TouchableOpacity>

//           </View>
//         </View>
//       </Modal>

//       <View style={{ height: 100 }} />
//     </ScrollView>
//   )
// }

// export default ProfessionalScheduleScreen

// const styles = StyleSheet.create({})

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, View, ScrollView, Alert, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { BASE_API_URL } from '../../Services';
import axios from 'axios';

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setAutoSwitchToFreelancer(!autoSwitchToFreelancer)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, }}>
          <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.BLACK }}>Auto Switch to Freelancer</Text>
          <MaterialCommunityIcons name={autoSwitchToFreelancer ? 'toggle-switch' : 'toggle-switch-off'} size={40} color={COLOR.ORANGECOLOR} />
        </TouchableOpacity>
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