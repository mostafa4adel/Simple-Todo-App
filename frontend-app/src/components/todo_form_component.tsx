
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';


type TodoFormProps = {
    onSubmit: (title: string, description: string, date: Date) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);



    const handleTitleChange = (text: string) => {
        setTitle(text);
    };

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    };

    const handleDateChange = (event: DateTimePickerEvent | any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handleSubmit = () => {
        onSubmit(title, description, date!);
        setTitle('');
        setDescription('');
        setDate(undefined);
    };

    return (
        <>
            <TextInput
                label="Title"
                value={title}
                onChangeText={handleTitleChange}
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={handleDescriptionChange}
                style={styles.input}
            />
            <Button onPress={() => setShowDatePicker(true)} style={styles.input}>
                {date ? date.toLocaleDateString() : 'Select Date'}
            </Button>
            <Button onPress={handleSubmit} mode="contained" style={styles.button}>
                Add Todo
            </Button>
            <Portal>
                <Modal visible={showDatePicker} onDismiss={() => setShowDatePicker(false)}>
                    <DateTimePicker
                        value={date || new Date()}
                        onChange={handleDateChange}
                    />
                </Modal>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default TodoForm;
