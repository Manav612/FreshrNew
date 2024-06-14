

import React, { useState, useRef, useEffect } from 'react';
import { Alert, Dimensions, FlatList, Image, KeyboardAvoidingView, Modal, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Media, OnBoard4 } from '../../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import { Screen_Height, Screen_Width } from '../../../../constants/Constants';
import Onboarding from 'react-native-onboarding-swiper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../../../constants/Colors';
import { NavigationScreens } from '../../../../constants/Strings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Servicesdata3 } from '../../../../components/utils';
import ShopTime from '../../../../components/ShopTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker'
import { CheckPermission } from '../../../../constants/CheckPermission';
import { PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import MapView, { Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GetLocation from 'react-native-get-location'

const FacilityOnBoardingScreen = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [seatCount, setSeatCount] = useState(1);
    const [facilityName, setFacilityName] = useState('');
    const [description, setDescription] = useState('');
    const [work, setWork] = useState('In salon');
    const [isEmail, setIsEmail] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [location, setLocation] = useState([])

    const [imageUri, setImageUri] = useState([]);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [activeTab, setActiveTab] = useState('Delivery');
    const [ShopTime, setShopTime] = useState(false);
    const { width, height } = Dimensions.get("window");
    const ASPECT_RATIO = width / height;
    const [radius, setRadius] = useState(1);
    const mapRef = useRef();
    const [loc, setLoc] = useState()
    const [coverImageUri, setCoverImageUri] = useState(null);
    const [galleryImageUris, setGalleryImageUris] = useState([]);

    const LATITUDE_DELTA = Platform.OS === "IOS" ? 1.5 : 0.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA * Number(1 / 15),
        longitudeDelta: LONGITUDE_DELTA * Number(1 / 15),
    };
    const [region, setRegion] = useState(initialRegion);
    const [timeData, setTimeData] = useState({
        Monday: { start: '10:00 AM', end: '11:00 PM' },
        Tuesday: { start: '10:00 AM', end: '11:00 PM' },
        Wednesday: { start: '10:00 AM', end: '11:00 PM' },
        Thursday: { start: '10:00 AM', end: '11:00 PM' },
        Friday: { start: '10:00 AM', end: '11:00 PM' },
        Saturday: { start: '10:00 AM', end: '11:00 PM' },
        Sunday: { start: '10:00 AM', end: '11:00 PM' },
    });
    const _map = useRef(null);
    const openModal = (day) => {
        setSelectedDay(day);
        setModalVisible(true);
    };

    s = {
        region: {
            latitude: 23.052524,
            longitude: 72.6800283,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        }
    }
    const [rState, rSetState] = useState(s);

    const saveTime = () => {
        const updatedTimeData = {
            ...timeData,
            [selectedDay]: {
                start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                end: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        };

        setTimeData(updatedTimeData);
        setModalVisible(false);

        console.log("====------->>>>", updatedTimeData);

    };

    const onStartChange = (event, selectedDate) => {
        const currentDate = selectedDate || startTime;
        setShowStartPicker(Platform.OS === 'ios');
        setStartTime(currentDate);
    };

    const onEndChange = (event, selectedDate) => {
        const currentDate = selectedDate || endTime;
        setShowEndPicker(Platform.OS === 'ios');
        setEndTime(currentDate);
    };
    const handleCountPlus = () => {
        setSeatCount(seatCount + 1);
    };
    const handleCountMinus = () => {
        if (seatCount > 1) {
            setSeatCount(seatCount - 1);
        }
    };

    const CameraHandle = async () => {
        const granted = await CheckPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        console.log("-------------111111-", granted);

        setImageModalVisible(!imageModalVisible)
    };

    const onUploadPress = async () => {
        const granted = await CheckPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        console.log("-----------22222---", granted);

        if (granted == true || Platform.OS == 'ios') {
            ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                cropperToolbarTitle: 'Crop Image',
                hideBottomControls: true,
                enableRotationGesture: true,
                showCropGuidelines: false,
                compressImageQuality: 0.9,
                multiple: true,
            }).then(images => {
                const selectedImages = images.slice(0, 7); // Limit to 7 images (1 cover + up to 6 gallery)
                const coverImage = selectedImages.length > 0 ? selectedImages[0].path : null;
                const galleryImages = selectedImages.slice(1).map(i => i.path);

                setCoverImageUri(coverImage);
                setGalleryImageUris([...galleryImageUris, ...galleryImages]);
            }).catch(error => {
                console.log('Error selecting images:', error);
            });
        }
    }

    const onCapturePress = async () => {
        setImageModalVisible(false);
        const granted = await CheckPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.CAMERA :
                PERMISSIONS.ANDROID.CAMERA
        );
        console.log("-----------3333333---", granted);
        if (granted == true || Platform.OS == 'ios') {
            ImagePicker.openCamera({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                cropperToolbarTitle: 'Crop Image',
                hideBottomControls: true,
                enableRotationGesture: true,
                showCropGuidelines: false,
                compressImageQuality: 0.9,

            }).then(image => {
                setImageModalVisible(false);
                setImageUri(image.path);
            }).catch((e) => {
                setImageModalVisible(false);
                console.log(e);
            })
        }
    }

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const locationPermissionStatus = await Geolocation.requestAuthorization(
                'whenInUse',
            );

            const locationGranted = locationPermissionStatus === 'granted' || locationPermissionStatus === 'restricted';

            if (locationGranted) {
                handleUserLocation();
                return true;
            }
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    handleUserLocation();
                } else {
                    requestLocationPermission();
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }

    const handleUserLocation = () => {


        Geolocation.getCurrentPosition(
            (pos) => {

                rSetState({
                    region: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }
                })
                _map.current.animateToRegion({
                    ...rState.region,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
            },
            (error) => {
                // See error code charts below.
                console.warn("Error " + error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
    }

    useEffect(() => {
        requestLocationPermission();
    }, [])

    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 5,
        },
        input: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 15,
            elevation: 5,
            shadowColor: COLOR.BLACK,
            marginVertical: 5,
        },
        halfInput: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 15,
            elevation: 5,
            shadowColor: COLOR.BLACK,
            marginVertical: 5,
            width: Screen_Width * 0.35,
        },
        ImageText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: COLOR.BLACK,
            textAlign: 'center',
            marginTop: 25
        },

        ImageLimitText: {
            fontSize: 14,
            textAlign: 'center',
            marginTop: 10,
        },
        imageContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 },
        imageInnerContainer: {
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: COLOR.ORANGECOLOR,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            shadowColor: COLOR.ORANGECOLOR,
            position: 'relative',
            marginBottom: 20
        },
        image: {
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        icon: {
            marginRight: 10,
        },
        rememberContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
        },
        button: {
            backgroundColor: COLOR.ORANGECOLOR,
            justifyContent: 'center',
            borderRadius: 25,
            alignItems: 'center',
            marginVertical: 10,
            height: 40,
            width: Screen_Width * 0.88,
        },
        buttonText: {
            color: COLOR.WHITE,
            fontSize: 16,
            fontWeight: 'bold',
        },
        dropdownContainer: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: COLOR.AuthField,
            padding: 10
        },
        dropdown: {
            height: 50,
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            paddingHorizontal: 8,
        },
        placeholderStyle: {
            fontSize: 16,
            color: COLOR.BLACK_40
        },
        selectedTextStyle: {
            fontSize: 16,
            color: COLOR.BLACK
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        dropdownItem: {
            padding: 10,
            backgroundColor: COLOR.AuthField,
            color: COLOR.BLACK
        },
        dropdownItemSelected: {
            backgroundColor: COLOR.AuthField,
            color: COLOR.BLACK
        },

        image: {
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        cameraButton: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK,
            borderRadius: 25,
            height: 30,
            width: 30,
            position: 'absolute',
            right: 1,
            bottom: 1,
        },

        modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            // backgroundColor: COLOR.ROYALBLUE,

        },
        innerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '20%',
            width: '80%',
            backgroundColor: COLOR.ORANGECOLOR,
            borderRadius: 15,
        },
        closeButton: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
        },
        buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 30,
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: COLOR.BLACK,
            fontSize: 18,
            fontWeight: '700',
        },

        iconStyle: {
            width: 20,
            height: 20,
        },
        errorText: {
            color: COLOR.ROYALGOLDEN
        },
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: COLOR.WHITE,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: COLOR.GRAY,
        },
        dayText: {
            fontSize: 16,
            color: COLOR.BLACK
        },
        timeText: {
            fontSize: 16,
            color: COLOR.BLACK
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK_40,
        },
        modalContent: {
            width: '80%',
            backgroundColor: COLOR.WHITE,
            padding: 20,
            borderRadius: 10,
        },
        modalTitle: {
            fontSize: 18,
            marginBottom: 10,
            color: COLOR.BLACK
        },
    });

    const handleNavigation = () => {
        if (!street || !apartment || !city || !state || !postalCode || !country || !seatCount || !facilityName || !description || !timeData || !imageUri || !rState || !coverImageUri || !galleryImageUris) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            return;
        }
        const facilityData = {
            street,
            apartment,
            city,
            state,
            postalCode,
            country,
            seatCount,
            facilityName,
            description,
            timeData,
            imageUri,
            rState,
            coverImageUri,
            galleryImageUris

        };
        navigation.navigate(NavigationScreens.ConfirmationForCreateFacilitieScreen, { facilityData });
    };

    return (
        <>
            <Onboarding
                bottomBarColor={COLOR.ORANGECOLOR}
                onDone={handleNavigation}
                showSkip={false}
                swipeEnabled={false}

                containerStyles={{
                    height: Screen_Height * 0.5,
                    width: Screen_Width,
                    justifyContent: 'flex-start',
                    backgroundColor: COLOR.WHITE,
                }}
                pages={[
                    {
                        backgroundColor: COLOR.WHITE,
                        image: (
                            <View>
                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 5 }}>Add Facility</Text>
                                <Image source={OnBoard4} style={{ width: Screen_Width, height: Screen_Height * 0.25, resizeMode: 'stretch' }} />
                            </View>
                        ),
                        title: (
                            <>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: Screen_Width, paddingHorizontal: 15 }}>
                                        <View style={{ width: Screen_Width * 0.6 }}>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Select Location</Text>
                                            <Text style={{ color: COLOR.BLACK, fontSize: 10 }}>Please check that your Facility location is shown on Google Maps.</Text>
                                        </View>
                                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.2, height: 40, borderRadius: 20 }}>
                                            <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>Find By Map</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: Screen_Width, }}>

                                        <GooglePlacesAutocomplete
                                            placeholder="Enter Location"
                                            minLength={4}
                                            styles={{
                                                container: {
                                                    height: 100,
                                                    width: Screen_Width * 0.9,
                                                    //    backgroundColor:'red'
                                                },
                                            }}
                                            onPress={(data, details = null) => {
                                                setRegion({
                                                    latitude: details.geometry.location.lat,
                                                    longitude: details.geometry.location.lng,
                                                    latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
                                                    longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
                                                });
                                                mapRef.current?.animateToRegion(
                                                    {
                                                        latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
                                                        longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
                                                        latitude: details.geometry.location.lat,
                                                        longitude: details.geometry.location.lng,
                                                    },
                                                    1000
                                                );
                                            }}
                                            autoFocus={false}
                                            listViewDisplayed={false}
                                            keepResultsAfterBlur={true}
                                            returnKeyType={"default"}
                                            fetchDetails={true}
                                            GooglePlacesDetailsQuery={{
                                                rankby: "distance",
                                            }}

                                            query={{
                                                key: "AIzaSyCOv8bKnTUh_03fuq11mXQPBEx9-TF3bWE",
                                                language: "en",
                                                radius: 30000,
                                                location: `${region.latitude}, ${region.longitude}`,
                                            }}

                                        />
                                        <View style={{ height: Screen_Height * 0.3, width: Screen_Width * 0.88, borderRadius: 15, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK }} >

                                            <MapView
                                                ref={_map}
                                                // provider={PROVIDER_GOOGLE}
                                                style={{ flex: 1, borderRadius: 7, overflow: 'hidden' }}
                                                initialRegion={rState.region}
                                                showsUserLocation={true}
                                                rotateEnabled={false}
                                            >
                                                <Marker coordinate={rState.region}>

                                                    <FontAwesome
                                                        name="map-marker"
                                                        size={35}
                                                        color={COLOR.PINK} />
                                                </Marker>
                                            </MapView>
                                            {/* <MapView
          ref={_map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={async (e) => {
            console.log(e);
            setRegion({ ...e });
            let l = await Location.reverseGeocodeAsync({
              "latitude":e.latitude,
              "longitude":e.longitude
            })
            console.log("innnnnnnnnnnnnnnn lllllll----->", l);
            setLocation(l)
          }}
        //   customMapStyle={mapStyles}
          
        >
          <Marker coordinate={region}>
          {/* <Text>{`${location[0]?.city}, ${location[0]?.street==null?'':location[0]?.street}${location[0]?.postalCode}`}</Text> */}

                                            {/* <FontAwesome
              name="map-marker"
              size={35}
              color={COLOR.ORANGECOLOR}
            />
          </Marker>
          <Circle
            center={region}
            radius={radius * 1000}
            strokeColor={COLOR.ORANGECOLOR}
            strokeWidth={3}
            // fillColor={rgba(theme.colors.brand.primary, 0.3)}
            zIndex={2}
            
          />
        </MapView> */}
                                        </View>
                                    </View>
                                    <View style={{ height: Screen_Height * 0.5 }} />

                                </ScrollView>
                                {/* <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Get Started</Text>
                                </TouchableOpacity> */}
                            </>
                        ),
                    },
                    {
                        backgroundColor: COLOR.WHITE,
                        image: (
                            <View>
                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 5 }}>Add Facility</Text>
                                <Image source={OnBoard4} style={{ width: Screen_Width, height: Screen_Height * 0.24, resizeMode: 'stretch' }} />
                            </View>
                        ),
                        title: (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: Screen_Width, paddingHorizontal: 15 }}>
                                    <KeyboardAvoidingView style={{ width: Screen_Width * 0.88 }}>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Add Address</Text>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Street</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Street"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={street}
                                                onChangeText={setStreet}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Apartment, Suite ( Optional)</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Apartment, Suite"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={apartment}
                                                onChangeText={setApartment}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>City</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="City"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={city}
                                                onChangeText={setCity}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>State / Province</Text>
                                                <TextInput
                                                    style={[styles.halfInput]}
                                                    placeholder="State / Province"
                                                    placeholderTextColor={COLOR.BLACK}
                                                    value={state}
                                                    onChangeText={setState}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Postal code</Text>
                                                <TextInput
                                                    style={[styles.halfInput]}
                                                    placeholder="Postal code"
                                                    placeholderTextColor={COLOR.BLACK}
                                                    value={postalCode}
                                                    onChangeText={setPostalCode}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Country/Region</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Country/Region"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={country}
                                                onChangeText={setCountry}
                                            />
                                        </View>
                                        {/* <TouchableOpacity style={styles.button}>
                                            <Text style={styles.buttonText}>Get Started</Text>
                                        </TouchableOpacity> */}
                                    </KeyboardAvoidingView>
                                </View>
                                <View style={{ height: Screen_Height * 0.5 }} />
                            </ScrollView>
                        ),
                    },
                    {
                        backgroundColor: COLOR.WHITE,
                        image: (
                            <View>
                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 5 }}>Add Facility</Text>
                                <Image source={OnBoard4} style={{ width: Screen_Width, height: Screen_Height * 0.25, resizeMode: 'stretch' }} />
                            </View>
                        ),
                        title: (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ width: Screen_Width * 0.88, marginHorizontal: 15 }}>
                                    <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
                                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Name</Text>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 12 }}>What is the name of your facility</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Facility Name</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            placeholder="Name"
                                            placeholderTextColor={COLOR.BLACK}
                                            value={facilityName}
                                            onChangeText={setFacilityName}
                                        />
                                    </View>
                                    <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
                                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Description</Text>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 12 }}>How do you describe your facility</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Facility's Description</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            placeholder="description"
                                            placeholderTextColor={COLOR.BLACK}
                                            value={description}
                                            onChangeText={setDescription}
                                        />
                                    </View>
                                    <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
                                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Set seats number</Text>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 12 }}>How many seats do you want to make available here</Text>
                                    </View>
                                    <View style={{
                                        backgroundColor: COLOR.AuthField,
                                        borderRadius: 15,
                                        elevation: 5,
                                        height: 50,
                                        paddingHorizontal: 10,
                                        shadowColor: COLOR.BLACK,
                                        marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                    }}>
                                        <TouchableOpacity onPress={handleCountMinus}>
                                            <AntDesign name="minuscircle" size={24} color={COLOR.ORANGECOLOR} />
                                        </TouchableOpacity>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '700' }}>{seatCount}</Text>
                                        <TouchableOpacity onPress={handleCountPlus}>
                                            <AntDesign name="pluscircle" size={24} color={COLOR.ORANGECOLOR} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Get Started</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ height: Screen_Height * 0.5 }} />
                            </ScrollView>
                        ),
                    },
                    {
                        backgroundColor: COLOR.WHITE,
                        image: (
                            <View>
                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 5 }}>Add Facility</Text>
                                <Image source={OnBoard4} style={{ width: Screen_Width, height: Screen_Height * 0.25, resizeMode: 'stretch' }} />
                            </View>
                        ),
                        title: (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: Screen_Width, paddingHorizontal: 15 }}>
                                    <View />
                                    <TouchableOpacity onPress={onUploadPress} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.25, height: 40, borderRadius: 20, flexDirection: 'row', gap: 5, marginBottom: 15 }}>
                                        <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>Add Media</Text>
                                        <FastImage source={Media} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                                {coverImageUri && (
                                    <View style={{ marginHorizontal: 5, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Cover Image</Text>

                                        <Image source={{ uri: coverImageUri }} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />


                                    </View>
                                )}
                                {galleryImageUris.length > 0 ? (
                                    <View style={{ marginHorizontal: 5, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>

                                        <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '600' }}>Gallery</Text>

                                        <FlatList
                                            data={galleryImageUris}
                                            renderItem={({ item }) => (
                                                <View style={{ marginHorizontal: 5, marginVertical: 10 }}>

                                                    <Image source={{ uri: item }} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                            numColumns={3}
                                        />
                                    </View>
                                ) : (
                                    <Text style={styles.ImageText}>No Images selected.{'\n'} You can select up to 7 images, 1 for cover image and 6 for gallery</Text>
                                )}
                                <View style={{ height: Screen_Height * 0.2 }} />
                            </ScrollView>
                        ),
                    },
                    {
                        backgroundColor: COLOR.WHITE,
                        image: (
                            <View>
                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 24, textAlign: 'center', padding: 5 }}>Add Facility</Text>
                                <Image source={OnBoard4} style={{ width: Screen_Width, height: Screen_Height * 0.25, resizeMode: 'stretch' }} />
                            </View>
                        ),
                        title: (
                            <>
                                <View style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK, marginBottom: 5 }}>Shop Timing</Text>
                                        <TouchableOpacity onPress={() => setShopTime(!ShopTime)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                            <Text style={{ fontWeight: '600', fontSize: 18, color: COLOR.BLACK }}>Vacation</Text>
                                            <FontAwesome name={ShopTime ? "toggle-off" : "toggle-on"} size={30} color={COLOR.ORANGECOLOR} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.container}>
                                        {Object.keys(timeData).map((day) => (
                                            <TouchableOpacity key={day} style={styles.row} onPress={() => openModal(day)}>
                                                <Text style={styles.dayText}>{day}</Text>
                                                <Text style={styles.timeText}>{`${timeData[day].start} - ${timeData[day].end}`}</Text>
                                            </TouchableOpacity>
                                        ))}

                                        <Modal visible={modalVisible} transparent={true} animationType="slide">
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalContent}>
                                                    <Text style={styles.modalTitle}>Edit {selectedDay}</Text>
                                                    <Text style={{ color: COLOR.BLACK }}>Opening Time:</Text>
                                                    {Platform.OS === 'ios' ? (
                                                        <DateTimePicker
                                                            value={startTime}
                                                            mode="time"
                                                            display="default"
                                                            onChange={onStartChange}
                                                        />
                                                    ) : (
                                                        <>
                                                            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}>
                                                                <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                            </TouchableOpacity>
                                                            {showStartPicker && (
                                                                <DateTimePicker
                                                                    value={startTime}
                                                                    mode="time"
                                                                    display="default"
                                                                    onChange={onStartChange}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                    <Text style={{ color: COLOR.BLACK }}>Closing Time:</Text>
                                                    {Platform.OS === 'ios' ? (
                                                        <DateTimePicker
                                                            value={endTime}
                                                            mode="time"
                                                            display="default"
                                                            onChange={onEndChange}
                                                        />
                                                    ) : (
                                                        <>
                                                            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }}>
                                                                <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                                            </TouchableOpacity>
                                                            {showEndPicker && (
                                                                <DateTimePicker
                                                                    value={endTime}
                                                                    mode="time"
                                                                    display="default"
                                                                    onChange={onEndChange}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                    <TouchableOpacity onPress={saveTime} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ChartBlue, marginVertical: 10, borderRadius: 15 }}>
                                                        <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Save</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.CANCEL_B, marginVertical: 10, borderRadius: 15 }}>
                                                        <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>

                                    <View style={{ height: 100 }} />
                                </View>
                            </>
                        ),
                    },
                ]}
            />
        </>
    );
};

export default FacilityOnBoardingScreen;
