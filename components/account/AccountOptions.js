import { map } from "lodash";
import React, { useState } from "react";
import { Children } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";

export default function AccountOptions({ user, toasRef,setReloadUser }) {
  
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);


  const generateOptions = () => {
    return [
      {
        title: "Cambiar nombres y apellidos",
        nombreIconoIzquierda: "account-circle",
        colorIconoIzquierda: "#873e23",
        nombreIconoDerecha: "chevron-right",
        colorIconoDerecha: "#873e23",
        OnPress: () => selectedComponent("displayName"),
      },
  
      {
        title: "Cambiar email",
        nombreIconoIzquierda: "at",
        colorIconoIzquierda: "#873e23",
        nombreIconoDerecha: "chevron-right",
        colorIconoDerecha: "#873e23",
        OnPress: () => selectedComponent("email"),
      },
  
      {
        title: "Cambiar Contraseña",
        nombreIconoIzquierda: "lock-reset",
        colorIconoIzquierda: "#873e23",
        nombreIconoDerecha: "chevron-right",
        colorIconoDerecha: "#873e23",
        OnPress: () => selectedComponent("password"),
      },
    ];
  };
  


  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
          displayName={user.displayName}
          setShowModal={setShowModal}
          toasRef={toasRef}
          setReloadUser={setReloadUser}
          />
        )
        break;

      case "email":
        setRenderComponent(<Text>email</Text>);
        break;

      case "password":
        setRenderComponent(<Text>password</Text>);
        break;
    }

    setShowModal(true);
  };

  const menuOptions = generateOptions();

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          style={styles.estiloelementos}
          onPress={menu.OnPress}
        >
          <Icon
            type="material-community"
            name={menu.nombreIconoIzquierda}
            color={menu.colorIconoIzquierda}
          />

          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>

          <Icon
            type="material-community"
            name={menu.nombreIconoDerecha}
            color={menu.colorIconoDerecha}
          />
        </ListItem>
      ))}

      <Modal isVisible={showModal} setVisible={setShowModal}>
          {
              renderComponent
          }

      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  estiloelementos: {
    borderBottomWidth: 1,
    borderBottomColor: "#873e23",
  },
});
