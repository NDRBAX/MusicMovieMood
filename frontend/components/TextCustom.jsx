import { Text, ActivityIndicator } from 'react-native';
// import AppLoading from 'expo-app-loading';
// import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useFonts } from 'expo-font';

const TextCustom = props => {
	const { fontSize, fontWeight, children, style } = props;
	console.log(fontSize, fontWeight);
	let [fontsLoaded] = useFonts({
		Lato_300Light: require('../assets/Lato-Light.ttf'),
		Lato_400Regular: require('../assets/Lato-Regular.ttf'),
		Lato_700Bold: require('../assets/Lato-Bold.ttf'),
	});
	let fw = '';

	fontWeight == 'bold' && (fw = 'Lato_700Bold');
	(fontWeight == 'regular' || fontWeight == '') && (fw = 'Lato_400Regular');
	fontWeight == 'light' && (fw = 'Lato_300Light');

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" />;
	}

	return (
		<Text
			style={{
				color: 'white',
				fontFamily: fw,
				fontSize: parseInt(fontSize) || 14,
				textAlign: 'center',
				...style,
			}}
		>
			{children}
		</Text>
	);
};

export default TextCustom;
