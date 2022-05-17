import React from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
// Import icons
import { Ionicons } from '@expo/vector-icons';

const Movie = (props, { navigation }) => {
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
						name="account"
						color="white"
						type="material-community"
						// buttonStyle={{ backgroundColor: '#009788' }}
						onPress={() => props.navigation.navigate('Settings')}
					/>
				</View>
				<ScrollView style={{ marginTop: 30 }}>
					<Text h4 style={{ textAlign: 'center', color: 'white' }}>
						Movie
					</Text>
				</ScrollView>
				<TouchableOpacity
					style={styles.music_btn}
					onPress={() => props.navigation.navigate('Music')}
				>
					<Image source={require('../assets/images/btnMusic.png')} />
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
});

export default Movie;
