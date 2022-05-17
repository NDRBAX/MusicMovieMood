import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TextCustom from './TextCustom';

let filterList = [{ name: 'mood', img: require('../assets/images/movie_filter_mood_white.png') }];

const Filter = props => {
	const { name, src } = props;
	let uriImg = filterList.find(item => item.name === name).img;

	return (
		<TouchableOpacity>
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					paddingHorizontal: 20,
				}}
			>
				<Image style={styles.stretchFilter} source={uriImg} />
				<TextCustom fontSize="14">{name}</TextCustom>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	stretchFilter: {
		width: 65,
		height: 65,
		resizeMode: 'stretch',
		marginBottom: 10,
	},
});

export default Filter;
