import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { Servicesdata } from '../../../components/utils';
import { NavigationScreens } from '../../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import { UpdateServiceData } from '../../../redux/ServicesData/ServicesDataAction';

const ProfSelectedDetailService = ({ route }) => {
    const { item, data } = route.params;
    // console.log("=====   data   ========",data);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [distance, setDistance] = useState(item?.averageDuration);
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(item?.averagePrice.toString());
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGender, setSelectedGender] = useState('both');
    const [description, setDescription] = useState(item?.description);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([
        { id: '1', name: 'Hair Cut' },
        { id: '2', name: 'Hair Wash' },
        { id: '3', name: 'Hair Coloring' },
    ]);
    const [newCategory, setNewCategory] = useState('');
    
    const addNewCategory = () => {
        if (newCategory.trim() !== '') {
            const newCategoryObject = {
                id: (categories.length + 1).toString(),
                name: newCategory.trim()
            };
            setCategories([...categories, newCategoryObject]);
            setNewCategory('');
            // Optionally, you can automatically select the new category
            setSelectedCategory(newCategoryObject);
            setOpen2(false);
        }
    };
    
        const [open2, setOpen2] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState(null);

        const handleSelectCategory = (category) => {
            setSelectedCategory(category);
            setOpen2(false);
        };

        const handleSelect = (selectedItem) => {
            // Update item with the newly selected service
            Object.assign(item, selectedItem);
            setOpen(false);
        };

        const handlePriceChange = (text) => {
            if (text === '' || (parseFloat(text) >= item.minimumPrice)) {
                setPrice(text);
            } else {
                Alert.alert(
                    "Invalid Price",
                    `Please enter a price greater than or equal to $${item.minimumPrice}.`
                );
            }
        };

        const RadioButton = ({ label, selected, onPress }) => (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }} onPress={onPress}>
                <View style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: COLOR.BLACK,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                }}>
                    {selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: COLOR.BLACK,
                        }} />
                        : null
                    }
                </View>
                <Text style={{ color: COLOR.BLACK, fontSize: 16 }}>{label}</Text>
            </TouchableOpacity>
        );
        const handleCreate = async () => {
            if (!price || parseFloat(price) < item.minimumPrice) {
                Alert.alert("Invalid Price", "Please enter a valid price.");
                return;
            }

            setIsLoading(true);
            try {
                const token = await AsyncStorage.getItem("AuthToken");
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const serviceData = {
                    name: item.name,
                    photo: item.photo,
                    price: parseFloat(price),
                    averageDuration: distance,
                    description: description,
                    serviceType: item._id,
                    forMasculine: selectedGender === 'masculine' || selectedGender === 'both',
                    forFeminine: selectedGender === 'feminine' || selectedGender === 'both'
                };

                const res = await axios.post(`${BASE_API_URL}/professionals/professional/services`, serviceData, config);
                if (res && res.data) {
                    console.log("Service created successfully:", res.data.data.service);
                    navigation.navigate(NavigationScreens.ProfessionalServicesScreen);

                    dispatch(UpdateServiceData(res.data.data.service));
                }

                Alert.alert("Success", "Service created successfully");
            } catch (error) {
                console.error("Error creating service:", error.response?.data || error.message);
                Alert.alert("Error", "Failed to create service. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        const styles = StyleSheet.create({
            input: {
                height: 100, borderRadius: 10, marginVertical: 10, backgroundColor:COLOR.WHITE,
                elevation:3,shadowColor:COLOR.BLACK,marginHorizontal:3,color: COLOR.BLACK
            },
            button: {
                backgroundColor: COLOR.ORANGECOLOR,
                justifyContent: 'center',
                borderRadius: 20,
                alignSelf: 'center',
                height: 40,
                width: Screen_Width * 0.9,
                marginHorizontal: 10,
                marginVertical: 10,
                position: 'absolute',
                bottom: 80
            },
            container: {
                marginVertical: 10,
            },
            dropdownButton: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor:COLOR.WHITE,
                elevation:3,shadowColor:COLOR.BLACK,marginHorizontal:3,
                padding: 10,
                borderRadius: 10,
                height:50
            },
            dropdownButtonText: {
                fontSize: 16,
                color: '#000',
            },
            categoryList: {
                marginTop: 5,
                backgroundColor: '#fff',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ddd',
                flex:1
            },
            categoryItem: {
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
            },
            categoryItemText: {
                fontSize: 16,
                color: '#000',
            },
            input2: {
             height: 50, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, borderColor: COLOR.BLACK, borderWidth: 1, color: COLOR.BLACK
            },
        });

        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
                    <View style={{  height: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}><AntDesign name="arrowleft" size={30} color={COLOR.BLACK} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setOpen(!open)} style={{ backgroundColor: COLOR.WHITE,elevation:3,shadowColor:COLOR.BLACK,marginHorizontal:3, height: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 5 }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', margin: 10 }}>
                            <Image source={{ uri: item?.photo }} style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 10 }} />
                            <Text style={{ fontSize: 16, color: COLOR.BLACK }}>{item?.name}</Text>
                        </View>
                        <AntDesign name={open ? "up" : "down"} size={27} color={COLOR.GRAY} />
                    </TouchableOpacity>
                    {open && (
                        <FlatList
                            data={data}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            style={{flex:1}}
                            keyExtractor={item => item.id}
                            renderItem={({ item: serviceItem }) => (
                                <TouchableOpacity onPress={() => handleSelect(serviceItem)} style={{ backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK, paddingHorizontal: 10, borderRadius: 15, height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',gap:20, marginVertical: 10, marginHorizontal: 5 }}>
                                    <Image source={{ uri: serviceItem.photo }} style={{ height: 50, width: 50, resizeMode: 'cover', marginVertical: 10, borderRadius: 10 }} />
                                    <Text style={{ fontSize: 16, color: COLOR.BLACK }}>{serviceItem?.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                    <View style={{ backgroundColor: COLOR.WHITE,elevation:3,shadowColor:COLOR.BLACK,marginHorizontal:3, height: 175, borderRadius: 10, marginVertical: 10, alignItems: 'center' }}>
                        <Image source={{ uri: item?.photo }} style={{ height: 150, width: 150, resizeMode: 'cover', margin: 10 }} />
                    </View>

                    <View style={{ backgroundColor: COLOR.WHITE,elevation:3,shadowColor:COLOR.BLACK,marginHorizontal:3, height: 80, borderRadius: 10, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 18 }}>Prices</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>$</Text>
                            <TextInput
                                placeholderTextColor={COLOR.GRAY}
                                style={{ fontSize: 20, color: COLOR.BLACK }}
                                value={price}
                                onChangeText={handlePriceChange}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>



                    <View style={styles.container}>
                    <TouchableOpacity onPress={() => setOpen2(!open2)} style={styles.dropdownButton}>
                        <Text style={styles.dropdownButtonText}>
                            {selectedCategory ? selectedCategory.name : 'Select Category'}
                        </Text>
                        <AntDesign name={open2 ? "up" : "down"} size={20} color="#000" />
                    </TouchableOpacity>

                    {open2 && (
                        <View style={styles.categoryList}>
                            <View style={styles.newCategoryInput}>
                                <TextInput
                                    style={styles.input2}
                                    placeholder="Add new category"
                                    value={newCategory}
                                    onChangeText={setNewCategory}
                                    placeholderTextColor={COLOR.GRAY}
                                />
                                <TouchableOpacity onPress={addNewCategory} style={{backgroundColor: COLOR.ORANGECOLOR,
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center',
                height: 40,
                marginHorizontal: 10,
                marginVertical: 10,
               }}>
                                    <Text style={{color:COLOR.WHITE}}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={categories}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelectCategory(item)} style={styles.categoryItem}>
                                        <Text style={styles.categoryItemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>



                    <View style={styles.input}>
                        <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 14, margin: 10 }}>Estimated Max duration in Minutes : <Text style={{ color: COLOR.ORANGECOLOR }}>{distance} min</Text></Text>
                        <Slider
                            style={{ width: '100%', marginTop: 10 }}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            minimumTrackTintColor={COLOR.BLACK}
                            maximumTrackTintColor={COLOR.BLACK}
                            thumbTintColor={COLOR.BLACK}
                            value={distance}
                            onValueChange={(value) => setDistance(value)}
                        />
                    </View>

                    <TextInput
                        placeholder="Enter description"
                        placeholderTextColor={COLOR.GRAY}
                        style={[styles.input, { color: COLOR.BLACK, textAlignVertical: 'top', padding: 10 }]}
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                    />
                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <RadioButton
                            label="Both"
                            selected={selectedGender === 'both'}
                            onPress={() => setSelectedGender('both')}
                        />
                        <RadioButton
                            label="Masculine"
                            selected={selectedGender === 'masculine'}
                            onPress={() => setSelectedGender('masculine')}
                        />
                        <RadioButton
                            label="Feminine"
                            selected={selectedGender === 'feminine'}
                            onPress={() => setSelectedGender('feminine')}
                        />
                    </View>

                    <View style={{ height: 160 }} />
                </ScrollView>
                <TouchableOpacity onPress={handleCreate} style={styles.button} disabled={isLoading}>
                    <Text style={{ color: COLOR.WHITE, fontSize: 16, textAlign: 'center' }}>
                        {isLoading ? "Creating..." : "Create Service"}
                    </Text>
                </TouchableOpacity>
            </>
        )
    }

    export default ProfSelectedDetailService