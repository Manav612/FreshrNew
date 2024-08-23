import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TexftInput, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConfirmationForCreateFacilitie from '../OnBoardingScreens/ConfirmationForCreateFacilitie/ConfirmationForCreateFacilitie';
import { NavigationScreens } from '../../../constants/Strings';
import { Servicesdata3 } from '../../../components/utils';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import FastImage from 'react-native-fast-image';
import { ClockUserIcon, HomeIcon, HomeIcon2, HouseOrange, InSalonOrange, ShareIcon } from '../../../constants/Icons';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';

const FacilityDetalis = ({ route }) => {
  const { data } = route.params
  console.log('=======        data         ======>', data);
  const galleryImages = data.gallery;
  const coverImage = data.coverImage;
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const coordinates = data?.location?.coordinates;
  const longitude = coordinates ? coordinates[0] : 'N/A';
  const latitude = coordinates ? coordinates[1] : 'N/A';
  const shopTimingArray = Object.keys(data.timing).map((day) => ({
    day,
    ...data.timing[day],
  }));
  const facilityId = data.id
  console.log('=======        data  manage       ======>', data);

  const [isEditableFocused, setIsEditableFocused] = useState(false);
  const [Editable, setEditable] = useState('');
  const [fetchedProfList, setFetchedProfList] = useState([]);
  const [fetchedProfName, setFetchedProfName] = useState();
  const [profEmail, setProfEmail] = useState()
  const [fetchedProfPhone, setFetchedProfPhone] = useState();
  const [ProfId, setProfID] = useState();
  const [isSeatFilled, setIsSeatFilled] = useState(false);
  const [assignedseats, setassignedseat] = useState([])
  const [proflist, setProflist] = useState([])
  const seatCapacity = data?.seatCapacity || [];
  const authToken = useSelector(state => state.AuthReducer);

  useEffect(() => {
    console.log("Asssss", seatCapacity);
    fetchData();
    fetchseatdata()
  }, []);

  const fetchseatdata = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/assignPro/${facilityId}`, config);
      console.log('========   use =============', res.data.facility.seatassign);
      // setFetchedData(res.data.data);
      setassignedseat(res.data.facility.seatassign)
    } catch (error) {
      console.error("Error:", error);
    }

  }
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/professionals`, config);
      console.log('========    Proff   ==========', res.data.professional);


      const emailList = res.data.professional.map((prof) => prof.user.email);
      console.log('======     emails hkb     ===========', emailList);


      setProflist(res.data.professional);
      console.log('======     name hkb     ===========', fetchedProfName);


      setFetchedProfList(emailList);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const [seats, setSeats] = useState(
    Array.from({ length: seatCapacity }, (_, i) => ({ id: i + 1, filled: i < data.seatassign.length, firstName: '', phone: '', email: '', commission: '' }))
  );
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSeatPress = (seat) => {
    console.log("Asdasdas", seat);
    if (seat.filled) {
      setProfEmail(seat.email)
      setFetchedProfPhone(seat.phone)
      setFetchedProfName(seat.firstName)
      setProfID(seat._id)
    }
    setSelectedSeat(seat);
    setModalVisible(true);
    setIsSeatFilled(seat.filled);
  };


  const handleSave = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      };
      const { commission } = selectedSeat;

      const data = JSON.stringify({
        facilityId,
        proId: ProfId,
        split: commission,

      });

      console.log("===========   res data     =============", data);

      const response = await axios.patch(`${BASE_API_URL}/hosts/host/facilities/assignPro/${facilityId}`, data, config);
      console.log('Response:', response.data);
      setSeats(seats.map((seat) => (seat.id === selectedSeat.id ? { ...selectedSeat, filled: true } : seat)));
      setModalVisible(false);
      {
        seats.length === 0 &&
          (
            setProfEmail(),
            setFetchedProfPhone(),
            setFetchedProfName(),
            setProfID()
          )
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderSeat = ({ item, index }) => (

    <View style={styles.seatContainer}>
      <View style={styles.seatHeader}>
        <Text style={styles.seatHeaderText}>{index + 1}</Text>
      </View>
      <TouchableOpacity style={styles.seatBody} onPress={() => handleSeatPress(item)}>
        <MaterialCommunityIcons
          name={item.filled ? 'sofa-single' : 'sofa-single-outline'}
          size={40}
          color={COLOR.ORANGECOLOR}
        />
      </TouchableOpacity>
    </View>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    setFetchedProfList(proflist.filter((email) => email.toLowerCase().includes(text.toLowerCase())));
  };

  const handleEmailSelect = (email, firstName, phone) => {
    setSelectedSeat({ ...selectedSeat, email, firstName, phone });
    setSearchQuery(email);
    setFetchedProfList([]);
  };
  const handleselectprofessional = (data) => {
    handleEmailSelect(data.email, data.firstName, data.phone)
    setProfEmail(data.email)
    setFetchedProfPhone(data.phone)
    setFetchedProfName(data.firstName)
    setProfID(data._id)


  }

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
      height: 50,
      borderRadius: 15,
      paddingHorizontal: 5,
      marginHorizontal: 2,
      marginVertical: 10,
      backgroundColor: COLOR.AuthField,
      elevation: 5,
      shadowColor: COLOR.BLACK,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
      width: Screen_Width * 0.92,
      height: 40,
      position: 'absolute',
      bottom: 10
    },
    buttonText: {
      color: COLOR.WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    },
    HeaderView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seatContainer: {
      height: 100,
      width: 80,
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: COLOR.LIGHTGRAY,
      borderRadius: 15,
    },
    seatHeader: {
      height: 30,
      backgroundColor: COLOR.ORANGECOLOR,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    seatHeaderText: {
      color: COLOR.BLACK,
      fontSize: 18,
      textAlign: 'center',
    },
    seatBody: {
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    HeaderText: { color: COLOR.BLACK, fontSize: 22, fontWeight: '600', textAlign: 'center' },
    HeaderView: {
      marginVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    input: {
      flex: 1,
      alignSelf: 'center',
      fontSize: 16,
      color: COLOR.BLACK,
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: COLOR.WHITE,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input2: {
      height: 40,
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: COLOR.BLACK,
    },
  });


  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.HeaderView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={{ backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <FastImage source={ShareIcon} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilitySchedule)} style={{ backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <FastImage source={ClockUserIcon} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilityProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <AntDesign name="setting" size={28} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage source={HouseOrange} style={{ height: 40, width: 40 }} />
            <Text style={styles.HeaderText}>{data?.name}</Text>
          </View>
          {/* <TouchableOpacity style={{ height: 50, width: 160, backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} onPress={() => navigation.navigate(NavigationScreens.FacilityManageSeatScreen, { data: data })}><Text style={{ size: 20, color: COLOR.WHITE }}>Manage seats</Text></TouchableOpacity> */}
          <TouchableOpacity style={{ height: 30, width: 120, backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} onPress={() => navigation.navigate(NavigationScreens.FacilityOnBoardingScreen)}><Text style={{ fontSize: 14, color: COLOR.WHITE }}>Edit Facility</Text></TouchableOpacity>
        </View>


        {/* Add media */}


        {coverImage && (
          <View
            style={{
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
              overflow: 'hidden',
              borderRadius: 10,
            }}
          >
            <ImageBackground
              source={{ uri: coverImage }}
              style={{
                width: Screen_Width * 0.9,
                height: Screen_Height * 0.15,
                borderRadius: 10
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ padding: 10, backgroundColor: COLOR.BLACK_70, justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.3, height: 40 }}>
                  <Text
                    style={{
                      color: COLOR.WHITE,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    Cover Image
                  </Text>
                </View>
                <View style={{ backgroundColor: COLOR.BLACK_70, justifyContent: 'center', alignItems: 'center', height: 40, flexDirection: 'row', gap: 5, padding: 5 }}>
                  <Feather
                    name='upload'
                    size={20}
                    color={COLOR.WHITE}
                  />
                  <Text style={{ color: COLOR.WHITE }}>Edit images</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: "600" }}>
            Gallery
          </Text> */}

          <FlatList
            data={galleryImages}
            style={{ flex: 1 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 5, marginVertical: 5 }}>

                <Image
                  source={{ uri: item }}
                  style={{
                    width: Screen_Width * 0.28,
                    height: Screen_Height * 0.13,
                    borderRadius: 10
                  }}
                />


              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="sofa-single-outline" size={28} color={COLOR.ORANGECOLOR} />
            <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Available</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* <MaterialCommunityIcons name="sofa-single" size={28} color={COLOR.ORANGECOLOR} /> */}
            <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Seat capacity</Text>

            <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold', borderWidth: 1, padding: 3, borderRadius: 5 }}>
              {data?.seatCapacity}
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="sofa-single" size={28} color={COLOR.ORANGECOLOR} />
            <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Assigned</Text>
          </View>
        </View>
        <View style={{ width: Screen_Width, alignSelf: 'center', height: 'auto', marginBottom: 10 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 15, marginHorizontal: 15, flex: 1 }}
            scrollEnabled={false}
            data={seats.slice(0, seatCapacity)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={4}
            renderItem={renderSeat}
          />

          {selectedSeat && (
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Seat {selectedSeat.id} Details</Text>
                  <View style={{ justifyContent: 'center', height: 40, backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10 }}>
                    <Text style={{ color: COLOR.BLACK }}>Name : {fetchedProfName}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', height: 40, backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10 }}>
                    <Text style={{ color: COLOR.BLACK }}>Phone : {fetchedProfPhone}</Text>
                  </View>
                  <TextInput
                    style={[styles.input2, { color: COLOR.BLACK }]}
                    placeholder="Email"
                    placeholderTextColor={COLOR.GRAY}
                    value={searchQuery}
                    onChangeText={handleSearch}
                  />
                  <FlatList
                    data={proflist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleselectprofessional(item.user)}>
                        <Text
                          style={{
                            padding: 10,
                            backgroundColor: COLOR.LIGHTGRAY,
                            borderBottomColor: COLOR.DARKGRAY,
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.user.email}
                        </Text>
                      </TouchableOpacity>

                    )}
                    style={{ maxHeight: 150, marginBottom: 10 }}
                  />
                  <TextInput
                    style={[styles.input2, { color: COLOR.BLACK }]}
                    placeholder="Commission Split"
                    placeholderTextColor={COLOR.GRAY}
                    value={selectedSeat.commission}
                    onChangeText={(text) => setSelectedSeat({ ...selectedSeat, commission: text })}
                  />
                  <TouchableOpacity
                    onPress={handleSave}
                    style={{
                      width: 255,
                      backgroundColor: COLOR.ORANGECOLOR,
                      height: 40,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>{isSeatFilled ? 'Update' : 'Save'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      width: 255,
                      backgroundColor: COLOR.ORANGECOLOR,
                      height: 40,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

    </>
  )
}

export default FacilityDetalis
