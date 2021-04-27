import React, { useEffect, useState } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Image,
    Alert

} from 'react-native';
import { Header } from '../components/Header';
import gota from '../assets/waterdrop.png'

// import { Container } from './styles';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant, StroragePlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Load } from '../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MyPlants: React.FC = () => {
    const [ myPlants, setMyplants ] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWaterd , setNextWatered] = useState<string>()

    function handlerDelete(plant: PlantProps){
        Alert.alert("Remover", `deseja remover a ${plant.name} ? `,[
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                       await removePlant(plant.id);

                        setMyplants((old )=> {
                           return old.filter((item) => item.id != plant.id)
                        })

                    } catch (error) {
                        Alert.alert("não foi possivel remover ")
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadstorageDate() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: ptBR}
            )

            setNextWatered( 
                `Não esqueã de regar  a ${plantsStoraged[0].name} à ${nextTime} horas`
            )

            setMyplants(plantsStoraged),
            setLoading(false)
            
        }

        loadstorageDate();
    }, [])


    if(loading){
        return(
            <Load />
        )
    }else{
     return (  
      <View style={styles.container}>
          <Header ></Header>

          <View style={styles.spotligth} >
            <Image 
            source={gota}
            style={styles.spotligthImage} />

            <Text style={styles.spotligthText} >
                {nextWaterd}
            </Text>
          </View>

          <View style={styles.plants}>
              <Text style={styles.plantsTitle} >
                  Proximas regadas 
              </Text>

              <FlatList 
                data={myPlants}
                keyExtractor={(iten) => String(iten.id)}
                renderItem={({ item }) => (
                    <PlantCardSecundary 
                      data={item} 
                      handleRemove={() => {handlerDelete(item)}}
                     />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flex: 1}}

              />

          </View>

      </View>

  )}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotligth:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotligthImage:{
        width: 60,
        height: 60,

    },
    spotligthText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})