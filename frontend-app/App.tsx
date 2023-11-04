import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const CheckTokenAndNavigate = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('TodoList' as never);
      } else {
        navigation.navigate('Logout' as never);
      }
    };

    checkTokenAndNavigate();
  }, []);

  return null;
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <CheckTokenAndNavigate />
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen name="Login/Register" component={LoginScreen} options={{ headerShown: false, title:'Logout' }} />
          <Stack.Screen name="TodoList" component={TodoListScreen} options={{
            gestureEnabled: false, headerTitleStyle: {
              color: '#6200ee',
              fontSize: 24,
            },
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
