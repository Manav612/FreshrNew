import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../constants/Strings';
import { Servicesdata } from '../../../components/utils';

const ProfSelectService = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(Servicesdata);

    const handleSearch = (text) => {
        if (text) {
            const filtered = Servicesdata.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(Servicesdata);
        }
    };

    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
            <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><AntDesign name="arrowleft" size={30} color={COLOR.GRAY} /></TouchableOpacity>
                <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.75, height: 50, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <AntDesign name="search1" size={27} color={COLOR.GRAY} />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={COLOR.GRAY}
                        style={{ fontSize: 20, color: COLOR.GRAY, width: 200 }}
                        onChangeText={text => {
                            setSearchText(text);
                            handleSearch(text);
                        }}
                        value={searchText}
                    />
                </View>
                <TouchableOpacity onPress={()=>setSearchText('')}>
                    <AntDesign name="close" size={30} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.profselectedDetailserviceScreen, { item: item })} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image source={item.img} style={{ height: 50, width: 50, resizeMode: 'cover', marginVertical: 10, borderRadius: 10 }} />
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

export default ProfSelectService;

const styles = StyleSheet.create({});
