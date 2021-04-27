import React from 'react'
import {} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantsSelect } from '../pages/PlantsSelect'
import { PlantsSave } from '../pages/PlantsSave'
import { MyPlants } from '../pages/MyPlants'
import AuthRoutes from './tab.routes'

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC =() =>{
    return(
        <stackRoutes.Navigator
            headerMode='none'
            screenOptions={{
                cardStyle:{
                    backgroundColor: colors.white
                }
            }}>
                <stackRoutes.Screen 
                    name="Welcome"
                    component={Welcome}
                />
                <stackRoutes.Screen 
                    name="UserIdentification"
                    component={UserIdentification}
                />
                <stackRoutes.Screen 
                    name="Confirmation"
                    component={Confirmation}
                />
                <stackRoutes.Screen 
                    name="PlantsSelect"
                    component={AuthRoutes}
                />
                 <stackRoutes.Screen 
                    name="PlantsSave"
                    component={PlantsSave}
                />
                 <stackRoutes.Screen 
                    name="MyPlants"
                    component={AuthRoutes}
                />

        </stackRoutes.Navigator>
    )

}

export default AppRoutes;