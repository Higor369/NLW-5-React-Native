import React, { useState } from 'react'

import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert

} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import {Button} from '../components/Button'
import { useNavigation } from '@react-navigation/core'

export function UserIdentification(){

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()

    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!name)
    }
    function handlerInputFocus(){
        setIsFocused(true)
    }

    function handlerInputChange(value: string){
        setIsFilled(!!value);
        setName(value)
    }

    const navigatin = useNavigation()

   async function handlerSubmit(){
        if(!name){
            return Alert.alert("Por favor, me diga seu nome")
        }
        try{
            await AsyncStorage.setItem('@plantmanager:user', name)
            navigatin.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantsSelect'
            })
        }catch(e){
            return Alert.alert("Não foi possivel salvar o seu nome")
        }


    }

    return(
        <SafeAreaView style={styles.container}> 
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios'? 'padding': 'height'}
        >

            <View style={styles.content}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.emoji}>
                            {!isFilled ?'😃' : '😉'}
                        </Text>
                        <Text 
                        style={styles.title}
                        >
                            Como Podemos {"\n"}
                            chamar você?
                        </Text>
                    </View>
                    <TextInput
                     style={[
                         styles.input,
                         (isFocused || isFilled) && 
                         {borderBottomColor: colors.green}
                        ]}
                     placeholder="digite seu nome"
                     onBlur={handleInputBlur}
                     onFocus={handlerInputFocus}
                     onChangeText={handlerInputChange}
                     />
                     <View style={styles.footer}>
                        <Button title={'Confirmar'} 
                         onPress={handlerSubmit} />
                     </View>
                </View>

            </View>
        </KeyboardAvoidingView>

        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    content:{
        flex: 1,
        width: '100%'
    },
    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    
    },
    emoji:{
        fontSize: 54,
        textAlign: 'center'


    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        textAlign: 'center',
        padding: 10
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    footer:{
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20

    },
    header:{
        alignContent: 'center'
    }

})