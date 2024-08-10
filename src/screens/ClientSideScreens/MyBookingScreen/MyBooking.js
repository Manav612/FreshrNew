import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  GRADIENT_COLOR_DARK,
  GRADIENT_COLOR_LIGHT,
} from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AllCategoryData1 } from '../../../components/utils';
import Cancelled from '../../../components/MyBookingDetails/Pending';
import Completed from '../../../components/MyBookingDetails/History';
import { NavigationScreens } from '../../../constants/Strings';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ongoing from '../../../components/MyBookingDetails/Ongoing';
import History from '../../../components/MyBookingDetails/History';
import Pending from '../../../components/MyBookingDetails/Pending';
import socketServices from '../../../Services/Socket';
import Tooltip from 'react-native-walkthrough-tooltip';
const MyBooking = ({ route }) => {
  const socketData = route?.params?.socketData
  // console.log("===========     pass sssss      ==============", socketData);

  const navigation = useNavigation();

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedItem, setSelectedItem] = useState('Pending');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [orderData, setOrderData] = useState()
  const [id, setId] = useState('');
  const [showTip, setShowTip] = useState(false);
  const [showTip2, setShowTip2] = useState(false);
  const [showTip3, setShowTip3] = useState(false);
  const [showTip4, setShowTip4] = useState(false);
  const [directionModalVisible, setDirectionModalVisibility] = useState(false);

  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const refRBSheet = useRef([]);

  const handleSchedule = () => {
    setSelectedItem2(!selectedItem2);
    openBottomSheet();
  };

  useEffect(() => {
    socketServices.on('payment_Done', data => {
      console.log('==== payment done 7777777777777777777 ======', data);
      setDirectionModalVisibility(true)

    });

  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      setId(timerId);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const openBottomSheet = () => {
    refRBSheet?.current?.open();

  };

  const closeBottomSheet = () => {
    clearTimeout(id);
    refRBSheet?.current?.close();

  };

  useEffect(() => {

    socketServices.on('accept_order', data => {
      console.log(
        '====  Order Accepted ======', data,
      );
      openBottomSheet()
      setOrderData(data)
      // console.log("==========   passsss   order data pendddd     ================", orderData);

    });
    socketServices.on('cancle_order', data => {
      console.log(
        '====  cancle order ======', data,
      );
      closeBottomSheet()

    });
    // return () => {
    //   if (timer) {
    //     clearInterval(timer);
    //   }
    // };
  }, []);

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
    ViewWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000050',

    },
    ModalContainer: {
      width: '85%',
      borderRadius: 15,
      padding: 30,
      backgroundColor: '#fff',
      elevation: 5,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      alignItems: 'center',
    },
    LabelText: {
      fontSize: 16,
      color: COLOR.BLACK,
      textAlign: 'center',
      fontWeight: '600',
    },
    DescText: {
      fontSize: 14,
      color: '#929292',
      marginTop: 15,
    },
  });

  const AllCategory = ({ item, setSelectedItem }) => (
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

  const handlePayNow = () => {
    closeBottomSheet()
    socketServices.emit('order_update', {
      recipient: orderData.sender,
      message: {
        type: 'payment_Done',
        id: orderData.message.orderDetail,
        order_id: orderData.message.order_id,
        coordinates: orderData.message.coordinates,
        orderData: orderData.message.orderData,
        services: orderData.message.orderData.order.services
      },
    });
    socketServices.emit('order_update', {
      recipient: orderData.sender,
      message: {
        type: 'payment_Done_close',
        id: orderData,
        services: orderData.message.orderData.order.services
      },
    });
    // console.log("=============================");

    setSelectedItem('Ongoing')
    setDirectionModalVisibility(true)

  }

  const renderScreen = () => {
    switch (selectedItem) {
      case 'Ongoing':
        return <Ongoing orderData={orderData} />;
      case 'Pending':
        return <Pending orderData={socketData} />;
      case 'History':
        return <History orderData={orderData} />;
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
        // paddingTop: 30
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
            style={{ paddingHorizontal: 15 }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLOR.BLACK}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>
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
          marginHorizontal: 15,
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
      <View style={{ paddingHorizontal: 15 }}>
        <FlatList
          data={AllCategoryData1}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <AllCategory item={item} setSelectedItem={setSelectedItem} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        height={Screen_Height * 0.4}
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

        <View style={{ paddingHorizontal: 15, paddingVertical: 20, }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: COLOR.BLACK }}>
              Time remaining : {formatTime(timeLeft)}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              Base Price
            </Text>
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              $50
            </Text>
          </View>

          {/* deliveryFee */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                variant="caption"
                style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
              >
                Delivery fee
              </Text>
              <Tooltip
                isVisible={showTip}
                content={<Text>Press this button to do something!</Text>}
                placement="top"
                onClose={() => setShowTip(false)}
              >
                <AntDesign
                  onPress={() => setShowTip(true)}
                  name="infocirlce"
                  size={18}
                  color="#808080"
                />

              </Tooltip>

            </View>

            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              $50
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                variant="caption"
                style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
              >
                Facility fee
              </Text>
              <Tooltip
                isVisible={showTip2}
                content={<Text>Press this button to do something!</Text>}
                placement="top"
                onClose={() => setShowTip2(false)}
              >
                <AntDesign
                  onPress={() => setShowTip2(true)}
                  name="infocirlce"
                  size={18}
                  color="#808080"
                />

              </Tooltip>

            </View>
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              $50
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                variant="caption"
                style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
              >
                Service fee
              </Text>
              <Tooltip

                isVisible={showTip3}
                content={<Text>Press this button to do something!</Text>}
                placement="top"
                onClose={() => setShowTip3(false)}
              >
                <AntDesign
                  onPress={() => setShowTip3(true)}
                  name="infocirlce"
                  size={18}
                  color="#808080"
                />

              </Tooltip>

            </View>
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              $60
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              Subtotal
            </Text>
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              $70
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                variant="caption"
                style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
              >
                Taxes & Processing fee
              </Text>
              <Tooltip
                isVisible={showTip4}
                content={<Text>Press this button to do something!</Text>}
                placement="top"
                onClose={() => setShowTip4(false)}
              >
                <AntDesign
                  onPress={() => setShowTip4(true)}
                  name="infocirlce"
                  size={18}
                  color="#808080"
                />

              </Tooltip>

            </View>
            <Text
              variant="caption"
              style={{ fontSize: 16, fontWeight: "bold", color: "#808080" }}
            >
              $80
            </Text>
          </View>


          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="caption"
              style={{ fontSize: 20, fontWeight: "bold", color: COLOR.BLACK }}
            >
              Total Price
            </Text>
            <Text
              variant="caption"
              style={{ fontSize: 20, fontWeight: "bold", color: COLOR.BLACK }}
            >
              $800
            </Text>
          </View>

        </View>


        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }}>

          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.CANCEL_B, borderRadius: 15, width: 100, height: 50 }}>

            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePayNow} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.ChartBlue, borderRadius: 15, width: 100, height: 50 }}>
            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Pay Now</Text>
          </TouchableOpacity>

        </View>
      </RBSheet>
      <Modal
        animationType="fade"
        transparent
        visible={directionModalVisible}
        statusBarTranslucent>
        <View style={styles.ViewWrapper}>
          <View style={styles.ModalContainer}>
            <Text
              style={
                styles.LabelText
              }>{`Please head to\ndesignated location`}</Text>
            <Text style={styles.DescText}>
              Once arrived please come back here{' '}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 30,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: COLOR.ORANGECOLOR,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowOffset: { height: 2 },
                  shadowRadius: 2,
                  shadowOpacity: 0.3,
                }}
                onPress={() => setDirectionModalVisibility(false)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
              <View style={{ width: 10 }} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#000',
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowOffset: { height: 2 },
                  shadowRadius: 2,
                  shadowOpacity: 0.3,
                }}
                onPress={() => setDirectionModalVisibility(false)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  Direction

                </Text>
                <FontAwesome5
                  name="directions" size={24} color={COLOR.WHITE} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* <View style={{}}>
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
          <View style={{ paddingHorizontal: 5, marginVertical: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                <View style={{ width: 30 }} />
                <Text
                  style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>
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
      </View> */}
      <View>{renderScreen()}</View>
    </ScrollView>
  );
};

export default MyBooking;

const styles = StyleSheet.create({});
