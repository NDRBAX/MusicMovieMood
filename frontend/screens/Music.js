import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

import { Overlay, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../components/Filter_music';
import MusicHomeItem from '../components/MusicHomeItem';
import TextCustom from '../components/TextCustom';
import SmileyItem from '../components/SmileyItem_music';
import { smileyMusicMoodList } from '../data/smiley';
import { filterMusicList } from '../data/filters';
import { toggleSmiley, removeMoodFilter } from '../features/music/musicSlice';

const Music = (props, { navigation }) => {
	const [listTop, setTop] = useState([]);
	const [listPlayL, setPlaylist] = useState([]);
	const { displaySmiley } = useSelector(state => state.music);
	const { moodList, moodFilter, moodPlaylist } = useSelector(state => state.music);

	console.log('musics');
	var musics = [];
	console.log('palylist');
	var playlists = [];
	console.log('musicsFilter');
	var musicsFilter = [];
	console.log('palylistFilter');
	var playlistsFilter = [];

	const dispatch = useDispatch();

	async function getTop() {
		var topRaw = await fetch('http://192.168.1.21:3000/music/getTop');
		var top = await topRaw.json();
		console.log('-----------------------------');
		setTop(top);
		var playTopRaw = await fetch('http://192.168.1.21:3000/music/getPlaylist?filter=top');
		var playTop = await playTopRaw.json();
		setPlaylist(playTop);
	}
	useEffect(() => {
		getTop();
	}, []);

	console.log(playlists);
	console.log(musics);
	console.log(playlistsFilter);

	//music and playlist
	if (!moodFilter) {
		musics = listTop.map((e, i) => {
			return <MusicHomeItem key={i} title={e.track} url={e.cover} />;
		});
		playlists = listPlayL.map((e, i) => {
			return <MusicHomeItem key={i} title={e.name} url={e.image} />;
		});
		playlistsFilter = [];
		musicsFilter = [];
	} else {
		musicsFilter = moodList.map((e, i) => {
			return <MusicHomeItem key={i} title={e.track} url={e.cover} />;
		});
		playlistsFilter = moodPlaylist.map((e, i) => {
			return <MusicHomeItem key={i} title={e.name} url={e.image} />;
		});
		musics = [];
		playlists = [];
	}

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
								{smileyMusicMoodList.map((smiley, i) => (
									<SmileyItem name={smiley.name} key={smiley.name + i} />
								))}
							</View>
						</View>
					</Overlay>
				</View>
				<ScrollView style={{ marginTop: 30, width: '100%' }}>
					<View style={styles.filters}>
						{filterMusicList.map((it, index) => {
							const { name } = it;
							return <Filter name={name} index key={index} />;
						})}
					</View>

					{/*list music*/}
					<TextCustom
						fontSize="15"
						fontWeight="light"
						style={{ textAlign: 'left', paddingLeft: 15, marginTop: 30 }}
					>
						Musiques
					</TextCustom>
					<ScrollView horizontal={true} style={{ marginTop: 10 }}>
						{musics}
						{musicsFilter}
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
						{playlistsFilter}
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
