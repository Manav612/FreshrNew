import { StyleSheet, Text, View,ScrollView,Dimensions,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchLocation = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [region, setRegion] = useState(initialRegion);
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = Platform.OS === "IOS" ? 1.5 : 0.5;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA * Number(1 / 15),
    longitudeDelta: LONGITUDE_DELTA * Number(1 / 15),
  };

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color={COLOR.BLACK} />
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Search Location to add address</Text>
      </View>
      <GooglePlacesAutocomplete
          placeholder='Try JP Nagar,Siri Gardenia,etc,'
          minLength={2}
          styles={{
            textInput: {
              height: 50,
              marginHorizontal:2,
              backgroundColor: COLOR.WHITE,
              borderRadius: 15,
              elevation: 5,
              shadowColor: COLOR.BLACK,
              marginVertical: 10,
              color: COLOR.BLACK
            },
            
            predefinedPlacesDescription: {
              color: COLOR.BLACK,
            },
            description: {
              color: COLOR.BLACK,
            },
            row: {
              backgroundColor: COLOR.DarkBackground,
            },
            separator: {
              backgroundColor: COLOR.GRAY,
              height: 1,
            },
          }}
          onPress={(data, details) => {
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
              longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
            });
            console.log("=-=-=-=", data);
            _map.current?.animateToRegion(
              {
                latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
                longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            );
          }}
          autoFocus={false}
          listViewDisplayed={false}
          keepResultsAfterBlur={false}
          returnKeyType={"default"}
          fetchDetails={true}
          GooglePlacesDetailsQuery={{
            rankby: "distance",
          }}
          query={{
            key: "AIzaSyCs3kyGiiVDcIn3KZ6aKCRDVe66EZKh9qU",
            language: "en",
            radius: 30000,
            location: `${region?.latitude}, ${region?.longitude}`,
          }}
        />
     
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Entypo name="direction" size={25} color={COLOR.ORANGECOLOR} />
          <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.ORANGECOLOR }}>Use my current location</Text>
        </View>
        <AntDesign name="right" size={20} color={COLOR.GRAY} />
      </TouchableOpacity>
      </ScrollView>
  )
}

export default SearchLocation

const styles = StyleSheet.create({})