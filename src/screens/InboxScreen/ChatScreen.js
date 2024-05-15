// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import React, { useState, useCallback, useEffect } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat'
// import { useSelector } from 'react-redux';
// import { Hair1 } from '../../constants/Icons';
// import { Screen_Height } from '../../constants/Constants';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   COLOR_DARK,
//   COLOR_LIGHT,
//   GRADIENT_COLOR_DARK,
//   GRADIENT_COLOR_LIGHT,
// } from '../../constants/Colors';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { calldata, chatdata } from '../../components/utils';
// const ChatScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const theme = useSelector(state => state.ThemeReducer);
//   const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//   const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
//   const { title } = route.params;
//     const [messages, setMessages] = useState([])
//     useEffect(() => {
//       setMessages([
//         {
//           _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//           },
//         },
//       ])
//     }, [])
//     const onSend = useCallback((messages = []) => {
//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, messages),
//       )
//     }, [])
//   console.log("=================", title);
//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           margin: 15,
//         }}>
//         <View style={{ flexDirection: 'row', gap: 20 }}>
//           <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />

//           <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
//             {title}
//           </Text>
//         </View>
//         <View style={{ flexDirection: 'row', gap: 10 }}>
   
//           <TouchableOpacity>
//             <MaterialCommunityIcons
//               name="dots-horizontal-circle-outline"
//               size={28}
//               color={COLOR.BLACK}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <GiftedChat
//    inverted={true}
//    messages={messages}
//    onSend={(messages) => onSend(messages)}
//    user={{_id: 2}}
//    onInputTextChanged={() => socketServices.emit('is typing', {content: "", to : order})} 

//    // renderBubble={renderBubble}
//    alwaysShowSend
//    style={{backgroundColor: 'black'}}
//    messagesContainerStyle={{backgroundColor: 'black',marginBottom:-20}}
//    scrollToBottom

//    renderSend={renderSend}
//    renderActions={renderActions}
   
//    textInputProps={{style: {color: "white", flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:20, marginLeft: 8}}}
//    containerStyle={{ height: 60, justifyContent:'center', backgroundColor: '#25282b', color: "white"}}
//     />
//     </View>
//   )
// }

// export default ChatScreen

// const styles = StyleSheet.create({})
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Hair1 } from '../../constants/Icons';
import { Screen_Height } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  GRADIENT_COLOR_DARK,
  GRADIENT_COLOR_LIGHT,
} from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { calldata, chatdata } from '../../components/utils';

const ChatScreen = ({ route }) => {
  const { title } = route.params;
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  useEffect(() => {
    // Load initial messages
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    // Add new messages to the chat
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
       <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 15,
        }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />

          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
   
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={28}
              color={COLOR.BLACK}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat */}
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: 1 }} // User sending the messages, change accordingly
      />
      <View style={{height:100}}/>
    </View>
  );
};

export default ChatScreen;
