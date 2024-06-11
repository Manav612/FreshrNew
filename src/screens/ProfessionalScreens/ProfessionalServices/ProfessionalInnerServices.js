import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { Servicesdata, Servicesdata2 } from '../../../components/utils';
import { ClockUserIcon } from '../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';

const ProfessionalInnerServices = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();
  const [servicesData, setServicesData] = useState()
const [servicesToPass, setServicesToPass] = useState(Servicesdata2);
const [Services, setServices] = useState('View services');

  const openBottomSheet2 = (item, index) => {
    refRBSheet.current[0].open();
    setServicesData(item)
  };
  const refRBSheet = useRef([]);

  const renderContent = () => {
      const renderitem = ({ item, index }) => (
        <TouchableOpacity
          onPress={() => openBottomSheet2(item, index)}
          style={{
            backgroundColor: COLOR.WHITE,
            marginTop: 10,
            width: Screen_Width * 0.92,
            height: Screen_Height * 0.14,
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: Screen_Width * 0.22,
              height: Screen_Height * 0.1,
              borderRadius: 10,
            }}
            source={item.image}
          />
          <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
            <Text
              style={{
                color: COLOR.BLACK,
                fontSize: 16,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: COLOR.BLACK_40,
                fontSize: 14,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              {item.type}
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
                {item.price}
              </Text>
              {/* <TouchableOpacity style={{  height:50, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center' }} onPress={()=>navigation.navigate('Edit ProfileAppointment Screen')}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: COLOR.WHITE }}>Edit Profile Now</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>
      );
      return (
        <View style={styles.content}>
          <View>
            <View
              style={{
                justifyContent:'flex-start',alignItems:'center',gap:20,
                flexDirection: 'row',marginVertical:10
              }}>
                 <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              color={COLOR.BLACK}
            />
         
              <Text
                style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK }}>
                Services
              </Text>
              {/* <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }} onPress={()=>navigation.navigate('Ourpackages Screen')}>See All</Text> */}
            </View>
           
            <FlatList
              data={servicesToPass}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderitem}
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
                        navigation.navigate('ProfessionalViewInnerServicesScreen', {
                          services: servicesData,
                        })
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
                    onPress={() => { setServices('Edit Services'), refRBSheet.current[0].close() }}>
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
                    onPress={() => { setServices('Delete Services'), refRBSheet.current[0].close() }}>
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
    }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16,
    },

    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
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
    <ScrollView  style={{ width: Screen_Width, height: Screen_Height,backgroundColor:COLOR.WHITE }}>
   
      {renderContent()}
      <View style={{height:100}}/>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('BookAppointment Screen')} style={{ width: Screen_Width * 0.80, height: Screen_Height * 0.05, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center',marginTop:5}}>
        <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE }}>Book Now</Text>
      </TouchableOpacity> */}
    </ScrollView>
  )
}

export default ProfessionalInnerServices
