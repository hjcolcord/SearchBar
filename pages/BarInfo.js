import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class BarInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.notchHeight = 30;

    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.mainContainer}>
                    Bar Information
                </Text>
            </View>  
        );
        
    }
}

BarInfo.navigationOptions = {
    header: "show"
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notchPadding: {
        height: 30,
        width: windowWidth,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 50,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerSide: {
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenter: {
        height: 50,
        flex: 4,
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineHighlight: {
        height: 1,
        width: 90,
    },
    infoSection: {
        flex: 0.3,
        width: windowWidth,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        width: windowWidth,
        backgroundColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonLogin: {
        width: windowWidth * 0.8,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FFF',
        shadowRadius:5,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.7,
      },
    buttonLoginGrad: {
        width: windowWidth * 0.7,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      },
});