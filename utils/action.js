import {firebaseApp} from './firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { fileToBlob } from './helpers'
import 'firebase/storage'
import { Image } from 'react-native'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {

    let isLogged = false

    firebase.auth().onAuthStateChanged((user)=> {
        user !== null && (isLogged=true)
    })

    return isLogged

   
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const registerUser = async(email,password)=> {
    const result ={statusResponse:true,error:null}

    try {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse=false
        result.error="Este correo ya fue registrado."
    }

    return result
}

export const closeSesion=()=>{
    return firebase.auth().signOut()
}

export const loginWithEmailAndPassword = async(email,password)=> {
    const result ={statusResponse:true,error:null}

    try {
        await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
        result.statusResponse=false
        result.error="Credenciales no validas."
    }

    return result
}

export const uploadImage= async(image, path, name)=>{
    const result ={statusResponse:false,error:null,url:null}
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)


    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse=true
        result.url=url
    } catch (error) {
        result.error=error
    }
    return result;
}

export const updateProfile = async(data) => {
    const result = {status:true, error:null}

    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.status=false
        result.error=error
    }
    return result;
}

export const reauThenticate = async(password) => {
    
    const result ={status:true,error:null}
    const user = getCurrentUser()

    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.status=false
        result.error=error

    }

    return result
}

export const updateEmail = async(email) => {
    const result = {status:true, error:null}

    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.status=false
        result.error=error
    }
    return result;
}


export const updatePassword = async(password) => {
    const result = {status:true, error:null}

    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.status=false
        result.error=error
    }
    return result;
}

