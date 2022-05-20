import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../features/movie/movieSlice';

const MovieHomeItem = ({ movie }) => {
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
						console.log('add');
						dispatch(addToWishlist(movie.id));
					}}
				>
					<Icon
						style={{ marginHorizontal: 5 }}
						name="ios-heart-outline"
						type="ionicon"
						color="white"
					/>
				</TouchableOpacity>
				<TouchableOpacity>
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
