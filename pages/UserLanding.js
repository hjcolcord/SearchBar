import React from 'react';
import { Animated, Easing, Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {flushStorage, logCurrentStorage} from './Storage';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

console.disableYellowBox = true;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ENDPOINT = 'https://uw-crowd-control.herokuapp.com/findBars';

export class UserLanding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            whiskeysWait: 0,
            lucilleWait: 0,
            luckysWait: 0,
            kkWait: 0,
            uuWait: 0,
            selectedBar: '',
            selectedBarVal: null,
            selectedCapacity: 100,
            selectedOccupancy: 56,
            capacityString: 'Select a bar!',
            waitTimeString: '',
            selectedAddress: '',
            dealButton: 0,
            bars: null, // Holds a JSON object of all the bars
            searchbarHeight: new Animated.Value(0),
            searchIconSize: new Animated.Value(50),
            cancelIconSize: new Animated.Value(0),
        };

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

        this.notchHeight = 30;
    }
    selectBar = (barVal) => {
        //let string = 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + {this.state.selectedCapacity};
        this.setState({
            selectedBar: this.state.bars[barVal].bar,
            selectedBarVal: barVal,
            dealButton: 60,
            capacityString: 'Current Occupancy: ' + this.state.bars[barVal].patrons + '/' + this.state.bars[barVal].capacity,
            waitTimeString: 'Approximate Wait Time: ',
        });
    }

    markBarsOnMap() {
        let mapMarkers = [];
        if (this.state.bars !== null) {
            for (let i = 0; i < this.state.bars.length; i++) {
                mapMarkers.push(
                    <MapView.Marker
                        key= {i}
                        onPress={() => this.selectBar(i)}
                        coordinate={{latitude: parseFloat(this.state.bars[i].lat),
                        longitude: parseFloat(this.state.bars[i].long)}}
                        title={this.state.bars[i].bar}
                        description={'Current Capacity ' + this.state.bars[i].patrons + '/' + this.state.bars[i].capacity}
                    />
                );
            }
        }
        return mapMarkers;
    }

    goToBarDetails = () => {
        this.props.navigation.navigate('BarDetails', {
            barName: this.state.selectedBar,
            barVal: this.state.selectedBarVal,
            location: this.state.bars[this.state.selectedBarVal].address,
          });
    }

    showSearch = () => {
        Animated.timing(this.state.searchbarHeight, {
            useNativeDriver: false,
            toValue: 50,
            duration: 3000,
            easing: Easing.cubic,
        }).start();
    }
    hideSearch = () => {
        Animated.timing(this.state.searchbarHeight, {
            useNativeDriver: false,
            toValue: 0,
            duration: 3000,
            easing: Easing.cubic,
        }).start();
    }

    render(){
        // console.log(this.state.bars);
        if (Platform.OS === 'android') {
            this.notchHeight = 0;
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#000'} barStyle={'light-content'}/>
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
                            <View style = {styles.headerSide}>
                                <TouchableOpacity
                                    onPress={() => this.showSearch()}>
                                    <MaterialIcon
                                        name="magnify"
                                        size={36}
                                        color={'#FFF'}
                                        backgroundColor={'#00000000'}
                                    />
                                </TouchableOpacity>
                            </View>

                        </LinearGradient>
                </View>

                <Animated.View style={[styles.searchDrop, {height: this.state.searchbarHeight}]}>
                    <LinearGradient
                        colors={['#000', '#222']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.header}>
                        <TextInput style={styles.searchInput}/>
                        <TouchableOpacity
                            onPress={() => this.hideSearch()}>
                            <Icon
                                name="circle-with-cross"
                                size={30}
                                color={'#FFF'}
                                backgroundColor={'#00000000'}/>
                    </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                        latitude: 43.075173,
                        longitude: -89.394829,
                        latitudeDelta: 0.0422,
                        longitudeDelta: 0.0121,
                        }}>
                        {this.markBarsOnMap()}

                    </MapView>
                </View>
                <View style={styles.infoSection}>
                    <View style={styles.barInfoview}>
                        <Text
                            style={{color:'#FFF', fontWeight:'bold', fontSize:20}}>
                            {this.state.selectedBar}
                        </Text>
                    </View>
                    <View style={styles.greyBox}>
                        <Text
                            style={{color:'#FFF', fontWeight:'normal', fontSize:18}}>
                            {this.state.capacityString}
                        </Text>
                        <Text
                            style={{color:'#FFF', fontWeight:'normal', fontSize:18}}>
                            {this.state.waitTimeString}
                        </Text>
                        <TouchableOpacity
                            style={[styles.buttonLogin,{height: this.state.dealButton}]}
                            onPress={this.goToBarDetails}>
                            <LinearGradient
                                colors={['#A537FD', '#00EBBE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonLoginGrad}>
                                    <Text
                                        style={{color:'#FFF', fontWeight:'bold', fontSize:20}}>
                                        Deals and Details
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: 'flex-start',
    },
    mapContainer: {
        flex: 0.7,
        width: windowWidth,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        shadowColor: '#FFF',
        shadowRadius:7,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.9,
        zIndex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonLogin: {
        width: windowWidth * 0.8,
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
    barInfoview: {
        alignItems:'center',
        paddingTop: 10,
        width: windowWidth,
        height: '20%',
        backgroundColor: '#000',
        // marginTop: 10,
    },
    searchDrop: {
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
    },
    searchInput: {
        height: 30,
        width: windowWidth * 0.6,
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
    },
    greyBox: {
        width: windowWidth * 0.8,
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222',
        borderRadius: 15
    },
});
