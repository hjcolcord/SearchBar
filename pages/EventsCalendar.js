import React from 'react';
import { Dimensions, ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPathFromState } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class EventsCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.notchHeight = 30;
        this.picPathName = '';

    }
    componentDidMount() {
        console.log(this.props.route.params.barVal);
        switch (this.props.route.params.barVal) {
            case 0:
                this.picPathName = require('../assets/KK2.png');
              break;
            case 1:
                this.picPathName = require('../assets/whiskeyjacks.png');
              break;
            case 2:
                this.picPathName = require('../assets/luckys.png');
            break;
            case 3:
                this.picPathName = require('../assets/lucille.png');
            break;
            case 4:
                this.picPathName = require('../assets/uu.jpg');
            break;
            default:
              // code block
        }
    }

    getPath() {
        switch (this.props.route.params.barVal) {
            case 0:
                this.picPathName = require('../assets/KK2.png');
              break;
            case 1:
                this.picPathName = require('../assets/whiskeyjacks.png');
              break;
            case 2:
                this.picPathName = require('../assets/luckys.png');
            break;
            case 3:
                this.picPathName = require('../assets/lucille.png');
            break;
            case 4:
                this.picPathName = require('../assets/uu.jpg');
            break;
            default:
              // code block
        }
        return this.picPathName;
    }

    populateDeals() {
        let numDeals = 7;
        let dealsList = [];
        for (let i = 0; i < numDeals; i++) {
            dealsList.push(
                <View style={{marginBottom: 10, width: windowWidth, height: 125, alignItems: 'center'}}>
                    <View style={styles.dealTile}>
                        <Text  style={{color:'#FFF', fontWeight:'300', fontSize:20}}>
                            Event #{i + 1}
                        </Text>
                    </View>

                </View>
            );
        }
        return dealsList;
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
                                    style={{justifyContent:'center', alignItems:'center'}}
                                    onPress={() => this.props.navigation.navigate('BarDetails')}>
                                    <MaterialIcon
                                        style={{marginBottom: 0}}
                                        name="chevron-left"
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
                <ScrollView
                    style={styles.eventsContainer}>
                    {this.populateDeals()}
                </ScrollView>
                <ImageBackground
                        style={styles.image}
                        source={this.getPath()}/>
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
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    eventsContainer: {
        flex: 1,
        zIndex: 1,
    },
    barInfoSect: {
        width: windowWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222',
        shadowColor: '#FFF',
        shadowRadius:5,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.7,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
    },
    image: {
        position: 'absolute',
        height: 400,
        width: windowWidth,
        opacity: 0.05,
    },
    dealTile: {
        width: '80%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#FFFFFF33',
        borderRadius: 15,
        shadowColor: '#FFF',
        shadowRadius:15,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
    },
});