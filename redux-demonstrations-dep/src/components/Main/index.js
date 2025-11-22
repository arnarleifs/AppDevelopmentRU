import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../Header';
import CounterWrapper from '../CounterWrapper';
import Counter from '../Counter';
import Name from '../Name';
import { getCurrentDegree } from '../../actions/weatherActions';

const Main = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentDegree());
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <CounterWrapper>
                <Counter />
                <Name />
            </CounterWrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default Main;