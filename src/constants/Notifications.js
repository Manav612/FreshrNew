// import { Platform, } from 'react-native'
// import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
// import messaging from '@react-native-firebase/messaging';
// // import axios from 'axios';
// // import { NotificationServerKey } from './Strings';

// export const CheckNotificationPermission = async () => {
//     if (Platform.OS == 'ios') {
//         const authorizationStatus = await messaging().requestPermission();
//         if (authorizationStatus == 1) {
//             return true;
//         }
//     } else {
//         const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
//         return check(permission)
//             .then((result) => {
//                 switch (result) {
//                     case RESULTS.DENIED:
//                         return RequestPermission(permission);
//                     case RESULTS.GRANTED:
//                         return true;
//                     case RESULTS.UNAVAILABLE:
//                         return true;
//                 }
//             }).catch((error) => { console.log(error) })
//     }
// }

// const RequestPermission = (permission) => {
//     return request(permission, true).then((result) => {
//         switch (result) {
//             case RESULTS.GRANTED:
//                 return true;
//         }
//     })
// }

// export const GetToken = async () => {
//     try {
//         if (await CheckNotificationPermission()) {
//             const token = await messaging().getToken();
//             return token;
//         }
//         else {
//             return '';
//         }
//     }
//     catch (error) {
//         console.log(error);
//         return '';
//     }
// }

// // export const SendNotification = (title, body, token) => {
// //     const data = JSON.stringify({
// //         data: {},
// //         notification: {
// //             body: body,
// //             title: title,
// //         },
// //         to: token,
// //     });

// //     const config = {
// //         method: 'POST',
// //         url: 'https://fcm.googleapis.com/fcm/send',
// //         headers: {
// //             Authorization: `key=${NotificationServerKey}`,
// //             'Content-Type': 'application/json',
// //         },
// //         data: data,
// //     }

// //     axios(config).catch((e) => { console.log(e) })
// // }