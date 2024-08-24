import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationScreens } from '../../../constants/Strings';
import ImagePicker from 'react-native-image-crop-picker'
import { CheckPermission } from '../../../constants/CheckPermission';
import { PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import { UpdateServiceData } from '../../../redux/ServicesData/ServicesDataAction';

const ProfSelectedDetailService = ({ route }) => {
    const { item, data } = route.params;
    console.log("=================   item   ===================", item);

    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [distance, setDistance] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);

    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [serviceName, setServiceName] = useState('');


    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [price, setPrice] = useState(item.price || '');
    const [description, setDescription] = useState(item.description || '');
    const [imageUri, setImageUri] = useState(item.photo || '');
    const [duration, setDuration] = useState(item.totalMinutes ? item.totalMinutes.toString() : '');
    const initialGender = () => {
        if (item.forMale && item.forFemale) {
            return 'both';
        } else if (item.forMale) {
            return 'masculine';
        } else if (item.forFemale) {
            return 'feminine';
        }
        return ''; // Default value if neither is set
    };
    const [selectedGender, setSelectedGender] = useState(initialGender());

    useEffect(() => {
        if (selectedGender === 'masculine' || selectedGender === 'both') {
            setMinPrice(item.male.minPrice);
            setMaxPrice(item.male.maxPrice);
            setDuration(item.male.averageDuration.toString());
        } else if (selectedGender === 'feminine') {
            setMinPrice(item.female.minPrice);
            setMaxPrice(item.female.maxPrice);
            setDuration(item.female.averageDuration.toString());
        }
    }, [selectedGender]);
    // Determine the initial gender selection





    const RadioButton = ({ label, selected, onPress, disabled }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                opacity: disabled ? 0.5 : 1
            }}
            onPress={() => {
                onPress();
                if (label === 'Masculine' || label === 'Both') {
                    setDuration(item.male.averageDuration.toString());
                } else if (label === 'Feminine') {
                    setDuration(item.female.averageDuration.toString());
                }
            }}
        >
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

    const CameraHandle = async () => {
        const granted = await CheckPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        console.log("-------------111111-", granted);

        setImageModalVisible(!imageModalVisible)
    };

    const onUploadPress = async () => {
        const granted = await CheckPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        console.log("-----------22222---", granted);

        if (granted == true || Platform.OS == 'ios') {
            ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                cropperToolbarTitle: 'Crop Image',
                hideBottomControls: true,
                enableRotationGesture: true,
                showCropGuidelines: false,
                compressImageQuality: 0.9,
            }).then(image => {
                setImageModalVisible(false);
                setImageUri(image.path);
            }).catch((e) => {
                setImageModalVisible(false);
                console.log(e);
            })
        }
    }

    const onCapturePress = async () => {
        setImageModalVisible(false);
        const granted = await CheckPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.CAMERA :
                PERMISSIONS.ANDROID.CAMERA
        );
        console.log("-----------3333333---", granted);
        if (granted == true || Platform.OS == 'ios') {
            ImagePicker.openCamera({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                cropperToolbarTitle: 'Crop Image',
                hideBottomControls: true,
                enableRotationGesture: true,
                showCropGuidelines: false,
                compressImageQuality: 0.9,

            }).then(image => {
                setImageModalVisible(false);
                setImageUri(image.path);
            }).catch((e) => {
                setImageModalVisible(false);
                console.log(e);
            })
        }
    }


    const handleCreate = async () => {
        const numPrice = parseFloat(price);
        if (isNaN(numPrice) || numPrice < minPrice || (maxPrice > 0 && numPrice > maxPrice)) {
            Alert.alert(
                "Invalid Price",
                `Please enter a valid price between ${minPrice} and ${maxPrice || 'any amount above'}.`
            );
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
                name: serviceName,
                category: item._id,
                description: description,
                photo: imageUri,
                forMale: selectedGender,
                forFemale: selectedGender,
                price: price,
                hours: Math.floor(duration / 60),
                minutes: duration % 60,
                totalMinutes: duration

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

    const handleChange = (text) => {
        // If the input starts with a dollar sign, remove it for processing
        const numericValue = text.replace(/[^0-9.]/g, '');

        // Update the state with the dollar sign prepended
        setPrice('$' + numericValue);
    };

    const handleChangeDuration = (text) => {
        // Remove the "min" suffix and any non-numeric characters
        const numericValue = text.replace(/[^0-9]/g, '');

        // Update the state with the numeric value followed by " min"
        setDuration(numericValue ? numericValue + ' min' : '');
    };


    const styles = StyleSheet.create({
        input: {
            height: 100, borderRadius: 10, marginVertical: 10, backgroundColor: COLOR.WHITE,
            elevation: 3, shadowColor: COLOR.BLACK, marginHorizontal: 3, color: COLOR.BLACK
        },
        ImageText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: COLOR.BLACK,
            textAlign: 'center'
        },
        imageContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 },
        imageInnerContainer: {
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: COLOR.ORANGECOLOR,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            shadowColor: COLOR.ORANGECOLOR,
            position: 'relative',
            marginBottom: 20
        },
        image: {
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        cameraButton: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK,
            borderRadius: 25,
            height: 30,
            width: 30,
            position: 'absolute',
            right: 1,
            bottom: 1,
        },
        modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        },
        innerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '20%',
            width: '80%',
            backgroundColor: COLOR.ORANGECOLOR,
            borderRadius: 15,
        },
        closeButton: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
        },
        buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 30,
        },
        button2: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: COLOR.WHITE,
            fontSize: 18,
            fontWeight: '700',
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
            backgroundColor: COLOR.WHITE,
            elevation: 3, shadowColor: COLOR.BLACK, marginHorizontal: 3,
            padding: 10,
            borderRadius: 10,
            height: 50
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
            flex: 1
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
        input3: {
            height: 50, borderRadius: 10, marginHorizontal: 2, marginVertical: 10, color: COLOR.BLACK, backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK
        },
    });

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
                <View style={{ height: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}><AntDesign name="arrowleft" size={28} color={COLOR.BLACK} /></TouchableOpacity>
                        <Text style={{ color: COLOR.BLACK, fontSize: 24, fontWeight: '600' }}>Create Service</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: COLOR.BLACK }}>
                    Selected Category
                </Text>

                <TouchableOpacity onPress={() => setOpen(!open)} style={{ backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK, marginHorizontal: 3, height: 60, borderRadius: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 5, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', margin: 10 }}>
                        <Text style={{ fontSize: 16, color: COLOR.BLACK }}>{item?.name}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>
                    Service Name
                </Text>

                <TextInput
                    placeholder='Enter service name'
                    placeholderTextColor={COLOR.GRAY}
                    style={styles.input3}
                    value={serviceName}
                    onChangeText={text => setServiceName(text)}
                />

                <View style={{ backgroundColor: COLOR.WHITE, elevation: 3, shadowColor: COLOR.BLACK, marginHorizontal: 3, height: Screen_Height * 0.3, borderRadius: 10, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={{ height: 150, width: 150, resizeMode: 'cover', margin: 10 }} />
                    ) : <View><Text style={{ color: COLOR.BLACK, marginVertical: 20 }}>There is no image!</Text></View>}
                    <TouchableOpacity onPress={CameraHandle} style={{ borderRadius: 15, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, width: Screen_Width * 0.6, height: 40 }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: 'bold' }}>Choose service image</Text>
                        <AntDesign name="camera" size={18} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>
                    Price ($)
                </Text>

                <TextInput
                    placeholder='Enter price'
                    placeholderTextColor={COLOR.GRAY}
                    style={styles.input3}
                    value={price}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>
                    Service Duration (min)
                </Text>
                <TextInput
                    style={styles.input3}
                    keyboardType="numeric"
                    placeholder="Enter estimated service duration in minutes"
                    placeholderTextColor={COLOR.GRAY}
                    value={duration}
                    onChangeText={handleChangeDuration}
                />

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>
                    Description
                </Text>

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
                <Modal
                    transparent
                    visible={imageModalVisible}
                    animationType='slide'
                    statusBarTranslucent
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <TouchableOpacity
                                onPress={() => setImageModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <AntDesign name="closecircle" size={30} color={COLOR.WHITE} />
                            </TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={onCapturePress}
                                    style={styles.button2}
                                >
                                    <AntDesign name="camera" size={40} color={COLOR.WHITE} />
                                    <Text style={styles.buttonText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onUploadPress}
                                    style={styles.button2}
                                >
                                    <AntDesign name="upload" size={40} color={COLOR.WHITE} />
                                    <Text style={styles.buttonText}>Upload</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ height: 160 }} />
            </ScrollView>
            <TouchableOpacity
                onPress={handleCreate}
                style={styles.button} disabled={isLoading}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16, textAlign: 'center' }}>
                    {isLoading ? "Creating..." : "Create Service"}
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default ProfSelectedDetailService