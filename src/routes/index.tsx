import React from 'react'
import {NavigationAction, NavigationContainer} from '@react-navigation/native'
import StackRoutes from './stack.routes'
const Routes = () =>{
    return(
        <NavigationContainer>
            <StackRoutes />

        </NavigationContainer>


    )
}

export default Routes