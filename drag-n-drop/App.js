import React from 'react';
import images from './static/images';
import { StyleSheet, Text, View } from 'react-native';
import DraggableImage from './src/components/DraggableImage';

const App = () => (
  <View style={styles.container}>
    {images.map(({ name, src }) => <DraggableImage key={name} src={src} />)}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'lightskyblue',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
