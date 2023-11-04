
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import { Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');
type TodoFormProps = {
    onCancel: () => void;
    addTodo: (id: number, title: string, description: string, date: string) => void;
};

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

const TodoForm: React.FC<TodoFormProps> = ({ onCancel, addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [id, setId] = useState<number>(0);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handleTitleChange = (text: string) => {
        setTitle(text);
    };

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    };


    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(BACKEND_URL + '/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                title: title,
                description: description,
                date: date,
                isDone: false
            }),
        })

        if (response.status == 201) {
            const json = await response.json();
            setId(json['data']['id']);
            addTodo(
                json['data']['id'],
                json['data']['title'],
                json['data']['description'],
                json['data']['date'],
            );
            onCancel();
            return;
        }
        const json = await response.json();
        console.log(json);
        setErrorMessage(json['message']);
        setSnackbarVisible(true);

    };

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container}>
                <Title style={styles.title}>Add a new Todo Task</Title>

                <TextInput
                    label="Title"
                    value={title}
                    onChangeText={handleTitleChange}
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={handleDescriptionChange}
                    style={styles.input}
                    mode="outlined"
                />

                <View style={styles.row}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        onChange={handleDateChange}
                        minimumDate={new Date()}
                        maximumDate={new Date("2025-12-31")}
                        display={"default"}
                    />

                    <Button onPress={handleSubmit} mode="contained" style={styles.button}>
                        Add Todo
                    </Button>

                </View>
                <Button onPress={onCancel} mode="outlined" style={styles.cancelButton}>
                    Cancel
                </Button>

            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 16,
    },
    container: {
        paddingTop: height * 0.3,
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    input: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6200ee',
    },
    cancelButton: {
        marginTop: 16,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
});

export default TodoForm;
