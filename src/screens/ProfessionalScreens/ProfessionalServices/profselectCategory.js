import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import { Searchbar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { BothOrange, BothWhite, femaleOrange, femaleWhite, maleOrange, maleWhite } from '../../../constants/Icons';
                        
const ProfSelectCategory = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [activeTab1, setActiveTab1] = useState('Both');
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [services, searchQuery]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.get(`${BASE_API_URL}/filters/serviceTypes`, config);
            console.log("=======   ressss  ==   ========", res.data.data.serviceTypes);
            setServices(res.data.data.serviceTypes);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = services.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredServices(filtered);
        } else {
            setFilteredServices(services);
        }
    };

    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ color: COLOR.BLACK, fontSize: 24, fontWeight: '600' }}>Select Category</Text>
            </View>
            <Searchbar
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
                style={{backgroundColor:COLOR.WHITE,marginVertical:10}}
            />
             <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 10, marginVertical: 5 }}>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: 40,
                    backgroundColor: activeTab1 === 'Masculine' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'row',
                    gap:5,
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR
                  }}
                  onPress={() => setActiveTab1('Masculine')}
                >
                  {/* <FastImage source={activeTab1 === 'Masculine'?maleWhite:maleOrange} style={{ width: 20, height: 20 }} resizeMode='contain' /> */}


                  <Text style={{ color: activeTab1 === 'Masculine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Masculine</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: 40,
                    backgroundColor: activeTab1 === 'Both' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'row',
                    gap:5,
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR
                  }}
                  onPress={() => setActiveTab1('Both')}
                >
                  {/* <FastImage source={activeTab1 === 'Both'?BothWhite:BothOrange} style={{ width: 20, height: 20 }} resizeMode='contain' /> */}

                  <Text style={{ color: activeTab1 === 'Both' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Both</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: 40,
                    backgroundColor: activeTab1 === 'Feminine' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'row',
                    gap:5,
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR
                  }}
                  onPress={() => setActiveTab1('Feminine')}
                >
                  {/* <FastImage source={activeTab1 === 'Feminine'?femaleWhite:femaleOrange} style={{ width: 20, height: 20 }} resizeMode='contain' /> */}
                  <Text style={{ color: activeTab1 === 'Feminine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Feminine</Text>
                </TouchableOpacity>
              </View>
            <FlatList
                data={filteredServices}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.profselectedDetailserviceScreen, { item: item, data: filteredServices })} style={{ backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK, paddingHorizontal: 10, borderRadius: 15, height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',gap:20, marginVertical: 10, marginHorizontal: 5 }}>
                        <Image source={{ uri: item.photo }} style={{ height: 50, width: 50, resizeMode: 'cover', marginVertical: 10, borderRadius: 10 }} />
                        <Text style={{ fontSize: 16,color:COLOR.BLACK }}>{item.name}</Text>
                    </TouchableOpacity>
                    
                )}
            />
           
           <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfAddCustomServicesScreen,{})} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginVertical:5, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 15, height: 50, elevation: 5, shadowColor: COLOR.WHITE }}>
                <AntDesign name="plus" size={20} color={COLOR.WHITE} /> 
                <Text style={{ fontSize: 14, color: COLOR.WHITE, fontWeight: '700' }}>Request to add custom category</Text>
            </TouchableOpacity>
            
            <View style={{height:100}}/>
            
        </ScrollView>
    );
};

export default ProfSelectCategory;

const styles = StyleSheet.create({});