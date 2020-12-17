import * as React from 'react';
import { Button, View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/signup'
import LoginScreen from './src/screens/login'
import Photo from './src/components/imagecheck'
import DashboardUser from './src/screens/user/dashboardUser'
import RestLoginScreen from './src/screens/RestLogIn'
import RestSignUpScreen from './src/screens/RestSignUp'
import RiderLogin from './src/screens/riderLogin'
import RiderSignUpScreen from './src/screens/riderSigup'
import DashboardRest from './src/screens/Restaurant/dashboardRest'
import SplashScreen from 'react-native-splash-screen'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();




function App() {

  React.useEffect(() => {
    console.log("working");

    <View style={{ flex: 1, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 100 }}>hello from splash</Text>
    </View>

    SplashScreen.hide();
  })





  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginUser">
        <Stack.Screen name="LoginUser" component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="SignUpUser" component={SignupScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="SignUpRest" component={RestSignUpScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="LoginRest" component={RestLoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="SignUpRider" component={RiderSignUpScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="LoginRider" component={RiderLogin}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="DasboardUser" component={DashboardUser}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="DasboardRest" component={DashboardRest}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
