import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Header = () => {
    const counter = useSelector(state => state.counter);
    const user = useSelector(state => state.user);
    const currentDegree = useSelector(state => state.weather);

    return (
        <View style={styles.header}>
            <Text>{counter}</Text>
            <View>
                <Text>{user.name}</Text>
                <Text>{user.age}</Text>
            </View>
            <View>
                <Text>The current degree is: {currentDegree}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingTop: 60,
        paddingLeft: 40,
        width: '100%',
        backgroundColor: 'lightgray'
    }
});

export default Header;
