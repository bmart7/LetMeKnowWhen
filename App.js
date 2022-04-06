/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import CreateTrip from './screens/CreateTrip';
import NotifUtil from './utils/NotifUtil';
import GeoUtil from './utils/GeoUtil';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    NotifUtil.requestPermissions().then((resp) =>
      console.log('notif: ', JSON.stringify(resp))
    );
    GeoUtil.requestPermissions().then(({ bg, fg }) => {
      console.log('bg:', JSON.stringify(bg));
      console.log('fg:', JSON.stringify(fg));
    });
  }, []);

  useEffect(() => {
    return NotifUtil.subscribeToForegroundNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            initialParams={{ updated: true }}
          />
          <Stack.Screen name="create" component={CreateTrip} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
