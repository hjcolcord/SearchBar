import 'react-native-gesture-handler';
import React from 'react';
import {Alert} from 'react-native';
import {Login} from './pages/Login';
import {Signup} from './pages/Signup'
import {UserLanding} from './pages/UserLanding';
import {BarList} from './pages/BarList';
import {Settings} from './pages/Settings';
import {ManagerLanding} from './pages/ManagerLanding';
import {ManagerDeals} from './pages/ManagerDeals';
import {BouncerLanding} from './pages/BouncerLanding';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'ManagerHome') {
              iconName = focused
                ? 'settings'
                : 'settings-outline';
            } else if (route.name === 'ManagerDeals') {
              iconName = focused ? 'spa' : 'spa-outline';
            }

            // You can return any component that you like here!
            return <MaterialIcon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="ManagerHome" component={ManagerLanding} />
        <Tab.Screen name="ManagerDeals" component={ManagerDeals} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer}/>
        <Stack.Screen name="ManagerNav" component={ManagerNav}/>
        <Stack.Screen name="BouncerNav" component={BouncerLanding}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
