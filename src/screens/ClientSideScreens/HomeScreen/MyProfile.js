// // import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
// // import React, { useEffect, useRef, useState } from 'react'
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import Entypo from 'react-native-vector-icons/Entypo';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import { Screen_Height, Screen_Width } from '../../../constants/Constants';
// // import { useNavigation } from '@react-navigation/native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
// // // import { ProfileData1 } from '../../../components/utils';
// // import RBSheet from 'react-native-raw-bottom-sheet';
// // import { NavigationScreens } from '../../../constants/Strings';
// // import { GetAuthToken, StoreThemeMode } from '../../../constants/AsyncStorage';
// // import { SetThemeMode } from '../../../redux/ThemeAction';
// // import axios from 'axios';
// // import { BASE_API_URL } from '../../../Services';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import FastImage from 'react-native-fast-image';
// // import Geolocation from 'react-native-geolocation-service';
// // import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// // import { RemoveAuthToken } from '../../../redux/AuthAction';
// // import { Hair1, OnBoard3, banner1, banner2, banner3, banner4, banner5, barber, barber2, barber3, barber4, call, chartdonut, currency, map, message, share, sp1, sp2, tipjar, vector, vectorh, web } from '../constants/Icons';


// // import Ionicons from 'react-native-vector-icons/Ionicons';

// // const MyProfile = () => {

// //   const navigation = useNavigation();
// //   const theme = useSelector(state => state.ThemeReducer);
// //   const dispatch = useDispatch()
// //   const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
// //   const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
// //   const [selectedThemeMode, setSelectedThemeMode] = useState(theme)
// //   const [toggleStatus, setToggleStatus] = useState({});
// //   const [resetSelected, setResetSelected] = useState(false);
// //   const [applySelected, setApplySelected] = useState(false);
// //   const [user, setUser] = useState('');
// //   const [latitude, setLatitude] = useState(null);
// //   const [longitude, setLongitude] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const ProfileData1 = [
// //     {
// //       id: 1,
// //       icon: (<AntDesign name="user" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Edit Profile',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 2,
// //       icon: (<Ionicons name="notifications-outline" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Notification',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 3,
// //       icon: (<MaterialIcons name="payment" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Payment',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 4,
// //       icon: (<MaterialIcons name="security" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Security',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 5,
// //       icon: (<Ionicons name="lock-closed-outline" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Privacy Policy',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 6,
// //       icon: (<AntDesign name="videocamera" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Tutorial',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 7,
// //       icon: (<AntDesign name="customerservice" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Support',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 8,
// //       icon: (<MaterialIcons name="feedback" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Feedback',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 9,
// //       icon: (<Ionicons name="newspaper" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Terms of Service',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 10,
// //       icon: (<AntDesign name="delete" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: 'Account Deletion',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //     {
// //       id: 11,
// //       icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: user.isProfessional ? 'Switch to Professionals' : 'Become a  Professional',
// //       // name: 'Switch to Professionals',

// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },

// //     {
// //       id: 12,
// //       icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
// //       name: user.isHost ? 'Switch to Host' : 'Become to Host',
// //       // name: 'Switch to Host',
// //       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
// //     },
// //   ];
// //   const handleResetPress1 = () => {
// //     setResetSelected(!resetSelected);
// //     setApplySelected(false);
// //   };

// //   const handleApplyPress2 = async () => {
// //     setApplySelected(!applySelected);
// //     setResetSelected(false);
// //     await AsyncStorage.removeItem("AuthToken");
// //     dispatch(RemoveAuthToken());
// //     navigation.navigate(NavigationScreens.ProceedWithoutScreen)
// //   };


// //   const refRBSheet = useRef([]);
// //   const openBottomSheet = () => {
// //     refRBSheet.current[0].open();
// //   };
// //   const openItemBottomSheet = (index) => {
// //     refRBSheet.current[index + 1].open();
// //   };



// //   useEffect(() => {
// //     console.log("==== theme from storage  =====", theme);
// //   }, [theme])

