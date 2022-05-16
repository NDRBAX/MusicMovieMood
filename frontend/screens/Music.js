import React from "react";
import { ScrollView, View } from "react-native";
import { Icon, Text } from "react-native-elements";

// Import icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Music(props) {

  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View
        style={{
          flexWrap: "wrap",
          alignSelf: "flex-end",
          flexDirection: "row",
          marginRight: 20,
        }}
      >
        {/* <Icon
          style={{ marginRight: 5 }}
          name="heart-circle"
          type="ionicon"
          buttonStyle={{ backgroundColor: "#009788" }}
          onPress={() => props.navigation.navigate("Wishlist")}
        /> */}
        <Icon
          name="account"
          type="material-community"
          buttonStyle={{ backgroundColor: "#009788" }}
          onPress={() => props.navigation.navigate("Settings")}
        />
      </View>
      <Text h4 style={{ textAlign: "center" }}>
        Music
      </Text>
    </ScrollView>
  );
}
