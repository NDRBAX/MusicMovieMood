import React from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

import TextCustom from '../components/TextCustom';

import { AntDesign } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
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
					Settings
				</TextCustom>
			</ScrollView>
		</ImageBackground>
	);
};

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

export default Settings;
