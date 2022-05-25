import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import TextCustom from "../components/TextCustom";
import { removeFromWishlist } from "../features/movie/movieSlice";

import { importMovies } from "../features/movie/movieSlice";

import { AntDesign } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Wishlist({ navigation }) {
  const [localWishlist, setLocalWishlist] = useState([]);
  const { token } = useSelector((state) => state.token);
  const { wishList } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    let dataLocalWishlist = AsyncStorage.getItem("localWishlist");
    console.log(dataLocalWishlist);
    setLocalWishlist(JSON.parse(dataLocalWishlist));
    console.log(localWishlist);
  }, []);

  console.log("LOCAL WISHLIST ------------------------------" + localWishlist);

  return (
    <ImageBackground
      source={require("../assets/images/movie_bg.jpg")}
      style={styles.imagebg}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.back_btn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>

        <TextCustom fontSize="22" fontWeight="bold">
          WishList
        </TextCustom>
        {localWishlist.length == 0 && (
          <TextCustom style={{ paddingHorizontal: 20, marginTop: 20 }}>
            Sorry, pas encore de porno gay hardcore sneakers en stock !
          </TextCustom>
        )}
        <View>
          {localWishlist.map((movie, i) => (
            <View style={styles.movieItem}>
              <Image
                style={styles.imgMovie}
                resizeMode="cover"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
                }}
              />
              <View style={styles.movieInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <TextCustom
                    fontSize="18"
                    fontWeight="bold"
                    style={{
                      marginTop: 10,
                      marginBottom: 7,
                      textAlign: "left",
                      maxWidth: 250,
                    }}
                  >
                    {movie.title}
                  </TextCustom>
                  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                      dispatch(removeFromWishlist(movie.id));
                    }}
                  >
                    <Icon name="closecircleo" color="#fff" type="antdesign" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginEnd: 10,
                    alignItems: "center",
                  }}
                >
                  <TextCustom style={{ textAlign: "left", marginBottom: 7 }}>
                    Durée du film : {movie.runtime} min
                  </TextCustom>
                  <TextCustom
                    fontWeight="light"
                    style={{ textAlign: "left", marginBottom: 7 }}
                  >
                    {movie.year}
                  </TextCustom>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    textAlign: "left",
                  }}
                >
                  {movie?.genres.map((el) => (
                    <View
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: 10,
                        paddingHorizontal: 5,
                        marginHorizontal: 2,
                        marginVertical: 2,
                      }}
                    >
                      <TextCustom fontSize="12">{el.name} </TextCustom>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    width: "100%",
  },
  imagebg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back_btn: {
    width: "100%",
    marginLeft: 20,
  },
  imgMovie: { borderRadius: 0, height: 120, width: 112 },
  movieItem: {
    with: "100%",
    height: 120,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 5,
    flexDirection: "row",
  },
  movieInfo: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 10,
    zIndex: 1,
  },
  delete: { marginEnd: 8, marginTop: 6 },
});
