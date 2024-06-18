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
import FastImage from 'react-native-fast-image';

const FacilityDetalis = ({ route }) => {
  const { data } = route.params
  console.log('=======        data         ======>', data);
  const galleryImages = data.gallery;
  const coverImage = data.coverImage;
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const coordinates = data?.location?.coordinates;
  const longitude = coordinates ? coordinates[0] : 'N/A';
  const latitude = coordinates ? coordinates[1] : 'N/A';
  const shopTimingArray = Object.keys(data.timing).map((day) => ({
    day,
    ...data.timing[day],
  }));
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
      height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 10,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
          <Text style={styles.HeaderText}>{data?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilityProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <AntDesign name="setting" size={28} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <TouchableOpacity style={{ height: 50, width: 160, backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} onPress={() => navigation.navigate(NavigationScreens.FacilityManageSeatScreen,{data:data})}><Text style={{ size: 20, color: COLOR.WHITE }}>Manage seats</Text></TouchableOpacity>
        <TouchableOpacity style={{ height: 50, width: 160, backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} onPress={() => navigation.navigate(NavigationScreens.FacilityOnBoardingScreen)}><Text style={{ size: 20, color: COLOR.WHITE }}>Edit Facility</Text></TouchableOpacity>
      </View>

      {/* location */}

      <View
        style={{
          height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 20,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: COLOR.BLACK }}>1</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Location details</Text>
            <Text style={{ color: COLOR.BLACK }}>
              Location of your Facility
            </Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>
      <View
        style={{
          height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 20,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
       
      <Text style={{ color: 'black', fontSize: 14 }}>
        Longitude: {longitude}
      </Text>
      
      <Text style={{ color: 'black', fontSize: 14 }}>
        Latitude: {latitude}
      </Text>
    
      </View>

      {/* Address */}
      <View
        style={{
          height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 20,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: COLOR.BLACK }}>2</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Address</Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <KeyboardAvoidingView style={{ width: Screen_Width * 0.9 }}>
          <View>
            <Text
              style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 18 }}
            >
              Address
            </Text>
            <Text
              style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
            >
              Street
            </Text>
            <View style={styles.input}>
              <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                {data?.street}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
            >
              City
            </Text>
            <View style={styles.input}>
              <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                {data?.city}
              </Text>
            </View>
          </View>
          <View
            // style={{
            //   flexDirection: "row",
            //   justifyContent: "space-between",
            //   alignItems: "center",
            // }}
          >
            {/* <View>
              <Text
                style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
              >
                State / Province
              </Text>
              <View style={styles.input}>
                <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                  {data?.state}
                </Text>
              </View>
            </View> */}
            <View>
              <Text
                style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
              >
                Postal code
              </Text>
              <View style={styles.input}>
                <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                  {data?.postcode}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
            >
              Country/Region
            </Text>
            <View style={styles.input}>
              <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                {data?.country}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* name of facility */}

      <View
        style={{
          height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 20,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: COLOR.BLACK }}>3</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>
              Facility
            </Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>

      <View style={{ width: Screen_Width * 0.91, marginHorizontal: 2 }}>
        {/* <View>
          <Text
            style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
          >
            Facility Name
          </Text>
          <View style={styles.input}>
            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
              {data?.facilityName}
            </Text>
          </View>
        </View> */}

        <View>
          <Text
            style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
          >
           Description
          </Text>
          <View style={styles.input}>
            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
              {data?.description}
            </Text>
          </View>
        </View>
        <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
          <Text style={{ color: COLOR.BLACK, fontWeight: "bold" }}>
          Available seats number
          </Text>
        </View>
        <View style={styles.input}>
          <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
            {data?.availableSeats}
          </Text>
        </View>
      </View>

      {/* Add media */}

      <View
        style={{
          height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 20,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: COLOR.BLACK }}>4</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Add Media</Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>
      {coverImage && (
        <View
          style={{
            marginHorizontal: 5,
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Cover Image
          </Text>

          <FastImage
            source={{ uri: coverImage }}
            style={{
              width: Screen_Width * 0.28,
              height: Screen_Height * 0.13,
              borderRadius: 10,
            }}
          />
        </View>
      )}
      <View
        style={{
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: "600" }}>
          Gallery
        </Text>

        <FlatList
          data={galleryImages}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
              <FastImage
                source={{ uri: item }}
                style={{
                  width: Screen_Width * 0.28,
                  height: Screen_Height * 0.13,
                  borderRadius: 10,
                }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>

      {/* Shop timing */}
      <View
        style={{
          height: 50,
          borderRadius: 15,
          paddingHorizontal: 5,
          marginHorizontal: 2,
          marginVertical: 20,
          backgroundColor: COLOR.AuthField,
          elevation: 5,
          shadowColor: COLOR.BLACK,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 25,
              borderWidth: 1,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: COLOR.BLACK }}>5</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Shop Timing</Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>
      {/* <ShopTime /> */}
      <FlatList
        data={shopTimingArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: COLOR.BLACK }}>{item.day}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text style={{ color: COLOR.BLACK }}>
                    Start: {item.start}
                  </Text>
                  <Text style={{ color: COLOR.BLACK }}>End: {item.end}</Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: COLOR.BLACK,
                  marginVertical: 5,
                }}
              />
            </>
          );
        }}
      />

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
