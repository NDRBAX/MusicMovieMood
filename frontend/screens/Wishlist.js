import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import TextCustom from '../components/TextCustom';
import { removeFromWishlist } from '../features/movie/movieSlice';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Wishlist({ navigation }) {
	// extract data from the Redux store state
	const wishlist = useSelector(state => state.movie);
	// returns a reference to the dispatch function from the Redux store
	const dispatch = useDispatch();

	return (
		<ImageBackground
			source={require('../assets/images/movie_bg.jpg')}
			style={styles.imagebg}
			resizeMode="cover"
		>
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>

				<TextCustom fontSize="22" fontWeight="bold">
					Wishlist
				</TextCustom>
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
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		width: '100%',
	},
	imagebg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	back_btn: {
		width: '100%',
		marginLeft: 20,
	},
});
