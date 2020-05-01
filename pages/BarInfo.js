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
        if (Platform.OS === 'android') {
            this.notchHeight = 0;
        }
        return (
            <View style={styles.container}>
                

                <View style={styles.header}>
                    <LinearGradient
                        colors={['#000', '#222']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.header}>
                           
                        <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={() => this.props.navigation.pop()}>
                        <LinearGradient
                            colors={['#A537FD', '#00EBBE']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonLoginGrad}>
                                <Text
                                    style={{color:'#FFF', fontWeight:"bold", fontSize:20}}>
                                    Back
                                </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    </LinearGradient>
                </View>
    
                <View style={styles.mainContainer}>
                    <Text style={{color: '#FFF'}}>
                        {"Bar List"}
                    </Text>
                </View>
            </View>
            );
        }

        barFormat(info){
            return (   
            <View key={info} style={styles.buttonLogin, {borderRadius:50 ,padding: 30, margin: 10,backgroundColor: '#838383', width: windowWidth/1.2}}>
                <Text style={{color: '#FFF', fontSize: 25}}>
                    {"Name: " + info}
                </Text>
                <Text style={{color: '#FFF', fontSize: 25}}>
                    {"Capacity: "}
                </Text>
                <Text style={{color: '#FFF', fontSize: 25}}>
                    {"Wait Time: "}
                </Text>
                <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity 
                        style={styles.buttonLogin}
                        //TODO: Navigate to BarInfo landing and send specific bar info with it
                        onPress={() => this.props.navigation.navigate("BarInfo")}>
                        <LinearGradient
                            colors={['#A537FD', '#00EBBE']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{width: windowWidth/1.5,
                                height: windowHeight/13,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 100,
                                marginTop: 10}}>
                            <Text style={{color:'#FFF', fontWeight:"bold", fontSize:20}}>
                                More Info
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>);
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