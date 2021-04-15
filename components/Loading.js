import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({isVisible, text}) {
    return (
        <Overlay
         isVisible={isVisible}
         windowBackgroundColor="rgba(0,0,0.5)"
         overlayBackgroundColor="transparent"
         overlayStyle={styles.overlay}
        >
         <View style={styles.view}>
             <ActivityIndicator
              size="large"
              color="8cc43c"
             />
             {
                 text && <Text style={styles.text}>{text}</Text>
             }
         </View>



        </Overlay>
    )
}

const styles = StyleSheet.create({

   text:{
       color:"#8cc43c",
       marginTop:10
       
       
       

   },

    view:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'

    },

    overlay:{
        height:100,
        width:200,
        backgroundColor:"#fff",
        borderColor:"#8cc43c",
        borderWidth:2,
        borderRadius:10
    }
})
