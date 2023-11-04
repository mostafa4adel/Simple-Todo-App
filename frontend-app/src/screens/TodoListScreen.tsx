import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TodoForm from '../components/todo_form_component';
import TodoListComponent from '../components/todo_list_component';
import { Todo } from '../components/todo_component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import { DefaultTheme, Provider as PaperProvider, Button, FAB, Menu } from 'react-native-paper';

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
    const [sort, setSort] = useState('date');
    const [filter, setFilter] = useState('all');
    const [menuVisible, setMenuVisible] = useState(false);

    const navigation = useNavigation();

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

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

    const getSortedAndFilteredTodos = () => {
        let sortedAndFilteredTodos = [...todos];

        // Sort todos
        if (sort === 'date') {
            sortedAndFilteredTodos.sort((a, b) => a.date.localeCompare(b.date));
        } else if (sort === 'title') {
            sortedAndFilteredTodos.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'description') {
            sortedAndFilteredTodos.sort((a, b) => a.title.localeCompare(b.description));
        }

        // Filter todos
        if (filter === 'completed') {
            sortedAndFilteredTodos = sortedAndFilteredTodos.filter(todo => todo.isDone);
        } else if (filter === 'notCompleted') {
            sortedAndFilteredTodos = sortedAndFilteredTodos.filter(todo => !todo.isDone);
        }

        return sortedAndFilteredTodos;
    };

    const logout = async () => {
        // Clear the token from AsyncStorage
        await AsyncStorage.removeItem('token');

        navigation.navigate('Login' as never);
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
                <View style={styles.filterContainer}>
                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={
                            <Button onPress={openMenu}>
                                Sort by {sort}
                            </Button>
                        }
                    >
                        <Menu.Item onPress={() => { setSort('date'); closeMenu(); }} title="Sort by Date" />
                        <Menu.Item onPress={() => { setSort('title'); closeMenu(); }} title="Sort by Title" />
                        <Menu.Item onPress={() => { setSort('description'); closeMenu(); }} title="Sort by Description" />
                    </Menu>

                </View>
                {/* Render the list of todos using TodoListComponent */}
                <TodoListComponent todos={getSortedAndFilteredTodos()} onDeleteTodo={deleteTodo} />

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
    
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },

    container: {
        flex: 1,
        paddingTop: height * 0.03,
        paddingBottom: height * 0.03,
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
        marginBottom: 150,
        marginLeft: 50,
        left: 0,
        bottom: 0,
    },
});

export default TodoListScreen;
