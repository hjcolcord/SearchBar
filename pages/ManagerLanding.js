import React from 'react';
import  { Component,Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View,Button,TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlatButton from '../pages/Button';



import Icon1 from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-popup-dialog';






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class ManagerLanding extends React.Component {
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
                    <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontWeight: '300', fontSize: 33, paddingBottom: 20 }}>
                        Welcome Back
                     </Text>

                    <ActionButton buttonColor="rgba(48, 167, 203,0.9)" >
                        <ActionButton.Item buttonColor='#9533F7' title="Account Setting" onPress={() => {this.setState({defaultAnimationDialog: true}); }}>
                            <Icon1 name="ios-settings" style={styles.ActionButtonItem} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#6E5AE9' title="Bar Information" onPress={() => { this.setState({ visible: true }); }} >
                            <Icon1 name="ios-pint" style={styles.ActionButtonItem} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#27B1C8' title="Staffing" onPress={() => {this.setState({scaleAnimationDialog: true}) }}>
                            <Icon1 name="ios-people" style={styles.ActionButtonItem} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#03E6B7' title="Logout" onPress={() => { this.setState({ SlideAnimation: true }); }} >
                          
                            <Icon name="logout" style={styles.ActionButtonItem} />
                        </ActionButton.Item>
                    </ActionButton>

                       
                    <Dialog
                    
                        useNativeDriver ={true}
                        style={{ backgroundColor: 'black' }}
                        width={windowWidth}
                        height={windowHeight}
                        dialogTitle={
                            <DialogTitle
                                title="Bar Information"
                                style={{ backgroundColor: 'black' }}
                                textStyle={styles.dialogTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        visible={this.state.visible}
                        footer={
                            <DialogFooter style={{
                                backgroundColor: 'black',
                            }}>
                                <DialogButton
                                    text="Close"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => {
                                        this.setState({
                                            visible: false
                                        });
                                    }}
                                />
                            </DialogFooter>
                            }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 28 }}>
                                Bar name: 
                            </Text>
                            <Text style={styles.creditInput}>
                                Whisky Jacks
                            </Text>
                            
                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:28}}>
                              Bar Address:
                              </Text>
                            <Text style={styles.creditInput}>
                                123 State Street
                             </Text>

                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:28}}>
                             Occupancy Level:
                            </Text>
                            <Text style={styles.creditInput}>
                                100/100
                            </Text>
                        </DialogContent>
                    </Dialog>


                    <Dialog 
                        style={{ backgroundColor: 'black' }}
                        useNativeDriver ={true}
                        width={windowWidth}
                        height={windowHeight}
                        dialogTitle={
                            <DialogTitle
                                title="Account Information"
                                style={{ backgroundColor: 'black' }}
                                textStyle={styles.dialogTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        visible={this.state.defaultAnimationDialog}
                        footer={
                            <DialogFooter style={{
                                backgroundColor: 'black',
                            }}>
                                <DialogButton
                                    text="Close"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => {
                                        this.setState({
                                            defaultAnimationDialog: false
                                        });
                                    }}
                                />
                            </DialogFooter>
                            }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 28 }}>
                                Username
                            </Text>
                            <Text style={styles.creditInput}>
                                username
                            </Text>
                            
                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:28}}>
                              First name
                              </Text>
                            <Text style={styles.creditInput}>
                               user
                             </Text>

                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:28}}>
                               Last Name
                            </Text>
                            <Text style={styles.creditInput}>
                                name
                            </Text>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        style={{ backgroundColor: 'black' }}
                        width={0.75}
                        height={0.33}
                        useNativeDriver ={true}
                        
                      
                        visible={this.state.SlideAnimation}
                        footer={
                            <DialogFooter style={{
                                backgroundColor: 'black',
                            }}>
                                <DialogButton
                                    text="Yes"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => {
                                        this.setState({
                                            SlideAnimation: false
                                        });
                                    }}
                                />
                                <DialogButton
                                    text="No"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => {
                                        this.setState({
                                            SlideAnimation: false
                                        });
                                    }}
                                />
                            </DialogFooter>
                            }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 28 }}>
                                Are you sure you want to logout?
                            </Text>
                        </DialogContent>
                    </Dialog>

                    <Dialog 
                        useNativeDriver ={true}
                        style={{ backgroundColor: 'black' }}
                        width={windowWidth}
                        height={windowHeight}
                        dialogTitle={
                            <DialogTitle
                                title="Staff Schedule"
                                style={{ backgroundColor: 'black' }}
                                textStyle={styles.dialogTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        visible={this.state.scaleAnimationDialog}
                        footer={
                            <DialogFooter style={{
                                backgroundColor: 'black',
                            }}>
                                <DialogButton
                                    text="Close"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => {
                                        this.setState({
                                            scaleAnimationDialog: false
                                        });
                                    }}
                                />
                            </DialogFooter>
                            }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 28 }}>
                                Bar name: 
                            </Text>
                            <Text style={styles.creditInput}>
                                Whisky Jacks
                            </Text>
                            
                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:28}}>
                              Bar Address:
                              </Text>
                            <Text style={styles.creditInput}>
                                123 State Street
                             </Text>

                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:28}}>
                             Occupancy Level:
                            </Text>
                            <Text style={styles.creditInput}>
                                100/100
                            </Text>
                        </DialogContent>
                    </Dialog>

                    




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
        creditInput: {
            flex: 1,
            color: 'rgba(48, 167, 203,0.9)', //Expecting this to change input text color
            height: 30,
            fontSize: 20,
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
            backgroundColor: 'black',
           
            alignItems:"center"        
        },
        dialogContent1: {
            flex:1,
            backgroundColor:"black",
            flexDirection:"column",
          },
          dialogTitle:{
            color: 'rgba(48, 167, 203,0.9)',
            //fontWeight:"bold",
             fontSize:32
    
          },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        buttonLogin: {
            borderWidth:1,
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:100
          },
        buttonLoginGrad: {
            width:100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          },
          ActionButtonItem: {
            fontSize: 40,
            height: 45,
            color: 'black',
            borderColor: 'rgba(48, 167, 203,0.9)',
          },
    });