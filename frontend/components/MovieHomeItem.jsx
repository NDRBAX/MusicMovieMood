import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const MovieHomeItem = ({ movie }) => {
	return (
		<TouchableOpacity style={{ height: 175, width: 112, borderRadius: 30, marginHorizontal: 10 }}>
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
	);
};

export default MovieHomeItem;

const styles = StyleSheet.create({});
