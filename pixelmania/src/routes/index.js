import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Main from '../views/Main';
import Gallery from '../views/Gallery';
import Preview from '../views/Preview';

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="Preview" component={Preview} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;