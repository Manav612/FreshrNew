import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getCurrentLocation, locationPermission } from './helperFunction';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import socketServices from '../../Services/Socket';
import FastImage from 'react-native-fast-image';
import { barber, Client, ClientWhite, ComeToYouOrange, ComeToYouWhite, InSalonOrange, InSalonWhite } from '../../constants/Icons';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const LiveTrackingMap = ({
    mapApiKey,
    onLocationChange,
    socketType,
    staticCoordinate,
    isPro,
    setVisible,
    Prof_distance,
    Prof_duration,
    Client_distance,
    Client_duration,
}) => {
    const mapRef = useRef();
    const markerRef = useRef();
    const markerRefDestny = useRef();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

    const duration = 7000;

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

    const [state, setState] = useState({
        curLoc: {
            latitude: 20.5937,
            longitude: 78.9629,
        },
        coordinate: new AnimatedRegion({
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),

        destinationLoc: {},
        destinationCoordinate: new AnimatedRegion({
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),

        time: 0,
        distance: 0,
        heading: 0,
    })

    const { curLoc, time, distance, destinationLoc, destinationCoordinate, coordinate, heading } = state;
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    useEffect(() => {
        getLiveLocation(true)
    }, [])

    const getLiveLocation = async (isFirst) => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {

            const { latitude, longitude, heading } = await getCurrentLocation();
            animate(latitude, longitude);

            // console.log(`Current Location : ${latitude}, ${longitude}`);
            onLocationChange({ latitude, longitude });
            updateState({
                heading: heading,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
            })
            isFirst && onCenter(latitude, longitude);
            if (isPro) {
                console.log(staticCoordinate, "asdasdsd", parseFloat(latitude).toFixed(2));
                if (parseFloat(latitude).toFixed(2) == parseFloat(staticCoordinate[0]).toFixed(2) && parseFloat(longitude).toFixed(2) == parseFloat(staticCoordinate[1]).toFixed(2)) {

                    setVisible(true);
                }
            }
        }
    }

    const getDestinationLocation = (latitude, longitude) => {

        // console.log(`Destination Location : ${latitude}, ${longitude}`);
        if (isPro) {
            if (parseFloat(latitude).toFixed(2) == parseFloat(staticCoordinate[0]).toFixed(2) && parseFloat(longitude).toFixed(2) == parseFloat(staticCoordinate[1]).toFixed(2)) {
                setVisible(true);
            }
        }
        animateDestny(latitude, longitude);

        updateState({
            destinationLoc: { latitude, longitude },
            destinationCoordinate: new AnimatedRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation();
        }, duration);
        return () => clearInterval(interval)
    }, [])

    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, duration);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }

    const animateDestny = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRefDestny.current) {
                markerRefDestny.current.animateMarkerToCoordinate(newCoordinate, duration);
            }
        } else {
            destinationCoordinate.timing(newCoordinate).start();
        }
    }

    const onCenter = (lat, lng) => {
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })
    }

    useEffect(() => {
        socketServices.on(socketType, data => {
            // console.log("Location Socket Call: ", data);
            const { latitude, longitude } = data.message.data;
            console.log('Callllll : ', socketType);
            getDestinationLocation(latitude, longitude);
        });

    }, [])
    return (
        <View style={styles.Container}>
            <View style={styles.Container}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    provider='google'
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    customMapStyle={mapStyle}
                    mapType='terrain'
                >

                    {
                        staticCoordinate && staticCoordinate.length > 0 &&
                        <Marker
                            coordinate={{
                                latitude: staticCoordinate[0],
                                longitude: staticCoordinate[1],
                            }}
                            title={'Static Marker'}
                            tracksViewChanges={false}
                        >
                            <View style={{ height: 30, width: 30, backgroundColor: COLOR.BLACK, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                                <Image style={{ height: 20, width: 20 }} source={InSalonWhite} resizeMode='contain' />
                                {/* <FontAwesome5 name="user" color={COLOR.ORANGECOLOR} size={15} /> */}

                            </View>
                        </Marker>
                    }

                    <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}
                        title={'My Location'}
                        // description={`${curLoc.latitude}, ${curLoc.longitude}`}
                        tracksViewChanges={false}
                    >
                        <View style={{ height: 30, width: 30, backgroundColor: COLOR.BLACK, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                            <Image style={{ height: 20, width: 20 }} source={ClientWhite} resizeMode='contain' />
                            {/* <FontAwesome5 name="user" color={COLOR.WHITE} size={15} /> */}

                        </View>
                    </Marker.Animated>

                    {
                        Object.keys(destinationLoc).length > 0 &&
                        <Marker.Animated
                            ref={markerRefDestny}
                            coordinate={destinationCoordinate}
                            title={'My Destination'}
                            // description={`${destinationLoc.latitude}, ${destinationLoc.longitude}`}
                            tracksViewChanges={false}
                        >
                            <View style={{ height: 30, width: 30, backgroundColor: COLOR.BLACK, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                                <Image style={{ height: 20, width: 20 }} source={ComeToYouWhite} resizeMode='contain' />
                            </View>
                        </Marker.Animated>
                    }

                    {
                        staticCoordinate && staticCoordinate.length > 0 &&
                        <MapViewDirections
                            origin={curLoc}
                            destination={{
                                latitude: staticCoordinate[0],
                                longitude: staticCoordinate[1],
                            }}
                            apikey={mapApiKey}
                            strokeWidth={5}
                            strokeColor={COLOR.ORANGECOLOR}
                            optimizeWaypoints={true}
                            onStart={(params) => {
                                console.log(`Started routing between client ================"${params.origin}" and "${params.destination}"`);
                            }}
                            onReady={result => {
                                Client_distance(result.distance)
                                Client_duration(result.duration)
                                console.log(`Distance client ==================: ${result.distance} km`)
                                console.log(`Duration client =================: ${result.duration} min.`)
                                fetchTime(result.distance, result.duration),
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            // right: 30,
                                            // bottom: 300,
                                            // left: 30,
                                            // top: 100,
                                        },
                                    });
                            }}
                            onError={(errorMessage) => {
                                // console.log('GOT AN ERROR');
                            }}
                        />
                    }

                    {
                        staticCoordinate && staticCoordinate.length > 0 && Object.keys(destinationLoc).length > 0 &&
                        <MapViewDirections
                            origin={destinationLoc}
                            destination={{
                                latitude: staticCoordinate[0],
                                longitude: staticCoordinate[1],
                            }}
                            apikey={mapApiKey}
                            strokeWidth={3}
                            strokeColor={COLOR.ChartBlue}
                            optimizeWaypoints={true}
                            onStart={(params) => {
                                console.log(`Started routing between prof ================== "${params.origin}" and "${params.destination}"`);
                            }}
                            onReady={result => {
                                Prof_distance(result.distance)
                                Prof_duration(result.duration)
                                console.log(`Distance  =============== : ${result.distance} km`)
                                console.log(`Duration prof ======prof============== : ${result.duration} min.`)
                                fetchTime(result.distance, result.duration),
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            // right: 30,
                                            // bottom: 300,
                                            // left: 30,
                                            // top: 100,
                                        },
                                    });
                            }}
                            onError={(errorMessage) => {
                                // console.log('GOT AN ERROR');
                            }}
                        />
                    }
                </MapView>

            </View>

            {/* {
                distance !== 0 && time !== 0 &&
                <View style={styles.TimeDistanceContainer}>
                    <Text>Time left: {time.toFixed(0)} </Text>
                    <Text>Distance left: {distance.toFixed(0)}</Text>
                </View>
            } */}

        </View>
    )
}

export default LiveTrackingMap

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    },
    TimeDistanceContainer: {
        alignItems: 'center',
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 100,
        width: '100%',
        padding: 20,
    }
})