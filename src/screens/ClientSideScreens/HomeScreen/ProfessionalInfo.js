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
import { barber, barber2, ComeToYouOrange, ComeToYouWhite, HomeIcon2, HouseOrange, share } from '../../../constants/Icons';
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
import {
    ClockUserIcon,
    ClockUserIcon2,
    ClockUserIcon3,
    GearFineIcon,
    Hair1,
    ShareIcon,
    ShareIcon2,
    ShareIcon3,

} from '../../../constants/Icons';
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
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [cords, setCords] = useState([]);

    const [stories, setStories] = useState(ProfDetail.stories);
    const authToken = useSelector(state => state.AuthReducer);
    const [showFullText, setShowFullText] = useState(false);
    const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget laoreet ex. Nulla facilisi. In eget ex tincidunt, suscipit arcu nec, aliquam Donec et nunc non felis rutrum semper. Duis eu tellus vel turpis varius rhoncus eget nec neque. Aenean ac placerat tortor. Duis ultricies, eros nec fermentum iaculis, libero lorem rhoncus justo, sed lacinia arcu neque sit amet nisi. Vivamus id purus non erat posuere pharetra sed lacinia arcu neque.';
    const truncatedText = fullText.slice(0, 100) + '...';
    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    // const [address, setAddress] = useState({
    //     address1: '',
    //     apartment: '',
    //     postcode: '',
    //     locality: '',
    //     state: '',
    //     country: '',

    // });
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
        navigation.navigate(NavigationScreens.OurServicesScreen, { SelectedProf: ProfDetail, locationData: user.searchLocations[0], coorinates: cords?.coordinates })

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

    useEffect(() => {
        getUserInfo()
    }, [])


    const getUserInfo = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
            console.log('========  user ID   ==========', res.data.data.user.searchLocations[0])
            setUser(res.data.data.user);
            setCords(res.data.data.user.searchLocations[0]);
            setAddress(res.data.data.user?.searchLocations[0]?.address);
            // console.log(res.data.data.user.searchLocations[0]);
        } catch (error) {
            console.error("Error:", error);
        }
    };


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
        setActiveTab('Meet In Store')
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
                            {/* <TouchableOpacity
                                style={{
                                    width: 80,
                                    height: 35,
                                    backgroundColor: isOpen ? COLOR.ORANGECOLOR : COLOR.CANCEL_B,
                                    justifyContent: 'center',
                                    borderRadius: 22
                                }}
                                onPress={() => setIsOpen(prevState => !prevState)}
                            > */}
                            {/* <Text style={{ fontSize: 16, color: COLOR.WHITE_80, textAlign: 'center' }}>
                                    {isOpen ? "Open" : "Close"}
                                </Text> */}
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                {/* <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}> */}
                                <FastImage source={ShareIcon2} style={{ height: 30, width: 30 }} />
                                {/* </TouchableOpacity> */}
                                <Text style={{ marginLeft: 2, color: COLOR.GRAY }}>Share</Text>
                            </TouchableOpacity>
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{showFullText ? fullText : truncatedText}</Text>
                            <TouchableOpacity onPress={toggleShowFullText}>
                                <Text style={{ color: COLOR.ORANGECOLOR }}>{showFullText ? 'Read Less' : 'Read More'}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ReviewsDetailScreen)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }}>
                            <FontAwesome name="star-half-empty" size={24} color={COLOR.ORANGECOLOR} />
                            <Text style={{ marginLeft: 10, color: COLOR.GRAY, fontSize: 14 }}>4.8(3,279 reviews)</Text>
                        </TouchableOpacity>
                        {selectedItem === 'About Us' &&
                            <TouchableOpacity
                                style={{
                                    // width: Screen_Width * 0.35,
                                    // height:35,
                                    // borderRadius: 35,

                                    flexDirection: 'row',
                                    gap: 10,
                                    alignItems: 'center',

                                }}
                                onPress={() => navigation.navigate(NavigationScreens.ReserveNowServicesScreen, { SelectedProf: ProfDetail, address: address })}
                            >
                                {/* <AntDesign name="calendar" size={22} color={COLOR.ORANGECOLOR} /> */}
                                <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Choose a delivery option</Text>
                                {/* <AntDesign name="plus" size={18} color={COLOR.BLACK} /> */}

                            </TouchableOpacity>}
                    </View>
                    {/* <View>
                        <FlatList
                            data={AllCategoryData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <AllCategory item={item} setSelectedItem={setSelectedItem} />
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View> */}
                    <View style={{ backgroundColor: COLOR.WHITE, alignSelf: 'center', elevation: 3, shadowColor: COLOR.BLACK, height: 125, width: Screen_Width * 0.9, position: 'relative', marginTop: 60, borderRadius: 25 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Delivery Options</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}><Octicons name="dot-fill" size={24} color={COLOR.GREEN} /><Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>available</Text></View>
                            <View style={{ flexDirection: 'row', gap: 10 }}><Octicons name="dot-fill" size={24} color={COLOR.CANCEL_B} /><Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>unavailable</Text></View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 5 }}>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab === 'Comes to you' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10 }} onPress={() => {
                                openBottomSheet();
                                setActiveTab('Comes to you');
                            }}>
                                <FastImage source={activeTab === 'Comes to you' ? ComeToYouWhite : ComeToYouOrange} resizeMode='contain' style={{ height: 22, width: 22 }} />

                                <Text style={{ color: activeTab === 'Comes to you' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Comes to you</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 5, width: 150, height: 40, backgroundColor: activeTab === 'Meet In Store' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={handleSelectSalon}>
                                <FastImage source={activeTab === 'Meet In Store' ? HomeIcon2 : HouseOrange} style={{ height: 25, width: 25 }} resizeMode='contain' />

                                <Text style={{ color: activeTab === 'Meet In Store' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Meet In Store</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>{renderScreen()}</View>

                    <RBSheet
                        ref={refRBSheet}
                        height={Screen_Height * 0.35}
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
                                height: Screen_Height * 0.4,
                                paddingHorizontal: 15,
                                backgroundColor: COLOR.WHITE,
                            }}
                        >

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 15,
                                marginBottom: 30,
                                justifyContent: 'space-between',
                                margin: 10
                            }}>
                                <Text style={{ fontSize: 24, color: COLOR.BLACK, fontWeight: 'bold' }}>Add Address</Text>
                                <TouchableOpacity onPress={closeBottomSheet}><AntDesign name="closecircleo" size={25} color={COLOR.BLACK} /></TouchableOpacity>
                            </View>


                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, color: COLOR.BLACK, fontWeight: 'bold' }} numberOfLines={3}>Current Address :</Text>
                                <Text style={{ fontSize: 16, color: COLOR.BLACK }} numberOfLines={3}>{address}</Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    width: Screen_Width * 0.90,
                                    height: Screen_Height * 0.05,
                                    backgroundColor: COLOR.ORANGECOLOR,
                                    justifyContent: 'center',
                                    borderRadius: 35,
                                    alignSelf: 'center',
                                    marginVertical: 10
                                }}
                                onPress={() => handleSaveAddress(address)}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 16, color: COLOR.WHITE }}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: Screen_Width * 0.90,
                                    height: Screen_Height * 0.05,
                                    backgroundColor: COLOR.ORANGECOLOR,
                                    justifyContent: 'center',
                                    borderRadius: 35,
                                    alignSelf: 'center',

                                }}
                                onPress={() => { navigation.navigate(NavigationScreens.AddAddressScreen), closeBottomSheet() }}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 16, color: COLOR.WHITE }}>
                                    Change Address
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </RBSheet>
                    <View style={{ height: 90 }} />
                </View>
            </ScrollView>
        </>
    );
};

export default ProfessionalInfo;



