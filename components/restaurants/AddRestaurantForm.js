import React, { useState,useEffect } from "react";
import { StyleSheet,Dimensions, Text, View, ScrollView, Alert } from "react-native";
import { Button, Icon, Input,Avatar,Image } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import {uploadImage} from '../../utils/action'
import { map,size,filter, isEmpty } from "lodash";
import uuid from 'random-uuid-v4'
import Modal from '../../components/Modal'
import MapView from 'react-native-maps'

const widtScreen = Dimensions.get("window").width


export default function AddRestaurantForm({ toasRef, setLoading, navigation }) {
  const addRestaurant = async() => {
   if(!validForm()){
     return
   }

   setLoading(true)
   const response = await uploadImages()
   console.log(response)
   setLoading(false)

   console.log("Eeeeeo")
    
  };


  const uploadImages = async()=>{
    const imagesUrl = []

    await Promise.all(
      map(imagesSelected, async(image) => {
        const response = await uploadImage(image,"restaurants",uuid())

        if(response.statusResponse){
          imagesUrl.push(response.url)
        }
      })
    )

    return imagesUrl
  }

  const validForm = () => {
    clearErrors()
    let isValid = true

    if(isEmpty(formData.name)){
      setErrorName("Debes ingresa el nombre del restaurante.")
      isValid=false
    }

    if(isEmpty(formData.address)){
      setErrorAddress("Debes ingresa la direccion del restaurante.")
      isValid=false
    }

    if(size(formData.phone)<10){
      setErrorPhone("Debes ingresa un numero de telefono valido.")
      isValid=false

    }

    if(isEmpty(formData.description)){
      setErrorDescripcion("Debes ingresa una descripcion del restaurante.")
      isValid=false
    }

    if(!validateEmail(formData.email)){
      setErrorEmail("Debes ingresar un email valido.")
      isValid=false
    }

    if(!locationRestaurant){
      toasRef.cuurent.show("Debes localizar el restaurante en el mapa.",3000)
      isValid=false
    }else if(size(imagesSelected)===0){
      toasRef.current.show("Debes agregar almenos una imagen al restaurante.",3000)
      isValid=false
    }

    return isValid
  }

  const clearErrors = () =>{
    setErrorDescripcion(null)
    setErrorEmail(null)
    setErrorName(null)
    setErrorPhone(null)
    setErrorAddress(null)
  }

  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorCountry, setErrorCountry] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false)
  const [locationRestaurant, setLocationRestaurant] = useState(null)


  return (
    <ScrollView style={styles.viewContainerstyle}>
      <ImageRestaurant
       imageRestaurant={imagesSelected[0]}
      />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescripcion={errorDescripcion}
        errorPhone={errorPhone}
        errorAddress={errorAddress}
        errorCountry={errorCountry}
        errorEmail={errorEmail}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
        
      />

      <UploadImage
        toasRef={toasRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />

      <Button
        title="Crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.addRestaurantStyle}
      />

      <MapRestaurant 
      isVisibleMap={isVisibleMap}
      setIsVisibleMap={setIsVisibleMap}
      setLocationRestaurant={setLocationRestaurant}
      toasRef={toasRef}
      locationRestaurant={locationRestaurant}
      
      />
    </ScrollView>
  );
}

function ImageRestaurant({imageRestaurant}){
  return(
    <View style={styles.viewPhoto}>
      <Image
       style={{width:widtScreen,height:200}}
       source={
         imageRestaurant?{uri:imageRestaurant}:require("../../assets/no-image.png")

       }
      />

    </View>
  )
}

function UploadImage({toasRef,imagesSelected,setImagesSelected}) {
    const imageSelect = async ()=> {
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toasRef.current.show("No we",3000)
            return
        }

        setImagesSelected([...imagesSelected,response.image])

    }

    const removeImage =(image) => {
      Alert.alert("Eliminar imagen","Deseas quitar esta image?",
      [
        
        {
          text:"No",
          style:"cancel",

        },
        {
          text:"Si",
          onPress:()=> {
            setImagesSelected(filter(imagesSelected,(imageUrl)=> imageUrl !== image))
          }
        }
      
      ],
      {
        cancelable:true
        
      }

      
    
      )
    }

  return (
    <ScrollView horizontal style={styles.viewImage}>
      {size(imagesSelected) < 10 && (
        <Icon
          type="material-commnunity"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.contaierIcon}
          onPress={imageSelect}
        />
      )}

      {
          map(imagesSelected,(imageRestaurant,index)=>(
              <Avatar 
               key={index}
               style={styles.miniatureStyle}
               source={{uri:imageRestaurant}}
               onPress={()=> removeImage(imageRestaurant)}
              />
          ))
      }

      
    </ScrollView>
  );
}

