import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const CheckTokenAndNavigate = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('TodoList' as never);
      } else {
        navigation.navigate('Login' as never);
      }
    };

    checkTokenAndNavigate();
  }, []);

  return null;
};

const App = () => {
  return (
    <NavigationContainer>
      <CheckTokenAndNavigate />
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TodoList" component={TodoListScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;