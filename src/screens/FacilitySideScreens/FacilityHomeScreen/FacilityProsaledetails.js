


import { StyleSheet, Text, View, SectionList, Modal, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';

import { NavigationScreens } from '../../../constants/Strings';
import { Hair1 } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';
import { FacilityData } from '../../../components/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const FacilityProsaledetails = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    toggleModal();
    // Handle the selected item here, e.g., navigate to the FacilityDetalisScreen
  };

  const notifications = [
    { title: 'Today', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Dec 22,2024 - 10:00 AM' }, { message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Dec 22,2024 - 10:00 AM' }, { message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Dec 22,2024 - 10:00 AM' }] },
    { title: 'Yesterday', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Nov 25,2024 - 10:00 AM' }, { message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Dec 22,2024 - 10:00 AM' }] },
    { title: "December 21, 2024", data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Oct 19,2024 - 10:00 AM' }] },
    { title: 'December 11, 2024', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'May 16,2024 - 10:00 AM' }, { message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Dec 22,2024 - 10:00 AM' }] },
    { title: 'December 1, 2024', data: [{ message: 'Barbarella inova', price: '6993 Meadow valley ', services: 'Services', description: 'Quiff Haircut.Thin Shaving.aloe vera Shampoo Hair Wash', time: 'Jun 22,2024 - 10:00 AM' }] },
  ];

  const renderItem = ({ item }) => (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginVertical: 5, paddingVertical: 10, backgroundColor: COLOR.WHITE, borderRadius: 10 }}>
        <Image source={Hair1} style={{ width: 100, height: 100, borderRadius: 10, resizeMode: 'cover' }} />
        <View style={{ width: Screen_Width * 0.53 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLOR.BLACK }}>{item.message}</Text>
          <Text style={{ fontSize: 15, color: COLOR.BLACK }}>{item.price}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.GRAY }}>{item.services}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLOR.ORANGECOLOR }}>{item.description}</Text>
          <Text style={{ fontSize: 15, color: COLOR.BLACK }}>{item.time}</Text>
        </View>
      </View>
    </>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={{ fontSize: 22, color: COLOR.BLACK, marginTop: 20, marginBottom: 10 }}>{title}</Text>
  );


  return (
    <>
      
      <SectionList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15, marginHorizontal: 15 }}
        sections={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Pro Sales Details</Text>

          </View>
          <View>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              padding: 20,
              backgroundColor: COLOR.WHITE,
              borderRadius: 20,
              elevation: 2,
              shadowColor: COLOR.BLACK,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={toggleModal}
          >
            {selectedItem ? (
              <>
                <Image
                  source={Hair1}
                  style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 10 }}
                />
                <View style={{ width: Screen_Width * 0.5 }}>
                  <Text style={styles.earningsText}>{selectedItem.name}</Text>
                  <Text style={styles.earningsSubText}>{selectedItem.title}</Text>
                </View>
              </>
            ) : (
              <Text>Select a Professional</Text>
            )}
            <AntDesign name="down" size={28} color={COLOR.ChartBlue} />
          </TouchableOpacity>
  
          <Modal visible={isModalVisible} animationType="slide">
            <View style={{ flex: 1 }}>
              <FlatList
                data={FacilityData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 15,
                      padding: 20,
                      backgroundColor: COLOR.WHITE,
                      borderRadius: 20,
                      elevation: 2,
                      shadowColor: COLOR.BLACK,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 20,
                    }}
                    onPress={() => handleItemSelect(item)}
                  >
  
                    <Image
                      source={Hair1}
                      style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 10 }}
                    />
                    <View style={{ width: Screen_Width * 0.5 }}>
                      <Text style={styles.earningsText}>{item.name}</Text>
                      <Text style={styles.earningsSubText}>{item.title}</Text>
                    </View>
                    <Fontisto
                      name={selectedItem?.id === item.id ? "checkbox-active" : "checkbox-passive"}
                      size={24}
                      color={COLOR.ORANGECOLOR}
                    />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={{ padding: 20, backgroundColor: COLOR.WHITE }}
                onPress={toggleModal}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        </>
        }
      />
      <View style={{ height: 100 }} />
    </>
  )
}

export default FacilityProsaledetails

const styles = StyleSheet.create({})