import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../features/login/tokenSlice";

import { AntDesign } from "@expo/vector-icons";

import { Button, Image, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Signup = (props, { navigation }) => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // SIGNUP
  let handleSubmitSignup = async () => {
    const data = await fetch("http://192.168.1.10:3000/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signupEmail}&passwordFromFront=${signupPassword}&confirmPasswordFromFront=${signupConfirmPassword}`,
    });

    const body = await data.json();

    if (body.result) {
      setUserExists(true);
      dispatch(addToken(body.token));
      // Alert.alert(
      //   "Votre compte a été crée !",
      //   "Vous pouvez maintenant profiter de toutes les fonctionnalités de MusicMovieMood",
      //   [
      //     {
      //       text: "Fermer",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel",
      //     },
      //     {
      //       text: "OK",
      //       onPress: () =>
      //         props.navigation.navigate("Movie") && console.log("OK Pressed"),
      //     },
      //   ]
      // );
    } else {
      setErrorsSignup(body.errors);
    }
  };
  let tabErrorsSignup = listErrorsSignup.map((error, index) => {
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
          <Text style={styles.textTitle}>Créer un compte vous permet:</Text>
          <Text style={styles.textBody}>
            {"\u2022"} Sauvergader liste d’envies {"\n"}
            {"\u2022"} Ajouter vos plateformes de streaming
          </Text>

          <Input
            placeholder="Email"
            autoCapitalize={"none"}
            keyboardType="email-address"
            leftIcon={<Icon name="envelope" size={15} color={"#E74680"} />}
            inputStyle={{ color: "white" }}
            onChangeText={(value) => setSignupEmail(value)}
            value={signupEmail}
          />
          <Input
            placeholder="Mot de passe"
            leftIcon={<Icon name="lock" size={15} color={"#E74680"} />}
            inputStyle={{ color: "white" }}
            secureTextEntry={true}
            onChangeText={(value) => setSignupPassword(value)}
            value={signupPassword}
          />
          <Input
            placeholder="Confirmer le mot de passe"
            leftIcon={<Icon name="lock" size={15} color={"#E74680"} />}
            inputStyle={{ color: "white" }}
            secureTextEntry={true}
            onChangeText={(value) => setSignupConfirmPassword(value)}
            value={signupConfirmPassword}
          />
          {tabErrorsSignup}

          <Button
            buttonStyle={{ backgroundColor: "#E74680", width: "70%" }}
            title="S'inscrire"
            onPress={() => handleSubmitSignup()}
          />

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
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    // marginHorizontal: "10%",
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
