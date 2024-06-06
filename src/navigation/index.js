import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationScreens } from '../constants/Strings';
import BottomTab from './BottomTab/BottomTab';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useDispatch } from 'react-redux';
import SplashScreen from '../screens/OnBoardingScreens/SplashScreen/SplashScreen';
import WelcomeOnboardScreen from '../screens/OnBoardingScreens/WelcomeOnboardScreen/WelcomeOnboardScreen';
import SignUP from '../screens/OnBoardingScreens/SignUpScreen/SignUP';
import SignIn from '../screens/OnBoardingScreens/SignInScreen/SignIn';
import FillProfile from '../screens/OnBoardingScreens/FillProfileScreen/FillProfile';
import ForgotPassword from '../screens/OnBoardingScreens/ForgotPasswordScreen/ForgotPassword';
import Booking from '../screens/Booking';

import Newpassword from '../screens/OnBoardingScreens/ForgotPasswordScreen/Newpassword';
import otp from '../screens/OnBoardingScreens/ForgotPasswordScreen/otp';
import EmailVerificationScreen from '../screens/OnBoardingScreens/VerifyEmail/EmailVerificationScreen';
import ProfessionalBottomTab from './BottomTab/ProfessionalsBottomTab';
import ProfessionalScheduleScreen from '../components/ProfessionalComponents/ProfessionalScheduleScreen';
import FacilityBottomTab from './BottomTab/FacilityBottomTab';
import FacilityPrivacyAndPolicy from '../screens/FacilitySideScreens/OnBoardingScreens/FacilityPrivacyAndPolicy';
import FacilityOnBoardingScreen from '../screens/FacilitySideScreens/OnBoardingScreens/FacilityOnBoardingScreen/FacilityOnBoardingScreen';
import ConfirmationForCreateFacilitie from '../screens/FacilitySideScreens/OnBoardingScreens/ConfirmationForCreateFacilitie/ConfirmationForCreateFacilitie';
import ProfessionalPrivacyAndPolicy from '../screens/ProfessionalScreens/ProfessionalPrivacyAndPolicy/ProfessionalPrivacyAndPolicy';
import FacilityConnectStripe from '../screens/FacilitySideScreens/OnBoardingScreens/FacilityConnectStripe';
import ProfessionalConnectStripeScreen from '../screens/ProfessionalScreens/ProfessionalConnectStripeScreen/ProfessionalConnectStripeScreen';
import PasswordAndOtp from '../screens/OnBoardingScreens/SignInScreen/PasswordAndOtp';

const Stack = createSharedElementStackNavigator();

const NavigationHandler = () => {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();
    const dispatch = useDispatch();
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                    const currentScreen = {
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    };
                    console.log("Current Screen : ", currentScreen);
                    dispatch(setActiveScreen(currentScreen.screen_name));
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                    }).catch((e) => { console.log("Error : ", e) });
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>

                <Stack.Screen name={NavigationScreens.SplashScreen} component={SplashScreen} />
                <Stack.Screen name={NavigationScreens.WelcomeOnboardScreen} component={WelcomeOnboardScreen} />
                <Stack.Screen name={NavigationScreens.SignUpScreen} component={SignUP} />
                <Stack.Screen name={NavigationScreens.SignInScreen} component={SignIn} />
                <Stack.Screen name={NavigationScreens.PasswordAndOtpScreen} component={PasswordAndOtp} />
                <Stack.Screen name={NavigationScreens.EmailVerificationScreen} component={EmailVerificationScreen} />
                <Stack.Screen name={NavigationScreens.ForgotPasswordScreen} component={ForgotPassword} />
                <Stack.Screen name={NavigationScreens.OTPScreen} component={otp} />
                <Stack.Screen name={NavigationScreens.NewpasswordScreen} component={Newpassword} />
                <Stack.Screen name={NavigationScreens.FillProfileScreen} component={FillProfile} />
                <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
                <Stack.Screen name={NavigationScreens.ProfessionalPrivacyAndPolicyScreen} component={ProfessionalPrivacyAndPolicy} />
                <Stack.Screen name={NavigationScreens.ProfessionalConnectStripeScreen} component={ProfessionalConnectStripeScreen} />
                <Stack.Screen name={NavigationScreens.HomeTab} component={BottomTab} />        
                <Stack.Screen name={NavigationScreens.ProfessionalBottomTab} component={ProfessionalBottomTab} />        
                <Stack.Screen name={NavigationScreens.FacilityBottomTab} component={FacilityBottomTab} />        
                <Stack.Screen name={NavigationScreens.FacilityPrivacyAndPolicyScreen} component={FacilityPrivacyAndPolicy} />        
                <Stack.Screen name={NavigationScreens.FacilityOnBoardingScreen} component={FacilityOnBoardingScreen} />        
                <Stack.Screen name={NavigationScreens.ConfirmationForCreateFacilitieScreen} component={ConfirmationForCreateFacilitie} />        
                <Stack.Screen name={NavigationScreens.FacilityConnectStripeScreen} component={FacilityConnectStripe} />        
                <Stack.Screen name={NavigationScreens.Booking} component={Booking} />        
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default NavigationHandler;
