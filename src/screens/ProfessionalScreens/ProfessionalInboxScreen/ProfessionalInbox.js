import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClockUserIcon, Hair1 } from '../../../constants/Icons';
import { Screen_Height } from '../../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  GRADIENT_COLOR_DARK,
  GRADIENT_COLOR_LIGHT,
} from '../../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { calldata, chatdata } from '../../../components/utils';
import { NavigationScreens } from '../../../constants/Strings';
import FastImage from 'react-native-fast-image';
import socketServices from '../../../Services/Socket';

const ProfessionalInbox = ({ navigate }) => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [activeTab, setActiveTab] = useState('Chats');
  const [selected, setSelected] = useState()
  // useEffect(() => {
  //   socketServices.on('create_order', data => {
  //     console.log(
  //       '====  order create data Socket ======',
  //       data.message.data.order,
  //     );
  //     navigation.navigate(NavigationScreens.ProfessionalBookingScreen)
  //   });
  // }, []);
  const SelectCalls = ({ item }) => (
    <TouchableOpacity
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
      }}>
      <Image
        style={{ height: 50, width: 50, borderRadius: 25 }}
        source={item.img}
      />
      <View
        style={{ justifyContent: 'space-evenly', marginLeft: 15, width: 230 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.BLACK }}>
          {item.title}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {item.icon}
          <Text>
            {item.recents} | {item.date}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Ionicons name="call-outline" size={22} color={COLOR.ORANGECOLOR} />
      </View>
    </TouchableOpacity>
  );
  const SelectChats = ({ item }) => (
    <TouchableOpacity
      style={{
        marginHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate(NavigationScreens.ProfessionalChatScreen, { title: item.title })}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Image
          style={{ height: 50, width: 50, borderRadius: 25 }}
          source={item.img}
        />
        <View style={{ width: 180 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLOR.BLACK }}>
            {item.title}
          </Text>

          <Text>{item.recents}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: COLOR.ORANGECOLOR,
            borderRadius: 25,
            height: 20,
            width: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{item.notification_Count}</Text>
        </View>
        <Text style={{}}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 15,
          }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>

            <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
              Inbox
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={() => setSelected(!selected)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <MaterialCommunityIcons name={selected ? 'toggle-switch-off' : 'toggle-switch'} size={24} color={COLOR.BLACK} />
              <Text style={{ color: COLOR.BLACK }}>Queue</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfessionalScheduleScreen')} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <FastImage source={ClockUserIcon} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <AntDesign name="setting" size={28} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // flexDirection: 'row',
            marginHorizontal: 15,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => setActiveTab('Chats')}
            style={[
              styles.category,
              {
                borderColor:
                  activeTab === 'Chats' ? COLOR.ORANGECOLOR : COLOR.ORANGECOLOR,
                backgroundColor:
                  activeTab === 'Chats' ? COLOR.ORANGECOLOR : 'transparent',
              },
            ]}>
            <Text style={{ color: activeTab === 'Chats' ? 'white' : 'orange' }}>
              Chats
            </Text>
          </TouchableOpacity>

        </View>
      </View>
      <View>
        <FlatList
          data={chatdata}
          keyExtractor={item => item.id}
          renderItem={

            ({ item }) => <SelectChats item={item} />

          }
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default ProfessionalInbox;

const styles = StyleSheet.create({
  category: {
    borderWidth: 2,
    height: 35,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