// //   const toggledarkMode = (theme) => {
// //     setSelectedThemeMode(theme)
// //     StoreThemeMode(theme)
// //     dispatch(SetThemeMode(theme))
// //     console.log("====== theme =", theme);
// //   };

// //   useEffect(() => {
// //     getUserInfo()
// //   }, [])


// //   const getUserInfo = async () => {
// //     try {
// //       const token = await AsyncStorage.getItem("AuthToken");
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       };
// //       const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
// //       console.log('========  user ID   ===========', res.data.data.user)
// //       setUser(res.data.data.user);
// //     } catch (error) {
// //       console.error("Error:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     checkLocationPermission();
// //   }, []);

// //   const checkLocationPermission = async () => {
// //     try {
// //       const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
// //       if (permissionStatus !== RESULTS.GRANTED) {
// //         const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
// //         if (result === RESULTS.GRANTED) {
// //           getLocation();
// //         } else {
// //           setError('Location permission denied');
// //         }
// //       } else {
// //         getLocation();
// //       }
// //     } catch (err) {
// //       setError('Error checking location permission');
// //       console.error(err);
// //     }
// //   };

// //   const getLocation = () => {
// //     Geolocation.getCurrentPosition(
// //       (position) => {
// //         console.log("=-==-=-=--=--=--=-=--=--=-=--=-", position);

// //         const newLatitude = position.coords.latitude;
// //         const newLongitude = position.coords.longitude;
// //         console.log('Coordinates obtained:', { latitude: newLatitude, longitude: newLongitude });
// //         setLatitude(newLatitude);
// //         setLongitude(newLongitude);
// //       },
// //       (error) => {
// //         setError('Error getting location');
// //         console.error("Geolocation error:", error);
// //       },
// //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
// //     );
// //   };


// //   const handleSwitchToProfessionals = async () => {
// //     console.log("-------------------    proffffffffff            ------------------------------");

// //     if (latitude === null || longitude === null) {
// //       setError('Location not available');
// //       console.log('Attempt to switch with no coordinates =======:', { latitude, longitude });
// //       return;
// //     }

// //     console.log('Attempting to switch with coordinates:', { latitude, longitude });

// //     // setIsLoading(true);
// //     // setError(null);

// //     try {
// //       const token = await AsyncStorage.getItem("AuthToken");
// //       console.log("------>", token);

// //       if (!token) {
// //         throw new Error('No auth token found');
// //       }

// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       };

// //       console.log('Sending request with coordinates:', { coords: [latitude, longitude] });

// //       const res = await axios.post(
// //         `${BASE_API_URL}/users/becomeProfessional`,
// //         { coords: [latitude, longitude] },
// //         config
// //       );

// //       console.log("Response data:", res.data);

// //       if (res.data) {
// //         navigation.navigate(NavigationScreens.ProfessionalPrivacyAndPolicyScreen);
// //       }
// //     } catch (error) {
// //       setError('Error switching to professional mode');
// //       console.error("Error during switch:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };



// //   const handleSwitchToHost = async () => {
// //     try {
// //       const token = await AsyncStorage.getItem("AuthToken");
// //       console.log("==========>", token);
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       };

// //       const res = await axios.post(`${BASE_API_URL}/users/becomeHost`, {}, config)
// //       console.log("Response data:", res.data);

// //       if (res.data) {
// //         navigation.navigate(NavigationScreens.FacilityPrivacyAndPolicyScreen);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //     }
// //   };



// //   return (
// //     <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
// //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
// //         <View style={{ flexDirection: 'row', gap: 20 }}>
// //           <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>Profile</Text>
// //         </View>

