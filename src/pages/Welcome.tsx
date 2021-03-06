import React from 'react'
import { 
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
         } from 'react-native'

import {Feather} from '@expo/vector-icons'    

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import watering from '../assets/watering.png'
import { useNavigation } from '@react-navigation/core'

export function Welcome(){
    const navigatin = useNavigation()

    function handlerStart(){
        navigatin.navigate('UserIdentification')
    }
    
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma facil! 
                </Text>
                <Image
                    source={watering}
                    style={styles.image}
                    resizeMode="contain"        
                />
                <Text style={styles.subtitle}>
                    Não se esqueça mais de regar as suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handlerStart}> 
                    <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon} 
                    />
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    wrapper:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal:20
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 30
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,

    },
    image:{
        height: Dimensions.get('window').width * 0.7,

    },
    buttonIcon:{
        fontSize: 20,
        color: colors.white,
    },
})