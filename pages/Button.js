import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function FlatButton({text}) {
    return (
        //<TouchableOpacity onPress = {onPress}>
            <View style = {styles.button}>
            <Text style = {styles.buttonText}> 
            
            {text}
            
             </Text>

            </View>

       // </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius : 10,
        paddingVertical : 14, 
        paddingHorizontal :10, 
        backgroundColor : 'blue',

    },
    buttonText: {
        color : 'white', 
        fontWeight : 'bold',
        textTransform: 'uppercase',
        fontSize : 16,
        textAlign : 'center'
    }
})


