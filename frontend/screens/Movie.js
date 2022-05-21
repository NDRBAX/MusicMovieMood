import React, { useEffect, useState } from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

import { Overlay, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../components/Filter';
import MovieHomeItem from '../components/MovieHomeItem';
import TextCustom from '../components/TextCustom';
import SmileyItem from '../components/SmileyItem';
import axios from 'axios';
import { smileyMovieList } from '../data/smiley';
import { filterMovieList } from '../data/filters';
import {
	toggleSmiley,
	removeMoodFilter,
	addMovieFetch,
	addMoviePopularFetch,
} from '../features/movie/movieSlice';

const Movie = (props, { navigation }) => {
	const { displaySmiley, whereFilter, publicFilter, moviesFetch, moodGenre, moviesPopular } =
		useSelector(state => state.movie);
	const dispatch = useDispatch();

	useEffect(() => {
		const getMovies = async () => {
			try {
				const mov = await axios.get('http://192.168.1.21:3000/movie/getMovies', {
					params: {
						genres: moodGenre,
						adultFilter: publicFilter,
						whereFilter: whereFilter,
					},
				});
				// console.log(mov.data);
				dispatch(addMovieFetch(mov.data));
			} catch (err) {
				console.log(err);
			}
		};
		getMovies();
	}, [publicFilter, whereFilter, moodGenre]);

	useEffect(() => {
		const getMoviesPopular = async () => {
			try {
				const mov = await axios.get('http://192.168.1.21:3000/movie/getMoviesPopular');
				dispatch(addMoviePopularFetch(mov.data));
			} catch (err) {
				console.log(err);
			}
		};
		getMoviesPopular();
	}, []);

	// console.log('moviesFetch-----------------------------------------------');
	// console.log(moviesFetch);
	// console.log(moviesFetch.length);

	const displayNbMovies = (nb, list) =>
		list?.slice(0, nb).map((movie, index) => <MovieHomeItem movie={movie} key={movie.id} />);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/movie_bg.jpg')}
				style={styles.image}
				resizeMode="cover"
			>
				<View
					style={{
						flexWrap: 'wrap',
						alignSelf: 'flex-end',
						flexDirection: 'row',
						marginRight: 20,
						marginTop: 40,
					}}
				>
					<Icon
						style={{ marginRight: 5 }}
						name="heart-circle"
						type="ionicon"
						color="white"
						onPress={() => props.navigation.navigate('Wishlist')}
					/>
					<Icon
						name="user"
						color="white"
						type="antdesign"
						onPress={() => props.navigation.navigate('Signup')}
					/>
				</View>

				<View>
					<Overlay
						overlayStyle={{
							backgroundColor: 'rgba(117, 103, 129, .8)',
							borderRadius: 10,
							top: -130,
							left: -10,
						}}
						isVisible={displaySmiley}
						onBackdropPress={() => {
							dispatch(toggleSmiley());
							dispatch(removeMoodFilter());
						}}
					>
						<View style={{ height: 190, width: 240, paddingTop: 12 }}>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'center',

									flexWrap: 'wrap',
								}}
							>
								{smileyMovieList.map((smiley, i) => (
									<SmileyItem name={smiley.name} key={smiley.name + i} />
								))}
							</View>
						</View>
					</Overlay>
				</View>

				<ScrollView
					style={{
						marginTop: 30,
						width: '100%',
					}}
				>
					<View style={styles.filters}>
						{filterMovieList.map((it, index) => {
							const { name } = it;
							return <Filter name={name} index key={index} />;
						})}
					</View>

					{/* list film partie 1 */}
					<TextCustom
						fontSize="15"
						fontWeight="light"
						style={{ textAlign: 'left', paddingLeft: 15, marginTop: 40, marginBottom: 10 }}
					>
						Films
					</TextCustom>

					<ScrollView horizontal={true} style={{ marginTop: 10 }}>
						{displayNbMovies(5, moviesFetch)}
					</ScrollView>

					{/* list film partie 2 selection users*/}
					<TextCustom
						fontSize="15"
						fontWeight="light"
						style={{ textAlign: 'left', paddingLeft: 15, marginTop: 45, marginBottom: 10 }}
					>
						Selection utilisateurs
					</TextCustom>

					<ScrollView horizontal={true} style={{ marginTop: 10 }}>
						{displayNbMovies(8, moviesPopular)}
					</ScrollView>
				</ScrollView>
				<TouchableOpacity
					style={styles.music_btn}
					onPress={() => props.navigation.navigate('Music')}
				>
					<Image style={styles.stretch} source={require('../assets/images/music_btn.png')} />
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	tabBarItemContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	music_btn: {
		marginBottom: 20,
	},
	stretch: {
		width: 80,
		height: 80,
		resizeMode: 'stretch',
	},

	filters: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default Movie;
