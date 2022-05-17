import { Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const TextCustom = props => {
	const { fontSize, fontWeight, children } = props;
	let [fontsLoaded] = useFonts({
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
	});
	let fw = '';

	fontWeight == 'bold' && (fw = 'Lato_700Bold');
	(fontWeight == 'regular' || fontWeight == '') && (fw = 'Lato_400Regular');
	fontWeight == 'light' && (fw = 'Lato_300Light');

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<Text
			style={{
				color: 'white',
				fontFamily: fw,
				fontSize: parseInt(fontSize) || 14,
				textAlign: 'center',
			}}
		>
			{children}
		</Text>
	);
};

export default TextCustom;