// //       </View>
// //       <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20, marginVertical: 5 }}>
// //         <View
// //           style={{
// //             backgroundColor: COLOR.BLACK_30,
// //             height: 60,
// //             width: 60,
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             borderRadius: 100,
// //           }}
// //         >
// //         </View>
// //         <View>
// //           <Text style={{ fontWeight: 'bold', fontSize: 25, color: COLOR.BLACK, marginVertical: 5 }}>{user?.firstName}{' '}{user?.lastName}</Text>
// //           <Text style={{ fontSize: 18, color: COLOR.GRAY }}>{user?.email}</Text>
// //         </View>
// //       </View>

// //       <FlatList
// //         data={ProfileData1}
// //         keyExtractor={(item) => item.id.toString()}
// //         showsVerticalScrollIndicator={false}
// //         style={{ flex: 1 }}
// //         scrollEnabled={false}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity style={{ width: Screen_Width * 0.90, height: 60, borderRadius: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}
// //             onPress={() => {
// //               switch (item.name) {
// //                 case 'Edit Profile':
// //                   navigation.navigate(NavigationScreens.EditProfileScreen);
// //                   break;
// //                 case 'Security':
// //                   navigation.navigate(NavigationScreens.SecurityScreen);
// //                   break;
// //                 case 'Privacy Policy':
// //                   navigation.navigate(NavigationScreens.PrivacyPolicyScreen);
// //                   break;
// //                 case 'Switch to Professionals':
// //                   handleSwitchToProfessionals();
// //                   break;
// //                 case 'Become a Professional':
// //                   handleSwitchToProfessionals();
// //                   break;
// //                 case 'Switch to Host':
// //                   handleSwitchToHost();
// //                   break;
// //                 case 'Become to Host':
// //                   handleSwitchToHost();
// //                   break;
// //                 default:
// //                   break;
// //               }
// //             }}
// //           >
// //             <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
// //               <Text>{item.icon}</Text>
// //               <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>{item.name}</Text>
// //             </View>
// //             <Text>{item.icon1}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />
// //       <TouchableOpacity
// //         style={{
// //           width: Screen_Width * 0.90,
// //           height: 60,
// //           borderRadius: 15,
// //           marginVertical: 5,
// //           flexDirection: 'row',
// //           alignItems: 'center',
// //           justifyContent: 'space-between',
// //           paddingHorizontal: 10
// //         }}
// //         onPress={() => toggledarkMode(selectedThemeMode === 1 ? 0 : 1)} // Pass appropriate ID or identifier here
// //       >
// //         <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
// //           <AntDesign name="eyeo" size={26} color={COLOR.ORANGECOLOR} />
// //           <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>Dark Mode</Text>
// //         </View>
// //         <TouchableOpacity onPress={() => toggledarkMode(selectedThemeMode === 1 ? 0 : 1)}>
// //           <FontAwesome
// //             name={selectedThemeMode === 1 ? "toggle-on" : "toggle-off"}
// //             size={30}
// //             color={COLOR.ORANGECOLOR}
// //           />
// //         </TouchableOpacity>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => { handleResetPress1(); openBottomSheet() }} style={{
// //         width: Screen_Width * 0.90,
// //         height: 60,
// //         borderRadius: 15,
// //         marginVertical: 5,
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         gap: 10,
// //         paddingHorizontal: 10
// //       }} >
// //         <Entypo name="log-out" size={26} color={COLOR.PINK} />
// //         <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.PINK }}>Logout</Text>
// //       </TouchableOpacity>
// //       <View style={{}}>
// //         <RBSheet
// //           ref={(ref) => (refRBSheet.current[0] = ref)}

// //           height={Screen_Height * 0.25}
// //           customStyles={{

