import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AllCategoryData1 } from '../../../components/utils';
import Cancelled from '../../../components/MyBookingDetails/Pending';
import Completed from '../../../components/MyBookingDetails/History';
import Upcoming from '../../../components/MyBookingDetails/Ongoing';
import { NavigationScreens } from '../../../constants/Strings';
import CalendarScreen from '../../../components/Calendar';
import { ClockUserIcon, GearFineIcon } from '../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import ProfessionalOngoing from './ProfessionalOngoing';
import ProfessionalHistory from './ProfessionalHistory';
import ProfessionalPending from './ProfessionalPending';
import socketServices from '../../../Services/Socket';
import RBSheet from 'react-native-raw-bottom-sheet';
import QueueToggle from '../../../components/OueueBotton';

const ProfessionalBooking = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedItem, setSelectedItem] = useState('Pending');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [activeTab, setActiveTab] = useState('Comes to you');
  const [ongoingData, setOngoingData] = useState([]);
  const [selected, setSelected] = useState()
  const [selected2, setSelected2] = useState()
  const [orderData, setOrderData] = useState()
  const [directionModalVisible, setDirectionModalVisibility] = useState(false);
  const refRBSheet = useRef([]);
  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };
  const closeBottomSheet = () => {
    refRBSheet.current[0].close();
  };
  useEffect(() => {
    socketServices.on('payment_Done', data => {
      // console.log('==== payment done ======', data);
      setOrderData(data)
      setDirectionModalVisibility(true)
      setSelectedItem('Ongoing')
      let res = data.message.orderData;
      res['sender'] = data.sender;
      res['order_id'] = data.message.order_id;
      res['coordinates'] = data.message.coordinates;
      // console.log(JSON.stringify(res));
      setOngoingData(prevData => [res, ...prevData]);

    });

  }, []);


  const styles = StyleSheet.create({
    dot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: COLOR_LIGHT.GRAY,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: COLOR_LIGHT.ORANGECOLOR,
    },
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR_LIGHT.ORANGECOLOR,
      marginLeft: 10,
      borderRadius: 30,
      height: 35,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    selectedItem: {
      backgroundColor: COLOR_LIGHT.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '600',
      color: COLOR_LIGHT.ORANGECOLOR,
    },
    SelectedCategorytext: {
      color: COLOR_LIGHT.WHITE,
    },
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,

      borderRadius: 30,
      height: 40,
      width: Screen_Width * 0.295,
      marginHorizontal: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    selectedItem: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '500',
      fontSize: 14,
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
    ViewWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000050',

    },
    ModalContainer: {
      width: '85%',
      borderRadius: 15,
      padding: 30,
      backgroundColor: '#fff',
      elevation: 5,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      alignItems: 'center',
    },
    LabelText: {
      fontSize: 16,
      color: COLOR.BLACK,
      textAlign: 'center',
      fontWeight: '600',
    },
    DescText: {
      fontSize: 14,
      color: '#929292',
      marginTop: 15,
    },
  });
  const handleQueueToggle = (isSelected) => {
    // Handle the toggle state change here
    console.log('Queue is now:', isSelected ? 'on' : 'off');
  };
  const AllCategory = ({ item, setSelectedItem }) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem === item.name && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item.name)}
    >
      <View style={{ marginHorizontal: 13 }}>
        <Text
          style={[
            styles.Categorytext,
            selectedItem === item.name && styles.SelectedCategorytext,
          ]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderScreen = () => {
    switch (selectedItem) {
      case 'Ongoing':
        return <ProfessionalOngoing FetchedData={ongoingData} setFetchedData={setOngoingData} orderData={orderData} />;
      case 'Pending':
        return <ProfessionalPending />;
      case 'History':
        return <ProfessionalHistory />;
      default:
        return null;
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('My Profile Screen')} style={{ width: 40, backgroundColor: COLOR.ORANGECOLOR, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLOR.WHITE, fontSize: 30 }}>F</Text>
          </TouchableOpacity> */}
          <Text style={{ fontWeight: '800', fontSize: 20, color: COLOR.BLACK }}>My Bookings</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <QueueToggle theme={theme} onToggle={handleQueueToggle} COLOR={COLOR} />
          <TouchableOpacity onPress={() => setSelected2(!selected2)} style={{ backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, justifyContent: 'center', alignItems: 'center', borderRadius: 5, flexDirection: 'row', padding: 5, gap: 5 }}>
            <Text style={{ color: COLOR.BLACK }}>Freelancer</Text>

            {selected2 ?
              <View style={{ borderRadius: 15, borderWidth: 1, borderColor: selected2 ? COLOR.ChartBlue : COLOR.ORANGECOLOR, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingLeft: 5, }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 10, fontWeight: '600', height: 16, }}>on</Text>
                <View style={{ backgroundColor: COLOR.ChartBlue, height: 16, width: 16, borderRadius: 10 }} />
              </View>
              :
              <View style={{ borderRadius: 15, borderWidth: 1, borderColor: selected2 ? COLOR.ChartBlue : COLOR.ORANGECOLOR, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingRight: 5, }}>
                <View style={{ backgroundColor: COLOR.ORANGECOLOR, height: 16, width: 16, borderRadius: 10 }} />
                <Text style={{ color: COLOR.BLACK, fontSize: 10, fontWeight: '600', height: 16, }}>off</Text>
              </View>
            }
            {/* <MaterialCommunityIcons name={selected2 ? 'toggle-switch-off' : 'toggle-switch'} size={24} color={selected2 ? COLOR.CANCEL_B : COLOR.GREEN} /> */}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('ProfessionalScheduleScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <FastImage source={ClockUserIcon} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <AntDesign name="setting" size={28} color={COLOR.BLACK} />
          </TouchableOpacity> */}
        </View>
        {/* <View style={{ flexDirection: 'row', gap: 10 }}>
          <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
        </View> */}
      </View >
      <TouchableOpacity
        onPress={() => { setSelectedItem2(!selectedItem2), openBottomSheet() }}
        style={{
          borderWidth: 2,
          borderColor: COLOR.ORANGECOLOR,
          backgroundColor: selectedItem2 ? COLOR.ORANGECOLOR : COLOR.WHITE,

          borderRadius: 30,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: selectedItem2 ? COLOR.WHITE : COLOR.ORANGECOLOR }}>
            Scheduled Appointments
          </Text>
          <AntDesign name="calendar" size={24} color={selectedItem2 ? COLOR.WHITE : COLOR.ORANGECOLOR} />

        </View>
      </TouchableOpacity>
      {/* <View style={{ backgroundColor: COLOR.LIGHTGRAY, height: 1, marginVertical: 10 }} /> */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
        <TouchableOpacity style={{ width: Screen_Width * 0.4, height: 40, backgroundColor: activeTab === 'Comes to you' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Comes to you') }}>
          <Text style={{ color: activeTab === 'Comes to you' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Comes to you</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: Screen_Width * 0.4, height: 40, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
          <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Meet In Store</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: Screen_Width * 0.3, height: 40, backgroundColor: activeTab === 'Schedule' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Schedule') }}>
          <Text style={{ color: activeTab === 'Schedule' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Schedule</Text>
        </TouchableOpacity>
      </View> */}


      <View>
        <FlatList
          data={AllCategoryData1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AllCategory item={item} setSelectedItem={setSelectedItem} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>{renderScreen()}</View>
      <RBSheet
        ref={(ref) => (refRBSheet.current[0] = ref)}

        height={Screen_Height * 0.85}
        customStyles={{

          wrapper: {
            backgroundColor: COLOR.BLACK_40,
          },
          container: {
            backgroundColor: COLOR.WHITE,
            borderRadius: 40,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            elevation: 10,
            shadowColor: COLOR.BLACK,
          },
          draggableIcon: {
            backgroundColor: COLOR.BLACK,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <CalendarScreen />
      </RBSheet>
      <Modal
        animationType="fade"
        transparent
        visible={directionModalVisible}
        statusBarTranslucent>
        <View style={styles.ViewWrapper}>
          <View style={styles.ModalContainer}>
            <Text
              style={
                styles.LabelText
              }>{`Please head to\ndesignated location`}</Text>
            <Text style={styles.DescText}>
              Once arrived please come back here{' '}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 30,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLOR.ORANGECOLOR,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowOffset: { height: 2 },
                  shadowRadius: 2,
                  shadowOpacity: 0.3,
                }}
                onPress={() => setDirectionModalVisibility(false)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
              <View style={{ width: 10 }} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#000',
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowOffset: { height: 2 },
                  shadowRadius: 2,
                  shadowOpacity: 0.3,
                }}
                onPress={() => setDirectionModalVisibility(false)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  Direction
                </Text>
                <FontAwesome5
                  name="directions" size={20} color={COLOR.WHITE} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ height: 100 }} />
    </ScrollView >
  )
}

export default ProfessionalBooking

const styles = StyleSheet.create({})