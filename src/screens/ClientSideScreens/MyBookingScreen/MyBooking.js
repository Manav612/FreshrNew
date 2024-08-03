import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  GRADIENT_COLOR_DARK,
  GRADIENT_COLOR_LIGHT,
} from '../../../constants/Colors';
import {useSelector} from 'react-redux';
import {Screen_Height, Screen_Width} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AllCategoryData1} from '../../../components/utils';
import Cancelled from '../../../components/MyBookingDetails/Pending';
import Completed from '../../../components/MyBookingDetails/History';
import {NavigationScreens} from '../../../constants/Strings';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ongoing from '../../../components/MyBookingDetails/Ongoing';
import History from '../../../components/MyBookingDetails/History';
import Pending from '../../../components/MyBookingDetails/Pending';

const MyBooking = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedItem, setSelectedItem] = useState('Pending');
  const [selectedItem2, setSelectedItem2] = useState('');
  const refRBSheet = useRef([]);
  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };
  const handleSchedule = () => {
    setSelectedItem2(!selectedItem2);
    openBottomSheet();
  };
  const styles = StyleSheet.create({
    dot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: COLOR_LIGHT.GRAY,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: COLOR_LIGHT.ORANGECOLOR,
    },
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR_LIGHT.ORANGECOLOR,
      marginLeft: 10,
      borderRadius: 30,
      height: 35,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    selectedItem: {
      backgroundColor: COLOR_LIGHT.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '600',
      color: COLOR_LIGHT.ORANGECOLOR,
    },
    SelectedCategorytext: {
      color: COLOR_LIGHT.WHITE,
    },
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginHorizontal: 5,
      borderRadius: 30,
      height: 40,
      width: 110,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    selectedItem: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '500',
      fontSize: 14,
      color: COLOR.ORANGECOLOR,
    },
    SelectedCategorytext: {
      color: COLOR.WHITE,
    },
    CardContainer: {
      elevation: 2,
      backgroundColor: COLOR.WHITE,
      borderRadius: 25,
      height: Screen_Height * 0.14,
      width: Screen_Width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    CardImage: {
      width: 80,
      height: 80,
      resizeMode: 'cover',
      borderRadius: 15,
    },
    CardContain: {
      height: 90,
      width: 180,
      paddingVertical: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
  });

  const AllCategory = ({item, setSelectedItem}) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem === item.name && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item.name)}>
      <View style={{}}>
        <Text
          style={[
            styles.Categorytext,
            selectedItem === item.name && styles.SelectedCategorytext,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderScreen = () => {
    switch (selectedItem) {
      case 'Ongoing':
        return <Ongoing />;
      case 'Pending':
        return <Pending />;
      case 'History':
        return <History />;
      default:
        return null;
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: Screen_Width,
        height: Screen_Height,
        backgroundColor: COLOR.WHITE,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 15}}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLOR.BLACK}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK}}>
            My Bookings
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSchedule}
        style={{
          borderWidth: 2,
          borderColor: COLOR.ORANGECOLOR,
          backgroundColor: selectedItem2 ? COLOR.ORANGECOLOR : COLOR.WHITE,
          marginHorizontal: 5,
          borderRadius: 30,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: selectedItem2 ? COLOR.WHITE : COLOR.ORANGECOLOR,
            }}>
            Scheduled Appointments
          </Text>
          <AntDesign
            name="calendar"
            size={24}
            color={selectedItem2 ? COLOR.WHITE : COLOR.ORANGECOLOR}
          />
        </View>
      </TouchableOpacity>
      <View style={{paddingHorizontal: 15}}>
        <FlatList
          data={AllCategoryData1}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <AllCategory item={item} setSelectedItem={setSelectedItem} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{}}>
        <RBSheet
          ref={ref => (refRBSheet.current[0] = ref)}
          height={Screen_Height * 0.53}
          customStyles={{
            wrapper: {
              backgroundColor: COLOR.BLACK_40,
            },
            container: {
              backgroundColor: COLOR.WHITE,
              borderRadius: 40,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              elevation: 10,
              shadowColor: COLOR.BLACK,
            },
            draggableIcon: {
              backgroundColor: COLOR.BLACK,
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={{paddingHorizontal: 5, marginVertical: 10}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  width: 30,
                  height: 3,
                  backgroundColor: COLOR.BLACK,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: Screen_Width * 0.9,
                }}>
                <View style={{width: 30}} />
                <Text
                  style={{fontWeight: '600', fontSize: 25, color: COLOR.BLACK}}>
                  Appointments
                </Text>
                <TouchableOpacity onPress={() => refRBSheet.current[0].close()}>
                  <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLOR.LINECOLOR,
                width: Screen_Width,
                height: 2,
                marginVertical: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </RBSheet>
      </View>
      <View>{renderScreen()}</View>
    </ScrollView>
  );
};

export default MyBooking;

const styles = StyleSheet.create({});
