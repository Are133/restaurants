import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Button, Icon, Input,Avatar } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { loadImageFromGallery } from '../../utils/helpers'
import { map,size,filter } from "lodash";

export default function AddRestaurantForm({ toasRef, setLoading, navigation }) {
  const addRestaurant = () => {
    console.log(formData);
    
  };

  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorCountry, setErrorCountry] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);

  return (
    <View style={styles.viewContainerstyle}>
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescripcion={errorDescripcion}
        errorPhone={errorPhone}
        errorAddress={errorAddress}
        errorCountry={errorCountry}
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
    </View>
  );
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

function FormAdd({formData,setFormData,errorName,errorDescripcion,errorPhone,errorAddress,errorCountry,errorEmail,}) {
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
});
