import React, { useEffect, useState } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    Platform,
    TouchableOpacity

} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, {Event} from '@react-native-community/datetimepicker'

import { SvgFromUri } from 'react-native-svg';
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import gota from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps
    
}


export const PlantsSave: React.FC = () => {


    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')
    const route = useRoute();
    const {plant} = route.params as Params

    const navigation = useNavigation()

    function handlerChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS =='android'){
            setShowDatePicker(old => !old )

        }
        if(dateTime && isBefore(dateTime, new Date()) ){
            setSelectedDateTime(new Date())
            return Alert.alert('escolha uma data no futuro!')
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }

    function handlerOpenDateTimePicker(){
        setShowDatePicker(old => !old)
    }

    async function handleSave(){

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigation.navigate('Confirmation', {
                title: 'Tudo Certo',
                subtitle: 'Fique tranquilo que sempre lembrar voc~e de cuidar da su plantinha',
                buttonTitle: 'Muito Obrigado',
                icon: 'hug',
                extScreen: 'MyPlants'
            })
               
            
        } catch (error) {
            return Alert.alert('não foi possivel salvar')
        }
    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
        <View style={styles.container}>
            <View style={styles.plantInfo} >
                <SvgFromUri
                uri={plant.photo}
                height={150}
                width={150} />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text> 
                <Text style={styles.plantAboult}>
                    {plant.about}
                </Text>
            </View>
            <View style={styles.controllers}>
                <View style={styles.tip}>
                    <Image
                        source={gota}
                        style={styles.tipImage}
                        />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>    
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horario
                </Text>

               {showDatePicker && 
                (<DateTimePicker 
                        value={selectedDateTime}
                        mode={'time'}
                        display={'spinner'}
                        onChange={handlerChangeTime}
                    
                    
                    />)}

                {
                    Platform.OS == 'android' && (
                        <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={handlerOpenDateTimePicker}>
                            <Text style={styles.datePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text> 
                        </TouchableOpacity>
                    )
                }    

                <Button 
                    title={"Cadastrar planta"} 
                    onPress={handleSave}
                
                />

            </View>
        </View>
        </ScrollView>
    )


}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,

    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: colors.shape,
    },
    controllers:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingBottom: getBottomSpace() || 20,
        paddingTop: 20,


    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
    },
    plantAboult:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tip:{
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60

    },
    tipImage:{
        width: 40,
        height: 40

    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',

    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5

    },
    datePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,

    },
    datePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
    
})