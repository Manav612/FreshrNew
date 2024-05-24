import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import NavigationHandler from './src/navigation';
import Store from './src/redux/Store';
import { SetThemeMode } from './src/redux/ThemeAction';

const customTextProps = {
  style: {
    fontFamily: 'Poppins-Italic',
  },
};
const App = () => {
  const colorScheme = useColorScheme(); 
  console.log('=================>', colorScheme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetThemeMode(colorScheme));
  }, [colorScheme, dispatch]);

  return <NavigationHandler/>;
};

const WrappedApp = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

export default WrappedApp;

const styles = StyleSheet.create({});
