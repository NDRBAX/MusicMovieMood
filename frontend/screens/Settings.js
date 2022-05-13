import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-elements";

export default function Settings() {
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <Text h4 style={{ textAlign: "center" }}>
        Settings
      </Text>
    </ScrollView>
  );
}
