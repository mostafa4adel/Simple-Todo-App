import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TodoListScreen: React.FC = () => {
    // You can add your todo list logic and UI here

    const navigation = useNavigation();

    navigation.navigate('TodoList' as never);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Todo List Screen</Text>
            {/* Add your Todo List components and logic here */}
        </View>
    );
};

export default TodoListScreen;
