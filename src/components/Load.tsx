import React from 'react';
import { 
    View,
     StyleSheet,

    } from 'react-native';

import LottieView from 'lottie-react-native'

import LoadAnimation from '../assets/load.json'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


export const Load: React.FC = () => {
  return (
    <View style={styles.container}>
        <LottieView
        source={LoadAnimation}
        autoPlay
        loop
        style={styles.animation}
        />

    </View>


  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation:{
        
        width: 200,
        height: 200

    }
})

