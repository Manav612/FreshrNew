import { Dimensions, Platform } from "react-native";
import DeviceInfo from 'react-native-device-info';

export const Screen_Width = Dimensions.get('window').width;
export const Screen_Height = Platform.OS == 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height + 50;

const Static = { width: 1042, height: 1366 }
const Ratio = (Screen_Width) / (Static.width);
export const Scale = DeviceInfo.isTablet() ? 2 * Ratio : 1;
export const BottomTabHeight = Platform.OS == 'ios' ? 95 * Scale : 90 * Scale;

// export const GSTNoRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
export const GSTNoRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;