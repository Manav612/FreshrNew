import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import NavigationHandler from './src/navigation';
import Store from './src/redux/Store';
import { SetThemeMode } from './src/redux/ThemeAction';


// ngrok config add-authtoken 2fMQD0u4cWkzERbRGcAH7fvGz4t_7oV6eG5eVbSVUJLPqdPL8
const App = () => {
  const colorScheme = useColorScheme(); // This will give you the device theme mode
  console.log('=================>', colorScheme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the theme mode to Redux store
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
