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
                        
const ProfSelectService = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

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
        <View style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 20, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ color: COLOR.BLACK, fontSize: 24, fontWeight: '600' }}>Our Services</Text>
            </View>
            <Searchbar
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
                style={{backgroundColor:COLOR.WHITE,marginVertical:10}}
            />
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfAddCustomServicesScreen,{})} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginVertical:5, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 15, height: 50, elevation: 5, shadowColor: COLOR.WHITE }}>
                <AntDesign name="plus" size={20} color={COLOR.WHITE} />
                <Text style={{ fontSize: 14, color: COLOR.WHITE, fontWeight: '700' }}>Add Custom Services</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredServices}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.profselectedDetailserviceScreen, { item: item, data: filteredServices })} style={{ backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK, paddingHorizontal: 10, borderRadius: 15, height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',gap:20, marginVertical: 10, marginHorizontal: 5 }}>
                        <Image source={{ uri: item.photo }} style={{ height: 50, width: 50, resizeMode: 'cover', marginVertical: 10, borderRadius: 10 }} />
                        <Text style={{ fontSize: 16,color:COLOR.BLACK }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            
            <View style={{height:140}}/>
        </View>
    );
};

export default ProfSelectService;

const styles = StyleSheet.create({});