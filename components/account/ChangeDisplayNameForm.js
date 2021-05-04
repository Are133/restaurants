import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function ChangeDisplayNameForm({displayName,setShowModal,toasRef}) {
    return (
        <View style={styles.viewname}
        >
            <Input
            placeholder="Ingresa Nombre y Apellidos"
            containerStyle={styles.containerstylesinput}
            defaultValue={displayName}
            rightIcon={{
                type:"material-community",
                name:"account-circle-outline",
                color:"#c2c2c2"
            }}
            />
            <Button
            title="Cambiar nombres y apellidos"
            containerStyle={styles.nombreapellido}
            buttonStyle={styles.butonstylo}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({

    viewname:{
        alignItems:"center",
        paddingVertical:10,
    },

    containerstylesinput:{
        marginBottom:10,
    },

    nombreapellido:{
        width:"95%",
    },

    butonstylo:{
        backgroundColor:"#97cc52"
    }

    
})
