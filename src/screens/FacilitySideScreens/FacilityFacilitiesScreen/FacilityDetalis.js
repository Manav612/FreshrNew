import { FlatList, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConfirmationForCreateFacilitie from '../OnBoardingScreens/ConfirmationForCreateFacilitie/ConfirmationForCreateFacilitie';
import { NavigationScreens } from '../../../constants/Strings';
import { Servicesdata3 } from '../../../components/utils';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';

const FacilityDetalis = ({ route }) => {
  const { data } = route.params
  console.log('=============>', data);
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [seatCount, setSeatCount] = useState(1);

  const [facilityName, setFacilityName] = useState('');
  const [description, setdescription] = useState('');

  const handleCountPlus = () => {
    setSeatCount(seatCount + 1)
  }
  const handleCountMinus = () => {
    if (seatCount > 1) {
      setSeatCount(seatCount - 1);
    }
  }
  const handleStreetChange = (text) => {
    setStreet(text);
  };
  const handleApartmentChange = (text) => {
    setApartment(text);
  };
  const handleCityChange = (text) => {
    setCity(text);
  };
  const handleStateChange = (text) => {
    setState(text);
  };
  const handlePostalCodeChange = (text) => {
    setPostalCode(text);
  };
  const handleCountryChange = (text) => {
    setCountry(text);
  };
  const handleFacilityNameChange = (text) => {
    setFacilityName(text);
  };
  const handleDescriptionChange = (text) => {
    setdescription(text);
  };


  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 5
    },
    input: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 15,
      elevation: 5,
      shadowColor: COLOR.BLACK,
      marginVertical: 5
    },
    halfInput: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 15,
      elevation: 5,
      shadowColor: COLOR.BLACK,
      marginVertical: 5,
      width: Screen_Width * 0.35
    },
    icon: {
      marginRight: 10,
    },
    rememberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    button: {
      backgroundColor: COLOR.ORANGECOLOR,
      justifyContent: 'center',
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 20,
      height: 40,
    },
    buttonText: {
      color: COLOR.WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    },
    HeaderView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    HeaderText: { color:COLOR.BLACK, fontSize: 22, fontWeight: '600', marginLeft: 10 },
  });


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, paddingVertical: 10,backgroundColor:COLOR.WHITE }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.HeaderView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>{data.name}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilitySettingScreen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <AntDesign name="setting" size={28} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <TouchableOpacity style={{ height: 50, width: 160, backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}><Text style={{ size: 20, color: COLOR.WHITE }}>Manage seats</Text></TouchableOpacity>
        <TouchableOpacity style={{ height: 50, width: 160, backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} onPress={() => navigation.navigate(NavigationScreens.FacilityOnBoardingScreen)}><Text style={{ size: 20, color: COLOR.WHITE }}>Edit Facility</Text></TouchableOpacity>
      </View>

      {/* location */}

      <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
            <Text style={{ color: COLOR.BLACK }}>1</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Location details</Text>
            <Text style={{ color: COLOR.BLACK }}>Location of your Facility</Text>
          </View>
        </View>
        <Text style={{ color: COLOR.BLACK }}>Edit</Text>

      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 6,
            width: 6,
            borderRadius: 50,
            backgroundColor: COLOR.BLACK,
          }}></View>
        <View
          style={{
            height: 1,
            backgroundColor: COLOR.BLACK,
            width: Screen_Width * 0.88,
          }}></View>
        <View
          style={{
            height: 6,
            width: 6,
            borderRadius: 50,
            backgroundColor: COLOR.BLACK,
          }}></View>
      </View>
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
        <View style={{ width: Screen_Width * 0.5 }}>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Select Location</Text>
          <Text style={{ color: COLOR.BLACK, fontSize: 10 }}>Please check that your Facility location is shown on Google Maps.</Text>
        </View>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.2, height: 40, borderRadius: 20 }}>
          <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>Find By Map</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50, borderRadius: 15, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK }} />

      {/* Address */}
      <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
            <Text style={{ color: COLOR.BLACK }}>2</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Add Address</Text>
          </View>
        </View>
        <Text style={{ color: COLOR.BLACK }}>Edit</Text>

      </View>


      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <KeyboardAvoidingView style={{ width: Screen_Width * 0.9 }}>
          <View>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>Add Address</Text>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Street</Text>
            <TextInput
              style={[styles.input]}
              placeholder={street}
              placeholderTextColor={COLOR.BLACK}
              value={street}
              onChangeText={handleStreetChange}

            />
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Apartment, Suite ( Optional)</Text>
            <TextInput
              style={[styles.input]}
              placeholder={apartment}
              placeholderTextColor={COLOR.BLACK}
              value={apartment}
              onChangeText={handleApartmentChange}

            />
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>City</Text>
            <TextInput
              style={[styles.input]}
              placeholder={city}
              placeholderTextColor={COLOR.BLACK}
              value={city}
              onChangeText={handleCityChange}

            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>State / Province</Text>
              <TextInput
                style={[styles.halfInput]}
                placeholder={state}
                placeholderTextColor={COLOR.BLACK}
                value={state}
                onChangeText={handleStateChange}

              />
            </View>
            <View>
              <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Postal code</Text>
              <TextInput
                style={[styles.halfInput]}
                placeholder={postalCode}
                placeholderTextColor={COLOR.BLACK}
                value={postalCode}
                onChangeText={handlePostalCodeChange}

              />
            </View>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Country/Region</Text>
            <TextInput
              style={[styles.input]}
              placeholder={country}
              placeholderTextColor={COLOR.BLACK}
              value={country}
              onChangeText={handleCountryChange}

            />
          </View>
        </KeyboardAvoidingView>
      </View >

      {/* name of facility */}

      <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
            <Text style={{ color: COLOR.BLACK }}>3</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Facility Name / Description</Text>
          </View>
        </View>
        <Text style={{ color: COLOR.BLACK }}>Edit</Text>

      </View>

      <View style={{ width: Screen_Width * 0.91, marginHorizontal: 2 }} >

        <View>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Facility Name</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Name"
            placeholderTextColor={COLOR.BLACK}
            value={facilityName}
            onChangeText={handleFacilityNameChange}

          />
        </View>

        <View>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Facility's Description</Text>
          <TextInput
            style={[styles.input]}
            placeholder="description"
            placeholderTextColor={COLOR.BLACK}
            value={description}
            onChangeText={handleDescriptionChange}

          />
        </View>
        <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
          <Text style={{ color: COLOR.BLACK, fontWeight: 'bold' }}>Set seats number</Text>
          <Text style={{ color: COLOR.BLACK, fontSize: 12 }}>How many seats do you want to make available here</Text>
        </View>
        <View style={{
          backgroundColor: COLOR.AuthField,
          borderRadius: 15,
          elevation: 5,
          height: 50,
          paddingHorizontal: 10,
          shadowColor: COLOR.BLACK,
          marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>

          <TouchableOpacity onPress={handleCountMinus}>
            <AntDesign name="minuscircle" size={24} color={COLOR.ORANGECOLOR} />
          </TouchableOpacity>
          <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '700' }}>{seatCount}</Text>
          <TouchableOpacity onPress={handleCountPlus}>
            <AntDesign name="pluscircle" size={24} color={COLOR.ORANGECOLOR} />
          </TouchableOpacity>


        </View>

      </View>


      {/* Add media */}


      <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
            <Text style={{ color: COLOR.BLACK }}>4</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Add Media</Text>
          </View>
        </View>
        <Text style={{ color: COLOR.BLACK }}>Edit</Text>

      </View>
      <FlatList
        data={Servicesdata3}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        key={3}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5, marginVertical: 10 }}>
              <Image source={item.image} style={{ width: Screen_Width * 0.28, height: Screen_Height * 0.13, borderRadius: 10 }} />
            </View>
          )
        }}
      />

      {/* Shop timing */}
      <View style={{ height: 50, borderRadius: 15, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderWidth: 1, borderRadius: 20 }}>
            <Text style={{ color: COLOR.BLACK }}>5</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Shop Timing</Text>
          </View>
        </View>
        <Text style={{ color: COLOR.BLACK }}>Edit</Text>

      </View>
      {/* <ShopTime /> */}

      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(NavigationScreens.FacilityConnectStripeScreen)}>
          <Text style={styles.buttonText}>Confirmation for create facilitie</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export default FacilityDetalis
