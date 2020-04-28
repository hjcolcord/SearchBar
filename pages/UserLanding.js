import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';


const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

export class UserLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            whiskeysWait: 0,
            lucilleWait: 0,
            luckysWait: 0,
            kkWait: 0,
            uuWait: 0,
            selectedBar: 'Select a bar!',
            selectedCapacity: 100,
            selectedOccupancy: 56,
            capacityString: '',
            selectedAddress: '',
            dealButton: 0,
        };
        this.notchHeight = 30;
    }
    selectBar = (barVal) => {
        //let string = 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + {this.state.selectedCapacity};
        switch (barVal){
            case 0:
                this.setState({
                    selectedBar: "Whiskey Jack's Saloon",
                    selectedCapacity: 100,
                    selectedOccupancy: 56,
                    dealButton: 60,
                    capacityString: 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + this.state.selectedCapacity,
                });
            break;
            case 1:
                this.setState({
                    selectedBar: 'Lucille',
                    selectedCapacity: 100,
                    selectedOccupancy: 56,
                    dealButton: 60,
                    capacityString: 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + this.state.selectedCapacity,
                });
            break;
            case 2:
                this.setState({
                    selectedBar: "Lucky's 1313",
                    selectedCapacity: 100,
                    selectedOccupancy: 56,
                    dealButton: 60,
                    capacityString: 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + this.state.selectedCapacity,
                });
            break;
            case 3:
                this.setState({
                    selectedBar: 'Kollege Klub',
                    selectedCapacity: 100,
                    selectedOccupancy: 56,
                    dealButton: 60,
                    capacityString: 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + this.state.selectedCapacity,
                });
            break;
            case 4:
                this.setState({
                    selectedBar: 'The Double U',
                    selectedCapacity: 100,
                    selectedOccupancy: 56,
                    dealButton: 60,
                    capacityString: 'Current Occupancy: ' + this.state.selectedOccupancy + '/' + this.state.selectedCapacity,
                });
            break;
        }
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

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                        latitude: 43.075173,
                        longitude: -89.394829,
                        latitudeDelta: 0.0422,
                        longitudeDelta: 0.0121,
                        }}>
                        <MapView.Marker
                            onPress={() => this.selectBar(0)}
                            coordinate={{latitude: 43.075173,
                            longitude: -89.394829}}
                            title={"Whiskey Jack's"}
                            description={'Wait Time: ' + this.state.whiskeysWait + ' minutes'}
                        />
                        <MapView.Marker
                            onPress={() => this.selectBar(1)}
                            coordinate={{latitude: 43.074549,
                            longitude: -89.381452}}
                            title={'Lucille'}
                            description={'Wait Time: ' + this.state.lucilleWait + ' minutes'}
                        />
                        <MapView.Marker
                            onPress={() => this.selectBar(2)}
                            coordinate={{latitude: 43.067800,
                            longitude: -89.408182}}
                            title={"Lucky's"}
                            description={'Wait Time: ' + this.state.luckysWait + ' minutes'}
                        />
                        <MapView.Marker
                            onPress={() => this.selectBar(3)}
                            coordinate={{latitude: 43.075787,
                            longitude: -89.397064}}
                            title={'Kollege Klub'}
                            description={'Wait Time: ' + this.state.kkWait + ' minutes'}
                        />
                        <MapView.Marker
                            onPress={() => this.selectBar(4)}
                            coordinate={{latitude: 43.073440,
                            longitude: -89.396792}}
                            title={'The Double U'}
                            description={'Wait Time: ' + this.state.uuWait + ' minutes'}
                        />
                    </MapView>
                </View>
                <View style={styles.infoSection}>
                    <View style={styles.barInfoview}>
                        <Text
                            style={{color:'#FFF', fontWeight:'bold', fontSize:20}}>
                            {this.state.selectedBar}
                        </Text>
                        <Text
                            style={{color:'#FFF', fontWeight:'normal', fontSize:18}}>
                            {this.state.capacityString}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.buttonLogin,{height: this.state.dealButton}]}>
                        <LinearGradient
                            colors={['#A537FD', '#00EBBE']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonLoginGrad}>
                                <Text
                                    style={{color:'#FFF', fontWeight:"bold", fontSize:20}}>
                                    View Deals
                                </Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        backgroundColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingTop: 5,
        width: windowWidth,
        height: '40%',
        backgroundColor: '#000',
    },
});
