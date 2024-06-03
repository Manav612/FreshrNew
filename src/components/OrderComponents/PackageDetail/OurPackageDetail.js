
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height } from '../../../constants/Constants';
import { sp1 } from '../../../constants/Icons';

const OurPackageDetail = () => {
  const [showMore, setShowMore] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState({
    haircut: false,
    hairstyling: false,
    hairColoring: false,
    shaveMustache: false,
    shaveBeard: false,
    facial: false,
  });
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [showFullText, setShowFullText] = useState(false);
  const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget laoreet ex. Nulla facilisi. In eget ex tincidunt, suscipit arcu nec, aliquam Donec et nunc non felis rutrum semper. Duis eu tellus vel turpis varius rhoncus eget nec neque. Aenean ac placerat tortor. Duis ultricies, eros nec fermentum iaculis, libero lorem rhoncus justo, sed lacinia arcu neque sit amet nisi. Vivamus id purus non erat posuere pharetra sed lacinia arcu neque.';
  const truncatedText = fullText.slice(0, 100) + '...';

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  const navigation = useNavigation();
  const route = useRoute();
  const { name, image } = route.params;

  const BackPress = () => {
    navigation.goBack();
  };

  const handleCheckboxPress = key => {
    setCheckboxStatus(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
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
            <MaterialCommunityIcons name="arrow-left" size={35} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={30}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image style={{ height: 250, width: '90%', marginHorizontal: 20, borderRadius: 20 }} source={image} />
      </View>
      <View style={{ margin: 15 }}>
        <View>
          <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: 'bold' }}>
            {name}
          </Text>
          <Text style={{ marginVertical: 10 }}>
            Special Offers Package, valid until Dec 15,2024
          </Text>
          <Text style={{color:COLOR.BLACK,fontSize:14}}>{showFullText ? fullText : truncatedText}</Text>
      <TouchableOpacity onPress={toggleShowFullText}>
        <Text style={{color:COLOR.ORANGECOLOR}}>{showFullText ? 'Read Less' : 'Read More'}</Text>
      </TouchableOpacity>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 18,
              fontWeight: 'bold',
              marginVertical: 15,
            }}>
            Services
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleCheckboxPress('haircut')}>
                  <MaterialCommunityIcons
                    name={
                      checkboxStatus.haircut
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={22}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, color: COLOR.BLACK, fontSize: 15}}>
                  Haircut
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleCheckboxPress('hairstyling')}>
                  <MaterialCommunityIcons
                    name={
                      checkboxStatus.hairstyling
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={22}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, color: COLOR.BLACK, fontSize: 15}}>
                  Hairstyling
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleCheckboxPress('hairColoring')}>
                  <MaterialCommunityIcons
                    name={
                      checkboxStatus.hairColoring
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={22}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, color: COLOR.BLACK, fontSize: 15}}>
                  Hair coloring
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => handleCheckboxPress('shaveMustache')}>
                  <MaterialCommunityIcons
                    name={
                      checkboxStatus.shaveMustache
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={22}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, color: COLOR.BLACK, fontSize: 15}}>
                  Shave mustache
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleCheckboxPress('shaveBeard')}>
                  <MaterialCommunityIcons
                    name={
                      checkboxStatus.shaveBeard
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={22}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, color: COLOR.BLACK, fontSize: 15}}>
                  Shave beard
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={() => handleCheckboxPress('facial')}>
                  <MaterialCommunityIcons
                    name={
                      checkboxStatus.facial
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={22}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 5, color: COLOR.BLACK, fontSize: 15}}>
                  Facial
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          marginTop: 25,
          backgroundColor: COLOR.ORANGECOLOR,
          borderRadius: 30,
          margin: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('BookAppointment Screen')}>
        <Text style={{color: COLOR.WHITE, fontSize: 16, fontWeight: 'bold'}}>
          Book Now - $125
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OurPackageDetail;

const styles = StyleSheet.create({
  HeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});