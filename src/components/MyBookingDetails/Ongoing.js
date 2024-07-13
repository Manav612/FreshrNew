
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { OnBoard1 } from '../../constants/Icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../Services';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';

const Ongoing = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const navigation = useNavigation()
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [toggleStatus, setToggleStatus] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [FetchedData, setFetchedData] = useState([]);
    const toggleBookmark = (sumit) => {
        setToggleStatus(prevState => ({
            ...prevState,
            [sumit]: !prevState[sumit]
        }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const ongoingRes = await axios.get(`${BASE_API_URL}/users/user/orders/ONGOING`, config);
            const inTrafficRes = await axios.get(`${BASE_API_URL}/users/user/orders/IN_TRAFFIC`, config);
            // const pendingRes = await axios.get(`${BASE_API_URL}/users/user/orders/PENDING`, config);                                                                                                              

            const combinedData = [
                ...ongoingRes.data.data.orders,
                ...inTrafficRes.data.data.orders,
                // ...pendingRes.data.data.orders,
            ];

            console.log('==========   order  List Ongoing / in traffic   ===========', combinedData)
            setFetchedData(combinedData)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleResetPress = (id) => {
        setFetchedData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, resetSelected: !item.resetSelected, applySelected: false };
            }
            return item;
        }));
    };

    const handleApplyPress = (id) => {
        setFetchedData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, applySelected: !item.applySelected, resetSelected: false };
            }
            return item;
        }));
    };

    const handleResetPress1 = () => {
        setResetSelected(!resetSelected);
        setApplySelected(false);
    };

    const handleApplyPress2 = () => {
        setApplySelected(!applySelected);
        setResetSelected(false);
    };

    const refRBSheet = useRef([]);
    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };
    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };

    const [position, setPosition] = useState();
    const [activeTab, setActiveTab] = useState('Delivery');
    const [MarkerDataFordelivery, setMarkerDataFordelivery] = useState([]);
    const mapStyle = [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
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

    const renderItem = ({ item }) => (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ backgroundColor: COLOR.WHITE, shadowColor: COLOR.BLACK, elevation: 3, marginHorizontal: 3, borderRadius: 10, paddingHorizontal: 20, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item?.createdAt.slice(0, 10)}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Remind me</Text>
                    <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                        <FontAwesome
                            name={toggleStatus[item.id] ? "toggle-off" : "toggle-on"}
                            size={25}
                            color={COLOR.ORANGECOLOR}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10 }} />
            <View style={{height:Screen_Height*0.40}}>
                <MapView
                    style={{height:Screen_Height*0.40}}
                    initialRegion={position}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    followsUserLocation={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    customMapStyle={mapStyle}
                >

                    {activeTab === 'Delivery' && MarkerDataFordelivery.map((data, i) => (
                        <Marker
                            coordinate={{
                                latitude: data.location.coordinates[0],
                                longitude: data.location.coordinates[1],
                            }}
                            title={'Test Marker'}
                            description={'This is a description of the marker'}
                            key={i}
                        >
                            <View style={{ height: 40, width: 40, backgroundColor: COLOR.WHITE, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                                <Entypo name="home" size={30} color={COLOR.ORANGECOLOR} />
                            </View>
                        </Marker>
                    ))}

                    {activeTab === 'Salon' && MarkerDataForSalon.map((data, i) => (
                        <Marker
                            coordinate={{
                                latitude: data.location.coordinates[0],
                                longitude: data.location.coordinates[1],
                            }}
                            title={'Test Marker'}
                            description={'This is a description of the marker'}
                            key={i}
                        >
                            <Entypo name="location-pin" size={50} color={COLOR.ORANGECOLOR} />
                        </Marker>
                    ))}

                </MapView>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLOR.BLACK, marginVertical: 2 }}>
                        {item.professional.user.firstName} {item.professional.user.lastName}
                    </Text>
                </View>
            </View>
            <FlatList
                data={item.services}
                keyExtractor={(service, index) => index.toString()}
                renderItem={({ item: service }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ height: 65, width: 65, backgroundColor: COLOR.LINECOLOR, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                            <FastImage source={{ uri: service.photo }} resizeMode='contain' style={{ width: 90, height: 100, borderRadius: 10 }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{service.serviceType.name}</Text>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{service.serviceType.category}</Text>
                            <Text style={{ fontSize: 15, color: COLOR.ORANGECOLOR, marginVertical: 2 }}>{service.serviceType.description}</Text>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>30 min</Text>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>$ 3000</Text>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>25 km</Text>

                        </View>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                <TouchableOpacity onPress={() => { handleResetPress(item.id), openBottomSheet() }} style={{ backgroundColor: item.resetSelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: Screen_Width * 0.35, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontWeight: '700', color: item.resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleApplyPress(item.id)} style={{ backgroundColor: item.applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: Screen_Width * 0.35, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontWeight: '700', color: item.applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>View E-Receipt</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15, flex: 1 }}
                scrollEnabled={false}
                data={FetchedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <View>
                <RBSheet
                    ref={(ref) => (refRBSheet.current[0] = ref)}
                    height={Screen_Height * 0.35}
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.9 }}>
                                <View style={{ width: 30 }} />
                                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Cancel Booking</Text>
                                <TouchableOpacity onPress={() => refRBSheet.current[0].close()}>
                                    <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
                        <View style={{ justifyContent: 'center', marginVertical: 10, paddingHorizontal: 30, gap: 10 }}>
                            <Text style={{ color: COLOR.BLACK, textAlign: 'center', fontSize: 18, fontWeight: '800' }}>Are you sure want to cancel your barber/salon booking?</Text>
                            <Text style={{ color: COLOR.BLACK, textAlign: 'center', fontSize: 15 }}>Only 80% of the money you can refund from your payment according to our policy</Text>
                        </View>
                        <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => { handleResetPress1(); refRBSheet.current[0].close() }} style={{ backgroundColor: resetSelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Reschedule</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleApplyPress2(); navigation.navigate('Cancelbooking Screen'); refRBSheet.current[0].close() }} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes, Cancel Booking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
            </View>
            <View style={{ height: 100 }} />
            </ScrollView>
    )
}

export default Ongoing

const styles = StyleSheet.create({})

