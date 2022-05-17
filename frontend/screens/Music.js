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
import TextCustom from '../components/TextCustom';
// Import icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Music = props => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/music_bg.jpg')}
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
						type="material-community"
						color="white"
						onPress={() => props.navigation.navigate('Settings')}
					/>
				</View>
				<ScrollView style={{ marginTop: 40 }}>
					<TextCustom fontSize="24" fontWeight="bold">
						Music
					</TextCustom>
				</ScrollView>
				<TouchableOpacity
					style={styles.music_btn}
					onPress={() => props.navigation.navigate('Movie')}
				>
					<Image source={require('../assets/images/movie_btn.png')} style={styles.stretch} />
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
		height: 80,
		with: 80,
	},
	stretch: {
		width: 80,
		height: 80,
		resizeMode: 'stretch',
	},
});

export default Music;
