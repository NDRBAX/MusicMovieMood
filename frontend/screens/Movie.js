import React, { useState } from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
	Text,
} from 'react-native';

import { Card, Icon } from 'react-native-elements';

import Filter from '../components/Filter';
import MovieHomeItem from '../components/MovieHomeItem';

import TextCustom from '../components/TextCustom';

const Movie = (props, { navigation }) => {
	const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);

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

				<ScrollView
					style={{
						marginTop: 30,
						width: '100%',
					}}
				>
					<View style={styles.filters}>
						<Filter name="mood" />
						<Filter name="mood" />
						<Filter name="mood" />
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
	stretchFilter: {
		width: 65,
		height: 65,
		resizeMode: 'stretch',
		marginBottom: 10,
	},
	filters: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default Movie;
