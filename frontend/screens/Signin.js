import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../features/login/tokenSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import Input from "../components/Inputs";
import Submit from "../components/Submit";
import { Image } from "react-native-elements";

const Signin = (props, { navigation }) => {
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorsSignin, setErrorsSignin] = useState([]);

  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // SIGNIN
  let handleSubmitSignin = async () => {
    const data = await fetch("/signin", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${setSigninEmail}&passwordFromFront=${setSigninPassword}`,
    });

    const body = await data.JSON();

    if (body.result) {
      dispatch(addToken(body.token));
      setUserExists = true;
    } else {
      setErrorsSignin(body.error);
    }
  };

  let tabErrorsSignin = listErrorsSignin.map((error, index) => {
    return <Text>{error}</Text>;
  });

  return (
    <ImageBackground
      source={require("../assets/images/movie_bg.jpg")}
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.back_btn}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.login}>
          <Image
            source={require("../assets/images/MMM.png")}
            resizeMode="center"
            style={styles.logo}
          />
          <Input
            name="Email"
            icon="envelope"
            onChangeText={(value) => setSigninEmail(value)}
            value={signinEmail}
          />
          <Input
            name="Mot de passe"
            icon="lock"
            pass={true}
            onChangeText={(value) => setSigninPassword(value)}
            value={signinPassword}
          />
          {tabErrorsSignin}
          <Submit
            color="#E74680"
            title="Se connecter"
            onPress={() => handleSubmitSignin()}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textBody}>
              Vous avez oublié votre mot de passe?{" "}
            </Text>
            <Text
              style={[
                styles.textBody,
                { color: "#E74680" },
                { fontWeight: "bold" },
              ]}
              onPress={() => props.navigation.navigate("Movie")}
            >
              Vous pouvez le restaurer
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    width: "100%",
  },
  login: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 200,
    marginVertical: 10,
  },
  back_btn: {
    width: "100%",
    marginLeft: 20,
  },
  textTitle: {
    fontSize: 18,
    color: "white",
    marginVertical: 5,
  },
  textBody: {
    fontSize: 12,
    color: "white",
    marginBottom: 15,
  },
});
