import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {flushStorage, logCurrentStorage, storeData} from './Storage'; 
import {AsyncStorage} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ENDPOINT = "https://uw-crowd-control.herokuapp.com/";

export class BouncerLanding extends React.Component {
    constructor(props) {
        super(props);

        // Hold patrons/capacity in a set
        this.state = {
            patrons:0,
            capacity:0
        };
        this.notchHeight = 30;

        // Method to call that get the current # of patrons & capacity
        // once a bouncer loggs in
        // Calls /getBarDetails endpoint
        this.firstTimeUpdate = function(){
            let url = null; 
            let parentBar = null;
            // It is expected that linkedBar will now be a valid key
            AsyncStorage.getItem('linkedBar', (error, result) => {
                url = `${ENDPOINT}getBarDetails?bar=${result}`;
                console.log(`Making request to ${url}`);
                const request = async () => {
                    const response = await fetch(url); 
                    const json = await response.json();  
                    this.setState({
                        patrons:json["People"],
                        capacity:json["Capacity"],
                    })
                }
                request();
            }); 
        }; 
        this.firstTimeUpdate(); // Call the first-time update during construction

        // Local method to incriment/decrement
        this.callAPI = function(plus){
            let url = null; 
            let parentBar = null; // This will hold the owner's bar
            AsyncStorage.getItem('linkedBar', (error, result) => {
                // Build the endpoint
                if(plus){
                    url = `${ENDPOINT}plus?bar=${result}`;
                }else{
                    url = `${ENDPOINT}minus?bar=${result}`;
                } 
                // Wrap everything in a JS promise
                const request = async () => {
                    const response = await fetch(url); 
                    const json = await response.json();
                    // json["Result"] holds whether or not call succeeded
                    const result = Boolean(await json["Result"]); 
                    if(result){
                        // Update states
                        this.setState({
                            patrons:json["Patrons"],
                            capacity:json["Capacity"],
                        })
                    }else{
                        // Back-end does error checking, so this may be a user error (incrimenting above capacity)
                        const reason = await json["Reason"];
                        reason.includes("Capacity") ? alert("Cannot have patrons above capacity or below zero") : alert(`Unexpected error: ${reason}`);
                    }
                }
                // Send the request
                request();
            }); 
        }
    }


    render(){


        logCurrentStorage();
        if (Platform.OS === 'android') {
            this.notchHeight = 0;
        }
        return (
            <View style={styles.container}>
                <View style={[styles.notchPadding, {height:this.notchHeight}]}>
                    <LinearGradient
                        colors={['#000', '#222']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.notchPadding}/>
                </View>

                <View style={styles.header}>
                    <LinearGradient
                        colors={['#000', '#222']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.header}>
                            <View style = {styles.headerSide}>
                                <TouchableOpacity
                                    style={{justifyContent:'center', alignItems:'center'}}
                                    onPress={() => this.props.navigation.navigate('Login')}>
                                    <MaterialIcon
                                        name="logout"
                                        size={20}
                                        color={'#FFF'}
                                        backgroundColor={'#00000000'}
                                    />
                                    <Text style={{color:'#FFF', fontSize:12}}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.headerCenter}>
                                <Text style={{color:'#FFF', fontWeight:'300', fontSize:20}}>
                                    searchbar
                                </Text>
                                <LinearGradient
                                    colors={['#A537FD', '#00EBBE']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.lineHighlight}/>
                            </View>
                            <View style = {styles.headerSide}/>

                        </LinearGradient>
                </View>

                <View style={styles.mainContainer}>
                <TouchableOpacity onPress={()=> this.callAPI(true)}>
                <Image source={require('../assets/addition.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.callAPI(false)}>
                <Image source={require('../assets/subtraction.png')} />
                </TouchableOpacity>
                    <Text style={{color:'#FFF', fontWeight:'300', fontSize:20}}>
                        {"Capacity: " + this.state.patrons +" / " + this.state.capacity}
                    </Text>
                </View>
            </View>
            );
        }
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