// //             wrapper: {
// //               backgroundColor: COLOR.BLACK_40,
// //             },
// //             container: {
// //               backgroundColor: COLOR.WHITE,
// //               borderRadius: 40,
// //               borderBottomRightRadius: 0,
// //               borderBottomLeftRadius: 0,
// //               elevation: 10,
// //               shadowColor: COLOR.BLACK,
// //             },
// //             draggableIcon: {
// //               backgroundColor: COLOR.BLACK,
// //             },
// //           }}
// //           customModalProps={{
// //             animationType: 'slide',
// //             statusBarTranslucent: true,
// //           }}
// //           customAvoidingViewProps={{
// //             enabled: false,
// //           }}>
// //           <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
// //             <View style={{ justifyContent: 'center', alignItems: 'center', }}>
// //               <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.CANCEL_B }}>Logout</Text>
// //             </View>
// //             <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 15, paddingHorizontal: 10 }} />
// //             <View style={{ justifyContent: 'center', marginVertical: 15, paddingHorizontal: 30, gap: 10 }}>
// //               <Text style={{ color: COLOR.BLACK, textAlign: 'center', fontSize: 18, fontWeight: '800' }}>Are you sure you want to log out?</Text>
// //             </View>
// //             <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
// //               <TouchableOpacity onPress={() => { handleResetPress1(); refRBSheet.current[0].close() }} style={{ backgroundColor: resetSelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
// //                 <Text style={{ fontSize: 15, fontWeight: '700', color: resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={() => { handleApplyPress2(); refRBSheet.current[0].close() }} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
// //                 <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes,  Logout</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </RBSheet>
// //       </View>
// //       <View style={{ height: 90 }} />
// //     </ScrollView>
// //   )
// // }

// // export default MyProfile

// // const styles = StyleSheet.create({})


// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import FastImage from 'react-native-fast-image';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import { Screen_Height, Screen_Width } from '../../../constants/Constants';
// import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
// import { NavigationScreens } from '../../../constants/Strings';
// import { GetAuthToken, StoreThemeMode } from '../../../constants/AsyncStorage';
// import { SetThemeMode } from '../../../redux/ThemeAction';
// import { RemoveAuthToken } from '../../../redux/AuthAction';
// import { BASE_API_URL } from '../../../Services';

// const MyProfile = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const theme = useSelector(state => state.ThemeReducer);
//   const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
//   const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

//   const [selectedThemeMode, setSelectedThemeMode] = useState(theme);
//   const [user, setUser] = useState({ isProfessional: false, isHost: false });
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const refRBSheet = useRef();

//   useEffect(() => {
//     getUserInfo();
//     checkLocationPermission();
//   }, []);

//   useEffect(() => {
//     console.log('User state changed:', user);
//   }, [user]);

//   console.log('Rendering MyProfile component');

//   const ProfileData1 = [
//     {
//       id: 1,
//       icon: (<AntDesign name="user" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Edit Profile',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 2,
//       icon: (<Ionicons name="notifications-outline" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Notification',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 3,
//       icon: (<MaterialIcons name="payment" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Payment',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 4,
//       icon: (<MaterialIcons name="security" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Security',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 5,
//       icon: (<Ionicons name="lock-closed-outline" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Privacy Policy',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 6,
//       icon: (<AntDesign name="videocamera" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Tutorial',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 7,
//       icon: (<AntDesign name="customerservice" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Support',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 8,
//       icon: (<MaterialIcons name="feedback" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Feedback',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 9,
//       icon: (<Ionicons name="newspaper" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Terms of Service',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 10,
//       icon: (<AntDesign name="delete" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: 'Account Deletion',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 11,
//       icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: user.isProfessional ? 'Switch to Professionals' : 'Become a Professional',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//     {
//       id: 12,
//       icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
//       name: user.isHost ? 'Switch to Host' : 'Become a Host',
//       icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
//     },
//   ];

//   const getUserInfo = async () => {
//     try {
//       const token = await AsyncStorage.getItem("AuthToken");
//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
//       const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
//       setUser(res.data.data.user);
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     }
//   };

//   const checkLocationPermission = async () => {
//     try {
//       const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       if (permissionStatus !== RESULTS.GRANTED) {
//         const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//         if (result === RESULTS.GRANTED) {
//           getLocation();
//         } else {
//           setError('Location permission denied');
//         }
//       } else {
//         getLocation();
//       }
//     } catch (err) {
//       setError('Error checking location permission');
//       console.error(err);
//     }
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//       },
//       (error) => {
//         setError('Error getting location');
//         console.error("Geolocation error:", error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const handleSwitchToProfessionals = async () => {
//     if (!latitude || !longitude) {
//       setError('Location not available');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const token = await AsyncStorage.getItem("AuthToken");
//       if (!token) throw new Error('No auth token found');

