import React, { useEffect, useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, View, Image } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import TextCustom from '../components/TextCustom';
import { removeFromWishlist } from '../features/movie/movieSlice';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Wishlist({ navigation }) {
	const { wishList } = useSelector(state => state.movie);
	const [wishListMovie, setWishListMovie] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		const getMovies = async id => {
			try {
				const mov = await axios.get('http://192.168.1.21:3000/movie/getDetailsMovies', {
					params: {
						id,
					},
				});
				console.log(mov.data);
				setWishListMovie([
					...wishListMovie,
					{
						title: mov.data.title,
						backdrop_path: mov.data.poster_path,
						id: mov.data.id,
						runtime: mov.data.runtime,
						date: mov.data.release_date,
					},
				]);
			} catch (err) {
				console.log(err);
			}
		};
		wishList.map(movie => getMovies(movie));
	}, []);

	console.log('""""""""""""""""""""""""wishlist');
	console.log(wishListMovie);

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
				<View>
					{wishListMovie.map((movie, i) => (
						// <Card key={i}>
						// 	<Card.Image
						// 		source={{
						// 			uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`,
						// 		}}
						// 	/>
						// 	<Text>{movie.title}</Text>
						// 	<Text>{movie.release_date}</Text>
						// 	<Text>{movie.runtime}</Text>
						// 	<Button
						// 		onPress={() => dispatch(removeFromWishlist(movie))}
						// 		title=" Remove from wishlist"
						// 	/>
						// </Card>
						<View style={{ with: '100%', height: 150, flex: 1 }}>
							<Image
								style={{
									borderRadius: 10,
									height: 175,
									width: 112,
								}}
								resizeMode="cover"
								source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }}
							/>
							<TextCustom>{movie.title}</TextCustom>
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
		width: '100%',
		backgroundColor: 'pink',
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
