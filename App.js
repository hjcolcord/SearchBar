import 'react-native-gesture-handler';
import React from 'react';
import {Alert} from 'react-native';
import {Login} from './pages/Login';
import {Signup} from './pages/Signup'
import {UserLanding} from './pages/UserLanding';
import {BarList} from './pages/BarList';
import {BarInfo} from './pages/BarInfo';
import {Settings} from './pages/Settings';
import {ManagerLanding} from './pages/ManagerLanding';
import {ManagerDeals} from './pages/ManagerDeals';
import {BouncerLanding} from './pages/BouncerLanding';
import {Staffing} from './pages/Staffing'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';

Icon.loadFont();
MaterialIcon.loadFont();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>

      <DrawerItemList {...props} />
      <DrawerItem
        label={""}
        style={{justifyContent:'center', alignItems:'center'}}/>
      <DrawerItem
        label={"Log Out"}
        labelStyle={{color:'#FFF'}}
        icon={() => <MaterialIcon color={'#FFF'} size={23} name={'logout'}/>}
        style={{justifyContent:'center', alignItems:'center', backgroundColor: '#e74c3c'}}
        onPress={()=>Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            {text: 'Cancel', onPress: () => {props.navigation.toggleDrawer();}},
            {text: 'Confirm', onPress: () => {
              //AsyncStorage.clear();
              props.navigation.navigate('Login')
            }},
          ],
          { cancelable: false }
        )}/>
    </DrawerContentScrollView>
  );
}

function HomeDrawer() {
  return (
      <Drawer.Navigator
        drawerStyle={{ backgroundColor: '#555'}}
        drawerContent={props => <CustomDrawerContent {...props} />}
        headerMode="none"
        drawerContentOptions={{
          activeTintColor: "#00EBBE",
          inactiveTintColor: "#FFF",
          itemStyle: { marginVertical: 10 },
        }}>
        <Drawer.Screen 
            options={{drawerIcon: config => <Icon color={'#00EBBE'} size={23} name={'map'}/>}}
            name="Bar Map"
            component={UserLanding}/>
        <Drawer.Screen 
            options={{drawerIcon: config => <Icon color={'#00EBBE'} size={23} name={'list'}/>}}
            name="Bar List"
            component={BarList}/>
        <Drawer.Screen
            options={{drawerIcon: config => <MaterialIcon color={'#00EBBE'} size={23} name={'settings'}/>}}
            name="Settings"
            component={Settings}/>
      </Drawer.Navigator>
  );
}

function ManagerNav() {
  return (
    <Tab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size,}) => {
            let iconName;

            if (route.name === 'ManagerHome') {
              iconName = focused
                ? 'account'
                : 'account-outline';
            } else if (route.name === 'ManagerDeals') {
              iconName = focused ? 'spa' : 'spa-outline';
            }

           else if (route.name === 'Staffing') {
            iconName = focused ? "clipboard-account" : "clipboard-account-outline";
           }

            // You can return any component that you like here!
            return <MaterialIcon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          style: {
            backgroundColor: 'black',
            
          },
          activeTintColor: '#30A7CB',
          inactiveTintColor: '#144757',
          
          
        }}
      >
        <Tab.Screen name="ManagerHome"  component={ManagerLanding} />
        <Tab.Screen name="ManagerDeals" component={ManagerDeals}  />
        <Tab.Screen name="Staffing"     component={Staffing}     />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="HomeDrawer">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer}/>
        <Stack.Screen name="ManagerNav" component={ManagerNav}/>
        <Stack.Screen name="BouncerNav" component={BouncerLanding}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="BarInfo" component={BarInfo} />
        <Stack.Screen name="Staffing" component={Staffing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
