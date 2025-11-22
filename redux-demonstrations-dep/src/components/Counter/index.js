import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { incrementCounter } from '../../actions/counterActions';

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();

    const onIncrement = () => {
        setCounter(counter + 1);
        dispatch(incrementCounter(1));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{counter}</Text>
            <Button title="Increment" onPress={() => onIncrement()} />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Counter;