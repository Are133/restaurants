import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, View,Image,ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import LoginForm from '../../components/account/LoginForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


export default function Login() {
    

    return (
        <KeyboardAwareScrollView>
            <Image
             source={require("..//..//assets/logococina.png")}
             resizeMode="contain"
             style={styles.titleimage}
             
            />

            <View style={styles.viewcontainer}>
                <LoginForm/>
                <CreateAccount/>
                
            </View>
            <Divider
            style={styles.dividirlinea}
            />
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(params) {
    const navigation = useNavigation()
    return(
        <Text style={styles.nocuenta}
         onPress={()=> navigation.navigate("register")}
        >
            Si aun no tienes una cuenta!{" "}
            <Text style={styles.registrate}>
                Registrate
            </Text>
        </Text>
    )
    
}

const styles = StyleSheet.create({

    nocuenta:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf:'center'

    },

    registrate:{
        color:"#854d37",
        fontWeight: 'bold'
        

    },

    dividirlinea:{
        margin:40,
        backgroundColor:"#854d37"



    },
    viewcontainer:{
        marginHorizontal:40

    },

    titleimage:{
        height:150,
        width:"100%",
        marginBottom: 20,
        marginTop: 10
    }
})
