import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import NavigationHandler from './src/navigation';
import Store from './src/redux/Store';
import { SetThemeMode } from './src/redux/ThemeAction';
import Toast from 'react-native-toast-message';

const customTextProps = {
  style: {
    fontFamily: 'Poppins-Italic',
  },
};
const App = () => {
  
  return <NavigationHandler/>;
};

const WrappedApp = () => {
  return (
    <Provider store={Store}>
      <Toast/>
      <App />
    </Provider>
  );
};

export default WrappedApp;

const styles = StyleSheet.create({});
