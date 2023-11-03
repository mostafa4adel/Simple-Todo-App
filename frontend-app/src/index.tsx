import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from "./screens/LoginPage";
import TodoListScreen from "./screens/TodoListScreen";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const StartPage = () => {
    const navigation = useNavigation();

    useEffect(() => {
        checkTokenAndNavigate(navigation);
    }, []);

    const checkTokenAndNavigate = async (navigation: NavigationProp<any>) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            // Navigate to the TodoList screen
            navigation.navigate("TodoList");
        } else {
            // Navigate to the Login screen
            navigation.navigate("Login");
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StartPage">
                <Stack.Screen name="StartPage" component={StartPage} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="TodoList" component={TodoListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StartPage;
