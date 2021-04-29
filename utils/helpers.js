import * as Permission from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {Alert} from 'react-native'

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async(array) => {
    const response = {status:false,image:null}
    const resultPermission = await Permission.askAsync(Permission.CAMERA)
    if(resultPermission.status==="denied"){
        Alert.alert("Debes aceptar los permisos para acceder a la galeria")
        return response
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect:array
    })

    if(result.cancelled){
        return response
    }

    response.status=true
    response.image=result.uri
    return response 

}

export const fileToBlob = async(path)=> {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob;
}

