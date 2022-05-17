import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../movie/movieSlice";

export default function Wishlist({ navigation }) {
  // extract data from the Redux store state
  const wishlist = useSelector((state) => state.movie);
  // returns a reference to the dispatch function from the Redux store
  const dispatch = useDispatch();
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <Button onPress={() => navigation.goBack()} title="go back"></Button>
      <Text h4 style={{ textAlign: "center" }}>
        Wishlist
      </Text>
      {wishlist.movies.map((movie, i) => (
        <Card key={i}>
          <Card.Image />
          <Text>{movie.title}</Text>
          <Text>{movie.year}</Text>
          <Text>{movie.length}</Text>
          <Button
            onPress={() => dispatch(removeFromWishlist(movie))}
            title=" Remove from wishlist"
          />
        </Card>
      ))}
    </ScrollView>
  );
}
