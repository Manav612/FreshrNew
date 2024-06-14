import React, { useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Media, OnBoard1, OnBoard2, OnBoard3, OnBoard4, Splash, SplashImage } from '../../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import { Screen_Height, Screen_Width } from '../../../../constants/Constants';
import Onboarding from 'react-native-onboarding-swiper';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../../../constants/Colors';
import { NavigationScreens } from '../../../../constants/Strings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Servicesdata3 } from '../../../../components/utils';
import ShopTime from '../../../../components/ShopTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../../Services';
import axios from 'axios';
import mime from 'mime';

const ConfirmationForCreateFacilitie = () => {

    const route = useRoute();
    const { facilityData } = route.params;
    const galleryImages = facilityData.galleryImageUris
    console.log("========== ====");
    console.log('==== facilityData  ======>', facilityData);
    const shopTimingArray = Object.keys(facilityData.timeData).map(day => ({
        day,
        ...facilityData.timeData[day],
    }));

    console.log("======  images ====", galleryImages);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()



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
            height: 50,
            justifyContent: 'center',
            padding: 10,
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
            marginVertical: 20,
            height: 40,
        },
        buttonText: {
            color: COLOR.WHITE,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    let formData = {
        timing: facilityData.timeData,
        name: facilityData.facilityName,
        region: 'abc',
        country: facilityData.country,
        street: facilityData.street,
        city: facilityData.city,
        coords: [facilityData.rState.region.latitude, facilityData.rState.region.longitude],
        address: facilityData.address,
        postcode: facilityData.postalCode,
        description: facilityData.description,
        seatCapacity: "10",
        availableSeats: facilityData.seatCount,
        gallery: galleryImages,
        coverImage: facilityData.coverImageUri

    }

    const handleConfirmData = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            console.log("=============>", token);
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const gallery = formData.gallery.map((data) => {
                return geneateFile(data);
            })
            formData['gallery'] = gallery;
            console.log(formData['gallery'])

            const res = await axios.post(`${BASE_API_URL}/hosts/host/facilities`, formData, config)
            console.log("Response --------------------- data:", res.data);
            if (res.data) {
                navigation.navigate(NavigationScreens.FacilityConnectStripeScreen)

            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const geneateFile = (img) => {
        const uri = img;
        const filename = img.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const ext = match?.[1];
        const file = {
            uri,
            name: `image.${ext}`,
            type: mime.getType(uri)
        };
        return file;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: COLOR.WHITE }}>
            <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Confirm Details</Text>
            </View>
            {/* location */}

            <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
                        <Text style={{ color: COLOR.BLACK }}>1</Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK }}>Location details</Text>
                        <Text style={{ color: COLOR.BLACK }}>Location of your Facility</Text>
                    </View>
                </View>
                {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}

            </View>
            <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                        Longitude: {facilityData?.rState?.region?.longitude}</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>  Latitude: {facilityData?.rState?.region?.latitude}
                    </Text>
                </View>
            </View>


            {/* Address */}
            <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
                        <Text style={{ color: COLOR.BLACK }}>2</Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK }}>Address</Text>
                    </View>
                </View>
                {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}

            </View>


            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <KeyboardAvoidingView style={{ width: Screen_Width * 0.9 }}>
                    <View>
                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Address</Text>
                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Street</Text>
                        <View style={styles.input}>
                            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.street}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Apartment, Suite ( Optional)</Text>
                        <View style={styles.input}>
                            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.apartment}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>City</Text>
                        <View style={styles.input}>
                            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.city}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>State / Province</Text>
                            <View style={styles.input}>
                                <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.state}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Postal code</Text>
                            <View style={styles.input}>
                                <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.postalCode}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Country/Region</Text>
                        <View style={styles.input}>
                            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.country}</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View >

            {/* name of facility */}

            <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
                        <Text style={{ color: COLOR.BLACK }}>3</Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK }}>Facility Name / Description</Text>
                    </View>
                </View>
                {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}

            </View>

            <View style={{ width: Screen_Width * 0.91, marginHorizontal: 2 }} >

                <View>
                    <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Facility Name</Text>
                    <View style={styles.input}>
                        <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.facilityName}</Text>
                    </View>
                </View>

                <View>
                    <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Facility's Description</Text>
                    <View style={styles.input}>
                        <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.description}</Text>
                    </View>
                </View>
                <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
                    <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Selected seats number</Text>

                </View>
                <View style={styles.input}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{facilityData?.seatCount}</Text>
                </View>

            </View>


            {/* Add media */}


            <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
                        <Text style={{ color: COLOR.BLACK }}>4</Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK }}>Add Media</Text>
                    </View>
                </View>
                {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}

            </View>
            {facilityData.coverImageUri && (
                <View style={{ marginHorizontal: 5, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Cover Image</Text>

                    <FastImage source={{ uri: facilityData.coverImageUri }} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />


                </View>
            )}
            <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '600' }}>Gallery</Text>

                <FlatList
                    data={galleryImages}
                    renderItem={({ item }) => (
                        <View style={{ marginHorizontal: 5, marginVertical: 10 }}>

                            <FastImage source={{ uri: item }} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </View>

            {/* Shop timing */}
            <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
                        <Text style={{ color: COLOR.BLACK }}>5</Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR.BLACK }}>Shop Timing</Text>

                    </View>

                </View>
                {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}

            </View>
            {/* <ShopTime /> */}
            <FlatList
                data={shopTimingArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: COLOR.BLACK }}>{item.day}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                                    <Text style={{ color: COLOR.BLACK }}>Start: {item.start}</Text>
                                    <Text style={{ color: COLOR.BLACK }}>End: {item.end}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: COLOR.BLACK,
                                    marginVertical: 5,
                                }} />
                        </>
                    );
                }}
            />


            <TouchableOpacity style={styles.button} onPress={handleConfirmData}>
                <Text style={styles.buttonText}>Confirmation for create facilitie</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default ConfirmationForCreateFacilitie
