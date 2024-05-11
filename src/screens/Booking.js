import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { useSelector } from 'react-redux';
import { barber, barber2, barber3, barber4, call, map, message, share, web } from '../constants/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import { Screen_Height, Screen_Width } from '../constants/Constants';

const Booking = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

    const data = [{ 
        id: '1', 
        image: barber 
      },
      { 
        id: '2',
        image: barber2 
      },
      { 
        id: '3', 
        image: barber3 
      },
      { 
        id: '4', 
        image: barber4 
      }
    ];
    const data2 =[
        {
            id:1,
            name:'Website',
            icon:web,
        },
        {
            id:2,
            name:'Message',
            icon:message,
        },
        {
            id:3,
            name:'Call',
            icon:call,
        },
        {
            id:4,
            name:'Direction',
            icon:map,
        },
        {
            id:5,
            name:'Share',
            icon:share
        },
    ]
    
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= data.length) {
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
                <TouchableOpacity onPress={() => handleScroll(-1)}>
                    <AntDesign name="arrowleft" size={30} color={COLOR.WHITE} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleScroll(1)}>
                    <MaterialCommunityIcons name="bookmark-minus-outline" size={30} color={COLOR.WHITE} />
                </TouchableOpacity>
            </View>
            {renderPaginationDots()}
        </ImageBackground>
    );

    const renderItem2 = ({item}) =>(
        <View style={{alignItems:'center',marginTop:10}}>
            <TouchableOpacity style={{backgroundColor:COLOR.ORANGE_80,width:68,height:68,borderRadius:99,marginHorizontal:5,justifyContent:'center',alignItems:'center'}}>
               <Image source={item.icon} style={{width:30,height:30}}/>
            </TouchableOpacity>
           <Text style={{color:COLOR.BLACK,fontSize:16}}>{item.name}</Text>
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
                {data.map((_, index) => (
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

    return (
        <ScrollView style={{ width: '100%' }}>
             <FlatList
                data={data}
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
            <View style={{ marginHorizontal: 10, marginTop: 10}}>
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
              data={data2}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem2}
            />
        </ScrollView>
    );
}

export default Booking;

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: COLOR_LIGHT.GRAY, // Inactive dot color
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: COLOR_LIGHT.ORANGECOLOR, // Active dot color
    },
});
