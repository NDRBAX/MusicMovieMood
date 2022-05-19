import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

class Inputs extends Component {
  state = { isFocused: false };

  onFocusChange = () => {
    this.setState({ isFocused: true });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          { borderColor: this.state.isFocused ? "#E74680" : "white" },
          { borderWidth: this.state.isFocused ? "2" : "1" },
        ]}
      >
        <Input
          placeholder={this.props.name}
          onFocus={this.onFocusChange}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          secureTextEntry={this.props.pass}
          leftIcon={
            <Icon
              name={this.props.icon}
              size={15}
              color={this.state.isFocused ? "#E74680" : "white"}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: 38,
    borderRadius: 5,
    marginVertical: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: "white",
    fontWeight: "300",
    marginLeft: 5,
    padding: 10,
  },
});

export default Inputs;
