import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Submit = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.color }]}
    >
      <Text style={styles.submitText}> {props.title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: 38,
    borderColor: "#E74680",
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    padding:10
  },
});

export default Submit;
