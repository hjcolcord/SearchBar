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
            console.log('Current asyncstorage: ', myStorage);
        })
    });
}