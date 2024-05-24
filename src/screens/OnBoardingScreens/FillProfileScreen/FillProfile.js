import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Image
} from 'react-native';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker'
import { CheckPermission } from '../../../constants/CheckPermission';
import { PERMISSIONS } from 'react-native-permissions';
const FillProfile = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const phoneInput = useRef(null);
  const [value, setValue] = useState('');
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [imageUri, setImageUri] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  //   useEffect(() => {
  //     // Call uploadImages when selected images are ready to be uploaded
  //     uploadImages();
  // }, [imageUri]);
  // const uploadImageToFirebaseStorage = async (imageUri, imageName) => {
  //     const reference = storage().ref(`images/${imageName}`);
  //     try {
  //         await reference.putFile(imageUri);
  //         console.log('Image uploaded to Firebase Storage successfully.');
  //         const downloadURL = await reference.getDownloadURL();
  //         console.log('Download URL:', downloadURL);
  //         setImageUrl(downloadURL);
  //         return downloadURL;
  //     } catch (error) {
  //         console.error('Error uploading image to Firebase Storage:', error);
  //         throw error;
  //     }
  // }
  // const uploadImages = async () => {
  //     try {
  //         if (imageUri) {


  // const date=Date.now();//1710654986005
  // console.log(date);
  //             const imageUrl1 = await uploadImageToFirebaseStorage(imageUri, `image1-${date}.jpg`);
  //             console.log('Image 1 URL:', imageUrl1);
  //             // setImageUrl(imageUrl1)
  //         }
  //     } catch (error) {
  //         console.error('Error uploading images:', error);
  //     }
  // };

  const handleContinue = () => {
    if (!firstName || !lastName || !email || !address || !gender || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    navigation.navigate('Home Tab');
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
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      borderWidth: 1,
      borderColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 5
    },
    input: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: COLOR.BLACK
    },
    icon: {
      marginRight: 10
    },
    rememberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    },
    dropdownContainer: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLOR.AuthField,
      padding: 10
    },
    dropdown: {
      height: 50,
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
      color: COLOR.BLACK_40
    },
    selectedTextStyle: {
      fontSize: 16,
      color: COLOR.BLACK
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    icon: {
      marginRight: 10
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    dropdownItemSelected: {
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    ImageText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLOR.BLACK,
      textAlign:'center'
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
      marginBottom:20
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
   
    iconStyle: {
      width: 20,
      height: 20,
    },
    errorText: {
      color: COLOR.ROYALGOLDEN
    }
  });

  return (
    <ScrollView
      style={{ backgroundColor: COLOR.WHITE, height: Screen_Height, width: Screen_Width }}
    >
      <View style={{ margin: 20, flexDirection: 'row', gap: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, color: COLOR.BLACK, fontWeight: 'bold' }}>
          Fill Your Profile
        </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        <View style={{ width: Screen_Width, paddingHorizontal: 15 }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={COLOR.BLACK_40}
              onFocus={() => setIsFirstNameFocused(true)}
              onBlur={() => setIsFirstNameFocused(false)}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={COLOR.BLACK_40}
              onFocus={() => setIsLastNameFocused(true)}
              onBlur={() => setIsLastNameFocused(false)}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLOR.BLACK_40}
              onFocus={() => setIsEmail(true)}
              onBlur={() => setIsEmail(false)}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor={COLOR.BLACK_40}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLOR.BLACK_40}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={COLOR.BLACK_40}
              secureTextEntry
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={theme === 1 ? { color: COLOR_LIGHT.BLACK } : { color: COLOR_DARK.WHITE }}
              selectedItemTextStyle={theme === 1 ? { color: COLOR_LIGHT.BLACK } : { color: COLOR_DARK.WHITE }}
              data={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              value={gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGender(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            containerStyle={{
              backgroundColor: COLOR.AuthField,
              height: 68,
              width: Screen_Width * 0.92,
              marginBottom: 20,
              borderRadius: 10
            }}
            textContainerStyle={{
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10
            }}
            textInputProps={{ fontSize: 12 }}
            codeTextStyle={{ fontSize: 12 }}
          />

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 35,
              backgroundColor: COLOR.ORANGECOLOR,
              marginTop: 10
            }}
            onPress={handleContinue}
          >
            <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
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
    </ScrollView>
  );
};

export default FillProfile;

