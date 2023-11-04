import React from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import TodoComponent, { Todo } from './todo_component';

interface Props {
    todos: Todo[];
}

const TodoListComponent: React.FC<Props> = ({ todos }) => {
    const renderItem = ({ item }: { item: Todo }) => (
        <Card style={{ margin: 8, elevation: 2 }}>
            <TodoComponent
                id={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
                completed={item.completed}
            />
        </Card>
    );

    return (
        <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default TodoListComponent;
