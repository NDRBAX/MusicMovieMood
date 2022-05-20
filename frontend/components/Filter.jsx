import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import TextCustom from "./TextCustom";
import { filterMovieList } from "../data/filters";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  toggleSmiley,
  addPublicFilter,
  addWhereFilter,
} from "../features/movie/movieSlice";

const Filter = (props) => {
  const [isActive, setIsActive] = useState(false);
  const { moodFilter, publicFilter, whereFilter } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();
  const { name } = props;

  useEffect(() => {
    if (name == "mood") {
      moodFilter != "" ? setIsActive(true) : setIsActive(false);
    }
    if (name == "public") {
      publicFilter ? setIsActive(true) : setIsActive(false);
    }
    if (name == "ou?") {
      whereFilter ? setIsActive(true) : setIsActive(false);
    }
  }, [whereFilter, publicFilter, moodFilter]);

  let uriImg;

  isActive &&
    (uriImg = filterMovieList.find((item) => item.name === name).activeImg);
  !isActive &&
    (uriImg = filterMovieList.find((item) => item.name === name).img);

  return (
    <TouchableOpacity
      onPress={() => {
        if (name == "public") {
          dispatch(addPublicFilter());
        }
        if (name == "ou?") {
          dispatch(addWhereFilter());
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
