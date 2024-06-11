import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import { data, data2, data3, data4 } from '../../../components/utils';
import { Filter, Hair1 } from '../../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Slider from '@react-native-community/slider';
const SearchFilter = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItem1, setSelectedItem1] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const navigation = useNavigation()
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const [bookmarkStatus, setBookmarkStatus] = useState({});
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [distance, setDistance] = useState(50);
    const theme = useSelector(state => state.ThemeReducer);

    const handleSearch = () => {
        const newData = data2.filter(item => {
            const itemData = `${item.text.toUpperCase()}`;
            const searchTextData = searchText.toUpperCase();
            return itemData.indexOf(searchTextData) > -1;
        });
        setFilteredData(newData);
    };

    const toggleBookmark = (itemId) => {
        setBookmarkStatus(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };
    const handleResetPress = () => {
        setResetSelected(!resetSelected);
        setApplySelected(false);
    };

    const handleApplyPress = () => {
        setApplySelected(!applySelected);
        setResetSelected(false);
    };



    const AllCategory = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.CategoryContainer,
                selectedItem === item.id && styles.selectedItem,
            ]}
            onPress={() => setSelectedItem(item.id)}>
            <View
                style={{
                    marginHorizontal: 13,
                }}>

                <Text
                    style={[
                        styles.Categorytext,
                        selectedItem === item.id && styles.SelectedCategorytext,
                    ]}>
                    {item.text.length > 10 ? item.text.substring(0, 10) + '...' : item.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
    const Rating = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.CategoryContainer,
                selectedItem1 === item.id && styles.selectedItem,
            ]}
            onPress={() => setSelectedItem1(item.id)}>
            <View
                style={{
                    marginHorizontal: 13,
                    flexDirection: 'row',
                    gap: 5,
                }}>
                <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color={selectedItem1 === item.id ? COLOR.WHITE : COLOR.ORANGECOLOR}
                />
                <Text
                    style={[
                        styles.Categorytext,
                        selectedItem1 === item.id && styles.SelectedCategorytext,
                    ]}>
                    {item.text}
                </Text>
            </View>
        </TouchableOpacity>
    );


    const refRBSheet = useRef([]);

    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };

    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };
    const [activeTab, setActiveTab] = useState('Apply Filter');
    const [activeTab2, setActiveTab2] = useState('Masculine');

    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const styles = StyleSheet.create({
        CategoryContainer: {
            borderWidth: 2,
            borderColor: COLOR.ORANGECOLOR,
            marginLeft: 10,
            borderRadius: 30,
            height: 35,
            width: 110,
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


    const Card = ({ item }) => (
        <View style={styles.CardContainer}>
            <TouchableOpacity
                style={{
                    marginHorizontal: 13,
                }} onPress={() => navigation.navigate('Booking')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.CardImage} source={Hair1} />
                    <View style={styles.CardContain}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
                            {item.text}
                        </Text>
                        <Text style={{ color: 'gray' }}>{item.address}</Text>
                        <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons
                                    name="map-marker"
                                    size={18}
                                    color={COLOR.ORANGECOLOR}
                                />
                                <Text style={{ color: 'black' }}>{item.km}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons
                                    name="star-half-full"
                                    size={18}
                                    color={COLOR.ORANGECOLOR}
                                />
                                <Text style={{ color: 'black' }}>{item.rating}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                        <View style={{ height: 90, width: 30 }}>
                            <MaterialCommunityIcons
                                name={bookmarkStatus[item.id] ? "bookmark" : "bookmark-outline"}
                                size={25}
                                color={COLOR.ORANGECOLOR}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15,backgroundColor:COLOR.WHITE }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 2 }}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
                <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.80, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <AntDesign name="search1" size={30} color={COLOR.GRAY} />
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={COLOR.GRAY}
                            style={{ fontSize: 20, color: COLOR.GRAY, width: 200 }}
                            onChangeText={text => {
                                setSearchText(text);
                                handleSearch();
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={openBottomSheet}>
                        <FastImage source={Filter} style={{ height: 20, width: 20 }} />

                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: '600' }}>
                    {searchText ? (
                        <Text>
                            Result "<Text style={{ color: COLOR.ORANGECOLOR }}>{searchText}</Text>"
                        </Text>
                    ) : (
                        'Recent'
                    )}
                </Text>
                {searchText &&
                    <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>12,289 founds</Text>}
            </View>
            <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={searchText ? filteredData : data2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Card item={item} />}
                />
            </View>
            <View style={{}}>
                <RBSheet
                    ref={(ref) => (refRBSheet.current[0] = ref)}

                    height={Screen_Height * 0.65}
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 30, height: 3, backgroundColor: COLOR.BLACK, marginBottom: 10 }} />
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:Screen_Width*0.9}}>
                                <View style={{width:30}}/>
                                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK}}>Filter</Text>
                                <TouchableOpacity onPress={() => refRBSheet.current[0].close()}>
                                    <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />

                        

                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Style</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab2 === 'Masculine' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab2('Masculine') }}>
                                <Text style={{ color: activeTab2 === 'Masculine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Masculine</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab2 === 'Feminine' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab2('Feminine') }}>
                                <Text style={{ color: activeTab2 === 'Feminine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Feminine</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Category</Text>
                            <FlatList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={AllCategory}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18 }}>Rating</Text>
                            <FlatList
                                data={data3}
                                keyExtractor={item => item.id}
                                renderItem={Rating}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ fontWeight: '700', color: '#000', fontSize: 18 }}>Distance: {distance} km</Text>
                            <Slider
                                style={{ width: '100%', marginTop: 10 }}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#000"
                                thumbTintColor="#000"
                                value={distance}
                                onValueChange={(value) => setDistance(value)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
                            <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Reset' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Reset') }}>
                                <Text style={{ color: activeTab === 'Reset' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Apply Filter' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Apply Filter') }}>
                                <Text style={{ color: activeTab === 'Apply Filter' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Apply Filter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </RBSheet>
            </View>
        </ScrollView>
    )
}

export default SearchFilter;