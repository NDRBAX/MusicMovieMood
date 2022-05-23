import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addMoodFilter,
  addMoodList,
  addMoodPlay,
  toggleSmiley,
} from "../features/music/musicSlice";
import { smileyMusicMoodList } from "../data/smiley";

const SmileyItem = ({ name }) => {
  const dispatch = useDispatch();
  let uriImg = smileyMusicMoodList.find((item) => item.name === name).img;
  return (
    <TouchableOpacity
      onPress={async () => {
        dispatch(addMoodFilter(name));
        var filterMoodRaw = await fetch(
          `http://192.168.0.19:3000/music/mood/${name}`
        );
        var moodMusic = await filterMoodRaw.json();
        var filterMood = moodMusic.filter;
        //doublons
        console.log(filterMood.length);
        if (filterMood.length > 10) {
          filterMood = filterMood.splice(0, 10);
        }
        dispatch(addMoodList(filterMood));
        var filterMoodPLRaw = await fetch(
          `http://192.168.0.19:3000/music/getPlaylist?filter=${name}`
        );
        var moodPL = await filterMoodPLRaw.json();
        var filterPLMood = moodPL;
        //doublons
        console.log(filterPLMood.length);
        dispatch(addMoodPlay(filterPLMood));
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
