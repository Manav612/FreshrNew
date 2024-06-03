import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { ProfessionalProfileData, ProfileData1 } from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';

const ProfessionalProfile2 = () => {

  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

  const [toggleStatus, setToggleStatus] = useState({});
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);

  const handleResetPress1 = () => {
    setResetSelected(!resetSelected);
    setApplySelected(false);
  };

  const handleApplyPress2 = () => {
    setApplySelected(!applySelected);
    setResetSelected(false);
  };

  const refRBSheet = useRef([]);
    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };
    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };


  const toggleBookmark = (id) => {
    setToggleStatus(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ width: 40, backgroundColor: COLOR.ORANGECOLOR, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLOR.WHITE, fontSize: 30 }}>F</Text>
          </View>
          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>Profile</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: COLOR.BLACK_30,
            height: 150,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            marginBottom: 25
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.ORANGECOLOR,
              width: 30,
              height: 30,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 5,
              bottom: 0
            }}
          >
            <MaterialIcons name="edit" size={26} color={COLOR.WHITE} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: COLOR.BLACK, marginVertical: 5 }}>Daniel Austin</Text>
        <Text style={{ fontSize: 18, color: COLOR.GRAY }}>manav@yourdomain.com</Text>
      </View>
      <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10, width: Screen_Width }} />
      <FlatList
        data={ProfessionalProfileData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ width: Screen_Width * 0.90, height: 60, borderRadius: 15, marginVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}
            onPress={() => {
              switch (item.name) {
                case 'Edit Profile':
                  navigation.navigate('ProfessionalEditProfile Screen');
                  break;
                case 'Security':
                  navigation.navigate('ProfessionalSecurity Screen');
                  break;
                case 'Privacy Policy':
                  navigation.navigate('ProfessionalPrivacyPolicy Screen');
                  break;
                case 'Switch to Client':
                  navigation.navigate('Home Tab');
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
        onPress={() => toggleBookmark("dark_mode")} // Pass appropriate ID or identifier here
      >
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          <AntDesign name="eyeo" size={26} color={COLOR.BLACK} />
          <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>Dark Mode</Text>
        </View>
        <TouchableOpacity onPress={() => toggleBookmark("dark_mode")}>
          <FontAwesome
            name={toggleStatus["dark_mode"] ? "toggle-off" : "toggle-on"}
            size={30}
            color={COLOR.BLACK}
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
              backgroundColor:COLOR.BLACK_40,
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
              <TouchableOpacity onPress={() => { handleApplyPress2(); navigation.navigate('Welcome Onboard Screen'); refRBSheet.current[0].close() }} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
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

export default ProfessionalProfile2

const styles = StyleSheet.create({})