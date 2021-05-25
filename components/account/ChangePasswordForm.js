import { isEmpty, result, size } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet,View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauThenticate,  updatePassword } from '../../utils/action'
import { validateEmail } from '../../utils/helpers'

export default function ChangePasswordForm({setShowModal,toasRef}) {
    
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [errorNewPassword, seterrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if(!validateForm()){
            return 
        }

        setLoading(true)
        const resultAuthenticate = await reauThenticate(currentPassword)

        if(!resultAuthenticate.status){
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if(!resultUpdatePassword.status){
            setLoading(false)
            seterrorNewPassword("Problema al crear la nueva contraseña")
            return
        }

        toasRef.current.show("Accion completada con exito",3000)

        setShowModal(false)
    }

    const validateForm = () => {
        setErrorCurrentPassword(null)
        seterrorNewPassword(null)
        setErrorConfirmPassword(null)

        let isValid = true
        

        if(isEmpty(currentPassword) && isEmpty(newPassword) && isEmpty(confirmPassword)){
            setErrorCurrentPassword("La contraseña actual no puede estar vacia")
            seterrorNewPassword("La nueva contraseña no puede estar vacia")
            setErrorConfirmPassword("La confirmacion  no puede estar vacia")
            isValid=false
        }

        else if(size(currentPassword)<6 && size(newPassword)<6 && size(confirmPassword)<6){
            setErrorCurrentPassword("La contraseña actual debe tener 6 o mas caracteres")
            seterrorNewPassword("La nueva contraseña debe tener 6 o mas caracteres")
            setErrorConfirmPassword("La confirmacion  debe tener 6 o mas caracteres")
            isValid=false
        }

        else if(currentPassword===newPassword){
            setErrorCurrentPassword("No puedes usar la misma contraseña")
            seterrorNewPassword("No puedes usar la misma contraseña")
            isValid = false
        }

        else if(newPassword!==confirmPassword){
            setErrorConfirmPassword("Confirmacion y nueva contraseña no coinciden")
            isValid = false
        }

        return isValid
    }
    
    return (
        <View style={styles.viewname}>
            <Input
                placeholder="Ingresa tu contraseña actual"
                containerStyle={styles.containerstylesinput}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder="Ingresa tu nueva contraseña"
                containerStyle={styles.containerstylesinput}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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

            <Input
                placeholder="Ingresa la confirmacion"
                containerStyle={styles.containerstylesinput}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title="Cambiar Contraseña"
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
