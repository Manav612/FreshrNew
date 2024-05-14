import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, { useState, useCallback, useEffect } from 'react'
  import { GiftedChat } from 'react-native-gifted-chat'
  import {useSelector} from 'react-redux';
  import {Hair1} from '../../constants/Icons';
  import {Screen_Height} from '../../constants/Constants';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {
    COLOR_DARK,
    COLOR_LIGHT,
    GRADIENT_COLOR_DARK,
    GRADIENT_COLOR_LIGHT,
  } from '../../constants/Colors';
  import {ScrollView} from 'react-native-gesture-handler';
  import {useNavigation} from '@react-navigation/native';
  import {calldata, chatdata} from '../../components/utils';
const ChatScreen = ({route}) => {
    const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const { title } = route.params;
//   const [messages, setMessages] = useState([])
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//         },
//       },
//     ])
//   }, [])
//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     )
//   }, [])
  console.log("=================",title);
  return (
    <View>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 15,
          }}>
          <View style={{flexDirection: 'row', gap: 20}}>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
          
            <Text style={{fontWeight: '800', fontSize: 25, color: COLOR.BLACK}}>
             {title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal-circle-outline"
                size={28}
                color={COLOR.BLACK}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    /> */}
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})