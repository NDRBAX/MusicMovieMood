import React from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
	Text,
} from 'react-native';

import { Overlay, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../components/Filter';
import MovieHomeItem from '../components/MovieHomeItem';
import TextCustom from '../components/TextCustom';
import SmileyItem from '../components/SmileyItem';
import { smileyMovieList } from '../data/smiley';
import { filterMovieList } from '../data/filters';
import { toggleSmiley, removeMoodFilter } from '../features/movie/movieSlice';

const Movie = (props, { navigation }) => {
	const { displaySmiley } = useSelector(state => state.movie);

	const dispatch = useDispatch();

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
						onPress={() => props.navigation.navigate('Settings')}
					/>
				</View>

				<View>
					<Overlay
						overlayStyle={{
							backgroundColor: 'rgba(117, 103, 129, .8)',
							borderRadius: 10,
							top: -130,
							left: -10,
						}}
						isVisible={displaySmiley}
						onBackdropPress={() => {
							dispatch(toggleSmiley());
							dispatch(removeMoodFilter());
						}}
					>
						<View style={{ height: 190, width: 240, paddingTop: 12 }}>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'center',

									flexWrap: 'wrap',
								}}
							>
								{smileyMovieList.map((smiley, i) => (
									<SmileyItem name={smiley.name} key={smiley.name + i} />
								))}
							</View>
						</View>
					</Overlay>
				</View>

				<ScrollView
					style={{
						marginTop: 30,
						width: '100%',
					}}
				>
					<View style={styles.filters}>
						{filterMovieList.map((it, index) => {
							const { name } = it;
							return <Filter name={name} index key={index} />;
						})}
					</View>

					{/* list film partie 1 */}
					<TextCustom
						fontSize="15"
						fontWeight="light"
						style={{ textAlign: 'left', paddingLeft: 15, marginTop: 30 }}
					>
						Films
					</TextCustom>

					<ScrollView horizontal={true} style={{ marginTop: 10 }}>
						<MovieHomeItem />
						<MovieHomeItem />
						<MovieHomeItem />

						<TouchableOpacity
							style={{ height: 175, width: 112, borderRadius: 30, marginHorizontal: 10 }}
						>
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
								}}
								resizeMode="cover"
							/>
						</TouchableOpacity>
					</ScrollView>
				</ScrollView>
				<TouchableOpacity
					style={styles.music_btn}
					onPress={() => props.navigation.navigate('Music')}
				>
					<Image style={styles.stretch} source={require('../assets/images/music_btn.png')} />
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
	stretch: {
		width: 80,
		height: 80,
		resizeMode: 'stretch',
	},

	filters: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default Movie;
