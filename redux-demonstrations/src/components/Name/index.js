import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../actions/userActions';

const Name = () => {
    const [inputs, setInputs] = useState({
        name: '',
        age: ''
    });
    const dispatch = useDispatch();

    const { name, age } = inputs;

    const onInputHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onPress = () => {
        setInputs({ name: '', age: '' });
        dispatch(changeUser(name, age));
    }

    return (
        <View>
            <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={text => onInputHandler('name', text)} />
            <TextInput
                placeholder="Enter your age"
                value={age}
                onChangeText={text => onInputHandler('age', text)} />
            <Button title="Update user" onPress={() => onPress()} />
        </View>
    )
};

export default Name;