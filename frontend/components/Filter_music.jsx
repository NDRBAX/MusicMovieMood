import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import TextCustom from "./TextCustom";
import { filterMusicList } from "../data/filters";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  toggleSmiley,
  toggleAmbianceFilter,
  toggleGenreFilter,
} from "../features/music/musicSlice";

const Filter = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { moodFilter, ambianceFilter, genreFilter } = useSelector(
    (state) => state.music
  );
  const dispatch = useDispatch();
  const { name } = props;

  useEffect(() => {
    if (name == "mood") {
      moodFilter != "" ? setIsActive(true) : setIsActive(false);
    }
    if (name == "ambiance") {
      ambianceFilter != "" ? setIsActive(true) : setIsActive(false);
    }
    if (name == "genre") {
      genreFilter != "" ? setIsActive(true) : setIsActive(false);
    }
  }, [ambianceFilter, moodFilter, genreFilter]);

  let uriImg;

  isActive &&
    (uriImg = filterMusicList.find((item) => item.name === name).activeImg);
  !isActive &&
    (uriImg = filterMusicList.find((item) => item.name === name).img);

  return (
    <TouchableOpacity
      onPress={() => {
        if (name == "ambiance") {
          dispatch(toggleAmbianceFilter());
        }
        if (name == "genre") {
          dispatch(toggleGenreFilter());
        }

        if (name == "mood") {
          dispatch(toggleSmiley());
        }
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image style={styles.stretchFilter} source={uriImg} />
        <TextCustom fontSize="14">{name}</TextCustom>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stretchFilter: {
    width: 65,
    height: 65,
    resizeMode: "stretch",
    paddingHorizontal: 20,
  },
});

export default Filter;
