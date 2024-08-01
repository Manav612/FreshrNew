import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList, Modal, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { barber, OnBoard1 } from '../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import axios from 'axios';
import { BASE_API_URL } from '../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Pending = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [visible, setVisible] = useState(true)
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

    const [directionModalVisible, setDirectionModalVisibility] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const styles = StyleSheet.create({
        container: {
            height: Screen_Height,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: Screen_Width * 0.9,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        button: {
            width: Screen_Width * 0.32,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',

        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 12
        },
        timerText: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        Container: {
            margin: 20,
            borderRadius: 15,
            backgroundColor: '#fff',
        },
        ContentContainer: {
            padding: 15,
            paddingTop: 60,
        },
        IdContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        IdText: {
            fontSize: 14,
            color: '#000',
            textTransform: 'uppercase',
        },
        IdCopyButton: {
            height: 30,
            aspectRatio: 1 / 1,
            borderWidth: 1,
            borderColor: '#717273',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        InnerContainer: {
            width: '100%',
            padding: 15,
            borderWidth: 1,
            borderColor: COLOR.BLACK,
            borderRadius: 15,
            marginTop: 15,
            backgroundColor: COLOR.WHITE,
            shadowOpacity: 0.1,
            shadowOffset: { height: 2 },
            shadowRadius: 2,
        },
        MapContainer: {
            width: '100%',
            height: Screen_Height * 0.4,
            borderRadius: 10,
            overflow: 'hidden',
            marginVertical: 10,
        },
        DateTimeContainer: {
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#f1f1f1',
        },
        BlackContainer: {
            backgroundColor: 'rgba(241,148,54,1)',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 7,
            alignItems: 'center',
            height: 45,
            shadowOpacity: 0.1,
            shadowOffset: { height: 1 },
            shadowRadius: 1,
        },
        WhiteText: {
            color: COLOR.WHITE,
            fontSize: 9,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        UserDetailsContainer: {
            padding: 7,
            borderRadius: 7,
            marginTop: 7,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#f1f2f3',
            backgroundColor: '#fff',
            shadowOpacity: 0.1,
            shadowOffset: { height: 1 },
            shadowRadius: 1,
            marginBottom: 5,
        },
        UserImage: {
            width: 60,
            height: 60,
            aspectRatio: 1 / 1,
            borderRadius: 7,
        },
        UserName: {
            flex: 1,
            marginLeft: 10,
            color: '#000',
            fontWeight: '600',
        },
        ViewWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000050',
            paddingBottom: '30%',
        },
        ModalContainer: {
            width: '85%',
            borderRadius: 15,
            padding: 30,
            backgroundColor: '#fff',
            elevation: 5,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            alignItems: 'center',
        },
        LabelText: {
            fontSize: 16,
            color: '#000',
            textAlign: 'center',
            fontWeight: '600',
        },
        DescText: {
            fontSize: 14,
            color: '#929292',
            marginTop: 15,
        },
    })

    useEffect(() => {
        // if (!visible) {
        //     setTimeLeft(120); // Reset timer when modal is closed
        //     return;
        // }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 120; // Reset to 2 minutes
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const services = [
        {
            id: 1,
            name: 'Service 1',
            price: '400'
        },
        {
            id: 2,
            name: 'Service 2',
            price: '300'
        },
        {
            id: 3,
            name: 'Service 3',
            price: '600'
        },
    ]



    return (

        <View style={styles.modalContainer}>
            <View style={styles.InnerContainer}>
                <Text style={[styles.modalTitle, { color: COLOR.BLACK, textAlign: 'center' }]}>New Booking Request</Text>
                <Text style={[styles.timerText, { color: COLOR.BLACK, textAlign: 'center' }]}>
                    Time remaining: {formatTime(timeLeft)}
                </Text>
                <View style={styles.IdContainer}>
                    <Text style={styles.IdText}>ID : 3456789098765</Text>
                    <Text style={[styles.UserName, { textAlign: 'right' }]}>
                        1-08-2024
                    </Text>
                </View>
                <View style={styles.MapContainer}>

                    <MapView
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        initialRegion={{
                            latitude: 20.5937,
                            longitude: 78.9629,
                            latitudeDelta: 0.225,
                            longitudeDelta: 0.225,
                        }}
                        provider='google'
                    />

                    <View
                        style={

                            {
                                backgroundColor: COLOR.BLACK,
                                paddingHorizontal: 10,
                                justifyContent: 'center', alignItems: 'center',
                                height: 25,
                                position: 'absolute',
                                borderRadius: 0,
                                borderBottomRightRadius: 7,
                                zIndex: 100,
                            }
                        }>
                        <Text style={styles.WhiteText}>3 in Queue</Text>
                    </View>
                    <View
                        style={

                            {
                                backgroundColor: COLOR.BLACK,
                                justifyContent: 'center', alignItems: 'center',

                                paddingHorizontal: 10,
                                height: 25,
                                position: 'absolute',
                                borderRadius: 0,
                                borderBottomLeftRadius: 7,
                                zIndex: 100,
                                right: 0,
                            }
                        }>
                        <Text style={styles.WhiteText}>PENDING</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginVertical: 10 }}>
                    <View
                        style={{
                            borderWidth: 1,
                            paddingHorizontal: 5,
                            borderColor: COLOR.BLACK,
                            borderRadius: 10,
                            width: isOpen ? Screen_Width * 0.84 : Screen_Width * 0.65,
                        }}>
                        <TouchableOpacity
                            onPress={toggleDropdown}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 5,
                            }}>
                            <Text style={{ color: COLOR.BLACK }}>
                                Services
                            </Text>
                            <MaterialIcons
                                name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                color={'#000'}
                                size={25}
                            />
                        </TouchableOpacity>
                        {isOpen && (
                            <FlatList
                                data={services}
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1 }}
                                scrollEnabled={false}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ paddingHorizontal: 5 }}>
                                            <View
                                                //   onPress={() => handleSelect(item)}
                                                style={{
                                                    backgroundColor: COLOR.WHITE,
                                                    marginVertical: 10,
                                                    // width: Screen_Width * 0.67,
                                                    height: Screen_Height * 0.1,
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    borderRadius: 10,
                                                    flexDirection: 'row',
                                                    borderWidth: 1,
                                                    borderColor: COLOR.LINECOLOR,
                                                    paddingHorizontal: 5,
                                                    gap: 5

                                                }}>
                                                <FastImage
                                                    style={{
                                                        width: Screen_Width * 0.18,
                                                        height: Screen_Height * 0.08,
                                                        borderRadius: 10,

                                                    }}
                                                    // source={{ uri: item?.photo }}
                                                    source={barber}
                                                />

                                                <Text
                                                    style={{
                                                        color: COLOR.BLACK,
                                                        fontSize: 16,
                                                        fontWeight: '600',
                                                        paddingRight: 10,
                                                        width: 90,
                                                    }}
                                                    numberOfLines={1}
                                                >
                                                    {item?.name}
                                                </Text>



                                                <View
                                                    style={{

                                                        justifyContent: 'center',
                                                        padding: 10,

                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        backgroundColor: COLOR.ORANGECOLOR
                                                    }}

                                                >
                                                    <Text
                                                        style={{
                                                            color: COLOR.WHITE,
                                                            fontSize: 16,
                                                            fontWeight: '600',

                                                        }}
                                                        numberOfLines={1}

                                                    >
                                                        ${item?.price}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        )}
                    </View>
                    {isOpen ? null :

                        <View
                            style={{
                                justifyContent: 'center',
                                padding: 5,
                                alignItems: 'center',
                                borderRadius: 5,
                                backgroundColor: COLOR.ORANGECOLOR
                            }}

                        >
                            <Text
                                style={{
                                    color: COLOR.WHITE,
                                    fontSize: 14,
                                    fontWeight: '600',

                                }}
                                numberOfLines={1}

                            >
                                $8000
                            </Text>
                        </View>
                    }
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                    <FontAwesome5 name="user-circle" color={'#000'} size={20} />
                    <Text style={[styles.UserName, { marginLeft: 7 }]}>Elon Musk</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                    <Entypo name="scissors" color={'#000'} size={20} />
                    <Text style={[styles.UserName, { marginLeft: 7 }]}>Jk Jk</Text>
                    <Entypo name="message" color={'#000'} size={24} />
                </View>


            </View>
            <View style={{ height: 100 }} />


            <Modal
                animationType="fade"
                transparent
                visible={directionModalVisible}
                statusBarTranslucent>
                <View style={styles.ViewWrapper}>
                    <View style={styles.ModalContainer}>
                        <Text
                            style={
                                styles.LabelText
                            }>{`Please head to \n designated location`}</Text>
                        <Text style={styles.DescText}>
                            Once arrived please come back here{' '}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                marginTop: 30,
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: COLOR.ORANGECOLOR,
                                    padding: 10,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: COLOR.WHITE,
                                    borderWidth: 1,
                                    shadowOffset: { height: 2 },
                                    shadowRadius: 2,
                                    shadowOpacity: 0.3,
                                }}
                                onPress={() => setDirectionModalVisibility(false)}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: '700',
                                    }}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                            <View style={{ width: 10 }} />
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#000',
                                    padding: 10,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    shadowOffset: { height: 2 },
                                    shadowRadius: 2,
                                    shadowOpacity: 0.3,
                                }}
                                onPress={() => setDirectionModalVisibility(false)}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: '700',
                                    }}>
                                    Direction
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}


export default Pending

const styles = StyleSheet.create({})