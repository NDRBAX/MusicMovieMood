import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const MovieHomeItem = () => {
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
				Batman
			</Text>

			<Image
				source={{ uri: 'https://picsum.photos/200/300' }}
				style={{
					borderRadius: 10,
					height: 175,
					width: 112,
					paddingHorizontal: 10,
				}}
				resizeMode="cover"
			/>
		</TouchableOpacity>
	);
};

export default MovieHomeItem;

const styles = StyleSheet.create({});
