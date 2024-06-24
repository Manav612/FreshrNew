import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { Servicesdata2 } from '../../../components/utils';
import { ClockUserIcon, map } from '../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import { NavigationScreens } from '../../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import { RemoveOneServiceData, SetServiceData } from '../../../redux/ServicesData/ServicesDataAction';

const ProfessionalServices = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [servicesData, setServicesData] = useState();
  const [Services, setServices] = useState('View services');
  const fetchedData= useSelector(state=>state.ServicesDataReducer);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
console.log("==========   servicesData   ===========",servicesData);
console.log("==========   F3etch Data   ===========",fetchedData);
  const openBottomSheet2 = (item, index) => {
    refRBSheet.current[0].open();
    setServicesData(item);
    setSelectedServiceId(item.id);
  };

  const refRBSheet = useRef([]);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/professionals/professional/services`, config);
      console.log("=======   fetchhh services  == ========", res.data.data.services);
      dispatch(SetServiceData(res.data.data.services));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteServicesData = async (id) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      console.log('===============   id ==============',id);
      const res = await axios.delete(`${BASE_API_URL}/professionals/professional/services/${id}`, config);
      console.log("=======   ressss == ========", res.data);
      Alert.alert('Service deleted successfully ')
      // Refresh the fetched data after deletion
      dispatch(RemoveOneServiceData(id));
      // fetchServicesData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderContent = () => {
    const RenderItem = ({ item, index }) => (

      <TouchableOpacity
        onPress={() => openBottomSheet2(item, index)}
        style={{
          backgroundColor: COLOR.WHITE,
          marginVertical: 10,
          width: Screen_Width * 0.9,
          elevation: 3,
          shadowColor: COLOR.BLACK,
          height: Screen_Height * 0.14,
          alignItems: 'center',
          paddingHorizontal: 20,
          marginHorizontal: 2,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <Image
          style={{
            width: Screen_Width * 0.22,
            height: Screen_Height * 0.1,
            borderRadius: 10,
          }}
          source={{ uri: item.photo }}
        />
        <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '600',
            }}>
            {item?.serviceType?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK_40,
              fontSize: 14,
              fontWeight: '600',
              paddingRight: 10,
              width: 200
            }}>
            {item.description.length > 40
              ? `${item.description.slice(0, 40)}...`
              : item.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Screen_Width * 0.55,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLOR.ORANGECOLOR,
                fontSize: 16,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              $ {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    );

    
    return (
      <View style={styles.content}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK,marginVertical:10 }}>
            Services
          </Text>
          <View
            style={{
              backgroundColor: COLOR.BLACK_30,
              height: 1,
              width: Screen_Width * 0.9,
              marginVertical: 10,
            }}
          />
          <FlatList
            data={fetchedData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={RenderItem}
            style={{flex:1}}
            // scrollEnabled={false}
          />

          <RBSheet
            ref={ref => (refRBSheet.current[0] = ref)}
            height={Screen_Height * 0.4}
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
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    width: 30,
                    height: 3,
                    backgroundColor: COLOR.BLACK,
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: Screen_Width * 0.9,
                  }}>
                  <View style={{ width: 30 }} />
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 25,
                      color: COLOR.BLACK,
                    }}>
                    Services
                  </Text>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current[0].close()}>
                    <AntDesign
                      name="closecircle"
                      size={24}
                      color={COLOR.BLACK}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLOR.LINECOLOR,
                  width: Screen_Width,
                  height: 2,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              />
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    backgroundColor:
                      Services === 'View Services'
                        ? COLOR.ORANGECOLOR
                        : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    refRBSheet.current[0].close(),
                      setServices('View Services'),
                      navigation.navigate(NavigationScreens.ProfessionalViewInnerServicesScreen, {
                        services: servicesData,
                      });
                  }}>
                  <Text
                    style={{
                      color:
                        Services === 'View Services'
                          ? COLOR.WHITE
                          : COLOR.ORANGECOLOR,
                      fontWeight: '600',
                    }}>
                    View Services
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 50,
                    backgroundColor:
                      Services === 'Edit Services'
                        ? COLOR.ORANGECOLOR
                        : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    refRBSheet.current[0].close(),
                      setServices('Edit Services'),
                      navigation.navigate(NavigationScreens.professionalEditServiceScreen, {
                        services: servicesData,
                      });
                  }}>
                  <Text
                    style={{
                      color:
                        Services === 'Edit Services'
                          ? COLOR.WHITE
                          : COLOR.ORANGECOLOR,
                      fontWeight: '600',
                    }}>
                    Edit Services
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 50,
                    backgroundColor:
                      Services === 'Delete Services'
                        ? COLOR.ORANGECOLOR
                        : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    deleteServicesData(selectedServiceId);
                    setServices('Delete Services');
                    refRBSheet.current[0].close();
                  }}>
                  <Text
                    style={{
                      color:
                        Services === 'Delete Services'
                          ? COLOR.WHITE
                          : COLOR.ORANGECOLOR,
                      fontWeight: '600',
                    }}>
                    Delete Services
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 50,
                    backgroundColor: COLOR.ChartBlue,
                    justifyContent: 'center',
                    borderRadius: 35,
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                  onPress={() => refRBSheet.current[0].close()}>
                  <Text
                    style={{
                      color: COLOR.WHITE,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </RBSheet>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16,
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: COLOR.BLACK,
    },
    image: {
      width: 150,
      height: 150,
    },
  });

  return (
    <View style={{ width: Screen_Width,flex:1,paddingBottom:250, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>Services</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfessionalScheduleScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <FastImage source={ClockUserIcon} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <AntDesign name="setting" size={28} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.profselectserviceScreen)} style={{ backgroundColor: COLOR.ORANGECOLOR, height: 90, borderRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
        <AntDesign name="pluscircleo" size={28} color={COLOR.WHITE} />
        <Text style={{ color: COLOR.WHITE, fontSize: 20 }}>Add services</Text>
      </TouchableOpacity>

      {renderContent()}

    </View>
  );
};

export default ProfessionalServices;
