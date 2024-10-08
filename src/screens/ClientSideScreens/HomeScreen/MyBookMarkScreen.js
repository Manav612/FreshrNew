import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, Image, RefreshControl, Alert, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from '../../../components/Category';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ComeToYouOrange, ComeToYouWhite, Filter, FilterBlack, HomeIcon2, HouseOrange, InSalonOrange, InSalonWhite, barber } from '../../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileData } from '../../../components/utils';
import { NavigationScreens } from '../../../constants/Strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { screenWidth } from 'react-native-gifted-charts/src/utils';
import StoryModal from '../../../components/Story/Story/StoryModal';
import Tooltip from 'react-native-walkthrough-tooltip';

const MyBookMarkScreen = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('Delivery');
  const [FetchDataOfFav, setFetchDataOfFav] = useState([]);
  const [FetchDataOfFavSalon, setFetchDataOfFavSalon] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const [showTip, setShowTip] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };
  const theme = useSelector(state => state.ThemeReducer);

  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [searchText, setSearchText] = useState('');
  const styles = StyleSheet.create({})
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDataForFav().then(() => setRefreshing(false));
    fetchDataForFavSalon()
  }, []);


  const [selectedStory, setSelectedStory] = useState({});

  useEffect(() => {
    fetchDataForFav()
    fetchDataForFavSalon()
  }, [])

  const fetchDataForFav = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const res = await axios.get(`${BASE_API_URL}/users/favorites/professionals`, config);
      console.log('========    list of fav  ============', JSON.stringify(res.data.data.user[0]));
      setFetchDataOfFav(res.data.data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchDataForFavSalon = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const res = await axios.get(`${BASE_API_URL}/users/favorites/facility`, config);
      console.log('========    list of fav listofslon  ============', res.data.data.user);
      setFetchDataOfFavSalon(res.data.data.user);
      console.log("Asdasd", res.data.data.user.length);
      setFetchDataOfFavSalon(res.data.data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const DeleteDataForFav = async (_id) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      console.log("toerkm", token);
      const res = await axios.delete(`${BASE_API_URL}/users/favorites`, {
        data: { professional: _id }, headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status == 200) {
        Alert.alert("Success", "Professional Deleted from Favorites");
        fetchDataForFav()
      }
      // console.log('========    list of fav  ============', res.data.data.user);
    } catch (error) {
      console.error("Erroxr:", error.message);
    }
  };
  const DeleteDataForFavSalon = async (id) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      console.log("toerkm", token);
      const res = await axios.delete(`${BASE_API_URL}/users/favorites`, {
        data: { facility: id }, headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status == 200) {
        Alert.alert("Success", "facility Deleted from Favorites");
        fetchDataForFavSalon()
      }
      // console.log('========    list of fav  ============', res.data.data.user);
    } catch (error) {
      console.error("Erroxr:", error.message);
    }
  };

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLOR.BLACK} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>Following</Text>
          <Tooltip

            isVisible={showTip}
            content={
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 18, textAlign: 'center', fontWeight: '600', marginVertical: 5 }}>
                  Following
                </Text>

                <Text style={{ color: COLOR.BLACK, fontSize: 14, marginBottom: 5 }}>
                  Follow your favorite professionals and salons to save time. Next time you want to book, just do it directly from your list. Oh, and you can also check out their stories!

                </Text>

              </View>
            }
            placement="bottom"
            onClose={() => setShowTip(false)}

          >
            <Animated.View style={animatedStyle}>
              <AntDesign
                onPress={() => setShowTip(true)}
                name="infocirlce"
                size={15}
                color={COLOR.ChartBlue}
              />
            </Animated.View>
          </Tooltip>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>

          <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 3, backgroundColor: COLOR.WHITE, elevation: 10, shadowColor: COLOR.ChartBlue, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage source={FilterBlack} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={30}
            color={COLOR.BLACK}
          />
        </TouchableOpacity> */}
      </View>
      <View style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginHorizontal: 2, marginBottom: 10, padding: 10, elevation: 3, shadowColor: COLOR.ChartBlue }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Delivery Options</Text>

        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: Screen_Width * 0.4, flexDirection: 'row', gap: 5, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <FastImage source={activeTab === 'Delivery' ? ComeToYouWhite : ComeToYouOrange} resizeMode='contain' style={{ height: 22, width: 22 }} />
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600', fontSize: 14 }}>Comes to you</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: Screen_Width * 0.4, flexDirection: 'row', gap: 10, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <FastImage source={activeTab === 'Salon' ? HomeIcon2 : HouseOrange} style={{ height: 25, width: 25 }} resizeMode='contain' />
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600', fontSize: 14 }}>Meet In Store</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationScreens.ScheduledeliveryScreen)}
        style={{
          height: 40,
          justifyContent: 'space-between',
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: COLOR.BLACK, fontWeight: 'bold' }}>
            Schedule Appointment
          </Text>
          <AntDesign name="calendar" size={24} color={COLOR.ORANGECOLOR} />
        </View>
        <AntDesign name="plus" size={24} color={COLOR.BLACK} />
      </TouchableOpacity>
      {activeTab === 'Delivery' ? (
        <FlatList
          data={FetchDataOfFav}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ flex: 1 }}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.ChartBlue, elevation: 3, marginHorizontal: 3 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(NavigationScreens.ProfessionalInfoScreen, { ProfDetail: item })}
                  style={{
                    paddingHorizontal: 15,
                    marginHorizontal: 5,
                    gap: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {item.stories?.length > 0 ?
                    <TouchableOpacity
                      style={{
                        width: Screen_Width * 0.20,
                        aspectRatio: 1 / 1,
                        borderRadius: 100,
                      }}
                      onPress={() => {
                        let data = {};
                        data['name'] = `${item.professional.user.firstName} ${item.professional.user.lastName}`;
                        data['story'] = item.stories?.length > 0 ? item.stories : [];
                        data['img'] = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
                        setSelectedStory(data);
                      }}
                    >
                      <LinearGradient
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}
                        colors={[COLOR.YELLOW, COLOR.ORANGECOLOR, COLOR.PINK]}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 100,
                          padding: 3,
                        }}>
                        <Image
                          source={barber}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 100,
                          }}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                    :
                    <Image source={barber} style={{
                      width: Screen_Width * 0.20,
                      aspectRatio: 1 / 1,
                      borderRadius: 100,
                    }} />
                  }
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: Screen_Width * 0.6 }}>
                      <View>
                        <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>{item.professional.user?.firstName}{" "}{item.professional?.user?.lastName}</Text>
                        <Text style={{ backgroundColor: COLOR.ORANGECOLOR, fontSize: 15, borderRadius: 10, textAlign: 'center', color: COLOR.WHITE, width: Screen_Width * 0.2, height: 25 }}>{item?.sericeCnt} service</Text>
                      </View>

                      <TouchableOpacity onPress={() => DeleteDataForFav(item.professional._id)}>
                        <View style={{ height: 90, width: 30 }}>
                          <MaterialCommunityIcons
                            name="bookmark"
                            size={25}
                            color={COLOR.ChartBlue2}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, color: COLOR.WHITE }}>
                        <FontAwesome name="star-half-empty" size={20} color={COLOR.ORANGECOLOR} />
                        <Text style={{ marginLeft: 5, color: COLOR.ORANGECOLOR }}>4.8 (3,456)</Text>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.BLACK, borderRadius: 10, color: COLOR.WHITE, width: Screen_Width * 0.2, height: 25 }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{item?.distance}km</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              </View>
            )
          }}
        />
      ) : (
        <FlatList
          data={FetchDataOfFavSalon}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ flex: 1 }}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.ChartBlue, elevation: 3, marginHorizontal: 3 }}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SalonProffListScreen, { FacilityDetail: item })} style={{ paddingHorizontal: 15, marginHorizontal: 5, flexDirection: "row", gap: 10 }}>
                  <Image source={barber} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.12, borderRadius: 10 }} />
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: Screen_Width * 0.6 }}>
                      <View>
                        <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>{item.facility.name}</Text>
                      </View>

                      <TouchableOpacity onPress={() => DeleteDataForFavSalon(item.facility._id)}>
                        <View style={{ height: 90, width: 30 }}>
                          <MaterialCommunityIcons
                            name="bookmark"
                            size={25}
                            color={COLOR.ChartBlue2}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, color: COLOR.WHITE }}>
                        <FontAwesome name="star-half-empty" size={20} color={COLOR.ORANGECOLOR} />
                        <Text style={{ marginLeft: 5, color: COLOR.ORANGECOLOR }}>4.8 (3,456)</Text>
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.BLACK, borderRadius: 10, color: COLOR.WHITE, width: Screen_Width * 0.2, height: 25 }}>

                        <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{item?.distance}km</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              </View>
            )
          }}
        />
      )
      }

      <View style={{ height: 90 }} />

      {
        Object.keys(selectedStory).length > 0 &&
        <StoryModal
          data={selectedStory}
          modalVisible={Object.keys(selectedStory).length > 0}
          setModalVisible={setSelectedStory}
        />
      }
    </ScrollView>
  );
};

export default MyBookMarkScreen;



