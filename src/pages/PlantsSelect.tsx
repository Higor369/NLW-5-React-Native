import React, { useEffect, useState } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator,

} from 'react-native';
import { EviromentButton } from '../components/EnvirementButton';
import { Header } from '../components/Header';
import {PlantCardPrimary} from '../components/PlantCardPrimary'
import {Load} from '../components/Load'
import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentsProps{
    key: string,
    title: string
}

export const PlantsSelect : React.FC = () => {
    const [ enviroments , setEnviroments] = useState<EnviromentsProps[]>([])
    const [ plants , setPlants] = useState<PlantProps[]>([])
    const [envSelected, setEnvSelected] = useState('all')
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [load, setLoad] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);

    const navigation = useNavigation()

    async function fetchPlants() {
        console.log('entrei')
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        console.log('data', data)
        if(!data){
            return setLoad(true)
        }
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data)
            setFilteredPlants(data)
        }
        console.log('estou aqui')
        setLoad(false);
        setLoadingMore(false);
    }

    function handleFetchLoadMore(distance: number){
        if(distance<1){
            return;
        }
        else{
            setLoadingMore(true)
            setPage(old => old + 1)
            fetchPlants()
        }
    }


    function handlerEnvSelected(item: string){
        setEnvSelected(item);

        if(item =='all')
            return setFilteredPlants(plants)

        const filtered = plants.filter ( plant =>{
            return plant.environments.includes(item)
        })

        return setFilteredPlants(filtered)
    }

    function handlerPlantSelect(item: PlantProps){
        navigation.navigate("PlantSave", {plant: item})

    }

    
    useEffect(() =>{
        async function fetchEnvioriment() {
            const { data } = await api
                .get("plants_environments?_sort=title&_order=asc")
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }
        fetchEnvioriment();

    }, [])

    useEffect(() =>{
        
        fetchPlants();

    }, [])

    if(load){
        return(
            <Load />
        )
    }else{
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header >
                    </Header>
                    <Text style={styles.title}>
                        Em qual Ambiente
                    </Text>
                    <Text style={styles.subtitle}>
                        Você quer colocar a sua planta?
                    </Text>
                </View>
    
                <View>
                    <FlatList 
                        keyExtractor={(item) => String(item.key)}
                        data={enviroments}
                        renderItem={({item}) => 
                            <EviromentButton 
                                Title={item.title} 
                                active={item.key == envSelected }
                                onPress={() => handlerEnvSelected(item.key)}
                                >
    
                                </EviromentButton> }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.enviorimentList}
                    />
                </View>
    
                <View style={styles.plants}>
                    <FlatList
                        keyExtractor={(item) => String(item.id)} 
                        data={filteredPlants}
                        renderItem={({item}) => 
                            <PlantCardPrimary
                             data={item}
                            onPress={() =>{handlerPlantSelect(item)}}
                            
                            />}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        contentContainerStyle={styles.contentStyles}
                        onEndReachedThreshold={0.1}
                        onEndReached={({distanceFromEnd}) => handleFetchLoadMore(distanceFromEnd)}  
                        ListFooterComponent ={ 
                            loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                        }
                    
                    />
    
                </View>
            </View>
    
        )
    }

    

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,

    },
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle:{
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading

    }, 
    header: {
        paddingHorizontal: 30,
        flexDirection: 'column'
    },
    enviorimentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
        },
    plants:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    contentStyles:{
        
    }

})


