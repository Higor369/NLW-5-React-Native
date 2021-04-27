import React, { useEffect } from "react"
import { Text, View, StyleSheet  } from "react-native"
import {Welcome} from "./src/pages/Welcome"

import Routes from './src/routes/index'
import * as Notification from 'expo-notifications'

import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold

} from '@expo-google-fonts/jost'
import { PlantProps } from "./src/libs/storage"

export default function App (){

  const [ fontsLoaded,  ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscription = Notification.addNotificationReceivedListener(
      async notification =>{
        const data = notification.request.content.data.plant as PlantProps


      }
    )

    return () => subscription.remove();
  }, [])

  if(!fontsLoaded){
    return (
    <AppLoading />
      )
  }

  return(
    <Routes />
  )

}

