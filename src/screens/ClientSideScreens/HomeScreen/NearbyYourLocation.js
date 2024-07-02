import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { barber } from '../../../constants/Icons';

const SplashScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imageViewHeight = windowHeight * 0.2;
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#278EE2', '#00457C']} style={styles.container}>
      <View style={{ height: windowHeight * 0.95, width: windowWidth*1.3, borderRadius: 800, borderColor:'grey', borderWidth: 1, borderTopWidth:1, borderLeftWidth: 0.3, borderRightWidth: 0.3, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ height: windowHeight * 0.7, width: windowWidth *1.2, borderRadius: 800, borderColor:'grey', borderWidth: 1, borderTopWidth: 1, borderLeftWidth: 0.3, borderRightWidth: 0.3, justifyContent: 'center', alignItems: 'center' }} >
          <View style={{ height: windowHeight * 0.44, width: windowWidth * 0.88, borderRadius: 500, borderColor:'grey', borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0.3, borderRightWidth: 0.3, justifyContent: 'center', alignItems: 'center' }} >
          <Image
          style={styles.image}
          source={barber}
        />
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height:250,
    width:200,
  },
});

