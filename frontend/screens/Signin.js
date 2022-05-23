import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LOCAL_IP } from "@env";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../features/login/tokenSlice";

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
    const data = await fetch(`${LOCAL_IP}/users/signin`, {
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

        <View style={styles.signin}>
          <Image
            source={require("../assets/images/MMM.png")}
            resizeMode="center"
            style={styles.logo}
          />

          <Input
            placeholder="Email"
            autoCapitalize={"none"}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputText}
            leftIcon={<Icon name="envelope" size={15} color={"#E74680"} />}
            keyboardType="email-address"
            onChangeText={(value) => setSigninEmail(value)}
            value={signinEmail}
          />

          <Input
            placeholder="Mot de passe"
            leftIcon={<Icon name="lock" size={15} color={"#E74680"} />}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputText}
            secureTextEntry={true}
            onChangeText={(value) => setSigninPassword(value)}
            value={signinPassword}
          />
          {tabErrorsSignin}
          <Button
            buttonStyle={{
              backgroundColor: "#E74680",
              width: "110%",
              marginTop: 10,
            }}
            title="Se connecter"
            onPress={() => handleSubmitSignin()}
          />

          <View style={{ flexDirection: "row", marginTop: 5 }}>
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
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signin: {
    flex: 1,
    alignItems: "center",
  },
  inputContainerStyle: {
    width: "70%",
    height: 38,
    borderRadius: 5,
    marginVertical: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  inputText: {
    color: "white",
    fontWeight: "300",
    marginLeft: 5,
    padding: 10,
  },
  logo: {
    width: 350,
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
    alignSelf: "center",
  },
  textBody: {
    fontSize: 12,
    color: "white",
    marginBottom: 15,
    alignSelf: "center",
  },
});
