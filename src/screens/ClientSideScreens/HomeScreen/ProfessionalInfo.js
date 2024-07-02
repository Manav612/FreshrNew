import React, { useRef, useState, useEffect } from 'react';
import { Button, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import AboutUsScreen from '../../../components/SalonDetailScreen/AboutUsScreen';
import GalleryScreen from '../../../components/SalonDetailScreen/GalleryScreen';
import ReviewScreen from '../../../components/SalonDetailScreen/ReviewScreen';
import ServicesScreen from '../../../components/SalonDetailScreen/ServicesScreen';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { AllCategoryData, barberData } from '../../../components/utils';
import { barber, barber2, share } from '../../../constants/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import RBSheet from 'react-native-raw-bottom-sheet';
import ProfessionalAboutUsScreen from '../../../components/ProfessionalSalonDetailScreen/ProfessionalAboutUsScreen';
import ProfessionalGalleryScreen from '../../../components/ProfessionalSalonDetailScreen/ProfessionalGalleryScreen';
import ProfessionalReviewScreen from '../../../components/ProfessionalSalonDetailScreen/ProfessionalReviewScreen';
import { NavigationScreens } from '../../../constants/Strings';
import Category from '../../../components/Category';
import OrderRequest from '../../../components/ProfessionalComponents/OrderRequest';

const ProfessionalInfo = ({ route }) => {
    const { ProfessionalData, ProfDetail, facilitiesData } = route.params; // Ensure facilitiesData is passed

    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [selectedItem, setSelectedItem] = useState('About Us');
    const [activeTab, setActiveTab] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [ProfData, setProfData] = useState('');
    console.log("============   ProfDetail ======== 6666==========", ProfDetail.stories);

    const [stories, setStories] = useState(ProfDetail.stories);

    const [address, setAddress] = useState({
        address1: '',
        apartment: '',
        postcode: '',
        locality: '',
        state: '',
        country: '',

    });
    const refRBSheet = useRef(null);
    const flatListRef = useRef(null);

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const order = {
        serviceImage: barber,
        serviceName: 'Hair Styling',
        professionalName: 'John Doe',
    };
    const galleryImages = facilitiesData?.gallery || [];

    const openBottomSheet = () => {
        refRBSheet.current.open();
    };

    const closeBottomSheet = () => {
        refRBSheet.current.close();
    };

    const handleSaveAddress = () => {
 navigation.navigate(NavigationScreens.OurServicesScreen, { SelectedProf: ProfDetail ,address:address})
console.log("adasd",address);
        refRBSheet.current.close();
    };



    useEffect(() => {
        if (stories.length != 0) {
            const interval = setInterval(() => {
                if (currentPage < stories.length - 1) {
                    flatListRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
                    setCurrentPage(currentPage + 1);
                } else {
                    flatListRef.current.scrollToIndex({ animated: true, index: 0 });
                    setCurrentPage(0);
                }
            }, 2000);

            return () => clearInterval(interval);
        }


    }, [currentPage, stories.length]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('AuthToken');
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         };
    //         const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/professionals`, config);
    //         // console.log('========    Proff   ==========', res.data.professional);
    //         setProfData(res?.data?.professional)
    //         const ProfId = res.data.professional.map((prof) => prof.id);
    //         // console.log("========  profId   =============", ProfId);
    //         // setProfID(ProfId)
    //         const emailList = res.data.professional.map((prof) => prof.user.email);
    //         // console.log('======     emails hkb     ===========', emailList);
    //         const Name = res.data.professional.map((prof) => prof.user.firstName);
    //         // console.log('======     name hkb     ===========', Name);
    //         // setFetchedProfName(Name);
    //         const Phone = res.data.professional.map((prof) => prof.user.phone);
    //         // console.log('======     Phone hkb     ===========', Phone);
    //         // setFetchedProfPhone(Phone);

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const AllCategory = ({ item, setSelectedItem }) => (
        <TouchableOpacity
            style={[
                styles.CategoryContainer,
                selectedItem === item.name && styles.selectedItem,
            ]}
            onPress={() => setSelectedItem(item.name)}
        >
            <View style={{ marginHorizontal: 13 }}>
                <Text
                    style={[
                        styles.Categorytext,
                        selectedItem === item.name && styles.SelectedCategorytext,
                    ]}
                >
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderScreen = () => {
        switch (selectedItem) {
            case 'About Us':
                return <ProfessionalAboutUsScreen facilitiesData={facilitiesData} ProfData={ProfessionalData} />;
            // case 'Services':
            //     return <ServicesScreen facilitiesData={facilitiesData}  />;
            // case 'Package':
            //     return <PackageScreen facilitiesData={facilitiesData}  />;
            case 'Gallery':
                return <ProfessionalGalleryScreen />;
            case 'Review':
                return <ProfessionalReviewScreen />;
            default:
                return null;
        }
    };

    const handleSelectSalon = () => {
        setActiveTab('Salon')
        navigation.navigate(NavigationScreens.FacilityListScreen, { SelectedProf: ProfDetail })
    }

    const styles = StyleSheet.create({
        dot: {
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: COLOR_LIGHT.GRAY,
            marginHorizontal: 5,
        },
        activeDot: {
            backgroundColor: COLOR_LIGHT.ORANGECOLOR,
        },
        CategoryContainer: {
            borderWidth: 2,
            borderColor: COLOR_LIGHT.ORANGECOLOR,
            marginHorizontal: 5,
            borderRadius: 30,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        selectedItem: {
            backgroundColor: COLOR_LIGHT.ORANGECOLOR,
        },
        Categorytext: {
            fontWeight: '600',
            color: COLOR_LIGHT.ORANGECOLOR,
        },
        SelectedCategorytext: {
            color: COLOR_LIGHT.WHITE,
        },
        CategoryContainer: {
            borderWidth: 2,
            borderColor: COLOR.ORANGECOLOR,
            marginHorizontal: 5,
            borderRadius: 30,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        selectedItem: {
            backgroundColor: COLOR.ORANGECOLOR,
        },
        Categorytext: {
            fontWeight: '500',
            color: COLOR.ORANGECOLOR,
        },
        SelectedCategorytext: {
            color: COLOR.WHITE,
        },
        CardContainer: {
            elevation: 2,
            backgroundColor: COLOR.WHITE,
            borderRadius: 25,
            height: Screen_Height * 0.14,
            width: Screen_Width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
        },
        CardImage: {
            width: 80,
            height: 80,
            resizeMode: 'cover',
            borderRadius: 15,
        },
        CardContain: {
            height: 90,
            width: 180,
            paddingVertical: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        },
    });

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE }}>
                {stories.length == 0 ?
                    <ImageBackground source={barber} style={{ width: Screen_Width, resizeMode: 'cover', height: Screen_Height * 0.25, marginRight: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingVertical: 15 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="arrowleft" size={30} color={COLOR.WHITE} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="bookmark-outline" size={25} color={COLOR.WHITE} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    : (
                        <>
                            <View style={{ borderRadius: 15 }}>
                                <FlatList
                                    ref={flatListRef}
                                    data={stories}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollEnd={(event) => {
                                        const offset = event.nativeEvent.contentOffset.x;
                                        const index = Math.floor(offset / Screen_Width);
                                        setCurrentPage(index);
                                    }}
                                    renderItem={({ item }) => (
                                        <ImageBackground source={stories.length == 0 ? barber2 : { uri: item.resource }} style={{ width: Screen_Width, resizeMode: 'cover', height: Screen_Height * 0.25, marginRight: 2 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingVertical: 15 }}>
                                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                                    <AntDesign name="arrowleft" size={30} color={COLOR.WHITE} />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <MaterialCommunityIcons name="bookmark-outline" size={25} color={COLOR.WHITE} />
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                    )}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', bottom: 25, borderRadius: 15 }}>
                                {stories.map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: index === currentPage ? COLOR.ORANGECOLOR : COLOR.GRAY,
                                            marginHorizontal: 5,
                                        }}
                                    />
                                ))}
                            </View></>)
                }


                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="Show Order" onPress={() => setModalVisible(true)} />
                    <OrderRequest
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        order={order}
                    />
                </View> */}
                <View style={{ marginHorizontal: 15 }}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 24, color: COLOR.BLACK }}>{ProfDetail?.user?.firstName}</Text>
                            <TouchableOpacity
                                style={{
                                    width: 80,
                                    height: 35,
                                    backgroundColor: isOpen ? COLOR.ORANGECOLOR : COLOR.CANCEL_B,
                                    justifyContent: 'center',
                                    borderRadius: 22
                                }}
                                onPress={() => setIsOpen(prevState => !prevState)}
                            >
                                <Text style={{ fontSize: 16, color: COLOR.WHITE_80, textAlign: 'center' }}>
                                    {isOpen ? "Open" : "Close"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }}>
                            <FontAwesome name="star-half-empty" size={24} color={COLOR.ORANGECOLOR} />
                            <Text style={{ marginLeft: 10, color: COLOR.GRAY }}>4.8(3,279 reviews)</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <FastImage source={share} style={{ height: 20, width: 20, marginVertical: 5 }} />
                            <Text style={{ marginLeft: 10, color: COLOR.GRAY }}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={AllCategoryData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <AllCategory item={item} setSelectedItem={setSelectedItem} />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={{ backgroundColor: COLOR.WHITE, alignSelf: 'center', elevation: 3, shadowColor: COLOR.BLACK, height: 125, width: Screen_Width * 0.9, marginVertical: 10, borderRadius: 25 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Freelancer mode</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}><Octicons name="dot-fill" size={24} color={COLOR.GREEN} /><Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>available</Text></View>
                            <View style={{ flexDirection: 'row', gap: 10 }}><Octicons name="dot-fill" size={24} color={COLOR.CANCEL_B} /><Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>unavailable</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 5 }}>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => {
                                openBottomSheet();
                                setActiveTab('Delivery');
                            }}>
                                <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Delivery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={handleSelectSalon}>
                                <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Salon</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>{renderScreen()}</View>

                    <RBSheet
                        ref={refRBSheet}
                        height={Screen_Height * 0.9}
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
                        }}
                    >
                        <View
                            style={{
                                width: Screen_Width,
                                height: Screen_Height * 0.7,
                                paddingHorizontal: 15,
                                backgroundColor: COLOR.WHITE,
                                justifyContent: 'space-between'
                            }}
                        >

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 15,
                                justifyContent: 'space-between',
                                margin: 10
                            }}>
                                <Text style={{ fontSize: 20, color: COLOR.BLACK }}>Add Address</Text>
                                <TouchableOpacity onPress={closeBottomSheet}><AntDesign name="closecircleo" size={25} color={COLOR.BLACK} /></TouchableOpacity>
                            </View>

                            <ScrollView style={{ margin: 10 }}>
                                <TextInput
                                    placeholder="Address"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={address.address1}
                                    onChangeText={(text) => setAddress({ ...address, address1: text })}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLOR.GRAY,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10,
                                        color: COLOR.BLACK,
                                        backgroundColor: COLOR.WHITE,
                                    }}
                                />
                                <TextInput
                                    placeholder="Apartment"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={address.apartment}
                                    onChangeText={(text) => setAddress({ ...address, apartment: text })}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLOR.BLACK,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10,
                                        color: COLOR.BLACK,
                                        backgroundColor: COLOR.WHITE,
                                    }}
                                />
                                <TextInput
                                    placeholder="PostCode"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={address.postcode}
                                    onChangeText={(text) => setAddress({ ...address, postcode: text })}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLOR.GRAY,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10,
                                        color: COLOR.BLACK,
                                        backgroundColor: COLOR.WHITE,
                                    }}
                                />
                                <TextInput
                                    placeholder="Locality"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={address.locality}
                                    onChangeText={(text) => setAddress({ ...address, locality: text })}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLOR.GRAY,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10,
                                        color: COLOR.BLACK,
                                        backgroundColor: COLOR.WHITE,
                                    }}

                                />
                                <TextInput
                                    placeholder="State"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={address.state}
                                    onChangeText={(text) => setAddress({ ...address, state: text })}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLOR.GRAY,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10,
                                        color: COLOR.BLACK,
                                        backgroundColor: COLOR.WHITE,
                                    }}

                                />
                                <TextInput
                                    placeholder="Country"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={address.country}
                                    onChangeText={(text) => setAddress({ ...address, country: text })}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: COLOR.GRAY,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10,
                                        color: COLOR.BLACK,
                                        backgroundColor: COLOR.WHITE,
                                    }}

                                />
                            </ScrollView>
                            <TouchableOpacity
                                style={{
                                    width: Screen_Width * 0.90,
                                    height: Screen_Height * 0.05,
                                    backgroundColor: COLOR.ORANGECOLOR,
                                    justifyContent: 'center',
                                    borderRadius: 35,
                                    alignSelf: 'center',
                                    marginVertical: 20
                                }}
                                onPress={()=>handleSaveAddress(address)}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 16, color: COLOR.WHITE }}>
                                    Book Delivery
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                    <View style={{ height: 90 }} />
                </View>
            </ScrollView>
            {selectedItem === 'About Us' &&
                <TouchableOpacity
                    style={{
                        width: Screen_Width * 0.80,
                        height: 40,
                        backgroundColor: COLOR.ORANGECOLOR,
                        justifyContent: 'center',
                        borderRadius: 35,
                        alignSelf: 'center',
                        marginVertical: 20,
                        position: 'absolute',
                        bottom: 80,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20
                    }}
                    onPress={() => navigation.navigate(NavigationScreens.ReserveNowServicesScreen, { SelectedProf: ProfDetail ,address:address})}
                >
                    <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE }}>
                        Reserve Now
                    </Text>
                    <AntDesign name="calendar" size={20} color={COLOR.WHITE} />
                </TouchableOpacity>}
        </>
    );
};

export default ProfessionalInfo;