function MapRestaurant({isVisibleMap,setIsVisibleMap,setLocationRestaurant,toasRef,locationRestaurant}){
const [newRegion, setNewRegion] = useState(null)

  useEffect(()=> {
    (async()=> {
      const response = await getCurrentLocation()
        if(response.status){
          setNewRegion(response.location)
         
        }
      
    })()

  }, [])

  const confirmLocation = () =>{
    setLocationRestaurant(newRegion)
    toasRef.current.show("Localizacion guardada con exito.",3000)
    setIsVisibleMap(false)

  }

  return(
    <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
      <View>
        {

          newRegion && (
           <MapView
            style={styles.mapStyles}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
            >

              <MapView.Marker
              coordinate={{
                latitude:newRegion.latitude,
                longitude:newRegion.longitude
              }}
              draggable
              />
            </MapView>
          )
        }
        <View style={styles.viewMapBtn}>
          <Button
           title="Guardar ubicacion"
           containerStyle={styles.mapContainerButtonGuardar}
           buttonStyle={styles.mapButtonStyleGuardar}
           onPress={confirmLocation}
          />

          <Button
           title="Cancelar ubicacion"
           containerStyle={styles.mapConatinerButtonCancelar}
           buttonStyle={styles.mapButtonStyleCancelar}
           onPress={() => setIsVisibleMap(false)}
          />

        </View>
      </View>
     

    </Modal>
  )

}

function FormAdd({formData,setFormData,
  errorName,errorDescripcion,errorPhone,errorAddress,
  errorCountry,errorEmail,setIsVisibleMap,locationRestaurant}) {
  const [country, setCountry] = useState("CO");
  const [callingCode, setCallingCode] = useState("57");
  const [phone, setPhone] = useState("");

  const onChanges = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        defaultValue={formData.name}
        onChange={(e) => onChanges(e, "name")}
        errorMessage={errorName}
      />

      <Input
        placeholder="Direcccion del restaurante"
        defaultValue={formData.address}
        onChange={(e) => onChanges(e, "address")}
        errorMessage={errorAddress}
        rightIcon={{
          type:"material-community",
          name:"google-maps",
          color:locationRestaurant ? "#ff3044":"#3c8404",
          onPress:() => setIsVisibleMap(true)

        }}
      />

      <Input
        placeholder="Email del restaurante"
        keyboardType="email-address"
        defaultValue={formData.email}
        onChange={(e) => onChanges(e, "email")}
        errorMessage={errorEmail}
      />

      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPickerStyle}
          countryCode={country}
          onSelect={(country) => {
            setFormData({
              ...formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
            setCountry(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />

        <Input
          placeholder="Whattsapp del restaurante"
          keyboardType="phone-pad"
          defaultValue={formData.phone}
          containerStyle={styles.whatsapStyle}
          onChange={(e) => onChanges(e, "phone")}
          errorMessage={errorPhone}
        />
      </View>

      <Input
        placeholder="Descripcion del restaurante"
        multiline
        containerStyle={styles.descripcionStyle}
        defaultValue={formData.description}
        onChange={(e) => onChanges(e, "description")}
        errorMessage={errorDescripcion}
      />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    name: "",
    description: "",
    phone: "",
    address: "",
    country: "CO",
    callingCode: "57",
    email: "",
  };
};

const styles = StyleSheet.create({
  viewContainerstyle: {
    height: "100%",
  },

  addRestaurantStyle: {
    backgroundColor: "#873e23",
    margin: 20,
  },

  viewForm: {
    marginHorizontal: 10,
  },

  phoneView: {
    width: "80%",
    flexDirection: "row",
  },

  countryPickerStyle: {},

  whatsapStyle: {
    width: "100%",
    flexDirection: "column",
  },

  descripcionStyle: {
    height: 100,
    width: "100%",
  },

  contaierIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },

  viewImage: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },

  miniatureStyle:{

    width:70,
    height:70,
    marginRight:10
  },

  viewPhoto:{

    alignItems:"center",
    height:200,
    marginBottom:20,
    },

    mapStyles:{
      width:"100%",
      height:500,

    },
    viewMapBtn:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:10,


    },

    mapContainerButtonGuardar:{
      paddingRight:5,

    },

    mapButtonStyleGuardar:{
      backgroundColor:"#6abf4c"

    },
    mapConatinerButtonCancelar:{
      paddingLeft:5,

    },
    mapButtonStyleCancelar:{
      backgroundColor:"#873e23"


    },

});
