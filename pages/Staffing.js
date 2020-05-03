import React, {Component, useState } from 'react';

import { Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View, FlatList, BackHandler,TextInput, DatePickerAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from  'react-native-vector-icons/MaterialCommunityIcons';



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




    

export class Staffing extends React.Component {
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


                    <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontWeight: '400', fontSize: 20, paddingTop:20, paddingBottom:20 }}>
                        Employees Scheduled this Week: 
                    </Text>

                    <FlatList
                        style={styles.barlist, { paddingTop: 0 }, { paddingRight: 75 }}
                        data={[
                            { key: 'Employee 1' },
                            { key: 'Employee 2' },
                            { key: 'Employee 3' },
                        ]}
                        renderItem={({ item }) =>
                            <LinearGradient
                                colors={['black', 'grey']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 0, y: -0.05 }}
                            >
                                <Text style={{ paddingTop: 20, paddingBottom: 22, paddingLeft: 10, color: '#30A7CB', fontSize: 20, textAlign: 'left' }}>
                                    {item.key}
                                </Text>

                            </LinearGradient>
                        }
                    />
                    <ActionButton buttonColor="#30A7CB" >

                        <ActionButton.Item buttonColor='#9632F8' title="Add Employee" onPress={() => { this.setState({ visible: true }); }}>
                            <Icon2 name="account-plus" style={styles.plusButtonIcon} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#7052BA' title="Delete Employee" onPress={() => { this.setState({ defaultAnimationDialog: true }); }}>
                            <Icon2 name="account-minus" style={styles.minusButtonIcon} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#6C5DE6' title="Edit Employee" onPress={() => this.setState({ scaleAnimationDialog: true })}>
                            <Icon2 name="account-edit" style={styles.editButtonIcon} />
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#3F92D3' title="Urgent Employee" onPress={() => this.setState({ slideAnimationDialog: true })}>
                            <Icon2 name="account-alert" style={styles.lightningButtonIcon} />
                        </ActionButton.Item>

                    </ActionButton> 
                    
                    <Dialog
                        style={{ backgroundColor: 'black' }}
                        width={0.9}
                        height={0.9}
                        dialogTitle={
                            <DialogTitle
                                title="Create New Deal"
                                style={{
                                    backgroundColor: 'black'
                                }}
                                textStyle={styles.dialogTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        visible={this.state.visible}
                        footer={
                            <DialogFooter style={{ backgroundColor: 'black',}}>
                                <DialogButton
                                    text="Create"
                                    textStyle={{ color: "green" }}
                                    onPress={() => { }}
                                />
                                <DialogButton
                                    text="Cancel"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => { this.setState({ visible: false }); }}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:25}}>
                              Enter Employee Name:
                            </Text>

                            <TextInput 
                                 style={styles.creditInput}
                                 placeholder = "Enter Here"
                                 placeholderTextColor='#144757'
                            />

                            <Text  style={{ color: 'rgba(48, 167, 203,0.9)' , fontSize:25}}>
                              Enter Employee Position:
                            </Text>

                            <TextInput 
                                 style={styles.creditInput}
                                 placeholder = "Enter Here"
                                 placeholderTextColor='#144757'
                            />

                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Set Shift Date:
                            </Text>

                            <DatePicker
                                style={{ width: 200 },{backgroundColor:'black'} }
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                placeholderTextColor='rgba(48, 167, 203,0.9)'
                                format="YYYY-MM-DD"
                                minDate="2020-05-01"
                                maxDate="2025-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        Iconcolor:'rgba(48, 167, 203,0.9)'
                                    },
                                    dateInput: { marginLeft: 36, color: 'rgba(48, 167, 203,0.9)' }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />


                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Shift Start Time:
                            </Text>
                            
                            <TextInput
                                style={styles.creditInput}
                                placeholder="XX:XX AM/PM"
                                placeholderTextColor='#144757'
                            ></TextInput>

                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Shift End Time:
                            </Text>
                            
                            <TextInput
                                style={styles.creditInput}
                                placeholder="XX:XX AM/PM"
                                placeholderTextColor='#144757'
                            ></TextInput>
                        </DialogContent>
                    </Dialog>


                    <Dialog
                        onDismiss={() => { this.setState({ defaultAnimationDialog: false }); }}
                        style={{ backgroundColor: 'black' }}
                        width={0.9}
                        height={0.9}
                        dialogTitle={
                            <DialogTitle
                                title="Delete Employee"
                                style={{
                                    backgroundColor: 'black'
                                }}
                                textStyle={styles.dialogTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        visible={this.state.defaultAnimationDialog}
                        footer={
                            <DialogFooter  style={{backgroundColor: 'black',}}>
                                <DialogButton
                                    text="Delete"
                                    textStyle={{color:"red"}}
                                    onPress={() => { }}
                                />
                                <DialogButton
                                    text="Cancel"
                                    textStyle={{color:'rgba(48, 167, 203,0.9)'}}
                                    onPress={() => { this.setState({ defaultAnimationDialog: false }); }}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent style={styles.dialogContent1}>
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter Employee Name:
                              </Text>

                            <TextInput
                                style={styles.creditInput}
                                placeholder="Enter Here"
                                placeholderTextColor='#144757'
                            ></TextInput>

                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter Initial Shift Date:
                            </Text>
                            

                            <DatePicker
                                style={{ width: 200 }, { backgroundColor: 'black' }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                placeholderTextColor='rgba(48, 167, 203,0.9)'
                                format="YYYY-MM-DD"
                                minDate="2020-05-01"
                                maxDate="2025-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        Iconcolor: 'rgba(48, 167, 203,0.9)'
                                    },
                                    dateInput: { marginLeft: 36, color: 'rgba(48, 167, 203,0.9)' }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        style={{ backgroundColor: 'black' }}
                        width={0.9}
                        height={0.9}
                        dialogTitle={
                            <DialogTitle
                                title="Modify Deal"
                                style={{
                                    backgroundColor: 'black'
                                }}
                                textStyle={styles.dialogTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        visible={this.state.scaleAnimationDialog}
                        footer={
                            <DialogFooter  style={{backgroundColor: 'black',}}>
                                <DialogButton
                                    text="Save"
                                    textStyle={{color:"green"}}
                                    onPress={() => { }}
                                />
                                <DialogButton
                                    text="Cancel"
                                    textStyle={{color:'rgba(48, 167, 203,0.9)'}}
                                    onPress={() => {
                                        this.setState({ scaleAnimationDialog:false});}}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter Initial Employee Name:
                            </Text>
                            
                            <TextInput
                                style={styles.creditInput}
                                placeholder="Enter Here"
                                placeholderTextColor='#144757'
                            />
                            
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter initial Shift Date:
                            </Text>

                            <DatePicker
                                style={{ width: 200 },{backgroundColor:'black'} }
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                placeholderTextColor='rgba(48, 167, 203,0.9)'
                                format="YYYY-MM-DD"
                                minDate="2020-05-01"
                                maxDate="2025-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        Iconcolor: 'rgba(48, 167, 203,0.9)'
                                    },
                                    dateInput: { marginLeft: 36, color: 'rgba(48, 167, 203,0.9)' }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter New Shift Date:
                            </Text>

                            <DatePicker
                                style={{ width: 200 }, { backgroundColor: 'black' }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                placeholderTextColor='rgba(48, 167, 203,0.9)'
                                format="YYYY-MM-DD"
                                minDate="2020-05-01"
                                maxDate="2025-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        Iconcolor: 'rgba(48, 167, 203,0.9)'
                                    },
                                    dateInput: { marginLeft: 36, color: 'rgba(48, 167, 203,0.9)' }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter New Shift Start Time:
                            </Text>

                            <TextInput
                                style={styles.creditInput}
                                placeholder="Enter Here"
                                placeholderTextColor='#144757'
                            />
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter New Shift End Time:
                            </Text>

                            <TextInput
                                style={styles.creditInput}
                                placeholder="Enter Here"
                                placeholderTextColor='#144757'
                            />
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        style={{ backgroundColor: 'black' }}
                        width={0.9}
                        height={0.9}
                        dialogTitle={
                            <DialogTitle
                                title="URGENT Employee"
                                style={{ backgroundColor: 'black' }}
                                textStyle={styles.lightningTitle}
                                hasTitleBar={true}
                                align="center"
                            />
                      }
                        visible={this.state.slideAnimationDialog}
                        footer={
                            <DialogFooter style={{ backgroundColor: 'black', }}>
                                <DialogButton
                                    text="Add"
                                    textStyle={{ color: 'rgba(48, 167, 203,0.9)' }}
                                    onPress={() => { }}
                                />
                                <DialogButton
                                    text="Cancel"
                                    textStyle={{color:'rgba(48, 167, 203,0.9)'}}
                                    onPress={() => {this.setState({slideAnimationDialog: false });}}
                                />
                            </DialogFooter>
                                }
                    >
                        <DialogContent style={styles.dialogContent1} >
                            <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter Employee Name: 
                            </Text>

                            <TextInput
                                style={styles.creditInput}
                                placeholder="Enter Here"
                                placeholderTextColor='#144757'
                            />
                             <Text style={{ color: 'rgba(48, 167, 203,0.9)', fontSize: 25 }}>
                                Enter Employee Position
                            </Text>

                            <TextInput
                                style={styles.creditInput}
                                placeholder="Enter Here"
                                placeholderTextColor='#144757'
                            />
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
        flexDirection: 'column',
        backgroundColor: 'black',
        width: 360,
    },

    creditInput: {
        flex: 1,
        color: 'rgba(48, 167, 203,0.9)', //Expecting this to change input text color
        height: 30,
        fontSize: 20,
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
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
    },

    buttonLoginGrad: {
        width: windowWidth * 0.7,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    item: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        height: 60,
        color: 'blue',
        backgroundColor: "grey"
    },

    editBar: {
        flex: 1,
        backgroundColor: 'green'

    },

    barlist: {
        flex: 1,
        height: 60,

        alignItems: 'stretch'


    },
    actionButtonIcon: {
        fontSize: 21,
        height: 22,
        color: "#151519"



    },
    plusButtonIcon: {
        fontSize: 28,
        height: 25,
        color: 'black',
        paddingRight: 3,
        textAlign:"center"


    },
    minusButtonIcon: {
        fontSize: 28,
        height: 25,
        color: "black",
        paddingRight:4,
        textAlign:"center"



    },



    editButtonIcon: {
        fontSize: 29.5,
        height: 29,
        color: "black",
        paddingRight:0.5,
        textAlign:"center"



    },
    lightningButtonIcon: {
        fontSize: 28,
        height: 27,
        color: 'black',
        textAlign:"center"


    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        // flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    dialogContent1: {
        flex: 1,
        backgroundColor: "black",
        flexDirection: "column",
    },
    dialogTitle: {
        color: 'rgba(48, 167, 203,0.9)',
        //fontWeight:"bold",
        fontSize: 32

    },
    lightningTitle: {
        color: 'rgba(48, 167, 203,0.9)',
        //fontWeight:"bold",
        fontSize: 32

    },

    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    customBackgroundDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
    },



});
