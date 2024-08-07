import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import NavigationHandler from './src/navigation';
import Store from './src/redux/Store';
import { SetThemeMode } from './src/redux/ThemeAction';
import Toast from 'react-native-toast-message';
import Geocoder from 'react-native-geocoding';
import socketServices from './src/Services/Socket';
import { GetAuthToken } from './src/constants/AsyncStorage';

const customTextProps = {
  style: {
    fontFamily: 'Poppins-Italic',
  },
};
const App = () => {
  Geocoder.init("AIzaSyCs3kyGiiVDcIn3KZ6aKCRDVe66EZKh9qU");
  return <NavigationHandler />;
};

const WrappedApp = () => {

  const getToken = async () => {
    const authToken = await GetAuthToken();
    authToken != '' && socketServices.initializeSocket(authToken);
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Provider store={Store}>
      <Toast />
      <App />
    </Provider>
  );
};

export default WrappedApp;

const styles = StyleSheet.create({});
