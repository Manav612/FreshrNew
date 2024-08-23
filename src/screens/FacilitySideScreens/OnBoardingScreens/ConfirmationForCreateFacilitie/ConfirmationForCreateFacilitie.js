import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Media,
  OnBoard1,
  OnBoard2,
  OnBoard3,
  OnBoard4,
  Splash,
  SplashImage,
} from "../../../../constants/Icons";
import FastImage from "react-native-fast-image";
import { Screen_Height, Screen_Width } from "../../../../constants/Constants";
import Onboarding from "react-native-onboarding-swiper";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOR_DARK, COLOR_LIGHT } from "../../../../constants/Colors";
import { NavigationScreens } from "../../../../constants/Strings";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Servicesdata3 } from "../../../../components/utils";
import ShopTime from "../../../../components/ShopTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_API_URL } from "../../../../Services";
import axios from "axios";
import mime from "mime";

const ConfirmationForCreateFacilitie = () => {
  const route = useRoute();
  const { facilityData } = route.params;
  const galleryImages = facilityData.galleryImageUris;
  const coverImage = facilityData.coverImageUri;
  console.log("========== ====");
  console.log("==== facilityData  =======>", facilityData);
  const shopTimingArray = Object.keys(facilityData.timeData).map((day) => ({
    day,
    ...facilityData.timeData[day],
  }));

  console.log("======  images ====", galleryImages);
  const theme = useSelector((state) => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 5,
    },
    input: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 15,
      elevation: 5,
      height: 50,
      justifyContent: "center",
      padding: 10,
      shadowColor: COLOR.BLACK,
      marginVertical: 5,
    },
    halfInput: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 15,
      elevation: 5,
      shadowColor: COLOR.BLACK,
      marginVertical: 5,
      width: Screen_Width * 0.35,
    },
    icon: {
      marginRight: 10,
    },
    rememberContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    button: {
      backgroundColor: COLOR.ORANGECOLOR,
      justifyContent: "center",
      borderRadius: 25,
      alignItems: "center",
      marginVertical: 20,
      height: 40,
    },
    buttonText: {
      color: COLOR.WHITE,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  const handleConfirmData = async () => {
    try {
      const formData = new FormData();


      const token = await AsyncStorage.getItem("AuthToken");
      console.log("=============>", token);

      galleryImages.map((data, i) => {
        formData.append("gallery", geneateFile(data, i));
      });

      formData.append(
        "coverImage",
        geneateFile(facilityData.coverImageUri, -1)
      );

      console.log("From Data : ", formData);

      const config = {
        method: "post",
        url: `${BASE_API_URL}/images/facilities`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData
      };

      const uploadRes = await axios(config)
        .catch((e) => {
          console.error(e);
        });


      if (uploadRes && uploadRes?.data) {
        let params = uploadRes?.data?.urls;

        params["timing"] = facilityData.timeData;
        params["name"] = facilityData.facilityName;
        // params["region"] = "abc";
        // params["country"] = facilityData.country;
        // params["street"] = facilityData.street;
        // params["city"] = facilityData.city;
        params["coords"] = [
          facilityData.rState.region.latitude,
          facilityData.rState.region.longitude,
        ];
        params["address"] = facilityData.address;
        params["formattedAddress"] = facilityData.formattedAddress;
        params["apartment"] = facilityData.apartment;
        // params["postcode"] = facilityData.postalCode;
        params["description"] = facilityData.description;
        params["seatCapacity"] = 10;
        params["availableSeats"] = facilityData.seatCount;
        console.log("Upload Res : ", params);

        const db_config = {
          method: "post",
          url: `${BASE_API_URL}/hosts/host/facilities`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: params
        };

        const res = await axios(db_config)
          .catch((e) => {
            console.error(e);
          });
        console.log("Res :", res?.data);

      }

      if (formData) {
        navigation.navigate(NavigationScreens.FacilityConnectStripeScreen)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const geneateFile = (img, i) => {
    const uri = img;
    const filename = img.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const file = {
      uri,
      name: `image${i}.${ext}`,
      type: mime.getType(uri),
    };
    return file;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: Screen_Width,
        height: Screen_Height,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLOR.WHITE,
      }}
    >
      <View
        style={{
          width: Screen_Width,
          height: Screen_Height * 0.05,
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={30}
          color="black"
        />
        <Text style={{ fontWeight: "600", fontSize: 25, color: COLOR.BLACK }}>
          Confirm Details
        </Text>
      </View>
      {/* location */}

      {/* <View
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
       
      </View> */}
      {/* <View
        style={{
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
        }}
      >

        <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
          Longitude: {
            String(facilityData?.rState?.region?.longitude).length > 10
              ? String(facilityData?.rState?.region?.longitude).slice(0, 10) + '...'
              : facilityData?.rState?.region?.longitude
          }
        </Text>
        <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
          {" "}
          Latitude: {
            String(facilityData?.rState?.region?.latitude).length > 10
              ? String(facilityData?.rState?.region?.latitude).slice(0, 10) + '...'
              : facilityData?.rState?.region?.latitude
          }
        </Text>

      </View> */}

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
            <Text style={{ color: COLOR.BLACK }}>1</Text>
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
            <View style={{
              backgroundColor: COLOR.AuthField,
              borderRadius: 15,
              elevation: 5,
              height: 100,
              justifyContent: 'flex-start',
              padding: 10,
              shadowColor: COLOR.BLACK,
              marginVertical: 5,
            }}>
              <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                {facilityData?.apartment} , {facilityData?.formattedAddress}

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
            <Text style={{ color: COLOR.BLACK }}>2</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>
              Facility Name / Description
            </Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>

      <View style={{ width: Screen_Width * 0.91, marginHorizontal: 2 }}>
        <View>
          <Text
            style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
          >
            Facility Name
          </Text>
          <View style={styles.input}>
            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
              {facilityData?.facilityName}
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{ color: COLOR.BLACK, fontWeight: "bold", fontSize: 14 }}
          >
            Facility's Description
          </Text>
          <View style={styles.input}>
            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
              {facilityData?.description}
            </Text>
          </View>
        </View>
        <View style={{ width: Screen_Width * 0.6, marginBottom: 10 }}>
          <Text style={{ color: COLOR.BLACK, fontWeight: "bold" }}>
            Selected seats number
          </Text>
        </View>
        <View style={styles.input}>
          <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
            {facilityData?.seatCount}
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
            <Text style={{ color: COLOR.BLACK }}>3</Text>
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
          <ImageBackground
            source={{ uri: coverImage }}
            style={{
              width: Screen_Width * 0.9,
              height: Screen_Height * 0.15,
              borderRadius: 10,
            }}
          >
            <View style={{ padding: 10, backgroundColor: COLOR.BLACK_70, justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.3, height: 40 }}>
              <Text
                style={{
                  color: COLOR.WHITE,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Cover Image
              </Text>
            </View>
          </ImageBackground>
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
            <Text style={{ color: COLOR.BLACK }}>4</Text>
          </View>
          <View>
            <Text style={{ color: COLOR.BLACK }}>Shop Hours</Text>
          </View>
        </View>
        {/* <Text style={{ color: COLOR.BLACK }}>Edit</Text> */}
      </View>
      {/* <ShopTime /> */}
      <FlatList
        data={shopTimingArray}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
        scrollEnabled={false}
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

      <TouchableOpacity style={styles.button} onPress={handleConfirmData}>
        <Text style={styles.buttonText}>Create facility</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfirmationForCreateFacilitie;
