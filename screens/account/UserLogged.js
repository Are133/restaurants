import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { closeSesion, getCurrentUser } from "../../utils/action";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";

export default function UserLogged() {
  const navigation = useNavigation();
  const toasRef = useRef();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <View style={styles.containerrview}>
      {
        user && (
            
            <View>
                <InfoUser user={user} setLoading={setLoading} setLoadingText={setLoadingText}/>
                <AccountOptions
                 user={user} 
                 toasRef={toasRef}
                />

            </View>
        )
      }

      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnclosesesion}
        titleStyle={styles.btntitlestyle}
        onPress={() => {
          closeSesion();
          navigation.navigate("restaurants");
        }}
      />

      <Toast ref={toasRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerrview: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },
  btnclosesesion: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#ffff",
    borderTopWidth: 1,
    borderTopColor: "#854d37",
    borderBottomWidth: 1,
    borderBottomColor: "#854d37",
    paddingVertical: 10,
  },
  btntitlestyle: {
    color: "#854d37",
  },
});
