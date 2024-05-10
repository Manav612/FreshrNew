import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import NavigationHandler from './src/navigation';

const customTextProps = {
  style: {
    fontFamily: 'Poppins-Italic',
  },
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
          <Provider store={Store}>
          <NavigationHandler/>
          </Provider>
    </View>
  )
}
export default App
const styles = StyleSheet.create({})