import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class BarList extends React.Component {
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
                                    onPress={() => this.props.navigation.toggleDrawer()}>
                                    <Icon
                                        name="menu"
                                        size={40}
                                        color={'#FFF'}
                                        backgroundColor={'#00000000'}
                                    />
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
                    <Text style={{color: '#FFF'}}>
                        {"Bar List"}
                    </Text>
                    <ScrollView>
                        {getBars(this.props)}
                    </ScrollView>
                </View>
            </View>
            );
        }
    }

    function getBars(props){
        //TODO: replace x with array or other object of bars list and switch for with foreach
        let x = new Array();
        for (let index = 0; index < 10; index++) {
            x[index] = barFormat(index, props);
            
        }
        return x;
    }

    function barFormat(info, props){
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
                    onPress={() => props.navigation.navigate("BarInfo")}>
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
    mainContainer: {
        flex: 1,
        width: windowWidth,
        backgroundColor: '#000',
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
