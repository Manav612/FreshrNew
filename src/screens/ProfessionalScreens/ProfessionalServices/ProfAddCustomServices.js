import { ScrollView, StyleSheet, Text, View, Modal, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
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
import ImagePicker from 'react-native-image-crop-picker'
import { CheckPermission } from '../../../constants/CheckPermission';
import { PERMISSIONS } from 'react-native-permissions';

const ProfAddCustomServices = ({ route }) => {

    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme === 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [distance, setDistance] = useState('');
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGender, setSelectedGender] = useState('both');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const [imageUri, setImageUri] = useState('');
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [name, setName] = useState(false);
    const styles = StyleSheet.create({
        input: {
            width: Screen_Width * 0.89, height: 100, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, borderColor: COLOR.BLACK, borderWidth: 1, color: COLOR.BLACK
        },
        input2: {
            width: Screen_Width * 0.89, height: 50, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, borderColor: COLOR.BLACK, borderWidth: 1, color: COLOR.BLACK
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
            // backgroundColor: COLOR.ROYALBLUE,

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
        button: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: COLOR.BLACK,
            fontSize: 18,
            fontWeight: '700',
        },
    });

    const handlePriceChange = (text) => {
        const numericPrice = parseFloat(text);
        if (text === '' || isNaN(numericPrice)) {
            setPrice(text);
        } else if (numericPrice < 10) {
            Alert.alert(
                "Invalid Price",
                "Please enter a minimum price. The minimum price is 10$."
            );
        } else {
            setPrice(text);
        }
    };

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

    // const handlePriceChange = (text) => {
    //     if (text === '' || (parseFloat(text) > 10)) {
    //         setPrice(text);
    //     } else {
    //         Alert.alert(
    //             "Invalid Price",
    //             `Please enter a price greater than or equal to 10$`
    //         );
    //     }
    // };


    return (
        <>
            <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
                <View style={{ width: Screen_Width * 0.89, height: 60, borderRadius: 10, marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><AntDesign name="arrowleft" size={30} color={COLOR.BLACK} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.89, height: 60, borderRadius: 10, marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 5 }}>
                    <View style={{ gap: 10, alignItems: 'center', margin: 10 }}>
                    <Image source={{ uri: imageUri }} style={{height:80,width:80}} />
                        <TextInput
                            style={{color:COLOR.BLACK}}
                            placeholder="Name of service"
                            placeholderTextColor={COLOR.GRAY}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                </TouchableOpacity> */}

                <View style={{ marginVertical: 10, alignItems: 'center' }}>
                    <View style={styles.imageInnerContainer}>

                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <Text style={styles.ImageText}>No Image selected</Text>
                        )}
                        <TouchableOpacity onPress={CameraHandle} style={styles.cameraButton}>
                            <AntDesign name="camera" size={18} color={COLOR.ORANGECOLOR} />
                        </TouchableOpacity>
                    </View>

                </View>
                <TextInput
                    style={styles.input2}
                    placeholder="Name of service"
                    placeholderTextColor={COLOR.GRAY}
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <TextInput
                    placeholderTextColor={COLOR.GRAY}
                    placeholder='Price'
                    style={styles.input2}
                    value={price}
                    onChangeText={handlePriceChange}
                    keyboardType="numeric"
                />


                <View style={{ width: Screen_Width * 0.89, height: 100, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, borderColor: COLOR.BLACK, borderWidth: 1 }}>
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
                    onChangeText={text => setDescription(text)}
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
                                <AntDesign name="closecircle" size={30} color={COLOR.BLACK} />
                            </TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={onCapturePress}
                                    style={styles.button}
                                >
                                    <AntDesign name="camera" size={40} color={COLOR.BLACK} />
                                    <Text style={styles.buttonText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onUploadPress}
                                    style={styles.button}
                                >
                                    <AntDesign name="upload" size={40} color={COLOR.BLACK} />
                                    <Text style={styles.buttonText}>Upload</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ height: 160 }} />
            </ScrollView>
            {/* <TouchableOpacity onPress={handleCreate} style={styles.button} disabled={isLoading}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16, textAlign: 'center' }}>
                    {isLoading ? "Creating..." : "Create Service"}
                </Text>
            </TouchableOpacity> */}
        </>
    )
}

export default ProfAddCustomServices
