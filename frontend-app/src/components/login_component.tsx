import React, { useState } from "react";
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee',
        accent: '#03dac4',
        background: '#f5f5f5',
        text: '#6200ee',
        placeholder: '#6200ee',
    },
};

const styles = StyleSheet.create({
    container: {
        paddingTop: height * 0.3,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        backgroundColor: '#f5f5f5',
    },
    title: {
        marginBottom: 16,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6200ee',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        marginBottom: 16,
        backgroundColor: '#6200ee',
    },
});

const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigation = useNavigation();

    const handleLogin = async () => { 
        console.log(BACKEND_URL);
        await fetch(BACKEND_URL + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.token) {
                    AsyncStorage.setItem('token', json.token);
                    navigation.navigate('TodoList' as never);
                } else {
                    setSnackbarMessage('Wrong username or password!');
                    setSnackbarVisible(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    };

    const handleRegister = async () => {
        console.log(BACKEND_URL);
        await fetch(BACKEND_URL + '/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.token) {
                    AsyncStorage.setItem('token', json.token);
                    navigation.navigate('TodoList' as never);
                } else {
                    setSnackbarMessage('Username already exists!');
                    setSnackbarVisible(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        
        <View style={styles.container}>
            
            <Text style={styles.title}>Login</Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                maxLength={10}
                mode="outlined"
            />
            <TextInput
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                maxLength={10}
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
            >
                Login
            </Button>
            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
            >
                Register
            </Button>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};


export default LoginComponent;