//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
//       const res = await axios.post(
//         `${BASE_API_URL}/users/becomeProfessional`,
//         { coords: [latitude, longitude] },
//         config
//       );

//       if (res.data) {
//         navigation.navigate(NavigationScreens.ProfessionalPrivacyAndPolicyScreen);
//       }
//     } catch (error) {
//       setError('Error switching to professional mode');
//       console.error("Error during switch:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSwitchToHost = async () => {
//     try {
//       const token = await AsyncStorage.getItem("AuthToken");
//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
//       const res = await axios.post(`${BASE_API_URL}/users/becomeHost`, {}, config);

//       if (res.data) {
//         navigation.navigate(NavigationScreens.FacilityPrivacyAndPolicyScreen);
//       }
//     } catch (error) {
//       console.error("Error switching to host:", error);
//     }
//   };

//   const toggleDarkMode = (newTheme) => {
//     setSelectedThemeMode(newTheme);
//     StoreThemeMode(newTheme);
//     dispatch(SetThemeMode(newTheme));
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("AuthToken");
//     dispatch(RemoveAuthToken());
//     navigation.navigate(NavigationScreens.ProceedWithoutScreen);
//   };

//   const renderProfileItem = ({ item }) => (
//     <TouchableOpacity
//       // key={`profile-item-${item.id}`}
//       style={styles.profileItem}
//       onPress={() => {
//         switch (item.name) {
//           case 'Edit Profile':
//             navigation.navigate(NavigationScreens.EditProfileScreen);
//             break;
//           case 'Security':
//             navigation.navigate(NavigationScreens.SecurityScreen);
//             break;
//           case 'Privacy Policy':
//             navigation.navigate(NavigationScreens.PrivacyPolicyScreen);
//             break;
//           case 'Switch to Professionals':
//             handleSwitchToProfessionals();
// break;
//           case 'Become a Professional':
//             handleSwitchToProfessionals();
//             break;
//           case 'Switch to Host':
//              handleSwitchToHost();
//             break;
//           case 'Become a Host':
//             handleSwitchToHost();
//             break;
//         }
//       }}
//     >
//       <View style={styles.profileItemLeft}>
//         {item.icon}
//         <Text style={styles.profileItemText}>{item.name}</Text>
//       </View>
//       {item.icon1}
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Profile</Text>
//       </View>

//       <View style={styles.userInfo}>
//         <View style={styles.avatar} />
//         <View>
//           <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
//           <Text style={styles.userEmail}>{user?.email}</Text>
//         </View>
//       </View>

//       <FlatList
//         data={ProfileData1}
//         // keyExtractor={item => `profile-item-${item.id}`}
//         renderItem={renderProfileItem}
//         scrollEnabled={false}
//       />

//       <TouchableOpacity
//         style={styles.darkModeToggle}
//         onPress={() => toggleDarkMode(selectedThemeMode === 1 ? 0 : 1)}
//       >
//         <View style={styles.darkModeLeft}>
//           <AntDesign name="eyeo" size={26} color={COLOR.ORANGECOLOR} />
//           <Text style={styles.darkModeText}>Dark Mode</Text>
//         </View>
//         <FontAwesome
//           name={selectedThemeMode === 1 ? "toggle-on" : "toggle-off"}
//           size={30}
//           color={COLOR.ORANGECOLOR}
//         />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutButton} onPress={() => refRBSheet.current.open()}>
//         <Entypo name="log-out" size={26} color={COLOR.PINK} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>

