import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native';

import TextCustom from '../components/TextCustom';

import { AntDesign } from '@expo/vector-icons';
import { Button, Input, ListItem, Icon } from 'react-native-elements';
import { removeToken } from '../features/login/tokenSlice';
import { useDispatch } from 'react-redux';

const Settings = ({ navigation }) => {
	const [compteEmail, setCompteEmail] = useState('');
	const [comptePwd, setComptePwd] = useState('');
	const [streamEmail, setStreamEmail] = useState('');
	const [streamPwd, setStreamPwd] = useState('');
	const [hasEmailFocus, setEmailFocus] = useState(false);
	const [hasPasswordFocus, setPasswordFocus] = useState(false);
	const [affForm, setAffForm] = useState(false);
	const [affMenu, setAffMenu] = useState(false);
	const [plateform, setChoice] = useState('Plateformes');
	const [comptes, setCompte] = useState([]);

	const dispatch = useDispatch();

	const streaming = [
		'Netflix',
		'Prime Video',
		'Disney +',
		'Amazon Prime Video',
		'Hulu',
		'YouTube',
	];
	if (affForm) {
		var form = (
			<>
				<ListItem.Accordion
					content={
						<>
							<ListItem.Content>
								<ListItem.Title>{plateform}</ListItem.Title>
							</ListItem.Content>
						</>
					}
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.14)',
						marginHorizontal: 40,
					}}
					isExpanded={affMenu}
					onPress={() => {
						setAffMenu(!affMenu);
					}}
				>
					{streaming.map((e, i) => (
						<ListItem
							key={i}
							onPress={() => {
								setAffMenu(false);
								setChoice(e);
							}}
							bottomDivider
						>
							<ListItem.Content>
								<ListItem.Title>{e}</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					))}
				</ListItem.Accordion>
				<View style={styles.form}>
					<Input
						placeholder="Email plateforme streaming"
						autoCapitalize={'none'}
						inputContainerStyle={{ borderBottomWidth: 0 }}
						containerStyle={[
							styles.inputContainerStyle,
							{ borderColor: hasEmailFocus ? '#E74680' : 'white' },
							{ borderWidth: hasEmailFocus ? 2 : 1 },
						]}
						inputStyle={styles.inputText}
						keyboardType="email-address"
						onChangeText={value => setStreamEmail(value)}
						value={streamEmail}
					/>
					<Input
						placeholder="PWD plateforme streaming"
						inputContainerStyle={{ borderBottomWidth: 0 }}
						containerStyle={[
							styles.inputContainerStyle,
							{ borderColor: hasPasswordFocus ? '#E74680' : 'white' },
							{ borderWidth: hasPasswordFocus ? 2 : 1 },
						]}
						inputStyle={styles.inputText}
						secureTextEntry={true}
						onChangeText={value => setStreamPwd(value)}
						value={streamPwd}
					/>
					<Button
						buttonStyle={{
							backgroundColor: '#E74680',
							marginTop: 10,
							height: 38,
						}}
						containerStyle={{ width: '70%' }}
						title="Valider"
						onPress={() => {
							setAffForm(false);
							setCompte([...comptes, plateform]);
						}}
					/>
				</View>
			</>
		);
	}
	var comptesUser = comptes.map((e, i) => {
		return (
			<TextCustom key={i} style={{ marginVertical: 5 }}>
				{e}
			</TextCustom>
		);
	});
	return (
		<ImageBackground
			source={require('../assets/images/movie_bg.jpg')}
			style={styles.imagebg}
			resizeMode="cover"
		>
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
				<TextCustom fontSize="20" fontWeight="bold" style={{ marginVertical: 10 }}>
					Paramètres compte
				</TextCustom>
				<View style={styles.form}>
					<Input
						placeholder="andre123@gmail.com"
						autoCapitalize={'none'}
						inputContainerStyle={{ borderBottomWidth: 0 }}
						containerStyle={[
							styles.inputContainerStyle,
							{ borderColor: hasEmailFocus ? '#E74680' : 'white' },
							{ borderWidth: hasEmailFocus ? 2 : 1 },
						]}
						inputStyle={styles.inputText}
						keyboardType="email-address"
						onChangeText={value => setCompteEmail(value)}
						value={compteEmail}
					/>
					<Input
						placeholder="********"
						inputContainerStyle={{ borderBottomWidth: 0 }}
						containerStyle={[
							styles.inputContainerStyle,
							{ borderColor: hasPasswordFocus ? '#E74680' : 'white' },
							{ borderWidth: hasPasswordFocus ? 2 : 1 },
						]}
						inputStyle={styles.inputText}
						secureTextEntry={true}
						onChangeText={value => setComptePwd(value)}
						value={comptePwd}
					/>
					<Button
						buttonStyle={{
							backgroundColor: '#E74680',
							marginTop: 10,
							height: 38,
						}}
						containerStyle={{ width: '70%' }}
						title="Modifier"
						onPress={() => {
							setCompteEmail('');
							setComptePwd('');
						}}
					/>
				</View>
				<TextCustom fontSize="20" fontWeight="bold" style={{ marginTop: 10 }}>
					Compte streaming
				</TextCustom>
				{comptesUser}
				<View style={styles.button}>
					<Button
						buttonStyle={{
							backgroundColor: '#E74680',
							marginTop: 10,
							height: 38,
						}}
						containerStyle={{ width: '70%' }}
						title="Ajouter"
						onPress={() => setAffForm(!affForm)}
					/>
				</View>
				{form}
				<TouchableOpacity
					onPress={() => {
						dispatch(removeToken());
						navigation.navigate('Movie');
					}}
				>
					<TextCustom style={{ marginTop: 50 }}>Deconnexion</TextCustom>
				</TouchableOpacity>
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		width: '100%',
	},
	imagebg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	back_btn: {
		width: '100%',
		marginLeft: 20,
	},
	form: {
		flex: 1,
		alignItems: 'center',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		marginVertical: 0,
	},
	inputContainerStyle: {
		width: '70%',
		height: 38,
		borderRadius: 5,
		marginVertical: 10,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.14)',
	},
	inputText: {
		color: 'white',
		fontWeight: '300',
		marginLeft: 5,
		padding: 10,
	},
});

export default Settings;
