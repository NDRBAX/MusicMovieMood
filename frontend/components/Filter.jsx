import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TextCustom from './TextCustom';
import { filterMovieList } from '../data/filters';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedFilter } from '../features/movie/movieSlice';
import { useEffect, useState } from 'react';

const Filter = props => {
	const [isActive, setIsActive] = useState(false);
	const { selectedFilters } = useSelector(state => state.movie);
	const dispatch = useDispatch();
	const { name, src } = props;

	useEffect(() => {
		if (selectedFilters.includes(name)) {
			setIsActive(true);
		}
		if (!selectedFilters.includes(name)) {
			setIsActive(false);
		}
	}, [selectedFilters]);

	console.log(isActive);

	let uriImg;

	isActive && (uriImg = filterMovieList.find(item => item.name === name).activeImg);
	!isActive && (uriImg = filterMovieList.find(item => item.name === name).img);

	// let uriImgActive = filterMovieList.find(item => item.name === name).activeImg;
	// let uriImg = filterMovieList.find(item => item.name === name).img;

	return (
		<TouchableOpacity onPress={() => dispatch(toggleSelectedFilter(name))}>
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					// paddingHorizontal: 20,
				}}
			>
				<Image
					style={isActive ? styles.stretchFilterActive : styles.stretchFilter}
					source={uriImg}
				/>
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
		paddingHorizontal: 20,
	},
	stretchFilterActive: {
		width: 120,
		height: 120,
		resizeMode: 'stretch',
		backgroundColor: 'violet',
	},
});

export default Filter;
