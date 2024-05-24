import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

export const CheckPermission = async (permission) => {
    return check(permission)
        .then((result) => {
            switch (result) {
                case RESULTS.DENIED:
                    return RequestPermission(permission);
                case RESULTS.GRANTED:
                    return true;
                case RESULTS.UNAVAILABLE:
                    return Platform.OS == 'android' && RequestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
            }
        }).catch((error) => { console.log(error) })
}

const RequestPermission = (permission) => {
    return request(permission, true).then((result) => {
        switch (result) {
            case RESULTS.GRANTED:
                return true;
        }
    })
}