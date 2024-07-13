import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
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

const ProfSelectCategory = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [activeTab1, setActiveTab1] = useState('Both');
    const [femaleServices, setFemaleServices] = useState([]);
    const [maleServices, setMaleServices] = useState([]);
    const [bothServices, setBothServices] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [femaleServices, maleServices, bothServices, searchQuery, activeTab1]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.get(`${BASE_API_URL}/filters/categorys/`, config);
            console.log("=======   ressss  ==   ========", res.data.results);
            setServices(res.data.results);
            
            // Filter services
            setFemaleServices(res.data.results.filter(service => service.forFemale && !service.forMale));
            setMaleServices(res.data.results.filter(service => service.forMale && !service.forFemale));
            setBothServices(res.data.results.filter(service => service.forFemale && service.forMale));
            
            // Set initial filtered services
            setFilteredServices(res.data.results.filter(service => service.forFemale && service.forMale));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filterServices = (services) => services.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            
            if (activeTab1 === 'Feminine') {
                setFilteredServices(filterServices(femaleServices));
            } else if (activeTab1 === 'Masculine') {
                setFilteredServices(filterServices(maleServices));
            } else {
                setFilteredServices(filterServices(bothServices));
            }
        } else {
            if (activeTab1 === 'Feminine') {
                setFilteredServices(femaleServices);
            } else if (activeTab1 === 'Masculine') {
                setFilteredServices(maleServices);
            } else {
                setFilteredServices(bothServices);
            }
        }
    };

    const handleTabPress = (tab) => {
        setActiveTab1(tab);
        setSearchQuery('');
        if (tab === 'Feminine') {
            setFilteredServices(femaleServices);
        } else if (tab === 'Masculine') {
            setFilteredServices(maleServices);
        } else {
            setFilteredServices(bothServices);
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
                  onPress={() => handleTabPress('Masculine')}
                >
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
                  onPress={() => handleTabPress('Both')}
                >
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
                  onPress={() => handleTabPress('Feminine')}
                >
                  <Text style={{ color: activeTab1 === 'Feminine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Feminine</Text>
                </TouchableOpacity>
              </View>
            <FlatList
                data={filteredServices}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.profselectedDetailserviceScreen, { item: item, data: filteredServices })} style={{ backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK, paddingHorizontal: 10, borderRadius: 15, height: 80, justifyContent: 'center',marginVertical: 10, marginHorizontal: 5 }}>
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