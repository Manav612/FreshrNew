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
import { data, data3, data4 } from '../../components/utils';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Filter } from '../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Explore = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  // const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.texztroke', stylers: [{ color: '#242f3e' }] },
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
  const [activeTab, setActiveTab] = useState('Delivery');
  const [activeTab2, setActiveTab2] = useState('Masculine');
  const refRBSheet = useRef([]);
  const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItem1, setSelectedItem1] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const navigation = useNavigation()
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const [bookmarkStatus, setBookmarkStatus] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [distance, setDistance] = useState(50);

  const openBottomSheet2 = () => {
    refRBSheet.current[0].open();
  };
  const AllCategory = ({ item }) => (
    <TouchableOpacity
        style={[
            styles.CategoryContainer,
            selectedItem === item.id && styles.selectedItem,
        ]}
        onPress={() => setSelectedItem(item.id)}>
        <View
            style={{
                marginHorizontal: 13,
            }}>

            <Text
                style={[
                    styles.Categorytext,
                    selectedItem === item.id && styles.SelectedCategorytext,
                ]}>
                {item.text.length > 10 ? item.text.substring(0, 10) + '...' : item.text}
            </Text>
        </View>
    </TouchableOpacity>
);
const Rating = ({ item }) => (
    <TouchableOpacity
        style={[
            styles.CategoryContainer,
            selectedItem1 === item.id && styles.selectedItem,
        ]}
        onPress={() => setSelectedItem1(item.id)}>
        <View
            style={{
                marginHorizontal: 13,
                flexDirection: 'row',
                gap: 5,
            }}>
            <MaterialCommunityIcons
                name="star"
                size={18}
                color={selectedItem1 === item.id ? COLOR.WHITE : COLOR.ORANGECOLOR}
            />
            <Text
                style={[
                    styles.Categorytext,
                    selectedItem1 === item.id && styles.SelectedCategorytext,
                ]}>
                {item.text}
            </Text>
        </View>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
  CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginLeft: 10,
      borderRadius: 30,
      height: 35,
      width: 110,
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
     
      <View style={{ borderRadius: 15, justifyContent: 'center', alignSelf: 'center', backgroundColor: COLOR.WHITE, marginVertical: 10, marginHorizontal: 10, padding: 10, elevation: 2, shadowColor: COLOR.BLACK, position: 'absolute', top: 10, zIndex: 1000 }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16,textAlign:'center' }}>Where do we meet?</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Salon</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 25, elevation: 2, shadowColor: COLOR.BLACK, justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.92, marginHorizontal: 15, position: 'absolute', top: 140, zIndex: 1000 }}>
      <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.80, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <AntDesign name="search1" size={30} color={COLOR.GRAY} />
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={COLOR.GRAY}
                            style={{ fontSize: 20, color: COLOR.GRAY, width: 200 }}
                            // onChangeText={text => {
                            //     setSearchText(text);
                            //     handleSearch();
                            // }}
                        />
                    </View>
                    <TouchableOpacity onPress={openBottomSheet2}>
                        <FastImage source={Filter} style={{ height: 20, width: 20 }} />

                    </TouchableOpacity>
                </View>
        </View>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 19.0760,
            longitude: 72.8777,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: 19.0760,
              longitude: 72.8777,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
       
        <View style={{}}>
          {/* <RBSheet
            ref={(ref) => (refRBSheet.current[0] = ref)}

            height={Screen_Height * 0.50}
            customStyles={{

              wrapper: {
                backgroundColor:COLOR.BLACK_40,
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
            <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontWeight: '600', fontSize: 25 }}>Details</Text>
              </View>
            </View>

          </RBSheet> */}
           <RBSheet
                    ref={(ref) => (refRBSheet.current[0] = ref)}

                    height={Screen_Height * 0.65}
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
                    <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 30, height: 3, backgroundColor: COLOR.BLACK, marginBottom: 10 }} />
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:Screen_Width*0.9}}>
                                <View style={{width:30}}/>
                                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK}}>Filter</Text>
                                <TouchableOpacity onPress={() => refRBSheet.current[0].close()}>
                                    <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />

                        

                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Style</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab2 === 'Masculine' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab2('Masculine') }}>
                                <Text style={{ color: activeTab2 === 'Masculine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Masculine</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab2 === 'Feminine' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab2('Feminine') }}>
                                <Text style={{ color: activeTab2 === 'Feminine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Feminine</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Category</Text>
                            <FlatList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={AllCategory}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18 }}>Rating</Text>
                            <FlatList
                                data={data3}
                                keyExtractor={item => item.id}
                                renderItem={Rating}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: '#000', fontSize: 18 }}>Distance: {distance} km</Text>
                            <Slider
                                style={{ width: '100%', marginTop: 10 }}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#000"
                                thumbTintColor="#000"
                                value={distance}
                                onValueChange={(value) => setDistance(value)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
                            <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Reset' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Reset') }}>
                                <Text style={{ color: activeTab === 'Reset' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Apply Filter' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Apply Filter') }}>
                                <Text style={{ color: activeTab === 'Apply Filter' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Apply Filter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </RBSheet>
        </View>
    </>
  )

}

export default Explore

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})