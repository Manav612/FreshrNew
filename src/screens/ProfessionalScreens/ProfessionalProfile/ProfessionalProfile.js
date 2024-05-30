import React, {useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Hair1, barber} from '../../../constants/Icons';
import {Screen_Height, Screen_Width} from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLOR_DARK, COLOR_LIGHT} from '../../../constants/Colors';
import ServicesScreen from '../../../components/SalonDetailScreen/ServicesScreen';
import ReviewScreen from '../../../components/SalonDetailScreen/ReviewScreen';
import GalleryScreen from '../../../components/SalonDetailScreen/GalleryScreen';
import PackageScreen from '../../../components/SalonDetailScreen/PackageScreen';
import {Servicesdata2} from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';

const ProfessionalProfile = ({name}) => {
  const navigation = useNavigation();
  const [showMore, setShowMore] = useState(false);
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [activeTab, setActiveTab] = useState('Edit Profile');
  const refRBSheet = useRef([]);

  const openBottomSheet2 = () => {
    refRBSheet.current[0].open();
  };
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const handleResetPress1 = () => {
    setResetSelected(!resetSelected);
    setApplySelected(false);
  };

  const handleApplyPress2 = () => {
    setApplySelected(!applySelected);
    setResetSelected(false);
  };

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const [selectedScreen, setSelectedScreen] = useState('gallery');
  const [Services, setServices] = useState('View services');

  const renderContent = () => {
    if (selectedScreen === 'gallery') {
      return (
        <View style={styles.content}>
          <GalleryScreen />
        </View>
      );
    } else if (selectedScreen === 'services') {
      const renderitem = ({item}) => (
        <TouchableOpacity
          onPress={openBottomSheet2}
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
          <View style={{flexDirection: 'column', marginLeft: 15, gap: 5}}>
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
                justifyContent: 'space-between',
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{fontSize: 22, fontWeight: '600', color: COLOR.BLACK}}>
                Services
              </Text>
              {/* <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }} onPress={()=>navigation.navigate('Ourpackages Screen')}>See All</Text> */}
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLOR.BLACK_30,
                width: Screen_Width * 0.95,
                marginVertical: 20,
              }}
            />
            <FlatList
              data={Servicesdata2}
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
              <View style={{paddingHorizontal: 15, marginVertical: 10}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                    <View style={{width: 30}} />
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
                      setServices('View Services'),
                        navigation.navigate('ProfessionalViewServicesScreen')
                        
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
                    onPress={() => setServices('Edit Services')}>
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
                    onPress={() => setServices('Delete Services')}>
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
    } else if (selectedScreen === 'reviews') {
      return (
        <View style={styles.content}>
          <ReviewScreen />
        </View>
      );
    }
  };
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
    <ScrollView style={{width: Screen_Width, height: Screen_Height}}>
      <View style={{height: 330}}>
        <ImageBackground
          source={barber}
          style={{
            width: Screen_Width,
            height: Screen_Height * 0.3,
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={30}
              color={COLOR.WHITE}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 20,
              }}>
              <FontAwesome name="share" size={30} color={COLOR.WHITE} />
              <AntDesign name="setting" size={30} color={COLOR.WHITE} />
            </View>
          </View>
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 100,
              borderWidth: 5,
              position: 'absolute',
              top: 170,
              left: 120,
            }}>
            <Image
              source={Hair1}
              style={{width: 140, height: 140, borderRadius: 100}}
            />
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 5,
                bottom: 1,
                borderRadius: 15,
                backgroundColor: COLOR.ORANGECOLOR,
              }}>
              <Text style={{color: COLOR.WHITE, fontSize: 18}}>+</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: COLOR.BLACK, fontSize: 25, fontWeight: 'bold'}}>
          Kathryn Murphy
        </Text>
        <Text style={{color: COLOR.GRAY}}>
          Hair Stylist at{' '}
          <Text style={{fontWeight: 'bold', color: COLOR.BLACK}}>
            Bella Rinova
          </Text>{' '}
          5.0 (25 Reviews)
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          gap: 30,
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            backgroundColor:
              activeTab === 'Edit Profile' ? COLOR.ORANGECOLOR : COLOR.GULABI,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLOR.ORANGECOLOR,
          }}
          onPress={() => {
            setActiveTab('Edit Profile'),
              navigation.navigate('ProfessionalEditProfile Screen');
          }}>
          <Text
            style={{
              color:
                activeTab === 'Edit Profile' ? COLOR.WHITE : COLOR.ORANGECOLOR,
              fontWeight: '600',
            }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            backgroundColor:
              activeTab === 'Manage gallery' ? COLOR.ORANGECOLOR : COLOR.GULABI,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLOR.ORANGECOLOR,
          }}
          onPress={() => {
            setActiveTab('Manage gallery');
          }}>
          <Text
            style={{
              color:
                activeTab === 'Manage gallery'
                  ? COLOR.WHITE
                  : COLOR.ORANGECOLOR,
              fontWeight: '600',
            }}>
            Manage gallery
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row', gap: 5}}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={22}
            color={COLOR.BLACK}
          />
          <Text style={{fontSize: 14, color: COLOR.BLACK}}>Distance</Text>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row', gap: 5}}>
          <Entypo name="network" size={22} color={COLOR.BLACK} />
          <Text style={{fontSize: 14, color: COLOR.BLACK}}>Work as</Text>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row', gap: 5}}>
          <MaterialIcons name="schedule" size={22} color={COLOR.BLACK} />
          <Text style={{fontSize: 14, color: COLOR.BLACK}}>My schedule</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 15, marginVertical: 10}}>
        <View>
          <Text style={{color: COLOR.BLACK, fontSize: 18, fontWeight: 'bold'}}>
            {name}
          </Text>
          <Text style={{fontSize: 15, color: COLOR.BLACK}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            laoreet ex. Nulla facilisi. In eget ex tincidunt, suscipit arcu nec,
            aliquam{' '}
            {showMore && (
              <Text>
                Donec et nunc non felis rutrum semper. Duis eu tellus vel turpis
                varius rhoncus eget nec neque. Aenean ac placerat tortor. Duis
                ultricies, eros nec fermentum iaculis, libero lorem rhoncus
                justo, sed lacinia arcu neque sit amet nisi. Vivamus id purus
                non erat posuere pharetra sed lacinia arcu neque.
              </Text>
            )}
            {!showMore ? (
              <TouchableOpacity
                onPress={() => setShowMore(true)}
                style={{marginTop: 10}}>
                <Text
                  style={{
                    color: COLOR.ORANGECOLOR,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Read more...
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShowMore(false)}>
                <Text
                  style={{
                    color: COLOR.ORANGECOLOR,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Read less...
                </Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.navbar}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor:
                selectedScreen === 'gallery' ? COLOR.ORANGECOLOR : COLOR.GULABI,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLOR.ORANGECOLOR,
            }}
            onPress={() => setSelectedScreen('gallery')}>
            <Text
              style={{
                color:
                  selectedScreen === 'gallery'
                    ? COLOR.WHITE
                    : COLOR.ORANGECOLOR,
                fontWeight: '600',
              }}>
              gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor:
                selectedScreen === 'services'
                  ? COLOR.ORANGECOLOR
                  : COLOR.GULABI,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLOR.ORANGECOLOR,
            }}
            onPress={() => setSelectedScreen('services')}>
            <Text
              style={{
                color:
                  selectedScreen === 'services'
                    ? COLOR.WHITE
                    : COLOR.ORANGECOLOR,
                fontWeight: '600',
              }}>
              services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor:
                selectedScreen === 'reviews' ? COLOR.ORANGECOLOR : COLOR.GULABI,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLOR.ORANGECOLOR,
            }}
            onPress={() => setSelectedScreen('reviews')}>
            <Text
              style={{
                color:
                  selectedScreen === 'reviews'
                    ? COLOR.WHITE
                    : COLOR.ORANGECOLOR,
                fontWeight: '600',
              }}>
              reviews
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderContent()}
      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default ProfessionalProfile;
