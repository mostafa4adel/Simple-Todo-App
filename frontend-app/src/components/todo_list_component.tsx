import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import TodoComponent, { Todo } from './todo_component';
import { Button } from 'react-native-paper';

interface Props {
    todos: Todo[];
    onDeleteTodo: (id: number) => void;
}

const TodoListComponent: React.FC<Props> = ({ todos, onDeleteTodo }) => {
    const [todoList, setTodoList] = useState<Todo[]>(todos);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setTodoList(todos); // Update todoList when the todos prop changes
    }, [todos]); // Add todos as a dependency to the useEffect

    const renderItem = ({ item }: { item: Todo }) => (
        <TodoComponent

            todo={
                {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    date: item.date,
                    isDone: item.isDone
                }
            }
            deleteTodo={onDeleteTodo}
        />
    );

    const getTodosForPage = () => {
        const startIndex = (page - 1) * 5;
        const endIndex = startIndex + 5;
        return todos.slice(startIndex, endIndex);
    };

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <FlatList
                style={{ width: '100%' }}
                data={getTodosForPage()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                <Button mode="contained" disabled={page === 1} onPress={() => setPage(page => Math.max(page - 1, 1))}>Previous</Button>
                <Button mode="contained" disabled={page >= Math.ceil(todos.length / 5)} onPress={() => setPage(page => Math.min(page + 1, Math.ceil(todos.length / 5)))}>Next</Button>
            </View>
        </View>
    );
};

export default TodoListComponent;
