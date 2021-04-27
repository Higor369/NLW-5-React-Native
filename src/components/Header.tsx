import React, {useEffect, useState} from  'react'
import {
    StyleSheet,
    Text,
    Image,
    View
   

 } from 'react-native';
 import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage' 


import colors from '../styles/colors'
import fonts from '../styles/fonts'

import watering from '../assets/watering.png'


export const Header : React.FC = () =>{

    const [name, SetName] = useState<string>() 

    useEffect( () => {

        async function getName() {
         var user =   await AsyncStorage.getItem('@plantmanager:user')
         SetName(user || '');
        }
        getName();

    },[])


    return(
        <View style={styles.container}>
            <View >
                <Text style={styles.greeting}>
                    Olá
                </Text>
                <Text style={styles.userName}>
                    {name}
                </Text>
            </View>
                <Image
                 source={watering}
                style={styles.image} />
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),


    },
    sub:{
    },
    image:{
        width: 70,
        height:70,
        borderRadius: 35,

    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight:40
    }

})