import React, { useState } from 'react';
import { Card, TextInput, Button, Switch, Snackbar, Text, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


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

export interface Todo {
    id: number;
    title: string;
    description: string;
    date: string;
    isDone: boolean;
}

interface Props {
    todo: Todo;
    deleteTodo: (id: number) => void;
}

export default function TodoComponent(props: Props) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.todo.title);
    const [description, setDescription] = useState(props.todo.description);
    const [strDate, setStrDate] = useState(props.todo.date);

    const [date, setDate] = useState(new Date(props.todo.date));

    const [completed, setCompleted] = useState(props.todo.isDone);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSave = async () => {
        // TODO: save changes to the backend
        console.log('saving changes');
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await fetch(BACKEND_URL + '/todo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    id: props.todo.id,
                    title: title,
                    description: description,
                    date: strDate,
                    isDone: completed,
                }),

            })

            const json = await response.json();
            if (response.status === 200) {
                setEditing(false);
            } else {
                // supposed to never happen unless server is down
                setErrorMessage(json['message']);
                setSnackbarVisible(true);

            }
        }
        catch (e) {
            console.log(e);
            throw e;
        }



    };

    const handleCancel = () => {
        setEditing(false);
        setTitle(props.todo.title);
        setDescription(props.todo.description);
        setStrDate(props.todo.date);
    };

    const handleSwicth = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(BACKEND_URL + '/todo/' + props.todo.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })

        if (response.status === 200) {
            setCompleted(!completed);
        } else {
            // supposed to never happen unless server is down
            console.log('Error updating todo');
        }
    }

    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(BACKEND_URL + '/todo', {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                id: props.todo.id
            }),
        })

        if (response.status === 200) {
            props.deleteTodo(props.todo.id);
        } else {
            console.log(response);
            // supposed to never happen unless server is down
            console.log('Error deleting todo');
        }


    }

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setStrDate(currentDate.toISOString().split('T')[0]);
    };

    // onChangeText={(value) => setDate(new Date(value).toISOString().split('T')[0])} 
    return (
        <PaperProvider theme={theme}>
            <Card style={styles.card}>
                {editing ? (
                    <>
                        <TextInput label="Title" value={title} onChangeText={setTitle} mode='outlined' style={styles.input} />
                        <TextInput label="Description" value={description} mode='outlined' onChangeText={setDescription} multiline style={styles.input} />
                        <View style={styles.row}>


                            <DateTimePicker
                                value={date}
                                mode="date"
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                                maximumDate={new Date("2025-12-31")}
                                display={"default"}
                            />
                            <Button mode="contained" onPress={handleSave} style={styles.button} >Save</Button>

                        </View>

                        <Button mode="outlined" onPress={handleCancel} style={styles.cancelButton}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Card.Title titleStyle={{ fontSize: 24 }} title={title} />
                        <Card.Content>
                            <Text style={styles.text}>Description:</Text>
                            <Paragraph style={styles.text}>{description}</Paragraph>
                            <View style={styles.checkboxContainer}>
                                <Text style={styles.dateText }>Date:</Text>
                                <Paragraph style={styles.text}>{strDate.split('T')[0]}</Paragraph>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <Text style={styles.checkboxText}>Completed:</Text>
                                <Switch
                                    value={completed}
                                    onValueChange={() => handleSwicth()}
                                    style={styles.switch}
                                />
                            </View>
                        </Card.Content>
                        <Card.Actions style={styles.actions}>
                            <Button onPress={() => handleDelete()}>Delete</Button>
                            <Button onPress={() => setEditing(true)} style={styles.button}>Edit</Button>
                        </Card.Actions>

                    </>

                )}
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                >
                    {errorMessage}
                </Snackbar>
            </Card>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({

    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#6200ee',
    },
    cancelButton: {
        marginTop: 16,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    dateText: {
        fontSize: 18,
        marginTop: 8,
        color: theme.colors.text,
        marginBottom: 8,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        marginTop: 8,
        color: theme.colors.text,
        marginBottom: 8,
    },
    checkboxText: {
        fontSize: 18,
        color: theme.colors.text,
        marginRight: 60,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        color: '#6200ee',
    },
    saveButton: {
        backgroundColor: '6200ee',
    },
    actions: {
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});
