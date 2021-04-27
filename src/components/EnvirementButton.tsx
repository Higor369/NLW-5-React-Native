import React from  'react'
import {
    StyleSheet,
    Text,
    Image,
    View
   

 } from 'react-native';
 import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EviromentButtonProps extends RectButtonProps {
    Title: string,
    active?: boolean;

}


export const  EviromentButton : React.FC<EviromentButtonProps> = 
({  Title,
    active = false,
    ...rest
}) =>{ 

    return(
        <RectButton
            style={[
                styles.cotainer,
                active && styles.containerActive
            ]}
            {...rest}
            >
            <Text style={[ 
                styles.text,
                active && styles.textActive
                ]}>
                {Title}
            </Text>
        </RectButton>


    )
}

const styles = StyleSheet.create({
    cotainer:{
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 12


    },
    containerActive:{
        
        backgroundColor: colors.green_light
    },
    text:{
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textActive:{
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }

})