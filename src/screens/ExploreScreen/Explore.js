import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { Hair1, Successful } from '../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image';

const Explore = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  // const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];
  const [searchText, setSearchText] = useState('');
  const refRBSheet = useRef([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
};

const toggleBookmarkStatus = () => {
    setBookmarkStatus(prevState => !prevState);
};

  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };
  const styles = StyleSheet.create({
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginHorizontal: 5,
      borderRadius: 30,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    selectedItem: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '500',
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
  return (
    <>
      <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 25, elevation: 2, shadowColor: COLOR.BLACK, justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.92, marginHorizontal: 15, position: 'absolute', top: 20, zIndex: 1000 }}>
        <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.80, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <AntDesign name="search1" size={30} color={COLOR.GRAY} />
            <TextInput
              placeholder='Search'
              placeholderTextColor={COLOR.GRAY}
              style={{ fontSize: 20, color: COLOR.GRAY, width: 200 }}
              onChangeText={text => {
                setSearchText(text);
              }}
            />
          </View>
          <TouchableOpacity onPress={openBottomSheet}>
            <Ionicons name="filter" size={30} color={COLOR.ORANGECOLOR} />
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        style={{ height: Screen_Height, width: Screen_Width }}
        mapType='terrain'
        initialRegion={{
          latitude: 23.0225,
          longitude: 72.5714,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

        customMapStyle={{ mapStyle }}
      >

        <Marker
          draggable
          coordinate={{
            latitude: 23.0225,
            longitude: 72.5714,
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Test Marker'}
          description={'This is a description of the marker'}
        />
      </MapView>

      <View style={{}}>
        <RBSheet
          ref={(ref) => (refRBSheet.current[0] = ref)}

          height={Screen_Height * 0.35}
          customStyles={{

            wrapper: {
              backgroundColor: 'transparent',
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
          <View style={{ borderRadius: 25, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, paddingHorizontal: 15 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Details</Text>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2,marginBottom:10 }} />
            {/* Card details */}
            <View style={styles.CardContainer}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.CardImage} source={Hair1} />
                <View style={styles.CardContain}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
                    manav
                  </Text>
                  <Text style={{ color: 'gray' }}>nakbkdbkbkbckb</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 110,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={18}
                        color={COLOR.ORANGECOLOR}
                      />
                      <Text style={{ color: 'black' }}>23km</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <MaterialCommunityIcons
                        name="star-half-full"
                        size={18}
                        color={COLOR.ORANGECOLOR}
                      />
                      <Text style={{ color: 'black' }}>2</Text>
                    </View>

                  </View>
                </View>
                <TouchableOpacity >
                  <View style={{ height: 90, width: 30 }}>
                    <MaterialCommunityIcons
                      name="bookmark"
                      size={25}
                      color={COLOR.ORANGECOLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>
             

            </View>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',flexDirection:'row',gap:10, height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }}>
            <Entypo
                      name="direction"
                      size={25}
                      color={COLOR.WHITE}
                    />
            <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Get Direction</Text>
          </TouchableOpacity>
          </View>

        </RBSheet>
        <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', height: Screen_Height * 0.50, width: Screen_Width * 0.80, borderRadius: 25, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <FastImage source={Successful} style={{ height: 150, width: 150 }} resizeMode='cover' />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLOR.ORANGECOLOR }}>Successful!</Text>
                            <Text style={{ marginVertical: 10, fontSize: 18, color: COLOR.GRAY,textAlign:'center' }}>You have successfully canceled your {"\n"} booking order.80% funds will be {"\n"} returned to your account</Text>
                            <TouchableOpacity onPress={toggleModal} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15, width: Screen_Width * 0.70 }}>
                                <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '800' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

      </View>
    </>
  )
}

export default Explore
