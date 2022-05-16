import React from "react";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";

export default function Settings({ navigation }) {
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <Button onPress={() => navigation.goBack()} title="go back"></Button>
      <Text h4 style={{ textAlign: "center" }}>
        Settings
      </Text>
    </ScrollView>
  );
}
