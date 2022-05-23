import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { addToBlackList, addToWishlist, removeFromWishlist } from '../features/movie/movieSlice';
import axios from 'axios';

const MovieHomeItem = ({ movie }) => {
	const { wishList, blackList } = useSelector(state => state.movie);
	const getMovies = async id => {
		try {
			const mov = await axios.get('http://192.168.1.21:3000/movie/getDetailsMovies', {
				params: {
					id,
				},
			});
			// console.log(mov.data);
			dispatch(
				addToWishlist({
					title: mov.data.title,
					backdrop_path: mov.data.poster_path,
					id: mov.data.id,
					runtime: mov.data.runtime,
					year: new Date(mov.data.release_date).getFullYear(),
					genres: mov.data.genres,
				}),
			);
		} catch (err) {
			console.log(err);
		}
	};

	const dispatch = useDispatch();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{ height: 175, width: 112, borderRadius: 30, marginHorizontal: 10 }}
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

				<Image
					source={{
						uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`,
					}}
					style={{
						borderRadius: 10,
						height: 175,
						width: 112,
					}}
					resizeMode="cover"
				/>
			</TouchableOpacity>
			<View style={styles.btn_action}>
				<TouchableOpacity
					onPress={() => {
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
	},
});
