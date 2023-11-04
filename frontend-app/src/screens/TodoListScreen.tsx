import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper'; // Import the FAB component
import { useNavigation } from '@react-navigation/native';
import TodoForm from '../components/todo_form_component'; // Import the TodoForm component
import TodoListComponent from '../components/todo_list_component'; // Import the TodoListComponent component
import { Todo } from '../components/todo_component'; // Import the TodoProps interface
import { Dimensions } from 'react-native';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const { height } = Dimensions.get('window');


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

const TodoListScreen: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]); // Initialize an empty array for todos
    const [modalVisible, setModalVisible] = useState(false);

    // Function to add a new todo
    const addTodo = (id: number, title: string, description: string, date: string) => {
        const newTodo: Todo = {
            id: id,
            title,
            description,
            date,
            isDone: false,
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const token = await AsyncStorage.getItem('token');
            fetch(BACKEND_URL + '/todo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    const todos: Todo[] = [];
                    json['data'].forEach((todo: any) => {
                        const newTodo: Todo = {
                            id: todo.id,
                            title: todo.title,
                            description: todo.description,
                            date: todo.date,
                            isDone: todo.isDone,
                        };
                        todos.push(newTodo);
                    });
                    setTodos(todos);
                    
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        fetchTodos();
    }, []);

    

    return (
        <PaperProvider theme={theme}>
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>

            {/* Render the list of todos using TodoListComponent */}
            <TodoListComponent todos={todos} onDeleteTodo={deleteTodo} />

            {/* Render the FAB (Floating Action Button) to open the TodoForm */}
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setModalVisible(true)}
            />

            {/* Render the Modal with the TodoForm */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TodoForm onCancel={() => setModalVisible(false)} addTodo={addTodo} />
            </Modal>
        </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height * 0.1,
        paddingBottom: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 16,
    },
    header: {

        fontSize: 24,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginRight: 50,
        right: 0,
        bottom: 0,
    },
});

export default TodoListScreen;
