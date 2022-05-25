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
import React from 'react';

const Loader = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', marginTop: 150 }}>
			<ActivityIndicator size="large" color="#fff" />
		</View>
	);
};

export default Loader;
