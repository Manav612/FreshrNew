import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {Scale, Screen_Height, Screen_Width} from '../constants/Constants';
import Category from '../../components/Category';

const MyBookMarkScreen = ({navigation}) => {
  const BackPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 15,
            alignItems: 'center',
          }}>
          <View style={styles.HeaderView}>
            <TouchableOpacity onPress={BackPress}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={35}
                color="#000"
              />
            </TouchableOpacity>
            <Text style={styles.HeaderText}>My Bookmark</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={30}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        <Category />
      
    </View>
  );
};

export default MyBookMarkScreen;

const styles = StyleSheet.create({
  HeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderText: {color: '#000', fontSize: 22, fontWeight: '600', marginLeft: 10},
});
