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
// import { FacilityProfileData, ProfessionalProfileData, ProfileData1 } from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import { NavigationScreens } from '../../../constants/Strings';
import { GetAuthToken, StoreThemeMode } from '../../../constants/AsyncStorage';
import { SetThemeMode } from '../../../redux/ThemeAction';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { RemoveAuthToken } from '../../../redux/AuthAction';
import { navigationToReset } from '../../../constants/NavigationController';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FacilityProfile2 = () => {

  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const dispatch = useDispatch()
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedThemeMode, setSelectedThemeMode] = useState(theme)
  const [toggleStatus, setToggleStatus] = useState({});
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const [user, setUser] = useState(false);

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

  // const FacilityProfileData = [
  //   {
  //     id: 1,
  //     icon: (<AntDesign name="user" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Edit Profile',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 2,
  //     icon: (<Ionicons name="notifications-outline" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Notification',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 3,
  //     icon: (<MaterialIcons name="payment" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Payment',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 4,
  //     icon: (<MaterialIcons name="security" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Security',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 5,
  //     icon: (<Ionicons name="lock-closed-outline" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Privacy Policy',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 6,
  //     icon: (<AntDesign name="videocamera" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Tutorial',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 7,
  //     icon: (<AntDesign name="customerservice" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Support',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 8,
  //     icon: (<MaterialIcons name="feedback" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Feedback',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 9,
  //     icon: (<Ionicons name="newspaper" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Terms of Service',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 10,
  //     icon: (<AntDesign name="delete" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Account Deletion',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 11,
  //     icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: 'Switch to Client',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  //   {
  //     id: 12,
  //     icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
  //     name: user.isProfessional ? 'Switch to Professionals' : 'Become a Professional',
  //     icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
  //   },
  // ];
  const FacilityProfileData = [
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
      name: 'Switch to Client',
      icon1: (<AntDesign name="right" size={30} color='rgba(251, 148, 0, 1)' />),
    },
    {
      id: 7,
      icon: (<AntDesign name="swap" size={30} color='rgba(251, 148, 0, 1)' />),
      name: user.isProfessional ? 'Switch to Professionals' : 'Become a Professional',
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
      console.log('========  user ID   ==========', res.data.data.user)
      setUser(res.data.data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleSwitchToProfessionals = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      console.log("==========>", token);
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.post(`${BASE_API_URL}/users/becomeProfessional`, {}, config)
      console.log("Response data:", res.data);

      if (res.data) {
        navigation.navigate(NavigationScreens.HomeTab);
      }
    } catch (error) {
      console.error("Error:", error);
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
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>Profile</Text>
        </View>
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
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.ORANGECOLOR,
              width: 15,
              height: 15,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 5,
              bottom: 0
            }}
          >
            <MaterialIcons name="edit" size={10} color={COLOR.WHITE} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: COLOR.BLACK, marginVertical: 5 }}>{user?.firstName}{' '}{user?.lastName}</Text>
          <Text style={{ fontSize: 18, color: COLOR.GRAY }}>{user?.email}</Text>
        </View>
      </View>
      {/* <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10, width: Screen_Width }} /> */}
      <FlatList
        data={FacilityProfileData}
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
                case 'Switch to Client':
                  navigationToReset(navigation, NavigationScreens.HomeTab);
                  break;
                case 'Switch to Professionals':
                  navigationToReset(navigation, NavigationScreens.ProfessionalPrivacyAndPolicyScreen);

                  break;
                case 'Become a Professional':
                  navigationToReset(navigation, NavigationScreens.ProfessionalPrivacyAndPolicyScreen);

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
      <TouchableOpacity
        style={{
          width: Screen_Width * 0.90,
          height: 60,
          borderRadius: 15,
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10
        }}
        onPress={() => toggledarkMode(selectedThemeMode === 1 ? 0 : 1)} // Pass appropriate ID or identifier here
      >
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          <AntDesign name="eyeo" size={26} color={COLOR.ORANGECOLOR} />
          <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>Dark Mode</Text>
        </View>
        <TouchableOpacity onPress={() => toggledarkMode(selectedThemeMode === 1 ? 0 : 1)}>
          <FontAwesome
            name={selectedThemeMode === 1 ? "toggle-on" : "toggle-off"}
            size={30}
            color={COLOR.ORANGECOLOR}
          />
        </TouchableOpacity>
      </TouchableOpacity>
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
              <TouchableOpacity onPress={() => { handleApplyPress2(); refRBSheet.current[0].close() }} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes,Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
      <View style={{ height: 90 }} />
    </ScrollView>
  )
}

export default FacilityProfile2

const styles = StyleSheet.create({})

