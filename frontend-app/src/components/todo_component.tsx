import { useState } from 'react';
import { Card, TextInput, Button, Checkbox, Paragraph } from 'react-native-paper';

export interface Todo {
    id: number;
    title: string;
    description: string;
    date: Date;
    completed: boolean;
}

export default function TodoComponent(props: Todo) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.date.toISOString());
    const [completed, setCompleted] = useState(props.completed);

    const handleSave = () => {
        setEditing(false);
        // TODO: save changes to backend
    };

    return (
        <Card style={{ margin: 10 }}>
            {editing ? (
                <>
                    <TextInput label="Title" value={title} onChangeText={setTitle} />
                    <TextInput label="Description" value={description} onChangeText={setDescription} multiline />
                    <TextInput label="Date" value={date} onChangeText={setDate} />
                    <Button mode="contained" onPress={handleSave}>Save</Button>
                </>
            ) : (
                <>
                    <Card.Title title={title} />
                    <Card.Content>
                        <Paragraph>{description}</Paragraph>
                        <Paragraph>{date}</Paragraph>
                        <Checkbox
                            status={completed ? 'checked' : 'unchecked'}
                            onPress={() => setCompleted(!completed)}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => setEditing(true)}>Edit</Button>
                    </Card.Actions>
                </>
            )}
        </Card>
    );
}