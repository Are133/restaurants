import { size } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { validateEmail } from '../../utils/helpers'
import {useNavigation} from '@react-navigation/native'
import { registerUser } from '../../utils/action'
import Loading from '../Loading'





export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(deefaultFormValues())
    const [formData, setFormData]= useState(false)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const doRegisterUser = async()=>{
        if(!validateData()){
            return
        }

        setLoading(true)

        const result = await registerUser(formData.email, formData.password)

        setLoading(false)

        if(!result.statusResponse){
            setErrorEmail(result.error)
            return

        }

        navigation.navigate("account")

        
    }

    const validateData =()=>{
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid=true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debe registrar un correo valido.")
            isValid=false
            
        }

        if(size(formData.password)<6){
            setErrorPassword("La contraseña debe tener almenos 6 caracteres")
            isValid=false
        }

        if(size(formData.confirm)<6){
            setErrorConfirm("La confirmacion debe tener almenos 6 caracteres")
            isValid=false
        }

        if(formData.password !== formData.confirm){
            setErrorConfirm("La confirmacion no es igual a la contraseña")
            setErrorPassword("La confirmacion no es igual a la contraseña")
            isValid=false
        }

        return isValid
    }

    const onchange= (e,type)=> {
        setFormData({...formData, [type]:e.nativeEvent.text})
    }
    return (
        <View style={styles.viewstyle}>
            
            <Input
             placeholder="Ingresa tu Correo.."
             onChange={(e)=> onchange(e,"email")}
             keyboardType="email-address"
             errorMessage={errorEmail}
             defaultValue={formData.email}
             containerStyle={styles.inputstyle}
             rightIcon={<Icon
             type="material-community"
             name="email"
             
             />}
           />

           
           <Input
           placeholder="Ingresa tu contraseña.."
           onChange={(e)=> onchange(e,"password")}
           errorMessage={errorPassword}
           defaultValue={formData.password}
           containerStyle={styles.inputstyle}
           passwordRules={true}
           secureTextEntry={!showPassword}
           rightIcon={<Icon
           type="material-community"
           name={showPassword?"eye-off-outline":"eye-outline"}
           onPress={()=> setShowPassword(!showPassword)}
           iconStyle={styles.iconostyle}
           />}
           />

           <Input
           placeholder="Confirmar Contraseña.."
           onChange={(e)=> onchange(e,"confirm")}
           errorMessage={errorConfirm}
           defaultValue={formData.confirm}
           containerStyle={styles.inputstyle}
           passwordRules={true}
           secureTextEntry={!showPassword}
           rightIcon={<Icon
           type="material-community"
           name={showPassword?"eye-off-outline":"eye-outline"}
           onPress={()=> setShowPassword(!showPassword)}
           iconStyle={styles.iconostyle}
           />}
           />

           <Button
            title="Crear Cuenta"
            containerStyle={styles.botonstilo}
            buttonStyle={styles.btnestilo}
            onPress={()=> doRegisterUser()}
           />
           <Loading isVisible={loading, text="Creando cuenta..."}/>


        </View>
    )
}

const deefaultFormValues = () => {
    return{
        email:"",
        password:"",
        confirm:""
    }
}

const styles = StyleSheet.create({

    iconostyle:{
        color:"#c1c1c1"

    },

    btnestilo:{
        borderRadius:10,
        backgroundColor:"#97cc52"

    },


    botonstilo:{
        marginTop:20,
        width:"95%",
        alignSelf:"center"

    },

    inputstyle:{
        width:"100%"
       
    },

    viewstyle:{
        marginTop:30
    }
})
