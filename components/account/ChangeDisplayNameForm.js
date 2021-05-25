import { isEmpty } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet,View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { updateProfile } from '../../utils/action'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toasRef,setReloadUser }) {

    const [error, seterror] = useState(null)
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [loading, setLoading] = useState(false)


    const onSubmit = async() => {
        if(!validateForm()){
            return 
        }

        setLoading(true)
        const result = await updateProfile({displayName:newDisplayName})
        setLoading(false)

        if(!result.status){
            seterror("Error al cambiar el nombre y apellidos")
            return
        }
        setReloadUser(true)
        toasRef.current.show("Accion completada con exito",3000)

       setShowModal(false)
    }

    const validateForm = () => {

        
        if(isEmpty(newDisplayName)){
            seterror("Los campos no pueden estar vacios")
            return false
        }

        if(displayName===newDisplayName){
            seterror("Los campos no pueden ser los mismo")
            return false
        }

        return true
    }
    
    return (
        <View style={styles.viewname}>
            <Input
                placeholder="Ingresa Nombre y Apellidos"
                containerStyle={styles.containerstylesinput}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                
            />
            <Button
                title="Cambiar nombres y apellidos"
                containerStyle={styles.nombreapellido}
                buttonStyle={styles.butonstylo}
                onPress={onSubmit}
                loading={loading}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    viewname: {
        alignItems: "center",
        paddingVertical: 10,
    },

    containerstylesinput: {
        marginBottom: 10,
    },

    nombreapellido: {
        width: "95%",
    },

    butonstylo: {
        backgroundColor: "#97cc52"
    }


})
