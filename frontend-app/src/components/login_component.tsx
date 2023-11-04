import React, { useState } from "react";
import { StyleSheet, Dimensions ,Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingTop: height * 0.3, 
        paddingLeft: width * 0.05, 
        paddingRight: width * 0.05,
    },
    title: {
        marginBottom: 16,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
});

const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Implement your login logic here
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                maxLength={10}
            />
            <TextInput
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                maxLength={16}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
            </Button>
        </ScrollView>
    );
};

export default LoginComponent;