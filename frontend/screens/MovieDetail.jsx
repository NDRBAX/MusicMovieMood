import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	Linking,
	ActivityIndicator,
} from 'react-native';
import uuid from 'react-native-uuid';
import { LOCAL_IP } from '@env';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextCustom from '../components/TextCustom';
import { Icon } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, addMovieWatched } from '../features/movie/movieSlice';
import { providersUrlList } from '../data/providers';
import Loader from '../components/Loader';

const MovieDetail = ({ route, navigation }) => {
	const [movie, setMovie] = useState([]);
	const [actors, setActors] = useState([]);
	const [providers, setProviders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = route.params;
	const dispatch = useDispatch();
	const { wishList } = useSelector(state => state.movie);

	const handleProviderUrl = idProvider => {
		const url = providersUrlList.find(provider => provider.id === idProvider).url;

		dispatch(addMovieWatched(movie.id));
		Linking.openURL(url);
	};

	useEffect(() => {
		const getMovieDetail = async () => {
			try {
				const mov = await axios.get(`${LOCAL_IP}/movie/getDetailsMovies/${id}`);
				setMovie(mov.data);
			} catch (err) {
				console.log(err);
			}
		};
		const getMovieActors = async () => {
			try {
				const mov2 = await axios.get(`${LOCAL_IP}/movie/getActorMovies/${id}`);
				setActors(mov2.data);
			} catch (err) {
				console.log(err);
			}
		};
		const getProv = async () => {
			try {
				const mov3 = await axios.get(`${LOCAL_IP}/movie/findProvider`, {
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

	useEffect(() => {
		const timer1 = setTimeout(() => {
			setIsLoading(false);
		}, 500);
		return () => {
			clearTimeout(timer1);
		};
	}, []);

	const displayStars = num => {
		num = Math.round(num / 2);
		let stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < num) {
				stars.push(
					<Icon
						style={{ marginHorizontal: 2 }}
						name="star"
						type="antdesign"
						color="#FFC700"
					/>,
				);
			} else {
				stars.push(
					<Icon style={{ marginHorizontal: 2 }} name="staro" type="antdesign" color="white" />,
				);
			}
		}
		return stars;
	};

	const getMovies = async id => {
		try {
			const movie = await axios.get(`${LOCAL_IP}/movie/getDetailsMoviesForWishlist`, {
				params: {
					id,
				},
			});

			dispatch(
				addToWishlist({
					title: movie.data.title,
					backdrop_path: movie.data.poster_path,
					id: movie.data.id,
					runtime: movie.data.runtime,
					year: new Date(movie.data.release_date).getFullYear(),
					genres: movie.data.genres,
				}),
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ImageBackground
			source={require('../assets/images/movie_bg.jpg')}
			style={styles.imagebg}
			resizeMode="cover"
			key={uuid.v4()}
		>
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>

				{isLoading && <Loader />}

				{!isLoading && (
					<>
						<TextCustom
							fontSize="22"
							fontWeight="bold"
							style={{ marginBottom: 15, marginTop: 5 }}
							key={uuid.v4()}
						>
							{movie.title}
						</TextCustom>
						<View style={styles.btn_heart}>
							<TouchableOpacity
								onPress={() => {
									console.log('coeur');
									wishList.some(item => item.id === movie?.id)
										? dispatch(removeFromWishlist(movie?.id))
										: getMovies(movie?.id);
								}}
							>
								<Icon
									style={{ marginHorizontal: 5 }}
									name={
										wishList.some(item => item.id === movie?.id)
											? 'ios-heart'
											: 'ios-heart-outline'
									}
									type="ionicon"
									color="#E74680"
								/>
							</TouchableOpacity>
						</View>
						<Image
							source={{
								uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
							}}
							style={{
								height: 300,
								width: '100%',
							}}
							resizeMode="cover"
						/>
						{providers?.buy && (
							<ScrollView horizontal={true} style={{ marginTop: 10 }}>
								{providers?.buy?.map(el => (
									<View key={uuid.v4()}>
										<TouchableOpacity
											onPress={() => {
												handleProviderUrl(el?.provider_id);
											}}
										>
											<Image
												style={{
													height: 80,
													width: 110,
													borderRadius: 10,
													marginHorizontal: 5,
												}}
												source={{
													uri: `https://image.tmdb.org/t/p/w500/${el?.logo_path}`,
												}}
												resizeMode="contain"
											/>
										</TouchableOpacity>
									</View>
								))}
							</ScrollView>
						)}
						{!providers?.buy && (
							<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
								<Icon
									style={{ marginRight: 10, minHeight: 20 }}
									name="movie-filter"
									type="Materialcommunityicons"
									color="white"
								/>
								<TextCustom>En salle actuellement</TextCustom>
							</View>
						)}

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 15,
								marginVertical: 5,
							}}
						>
							{displayStars(movie?.vote_average)}
						</View>
						<View>
							<TextCustom style={{ marginBottom: 6 }}>
								Année : {new Date(movie?.release_date).getFullYear()} - Durée:{' '}
								{movie?.runtime}
								min
							</TextCustom>

							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								{movie?.genres?.map(el => (
									<TextCustom
										fontSize="13"
										style={{
											backgroundColor: '#ffffff1c',
											borderRadius: 5,
											paddingHorizontal: 5,
											marginHorizontal: 5,
										}}
										key={uuid.v4()}
									>
										{el.name}
									</TextCustom>
								))}
							</View>
							<ScrollView horizontal={true}>
								{actors?.map(actor => (
									<View
										key={uuid.v4()}
										style={{
											width: 100,
											alignContent: 'center',
											paddingHorizontal: 3,
											justifyContent: 'flex-start',
											marginTop: 15,
										}}
									>
										{actor?.profile_path ? (
											<Image
												style={{
													height: 80,
													width: 80,
													borderRadius: 200,
													marginHorizontal: 5,
													borderColor: '#ffffffb0',
													borderWidth: 1,
													borderColor: 'white',
												}}
												source={{
													uri: `https://image.tmdb.org/t/p/w500/${actor?.profile_path}`,
												}}
												resizeMode="cover"
											/>
										) : (
											<Image
												style={{
													height: 80,
													width: 80,
													borderRadius: 200,
													marginHorizontal: 5,
													borderColor: '#ffffffb0',
													borderWidth: 1,
													borderColor: 'white',
												}}
												source={require('../assets/images/movie_default.jpg')}
												resizeMode="cover"
											/>
										)}

										<TextCustom>{actor.name}</TextCustom>
									</View>
								))}
							</ScrollView>
							<View style={{ marginTop: 15, paddingHorizontal: 10 }}>
								<TextCustom fontWeight="bold" style={{ textAlign: 'left', fontSize: 15 }}>
									Synopsis
								</TextCustom>
								<TextCustom style={{ textAlign: 'justify' }}>{movie?.overview}</TextCustom>
							</View>
						</View>
					</>
				)}
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
	btn_heart: {
		position: 'absolute',
		right: 20,
		top: 80,
		zIndex: 99,
	},
});
