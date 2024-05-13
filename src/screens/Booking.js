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
import { AllCategory, AllCategoryData, Socialicons, Specialist, barberData, data, data2 } from '../components/utils';
import AboutUsScreen from '../components/SalonDetailScreen/AboutUsScreen';
import ServicesScreen from '../components/SalonDetailScreen/ServicesScreen';
import PackageScreen from '../components/SalonDetailScreen/PackageScreen';
import GalleryScreen from '../components/SalonDetailScreen/GalleryScreen';
import ReviewScreen from '../components/SalonDetailScreen/ReviewScreen';
import { useNavigation } from '@react-navigation/native';
const Booking = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [selectedItem, setSelectedItem] = useState('About Us');
    const navigation = useNavigation()
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    useEffect(() => {
        const timer = setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= barberData.length) {
                nextIndex = 0;
            }
            scrollToIndex(nextIndex);
        }, 2000);

        return () => clearInterval(timer);
    }, [activeIndex]);

    const scrollToIndex = (index) => {
        setActiveIndex(index);
        flatListRef.current.scrollToIndex({ index: index });
    };

    const renderItem = ({ item }) => (
        <ImageBackground source={item.image} style={{ width: Screen_Width, resizeMode: 'cover', height: Screen_Height * 0.25, marginRight: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingVertical: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color={COLOR.WHITE} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="bookmark-minus-outline" size={30} color={COLOR.WHITE} />
                </TouchableOpacity>
            </View>
            {renderPaginationDots()}
        </ImageBackground>
    );

    const renderItem2 = ({ item }) => (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{ backgroundColor: COLOR.ORANGE_80, width: Screen_Width*0.16, height: Screen_Height*0.07, borderRadius: 99, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={item.icon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <Text style={{ color: COLOR.BLACK, fontSize: 16 }}>{item.name}</Text>
        </View>
    );

    const renderItem3 = ({ item }) => (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity style={{ backgroundColor: COLOR.WHITE, width: Screen_Width * 0.25, height: Screen_Height * 0.18, borderRadius: 25, marginHorizontal: 5, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Image source={item.image} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.09, borderRadius: 10 }} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ color: COLOR.BLACK_70, fontSize: 14 }}>{item.type}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );




    const renderPaginationDots = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    right: 0
                }}
            >
                {barberData.map((_, index) => (
                    <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                ))}
            </View>
        );
    };

    const handleScroll = (direction) => {
        let nextIndex = activeIndex + direction;
        if (nextIndex < 0) {
            nextIndex = data.length - 1;
        } else if (nextIndex >= data.length) {
            nextIndex = 0;
        }
        scrollToIndex(nextIndex);
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
                return <AboutUsScreen />;
            case 'Services':
                return <ServicesScreen />;
            case 'Package':
                return <PackageScreen />;
            case 'Gallary':
                return <GalleryScreen />;
            case 'Review':
                return <ReviewScreen />;
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
                data={barberData}
                ref={flatListRef}
                renderItem={renderItem}
                style={{ width: Screen_Width }}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / Screen_Width);
                    setActiveIndex(index);
                }}
            />
            <View style={{ marginHorizontal: 15 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Barbarella Inova</Text>
                        <TouchableOpacity style={{ width: 80, height: 35, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 22 }}>
                            <Text style={{ fontSize: 16, color: COLOR.WHITE_80, textAlign: 'center' }}>Open</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Fontisto name="map-marker-alt" size={24} color={COLOR.ORANGECOLOR} />
                        <Text style={{ marginLeft: 10, color: COLOR.GRAY }}>6993 Meadow Vally Terrace, New York</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <FontAwesome name="star-half-empty" size={24} color={COLOR.ORANGECOLOR} />
                        <Text style={{ marginLeft: 10, color: COLOR.GRAY }}>4.8(3,279 reviews)</Text>
                    </View>
                </View>
                <FlatList
                    data={Socialicons}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem2}
                />
                <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} />
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Our Specialist</Text>
                    <TouchableOpacity >
                        <Text style={{ fontSize: 20, color: COLOR.ORANGECOLOR }}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={Specialist}
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


