import {
	Button,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextCustom from '../components/TextCustom';

const MovieDetail = ({ route, navigation }) => {
	const [movie, setMovie] = useState([]);
	const [actors, setActors] = useState([]);
	const [providers, setProviders] = useState([]);
	const { id } = route.params;

	useEffect(() => {
		const getMovieDetail = async () => {
			try {
				const mov = await axios.get(`http://192.168.1.21:3000/movie/getDetailsMovies/${id}`);
				setMovie(mov.data);
			} catch (err) {
				console.log(err);
			}
		};
		const getMovieActors = async () => {
			try {
				const mov2 = await axios.get(`http://192.168.1.21:3000/movie/getActorMovies/${id}`);
				setActors(mov2.data);
			} catch (err) {
				console.log(err);
			}
		};
		const getProv = async () => {
			try {
				const mov3 = await axios.get('http://192.168.1.21:3000/movie/findProvider', {
					params: {
						id,
					},
				});

				setProviders(mov3.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMovieDetail();
		getMovieActors();
		getProv();
	}, []);

	// console.log(movie);
	// console.log(actors);
	console.log(providers);

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
					{movie.title}
				</TextCustom>

				<Image
					source={{
						uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
					}}
					style={{
						borderRadius: 10,
						height: 350,
						width: '100%',
					}}
					resizeMode="cover"
				/>
				{/* <View>{providers.buy.map(it=>{})}</View> */}
			</ScrollView>
		</ImageBackground>
	);
};

export default MovieDetail;

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
