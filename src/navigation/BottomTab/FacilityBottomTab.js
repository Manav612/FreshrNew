import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  BookingIcon,
  FacilitiesIcon,
  HistoryIcon,
  HomeIcon,
  InboxIcon,
  ProductIcon,
  ScissorIcon,
  UserIcon,
} from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import FacilityHome from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityHome';
import FacilityDetalis from '../../screens/FacilitySideScreens/FacilityFacilitiesScreen/FacilityDetalis';
import FacilityFacilitiesScreen from '../../screens/FacilitySideScreens/FacilityFacilitiesScreen/FacilityFacilitiesScreen';
import FacilityProfile from '../../screens/FacilitySideScreens/FacilityHistoryScreen/FacilityHistory';
import ProfessionalSettingScreen from '../../components/ProfessionalComponents/ProfessionalSettingScreen';
import FacilitySettingScreen from '../../components/FacilityComponents/FacilitySettingScreen';
import FacilityViewMore from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityViewMore';
import FacilityHistory from '../../screens/FacilitySideScreens/FacilityHistoryScreen/FacilityHistory';
import GrossSales from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityGrossSales';
import Prosaledetails from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityProsaledetails';
import Commissionsplits from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityCommissionsplits';
import Nextpayout from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityNextpayout';
import FacilityGrossSales from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityGrossSales';
import FacilityProsaledetails from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityProsaledetails';
import FacilityCommissionsplits from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityCommissionsplits';
import FacilityNextpayout from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityNextpayout';
import FacilityLeaderboard from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityLeaderboaed';
import FacilityManageSeatScreen from '../../screens/FacilitySideScreens/FacilityFacilitiesScreen/FacilityManageSeatScreen';
import FacilityProfile2 from '../../screens/FacilitySideScreens/FacilityProfile2/FacilityProfile2';
import FacilityProduct from '../../screens/FacilitySideScreens/FacilityProductScreen/FacilityProduct';
import FacilitySchedule from '../../components/FacilityComponents/FacilitySchedule';
const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationScreens.FacilityHomeScreen}
        component={FacilityHome}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityViewMoreScreen}
        component={FacilityViewMore}
      />
      <Stack.Screen
        name={NavigationScreens.FacilitySettingScreen}
        component={FacilitySettingScreen}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityLeaderboardScreen}
        component={FacilityLeaderboard}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityGrossSalesScreen}
        component={FacilityGrossSales}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityProsaledetailsScreen}
        component={FacilityProsaledetails}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityCommissionsplitsScreen}
        component={FacilityCommissionsplits}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityNextpayoutScreen}
        component={FacilityNextpayout}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityProfile2Screen}
        component={FacilityProfile2}
      />
      <Stack.Screen
        name={NavigationScreens.FacilitySchedule}
        component={FacilitySchedule}
      />
    </Stack.Navigator>
  );
};

const FacilitiesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationScreens.FacilityFacilitiesScreen}
        component={FacilityFacilitiesScreen}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityDetalisScreen}
        component={FacilityDetalis}
      />
      <Stack.Screen
        name={NavigationScreens.FacilitySettingScreen}
        component={FacilitySettingScreen}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityManageSeatScreen}
        component={FacilityManageSeatScreen}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityProfile2Screen}
        component={FacilityProfile2}
      />
      <Stack.Screen
        name={NavigationScreens.FacilitySchedule}
        component={FacilitySchedule}
      />
    </Stack.Navigator>
  );
};
const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationScreens.FacilityProductScreen}
        component={FacilityProduct}
      />
      <Stack.Screen
        name={NavigationScreens.FacilitySchedule}
        component={FacilitySchedule}
      />
    </Stack.Navigator>
  );
};
const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationScreens.FacilityHistoryScreen}
        component={FacilityHistory}
      />
      <Stack.Screen
        name={NavigationScreens.FacilityProfile2Screen}
        component={FacilityProfile2}
      />
      <Stack.Screen
        name={NavigationScreens.FacilitySchedule}
        component={FacilitySchedule}
      />
    </Stack.Navigator>
  );
};

const Screens = [
  {
    name:
      NavigationScreens.FacilityHomeScreen +
      ' ' +
      NavigationScreens.FacilityBottomTab,
    title: 'Home',
    component: HomeStack,
    icon: HomeIcon,
  },
  {
    name:
      NavigationScreens.FacilityFacilitiesScreen +
      ' ' +
      NavigationScreens.FacilityBottomTab,
    title: 'Facilities',
    component: FacilitiesStack,
    icon: FacilitiesIcon,
  },
  {
    name:
      NavigationScreens.FacilityProductScreen +
      ' ' +
      NavigationScreens.FacilityBottomTab,
    title: 'Product',
    component: ProductStack,
    icon: ProductIcon,
  },
  {
    name:
      NavigationScreens.FacilityProfileScreen +
      ' ' +
      NavigationScreens.FacilityBottomTab,
    title: 'History',
    component: HistoryStack,
    icon: HistoryIcon,
  },
];

export default FacilityBottomTab = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // unmountOnBlur: true,
      }}
      tabBar={props => <TabBar {...props} route={route} />}>
      {Screens.map((screen, i) => {
        return (
          <Tab.Screen
            name={screen.name}
            component={screen.component}
            options={{
              title: screen.title,
              tabBarIcon: screen.icon,
            }}
            key={i}
          />
        );
      })}
    </Tab.Navigator>
  );
};
