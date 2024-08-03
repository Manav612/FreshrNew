import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const ExploreMap = ({ activeTab, MarkerDataFordelivery, MarkerDataForSalon }) => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [position, setPosition] = useState(null);

    useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }, (err) => {
            console.error(err);
        }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
    }, []);

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

    if (!position) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={position}
                showsUserLocation={false}
                showsMyLocationButton={false}
                followsUserLocation={true}
                showsCompass={false}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                customMapStyle={mapStyle}
                toolbarEnabled={false}
                liteMode={true}
            >
                {activeTab === 'Delivery' && MarkerDataFordelivery.map((data, i) => (
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: data.location.coordinates[0],
                            longitude: data.location.coordinates[1],
                        }}
                        title={data.user.firstName + ' ' + data.user.lastName}
                        description={`Distance: ${data.distance}km`}
                    />
                ))}

                {activeTab === 'Salon' && MarkerDataForSalon.map((data, i) => (
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: data.location.coordinates[0],
                            longitude: data.location.coordinates[1],
                        }}
                        title={data.name}
                        description={`Distance: ${data.distance}km`}
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: width,
        height: height,
    },
});

export default ExploreMap;