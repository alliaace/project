import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, BackHandler } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import ReservationScreen from '../../routes/DashBoardGetter'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
var userdata = [];

BackHandler.addEventListener('hardwareBackPress', function () {

  return true


});





const FirstRoute = ({  navigation }) => (
  
  < View style = { [styles.scene]} >
    <StatusBar hidden />

    <ReservationScreen UserData={userdata} />

  </View >
);



// const SecondRoute = () => (
//   <View style={[styles.scene]} />
// );
const SecondRoute = () => (
  <View style={[styles.scene]} />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function gochoose({ route,navigation }) {

  const { data } = route.params;
  userdata=data;
  // console.log("user data is going correctly",userdata);
  

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Reservation' },
    { key: 'second', title: 'Delivery' }
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // second: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{ backgroundColor: "pink" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    fontSize: 100,
    backgroundColor: "black"
  },
  scene: {
    flex: 1,
    backgroundColor: 'white'
  },
});
