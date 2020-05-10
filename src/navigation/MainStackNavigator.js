import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login'
import Map from '../screens/Map'
import Register from '../screens/Register'
import RegisterSuccess from '../screens/RegisterSuccess'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: '#101010'
        },
        headerTintColor: 'orange'
    
    }}>
        <Stack.Screen name='Login' component={Login} options={{ title: 'Login page' }} />
        <Stack.Screen name='Register' component={Register} options={{ title: 'Register page' }} />
        <Stack.Screen name='Map' component={Map} options={{ title: 'Where is my car ? ' }} />
        <Stack.Screen name='RegisterSuccess' component={RegisterSuccess} options={{ title: 'Register success' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator