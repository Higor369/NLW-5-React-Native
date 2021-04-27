import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'
import * as Notifications from 'expo-notifications'

export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[];
    frequency: {
        times: number;
        repeat_every: string
    };
    hour: string
    
    dateTimeNotification: Date
}

export interface StroragePlantProps{
    [id: string] : {
        data: PlantProps;
        notificationId: string;
    }
}

export async function savePlant(plant: PlantProps) : Promise<void> {
    try{

        const nextTime = new Date(plant.dateTimeNotification)
        const now = new Date();

        const {times, repeat_every} = plant.frequency;
        if(repeat_every == 'week'){
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval)
        }else{
            nextTime.setDate(nextTime.getDate() + 1)
        }

        const secont = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000 )
        );

        const notificationId = await Notifications.scheduleNotificationAsync({
            content:{
                title: "Heeyy ",
                body: `Esta na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data:{
                    plant
                },
            },
            trigger:{
                seconds: secont < 60 ? 60 : secont,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem('@plantmaneger:plants')
        const oldValue = data ? (JSON.parse(data) as StroragePlantProps) : {}

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        await AsyncStorage.setItem('@plantmaneger:plants',
            JSON.stringify({
                ... newPlant,
                ...oldValue
            }))

    } catch(e){
        throw new Error(e)
    }
}

export async function loadPlant() : Promise<PlantProps[]> {
    try{


        const data = await AsyncStorage.getItem('@plantmaneger:plants')
        const plats = data ? (JSON.parse(data) as StroragePlantProps) : {}

        const plantsSorted = Object
            .keys(plats)
            .map(plant => {
                return {
                    ...plats[plant].data,
                    hour : format(new Date(plats[plant].data.dateTimeNotification), 'HH:mm')
                }})
                .sort((a,b) =>
                    Math.floor(
                        new Date(a.dateTimeNotification).getTime() / 1000 -
                        Math.floor(new Date(b.dateTimeNotification).getTime() /1000)
                    )
                )
        return plantsSorted        


    } catch(e){
        throw new Error(e)
    }
}

export async function removePlant(id: string): Promise<void>{

    const data = await AsyncStorage.getItem('@plantmaneger:plants')
    const plants = data ? (JSON.parse(data) as StroragePlantProps) : {}

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)


    delete plants[id];

    await AsyncStorage.setItem(
        '@plantmaneger:plants',
        JSON.stringify(plants)
    )
}