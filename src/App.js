import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Burger from './screens/Burger';
import Results from './screens/Results';
import DirectResult from './screens/DirectResult';
import HeaderHome from './components/headerHome';
import HeaderBurger from './components/headerBurger';
import HeaderResults from './components/headerResults';
import HeaderDirectResult from './components/headerDirectResult';
import DetailsScreen from './screens/DetailsScreen';


const Stack = createStackNavigator();

function MyStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        gesturesEnabled:true, //not working yet
        swipeEnabled:true
      }}
    >

      <Stack.Screen
        name="QTpi"
        component={Home}
        options={{
          gestureEnabled: true,
          swipeEnabled: true,
          headerTitle: () => <HeaderHome />
        }}
        
      />
      <Stack.Screen
        name="Weiteres"
        component={Burger}
        options={{
          headerTitle: () => <HeaderBurger />
        }}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{
          headerTitle: () => <HeaderResults />
        }}
      />
      <Stack.Screen
        name="DirectResult"
        component={DirectResult}
        options={{
          gestureEnabled: true,
          swipeEnabled: true,
          headerTitle: () => <HeaderDirectResult />
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          gestureEnabled: true,
          swipeEnabled: true,
          headerTitle: () => <HeaderDirectResult />
        }}
      />

    </Stack.Navigator>

  );

}

function App() {

  return (
    <NavigationContainer>
      <MyStack
      />
    </NavigationContainer>
  );

}

export default App;