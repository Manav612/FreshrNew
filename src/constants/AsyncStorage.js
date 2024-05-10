import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const GetFontSize = async () => {
    try {
        const value = await AsyncStorage.getItem("FontSize");
        if (value !== null) {
            // console.log(`Data retrieved with key ${key}: ${value}`);
            return value;
        } else {
            // console.log(`No data found with key ${key}`);
            return 0;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return 0;
    }
};

export const StoreFontSize = async (value) => {
    try {
        await AsyncStorage.setItem("FontSize", value.toString());
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const GetThemeMode = async () => {
    try {
        const value = await AsyncStorage.getItem("Theme");
        if (value !== null) {
            // console.log(`Data retrieved with key ${key}: ${value}`);
            return value;
        } else {
            // console.log(`No data found with key ${key}`);
            return 0;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return 0;
    }
};

export const StoreThemeMode = async (value) => {
    try {
        await AsyncStorage.setItem("Theme", value.toString());
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const GetAuthToken = async () => {
    try {
        const value = await AsyncStorage.getItem("AuthToken");
        if (value !== null) {
            // console.log(`Data retrieved with key ${key}: ${value}`);
            return value;
        } else {
            // console.log(`No data found with key ${key}`);
            return '';
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return '';
    }
};

export const StoreAuthToken = async (value) => {
    try {
        await AsyncStorage.setItem("AuthToken", value.toString());
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

// export const RemoveAuthToken = async () => {
//     try {
//         await GoogleSignin.signOut();
//         await AsyncStorage.removeItem("AuthToken");
//     } catch (error) {
//         console.error('Error saving data:', error);
//     }
// };

