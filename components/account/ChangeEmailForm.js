import { isEmpty, result } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet,View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauThenticate, updateEmail, updateProfile } from '../../utils/action'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({email, setShowModal,toasRef,setReloadUser}) {
    const [errorPassword, setErrorPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [newEmail, setNewEmail] = useState(email)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = async() => {
        if(!validateForm()){
            return 
        }

        setLoading(true)
        const resultAuthenticate = await reauThenticate(password)

        if(!resultAuthenticate.status){
            setLoading(false)
            setErrorPassword("Contraseña incorrecta")
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)

        if(!resultUpdateEmail.status){
            setLoading(false)
            setErrorEmail("Correo en uso pruebe otro")
            return
        }


        setReloadUser(true)
        toasRef.current.show("Accion completada con exito",3000)

        setShowModal(false)
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if(!validateEmail(newEmail)){
            setErrorEmail("Debes ingresar un email valido")
            isValid=false
        }

        if(newEmail===email){
            setErrorEmail("Correo ya registrado use otro.")
            isValid =false
        }

        if(isEmpty(password)){
            setErrorPassword("Debes ingresar la contraseña")
            isValid=false
        }

        return isValid
    }
    
    return (
        <View style={styles.viewname}>
            <Input
                placeholder="Ingresa el nuevo correo"
                containerStyle={styles.containerstylesinput}
                defaultValue={email}
                keyboardType={'email-address'}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                
            />

            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.containerstylesinput}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline":"eye-outline"}
                    iconStyle={{color:"#c2c2c2"}}
                    onPress={()=> setShowPassword(!showPassword)}
                    />
                }
                
            />
            <Button
                title="Cambiar email"
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
