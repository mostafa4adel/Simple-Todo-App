import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import TodoComponent, { Todo } from './todo_component';

interface Props {
    todos: Todo[];
    onDeleteTodo: (id: number) => void;
}

const TodoListComponent: React.FC<Props> = ({ todos , onDeleteTodo }) => {
    const [todoList, setTodoList] = useState<Todo[]>(todos);

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

    return (
        <FlatList
            style={{ width: '100%' }}
            data={todoList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default TodoListComponent;
