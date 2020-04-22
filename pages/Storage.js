import {
    AsyncStorage
} from 'react-native';

// Here are some methods to add to asyncstorage
// that might prove helpful
// (i.e., saving linkedBar for bouncers or city names for regular users)

// Clears asyncstorage
export function flushStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
            for (let keyVal of keyValArray) {
                AsyncStorage.removeItem(keyVal[0]);
            }
        })
    });
}

// Logs asyncstorage
export function logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
            let myStorage: any = {};
            for (let keyVal of keyValArray) {
                myStorage[keyVal[0]] = keyVal[1]
            }
            console.log('CURRENT STORAGE: ', myStorage);
        })
    });
}

// Stores data
// **Note**: email, status is not a key value, but instead directly
// storing the user's email and their status (1-3) for the appropriate screen
export async function storeData(email, status) {
    try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('status', status);
        console.log(`Successfully stored ${email} and ${status} in AsyncStorage`);
    } catch (error) {
        console.log(`Error @ storeData: ${error}`);
    }
}