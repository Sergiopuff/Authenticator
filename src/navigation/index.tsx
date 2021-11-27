import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/general';
import CameraScreen from '../screens/camera';
import ValidationScreen from '../screens/validation';
import HeaderBackButton from '../components/headerBackButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="root">
        <Stack.Screen
          name="root"
          component={CameraScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="validation"
          component={ValidationScreen}
          options={({ navigation }) => ({
            title: 'Validation',
            headerLeft: () => <HeaderBackButton navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
