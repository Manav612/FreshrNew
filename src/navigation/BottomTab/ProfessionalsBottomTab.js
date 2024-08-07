// ProfessionalBottomTab.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native'

import TabBar from './TabBar';
import ProfessionalHome from '../../screens/ProfessionalScreens/ProfessionalHome/ProfessionalHome';
import ProfessionalServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalServices';
import { BookingIcon, HomeIcon, InboxIcon, ScissorIcon, UserIcon } from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ProfessionalBooking from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalBooking';
import ProfessionalInbox from '../../screens/ProfessionalScreens/ProfessionalInboxScreen/ProfessionalInbox';
import ProfessionalChatScreen from '../../screens/ProfessionalScreens/ProfessionalInboxScreen/ProfessionalChatScreen';
import ProfessionalCancelbooking from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalCancelbooking';
import ProfessionalCancelled from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalHistory';
import ProfessionalCompleted from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalPending';
import ProfessionalUpcoming from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalOngoing';
import ProfessionalProfile from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalProfile';
import ProfessionalEditprofile from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalEditprofile';
import ProfessionalSecurity from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalSecurity';
import ProfessionalPrivacyPolicy from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalPrivacyPolicy';
import TransactionHistoryScreen from '../../screens/ProfessionalScreens/ProfessionalHome/TranscationHistoryScreen';
import ProfessionalScheduleScreen from '../../components/ProfessionalComponents/ProfessionalScheduleScreen';
import ProfessionalSettingScreen from '../../components/ProfessionalComponents/ProfessionalSettingScreen';
import ProfessionalViewServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalViewInnerServices';
import ProfessionalInnerServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalInnerServices';
import ProfessionalViewInnerServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalViewInnerServices';
import ProfessionalProfile2 from '../../screens/ProfessionalScreens/ProfessionalProfile2/ProfessionalProfile2';
import profselectedDetailservice from '../../screens/ProfessionalScreens/ProfessionalServices/profselectedDetailservice';
import ProfessionalEditService from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalEditService';
// import LiveTrackingProfSide from '../../components/ProfessionalComponents/LiveTrackingProfSide';
// import OrderProcessingScreenProfSide from '../../components/ProfessionalComponents/OrderProcessingScreenProfSide';
// import ProfAddServicesList from '../../screens/ProfessionalScreens/ProfessionalServices/ProfAddCustomServices';
import ProfAddCustomServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfAddCustomServices';
import ProfSelectCategory from '../../screens/ProfessionalScreens/ProfessionalServices/profselectCategory';
import ProfessionalOngoing from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalOngoing';
import ProfessionalHistory from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalHistory';
import ProfessionalPending from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalPending';
import AcceptRejectModal from '../../components/OrderComponents/AcceptReject';
import socketServices from '../../Services/Socket';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { BASE_API_URL } from '../../Services';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalHomeScreen} component={ProfessionalHome} />
            <Stack.Screen name={NavigationScreens.TransactionHistoryScreen} component={TransactionHistoryScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalSettingScreen} component={ProfessionalSettingScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalProfile2Screen} component={ProfessionalProfile2} />

        </Stack.Navigator>
    );
};

const ServicesStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalServicesScreen} component={ProfessionalServices} />
            <Stack.Screen name={NavigationScreens.ProfAddCustomServicesScreen} component={ProfAddCustomServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalSettingScreen} component={ProfessionalSettingScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalInnerServicesScreen} component={ProfessionalInnerServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalViewInnerServicesScreen} component={ProfessionalViewInnerServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalProfile2Screen} component={ProfessionalProfile2} />
            <Stack.Screen name={NavigationScreens.ProfSelectCategoryScreen} component={ProfSelectCategory} />
            <Stack.Screen name={NavigationScreens.profselectedDetailserviceScreen} component={profselectedDetailservice} />
            <Stack.Screen name={NavigationScreens.professionalEditServiceScreen} component={ProfessionalEditService} />



        </Stack.Navigator>
    );
};

const MyBookingStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalBookingScreen} component={ProfessionalBooking} />
            <Stack.Screen name={NavigationScreens.ProfessionalCancelbookingScreen} component={ProfessionalCancelbooking} />
            <Stack.Screen name={NavigationScreens.ProfessionalPendingScreen} component={ProfessionalPending} />
            <Stack.Screen name={NavigationScreens.ProfessionalHistoryScreen} component={ProfessionalHistory} />
            <Stack.Screen name={NavigationScreens.ProfessionalOngoingScreen} component={ProfessionalOngoing} />
            <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalSettingScreen} component={ProfessionalSettingScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalViewServicesScreen} component={ProfessionalViewServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalProfile2Screen} component={ProfessionalProfile2} />
            {/* <Stack.Screen name={NavigationScreens.LiveTrackingProfSideScreen} component={LiveTrackingProfSide} />
            <Stack.Screen name={NavigationScreens.OrderProcessingScreenProfSideScreen} component={OrderProcessingScreenProfSide} />
 */}



        </Stack.Navigator>
    );
};
const InboxStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalInboxScreen} component={ProfessionalInbox} />
            <Stack.Screen name={NavigationScreens.ProfessionalChatScreen} component={ProfessionalChatScreen} />
        </Stack.Navigator>
    );
};
const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalProfileScreen} component={ProfessionalProfile} />
            <Stack.Screen name={NavigationScreens.ProfessionalEditProfileScreen} component={ProfessionalEditprofile} />
            <Stack.Screen name={NavigationScreens.ProfessionalSecurityScreen} component={ProfessionalSecurity} />
            <Stack.Screen name={NavigationScreens.ProfessionalPrivacyPolicyScreen} component={ProfessionalPrivacyPolicy} />
            <Stack.Screen name={NavigationScreens.ProfessionalViewInnerServicesScreen} component={ProfessionalViewInnerServices} />

            <Stack.Screen name={NavigationScreens.professionalEditServiceScreen} component={ProfessionalEditService} />

        </Stack.Navigator>
    );
};

const Screens = [
    {
        name: NavigationScreens.ProfessionalHomeScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Home",
        component: HomeStack,
        icon: HomeIcon,
    },
    {
        name: NavigationScreens.ProfessionalServicesScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Services",
        component: ServicesStack,
        icon: ScissorIcon,
    },
    {
        name: NavigationScreens.ProfessionalBookingScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Bookings",
        component: MyBookingStack,
        icon: BookingIcon,
    },
    {
        name: NavigationScreens.ProfessionalInboxScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Inbox",
        component: InboxStack,
        icon: InboxIcon,
    },
    {
        name: NavigationScreens.ProfessionalProfileScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Profile",
        component: ProfileStack,
        icon: UserIcon,
    },
]

