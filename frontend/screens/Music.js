import React, { useState, useEffect } from 'react';
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
import MusicHomeItem from '../components/MusicHomeItem';

import TextCustom from '../components/TextCustom';
// Import icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Music = (props, { navigation }) => {
	const [listTop, setTop] = useState([]);
	const [listPlayL, setPlaylist] = useState([]);

	useEffect(() => {
		async function getTop() {
			var topRaw = await fetch('http://192.168.1.21:3000/music/getTop');
			var top = await topRaw.json();
			setTop(top);
			var playTopRaw = await fetch('http://192.168.1.21:3000/music/getPlaylist?filter=top');
			var playTop = await playTopRaw.json();
			setPlaylist(playTop);
		}
		getTop();
	}, []);
	//music and playlist
	var musics = listTop.map(e => {
		return <MusicHomeItem title={e.track} url={e.cover} />;
	});
	var playlists = listPlayL.map(e => {
		return <MusicHomeItem title={e.name} url={e.image} />;
	});

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

				<ScrollView style={{ marginTop: 40, width: '100%' }}>
					<View style={styles.filters}>
						<Filter name="mood" />
						<Filter name="mood" />
						<Filter name="mood" />
					</View>
					<TextCustom
						fontSize="15"
						fontWeight="light"
						style={{ textAlign: 'left', paddingLeft: 15, marginTop: 30 }}
					>
						Musiques
					</TextCustom>
					<ScrollView horizontal={true} style={{ marginTop: 10 }}>
						{musics}
					</ScrollView>
					<TextCustom
						fontSize="15"
						fontWeight="light"
						style={{ textAlign: 'left', paddingLeft: 15, marginTop: 30 }}
					>
						Playlists
					</TextCustom>
					<ScrollView horizontal={true} style={{ marginTop: 10 }}>
						{playlists}
					</ScrollView>
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

export default Music;
