import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Isao } from 'react-native-textinput-effects';

import SwitchSelector from 'react-native-switch-selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ENDPOINT = "https://uw-crowd-control.herokuapp.com/addUser";

export class Signup extends React.Component {
    constructor(props) {
        super(props);

        // Contains logic to add users
        // Currently only regular users are implimented
        // 
        // We may have to add additional screens for bouncers and managers
        // For bouncers, we need them to input their linkedBar (Manager's email)
        // And for Managers, we need their bar name, bar description, bar  
        this.continueSignup = function(){
            // Regular user signup 
            if(this.state.navPath === 'HomeDrawer'){
                // Check that information exists in all forms 
                if([this.email, this.password, this.confirmPassword, this.city].includes(""))
                {
                    alert("Not all forms filled") 
                    return;  
                }
                if(this.password != this.confirmPassword){
                    alert("Passwords do not match")
                    return;
                }

                // Craft the endpoint
                const url = `${ENDPOINT}?email=${this.email}&password=${this.password}&city=${this.city}&status=1&key=su8tpE6D2gh`;

                // Send the request
                const attemptAddUser = async () => {
                    const response = await fetch(url); // Send the request
                    const json = await response.json(); // Jsonify
                    // Unless there is a catastrophic event in the backend, ['Result'] will always
                    // be a key
                    if(!Boolean(json["Result"])){
                        // If `UNIQUE` is in the error message, it's because somebody already took the email
                        alert(`Error in signing up.\nReason: ${json["Reason"].includes("UNIQUE") ? "User already exists" : json["Reason"]}`);
                    }else{
                        // Everything worked!
                        alert(`Successfully added ${this.email}`);
                        // We know this is a regular user, we can continue 
                        this.setNavigation('HomeDrawer');
                    }
                }
                attemptAddUser();

            }else{
                alert("This can only add regular users for now");
            }
        }

        this.state = {
            navPath: 'HomeDrawer'
        };

        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.city = "";

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
                            onChangeText={(email) => this.email = (email)}
                            // active border height
                            borderHeight={2}
                            inputPadding={16}
                            labelHeight={20}
                            // this is applied as passive border and label color
                            passiveColor={'#dadada'}
                        />

                        <Isao
                            label={'City'}
                            // this is applied as active border and label color
                            activeColor={'#A537FD'}
                            onChangeText={(city) => this.city = (city)}
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
                            activeColor={'#00EBBE'}
                            onChangeText={(password) => this.password = (password)}
                            // active border height
                            borderHeight={2}
                            inputPadding={16}
                            labelHeight={20}
                            secureTextEntry={true}
                            // this is applied as passive border and label color
                            passiveColor={'#dadada'}
                        />

                        <Isao
                            label={'Confirm Password'}
                            // this is applied as active border and label color
                            activeColor={'#00EBBE'}
                            onChangeText={(confirmPassword) => this.confirmPassword = (confirmPassword)}
                            // active border height
                            secureTextEntry={true}
                            borderHeight={2}
                            inputPadding={16}
                            labelHeight={20}
                            // this is applied as passive border and label color
                            passiveColor={'#dadada'}
                        />

                    </View>

                </KeyboardAvoidingView>
                <View style={styles.baseBorder}>
                    <SwitchSelector
                        initial={1}
                        onPress={value => this.setNavigation(value)}
                        textColor={'#A537FD'} //'#7a44cf'
                        selectedColor={'#FFF'}
                        buttonColor={'#A537FD'}
                        borderColor={'#A537FD'}
                        backgroundColor={'#000'}
                        hasPadding = {true}
                        options={[
                            { label: 'Manager', value: '0'},
                            { label: 'User', value: '1'},
                            { label: 'Bouncer', value: '2'},
                        ]}
                        />
                </View>  
                <View style={{flex:0.25, justifyContent:'center', alignItems:'center', backgroundColor: 'black'}}>

                        <TouchableOpacity 
                            style={styles.buttonLogin}
                            onPress={() => this.continueSignup()}>
                            <LinearGradient
                                colors={['#A537FD', '#00EBBE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonLoginGrad}>
                                    <Text
                                        style={{color:'#FFF', fontWeight:"bold", fontSize:20}}>
                                        {this.state.navPath == 'HomeDrawer' ? "Signup":"Continue"}
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
    alignItems:'stretch',
    justifyContent:'flex-end',
  },
  titleContainer: {
    flex:0.15,
    alignItems:'center',
    justifyContent:'center',
  },
  logoImg: {
    width: 75,
    height: 87,
  },
  loginBox: {
      flex: 1.25,
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
    flex: 1,
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
