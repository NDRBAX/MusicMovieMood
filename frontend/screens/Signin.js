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
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { Button, Image, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Signin = (props, { navigation }) => {
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorsSignin, setErrorsSignin] = useState([]);

  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // SIGNIN
  let handleSubmitSignin = async () => {
    const data = await fetch("http://192.168.0.19:3000/users/signin", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signinEmail}&passwordFromFront=${signinPassword}`,
    });

    const body = await data.json();
    console.log("USER ------------" + body.user);
    console.log("RESULT ------------" + body.result);
    console.log("TOKEN *************" + body.token);

    if (body.result) {
      dispatch(addToken(body.token));
      setUserExists(true);
    } else {
      setErrorsSignin(body.errors);
    }
  };
  let tabErrorsSignin = listErrorsSignin.map((error, index) => {
    return <Text style={{ color: "white" }}>{error}</Text>;
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
            placeholder="Email"
            leftIcon={<Icon name="envelope" size={15} color={"#E74680"} />}
            inputStyle={{ color: "white" }}
            onChangeText={(value) => setSigninEmail(value)}
            value={signinEmail}
          />
          <Input
            placeholder="Mot de passe"
            leftIcon={<Icon name="lock" size={15} color={"#E74680"} />}
            inputStyle={{ color: "white" }}
            secureTextEntry={true}
            onChangeText={(value) => setSigninPassword(value)}
            value={signinPassword}
          />
          {tabErrorsSignin}
          <Button
            buttonStyle={{ backgroundColor: "#E74680", width: "70%" }}
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
    // marginHorizontal: "10%",
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
