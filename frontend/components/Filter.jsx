import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TextCustom from './TextCustom';
import { filterMovieList } from '../data/filters';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedFilter } from '../features/movie/movieSlice';
import { useState } from 'react';

const Filter = props => {
	const [isActive, setIsActive] = useState(false);
	const { selectedFilters } = useSelector(state => state.movie);
	const dispatch = useDispatch();
	const { name, src } = props;

	let uriImg = filterMovieList.find(item => item.name === name).img;

	return (
		<TouchableOpacity onPress={() => dispatch(toggleSelectedFilter(name))}>
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
	},
});

export default Filter;
