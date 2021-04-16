import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'


export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(deefaultFormValues())
    const [formData, setFormData]= useState(false)

    

    const onchange= (e,type)=> {
        setFormData({...formData, [type]:e.nativeEvent.text})
    }
    return (
        <View style={styles.viewstyle}>
            
            <Input
             placeholder="Ingresa tu Correo.."
             onChange={(e)=> onchange(e,"email")}
             keyboardType="email-address"
             containerStyle={styles.inputstyle}
             rightIcon={<Icon
             type="material-community"
             name="email"
             
             />}
           />

           
           <Input
           placeholder="Ingresa tu contraseña.."
           onChange={(e)=> onchange(e,"password")}
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
            onPress={()=> console.log(formData)}
           />


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