export default ProfessionalBottomTab = ({ route }) => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
    const [orderData, setOrderData] = useState({});
    const refRBSheet = useRef();
    const authToken = useSelector(state => state.AuthReducer);
    const [id, setId] = useState('');
    const [service, setServices] = useState([])
    const openBottomSheet = () => {
        refRBSheet?.current?.open();
    };
    const closeBottomSheet = () => {
        clearTimeout(id);
        refRBSheet?.current?.close();
    };

    const [timeLeft, setTimeLeft] = useState(1 * 60); // 1 minute in seconds

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            setId(timerId);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    const onAccept = async () => {
        const orderId = orderData?.order_id;
        const coordinates = orderData?.coordinates;
        console.log("===================>", orderId, coordinates);
        try {
            // console.log("Order Id : ",coordinates);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            console.log('=================>', `${BASE_API_URL}/professionals/professional/acceptOrder/${orderId}`);
            const res = await axios.put(
                `${BASE_API_URL}/professionals/professional/acceptOrder/${orderId}`,
                {},
                config,
            );
            console.log('===========  milllaaa  ==========', JSON.stringify(res.data.data));
            if (res.status == 200) {
                // console.log('===========  milllaaa ayush bhai bolte guru  ==========',{
                //   recipient: res.data.data.order.client._id,
                //   message: {
                //     paymentKey: res.data.data.order.paymentKey,
                //   },
                // });
                // openBottomSheet()7


                socketServices.emit('order_update', {
                    recipient: res.data.data.order.client.id,
                    message: {
                        type: 'accept_order',
                        paymentKey: res.data.data.order.paymentKey,
                        orderDetails: res.data.data.order.client.id,
                        order_id: orderId,
                        coordinates: coordinates,
                        orderData: res.data.data,
                        services: service
                    },
                });
                setOrderData({});
            }
            // setFetchedData(res.data.facilities.facility);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const PutCancelData = async () => {
        const orderId = orderData?.order_id;
        try {
            // console.log("Order Id : ",orderId);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.put(
                `${BASE_API_URL}/professionals/professional/cancelOrder/${orderId}`,
                {},
                config,
            );
            console.log('===========  cancelllll  ==========', res.data);
            if (res.data.status === 'success') {
                socketServices.emit('order_update', {
                    recipient: res.data.data.order.client.id,
                    message: {
                        type: 'cancle_order',
                        order_id: orderId,
                    },
                });
                Alert.alert('Booking is cancel successfully');
                // fetchData();
            } else {
                Alert.alert(res.data.message);
            }
            // setFetchedData(res.data.facilities.facility);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onReject = () => {
        PutCancelData()
        setOrderData({});
    }


    const styles = StyleSheet.create({
        modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            // backgroundColor: COLOR.ROYALBLUE,

        },
        bottomSheetContainer: {
            paddingHorizontal: 15,
            marginVertical: 10
        },

        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK_40,
        },
        modalContent: {
            width: Screen_Width * 0.8,
            backgroundColor: COLOR.WHITE,
            height: Screen_Height * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        modalTitle: {
            fontSize: 18,
            marginBottom: 10,
            color: COLOR.BLACK
        },
    });
    // console.log("===========            service             =======", service);
    // useEffect(() => {
    //     console.log('Setting up socket listener');
    //     socketServices.on('create_order', data => {
    //         try {
    //             console.log('Received create_order event:', JSON.stringify(data));
    //             setOrderData({
    //                 order_id: data.message.data.order.id,
    //                 coordinates: data.message.data.order.address?.coordinates,
    //                 services: data.message.service
    //             })
    //             setServices(data.message.service)

    //         } catch (error) {
    //             console.error('Error showing modal:', error);
    //         }
    //     });

    //     socketServices.on('payment_Done_close', data => {
    //         console.log('==== payment done      ====================', data.message.id.message);
    //         closeBottomSheet()
    //         try {
    //             navigation.navigate(NavigationScreens.LiveTrackingProfSideScreen, { orderData: data })
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });

    // }, [])

    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                // unmountOnBlur: true,
            }}
                tabBar={(props) => (<TabBar {...props} route={route} />)}
            >
                {
                    Screens.map((screen, i) => {
                        return (
                            <Tab.Screen
                                name={screen.name}
                                component={screen.component}
                                options={{
                                    title: screen.title,
                                    tabBarIcon: screen.icon,
                                }}
                                key={i}
                            />
                        )
                    })
                }
            </Tab.Navigator>
            {/* <AcceptRejectModal
                data={orderData}
                visible={Object.keys(orderData).length > 0}
                setVisibility={setOrderData}
                onAccept={onAccept}
                onReject={onReject}
                services={service}
            />
            <RBSheet
                ref={refRBSheet}
                height={Screen_Height * 0.3}
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

                <View style={styles.bottomSheetContainer}>
                    <View style={{ width: 40, height: 4, borderRadius: 10, alignSelf: 'center', marginVertical: 5, backgroundColor: COLOR.BLACK }} />
                    
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: Screen_Height * 0.25 }}>
                        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 20 }}>Please wait for client's payment</Text>
                        <Text style={{ color: COLOR.BLACK, fontSize: 30, textAlign: 'center' }}>{formatTime(timeLeft)}</Text>
                    </View>


                </View>
            </RBSheet> */}
        </>
    );
}



