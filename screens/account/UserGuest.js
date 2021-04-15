import React from 'react'
import { StyleSheet, Text, View,ScrollView,Image} from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'



export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
        centerContent={true}
        style={styles.viewBody}
        >

         <Image
          source={require("../../assets/logococina.png")}
          resizeMode="contain"
          style={styles.image}
         />

         <Text style={styles.textotitle}>Ver tu perfil en restaurants</Text>
         <Text style={styles.textoinicio}>Vota, Ubica y cuenta tu experiencia aqui!!</Text>
         <Button
          title="Vizualisa tu perfil"
          buttonStyle={styles.botomperfil}
          onPress={()=> navigation.navigate("login")}
          
         />

         

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    botomperfil:{
        backgroundColor:"#97cc52"

    },

    textoinicio:{
        textAlign: "justify",
        marginBottom:20,
        color:"#873e23"

    },

    textotitle:{
        fontWeight:"bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
        
    },

    image:{
        height:300,
        width:"100%",
        marginBottom: 10,
        marginTop:20
        

    },

    viewBody:{
        marginHorizontal:30
    }
})
