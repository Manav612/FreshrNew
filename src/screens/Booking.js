import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { useSelector } from 'react-redux';
import { Hair1, barber, barber2, barber3, barber4, call, map, message, share, web } from '../constants/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Screen_Height, Screen_Width } from '../constants/Constants';
import { AllCategory, AllCategoryData, Socialicons, Professional, barberData, data, data2, ProfileData } from '../components/utils';
import AboutUsScreen from '../components/SalonDetailScreen/AboutUsScreen';
import ServicesScreen from '../components/SalonDetailScreen/ServicesScreen';
import PackageScreen from '../components/SalonDetailScreen/PackageScreen';
import GalleryScreen from '../components/SalonDetailScreen/GalleryScreen';
import ReviewScreen from '../components/SalonDetailScreen/ReviewScreen';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { NavigationScreens } from '../constants/Strings';
import { BASE_API_URL } from '../Services';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Booking = ({ route }) => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [selectedItem, setSelectedItem] = useState('About Us');
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [ProfData, setProfData] = useState('');
    const flatListRef = useRef(null);
    const navigation = useNavigation()
    const { facilitiesData } = route.params
    // console.log("========  facilitiesData  ============>", facilitiesData);
    const galleryImages = facilitiesData.gallery;

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentPage < galleryImages.length - 1) {
                flatListRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
                setCurrentPage(currentPage + 1);
            } else {
                flatListRef.current.scrollToIndex({ animated: true, index: 0 });
                setCurrentPage(0);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [currentPage, galleryImages.length]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('AuthToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/professionals`, config);
            console.log('========    Proff   ==========', res.data.professional);
            setProfData(res?.data?.professional)
            const ProfId = res.data.professional.map((prof) => prof.id);
            // console.log("========  profId   =============",ProfId);
            // setProfID(ProfId)
            const emailList = res.data.professional.map((prof) => prof.user.email);
            // console.log('======     emails hkb     ===========', emailList);
            const Name = res.data.professional.map((prof) => prof.user.firstName);
            // console.log('======     name hkb     ===========', Name);
            // setFetchedProfName(Name);
            const Phone = res.data.professional.map((prof) => prof.user.phone);
            // console.log('======     Phone hkb     ===========', Phone);
            // setFetchedProfPhone(Phone);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderItem3 = ({ item }) => (
        <View style={{ alignItems: 'center',marginVertical:5 }}>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalInfoScreen, { facilitiesData: facilitiesData,ProfDetail: item })} style={{ backgroundColor: COLOR.WHITE, width: Screen_Width * 0.25, height: Screen_Height * 0.15, borderRadius: 15,shadowColor:COLOR.BLACK,elevation:3, marginHorizontal: 5, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Image source={barber} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.09, borderRadius: 10 }} />
                
                    <Text style={{ color: COLOR.BLACK, fontSize: 16,fontWeight:'600' }}>{item?.user?.firstName}</Text>
               
            </TouchableOpacity>

        </View>
    );

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
                return <AboutUsScreen facilitiesData={facilitiesData} ProfData={ProfData}/>;
            // case 'Services':
            //     return <ServicesScreen facilitiesData={facilitiesData}  />;
            // case 'Package':
            //     return <PackageScreen facilitiesData={facilitiesData}  />;
            case 'Gallery':
                return <GalleryScreen facilitiesData={facilitiesData} />;
            case 'Review':
                return <ReviewScreen facilitiesData={facilitiesData} />;
            default:
                return null;
        }
    };

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
            marginLeft: 10,
            borderRadius: 30,
            height: 35,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
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
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE }}>
            <View style={{ borderRadius: 15 }}>
                <FlatList
                    ref={flatListRef}
                    data={galleryImages}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const offset = event.nativeEvent.contentOffset.x;
                        const index = Math.floor(offset / Screen_Width);
                        setCurrentPage(index);
                    }}
                    renderItem={({ item }) => (
                        <ImageBackground source={{ uri: item }} style={{ width: Screen_Width, resizeMode: 'cover', height: Screen_Height * 0.25, marginRight: 2 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingVertical: 15 }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <AntDesign name="arrowleft" size={30} color={COLOR.WHITE} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        name="bookmark-outline"
                                        size={25}
                                        color={COLOR.WHITE}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    )}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', bottom: 25, borderRadius: 15 }}>
                {galleryImages.map((_, index) => (
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
            </View>

            <View style={{ marginHorizontal: 15 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24, color: COLOR.BLACK }}>{facilitiesData?.name}</Text>
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

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <FontAwesome name="star-half-empty" size={24} color={COLOR.ORANGECOLOR} />
                        <Text style={{ marginLeft: 10, color: COLOR.GRAY }}>4.8(3,279 reviews)</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <FastImage source={share} style={{ height: 20, width: 20 }} />
                        <Text style={{ marginLeft: 10, color: COLOR.GRAY }}>Share</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Our Professionals</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.OurProfessionalDetailsScreen,{ProfDetail:ProfData,facilitiesData: facilitiesData})}>
                        <Text style={{ fontSize: 18, color: COLOR.ORANGECOLOR, fontWeight: '600' }}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={ProfData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem3}
                />

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
                <View>{renderScreen()}</View>

            </View>
        </ScrollView>
    );
}

export default Booking;