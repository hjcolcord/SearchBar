import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Isao } from 'react-native-textinput-effects';
import {flushStorage, logCurrentStorage} from './Storage';
import {AsyncStorage} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

const windowWidth = Dimensions.get('window').width;

const ENDPOINT = 'https://uw-crowd-control.herokuapp.com/login';
//const windowHeight = Dimensions.get('window').height;

export class Login extends React.Component {
    constructor(props) {
        super(props);

        // This removes all logged in users
        // currently, we do not keep in memory whether or not
        // a user is logged in, but this ensures that they
        // are not when if they reach this page
        //  flushStorage();

        this.toState = function(){
            //console.log(this.username + " " + this.password);
            // API docs: https://stoplight.io/p/docs/gh/kroat/crowd-control-api

            // Clear all local storage
            AsyncStorage.clear();
            logCurrentStorage();

            // This is the endpoint api
            const URL = `https://uw-crowd-control.herokuapp.com/login?email=${this.username}&password=${this.password}&key=su8tpE6D2gh`;

            // Wrapping everything into async and using await allows for code to run procedurally
            // I couldn't get fetch to work asyncrouslly in another class
            // so there's proabably a better way to do this
            const request = async () => {

                const response = await fetch(URL); // Send the request
                const json = await response.json(); // Jsonify
                /*
                Expected JSON response for a successful login:
                {
                    "Result": true,
                    "Status": "1,2,or 3 (Integer)",
                    "linkedBar": "bar owner's email",
                    "city": "User's city"
                }
                */
                const result = Boolean(await json.Result); // Result stores (true/false) for whether or not a user exists

                // Print it out
                console.log(`User attempted login (${this.username},${this.password}) ~ got response: ${result} (This user ${result ? 'exists' : "doesn't exist"})`);
                console.log('Full JSON Object: ', json);
                // Make sure that there is no local storage
                flushStorage();

                if (result || 1) // Case in which the user exists (just remove || 1)
                {

                    // Note, the JSON response will return the status, which automatically can select
                    // the intended state (1=User, 2=Bouncer, 3=Owner)
                    let intendedStateFromJson = null;

                    // ** This is a real successful login **
                    // As of now, we can ignore unsuccessful logins
                    // and let the user enter the main screen regardless
                    if (result){
                        // Map our react status to backend statuses (1-3)
                        intendedStateFromJson = parseInt(json.Status);
                        AsyncStorage.setItem('city', json.city);
                        switch (intendedStateFromJson){
                            case 1:
                                this.setState({
                                    navPath: 'HomeDrawer',
                                });
                            break;
                            case 2:
                                AsyncStorage.setItem('linkedBar', json.linkedBar);
                                this.setState({
                                    navPath: 'BouncerNav',
                                });
                            break;
                            case 3:
                                this.setState({
                                    navPath: 'ManagerNav',
                                });
                            break;
                        }
                        // Similar to sharedPreferences in android
                        // however there are some bugs so i will comment this out
                        // storeData(this.email, this.state.navPath);
                        this.setNavigation(intendedStateFromJson);
                        this.props.navigation.navigate(this.state.navPath);
                    }

                    // Catch-all, we can remove this for demo-time
                    if (this.state == null){
                        navPath: 'HomeDrawer';
                        return this.props.navigation.navigate(this.state.navPath);
                    } else {
                        return this.props.navigation.navigate(this.state.navPath);
                    }
                }
                // Need to add: case in which a user does not exist
                // Popups for unsuccessful logins
            };
            request(); // Send the request
        };

        this.state = {
            navPath: 'HomeDrawer',
        };

        this.username = ''; // says username, means email
        this.password = '';

    }

    setNavigation(naviVal) {

        switch (naviVal) {
            case '0':
                //console.log('ManagerNav');
                this.setState({
                    navPath: 'ManagerNav',
                });
              break;
            case '1':
                console.log('HomeDrawer has been called');
                this.setState({
                    navPath: 'HomeDrawer',
                });
              break;
            case '2':
                //console.log('BouncerNav');
                this.setState({
                    navPath: 'BouncerNav',
                });
            break;
            default:
              // code block
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#000'} barStyle={'light-content'}/>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.logoImg}
                        source={require('../assets/GradientLogo.png')}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={{color:'#FFF', fontWeight:'200', fontSize:30}}>
                            searchbar
                    </Text>
                </View>

                <KeyboardAvoidingView
                    style={styles.loginBox}
                    behavior={'height'}>
                    <View style={styles.loginBoxInterior}>
                        <Isao
                            label={'Email'}
                            // this is applied as active border and label color
                            activeColor={'#00EBBE'}
                            onChangeText={(username) => this.username = (username)}
                            // active border height
                            borderHeight={2}
                            inputPadding={16}
                            labelHeight={20}
                            // this is applied as passive border and label color
                            passiveColor={'#dadada'}
                        />
                        <Isao
                            label={'Password'}
                            // this is applied as active border and label color
                            activeColor={'#A537FD'}
                            onChangeText={(password) => this.password = (password)}
                            // active border height
                            borderHeight={2}
                            inputPadding={16}
                            secureTextEntry={true}
                            labelHeight={20}
                            // this is applied as passive border and label color
                            passiveColor={'#dadada'}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={{flex:0.25, justifyContent:'center', alignItems:'center', backgroundColor: 'black'}}>


                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => this.toState()}>
                            <LinearGradient
                                colors={['#A537FD', '#00EBBE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonLoginGrad}>
                                    <Text
                                        style={{color:'#FFF', fontWeight:'bold', fontSize:20}}>
                                        Login
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonSignup}
                            onPress={() => this.props.navigation.navigate('Signup')}>
                            <LinearGradient
                                colors={['#A537FD', '#00EBBE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonLoginGrad}>
                                    <Text
                                        style={{color:'#FFF', fontWeight:'bold', fontSize:20}}>
                                        Sign Up
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
  buttonSignup: {
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
  imageContainer: {
    flex:0.5,
    alignItems:'center',
    justifyContent:'flex-end',
  },
  titleContainer: {
    flex:0.1,
    alignItems:'center',
    justifyContent:'center',
  },
  logoImg: {
    width: 150,
    height: 174,
  },
  loginBox: {
      flex: 0.4,
      width: windowWidth * 0.7,
      marginBottom: 15,
      backgroundColor: '#2D2D2D',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#00EBBE',
      justifyContent:'center',
      alignItems:'center',
  },
  loginBoxInterior: {
    flex: 0.95,
    width: windowWidth * 0.68,
    backgroundColor: '#2D2D2D',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
},
  baseBorder: {
    flex: 0.3,
    justifyContent:'center',
    alignItems: 'center',
    width: windowWidth * 0.9,
    backgroundColor: '#000',
},
});
