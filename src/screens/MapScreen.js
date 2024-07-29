import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { Image } from 'react-native-animatable';
import { Hair1 } from '../constants/Icons';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { Screen_Height, Screen_Width } from '../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MapScreen = () => {
    const [directionModalVisible, setDirectionModalVisibility] = useState(false);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const [isOpen, setIsOpen] = useState(false);
    const [Prof_distance, setProf_distance] = useState('');
    const [Prof_duration, setProf_duration] = useState('');
    const [Client_distance, setClient_distance] = useState('');
    const [Client_duration, setClient_duration] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const services = [
        { name: 'Wings', price: 28.57 },
        { name: 'Wings', price: 28.57 },
        { name: 'Wings', price: 28.57 },
    ];

    const styles = StyleSheet.create(
        {
            Container: {
                flex: 1,
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
                borderColor: '#717273',
                borderRadius: 15,
                marginTop: 15,
                backgroundColor: '#fff',
                shadowOpacity: 0.1,
                shadowOffset: { height: 2 },
                shadowRadius: 2,
            },
            MapContainer: {
                width: '100%',
                aspectRatio: 1 / 1,
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
                fontSize: 13,
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
            infoContainer: {
                alignItems: 'center',
            },
            infoBox: {
                backgroundColor: COLOR.ChartBlue,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                width: Screen_Width * 0.85,
            },
            infoRow: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            },
            infoColumn: {
                width: Screen_Width * 0.41,
                height: 60,
                padding: 10,
            },
            infoColumnYou: {
                backgroundColor: COLOR.ORANGECOLOR,
                borderTopLeftRadius: 10,
            },
            infoColumnClient: {
                backgroundColor: COLOR.ChartBlue,
                borderTopRightRadius: 15,
                width: Screen_Width * 0.44,
            },
            infoText: {
                color: COLOR.WHITE,
                fontSize: 16,
            },
            meetupText: {
                color: COLOR.WHITE,
                fontSize: 20,
                fontWeight: '600',
                marginVertical: 15,
            },
            buttonContainer: {
                justifyContent: 'center',
                alignItems: 'center',
                width: Screen_Width,
                position: 'absolute',
            },
            button: {
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                backgroundColor: COLOR.ChartBlue,
                marginVertical: 5,
                borderRadius: 15,
                flexDirection: 'row',
            },
            buttonText: {
                color: COLOR.WHITE,
                fontWeight: 'bold',
                fontSize: 18,
                marginRight: 10,
            },
            cancelText: {
                color: COLOR.RED,
                fontWeight: 'bold',
                fontSize: 18,
            },

        }
    );

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                barStyle={'dark-content'}
                backgroundColor={'#00000000'}
            />

            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.IdContainer}>
                    <Text style={styles.IdText}>ID : 75fdgdgd4545645dfdfg</Text>
                    <Text style={[styles.UserName, { textAlign: 'right' }]}>
                        22-07-2024
                    </Text>
                </View>

                <View style={styles.InnerContainer}>
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
                            provider="google"
                        />
                        <View
                            style={[
                                styles.BlackContainer,
                                {
                                    height: 35,
                                    position: 'absolute',
                                    borderRadius: 0,
                                    borderBottomRightRadius: 7,
                                    zIndex: 100,
                                },
                            ]}>
                            <Text style={[styles.WhiteText, { fontSize: 10 }]}>3 in Queue</Text>
                        </View>
                        <View
                            style={[
                                styles.BlackContainer,
                                {
                                    height: 35,
                                    position: 'absolute',
                                    borderRadius: 0,
                                    borderBottomLeftRadius: 7,
                                    zIndex: 100,
                                    right: 0,
                                },
                            ]}>
                            <Text style={[styles.WhiteText, { fontSize: 10 }]}>PENDING</Text>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <View style={styles.infoRow}>
                                <View style={[styles.infoColumn, styles.infoColumnYou]}>
                                    <Text style={styles.infoText}>YOU</Text>
                                    <View style={styles.infoRow}>
                                        <AntDesign name="car" size={15} color={COLOR.WHITE} />
                                        <Text style={styles.infoText}>
                                            {/* {parseFloat(Prof_distance).toFixed(2)}km */}
                                            Km
                                        </Text>
                                        <AntDesign name="close" size={20} color={COLOR.WHITE} />
                                        <Entypo name="clock" size={15} color={COLOR.WHITE} />
                                        <Text style={styles.infoText}>
                                            {/* {parseFloat(Prof_duration).toFixed(2)}min */}
                                            Min
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.infoColumn, styles.infoColumnClient]}>
                                    <Text style={styles.infoText}>Client</Text>
                                    <View style={styles.infoRow}>
                                        <AntDesign name="car" size={15} color={COLOR.WHITE} />
                                        <Text style={styles.infoText}>
                                            {/* {parseFloat(Client_distance).toFixed(2)}km */}
                                            Km
                                        </Text>
                                        <AntDesign name="close" size={20} color={COLOR.WHITE} />
                                        <Entypo name="clock" size={15} color={COLOR.WHITE} />
                                        <Text style={styles.infoText}>
                                            {/* {parseFloat(Client_duration).toFixed(2)}min */}
                                            Min
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.meetupText}>
                                You meetup at in atmost{' '}
                                {parseFloat(
                                    Client_duration > Prof_duration
                                        ? Client_duration === 0
                                            ? Client_duration
                                            : Client_duration + 5
                                        : Prof_duration === 0
                                            ? Prof_duration
                                            : Prof_duration + 5,
                                ).toFixed(2)}{' '}
                                min
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            borderWidth: 1,
                            padding: 10,
                            marginTop: 15,
                            borderColor: '#f1f1f1',
                            borderRadius: 10,
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
                                Services ({services.length})
                            </Text>
                            <MaterialIcons
                                name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                color={'#000'}
                                size={25}
                            />
                        </TouchableOpacity>
                        {isOpen && (
                            <View>
                                {services.map((service, index) => (
                                    <View
                                        key={index}
                                        style={{
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
                                        }}>
                                        <Image
                                            style={styles.UserImage}
                                            source={Hair1}
                                            resizeMode="cover"
                                        />
                                        <Text style={styles.UserName}>{service.name}</Text>
                                        <View style={styles.BlackContainer}>
                                            <Text style={styles.WhiteText}>
                                                ${service.price.toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
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

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                        onPress={() => setDirectionModalVisibility(true)}>
                        <FontAwesome5 name="directions" color="#000" size={20} />
                        <Text
                            style={[
                                styles.UserName,
                                {
                                    marginLeft: 7,
                                    textDecorationLine: 'underline',
                                    color: '#000',
                                },
                            ]}>
                            Ahmedabad Nikol Circle
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
                                    backgroundColor: 'rgba(241,148,54,1)',
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
    );
};

export default MapScreen;