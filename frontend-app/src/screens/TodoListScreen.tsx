import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper'; // Import the FAB component
import { useNavigation } from '@react-navigation/native';
import TodoForm from '../components/todo_form_component'; // Import the TodoForm component
import TodoListComponent from '../components/todo_list_component'; // Import the TodoListComponent component
import { Todo } from '../components/todo_component'; // Import the TodoProps interface
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const TodoListScreen: React.FC = () => {
    const navigation = useNavigation();
    const [todos, setTodos] = useState<Todo[]>([]); // Initialize an empty array for todos

    // Function to add a new todo
    const addTodo = (title: string, description: string, date: Date) => {
        const newTodo:Todo = {
            id: Math.random() as number,
            title,
            description,
            date ,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List Screen</Text>
            
            {/* Render the list of todos using TodoListComponent */}
            <TodoListComponent todos={todos} />
            
            {/* Render the FAB (Floating Action Button) to open the TodoForm */}
            <FAB
                style={styles.fab}
                icon="plus"
                // Navigate to the TodoForm screen
            />
        </View>
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
    header: {
        
        fontSize: 24,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default TodoListScreen;
