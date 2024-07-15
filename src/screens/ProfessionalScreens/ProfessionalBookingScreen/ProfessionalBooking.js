import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AllCategoryData1 } from '../../../components/utils';
import Cancelled from '../../../components/MyBookingDetails/Pending';
import Completed from '../../../components/MyBookingDetails/History';
import Upcoming from '../../../components/MyBookingDetails/Ongoing';
import { NavigationScreens } from '../../../constants/Strings';
import ProfessionalUpcoming from './ProfessionalUpcoming';
import ProfessionalCompleted from './ProfessionalCompleted';
import ProfessionalCancelled from './ProfessionalCancelled';
import CalendarScreen from '../../../components/Calendar';
import { ClockUserIcon, GearFineIcon } from '../../../constants/Icons';
import FastImage from 'react-native-fast-image';

const ProfessionalBooking = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedItem, setSelectedItem] = useState('Upcoming');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [activeTab, setActiveTab] = useState('Comes to you');

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
  });

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
      case 'Upcoming':
        return <ProfessionalUpcoming />;
      case 'Completed':
        return <ProfessionalCompleted />;
      case 'Cancelled':
        return <ProfessionalCancelled />;
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
          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>My Bookings</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfessionalScheduleScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <FastImage source={ClockUserIcon} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <AntDesign name="setting" size={28} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: 'row', gap: 10 }}>
          <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
        </View> */}
      </View>
      <TouchableOpacity
        onPress={() => setSelectedItem2(!selectedItem2)}
        style={{
          borderWidth: 2,
          borderColor: COLOR.ChartBlue,
          backgroundColor: selectedItem2 ? COLOR.ChartBlue : COLOR.WHITE,

          borderRadius: 30,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: selectedItem2 ? COLOR.WHITE : COLOR.ChartBlue }}>
            Scheduled Appointments
          </Text>
          <AntDesign name="calendar" size={24} color={selectedItem2 ? COLOR.WHITE : COLOR.ChartBlue} />

        </View>
      </TouchableOpacity>
      <View style={{ backgroundColor: COLOR.LIGHTGRAY, height: 1, marginVertical: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
        <TouchableOpacity style={{ width: Screen_Width * 0.4, height: 40, backgroundColor: activeTab === 'Comes to you' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Comes to you') }}>
          <Text style={{ color: activeTab === 'Comes to you' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Comes to you</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: Screen_Width * 0.4, height: 40, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
          <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>In Salon</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ width: Screen_Width * 0.3, height: 40, backgroundColor: activeTab === 'Schedule' ? COLOR.ORANGECOLOR : COLOR.WHITE, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Schedule') }}>
          <Text style={{ color: activeTab === 'Schedule' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Schedule</Text>
        </TouchableOpacity> */}
      </View>


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
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export default ProfessionalBooking

const styles = StyleSheet.create({})