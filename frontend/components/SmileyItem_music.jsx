import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addMoodFilter, toggleSmiley } from "../features/music/musicSlice";
import { smileyMusicList } from "../data/smiley";

const SmileyItem = ({ name }) => {
  const dispatch = useDispatch();

  let uriImg = smileyMusicList.find((item) => item.name === name).img;
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(addMoodFilter(name));
        dispatch(toggleSmiley());
      }}
    >
      <Image style={styles.smiley} source={uriImg} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smiley: {
    height: 50,
    width: 50,
    margin: 15,
  },
});

export default SmileyItem;
