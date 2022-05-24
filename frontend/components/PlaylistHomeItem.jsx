import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PlaylistHomeItem = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        height: 175,
        width: 112,
        borderRadius: 30,
        marginHorizontal: 10,
      }}
      onPress={() => {
        Linking.openURL("https://www.spotify.com/fr/");
      }}
    >
      <Text
        style={{
          position: "absolute",
          zIndex: 88,
          bottom: 0,
          color: "white",
          textAlign: "center",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {props.title}
      </Text>

      <Image
        source={{ uri: props.url }}
        style={{
          borderRadius: 10,
          height: 175,
          width: 112,
          paddingHorizontal: 10,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default PlaylistHomeItem;

const styles = StyleSheet.create({});
