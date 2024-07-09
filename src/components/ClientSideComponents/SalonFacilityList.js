import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { BASE_API_URL } from '../../Services';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { barber } from '../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationScreens } from '../../constants/Strings';

const SalonProffList = ({ route }) => {
    const [FetchedDeliveryData, setFetchedDeliveryData] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [bookmarkStatus, setBookmarkStatus] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const { FacilityDetail } = route.params
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const authToken = useSelector(state => state.AuthReducer);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 15,
        },
        contentContainer: {
            paddingTop: 20,
            paddingBottom: 100,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorText: {
            fontSize: 16,
            color: 'red',
            marginBottom: 20,
        },
        retryButton: {
            backgroundColor: COLOR_LIGHT.ORANGECOLOR,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
        },
        retryButtonText: {
            color: 'white',
            fontSize: 16,
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: COLOR_LIGHT.WHITE,
            height: Screen_Height * 0.15,
            borderRadius: 15,
            shadowColor: COLOR_LIGHT.BLACK,
            elevation: 3,
            marginHorizontal: 3,
        },
        itemContent: {
            flexDirection: "row",
            alignItems: 'center',
            paddingHorizontal: 15,
            flex: 1,
        },
        itemImage: {
            width: Screen_Width * 0.20,
            height: Screen_Height * 0.09,
            borderRadius: 10,
            marginRight: 30,
        },
        itemName: {
            color: COLOR_LIGHT.BLACK,
            fontSize: 16,
            fontWeight: '600',
        },
        itemDistance: {
            color: COLOR_LIGHT.BLACK,
            fontSize: 13,
        },
        bookmarkContainer: {
            paddingRight: 15,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: Screen_Height * 0.5,
        },
        emptyText: {
            fontSize: 16,
            color: COLOR_LIGHT.BLACK,
        },
    });

    useEffect(() => {
        checkLocationPermission();
    }, []);

    const checkLocationPermission = async () => {
        const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionStatus !== RESULTS.GRANTED) {
            const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (result === RESULTS.GRANTED) {
                getLocation();
            }
        } else {
            getLocation();
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                fetchDataForDelivery(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Error:", error);
                setLoading(false);
                setError("Failed to get location. Please try again.");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const fetchDataForDelivery = async (lat, lng) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }
            const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/`, config);
            console.log('========    delivery salonnnnn ============', res.data.data.professionals);

            setFetchedDeliveryData(res.data.data.professionals);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            setError("Failed to fetch data. Please try again.");
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        checkLocationPermission();
        setRefreshing(false);
    }, []);

    const toggleBookmark = (id) => {
        setBookmarkStatus(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLOR.ORANGECOLOR} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={checkLocationPermission}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }



    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>
                        Select Professional
                    </Text>
                </View>
            </View>
            <FlatList
                data={FetchedDeliveryData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLOR.ORANGECOLOR]} />
                }
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SalonProfServicesScreen, { ProfDetail: item, FacilityDetail })} style={styles.itemContent}>
                            <Image source={barber} style={styles.itemImage} />
                            <View>
                                <Text style={styles.itemName}>{item?.user?.firstName}{" "}{item?.user?.lastName}</Text>
                                <Text style={styles.itemDistance}>{item?.distance}km</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleBookmark(item._id)} style={styles.bookmarkContainer}>
                            <MaterialCommunityIcons
                                name={bookmarkStatus[item._id] ? "bookmark" : "bookmark-outline"}
                                size={25}
                                color={COLOR.ORANGECOLOR}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No professionals found.</Text>
                    </View>
                }
            />
        </>
    );
}

export default SalonProffList;

