import React, { useEffect } from 'react';
import { LOCAL_IP } from '@env';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { addToBlackList, addToWishlist, removeFromWishlist } from '../features/movie/movieSlice';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieHomeItem = ({ movie }) => {
	const navigation = useNavigation();
	const { wishList, blackList } = useSelector(state => state.movie);
	const { token } = useSelector(state => state.token);

	const getMovies = async id => {
		console.log('get movmov');
		try {
			const movie = await axios.get(`${LOCAL_IP}/movie/getDetailsMoviesForWishlist`, {
				params: {
					id,
				},
			});
			// console.log(mov.data);
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

			addToDBWishList(movie);
		} catch (err) {
			console.log(err);
		}
	};

	const dispatch = useDispatch();

	// DELETE MOVIE FROM DATA BASE
	let removeFromDBWishlist = async title => {
		await fetch(`${LOCAL_IP}/users/wishlist`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `token=${token}&title=${movie.title}`,
		});
	};
	// ADD MOVIE TO DATA BASE
	const addToDBWishList = async movie => {
		await fetch(`${LOCAL_IP}/users/wishlist`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `token=${token}&title=${movie.data.title}&id=${movie.data.id}&runtime=${new Date(
				movie.data.release_date,
			).getFullYear()}&backdrop_path=${movie.data.poster_path}&genre=${movie.data.genres}`,
		});
		console.log('TITLE ***   ' + movie.data.title);
		console.log('POSTER ***   ' + movie.data.poster_path);
		console.log('ID ***   ' + movie.data.id);
		console.log('GENRE ***   ' + movie.data.genres);
		console.log('DATE ***   ' + new Date(movie.data.release_date).getFullYear());
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{
					height: 175,
					width: 112,
					borderRadius: 30,
					marginHorizontal: 10,
				}}
				onPress={() => navigation.push('MovieDetail', { id: movie.id })}
			>
				<Text
					style={{
						position: 'absolute',
						zIndex: 88,
						bottom: 0,
						color: 'white',
						textAlign: 'center',
						width: '100%',
						backgroundColor: 'rgba(0,0,0,0.5)',
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
					}}
				>
					{movie?.title}
				</Text>

				{movie?.backdrop_path != null ? (
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`,
						}}
						style={{
							borderRadius: 10,
							height: 175,
							width: 112,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						}}
						resizeMode="cover"
					/>
				) : (
					<Image
						source={require('../assets/images/movie_default.jpg')}
						style={{
							borderRadius: 10,
							height: 175,
							width: 112,
						}}
						resizeMode="cover"
					/>
				)}
			</TouchableOpacity>
			<View style={styles.btn_action}>
				<TouchableOpacity
					onPress={() => {
						console.log('coeur');
						wishList.some(item => item.id === movie?.id)
							? dispatch(removeFromWishlist(movie?.id)) && removeFromDBWishlist(movie.title)
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
						color={wishList.some(item => item.id === movie?.id) ? '#E74680' : 'white'}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						dispatch(addToBlackList(movie?.id));
						// console.log('------------------------------blacklist');
						// console.log(blackList);
					}}
				>
					<Icon
						style={{ marginHorizontal: 5 }}
						name="minus-circle"
						type="feather"
						color="white"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MovieHomeItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	},
	btn_action: {
		flexDirection: 'row',
		marginTop: 10,
		with: '80%',
		justifyContent: 'center',
		zIndex: 99,
	},
});
