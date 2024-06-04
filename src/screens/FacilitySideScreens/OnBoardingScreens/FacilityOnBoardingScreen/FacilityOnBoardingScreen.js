import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Media, OnBoard1, OnBoard2, OnBoard3, OnBoard4, Splash, SplashImage } from '../../../../constants/Icons';
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

const FacilityOnBoardingScreen = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    // const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation()
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [seatCount, setSeatCount] = useState(1);

    const [facilityName, setFacilityName] = useState('');
    const [description, setdescription] = useState('');

    const handleCountPlus = () => {
        setSeatCount(seatCount + 1)
    }
    const handleCountMinus = () => {
        if (seatCount > 1) {
            setSeatCount(seatCount - 1);
        }
    }
    const handleStreetChange = (text) => {
        setStreet(text);
    };
    const handleApartmentChange = (text) => {
        setApartment(text);
    };
    const handleCityChange = (text) => {
        setCity(text);
    };
    const handleStateChange = (text) => {
        setState(text);
    };
    const handlePostalCodeChange = (text) => {
        setPostalCode(text);
    };
    const handleCountryChange = (text) => {
        setCountry(text);
    };
    const handleFacilityNameChange = (text) => {
        setFacilityName(text);
    };
    const handleDescriptionChange = (text) => {
        setdescription(text);
    };


    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 5
        },
        input: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 15,
            elevation: 5,
            shadowColor: COLOR.BLACK,
            marginVertical: 5
        },
        halfInput: {
            backgroundColor: COLOR.AuthField,
            borderRadius: 15,
            elevation: 5,
            shadowColor: COLOR.BLACK,
            marginVertical: 5,
            width: Screen_Width * 0.35
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
    });

    return (
        <>
            <Onboarding
                bottomBarColor={COLOR.ORANGECOLOR}
                onDone={() => navigation.navigate(NavigationScreens.ConfirmationForCreateFacilitieScreen)}
                onSkip={() => navigation.navigate(NavigationScreens.ConfirmationForCreateFacilitieScreen)}

                // onDone={() => navigation.navigate('Home Tab')}
                // onSkip={() => navigation.navigate('Home Tab')}

                containerStyles={{ height: Screen_Height * 0.5, width: Screen_Width, justifyContent: 'flex-start', backgroundColor: COLOR.WHITE }}
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
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: Screen_Width, paddingHorizontal: 15 }}>
                                    <View style={{ width: Screen_Width * 0.6 }}>
                                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Select Location</Text>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 10 }}>Please check that your Facility location is shown on Google Maps.</Text>
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.2, height: 40, borderRadius: 20 }}>
                                        <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>Find By Map</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 50, width: Screen_Width * 0.88, borderRadius: 15, marginHorizontal: 15, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK }} />
                                <TouchableOpacity style={styles.button} >
                                    <Text style={styles.buttonText}>Get Started</Text>
                                </TouchableOpacity>
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
                                    <KeyboardAvoidingView style={{ width: Screen_Width * 0.88, }}>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Add Address</Text>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Street</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Street"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={street}
                                                onChangeText={handleStreetChange}

                                            />
                                        </View>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Apartment, Suite ( Optional)</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="Apartment, Suite"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={apartment}
                                                onChangeText={handleApartmentChange}

                                            />
                                        </View>
                                        <View>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>City</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="City"
                                                placeholderTextColor={COLOR.BLACK}
                                                value={city}
                                                onChangeText={handleCityChange}

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
                                                    onChangeText={handleStateChange}

                                                />
                                            </View>
                                            <View>
                                                <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Postal code</Text>
                                                <TextInput
                                                    style={[styles.halfInput]}
                                                    placeholder="Postal code"
                                                    placeholderTextColor={COLOR.BLACK}
                                                    value={postalCode}
                                                    onChangeText={handlePostalCodeChange}

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
                                                onChangeText={handleCountryChange}

                                            />
                                        </View>
                                        <TouchableOpacity style={styles.button} >
                                            <Text style={styles.buttonText}>Get Started</Text>
                                        </TouchableOpacity>
                                    </KeyboardAvoidingView>
                                </View >
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
                            <>
                                <ScrollView showsVerticalScrollIndicator={false}>


                                    <View style={{ width: Screen_Width * 0.88, marginHorizontal: 15 }} >
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
                                                onChangeText={handleFacilityNameChange}

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
                                                onChangeText={handleDescriptionChange}

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
                                            marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                        }}>

                                            <TouchableOpacity onPress={handleCountMinus}>
                                                <AntDesign name="minuscircle" size={24} color={COLOR.ORANGECOLOR} />
                                            </TouchableOpacity>
                                            <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '700' }}>{seatCount}</Text>
                                            <TouchableOpacity onPress={handleCountPlus}>
                                                <AntDesign name="pluscircle" size={24} color={COLOR.ORANGECOLOR} />
                                            </TouchableOpacity>


                                        </View>
                                        <TouchableOpacity style={styles.button} >
                                            <Text style={styles.buttonText}>Get Started</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ height: Screen_Height * 0.5 }} />
                                </ScrollView>
                            </>
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
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: Screen_Width, paddingHorizontal: 15 }}>
                                    <View />
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.25, height: 40, borderRadius: 20, flexDirection: 'row', gap: 5 }}>
                                        <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>Add Media</Text>
                                        <FastImage source={Media} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={Servicesdata3}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    key={3}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginVertical: 10 }}>
                                                <Image source={item.image} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />
                                            </View>
                                        )
                                    }}
                                />
                                <TouchableOpacity style={styles.button} >
                                    <Text style={styles.buttonText}>Get Started</Text>
                                </TouchableOpacity>


                            </>
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
                                <ShopTime />
                                <TouchableOpacity style={styles.button} >
                                    <Text style={styles.buttonText}>Finish</Text>
                                </TouchableOpacity>
                            </>
                        ),
                    },

                ]}
            />

        </>
    );
};

export default FacilityOnBoardingScreen;