//       <RBSheet
//         ref={refRBSheet}
//         height={Screen_Height * 0.25}
//         customStyles={{
//           wrapper: { backgroundColor: COLOR.BLACK_40 },
//           container: {
//             backgroundColor: COLOR.WHITE,
//             borderTopLeftRadius: 40,
//             borderTopRightRadius: 40,
//           },
//           draggableIcon: { backgroundColor: COLOR.BLACK },
//         }}
//       >
//         <View style={styles.logoutSheet}>
//           <Text style={styles.logoutSheetTitle}>Logout</Text>
//           <View style={styles.logoutSheetDivider} />
//           <Text style={styles.logoutSheetMessage}>Are you sure you want to log out?</Text>
//           <View style={styles.logoutSheetButtons}>
//             <TouchableOpacity
//               style={[styles.logoutSheetButton, styles.cancelButton]}
//               onPress={() => refRBSheet.current.close()}
//             >
//               <Text style={styles.logoutSheetButtonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.logoutSheetButton, styles.confirmButton]}
//               onPress={handleLogout}
//             >
//               <Text style={styles.logoutSheetButtonText}>Yes, Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </RBSheet>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//     backgroundColor: COLOR_LIGHT.WHITE,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   headerText: {
//     fontWeight: '800',
//     fontSize: 25,
//     color: COLOR_LIGHT.BLACK,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 20,
//     marginVertical: 5,
//   },
//   avatar: {
//     backgroundColor: COLOR_LIGHT.BLACK_30,
//     height: 60,
//     width: 60,
//     borderRadius: 30,
//   },
//   userName: {
//     fontWeight: 'bold',
//     fontSize: 25,
//     color: COLOR_LIGHT.BLACK,
//     marginVertical: 5,
//   },
//   userEmail: {
//     fontSize: 18,
//     color: COLOR_LIGHT.GRAY,
//   },
//   profileItem: {
//     width: '100%',
//     height: 60,
//     borderRadius: 15,
//     marginVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//   },
//   profileItemLeft: {
//     flexDirection: 'row',
//     gap: 15,
//     alignItems: 'center',
//   },
//   profileItemText: {
//     fontWeight: '800',
//     fontSize: 18,
//     color: COLOR_LIGHT.BLACK,
//   },
//   darkModeToggle: {
//     width: '100%',
//     height: 60,
//     borderRadius: 15,
//     marginVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   darkModeLeft: {
//     flexDirection: 'row',
//     gap: 15,
//     alignItems: 'center',
//   },
//   darkModeText: {
//     fontWeight: '800',
//     fontSize: 18,
//     color: COLOR_LIGHT.BLACK,
//   },
//   logoutButton: {
//     width: '100%',
//     height: 60,
//     borderRadius: 15,
//     marginVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     paddingHorizontal: 10,
//   },
//   logoutText: {
//     fontWeight: '800',
//     fontSize: 18,
//     color: COLOR_LIGHT.PINK,
//   },
//   logoutSheet: {
//     padding: 15,
//   },
//   logoutSheetTitle: {
//     fontWeight: '600',
//     fontSize: 25,
//     color: COLOR_LIGHT.CANCEL_B,
//     textAlign: 'center',
//   },
//   logoutSheetDivider: {
//     backgroundColor: COLOR_LIGHT.LINECOLOR,
//     height: 2,
//     marginVertical: 15,
//   },
//   logoutSheetMessage: {
//     color: COLOR_LIGHT.BLACK,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 20,
//   },
//   logoutSheetButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   logoutSheetButton: {
//     height: 50,
//     borderRadius: 30,
//     width: '48%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cancelButton: {
//     backgroundColor: COLOR_LIGHT.GULABI,
//   },
//   confirmButton: {
//     backgroundColor: COLOR_LIGHT.ORANGECOLOR,
//   },
//   logoutSheetButtonText: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: COLOR_LIGHT.WHITE,
//   },
// });

// export default MyProfile;


