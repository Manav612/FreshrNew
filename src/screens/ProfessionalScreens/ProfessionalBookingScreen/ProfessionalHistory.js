import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { OnBoard1 } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';


const ProfessionalHistory = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false);
    const [FetchedData, setFetchedData] = useState([]);
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
            const CancelledRes = await axios.get(`${BASE_API_URL}/professionals/professional/orders/CANCELLED`, config);
            const CompletedRes = await axios.get(
                `${BASE_API_URL}/professionals/professional/orders/COMPLETED`,
                config,
            );
            const combinedData = [
                ...CancelledRes.data.data.orders,
                ...CompletedRes.data.data.orders,
                // ...pendingRes.data.data.orders,
            ];

            console.log('==========   order  List comple cancel  ===========', combinedData)
            setFetchedData(combinedData)
        } catch (error) {
            console.error("Error:", error);
        }
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

        <View
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ backgroundColor: COLOR.WHITE, shadowColor: COLOR.BLACK, elevation: 3, marginHorizontal: 3, borderRadius: 10, paddingHorizontal: 20, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item?.createdAt.slice(0, 10)}</Text>
                </View>

                <View style={{ backgroundColor: COLOR.CANCEL_B, width: 75, height: 25, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: COLOR.WHITE }}>Cancelled</Text></View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10 }} />
            <View style={{ height: Screen_Height * 0.40 }}>
                <MapView
                    style={{ height: Screen_Height * 0.40 }}
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
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLOR.BLACK, marginVertical: 2 }}>
                        {item.professional.user.firstName}{" "}{item.professional.user.lastName}
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
                        </View>
                    </View>
                )}
            />
        </View>
    );

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15, flex: 1 }}
                data={FetchedData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                scrollEnabled={false}
            />
            <View style={{ height: 100 }} />
        </>
    )
}


export default ProfessionalHistory

const styles = StyleSheet.create({})