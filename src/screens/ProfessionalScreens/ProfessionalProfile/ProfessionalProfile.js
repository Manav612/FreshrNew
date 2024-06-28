import React, { useEffect, useRef, useState } from 'react';
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
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ClockUserIcon2, ClockUserIcon3, GearFineIcon, Hair1, ShareIcon, ShareIcon2, ShareIcon3, barber } from '../../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import ServicesScreen from '../../../components/SalonDetailScreen/ServicesScreen';
import ReviewScreen from '../../../components/SalonDetailScreen/ReviewScreen';
import GalleryScreen from '../../../components/SalonDetailScreen/GalleryScreen';
import PackageScreen from '../../../components/SalonDetailScreen/PackageScreen';
import { Servicesdata2 } from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image';
import { RemoveOneServiceData, SetServiceData } from '../../../redux/ServicesData/ServicesDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import { NavigationScreens } from '../../../constants/Strings';
import ImagePicker from 'react-native-image-crop-picker';4
import { LinearGradient } from "expo-linear-gradient";


import mime from "mime";

const ProfessionalProfile = ({ name }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [servicesToPass, setServicesToPass] = useState(Servicesdata2);
  const [servicesData, setServicesData] = useState()
  const [activeTab, setActiveTab] = useState('');
  const [activeTab2, setActiveTab2] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [selectedScreen, setSelectedScreen] = useState('gallery');
  const [Services, setServices] = useState('View services');
  const [showFullText, setShowFullText] = useState(false);
  const [user, setUser] = useState(false);
  const [story,setStory] = useState()
  const [ ind,setInd] = useState(0)
  const [flag,setFlag] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stories,setStories] = useState([])
  const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget laoreet ex. Nulla facilisi. In eget ex tincidunt, suscipit arcu nec, aliquam Donec et nunc non felis rutrum semper. Duis eu tellus vel turpis varius rhoncus eget nec neque. Aenean ac placerat tortor. Duis ultricies, eros nec fermentum iaculis, libero lorem rhoncus justo, sed lacinia arcu neque sit amet nisi. Vivamus id purus non erat posuere pharetra sed lacinia arcu neque.';
  const truncatedText = fullText.slice(0, 100) + '...';
  const fetchedData = useSelector(state => state.ServicesDataReducer);
  console.log("=========  fetchedData      ============", fetchedData);
  const refRBSheet = useRef([]);
  useEffect(() => {
    setServicesData()
  }, [])

  
  const fetchstories = async () =>{
    try{

      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }

    }
    const res = await axios.get(`${BASE_API_URL}/professionals/professional/stories`, config);
    console.log("asasss=====",res.data.data);
    setStories(res.data.data.stories)
   
  }
  catch(error){
console.log("sssss",error);
  }
  }
  
  
  useEffect(() => {
    
    fetchstories()
    setServicesData()
    fetchServicesData();
  }, []);

  useEffect(()=>{
    fetchstories()
  },[flag])



  useEffect(() => {
    if (stories.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
      }, 5000);
console.log("sdsddss",currentIndex);
      return () => clearInterval(interval);
    }
  }, [stories]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchServicesData().then(() => setRefreshing(false));
  }, []);



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
      console.log('===============   id ==============', id);
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
  const openBottomSheet2 = (item, index) => {
    refRBSheet.current[0].open();
    setServicesData(item);
    setSelectedServiceId(item.id);
  };


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



  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };



  const renderContent = () => {
    if (selectedScreen === 'gallery') {
      return (
        <View style={styles.content}>
          <GalleryScreen />
        </View>
      );
    } else if (selectedScreen === 'services') {
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
            source={{ uri: item.photo }}
          />
          <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
            <Text
              style={{
                color: COLOR.BLACK,
                fontSize: 16,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              {item.serviceType?.name}
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
                {item?.price}
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
                flexDirection: 'row',
              }}>
              <Text
                style={{ fontSize: 22, fontWeight: '600', color: COLOR.BLACK }}>
                Services
              </Text>
              {/* <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }} onPress={()=>navigation.navigate('Ourpackages Screen')}>See All</Text> */}
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLOR.BLACK_30,
                width: Screen_Width * 0.95,
                marginVertical: 10,
              }}
            />
            <FlatList
              data={fetchedData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderitem}
              style={{ flex: 1 }}
              scrollEnabled={false}
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
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 5,
      bottom: 1,
      borderRadius: 15,
      backgroundColor: COLOR.ORANGECOLOR,
    },
    buttonText: {
      color: COLOR.WHITE,
      fontSize: 18,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: COLOR.WHITE,
      borderRadius: 20,
      width: '70%',
padding:30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const geneateFile = (img, i) => {
    console.log("asdasdasd",img);
    const uri = img;
    const filename = img.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const file = {
      uri,
      name: `image${i}.${ext}`,
      type: mime.getType(uri),
    };
    return file;
  };

  const handleUpload = async () => {
    
    try{
      const formData = new FormData();


      const token = await AsyncStorage.getItem("AuthToken");
      console.log("=============>", token);

    
    formData.append(
      "resource",
      geneateFile(imageUri, 1)
    );
    formData.append(
      "mediaType","IMAGE"
      
    );

    const config = {
      method: "post",
      url: `${BASE_API_URL}/professionals/professional/stories/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData
    };

    const uploadRes = await axios(config)
    .then(()=>{
      setModalVisible(false)
      setImageUri(null)
      setFlag(!flag)
    })
      .catch((e) => {
        console.error(e);
      });
   
      if (uploadRes && uploadRes?.data) {
        console.log("assss",uploadRes);
      }


  }catch (error) {
    console.error("Error:", error);
  }
  }


  const pickImage = async () => {
    let result = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImageModalVisible(false);
      setImageUri(image.path);
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const takePhoto = async () => {
    let result = await 
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImageModalVisible(false);
      setImageUri(image.path);
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height }} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={{ height: 330 }}>
        <ImageBackground
          source={stories?.length == 0 ? barber :{uri:stories[currentIndex].resource}}
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
            <View>
              <AntDesign
                onPress={() => navigation.goBack()}
                name="arrowleft"
                size={30}
                color={COLOR.WHITE}
              />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
              {/* <TouchableOpacity style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Entypo name="direction" size={28} color={COLOR.ChartBlue} />
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => navigation.navigate('ProfessionalSettingScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <AntDesign name="setting" size={28} color={COLOR.BLACK} />
              </TouchableOpacity> */}
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
              style={{ width: 140, height: 140, borderRadius: 100 }}
            />
            <View style={styles.container1}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setImageUri(), setModalVisible(false)}}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                 
                    <TouchableOpacity
                      style={{position:"absolute",right:10,top:10}}
                      onPress={() =>{setImageUri(), setModalVisible(false)}}
                    >
                      <AntDesign name="closecircleo" size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                  
                    {imageUri ?
                    <></>:
                    <View style={{   
                      justifyContent: "space-between",
                      alignItems: 'center',
                      marginTop: 10,
                      paddingHorizontal: 10,}}>
                      <TouchableOpacity style={{backgroundColor: COLOR.ORANGECOLOR,borderRadius: 20,padding: 10,elevation: 2,marginBottom:10}} onPress={pickImage}><Text style={{color:COLOR.WHITE,fontWeight: 'bold',textAlign: 'center'}}>Gallery</Text></TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor: COLOR.ORANGECOLOR,borderRadius: 20,padding: 10,elevation: 2}} onPress={takePhoto}><Text style={{color:COLOR.WHITE,fontWeight: 'bold',textAlign: 'center'}}>Take a Photo</Text></TouchableOpacity>
                   
                    </View>
}
                      { imageUri && 
            <Image source={{ uri: imageUri }}style={{ width: 200, height: 200,marginTop:10 }} />}
                    { imageUri &&      <TouchableOpacity style={{marginTop:10,backgroundColor: COLOR.ORANGECOLOR,borderRadius: 20,padding: 10,elevation: 2}} onPress={()=>handleUpload()}><Text style={{color:COLOR.WHITE,fontWeight: 'bold',textAlign: 'center'}}>Add stories</Text></TouchableOpacity>}
                   
                  </View>
                </View>
              </Modal>
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
        <Text style={{ color: COLOR.BLACK, fontSize: 25, fontWeight: 'bold' }}>
          {user?.firstName}{' '}{user?.lastName}

        </Text>
        <Text style={{ color: COLOR.GRAY }}>
          Hair Stylist at{' '}
          <Text style={{ fontWeight: 'bold', color: COLOR.BLACK }}>
            Bella Rinova
          </Text>{' '}
          5.0 (25 Reviews)
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
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

        <TouchableOpacity
          style={{
            width: Screen_Width * 0.3,
            height: 50,
            backgroundColor:
              activeTab2 === 'Distance' ? COLOR.ORANGECOLOR : COLOR.GULABI,
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLOR.ORANGECOLOR,
          }}
          onPress={() => setActiveTab2('Distance')
          }>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={22}
            color={activeTab2 === 'Distance' ? COLOR.WHITE : COLOR.ORANGECOLOR}
          />
          <Text style={{ fontSize: 14, color: activeTab2 === 'Distance' ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Screen_Width * 0.3,
            height: 50,
            backgroundColor:
              activeTab2 === 'My schedule' ? COLOR.ORANGECOLOR : COLOR.GULABI,
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLOR.ORANGECOLOR,
          }}
          onPress={() => setActiveTab2('My schedule')
          }>
          <FastImage source={activeTab2 === 'My schedule' ? ClockUserIcon3 : ClockUserIcon2} style={{ height: 20, width: 20 }} />
          <Text style={{ fontSize: 14, color: activeTab2 === 'My schedule' ? COLOR.WHITE : COLOR.ORANGECOLOR }}>My schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Screen_Width * 0.3,
            height: 50,
            backgroundColor:
              activeTab2 === 'Share' ? COLOR.ORANGECOLOR : COLOR.GULABI,
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLOR.ORANGECOLOR,
          }}
          onPress={() => setActiveTab2('Share')
          }>
          <FastImage source={activeTab2 === 'Share' ? ShareIcon3 : ShareIcon2} style={{ height: 20, width: 20 }} />

          <Text style={{ fontSize: 14, color: activeTab2 === 'Share' ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>

        <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{showFullText ? fullText : truncatedText}</Text>
        <TouchableOpacity onPress={toggleShowFullText}>
          <Text style={{ color: COLOR.ORANGECOLOR }}>{showFullText ? 'Read Less' : 'Read More'}</Text>
        </TouchableOpacity>

      </View>
      <View>
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
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default ProfessionalProfile;
