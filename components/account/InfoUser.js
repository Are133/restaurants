import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import { updateProfile, uploadImage } from "../../utils/action";
import { loadImageFromGallery } from "../../utils/helpers";

export default function InfoUser({ user,setLoading,setLoadingText}) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL)

  const changePhoto = async () => {
    
    const result = await loadImageFromGallery([1,1])

    if(!result.status){
        console.log("Error anterior wey")
        return
    }

    setLoadingText("Actualizando Imagen")
    setLoading(true)

    const resultUploadImage = await uploadImage(result.image,"avatars",user.uid)

    if(!resultUploadImage.statusResponse){
        setLoading(false)
        Alert.alert("Ocurrrio un problema wey")
        return 
    }

    const resultUpdateProfile = await updateProfile({photoURL:resultUploadImage.url})

    setLoading(false)

    if(resultUpdateProfile.status){
        setPhotoUrl(resultUploadImage.url)

    }else{
        Alert.alert("Error wey no puedo")
    }
    



    
  }

  return (
    <View style={styles.viewconatiner}>
      <Avatar
        onPress={changePhoto}
        rounded
        size="large"
        containerStyle={styles.avatarstyle}
        source={
            photoUrl?{uri:photoUrl}:require("../../assets/avatardefault.png")
        }
      />

      <View style={styles.containerinfouser}>
        <Text style={styles.displaynameUserinfo}>
          {user.displayName ? user.displayName : "Anonimo"}
        </Text>
        <Text style={styles.emailuserinfo}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  displaynameUserinfo: {
    color: "aqua",
    marginLeft: 30,
    fontWeight: "bold",
    paddingBottom: 5,
  },

  emailuserinfo: {
    color: "green",
    marginLeft: 30,
    fontWeight: "bold",
  },

  containerStyle: {},

  viewconatiner: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },

  avatarstyle: {},
});
