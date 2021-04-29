import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input,Button,Icon } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import Loading from '../Loading'
import {validateEmail} from '../../utils/helpers'
import { loginWithEmailAndPassword, registerUser } from '../../utils/action'
import { isEmpty } from 'lodash'

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(deefaultFormValues())
    const [formData, setFormData]= useState(false)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const onchange= (e,type)=> {
        setFormData({...formData, [type]:e.nativeEvent.text})
    }

    const doLogin = async ()=> {
        if(!validateData()){

            return
        }

        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password )
        setLoading(false)

        if(!result.statusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }
        navigation.navigate("account")
    }

    const validateData =()=>{
        
        setErrorEmail("")
        setErrorPassword("")
        let isValid=true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debe registrar un correo valido.")
            isValid=false
            
        }        

        if(isEmpty(formData.password)){
            setErrorPassword("Debe registrar una contraseña")
            isValid=false
        }

        return isValid
    }

    

    return (
        <View style={styles.viewcontainer}>

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
           <Button
            title="Iniciar Sesion"
            containerStyle={styles.botonstilo}
            buttonStyle={styles.btnestilo}
            onPress={()=> doLogin()}
           />
           <Loading isVisible={loading} text="Iniciando Sesion"/>
           
        </View>
    )
}

const deefaultFormValues = () => {
    return{
        email:"",
        password:"",
       
    }
}

const styles = StyleSheet.create({


    viewcontainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30
        },

        inputstyle:{
            width:"100%"
           
        },
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
    
})