import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
// import { ProfileData1 } from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import { NavigationScreens } from '../../../constants/Strings';
import { GetAuthToken, StoreThemeMode } from '../../../constants/AsyncStorage';
import { SetThemeMode } from '../../../redux/ThemeAction';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { RemoveAuthToken } from '../../../redux/AuthAction';
import { Hair1, OnBoard3, banner1, banner2, banner3, banner4, banner5, barber, barber2, barber3, barber4, call, chartdonut, currency, map, message, share, sp1, sp2, tipjar, vector, vectorh, web } from '../constants/Icons';


import Ionicons from 'react-native-vector-icons/Ionicons';

const MyProfile = () => {

  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const dispatch = useDispatch()
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedThemeMode, setSelectedThemeMode] = useState(theme)
  const [toggleStatus, setToggleStatus] = useState({});
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const [user, setUser] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ProfileData1 = [
    {
      id: 1,
      icon: (<MaterialIcons name="feedback" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Feedback',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 2,
      icon: (<AntDesign name="user" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Edit Profile',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },

    {
      id: 3,
      icon: (<MaterialIcons name="payment" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Payment',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 4,
      icon: (<MaterialIcons name="security" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Security',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 5,
      icon: (<AntDesign name="videocamera" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Tutorial',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 6,
      icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
      name: user.isProfessional ? 'Switch to Professionals' : 'Become a  Professional',
      // name: 'Switch to Professionals',

      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },

    {
      id: 7,
      icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
      name: user.isHost ? 'Switch to Host' : 'Become to Host',
      // name: 'Switch to Host',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 8,
      icon: (<Ionicons name="lock-closed-outline" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Privacy Policy',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },


    {
      id: 9,
      icon: (<Ionicons name="newspaper" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Terms of Service',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },

    {
      id: 10,
      icon: (<AntDesign name="customerservice" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Support',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 11,
      icon: (<AntDesign name="delete" size={30} color='rgba(251, 148, 0, 1)' />),
      name: 'Account Deletion',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },

  ];
  const handleResetPress1 = () => {
    setResetSelected(!resetSelected);
    setApplySelected(false);
  };

  const handleApplyPress2 = async () => {
    setApplySelected(!applySelected);
    setResetSelected(false);
    await AsyncStorage.removeItem("AuthToken");
    dispatch(RemoveAuthToken());
    navigation.navigate(NavigationScreens.ProceedWithoutScreen)
  };


  const refRBSheet = useRef([]);
  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };
  const openItemBottomSheet = (index) => {
    refRBSheet.current[index + 1].open();
  };



  useEffect(() => {
    console.log("==== theme from storage  =====", theme);
  }, [theme])

  const toggledarkMode = (theme) => {
    setSelectedThemeMode(theme)
    StoreThemeMode(theme)
    dispatch(SetThemeMode(theme))
    console.log("====== theme =", theme);
  };

  useEffect(() => {
    getUserInfo()
  }, [])


  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
      console.log('========  user ID   ===========', res.data.data.user)
      setUser(res.data.data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionStatus !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          getLocation();
        } else {
          setError('Location permission denied');
        }
      } else {
        getLocation();
      }
    } catch (err) {
      setError('Error checking location permission');
      console.error(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const newLatitude = position.coords.latitude;
        const newLongitude = position.coords.longitude;
        console.log('Coordinates obtained:', { latitude: newLatitude, longitude: newLongitude });
        setLatitude(newLatitude);
        setLongitude(newLongitude);
      },
      (error) => {
        setError('Error getting location');
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  const handleSwitchToProfessionals = async () => {
    if (latitude === null || longitude === null) {
      setError('Location not available');
      console.log('Attempt to switch with no coordinates =======:', { latitude, longitude });
      return;
    }

    console.log('Attempting to switch with coordinates:', { latitude, longitude });

    setIsLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("AuthToken");
      if (!token) {
        throw new Error('No auth token found');
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      console.log('Sending request with coordinates:', { coords: [latitude, longitude] });

      const res = await axios.post(
        `${BASE_API_URL}/users/becomeProfessional`,
        { coords: [latitude, longitude] },
        config
      );

      console.log("Response data:", res.data);

      if (res.data) {
        navigation.navigate(NavigationScreens.ProfessionalPrivacyAndPolicyScreen);
      }
    } catch (error) {
      setError('Error switching to professional mode');
      console.error("Error during switch:", error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleSwitchToHost = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      console.log("==========>", token);
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.post(`${BASE_API_URL}/users/becomeHost`, {}, config)
      console.log("Response data:", res.data);

      if (res.data) {
        navigation.navigate(NavigationScreens.FacilityPrivacyAndPolicyScreen);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>Profile</Text>
        </View>
        <TouchableOpacity
          style={{

            height: 60,
            borderRadius: 15,
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            gap: 10
          }}
          onPress={() => toggledarkMode(selectedThemeMode === 1 ? 0 : 1)} // Pass appropriate ID or identifier here
        >


          <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>Dark Mode</Text>

          <TouchableOpacity onPress={() => toggledarkMode(selectedThemeMode === 1 ? 0 : 1)}>
            <FontAwesome
              name={selectedThemeMode === 1 ? "toggle-on" : "toggle-off"}
              size={30}
              color={COLOR.ORANGECOLOR}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ClientSettingScreen)}>
          <AntDesign name="setting" size={28} color={COLOR.BLACK} />
        </TouchableOpacity> */}
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20, marginVertical: 5 }}>
        <View
          style={{
            backgroundColor: COLOR.BLACK_30,
            height: 60,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}
        >
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: COLOR.BLACK, marginVertical: 5 }}>{user?.firstName}{' '}{user?.lastName}</Text>
          <Text style={{ fontSize: 18, color: COLOR.GRAY }}>{user?.email}</Text>
        </View>
      </View>
      {/* <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10, width: Screen_Width }} /> */}
      <FlatList
        data={ProfileData1}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ width: Screen_Width * 0.90, height: 60, borderRadius: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}
            onPress={() => {
              switch (item.name) {
                case 'Edit Profile':
                  navigation.navigate(NavigationScreens.EditProfileScreen);
                  break;
                case 'Security':
                  navigation.navigate(NavigationScreens.SecurityScreen);
                  break;
                case 'Privacy Policy':
                  navigation.navigate(NavigationScreens.PrivacyPolicyScreen);
                  break;
                case 'Switch to Professionals':
                  handleSwitchToProfessionals();
                  break;
                case 'Become a Professional':
                  handleSwitchToProfessionals();
                  break;
                case 'Switch to Host':
                  handleSwitchToHost();
                  break;
                case 'Become to Host':
                  handleSwitchToHost();
                  break;
                default:
                  break;
              }
            }}
          >
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <Text>{item.icon}</Text>
              <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>{item.name}</Text>
            </View>
            <Text>{item.icon1}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => { handleResetPress1(); openBottomSheet() }} style={{
        width: Screen_Width * 0.90,
        height: 60,
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10
      }} >
        <Entypo name="log-out" size={26} color={COLOR.PINK} />
        <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.PINK }}>Logout</Text>
      </TouchableOpacity>
      <View style={{}}>
        <RBSheet
          ref={(ref) => (refRBSheet.current[0] = ref)}

          height={Screen_Height * 0.25}
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
          <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.CANCEL_B }}>Logout</Text>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 15, paddingHorizontal: 10 }} />
            <View style={{ justifyContent: 'center', marginVertical: 15, paddingHorizontal: 30, gap: 10 }}>
              <Text style={{ color: COLOR.BLACK, textAlign: 'center', fontSize: 18, fontWeight: '800' }}>Are you sure you want to log out?</Text>
            </View>
            <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
              <TouchableOpacity onPress={() => { handleResetPress1(); refRBSheet.current[0].close() }} style={{ backgroundColor: resetSelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handleApplyPress2(); refRBSheet.current[0].close() }} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes,  Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
      <View style={{ height: 90 }} />
    </ScrollView>
  )
}

export default MyProfile

const styles = StyleSheet.create({})


