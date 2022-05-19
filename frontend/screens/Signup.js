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

const Signup = (props, { navigation }) => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // SIGNUP
  let handleSubmitSignup = async () => {
    const data = await fetch("/signup", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signupEmail}&passwordFromFront=${signupPassword}`,
    });

    const body = await data.JSON();

    if (signupPassword !== signupConfirmPassword) {
      setPasswordMatch(false);
    } else if (!body.result) {
      setErrorsSignup(body.errors);
    } else {
      dispatch(addToken(body.token));
      setUserExists = true;
    }
  };
  let tabErrorsSignup = listErrorsSignup.map((error, index) => {
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
          <Text style={styles.textTitle}>Créer un compte vous permet:</Text>
          <Text style={styles.textBody}>
            {"\u2022"} Sauvergader liste d’envies {"\n"}
            {"\u2022"} Ajouter vos plateformes de streaming
          </Text>

          <Input
            name="Email"
            icon="envelope"
            onChangeText={(value) => setSignupEmail(value)}
            value={signupEmail}
          />
          <Input
            name="Mot de passe"
            icon="lock"
            pass={true}
            onChangeText={(value) => setSignupPassword(value)}
            value={signupPassword}
          />
          <Input
            name="Confirmer le mot de passe"
            icon="lock"
            pass={true}
            onChangeText={(value) => setSignupConfirmPassword(value)}
            value={signupConfirmPassword}
          />
          {tabErrorsSignup}
          <Submit
            color="#E74680"
            title="S'inscrire"
            onPress={() => handleSubmitSignup()}
          />
          {passwordMatch && (
            <Text> Les mots de passe ne correspondent pas. </Text>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textBody}>Vous avez déjà un compte? </Text>
            <Text
              style={[
                styles.textBody,
                { color: "#E74680" },
                { fontWeight: "bold" },
              ]}
              onPress={() => props.navigation.navigate("Signin")}
            >
              Se connecter
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.withoutAccount]}
          onPress={() => props.navigation.navigate("Wishlist")}
        >
          <Text style={[styles.withoutAccountText]}>
            Continuer sans compte{"   "}
            <AntDesign name="rightcircleo" size={15} color="#FFC5DA" />
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default Signup;

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
  withoutAccount: {
    height: 38,
    width: "70%",
    borderRadius: 5,
    marginVertical: 50,
    alignSelf: "center",
    // borderWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  withoutAccountText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFC5DA",
    alignSelf: "center",
    // marginVertical: 10,
    padding: 11,
  },
});
