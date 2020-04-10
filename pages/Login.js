import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Isao } from 'react-native-textinput-effects';
import SwitchSelector from 'react-native-switch-selector';

const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navPath: 'HomeDrawer',
        };

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
                //console.log('HomeDrawer');
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
                            label={'Username'}
                            // this is applied as active border and label color
                            activeColor={'#00EBBE'}
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
                            // active border height
                            borderHeight={2}
                            inputPadding={16}
                            labelHeight={20}
                            // this is applied as passive border and label color
                            passiveColor={'#dadada'}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={{flex:0.25, justifyContent:'center', alignItems:'center', backgroundColor: 'black'}}>

                        <TouchableOpacity 
                            style={styles.buttonLogin}
                            onPress={() => this.props.navigation.navigate(this.state.navPath)}>
                            <LinearGradient
                                colors={['#A537FD', '#00EBBE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonLoginGrad}>
                                    <Text
                                        style={{color:'#FFF', fontWeight:"bold", fontSize:20}}>
                                        Login
                                    </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                </View>
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
