import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ENDPOINT = 'https://uw-crowd-control.herokuapp.com/findBars';

export class BarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bars: null,
        };
        this.notchHeight = 30;

        // Get all the bars upon loading
        // Can also be called to update bars
        // (Currently only called once when building UserLanding)
        const getBars = async() => {
            AsyncStorage.getItem('city', (error, city) => {
                if (city == null){
                    console.log('Warning, there is no existing city in AsyncStorage, no API call will be made.');
                } else {
                    const request = async () => {
                        const response = await fetch(`${ENDPOINT}?city=${city}`);
                        this.setState({
                            bars: await response.json(),
                        });
                        AsyncStorage.setItem('bars', JSON.stringify(this.state.bars));
                    };
                    request();
                }
            });
        };
        getBars();
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
                        {this.getBarsList()}
                    </ScrollView>
                </View>
            </View>
            );
        }

        

        getBarsList(){
            //TODO: replace index with array or other object of bars list and switch for with foreach
            let x = new Array();
            console.log("This is where bars should be stated " + this.state.bars)
            if (this.state.bars !== null) {
                for (let i = 0; i < this.state.bars.length; i++) {
                    x[i] = this.barFormat(i);
                }
            }
            return x;
        }

        //Goes to detail page about specific bar
        goToBarDetails(barVal){
            this.props.navigation.navigate('BarDetails', {
                barName: this.state.bars[barVal].bar,
                barVal: barVal,
                location: this.state.bars[barVal].address,
              });
        }
    
        //Just the basic format for showing some of the info on the bars
        barFormat(barVal){
            return (   
            <View key={this.state.bars[barVal].bar} style={styles.buttonLogin, {borderRadius:50 ,padding: 30, margin: 10,backgroundColor: '#838383', width: windowWidth/1.2}}>
                <Text style={{color: '#FFF', fontSize: 25}}>
                    {"Name: " + this.state.bars[barVal].bar}
                </Text>
                <Text style={{color: '#FFF', fontSize: 25}}>
                    {"Capacity: " + this.state.bars[barVal].patrons + '/' + this.state.bars[barVal].capacity}
                </Text>
                <Text style={{color: '#FFF', fontSize: 25}}>
                    {"Wait Time: 0 min"}
                </Text>
                <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity 
                        style={styles.buttonLogin}
                        //TODO: Navigate to BarInfo landing and send specific bar info with it
                        onPress={() => this.goToBarDetails(barVal)}>
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
